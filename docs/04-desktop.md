# 04 — Desktop & GUI (C/C++ Stack)

Desktop environments and GUI tools for Linux and FreeBSD, built on Wayland/X11 with C/C++ tools.

## Display Servers

### X.Org Server → `XQuartz/xorg-server`
Legacy X11 display server. Needed for older apps.
- **Build**: Complex, many dependencies. Use distro packages where possible.
- **Docs**: https://www.x.org/wiki/

**Note**: Wayland protocol libraries are mirrored — see `crussella0129/wayland` (mirrored from gitlab.freedesktop.org).

### wlroots → `wlroots` (fork of `swaywm/wlroots`)
Modular Wayland compositor library. The foundation that Sway, Hyprland, and most tiling Wayland compositors are built on.
- **Build**: `meson setup build && ninja -C build`
- **Docs**: https://gitlab.freedesktop.org/wlroots/wlroots
- **Note**: Without wlroots, you cannot build Sway or any wlroots-based compositor. This is the single most critical Wayland dependency.

### wlr-protocols → `wlr-protocols` (fork of `swaywm/wlr-protocols`)
Wayland protocol extensions for wlroots compositors. Build dependency for Sway and other wlroots-based compositors.

### Arcan → `arcan` (fork of `letoram/arcan`)
Display Server + Multimedia Framework. Wayland-compatible, runs natively on FreeBSD and Linux. Security-conscious design with process isolation. Runs directly on KMS/DRM.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://arcan-fe.com/
- **Note**: The most FreeBSD-native display server option.

### XLibre Ports → `xlibre-ports` (fork of `b-aaz/xlibre-ports`)
Port of XLibre (X.org fork) to FreeBSD and DragonFlyBSD. Maintained X11 implementation for BSD systems.


## Wayland Compositors

### Hyprland → `hyprwm/Hyprland`
Dynamic tiling Wayland compositor with animations and eye candy. The flashiest option.
- **Build**: `cmake -B build && cmake --build build && cmake --install build`
- **Config**: `~/.config/hypr/hyprland.conf`
- **Docs**: https://wiki.hyprland.org/
- **Companion tools**: `hyprlock` (locker), `hyprpaper` (wallpaper)

### Sway → `swaywm/sway`
i3-compatible Wayland compositor. Rock-solid, minimal.
- **Build**: `meson setup build && ninja -C build`
- **Config**: `~/.config/sway/config` (same syntax as i3)
- **Docs**: https://swaywm.org/ and `man 5 sway`
- **Companion tools**: `swaylock` (locker), `swaybg` (wallpaper)

### i3 → `i3` (fork of `i3/i3`)
Classic X11 tiling window manager. The original that Sway reimplements.
- **Build**: `meson setup build && ninja -C build`
- **Config**: `~/.config/i3/config`
- **Docs**: https://i3wm.org/docs/


### Durden → `durden` (fork of `letoram/durden`)
Desktop environment built on Arcan. Tiling WM with extensive Lua customization. The most FreeBSD-native desktop option.
- **Config**: Lua scripts under the Durden directory
- **Docs**: https://durden.arcan-fe.com/


## Desktop Components

### Waybar → `Alexays/Waybar`
Highly customizable status bar for Wayland.
- **Build**: `meson setup build && ninja -C build`
- **Config**: `~/.config/waybar/config` (JSON) + `style.css`
- **Docs**: https://github.com/Alexays/Waybar/wiki

### rofi → `davatorium/rofi`
Application launcher, window switcher, dmenu replacement.
- **Build**: `meson setup build && ninja -C build`
- **Usage**: `rofi -show drun` (app launcher) / `rofi -show window` (window switcher)
- **Config**: `~/.config/rofi/config.rasi`

### dunst → `dunst-project/dunst`
Lightweight notification daemon (works on X11 and Wayland).
- **Build**: `make && make install`
- **Config**: `~/.config/dunst/dunstrc`
- **Docs**: https://dunst-project.org/documentation/

### mako → `emersion/mako`
Wayland-native notification daemon. Simpler than dunst.
- **Build**: `meson setup build && ninja -C build`
- **Config**: `~/.config/mako/config`

