#!/usr/bin/env bash
set -euo pipefail

# GitGael Installer
# Supports Linux and macOS with interactive icon installation options.
# Usage: install.sh [OPTIONS]
#   --no-desktop    Skip desktop icon
#   --no-appgrid    Skip app-grid / Dock icon
#   --system        Install system-wide (requires sudo on Linux)
#   --yes           Answer yes to all prompts

APP_NAME="GitGael"
APP_ID="gitgael"
VERSION="0.1.0"

# --- Defaults ---
INSTALL_DESKTOP=true
INSTALL_APPGRID=true
SYSTEM_INSTALL=false
AUTO_YES=false

# --- Parse arguments ---
for arg in "$@"; do
  case "$arg" in
    --no-desktop)  INSTALL_DESKTOP=false ;;
    --no-appgrid)  INSTALL_APPGRID=false ;;
    --system)      SYSTEM_INSTALL=true ;;
    --yes|-y)      AUTO_YES=true ;;
    --help|-h)
      echo "GitGael Installer"
      echo ""
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --no-desktop    Skip desktop icon installation"
      echo "  --no-appgrid    Skip app-grid/Dock integration"
      echo "  --system        Install system-wide (Linux: /opt, requires sudo)"
      echo "  --yes, -y       Answer yes to all prompts"
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

# Locate the script directory (where the extracted app lives)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- Detect OS ---
OS="$(uname -s)"

# =====================================================================
# Linux Installation
# =====================================================================
install_linux() {
  info "Installing $APP_NAME on Linux..."

  # Determine install paths
  if $SYSTEM_INSTALL; then
    APP_DIR="/opt/$APP_ID"
    BIN_DIR="/usr/local/bin"
    ICONS_DIR="/usr/share/icons/hicolor"
    APPS_DIR="/usr/share/applications"
    SUDO="sudo"
    info "System-wide install (requires sudo)"
  else
    APP_DIR="$HOME/.local/share/$APP_ID"
    BIN_DIR="$HOME/.local/bin"
    ICONS_DIR="$HOME/.local/share/icons/hicolor"
    APPS_DIR="$HOME/.local/share/applications"
    SUDO=""
  fi

  # Find the app binary in the extracted directory
  APP_SOURCE=""
  if [ -f "$SCRIPT_DIR/../$APP_ID" ]; then
    APP_SOURCE="$(cd "$SCRIPT_DIR/.." && pwd)"
  elif [ -f "$SCRIPT_DIR/$APP_ID" ]; then
    APP_SOURCE="$SCRIPT_DIR"
  else
    # Look for the app in common build output locations
    for candidate in \
      "$SCRIPT_DIR/../${APP_NAME}-linux-x64" \
      "$SCRIPT_DIR/../${APP_NAME}-linux-arm64" \
      "$SCRIPT_DIR/${APP_NAME}-linux-x64" \
      "$SCRIPT_DIR/${APP_NAME}-linux-arm64"; do
      if [ -d "$candidate" ]; then
        APP_SOURCE="$(cd "$candidate" && pwd)"
        break
      fi
    done
  fi

  if [ -z "$APP_SOURCE" ]; then
    error "Could not find $APP_NAME application files. Run this script from the extracted release directory."
  fi

  info "Source: $APP_SOURCE"
  info "Destination: $APP_DIR"

  # Copy application files
  $SUDO mkdir -p "$APP_DIR"
  $SUDO cp -r "$APP_SOURCE"/. "$APP_DIR/"
  $SUDO chmod +x "$APP_DIR/$APP_ID"

  # Create symlink to binary
  $SUDO mkdir -p "$BIN_DIR"
  $SUDO ln -sf "$APP_DIR/$APP_ID" "$BIN_DIR/$APP_ID"
  info "Linked $BIN_DIR/$APP_ID → $APP_DIR/$APP_ID"

  # Install icons
  local icon_source="$APP_SOURCE/resources/icon.png"
  if [ ! -f "$icon_source" ]; then
    icon_source="$SCRIPT_DIR/../assets/icon.png"
  fi
  if [ ! -f "$icon_source" ]; then
    icon_source="$SCRIPT_DIR/icon.png"
  fi

  if [ -f "$icon_source" ]; then
    for size in 16 32 48 128 256 512; do
      local icon_dir="$ICONS_DIR/${size}x${size}/apps"
      $SUDO mkdir -p "$icon_dir"
      # Use the multi-size PNGs if available, otherwise resize from 512
      local sized_icon="$APP_SOURCE/resources/icons/${size}x${size}.png"
      if [ ! -f "$sized_icon" ]; then
        sized_icon="$SCRIPT_DIR/../assets/icons/${size}x${size}.png"
      fi
      if [ -f "$sized_icon" ]; then
        $SUDO cp "$sized_icon" "$icon_dir/$APP_ID.png"
      else
        $SUDO cp "$icon_source" "$icon_dir/$APP_ID.png"
      fi
    done
    info "Installed icons to $ICONS_DIR"
  else
    warn "Icon file not found; skipping icon installation"
  fi

  # App-grid icon (.desktop in applications)
  if $INSTALL_APPGRID; then
    if ask "Install app-grid icon?"; then
      local desktop_file="$APP_SOURCE/resources/gitgael.desktop"
      if [ ! -f "$desktop_file" ]; then
        desktop_file="$SCRIPT_DIR/../assets/gitgael.desktop"
      fi
      if [ -f "$desktop_file" ]; then
        $SUDO cp "$desktop_file" "$APPS_DIR/$APP_ID.desktop"
        # Patch Exec line to point to actual binary
        $SUDO sed -i "s|^Exec=.*|Exec=$APP_DIR/$APP_ID %U|" "$APPS_DIR/$APP_ID.desktop"
        $SUDO sed -i "s|^Icon=.*|Icon=$APP_ID|" "$APPS_DIR/$APP_ID.desktop"
        info "Installed app-grid entry: $APPS_DIR/$APP_ID.desktop"
      else
        # Generate a .desktop file on the fly
        cat > "/tmp/$APP_ID.desktop" <<DESK
[Desktop Entry]
Name=$APP_NAME
Comment=Survival Computing Archive
Exec=$APP_DIR/$APP_ID %U
Icon=$APP_ID
Type=Application
Categories=Development;Utility;
Terminal=false
StartupWMClass=$APP_NAME
DESK
        $SUDO mv "/tmp/$APP_ID.desktop" "$APPS_DIR/$APP_ID.desktop"
        info "Generated and installed app-grid entry"
      fi
    fi
  fi

  # Desktop icon
  if $INSTALL_DESKTOP; then
    local desktop_dir="$HOME/Desktop"
    if [ -d "$desktop_dir" ]; then
      if ask "Install desktop icon?"; then
        if [ -f "$APPS_DIR/$APP_ID.desktop" ]; then
          cp "$APPS_DIR/$APP_ID.desktop" "$desktop_dir/$APP_ID.desktop"
        else
          cat > "$desktop_dir/$APP_ID.desktop" <<DESK
[Desktop Entry]
Name=$APP_NAME
Comment=Survival Computing Archive
Exec=$APP_DIR/$APP_ID %U
Icon=$APP_ID
Type=Application
Categories=Development;Utility;
Terminal=false
StartupWMClass=$APP_NAME
DESK
        fi
        chmod +x "$desktop_dir/$APP_ID.desktop"
        # Mark as trusted on GNOME
        if command -v gio &>/dev/null; then
          gio set "$desktop_dir/$APP_ID.desktop" metadata::trusted true 2>/dev/null || true
        fi
        info "Installed desktop icon: $desktop_dir/$APP_ID.desktop"
      fi
    else
      warn "No ~/Desktop directory found; skipping desktop icon"
    fi
  fi

  # Update caches
  if command -v update-desktop-database &>/dev/null; then
    $SUDO update-desktop-database "$APPS_DIR" 2>/dev/null || true
  fi
  if command -v gtk-update-icon-cache &>/dev/null; then
    $SUDO gtk-update-icon-cache -f -t "$ICONS_DIR" 2>/dev/null || true
  fi

  info "$APP_NAME $VERSION installed successfully!"
  echo ""
  echo "  Run with:  $APP_ID"
  echo "  Uninstall: $(dirname "${BASH_SOURCE[0]}")/uninstall.sh"
}

