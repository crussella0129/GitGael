#!/usr/bin/env bash
set -euo pipefail

# GitGael Uninstaller
# Removes application, icons, desktop entries, and optionally user data.
# Usage: uninstall.sh [OPTIONS]
#   --system    Uninstall system-wide install (requires sudo)
#   --yes       Answer yes to all prompts (except user data removal)

APP_NAME="GitGael"
APP_ID="gitgael"

# --- Defaults ---
SYSTEM_INSTALL=false
AUTO_YES=false
SUDO=""

# --- Parse arguments ---
for arg in "$@"; do
  case "$arg" in
    --system)    SYSTEM_INSTALL=true ;;
    --yes|-y)    AUTO_YES=true ;;
    --help|-h)
      echo "GitGael Uninstaller"
      echo ""
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --system        Uninstall system-wide install (requires sudo)"
      echo "  --yes, -y       Answer yes to all prompts (except user data)"
      echo "  --help, -h      Show this help"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg (use --help for usage)"
      exit 1
      ;;
  esac
done

# --- Helpers ---
info()    { echo -e "\033[1;32m==>\033[0m \033[1m$*\033[0m"; }
warn()    { echo -e "\033[1;33mWarning:\033[0m $*"; }
error()   { echo -e "\033[1;31mError:\033[0m $*" >&2; exit 1; }

ask() {
  if $AUTO_YES; then
    return 0
  fi
  local prompt="$1 [Y/n] "
  read -rp "$prompt" answer
  case "${answer:-Y}" in
    [Yy]*) return 0 ;;
    *)     return 1 ;;
  esac
}

ask_no() {
  # Default to No (used for destructive operations like user data removal)
  local prompt="$1 [y/N] "
  read -rp "$prompt" answer
  case "${answer:-N}" in
    [Yy]*) return 0 ;;
    *)     return 1 ;;
  esac
}

remove_if_exists() {
  local path="$1"
  local label="${2:-$path}"
  if [ -e "$path" ] || [ -L "$path" ]; then
    $SUDO rm -rf "$path"
    info "Removed $label"
  fi
}

OS="$(uname -s)"

# =====================================================================
# Linux Uninstall
# =====================================================================
uninstall_linux() {
  info "Uninstalling $APP_NAME from Linux..."

  if $SYSTEM_INSTALL; then
    APP_DIR="/opt/$APP_ID"
    BIN_LINK="/usr/local/bin/$APP_ID"
    ICONS_DIR="/usr/share/icons/hicolor"
    APPS_DIR="/usr/share/applications"
    SUDO="sudo"
    info "System-wide uninstall (requires sudo)"
  else
    APP_DIR="$HOME/.local/share/$APP_ID"
    BIN_LINK="$HOME/.local/bin/$APP_ID"
    ICONS_DIR="$HOME/.local/share/icons/hicolor"
    APPS_DIR="$HOME/.local/share/applications"
    SUDO=""
  fi

  local found=false

  # Remove application directory
  if [ -d "$APP_DIR" ]; then
    found=true
    if ask "Remove application files ($APP_DIR)?"; then
      $SUDO rm -rf "$APP_DIR"
      info "Removed $APP_DIR"
    fi
  fi

  # Remove binary symlink
  remove_if_exists "$BIN_LINK" "binary link"

  # Remove app-grid .desktop file
  remove_if_exists "$APPS_DIR/$APP_ID.desktop" "app-grid entry"

  # Remove desktop icon
  local desktop_file="$HOME/Desktop/$APP_ID.desktop"
  remove_if_exists "$desktop_file" "desktop icon"

  # Remove icons from hicolor theme
  local icons_removed=false
  for size in 16 32 48 128 256 512; do
    local icon_path="$ICONS_DIR/${size}x${size}/apps/$APP_ID.png"
    if [ -f "$icon_path" ]; then
      $SUDO rm -f "$icon_path"
      icons_removed=true
    fi
  done
  if $icons_removed; then
    info "Removed icons from $ICONS_DIR"
  fi

  # Update caches
  if command -v update-desktop-database &>/dev/null; then
    $SUDO update-desktop-database "$APPS_DIR" 2>/dev/null || true
  fi
  if command -v gtk-update-icon-cache &>/dev/null; then
    $SUDO gtk-update-icon-cache -f -t "$ICONS_DIR" 2>/dev/null || true
  fi

  # User data
  local config_dir="$HOME/.config/$APP_ID"
  if [ -d "$config_dir" ]; then
    echo ""
    if ask_no "Remove user data ($config_dir)? This cannot be undone."; then
      rm -rf "$config_dir"
      info "Removed user data"
    else
      info "Kept user data at $config_dir"
    fi
  fi

  if ! $found; then
    warn "$APP_NAME does not appear to be installed at $APP_DIR"
  else
    info "$APP_NAME uninstalled successfully."
  fi
}