### grim + slurp → `emersion/grim` + `emersion/slurp`
Wayland screenshot tools. grim captures, slurp selects regions.
- **Usage**: `grim screenshot.png` (full screen) / `grim -g "$(slurp)" screenshot.png` (selection)

### wl-clipboard → `bugaevc/wl-clipboard`
Wayland clipboard utilities.
- **Usage**: `echo "text" | wl-copy` / `wl-paste`

### ly → `fairyglade/ly`
Lightweight TUI display/login manager.
- **Build**: `make && make install`
- **Config**: `/etc/ly/config.ini`


### NetworkMgr → `networkmgr` (fork of `ghostbsd/networkmgr`)
Python GTK3 network manager for FreeBSD/GhostBSD. GUI for WiFi, Ethernet, VPN connections.

### FreeBSD Desktop Installer → `installDesktopFreeBSD` (fork of `broozar/installDesktopFreeBSD`)
Automated FreeBSD desktop setup — installs X11, window manager, and common desktop apps in one script.

### BSD Desktop Installer → `desktop-installer` (fork of `outpaddling/desktop-installer`)
Quick desktop configuration for FreeBSD, NetBSD, and OpenBSD. Multi-BSD support.

### OctoPkg → `octopkg` (fork of `aarnt/octopkg`)
Qt-based graphical package manager frontend for FreeBSD's pkg.


## Terminal Emulators

### Alacritty → `alacritty/alacritty`
GPU-accelerated terminal. Fastest option.
- **Build**: `cargo build --release`
- **Config**: `~/.config/alacritty/alacritty.toml`
- **Docs**: https://alacritty.org/

### Kitty → `kovidgoyal/kitty`
GPU-based terminal with images, tabs, splits, and remote control.
- **Build**: `python setup.py linux-package`
- **Config**: `~/.config/kitty/kitty.conf`
- **Docs**: https://sw.kovidgoyal.net/kitty/

## File Managers

### nnn → `jarun/nnn`
Blazing-fast terminal file manager. Tiny, plugin-extensible.
- **Build**: `make O_NERD=1 && make install`
- **Usage**: `nnn` — navigate with arrows, `Enter` to open, `q` to quit
- **Docs**: https://github.com/jarun/nnn/wiki

### ranger → `ranger/ranger`
VIM-inspired console file manager with preview.
- **Install**: `pip install ranger-fm` or `make install`
- **Usage**: `ranger` — `h/j/k/l` to navigate, `S` to drop to shell

## Theming

### GTK → `GNOME/gtk`
The GTK toolkit (GTK4). Foundation of GNOME apps.
- **Build**: `meson setup build && ninja -C build`
- **Docs**: https://docs.gtk.org/gtk4/

### Qt → `qt/qtbase`
The Qt toolkit base modules (Core, Gui, Widgets, Network).
- **Build**: `./configure && cmake --build . --parallel`
- **Docs**: https://doc.qt.io/

### Catppuccin → `catppuccin/catppuccin`
Soothing pastel theme with ports for 200+ apps.
- **Install**: Follow per-app instructions at https://catppuccin.com/

### Dracula → `dracula/dracula-theme`
Dark theme for everything.
- **Install**: Follow per-app instructions at https://draculatheme.com/


### iTerm2 Color Schemes → `iTerm2-Color-Schemes` (fork of `mbadolato/iTerm2-Color-Schemes`)
450+ terminal color schemes for virtually every terminal emulator — Alacritty, Kitty, WezTerm, FreeBSD VT, and more.


### Papirus Icons → `PapirusDevelopmentTeam/papirus-icon-theme`
Pixel-perfect SVG icon theme.
- **Install**: `cp -r Papirus* /usr/share/icons/ && gtk-update-icon-cache`

### Nerd Fonts → `nerd-fonts` (fork of `ryanoasis/nerd-fonts`)
Patched fonts with 10,000+ icons. Essential for starship, Waybar, terminal rice, and every riced config in this archive.
- **Install**: Download and install patched font families (JetBrainsMono, FiraCode, Hack, etc.)
- **Docs**: https://www.nerdfonts.com/

## Desktop Applications

### GIMP → `GNOME/gimp`
GNU Image Manipulation Program. Full Photoshop alternative.
- **Build**: `meson setup build && ninja -C build`
- **Docs**: https://docs.gimp.org/

