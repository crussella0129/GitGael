# 05 — GUI Enhancement & Ricing

How to build a beautiful, functional desktop from the components in this archive — Linux or FreeBSD.

## What is Ricing?

"Ricing" is the art of customizing your desktop — the window manager, status bar, terminal, colors, fonts, and every visual detail — into a cohesive, personalized environment. The term comes from car culture ("Race Inspired Cosmetic Enhancement") and was adopted by the Linux community on forums like r/unixporn.

A good rice is:
- **Consistent** — one color scheme everywhere, matching fonts, unified aesthetic
- **Functional** — looks good AND works well; form follows function
- **Personal** — reflects how YOU work, not just copied dotfiles

## The Anatomy of a Rice

Every rice has these layers. You choose one component per layer:

```
┌─────────────────────────────────────────────────┐
│                  APPLICATIONS                    │
│     (browser, editor, file manager, terminal)    │
├─────────────────────────────────────────────────┤
│               DESKTOP SHELL                      │
│  (bar, launcher, notifications, lock, wallpaper) │
├─────────────────────────────────────────────────┤
│              WINDOW MANAGER                      │
│      (Hyprland, Sway, niri, i3, COSMIC)          │
├─────────────────────────────────────────────────┤
│              DISPLAY SERVER                      │
│           (Wayland or X11/Xorg)                  │
├─────────────────────────────────────────────────┤
│                 THEMING                          │
│    (GTK/Qt theme, icons, fonts, cursor, colors)  │
├─────────────────────────────────────────────────┤
│                  AUDIO                           │
│          (PipeWire + WirePlumber)                 │
├─────────────────────────────────────────────────┤
│            LOGIN MANAGER                         │
│              (ly, greetd)                        │
└─────────────────────────────────────────────────┘
```

## Choosing Your Path

This archive gives you three major desktop paths. Pick one as your foundation:

### Path A: Hyprland Rice (Flashy, Eye-Candy, Community Favorite)

The most popular rice compositor right now. Smooth animations, rounded corners, blur, and an enormous community making themes.

```
Compositor:     Hyprland
Bar:            Waybar
Launcher:       rofi
Notifications:  dunst or mako
Terminal:       kitty or alacritty
Lock Screen:    hyprlock
Wallpaper:      hyprpaper
Screenshots:    grim + slurp
Clipboard:      wl-clipboard
Login:          ly
```

**Vibe**: Animated, translucent, modern. Think frosted glass, smooth window transitions, and rounded corners everywhere. The r/unixporn showstopper.

**Config files to create**:
```
~/.config/hypr/hyprland.conf      # WM config (keybinds, rules, animations)
~/.config/waybar/config            # Bar modules (JSON)
~/.config/waybar/style.css         # Bar styling
~/.config/rofi/config.rasi         # Launcher appearance
~/.config/dunst/dunstrc            # Notification styling
~/.config/kitty/kitty.conf         # Terminal colors + fonts
~/.config/hypr/hyprlock.conf       # Lock screen appearance
~/.config/hypr/hyprpaper.conf      # Wallpaper paths
```

#### Example: Catppuccin Mocha Hyprland

A cozy, warm-toned rice built on the Catppuccin Mocha palette. This is one of the most replicated rices on r/unixporn.

**Color palette** (Catppuccin Mocha):
```
Base:       #1e1e2e    (dark background)
Mantle:     #181825    (slightly darker)
Surface0:   #313244    (elevated surfaces)
Text:       #cdd6f4    (primary text)
Lavender:   #b4befe    (accents)
Mauve:      #cba6f7    (highlights)
Pink:       #f5c2e7    (active elements)
Red:        #f38ba8    (urgent/errors)
Green:      #a6e3a1    (success)
Blue:       #89b4fa    (links/info)
```