# =====================================================================
# macOS Uninstall
# =====================================================================
uninstall_macos() {
  info "Uninstalling $APP_NAME from macOS..."

  local app_path="/Applications/$APP_NAME.app"
  local found=false

  # Remove .app from /Applications
  if [ -d "$app_path" ]; then
    found=true
    if ask "Remove $app_path?"; then
      rm -rf "$app_path"
      info "Removed $app_path"
    fi
  fi

  # Remove from Dock
  # Check if app is in the Dock persistent-apps
  if defaults read com.apple.dock persistent-apps 2>/dev/null | grep -q "$APP_NAME"; then
    if ask "Remove from Dock?"; then
      # Remove the Dock entry by rebuilding without it
      osascript -e "
        tell application \"System Events\"
          tell dock preferences
            -- Removing dock icon by restarting Dock after plist edit
          end tell
        end tell
      " 2>/dev/null || true
      # Use PlistBuddy to find and remove the entry
      local dock_plist="$HOME/Library/Preferences/com.apple.dock.plist"
      local count
      count=$(/usr/libexec/PlistBuddy -c "Print persistent-apps" "$dock_plist" 2>/dev/null | grep -c "Dict" || echo 0)
      for ((i = count - 1; i >= 0; i--)); do
        local label
        label=$(/usr/libexec/PlistBuddy -c "Print persistent-apps:$i:tile-data:file-label" "$dock_plist" 2>/dev/null || echo "")
        if [ "$label" = "$APP_NAME" ]; then
          /usr/libexec/PlistBuddy -c "Delete persistent-apps:$i" "$dock_plist" 2>/dev/null || true
          info "Removed from Dock"
          break
        fi
      done
      killall Dock 2>/dev/null || true
    fi
  fi

  # Remove desktop alias
  local desktop_alias="$HOME/Desktop/$APP_NAME"
  if [ -e "$desktop_alias" ] || [ -L "$desktop_alias" ]; then
    if ask "Remove desktop alias?"; then
      rm -f "$desktop_alias"
      info "Removed desktop alias"
    fi
  fi

  # User data
  local config_dir="$HOME/.config/$APP_ID"
  local app_support="$HOME/Library/Application Support/$APP_NAME"
  local has_data=false

  if [ -d "$config_dir" ]; then has_data=true; fi
  if [ -d "$app_support" ]; then has_data=true; fi

  if $has_data; then
    echo ""
    if ask_no "Remove user data? This cannot be undone."; then
      [ -d "$config_dir" ] && rm -rf "$config_dir"
      [ -d "$app_support" ] && rm -rf "$app_support"
      info "Removed user data"
    else
      info "Kept user data"
    fi
  fi

  if ! $found; then
    warn "$APP_NAME does not appear to be installed at $app_path"
  else
    info "$APP_NAME uninstalled successfully."
  fi
}

# --- Dispatch ---
case "$OS" in
  Linux)  uninstall_linux ;;
  Darwin) uninstall_macos ;;
  *)      error "Unsupported OS: $OS. This uninstaller supports Linux and macOS." ;;
esac