### Inkscape → `inkscape/inkscape`
Vector graphics editor. SVG editing, logo design, technical drawing.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://inkscape.org/doc/

### LibreOffice → `core-2` (fork of `LibreOffice/core`)
Full office suite (Writer, Calc, Impress, Draw, Base).
- **Build**: `./autogen.sh && make` (very large build, 30min+)
- **Docs**: https://wiki.documentfoundation.org/

### OBS Studio → `obsproject/obs-studio`
Screen recording and streaming.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://obsproject.com/wiki/

### Blueprint → `blueprint` (fork of `palantir/blueprint`)
React-based UI component library for building web applications.
- **Build**: `yarn install && yarn build`
- **Components**: Tables, forms, date pickers, trees, icons, dialogs, toasts, menus, and 30+ more
- **Docs**: https://blueprintjs.com/docs/
- **Use case**: Build offline web-based management interfaces, dashboards, or data tools. Pairs with any local web server (Caddy, etc.)

### VLC → `videolan/vlc`
Plays everything. Audio, video, streams, discs.
- **Build**: `./bootstrap && ./configure && make`
- **Docs**: https://wiki.videolan.org/

### mpv → `mpv-player/mpv`
Minimalist video player. Scriptable, powerful.
- **Build**: `meson setup build && ninja -C build`
- **Usage**: `mpv video.mp4` / `mpv --no-video music.flac`
- **Docs**: https://mpv.io/manual/

### Firefox (Gecko) → `gecko-dev` (fork of `mozilla/gecko-dev`)
The Firefox browser engine. Independent from Chromium — builds a complete browser from source.
- **Build**: `./mach bootstrap && ./mach build` (requires ~40GB disk, 16GB RAM recommended)
- **Usage**: `./mach run`
- **Docs**: https://firefox-source-docs.mozilla.org/
- **Why Firefox over Brave?**: Brave is Chromium-based (extremely complex build). Firefox/Gecko is an independent engine — diversity matters when you can't phone home for updates. Both are included for redundancy.

### Brave Browser → `brave/brave-browser`
Chromium-based browser for local web apps.
- **Build**: Complex Chromium build process. See repo README.
- **Docs**: https://brave.com/

### FFmpeg → `FFmpeg` (fork of `ffmpeg/ffmpeg`)
Universal media encoder, decoder, transcoder, muxer, demuxer, and streamer. The foundation of nearly every media tool (VLC, mpv, OBS all depend on it).
- **Build**: `./configure --enable-gpl --enable-libx264 --enable-libx265 && make -j$(nproc) && make install`
- **Usage**: `ffmpeg -i input.mp4 -c:v libx264 output.mkv` / `ffmpeg -i video.mp4 -vn -acodec mp3 audio.mp3`
- **Docs**: https://ffmpeg.org/documentation.html
- **Use case**: Convert between any media format, extract audio from video, transcode for different devices, stream over network.

### ImageMagick → `ImageMagick` (fork of `ImageMagick/ImageMagick`)
Command-line image processing: resize, crop, convert, composite, annotate across 200+ formats.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `convert input.png -resize 50% output.png` / `convert *.jpg output.pdf`
- **Docs**: https://imagemagick.org/script/command-line-processing.php

## Code Editors & Developer Tools

### Neovim → `neovim` (fork of `neovim/neovim`)
Hyperextensible Vim-based text editor. Lua scripting, LSP support, async plugins, treesitter.
- **Build**: `make CMAKE_BUILD_TYPE=Release && make install`
- **Usage**: `nvim file.txt`
- **Config**: `~/.config/nvim/init.lua`
- **Docs**: https://neovim.io/doc/
- **Note**: The most powerful terminal editor. Extensive plugin ecosystem (lazy.nvim, telescope, mason). Works over SSH on headless machines.

### VS Code → `vscode` (fork of `microsoft/vscode`)
Full-featured code editor. MIT. Cornerstone IDE for development.

### Monaco Editor → `monaco-editor` (fork of `microsoft/monaco-editor`)
Browser-based code editor core (powers VS Code). Embeddable in web UIs.

### Edit → `edit` (fork of `microsoft/edit`)
Terminal text editor in Rust. Lightweight, fast, zero dependencies.