# =====================================================================
# macOS Installation
# =====================================================================
install_macos() {
  info "Installing $APP_NAME on macOS..."

  # Find .app bundle
  APP_BUNDLE=""
  for candidate in \
    "$SCRIPT_DIR/$APP_NAME.app" \
    "$SCRIPT_DIR/../$APP_NAME.app" \
    "$SCRIPT_DIR/../../$APP_NAME.app"; do
    if [ -d "$candidate" ]; then
      APP_BUNDLE="$(cd "$candidate/.." && pwd)/$APP_NAME.app"
      break
    fi
  done

  if [ -z "$APP_BUNDLE" ]; then
    error "Could not find $APP_NAME.app bundle. Run this script from the extracted release directory."
  fi

  info "Source: $APP_BUNDLE"

  # Copy to /Applications
  local dest="/Applications/$APP_NAME.app"
  if [ -d "$dest" ]; then
    warn "$dest already exists"
    if ask "Replace existing installation?"; then
      rm -rf "$dest"
    else
      error "Installation cancelled"
    fi
  fi

  cp -R "$APP_BUNDLE" "$dest"
  info "Installed to $dest"

  # Remove quarantine flag
  xattr -dr com.apple.quarantine "$dest" 2>/dev/null || true
  info "Removed quarantine flag"

  # Dock integration
  if $INSTALL_APPGRID; then
    if ask "Add to Dock?"; then
      # Add to Dock using defaults
      defaults write com.apple.dock persistent-apps -array-add \
        "<dict>
          <key>tile-data</key>
          <dict>
            <key>file-data</key>
            <dict>
              <key>_CFURLString</key>
              <string>file://$dest/</string>
              <key>_CFURLStringType</key>
              <integer>15</integer>
            </dict>
          </dict>
        </dict>"
      killall Dock 2>/dev/null || true
      info "Added $APP_NAME to Dock"
    fi
  fi

  # Desktop alias
  if $INSTALL_DESKTOP; then
    if ask "Create desktop alias?"; then
      osascript -e "
        tell application \"Finder\"
          make alias file to POSIX file \"$dest\" at POSIX file \"$HOME/Desktop\"
        end tell
      " 2>/dev/null || warn "Could not create desktop alias"
      info "Created desktop alias"
    fi
  fi

  info "$APP_NAME $VERSION installed successfully!"
  echo ""
  echo "  Open from: /Applications/$APP_NAME.app"
  echo "  Uninstall: $(dirname "${BASH_SOURCE[0]}")/uninstall.sh"
}

# --- Dispatch ---
case "$OS" in
  Linux)  install_linux ;;
  Darwin) install_macos ;;
  *)      error "Unsupported OS: $OS. This installer supports Linux and macOS." ;;
esac