**hyprland.conf** (key sections):
```ini
# Appearance
general {
    gaps_in = 5
    gaps_out = 10
    border_size = 2
    col.active_border = rgba(b4befeff) rgba(cba6f7ff) 45deg
    col.inactive_border = rgba(313244ff)
    layout = dwindle
}

decoration {
    rounding = 12
    blur {
        enabled = true
        size = 8
        passes = 2
        new_optimizations = true
    }
    shadow {
        enabled = true
        range = 15
        render_power = 3
        color = rgba(1a1a2eee)
    }
}

animations {
    enabled = true
    bezier = smooth, 0.05, 0.9, 0.1, 1.05
    animation = windows, 1, 7, smooth
    animation = windowsOut, 1, 7, smooth, popin 80%
    animation = fade, 1, 7, smooth
    animation = workspaces, 1, 6, smooth, slide
}

# Core keybinds
$mod = SUPER
bind = $mod, Return, exec, kitty
bind = $mod, D, exec, rofi -show drun
bind = $mod, Q, killactive
bind = $mod, F, fullscreen
bind = $mod SHIFT, E, exit
bind = , Print, exec, grim -g "$(slurp)" - | wl-copy

# Move focus
bind = $mod, H, movefocus, l
bind = $mod, L, movefocus, r
bind = $mod, K, movefocus, u
bind = $mod, J, movefocus, d

# Workspaces
bind = $mod, 1, workspace, 1
bind = $mod, 2, workspace, 2
# ... through 9
bind = $mod SHIFT, 1, movetoworkspace, 1
bind = $mod SHIFT, 2, movetoworkspace, 2
# ... through 9
```

**Waybar config** (modules):
```json
{
    "layer": "top",
    "position": "top",
    "height": 36,
    "modules-left": ["hyprland/workspaces"],
    "modules-center": ["clock"],
    "modules-right": ["pulseaudio", "network", "cpu", "memory", "battery", "tray"],
    "clock": {
        "format": "  {:%H:%M}",
        "format-alt": "  {:%A, %B %d, %Y}",
        "tooltip-format": "{:%Y-%m-%d | %H:%M}"
    },
    "cpu": {
        "format": "  {usage}%",
        "interval": 2
    },
    "memory": {
        "format": "  {}%"
    },
    "battery": {
        "format": "{icon}  {capacity}%",
        "format-icons": ["", "", "", "", ""]
    },
    "network": {
        "format-wifi": "  {signalStrength}%",
        "format-ethernet": "  wired",
        "format-disconnected": "  none"
    },
    "pulseaudio": {
        "format": "{icon}  {volume}%",
        "format-muted": "  muted",
        "format-icons": { "default": ["", "", ""] }
    }
}
```

**Waybar style.css** (Catppuccin):
```css
* {
    font-family: "JetBrainsMono Nerd Font", monospace;
    font-size: 13px;
    border: none;
    border-radius: 0;
}

window#waybar {
    background-color: rgba(30, 30, 46, 0.85);
    color: #cdd6f4;
}

#workspaces button {
    color: #6c7086;
    padding: 0 8px;
    border-radius: 8px;
    margin: 4px 2px;
}

#workspaces button.active {
    color: #1e1e2e;
    background: #b4befe;
}

#clock, #cpu, #memory, #battery, #network, #pulseaudio {
    padding: 0 12px;
    margin: 4px 2px;
    border-radius: 8px;
    background-color: #313244;
}

#battery.charging { color: #a6e3a1; }
#battery.warning:not(.charging) { color: #f38ba8; }
```

---

### Path B: Sway Rice (Clean, Minimal, Productive)

i3-compatible but on Wayland. No animations, no blur — just clean lines and efficient workflow. The choice for people who want their computer to disappear and let them work.

```
Compositor:     Sway
Bar:            Waybar (or swaybar for ultra-minimal)
Launcher:       rofi or bemenu
Notifications:  mako
Terminal:       alacritty
Lock Screen:    swaylock
Wallpaper:      swaybg
Screenshots:    grim + slurp
Clipboard:      wl-clipboard
Login:          ly
```

**Vibe**: Stark, no-nonsense, fast. Solid colors, sharp borders, no wasted pixels. The productivity machine.