### InShellisense → `inshellisense` (fork of `microsoft/inshellisense`)
IDE-style command line autocomplete for bash, zsh, fish.

## Desktop Application Frameworks

### Electron → `electron` (fork of `electron/electron`)
Build cross-platform desktop apps with JavaScript, HTML, and CSS. Powers VS Code, Discord, Slack, and thousands of apps.
- **Build**: See repo README (complex Chromium-based build)
- **Docs**: https://www.electronjs.org/docs
- **Use case**: Build desktop applications using web technologies. Required runtime for VS Code and other Electron-based apps in this archive.

### Electron Fiddle → `fiddle` (fork of `electron/fiddle`)
Interactive playground for learning and prototyping Electron apps. Write, run, and experiment with Electron code without project setup.
- **Build**: `yarn install && yarn start`
- **Docs**: https://www.electronjs.org/fiddle

### Tauri → `tauri` (fork of `tauri-apps/tauri`)
Build cross-platform desktop apps with a Rust backend and web frontend. 10x smaller than Electron, better performance, stronger security.
- **Build**: `cargo install tauri-cli && cargo tauri build`
- **Docs**: https://v2.tauri.app/
- **Use case**: Modern alternative to Electron. Produces tiny binaries (~600KB vs ~150MB), uses the OS webview instead of bundling Chromium, and sandboxes the frontend from the backend.

### Tauri Docs → `tauri-docs` (fork of `tauri-apps/tauri-docs`)
Complete Tauri documentation and guides. Covers setup, API reference, plugins, recipes, and migration from Electron.
- **Build**: VitePress site — `pnpm install && pnpm build`
- **Docs**: https://v2.tauri.app/
- **Use case**: Offline reference for building Tauri applications.

### Clay → `clay` (fork of `nicbarker/clay`)
High-performance 2D UI layout library in C. Single-header, zero dependencies, microsecond layout performance.
- **Build**: Include `clay.h` in your C/C++ project
- **Docs**: https://github.com/nicbarker/clay
- **Use case**: Build custom UI layouts for embedded systems, desktop apps, or game UIs. Pairs with any renderer (OpenGL, Vulkan, terminal). Used for building Tauri-style lightweight native UIs.

## Fonts (Extended)

### Cascadia Code → `cascadia-code` (fork of `microsoft/cascadia-code`)
Monospaced programming font with ligatures. SIL OFL.

### Noto Fonts → `noto-fonts` (fork of `googlefonts/noto-fonts`)
Universal font family covering all non-CJK Unicode scripts.

### Noto CJK → `noto-cjk` (fork of `googlefonts/noto-cjk`)
Chinese, Japanese, Korean fonts. Essential for multilingual support.

### Noto Emoji → `noto-emoji` (fork of `googlefonts/noto-emoji`)
Emoji font for complete Unicode emoji coverage.

### Roboto → `roboto-2` (fork of `googlefonts/roboto`)
Android's default UI font family.

## Icons (Extended)

### Material Design Icons → `material-design-icons` (fork of `google/material-design-icons`)
4000+ SVG icons — the Material Design icon vocabulary.

### Fluent UI System Icons → `fluentui-system-icons` (fork of `microsoft/fluentui-system-icons`)
4000+ SVG icons from Microsoft's Fluent design system.

## Graphics Engines

### Filament → `filament` (fork of `google/filament`)
Real-time physically-based 3D rendering engine. Vulkan/OpenGL. Apache-2.0.

### Skia → `skia` (fork of `google/skia`)
Complete 2D graphics library. Powers Chrome, Android, Flutter.

## System Information

### bsdfetch → `bsdfetch` (fork of `jhx0/bsdfetch`)
System information display for FreeBSD/OpenBSD/NetBSD/DragonflyBSD. The neofetch equivalent for BSD systems.


## Audio

### PipeWire → `PipeWire/pipewire`
Modern audio/video server replacing PulseAudio and JACK.
- **Build**: `meson setup build && ninja -C build`
- **Config**: `~/.config/pipewire/`
- **Docs**: https://docs.pipewire.org/

### WirePlumber → `PipeWire/wireplumber`
PipeWire session/policy manager.
- **Build**: `meson setup build && ninja -C build`
- **Config**: `~/.config/wireplumber/`
