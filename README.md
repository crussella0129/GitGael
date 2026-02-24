# GitGael — Survival Computing Archive

A curated archive of **thousands of public repos** (~500 GB) containing everything needed to rebuild a complete computing stack from scratch — no internet or civilization required. Covers both **Linux** and **FreeBSD** paths, from bare metal to riced desktop. This repository serves as the master index with installation guides, usage docs, and learning resources for every fork.

## How to Use This Archive

1. **Before collapse**: `git clone --mirror` every fork to local storage (NAS, external drives)
2. **After collapse**: Use this guide to find, build, and install what you need
3. **Build order matters**: Start with [01 - System Foundation](#01---system-foundation), then work up the stack

## Quick Reference: Build Order

### Linux Path
```
Hardware → Firmware (coreboot/u-boot) → Kernel (linux) → Init (systemd)
→ Bootstrap (m4/autoconf/automake/libtool/flex/bison/gmp/mpfr/mpc)
→ Toolchain (gcc/glibc/binutils) → Shell (bash/fish/nushell)
→ Build Systems (make/cmake/meson/ninja) → Core Utils (busybox/util-linux)
→ Networking (openssh/NetworkManager) → Display (wayland/xorg)
→ Desktop (Hyprland/COSMIC/sway) → Applications
```

### FreeBSD Path
```
Hardware → Firmware (coreboot/u-boot) → Base System (freebsd-src: kernel +
  init + compiler + userland + pf firewall + bhyve + jails + Capsicum)
→ GPU (drm-kmod) → ZFS (openzfs) → Ports (freebsd-ports)
→ Package Build (poudriere) → Package Install (pkg)
→ Display (arcan/xorg) → Desktop (durden/sway) → Applications
```

## Table of Contents

| Section | File | Contents |
|---------|------|----------|
| **01 — System Foundation** | [docs/01-system-foundation.md](docs/01-system-foundation.md) | Kernel, bootloaders, init, firmware, device management |
| **02 — Toolchains & Languages** | [docs/02-languages.md](docs/02-languages.md) | Compilers, interpreters, build systems, learning resources |
| **03 — Core Userland** | [docs/03-core-userland.md](docs/03-core-userland.md) | Shell, coreutils, filesystems, compression, crypto, networking |
| **04 — Desktop & GUI** | [docs/04-desktop.md](docs/04-desktop.md) | Wayland, compositors, themes, desktop apps, media |
| **05 — GUI Enhancement & Ricing** | [docs/05-gui-enhancement-ricing.md](docs/05-gui-enhancement-ricing.md) | Desktop customization, configs, theming, dotfiles |
| **06 — Rust Desktop Stack** | [docs/06-rust-desktop.md](docs/06-rust-desktop.md) | Smithay, COSMIC, niri, Rust CLI tools |
| **07 — Medical & Health** | [docs/07-medical.md](docs/07-medical.md) | EHR systems, medical imaging, field medicine, devices, telemedicine, veterinary |
| **08 — Water & Sanitation** | [docs/08-water-sanitation.md](docs/08-water-sanitation.md) | Water quality, purification, hydroponics, waste management |
| **09 — Survival & Agriculture** | [docs/09-survival.md](docs/09-survival.md) | Farming, food, hunting, defense, weather, welding, radio |
| **10 — Energy & Power** | [docs/10-energy.md](docs/10-energy.md) | Solar, batteries, energy monitoring |
| **11 — Communications** | [docs/11-communications.md](docs/11-communications.md) | Radio, mesh networking, encryption, VPN |
| **12 — Security & Governance** | [docs/12-security-governance.md](docs/12-security-governance.md) | Network defense, encryption, identity, voting, coordination |
| **13 — OSINT & Intelligence** | [docs/13-osint.md](docs/13-osint.md) | World Monitor, OSINT frameworks, threat intel, SIGINT |
| **14 — Manufacturing** | [docs/14-manufacturing.md](docs/14-manufacturing.md) | CNC, PCB design, motor control, FPGA, 3D scanning |
| **15 — 3D Printing** | [docs/15-3d-printing.md](docs/15-3d-printing.md) | Firmware, slicers, Voron ecosystem, CAD |
| **16 — Silicon & Hardware Fabrication** | [docs/16-silicon-fabrication.md](docs/16-silicon-fabrication.md) | EDA tools, PDKs, RISC-V cores, SoC frameworks |
| **17 — Offline Knowledge** | [docs/17-knowledge.md](docs/17-knowledge.md) | Wikipedia, docs, ebooks, translation, OCR |
| **18 — AI & Machine Learning** | [docs/18-ai-ml.md](docs/18-ai-ml.md) | Frameworks, models, vision, speech, translation |
| **19 — Simulation** | [docs/19-simulation.md](docs/19-simulation.md) | FEA, CFD, physics, chemistry, nuclear, optics |
| **20 — Morale & Entertainment** | [docs/20-morale.md](docs/20-morale.md) | Games, music, art, emulators |

## Naming Collisions

Some forks were renamed due to GitHub name conflicts:

| Fork Name | Upstream | What It Is |
|-----------|----------|-----------|
| `core` | home-assistant/core | Home automation |
| `core-1` | grblHAL/core | CNC firmware |
| `core-2` | LibreOffice/core | Office suite |
| `book` | Smithay/book | Wayland & Smithay guide |
| `book-1` | rust-lang/book | The Rust Programming Language |
| `portable` | libressl/portable | LibreSSL |
| `docs` | ZeroGDesign/docs | Zero-G printer docs |
| `Rust-1` | TheAlgorithms/Rust | Algorithms in Rust |
| `Go-1` | TheAlgorithms/Go | Algorithms in Go |
| `raspberrypi-linux` | raspberrypi/linux | RPi kernel fork |
| `Arduino-1` | esp8266/Arduino | ESP8266 Arduino core |
| `firmware-1` | raspberrypi/firmware | Pi boot firmware |
| `rust-raspberrypi-OS-tutorials-1` | rust-embedded/rust-raspberrypi-OS-tutorials | Bare-metal Rust OS tutorials |
| `linux` | torvalds/linux | Mainline kernel |
| `postgres-1` | postgres/postgres | PostgreSQL database |
| `sqlite-1` | sqlite/sqlite | SQLite database engine |
| `yt-dlp-1` | yt-dlp/yt-dlp | Video downloader |
| `nix-1` | NixOS/nix | Nix package manager |
| `nixpkgs-1` | NixOS/nixpkgs | Nix package collection |
| `tools-1` | golang/tools | Go dev tools (gopls, etc.) |
| `server` | MariaDB/server | MariaDB database |
| `mongo` | mongodb/mongo | MongoDB database |
| `fiddle` | electron/fiddle | Electron playground |
| `Paddle` | PaddlePaddle/Paddle | PaddlePaddle ML framework |

## Non-GitHub Mirrors

These critical projects live on GitLab/Savannah/Codeberg. They have been `git clone --mirror`'d and pushed to private GitHub repos with MIRROR.md update instructions in each:

| Project | Upstream Source | GitHub Mirror | What It Is |
|---------|----------------|---------------|------------|
| **Wayland** | gitlab.freedesktop.org/wayland/wayland | `crussella0129/wayland` | Display protocol |
| **Mesa** | gitlab.freedesktop.org/mesa/mesa | `crussella0129/mesa` | GPU drivers (OpenGL/Vulkan) |
| **Cairo** | gitlab.freedesktop.org/cairo/cairo | `crussella0129/cairo` | 2D graphics library |
| **D-Bus** | gitlab.freedesktop.org/dbus/dbus | `crussella0129/dbus` | IPC message bus |
| **libinput** | gitlab.freedesktop.org/libinput/libinput | `crussella0129/libinput` | Input device handling |
| **foot** | codeberg.org/dnkl/foot | `crussella0129/foot` | Wayland terminal |
| **Bash** | git.savannah.gnu.org/git/bash.git | `crussella0129/bash` | Shell |
| **GNU Binutils** | sourceware.org/git/binutils-gdb.git | `crussella0129/binutils-gdb` | Assembler + linker + GDB |
| **hostapd/wpa_supplicant** | w1.fi/cgit/hostap | `crussella0129/hostap` | WiFi AP daemon and WPA client |

Each mirror repo contains a `MIRROR.md` with step-by-step instructions for updating from upstream. Update periodically while internet access is available.

**Also now on GitHub via forks** (previously listed as non-GitHub only):
- **GRUB** → forked as `grub2` from `rhboot/grub2` (Red Hat's maintained fork)
- **GNU Make** → forked as `make` from `mirror/make` (Savannah mirror)
- **GNU Coreutils** → forked as `coreutils` from `uutils/coreutils` (Rust cross-platform rewrite; also `git clone --mirror` the GNU C original from Savannah as backup)
- **ncurses** → forked as `ncurses` from `mirror/ncurses` (Savannah mirror on GitHub)
- **readline** → forked as `readline` from `gnu-mirror-unofficial/readline` (frozen ~2022 but complete)
- **Texinfo** → forked as `texinfo` from `autotools-mirror/texinfo` (actively mirrored)
- **gettext** → forked as `gettext` from `autotools-mirror/gettext` (actively mirrored)
- **GNU core tools** → forked from `gnu-mirror-unofficial`: `gawk`, `sed`, `grep`, `tar`, `gzip`, `diffutils`, `findutils`, `patch`, `groff`, `nano`, `wget`, `screen`, `parted`, `cpio`

## Archive Statistics

| Metric | Value |
|--------|-------|
| **Total repos** | 1000+ |
| **GitHub-reported size** | ~379 GB |
| **Estimated mirror size** | ~400–500 GB |
| **All forks private** | Yes |

The GitHub-reported size reflects compressed git objects on GitHub's servers. Actual `git clone --mirror` disk usage will be somewhat larger due to pack overhead, refs, and filesystem block alignment. Budget **~500 GB** for a complete local mirror with comfortable margin.

### Largest repos

| Repo | Size | What |
|------|------|------|
| `firmware-1` (RPi firmware) | ~52 GB | Pre-compiled Pi kernel + GPU firmware (all versions) |
| `rpi-firmware` (RPi firmware minimal) | ~48 GB | Lighter Pi boot files |
| `nerd-fonts` | ~26 GB | 10,000+ patched font variants |
| `organicmaps` | ~8 GB | Offline maps (OpenStreetMap) |
| `docs-content` (Arduino docs) | ~8 GB | Full Arduino documentation |
| `noto-cjk` | ~7 GB | CJK fonts |
| `gecko-dev` (Firefox) | ~5 GB | Firefox browser engine |
| `linux` (kernel) | ~5 GB | Mainline Linux kernel |
| `core-2` (LibreOffice) | ~5 GB | Office suite |
| `QGIS` | ~4 GB | Geographic information system |

### Storage planning

| Storage Target | Recommended Size |
|---------------|-----------------|
| Full mirror (all forks) | 500 GB |
| + ZIM files (Wikipedia, SO, Gutenberg) | +210 GB |
| + AI models (GGUF for llama.cpp) | +50–200 GB |
| + Video archive (yt-dlp) | varies |
| **Total recommended** | **1–2 TB** |

A single 2 TB NVMe or external SSD comfortably holds the entire archive plus offline knowledge and AI models.

---

*Last updated: 2026-02-24*
*Total repos: 1000+*