**sway/config** (key sections):
```bash
# Theme colors (Dracula)
set $bg     #282a36
set $fg     #f8f8f2
set $cyan   #8be9fd
set $green  #50fa7b
set $orange #ffb86c
set $pink   #ff79c6
set $purple #bd93f9
set $red    #ff5555

# Window borders
client.focused          $purple $purple $fg $pink $purple
client.focused_inactive $bg     $bg     $fg $bg   $bg
client.unfocused        $bg     $bg     $fg $bg   $bg
client.urgent           $red    $red    $fg $red  $red

# Appearance
default_border pixel 2
gaps inner 6
gaps outer 2
font pango:JetBrainsMono Nerd Font 10

# Output (monitor)
output * bg ~/wallpaper.png fill

# Input
input type:keyboard {
    xkb_options caps:escape
}

# Keybinds
set $mod Mod4
bindsym $mod+Return exec alacritty
bindsym $mod+d exec rofi -show drun
bindsym $mod+Shift+q kill
bindsym $mod+Shift+e exec swaynag -t warning \
    -m "Exit sway?" -B "Yes" "swaymsg exit"

# Vi-like focus
bindsym $mod+h focus left
bindsym $mod+j focus down
bindsym $mod+k focus up
bindsym $mod+l focus right

# Split
bindsym $mod+b splith
bindsym $mod+v splitv

# Layouts
bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split
bindsym $mod+f fullscreen

# Workspaces
bindsym $mod+1 workspace number 1
# ... through 9
bindsym $mod+Shift+1 move container to workspace number 1
# ... through 9

# Lock
bindsym $mod+Escape exec swaylock -f -c 282a36

# Screenshot
bindsym Print exec grim -g "$(slurp)" - | wl-copy
```

---

### Path C: Full Rust Rice (niri or COSMIC — Memory-Safe Everything)

The future. An entire desktop where every component is written in Rust. No buffer overflows, no use-after-free, no segfaults.

#### Option C1: niri — Scrolling Tiling

Unlike traditional tiling WMs where windows fill a fixed grid, niri uses an infinite horizontal strip. Windows scroll left/right like a timeline. Strange at first, transformative once you adapt.

```
Compositor:     niri
Bar:            waybar (niri supports it natively)
Launcher:       rofi (via spawn)
Notifications:  mako
Terminal:       wezterm
Lock Screen:    swaylock (niri-compatible)
Wallpaper:      swaybg (or niri's built-in)
Shell:          nushell
Prompt:         starship
Editor:         helix
```

**niri config.kdl** (key sections):
```kdl
// Appearance
layout {
    gaps 8
    center-focused-column "never"

    default-column-width { proportion 0.5; }

    preset-column-widths {
        proportion 0.33333
        proportion 0.5
        proportion 0.66667
    }

    focus-ring {
        width 2
        active-color "#b4befe"
        inactive-color "#313244"
    }

    border {
        off
    }
}

// Animations (niri has beautiful built-in animations)
animations {
    workspace-switch {
        spring damping-ratio=1.0 stiffness=1000 epsilon=0.0001
    }
    window-open {
        duration-ms 200
        curve "ease-out-expo"
    }
}

// Keybinds
binds {
    Mod+Return { spawn "wezterm"; }
    Mod+D { spawn "rofi" "-show" "drun"; }
    Mod+Q { close-window; }

    Mod+H { focus-column-left; }
    Mod+J { focus-window-down; }
    Mod+K { focus-window-up; }
    Mod+L { focus-column-right; }

    Mod+Shift+H { move-column-left; }
    Mod+Shift+L { move-column-right; }

    Mod+1 { focus-workspace 1; }
    Mod+2 { focus-workspace 2; }
    // ... through 9

    Mod+R { switch-preset-column-width; }
    Mod+F { maximize-column; }
    Mod+Shift+F { fullscreen-window; }

    Print { screenshot; }
    Mod+Print { screenshot-window; }
}
```

#### Option C2: COSMIC — Full Desktop Environment

If you want something closer to GNOME or KDE but all in Rust, COSMIC gives you the full DE experience: panels, applets, settings app, file manager, terminal, text editor — everything.

No manual config needed. It's a full desktop environment with a settings GUI. Just build `cosmic-epoch` and everything comes together.

**Best for**: People who want a polished, complete experience out of the box rather than assembling pieces.

---

---

### Path D: FreeBSD Rice (Native BSD, Self-Contained)

The BSD path. FreeBSD's base system is radically self-contained — kernel, init, compiler, firewall, and hypervisor in one source tree. The desktop stack is leaner but requires more assembly.

```
Display Server: Arcan (or Xorg via ports)
Desktop:        Durden (tiling DE for Arcan)
Terminal:       Alacritty or Kitty (from ports/poudriere)
Shell:          sh (base) or fish/zsh (from ports)
Fetch:          bsdfetch
Launcher:       rofi (from ports)
Notifications:  dunst or mako (from ports)
Login:          ly (from ports)
Package Mgmt:   poudriere (build) + pkg (install)
```

**Vibe**: Minimalist, self-reliant, everything-from-source. The closest to "I built this entire system myself."

