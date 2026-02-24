# 06 — Rust Desktop Stack

A complete desktop environment built entirely in Rust — memory-safe from compositor to CLI.

## Smithay Framework (Build Your Own Compositor)

### smithay → `Smithay/smithay`
The Rust framework for building Wayland compositors from scratch.
- **Build**: Library crate — `cargo build`
- **Docs**: https://smithay.github.io/
- **Learn**: `book` fork (Smithay/book) — "Wayland & Smithay" tutorial book

### Supporting Crates
| Fork | Upstream | Purpose |
|------|----------|---------|
| `wayland-rs` | Smithay/wayland-rs | Rust Wayland protocol implementation |
| `client-toolkit` | Smithay/client-toolkit | High-level Wayland client library |
| `calloop` | Smithay/calloop | Callback-based event loop |
| `input.rs` | Smithay/input.rs | libinput Rust bindings |
| `drm-rs` | Smithay/drm-rs | DRM (Direct Rendering Manager) bindings |
| `gbm.rs` | Smithay/gbm.rs | Generic Buffer Manager bindings |
| `udev-rs` | Smithay/udev-rs | libudev bindings for device detection |

All build with `cargo build`. These are the building blocks — smithay combines them into a compositor framework.

## Ready-Made Rust Compositors

### niri → `YaLTeR/niri`
Scrolling tiling Wayland compositor. 20k+ stars, hottest Rust WM.
- **Build**: `cargo build --release`
- **Config**: `~/.config/niri/config.kdl`
- **Docs**: https://github.com/YaLTeR/niri/wiki
- **Key feature**: Infinite horizontal scroll of workspaces, built-in screenshot UI

### COSMIC Desktop → `pop-os/cosmic-epoch`
A complete desktop built on Smithay + iced. 15 repos covering every component:

| Fork | What It Does | Build |
|------|-------------|-------|
| `cosmic-epoch` | Meta-repo / build coordination | `just sysext` |
| `cosmic-comp` | Wayland compositor (Smithay-based) | `cargo build --release` |
| `cosmic-panel` | Top/bottom panel (taskbar) | `cargo build --release` |
| `cosmic-applets` | System tray applets (WiFi, audio, battery) | `cargo build --release` |
| `cosmic-launcher` | Application launcher | `cargo build --release` |
| `cosmic-notifications` | Notification daemon | `cargo build --release` |
| `cosmic-greeter` | Login screen | `cargo build --release` |
| `cosmic-bg` | Wallpaper manager | `cargo build --release` |
| `cosmic-screenshot` | Screenshot tool | `cargo build --release` |
| `cosmic-term` | Terminal emulator | `cargo build --release` |
| `cosmic-edit` | Text editor | `cargo build --release` |
| `cosmic-files` | File manager | `cargo build --release` |
| `cosmic-settings` | System settings | `cargo build --release` |
| `cosmic-store` | Application store | `cargo build --release` |
| `libcosmic` | Shared widget library (built on iced) | `cargo build --release` |

- **Full install**: Follow `cosmic-epoch` README — it orchestrates building everything
- **Docs**: https://system76.com/cosmic
- **Note**: This is the only complete all-Rust desktop in existence

### iced → `iced-rs/iced`
Elm-inspired GUI framework. COSMIC is built on System76's fork of this.
- **Build**: `cargo build --release`
- **Docs**: https://docs.iced.rs/iced/

## Rust Terminal Emulators

### WezTerm → `wez/wezterm`
GPU-accelerated terminal with multiplexing, images, ligatures, and Lua config.
- **Build**: `cargo build --release`
- **Config**: `~/.wezterm.lua`
- **Docs**: https://wezfurlong.org/wezterm/

### Rio → `raphamorim/rio`
GPU-rendered terminal built on WGPU. Fast, cross-platform.
- **Build**: `cargo build --release`
- **Config**: `~/.config/rio/config.toml`
- **Docs**: https://raphamorim.io/rio/

## Rust CLI Tools (Rice Essentials)

Replace every traditional Unix tool with a faster, prettier Rust version:

### Editor
### Helix → `helix-editor/helix`
Modal editor with built-in LSP support. No plugins needed.
- **Build**: `cargo install --path helix-term --locked`
- **Usage**: `hx file.rs` — `i` insert, `Esc` normal, `Space` command menu
- **Docs**: https://docs.helix-editor.com/

### Prompt
### Starship → `starship/starship`
Cross-shell prompt with git status, language versions, and more.
- **Build**: `cargo build --release`
- **Config**: `~/.config/starship.toml`
- **Usage**: Add `eval "$(starship init bash)"` to shell rc
- **Docs**: https://starship.rs/

### Replacements for Classic Tools

| Fork | Replaces | Usage | Build |
|------|----------|-------|-------|
| `bat` | `cat` | `bat file.rs` (syntax highlighting, line numbers, git diff) | `cargo build --release` |
| `eza` | `ls` | `eza -la --icons --git` (icons, git status, tree view) | `cargo build --release` |
| `lsd` | `ls` | `lsd -la` (alternative to eza with different style) | `cargo build --release` |
| `fd` | `find` | `fd pattern` (simple, fast, respects .gitignore) | `cargo build --release` |
| `ripgrep` | `grep` | `rg pattern` (fastest grep, respects .gitignore) | `cargo build --release` |
| `zoxide` | `cd` | `z project` (learns your most-used dirs, fuzzy matching) | `cargo build --release` |

### Shell
### Nushell → `nushell/nushell`
Structured data shell. Pipelines produce tables, not text.
- **Build**: `cargo build --release`
- **Usage**: `nu` → try `ls | where size > 1mb | sort-by modified`
- **Config**: `~/.config/nushell/config.nu`
- **Docs**: https://www.nushell.sh/book/

## Terminal Multiplexer
### Zellij → `zellij-org/zellij`
Rust tmux alternative with discoverable UI and WebAssembly plugin system.
- **Build**: `cargo build --release`
- **Usage**: `zellij` — bottom bar shows keybindings contextually
- **Docs**: https://zellij.dev/documentation/

## The Full Rust Rice Stack

A complete rice using only Rust components:

```
Compositor:    niri (or cosmic-comp)
Panel:         cosmic-panel + cosmic-applets
Launcher:      cosmic-launcher
Notifications: cosmic-notifications
Terminal:      wezterm (or cosmic-term)
Editor:        helix
Shell:         nushell
Prompt:        starship
Multiplexer:   zellij
File Manager:  cosmic-files
ls:            eza
cat:           bat
find:          fd
grep:          ripgrep
cd:            zoxide
```

Every binary in this stack is memory-safe. No C code in the hot path.