**Key differences from Linux ricing:**
- **No systemd** — services managed via rc.d scripts in `/etc/rc.conf`
- **No PipeWire** — audio via OSS (built into kernel) or sndio from ports
- **ZFS native** — root-on-ZFS with boot environments for instant OS rollback
- **Jails instead of Docker** — use Bastille for container-like workflow
- **pf instead of iptables** — configure firewall via `/etc/pf.conf`
- **GPU support narrower** — Intel/AMD via drm-kmod; NVIDIA limited to proprietary driver

**Setup reference**: Use the `installDesktopFreeBSD` or `desktop-installer` forks as starting points for assembling a complete FreeBSD desktop.


## Theming Deep Dive

### Choosing a Color Scheme

The color scheme is the DNA of your rice. Pick one and apply it EVERYWHERE — terminal, bar, compositor borders, GTK apps, rofi, notifications.

**Color schemes in this archive:**

| Theme | Fork | Vibe | Best For |
|-------|------|------|----------|
| **Catppuccin** | `catppuccin/catppuccin` | Warm pastels, 4 flavors (Latte/Frappe/Macchiato/Mocha) | Most rices. Mocha is the most popular. |
| **Dracula** | `dracula/dracula-theme` | Cool purple-centric dark theme | Clean, professional feel |

**Rolling your own**: Any theme needs these 16 colors:
```
Background, Foreground, Cursor
Black (normal + bright)
Red (normal + bright)
Green (normal + bright)
Yellow (normal + bright)
Blue (normal + bright)
Magenta (normal + bright)
Cyan (normal + bright)
White (normal + bright)
```
Define these once, then port to every config file.

### Fonts

Fonts make or break a rice. You need:

1. **Monospace** (terminal, editor, bar): JetBrainsMono Nerd Font, FiraCode Nerd Font, or Hack Nerd Font
2. **Sans-serif** (UI, GTK apps): Inter, Cantarell, or Noto Sans
3. **Icons**: Nerd Fonts patches icon glyphs into your monospace font

The `nerd-fonts` fork contains all patched fonts. Install with:
```bash
# Install a specific font
cp JetBrainsMono/*.ttf ~/.local/share/fonts/
fc-cache -fv
```

### Icons

The `papirus-icon-theme` fork provides 5,000+ pixel-perfect SVG icons:
```bash
cp -r Papirus Papirus-Dark Papirus-Light /usr/share/icons/
gtk-update-icon-cache /usr/share/icons/Papirus
```

Set via GTK settings:
```ini
# ~/.config/gtk-3.0/settings.ini
[Settings]
gtk-icon-theme-name=Papirus-Dark
gtk-theme-name=Adwaita-dark
gtk-font-name=Inter 11
gtk-cursor-theme-name=Adwaita
```

### GTK Theming

GTK apps (GIMP, Inkscape, Firefox) read theme settings from:
```
~/.config/gtk-3.0/settings.ini    # GTK3
~/.config/gtk-4.0/settings.ini    # GTK4
```

For Wayland, also set environment variables:
```bash
# In your compositor config or ~/.profile
export GTK_THEME=Adwaita:dark
export QT_QPA_PLATFORMTHEME=qt5ct    # For Qt app theming
```

Catppuccin provides GTK themes: install from the `catppuccin` fork's `gtk` directory.

---

## Terminal Rice

The terminal is where you spend most of your time. Make it beautiful.

### Kitty (Recommended for Eye Candy)

```ini
# ~/.config/kitty/kitty.conf

# Font
font_family      JetBrainsMono Nerd Font
bold_font        auto
italic_font      auto
font_size        12.0

# Appearance
background_opacity 0.92
window_padding_width 12
confirm_os_window_close 0
hide_window_decorations yes

# Catppuccin Mocha colors
foreground              #CDD6F4
background              #1E1E2E
selection_foreground    #1E1E2E
selection_background    #F5E0DC
cursor                  #F5E0DC
cursor_text_color       #1E1E2E
url_color               #F5E0DC

# Normal colors
color0  #45475A
color1  #F38BA8
color2  #A6E3A1
color3  #F9E2AF
color4  #89B4FA
color5  #F5C2E7
color6  #94E2D5
color7  #BAC2DE

# Bright colors
color8  #585B70
color9  #F38BA8
color10 #A6E3A1
color11 #F9E2AF
color12 #89B4FA
color13 #F5C2E7
color14 #94E2D5
color15 #A6ADC8
```

### Alacritty (Recommended for Speed)

```toml
# ~/.config/alacritty/alacritty.toml

[font]
size = 12.0

[font.normal]
family = "JetBrainsMono Nerd Font"
style = "Regular"

[window]
opacity = 0.92
padding = { x = 12, y = 12 }
decorations = "None"

[colors.primary]
background = "#1E1E2E"
foreground = "#CDD6F4"

[colors.normal]
black   = "#45475A"
red     = "#F38BA8"
green   = "#A6E3A1"
yellow  = "#F9E2AF"
blue    = "#89B4FA"
magenta = "#F5C2E7"
cyan    = "#94E2D5"
white   = "#BAC2DE"

[colors.bright]
black   = "#585B70"
red     = "#F38BA8"
green   = "#A6E3A1"
yellow  = "#F9E2AF"
blue    = "#89B4FA"
magenta = "#F5C2E7"
cyan    = "#94E2D5"
white   = "#A6ADC8"
```

### Shell Prompt (Starship)

```toml
# ~/.config/starship.toml

format = """
[](#89B4FA)\
$os\
$username\
[](bg:#CBA6F7 fg:#89B4FA)\
$directory\
[](fg:#CBA6F7 bg:#A6E3A1)\
$git_branch\
$git_status\
[](fg:#A6E3A1 bg:#F9E2AF)\
$rust\
$python\
$golang\
[](fg:#F9E2AF bg:#89DCEB)\
$time\
[ ](fg:#89DCEB)\
"""

[username]
style_user = "bg:#89B4FA fg:#1E1E2E"
style_root = "bg:#F38BA8 fg:#1E1E2E"
format = "[ $user ]($style)"
show_always = true

[os]
style = "bg:#89B4FA fg:#1E1E2E"
disabled = false

[directory]
style = "bg:#CBA6F7 fg:#1E1E2E"
format = "[ $path ]($style)"
truncation_length = 3

[git_branch]
style = "bg:#A6E3A1 fg:#1E1E2E"
format = "[ $symbol$branch ]($style)"
symbol = " "

[git_status]
style = "bg:#A6E3A1 fg:#1E1E2E"
format = "[$all_status$ahead_behind]($style)"

[time]
disabled = false
style = "bg:#89DCEB fg:#1E1E2E"
format = "[  $time ]($style)"
time_format = "%H:%M"
```

---

## Notable Rices (Inspirational Examples)

These are famous rice styles from the Linux community to inspire your builds. All achievable with the tools in this archive.

### "The Cozy Catppuccin"
The most replicated rice on r/unixporn in 2024-2025.
- **Compositor**: Hyprland with rounded corners (rounding=12), blur, shadows
- **Bar**: Waybar with pill-shaped modules, Catppuccin Mocha colors
- **Terminal**: Kitty with 90% opacity, padding, no decorations
- **Font**: JetBrainsMono Nerd Font
- **Wallpaper**: Anime/landscape art in muted Catppuccin tones
- **Launcher**: rofi with Catppuccin theme, rounded corners
- **Key feature**: Everything is soft — round corners, translucent surfaces, warm colors

### "The Nord Minimal"
Scandinavian-inspired, icy blue and white.
- **Compositor**: Sway, pixel borders, no gaps or minimal 4px
- **Bar**: Waybar, flat, no background, just text
- **Terminal**: Alacritty, 100% opaque, minimal padding
- **Font**: Iosevka or Hack
- **Wallpaper**: Flat color (#2E3440) or subtle geometric pattern
- **Key feature**: Almost monochrome. Blue accents on dark gray. Nothing animated.

### "The Dracula Purple"
High contrast purple-on-dark theme.
- **Compositor**: Hyprland or Sway
- **Bar**: Waybar with Dracula purple accents
- **Terminal**: Any, Dracula colors
- **Accent**: #BD93F9 (purple) everywhere — borders, active workspace, cursor
- **Key feature**: Purple is the star. Everything else fades into background.

### "The Gruvbox Retro"
Warm, retro color scheme inspired by vintage computing.
- **Colors**: bg=#282828, fg=#ebdbb2, accent=#fabd2f (yellow), #83a598 (aqua)
- **Compositor**: Sway (matches the no-nonsense aesthetic)
- **Font**: Terminus or Hack
- **Key feature**: Warm browns, oranges, yellows. Feels like amber-on-black CRT terminals.

### "The Full Rust"
For the security-conscious and forward-looking.
- **Compositor**: niri (scrolling tiles)
- **Terminal**: WezTerm with Lua config
- **Shell**: Nushell with structured data
- **Editor**: Helix (built-in LSP, no plugins)
- **Every CLI tool**: Rust (bat, eza, fd, ripgrep, zoxide)
- **Key feature**: Memory-safe from top to bottom. Unique scrolling workflow with niri.

### "The COSMIC System76"
Full desktop environment, no assembly required.
- **Everything**: COSMIC (cosmic-comp, cosmic-panel, cosmic-term, cosmic-files, etc.)
- **Theme**: Built-in theme system with dark/light modes
- **Key feature**: Complete DE experience like GNOME/KDE but all in Rust. Settings GUI, app store, no config files needed.

---

## Step-by-Step: Your First Rice

### 1. Install the Base

Follow [01-system-foundation.md](01-system-foundation.md) to get a running system (Linux or FreeBSD), then:

```bash
# Install display server dependencies (from archive)
# Build PipeWire + WirePlumber for audio
# Build your chosen compositor
```

### 2. Choose and Build Your Compositor

Pick Hyprland, Sway, niri, or COSMIC and build it from its fork.

### 3. Set Up Login

Build `ly` from the fork. Configure `/etc/ly/config.ini` to start your compositor:
```ini
# /etc/ly/config.ini
animate = true
# Compositor will be auto-detected from .desktop files in
# /usr/share/wayland-sessions/
```

### 4. Build Desktop Components

Build Waybar, rofi, your notification daemon, and screen locker from their forks.

### 5. Install Fonts and Theme

From the archive:
```bash
# Install Nerd Fonts
cp nerd-fonts/patched-fonts/JetBrainsMono/Ligatures/*/*.ttf ~/.local/share/fonts/
fc-cache -fv

# Install Papirus icons
cp -r papirus-icon-theme/Papirus* /usr/share/icons/

# Install Catppuccin or Dracula GTK theme
# (follow instructions in the theme fork)
```

### 6. Configure Everything

Create config files for each component. Use one of the example rices above as your starting point, then customize.

### 7. Iterate

The best rices evolve over time. Start functional, then refine aesthetics. Screenshot, compare, tweak.

---

## Config File Locations Quick Reference

| Component | Config Path |
|-----------|------------|
| **Hyprland** | `~/.config/hypr/hyprland.conf` |
| **Sway** | `~/.config/sway/config` |
| **niri** | `~/.config/niri/config.kdl` |
| **i3** | `~/.config/i3/config` |
| **Waybar** | `~/.config/waybar/config` + `style.css` |
| **rofi** | `~/.config/rofi/config.rasi` |
| **dunst** | `~/.config/dunst/dunstrc` |
| **mako** | `~/.config/mako/config` |
| **Kitty** | `~/.config/kitty/kitty.conf` |
| **Alacritty** | `~/.config/alacritty/alacritty.toml` |
| **WezTerm** | `~/.wezterm.lua` |
| **Starship** | `~/.config/starship.toml` |
| **Nushell** | `~/.config/nushell/config.nu` |
| **Helix** | `~/.config/helix/config.toml` + `languages.toml` |
| **GTK3** | `~/.config/gtk-3.0/settings.ini` |
| **GTK4** | `~/.config/gtk-4.0/settings.ini` |
| **PipeWire** | `~/.config/pipewire/pipewire.conf` |
| **hyprlock** | `~/.config/hypr/hyprlock.conf` |
| **hyprpaper** | `~/.config/hypr/hyprpaper.conf` |
| **swaylock** | `~/.config/swaylock/config` |

## Community and Inspiration

Before the internet goes down, archive these resources:
- **r/unixporn** — the subreddit where people showcase rices (use yt-dlp + gallery-dl to archive)
- **Catppuccin ports**: https://catppuccin.com/ — themed configs for 200+ apps
- **Dracula ports**: https://draculatheme.com/ — same, for Dracula
- **Hyprland wiki**: https://wiki.hyprland.org/ — extensive config documentation
- **dotfiles repos** — search GitHub for "dotfiles hyprland" or "dotfiles sway" and archive good ones

The best way to learn ricing is to study others' dotfiles, understand what each line does, and adapt it to your taste.
