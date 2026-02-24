# 03 — Core Userland

Shell, utilities, filesystems, compression, networking — the layer between kernel and desktop.

## Shells

### fish-shell → `fish-shell/fish-shell`
User-friendly shell with autosuggestions, syntax highlighting, and sane defaults.
- **Build**: `cmake -B build && cmake --build build && cmake --install build`
- **Usage**: `fish` — start typing; suggestions appear automatically
- **Docs**: https://fishshell.com/docs/current/

### Nushell → `nushell/nushell`
Structured data shell written in Rust. Pipes produce tables, not text.
- **Build**: `cargo build --release`
- **Usage**: `nu` — try `ls | where size > 1mb | sort-by modified`
- **Docs**: https://www.nushell.sh/book/

### BusyBox → `mirror/busybox`
See [01-system-foundation.md](01-system-foundation.md#busybox--mirrorbusybox) — provides sh and 600+ utilities in 1MB.

**Note**: Bash has been mirrored from GNU Savannah — see `crussella0129/bash` in the Non-GitHub Mirrors table in README.md.

## Core Utilities

### uutils coreutils → `uutils/coreutils`
Cross-platform Rust rewrite of GNU coreutils — `ls`, `cp`, `mv`, `rm`, `cat`, `chmod`, `chown`, `mkdir`, `sort`, `wc`, and 100+ more. Drop-in replacement for GNU coreutils.
- **Build**: `cargo build --release` or `make install PREFIX=/usr/local`
- **Usage**: Drop-in replacement — same command names and flags as GNU coreutils
- **Docs**: https://uutils.github.io/
- **Why this over GNU?**: GNU coreutils live on Savannah (not GitHub). This Rust rewrite is actively maintained (22k+ stars), cross-compiles easily, and produces static binaries. Fork the Rust version; `git clone --mirror` the GNU version from Savannah as a backup.

### GNU Text Processing Tools

These foundational tools are required by build scripts, package managers, and system administration throughout the archive.

### GNU awk → `gnu-mirror-unofficial/gawk`
Pattern scanning and text processing language. Used in countless build scripts and system admin tasks.
- **Build**: `./bootstrap && ./configure && make -j$(nproc) && make install`
- **Docs**: https://www.gnu.org/software/gawk/manual/

### GNU sed → `gnu-mirror-unofficial/sed`
Stream editor. Used in every `./configure` script and build system.
- **Build**: `./bootstrap && ./configure && make && make install`
- **Docs**: https://www.gnu.org/software/sed/manual/

### GNU grep → `gnu-mirror-unofficial/grep`
Pattern matching tool. Fundamental for searching code and logs.
- **Build**: `./bootstrap && ./configure && make && make install`
- **Docs**: https://www.gnu.org/software/grep/manual/

### GNU tar → `gnu-mirror-unofficial/tar`
Archive tool. The standard format for distributing source code (`.tar.gz`, `.tar.xz`).
- **Build**: `./bootstrap && ./configure && make && make install`
- **Docs**: https://www.gnu.org/software/tar/manual/

### GNU gzip → `gnu-mirror-unofficial/gzip`
Compression for `.gz` files. Standard compression for source tarballs.
- **Build**: `./bootstrap && ./configure && make && make install`

### GNU diffutils → `gnu-mirror-unofficial/diffutils`
`diff`, `cmp`, `diff3`, `sdiff`. Required for patch workflows and maintaining source forks.
- **Build**: `./bootstrap && ./configure && make && make install`

### GNU findutils → `gnu-mirror-unofficial/findutils`
`find`, `xargs`, `locate`. Essential for file discovery in build systems and automation.
- **Build**: `./bootstrap && ./configure && make && make install`

### GNU patch → `gnu-mirror-unofficial/patch`
Applies diffs to source code. Critical for maintaining and updating forked code.
- **Build**: `./bootstrap && ./configure && make && make install`

### readline → `gnu-mirror-unofficial/readline`
Line editing library with history. Required by bash, Python REPL, GDB, and dozens of interactive programs.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Docs**: https://tiswww.cwru.edu/php/chet/readline/readline.html
- **Note**: Previously listed as Savannah-only. This is a GitHub mirror (frozen ~2022 but complete and buildable).

### GNU nano → `gnu-mirror-unofficial/nano`
Simple terminal text editor. Essential when no GUI is available.
- **Build**: `./configure && make && make install`
- **Docs**: https://www.nano-editor.org/docs.php

### GNU wget → `gnu-mirror-unofficial/wget`
HTTP/FTP download tool. Many scripts and Makefiles assume `wget` is available.
- **Build**: `./configure --with-ssl=openssl && make && make install`
- **Docs**: https://www.gnu.org/software/wget/manual/

### GNU Screen → `gnu-mirror-unofficial/screen`
Terminal multiplexer. Persistent sessions over SSH, essential for headless server management.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: https://www.gnu.org/software/screen/manual/

### GNU parted → `gnu-mirror-unofficial/parted`
Disk partitioning tool supporting GPT (required for UEFI boot) and MBR.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `parted /dev/sda mklabel gpt` / `parted /dev/sda mkpart primary ext4 1MiB 100%`
- **Docs**: https://www.gnu.org/software/parted/manual/

### GNU cpio → `gnu-mirror-unofficial/cpio`
Archive format used by Linux initramfs/initrd. Required for kernel boot image creation.
- **Build**: `./configure && make && make install`

### GNU groff → `gnu-mirror-unofficial/groff`
GNU troff text formatting system. Formats man pages — without groff, `man` commands produce nothing.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Docs**: https://www.gnu.org/software/groff/manual/

## Terminal Multiplexers

### tmux → `tmux/tmux`
Terminal multiplexer — split panes, persistent sessions.
- **Build**: `sh autogen.sh && ./configure && make && make install`
- **Usage**: `tmux` → `Ctrl-b c` (new window), `Ctrl-b %` (split), `Ctrl-b d` (detach)
- **Docs**: `man tmux` or https://github.com/tmux/tmux/wiki

### tmux Plugin Manager → `tmux-plugins/tpm`
Plugin manager for tmux. Installs and manages tmux plugins from a config file.
- **Install**: `git clone tpm ~/.tmux/plugins/tpm`
- **Usage**: Add plugins to `~/.tmux.conf` → press `prefix + I` to install
- **Docs**: https://github.com/tmux-plugins/tpm

### Zellij → `zellij-org/zellij`
Modern terminal multiplexer in Rust with discoverable keybindings.
- **Build**: `cargo build --release`
- **Usage**: `zellij` — press `Ctrl-p` for pane mode, `Ctrl-t` for tab mode
- **Docs**: https://zellij.dev/documentation/

## Filesystem & Disk Tools

### util-linux → `util-linux/util-linux`
Essential Linux utilities: `mount`, `fdisk`, `lsblk`, `blkid`, `dmesg`, `kill`, `more`, `su`, `login`, etc.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: Manpages for each tool

### dosfstools → `dosfstools/dosfstools`
Create and check FAT filesystems (needed for EFI boot partitions).
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Usage**: `mkfs.fat -F 32 /dev/sdX1`

### OpenZFS → `openzfs/zfs`
The canonical ZFS implementation for Linux and FreeBSD. Checksumming, snapshots, RAID-Z, send/receive, compression, deduplication.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: https://openzfs.github.io/openzfs-docs/
- **Note**: FreeBSD 14+ integrates OpenZFS natively. Linux uses it as a kernel module.

### zfdash → `ad4mts/zfdash`
ZFS management GUI and web UI for pool, dataset, and snapshot management on Linux, macOS, and FreeBSD.

### e2fsprogs → `tytso/e2fsprogs`
Create, check, and repair ext2/ext3/ext4 filesystems. ext4 is the default Linux filesystem.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `mkfs.ext4 /dev/sdX1` / `fsck.ext4 /dev/sdX1` / `tune2fs -l /dev/sdX1`
- **Docs**: `man mkfs.ext4`, `man fsck.ext4`
- **Note**: Without `mkfs.ext4`, you cannot create the most common Linux partition type.

### cryptsetup → `mbroz/cryptsetup`
Disk encryption using LUKS (Linux Unified Key Setup). Full-disk encryption for data protection.
- **Build**: `./autogen.sh && ./configure && make -j$(nproc) && make install`
- **Usage**: `cryptsetup luksFormat /dev/sdX2` → `cryptsetup open /dev/sdX2 crypt` → `mkfs.ext4 /dev/mapper/crypt`
- **Docs**: https://gitlab.com/cryptsetup/cryptsetup/-/wikis/home

## Version Control

### Git → `git/git`
The distributed version control system this entire archive depends on. Every fork, every clone, every mirror operation uses Git.
- **Build**: `make prefix=/usr/local -j$(nproc) all && make prefix=/usr/local install`
- **Usage**: `git clone`, `git commit`, `git push`, `git log`
- **Docs**: https://git-scm.com/doc
- **Note**: You need Git to use this archive. Make sure it's one of the first things built.

## Compression

### zstd → `facebook/zstd`
Fast compression algorithm (used by kernel, btrfs, systemd).
- **Build**: `make && make install`
- **Usage**: `zstd file.tar` / `zstd -d file.tar.zst`
- **Docs**: https://facebook.github.io/zstd/

### xz → `tukaani-project/xz`
High-ratio compression (`.xz`, `.lzma`). Used for kernel images, tarballs.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Usage**: `xz file` / `xz -d file.xz`

### zlib → `madler/zlib`
See [01-system-foundation.md](01-system-foundation.md) — the compression library everything uses.

### MozJPEG → `mozilla/mozjpeg`
Improved JPEG encoder with 2-6% better compression than libjpeg-turbo. Drop-in replacement.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `cjpeg -quality 80 input.ppm > output.jpg`
- **Docs**: https://github.com/mozilla/mozjpeg/blob/master/README.md
- **Use case**: Compress images more efficiently when storage is scarce

### Brotli → `google/brotli`
General-purpose lossless compression, ~20% better than gzip.

### Guetzli → `google/guetzli`
Perceptual JPEG encoder producing 20-30% smaller files.

### libwebp → `webmproject/libwebp`
WebP image codec — 25-35% smaller than JPEG/PNG.

## Security Tools

### Privilege Escalation

### doas → `slicer69/doas`
OpenBSD's secure sudo replacement. Minimal attack surface, dramatically simpler than sudo, fewer CVEs historically.
- **Config**: `/usr/local/etc/doas.conf` — e.g. `permit persist :wheel`
- **Works on**: FreeBSD, Linux, NetBSD, illumos

### Compiler Hardening
### Sanitizers → `google/sanitizers`
AddressSanitizer, ThreadSanitizer, MemorySanitizer — integrated into GCC/Clang.

### Honggfuzz → `google/honggfuzz`
Security-oriented fuzzer with hardware-based code coverage feedback.

### Vulnerability Scanning
### OSV Scanner → `google/osv-scanner`
Vulnerability scanner for dependencies against the OSV database.

### Hipcheck → `mitre/hipcheck`
Supply chain risk assessment for git repositories. Rust binary.

### hoppr-cop → `lmco/hoppr-cop`
SBOM vulnerability scanner. Scans CycloneDX SBOMs with local cache.

### Sandboxing
### gVisor → `google/gvisor`
Application kernel that sandboxes containers by intercepting syscalls.

### Secrets Management
### OpenBao → `openbao/openbao`
Secrets management, PKI, encryption-as-a-service. MPL-2.0 fork of Vault.

### CFSSL → `cloudflare/cfssl`
PKI/TLS toolkit: certificate authority, signing, bundling, OCSP.

### CIRCL → `cloudflare/circl`
Post-quantum cryptography library (Kyber, Dilithium, elliptic curves).

### EJSON → `Shopify/ejson`
Encrypted JSON secrets management using NaCl asymmetric encryption.

## MITRE ATT&CK Ecosystem

### Threat Intelligence Data
### ATT&CK Knowledge Base → `mitre/cti`
Complete MITRE ATT&CK in STIX 2.0 format. Machine-readable threat intelligence.

### ATT&CK STIX Data → `mitre-attack/attack-stix-data`
ATT&CK in STIX 2.1 format including ICS domain.

### D3FEND Ontology → `d3fend/d3fend-ontology`
Defensive counterpart to ATT&CK — maps defensive techniques to offensive techniques.

### ATLAS → `mitre/advmlthreatmatrix`
Adversarial Threat Landscape for AI Systems. Attacks against ML/AI.

### Engage → `mitre/engage`
Defensive deception framework — denial, deception, adversary engagement.

### Visualization & Tools
### ATT&CK Navigator → `mitre-attack/attack-navigator`
Interactive web app for ATT&CK matrix visualization. Runs offline.

### ATT&CK Website → `mitre-attack/attack-website`
Full ATT&CK website as static HTML. Build once, serve offline forever.

### mitreattack-python → `mitre-attack/mitreattack-python`
Python library for programmatic ATT&CK data interaction.

### Detection & Analytics
### Cyber Analytics Repository → `mitre-attack/car`
Detection analytics mapped to ATT&CK techniques.

### BZAR → `mitre-attack/bzar`
Zeek scripts for detecting ATT&CK techniques on the network.

### ATT&CK Arsenal → `mitre-attack/attack-arsenal`
Adversary emulation plans (APT3, APT29, FIN6, etc.).

### Adversary Emulation
### Caldera → `mitre/caldera`
Automated adversary emulation platform for testing defenses.

## Malware Analysis & Forensics

### Reverse Engineering
### Ghidra → `NationalSecurityAgency/ghidra`
NSA software reverse engineering framework — disassembler, decompiler. Apache-2.0.

### Ghidra Data → `NationalSecurityAgency/ghidra-data`
Processor manuals, type libraries, function ID databases for Ghidra.

### pydecipher → `mitre/pydecipher`
Reverse engineering frozen/obfuscated Python (PyInstaller, cx_Freeze, py2exe).

### File Scanning
### LaikaBOSS → `lmco/laikaboss`
Multi-engine file analysis framework — YARA, ClamAV, metadata. Apache-2.0.

### MultiScanner → `mitre/multiscanner`
Modular file scanning/analysis framework.

### MOTIF → `boozallen/MOTIF`
3,095 disarmed malware samples from 454 families with ground-truth labels.

### Network Forensics
### ChopShop → `MITRECND/chopshop`
Protocol analysis and decoder framework for network forensics.

### Pen Testing
### DART → `lmco/dart`
Documentation & Reporting Tool — built for isolated/offline networks. Apache-2.0.

### ParseLab → `lmco/parselab`
Protocol parser generator and fuzzer.

### SalSA → `deptofdefense/SalSA`
Static analysis results processor.

### ML Security
### Menelaus → `mitre/menelaus`
ML drift detection — monitors model degradation over time.

## Compliance & Hardening

### SAF CLI → `mitre/saf`
Security Automation Framework. Converts between XCCDF, InSpec, STIG formats.

### Heimdall2 → `mitre/heimdall2`
Self-hosted security scan results viewer and compliance dashboard.

### InSpec Tools → `mitre/inspec_tools`
Security baseline conversion utilities (XCCDF to InSpec profiles).

### Vulcan → `mitre/vulcan`
STIG development tool for creating custom security baselines.

### SIMP → `NationalSecurityAgency/SIMP`
NSA system hardening stack — Puppet modules for STIG/CIS compliance.

### FreeBSD Hardening → `wravoc/harden-freebsd`
Comprehensive FreeBSD hardening script. sysctl tuning, kernel security options, service hardening with logging and backups. Updated for FreeBSD 14.0.

### Server Init Harden → `pratiktri/server_init_harden`
POSIX shell server hardening for both Linux and FreeBSD. SSH hardening, pf/iptables configuration, fail2ban-style protection.

### Rocinante → `BastilleBSD/rocinante`
Lightweight configuration management from the BastilleBSD team. Reproducible system configurations without Ansible.

## Air-Gap Infrastructure

### Zarf → `zarf-dev/zarf`
Air-gap native Kubernetes package manager. Deploys with zero internet. Apache-2.0.

### Pepr → `defenseunicorns/pepr`
Type-safe Kubernetes admission controller for policy enforcement.

### UDS Core → `defenseunicorns/uds-core`
Secure runtime platform — Istio, Keycloak, Prometheus bundled for air-gap. AGPL-3.0.

### Lula → `defenseunicorns/lula`
Compliance-as-code using OSCAL/NIST frameworks.

### go-oscal → `defenseunicorns/go-oscal`
Go library for OSCAL security compliance data types.

### Iceberg → `deptofdefense/iceberg`
Secure file server with client certificate auth. Go binary.

### Safelock → `deptofdefense/safelock`
File locking library for distributed services.

### Emissary → `NationalSecurityAgency/emissary`
P2P distributed data triage and processing framework.

## Build Acceleration

### sccache → `mozilla/sccache`
Distributed compiler cache supporting C/C++, Rust, and CUDA. Like ccache but better.
- **Build**: `cargo build --release`
- **Usage**: `export RUSTC_WRAPPER=sccache` or `CC="sccache gcc"` — caches compilation results
- **Docs**: https://github.com/mozilla/sccache/blob/main/README.md
- **Use case**: When compiling the archive from source, sccache avoids redundant recompilation across projects

## Networking

### OpenSSH → `openssh/openssh-portable`
Secure remote access. THE way to manage machines remotely.
- **Build**: `autoreconf && ./configure && make && make install`
- **Usage**: `ssh user@host` / `scp file user@host:path` / `ssh-keygen -t ed25519`
- **Docs**: https://www.openssh.com/manual.html

### NetworkManager → `NetworkManager/NetworkManager`
Network configuration daemon (WiFi, Ethernet, VPN, etc.).
- **Build**: `meson setup build && ninja -C build`
- **Usage**: `nmcli device wifi connect "SSID" password "pass"` / `nmtui` (TUI)
- **Docs**: https://networkmanager.dev/docs/

### Bluetooth (BlueZ) → `bluez/bluez`
Linux Bluetooth protocol stack.
- **Build**: `./configure && make && make install`
- **Usage**: `bluetoothctl` → `scan on` → `pair XX:XX:XX:XX` → `connect XX:XX:XX:XX`

### iproute2 → `iproute2/iproute2`
The `ip` command — the modern way to configure network interfaces, routes, tunnels, and bridges on Linux.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `ip addr show` / `ip link set eth0 up` / `ip route add default via 192.168.1.1`
- **Docs**: `man ip`
- **Note**: Replaces `ifconfig`, `route`, `arp`, `netstat` from net-tools. Essential for any Linux networking.

### dnsmasq → `imp/dnsmasq`
Lightweight DNS forwarder, DHCP server, and TFTP server in one binary.
- **Build**: `make && make install`
- **Usage**: Configure `/etc/dnsmasq.conf` → `dnsmasq`
- **Docs**: https://thekelleys.org.uk/dnsmasq/doc.html
- **Use case**: Simple DNS + DHCP for small networks. Simpler than Unbound for providing both services. Used by OpenWrt and libvirt internally.

### Chrony → `mlichvar/chrony`
NTP time synchronization daemon. Keeps system clocks accurate.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `chronyd` (daemon) / `chronyc sources` (check sync status)
- **Docs**: https://chrony-project.org/documentation.html
- **Why it matters**: Without accurate time, TLS certificates fail validation, log timestamps are wrong, cron jobs drift, and distributed systems break. Can sync from GPS, local NTP server, or manual reference.

### Tailscale → `tailscale/tailscale`
Mesh VPN built on WireGuard. Connect sites into a secure network.
- **Build**: `go build ./cmd/tailscale ./cmd/tailscaled`
- **Usage**: `tailscaled & tailscale up`
- **Docs**: https://tailscale.com/kb/

### Pi-hole → `pi-hole/pi-hole`
Network-wide DNS sinkhole / local DNS server.
- **Install**: `curl -sSL https://install.pi-hole.net | bash` (or build from source)
- **Usage**: Point your network DNS to the Pi-hole machine
- **Docs**: https://docs.pi-hole.net/

### Caddy → `caddyserver/caddy`
Single-binary HTTPS web server with automatic TLS.
- **Build**: `go build ./cmd/caddy`
- **Usage**: `caddy file-server --browse --listen :8080`
- **Docs**: https://caddyserver.com/docs/

### nginx → `nginx/nginx`
High-performance HTTP server, reverse proxy, and load balancer. The most deployed web server worldwide.
- **Build**: `./auto/configure --prefix=/usr/local/nginx && make -j$(nproc) && make install`
- **Usage**: `nginx` (start) / `nginx -s reload` (reload config) / `nginx -s stop` (stop)
- **Docs**: https://nginx.org/en/docs/
- **Use case**: Serve static files, reverse proxy to application servers, load balance across nodes

### Unbound → `NLnetLabs/unbound`
Validating, recursive, caching DNS resolver. Essential for LAN name resolution without external DNS.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `unbound -d` (foreground) or `unbound` (daemon). Configure in `/usr/local/etc/unbound/unbound.conf`
- **Docs**: https://nlnetlabs.nl/documentation/unbound/
- **Use case**: Local DNS server for your network. Resolves names when there is no upstream DNS available. Pair with Pi-hole for filtering.

## Privilege Escalation

### sudo → `sudo-project/sudo`
Execute commands as another user (typically root). The standard privilege escalation tool on Linux.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `sudo <command>` / `visudo` (edit sudoers file safely)
- **Docs**: https://www.sudo.ws/docs/man/sudo.man/
- **Note**: Complements doas (see Security Tools section). Many scripts and tools assume sudo is available.

## Databases

### PostgreSQL → `postgres/postgres`
The world's most advanced open-source relational database. ACID-compliant, extensible, SQL-standard.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `initdb -D /var/lib/pgsql/data && pg_ctl -D /var/lib/pgsql/data start && psql`
- **Docs**: https://www.postgresql.org/docs/
- **Use case**: Stores structured data for farmOS, medical records, inventory, sensor logs — any application needing a real database

### SQLite → `sqlite/sqlite`
Self-contained, serverless, zero-configuration SQL database engine. The most deployed database in the world.
- **Build**: `./configure && make && make install`
- **Usage**: `sqlite3 mydb.db` → SQL commands directly. Or use as a library from C/Python/etc.
- **Docs**: https://www.sqlite.org/docs.html
- **Use case**: Embedded database for applications. No server process needed — just a single file. Used by Python, Firefox, Android, and thousands of other projects.

### MariaDB → `MariaDB/server`
MySQL-compatible relational database. Drop-in replacement for MySQL used by farmOS, OpenMRS, emoncms, and many web applications.
- **Build**: `cmake -B build && cmake --build build && cmake --install build`
- **Usage**: `mariadbd-safe &` → `mariadb -u root` → SQL commands
- **Docs**: https://mariadb.com/kb/en/documentation/
- **Use case**: Many applications in this archive (farmOS, OpenMRS, emoncms, Mailu) explicitly require MySQL/MariaDB. PostgreSQL is not a drop-in replacement.

### MongoDB → `mongodb/mongo`
Document-oriented NoSQL database. Stores data as flexible JSON-like documents.
- **Build**: `python3 buildscripts/scons.py install-mongod` (complex build, requires Python, SCons)
- **Usage**: `mongod --dbpath /data/db` (start) / `mongosh` (connect)
- **Docs**: https://www.mongodb.com/docs/manual/
- **Use case**: Required by Lichess and many web applications that use document storage. Good for unstructured data, sensor logs, and application data that doesn't fit neatly into tables.

### Redis → `redis/redis`
In-memory data store used as database, cache, message broker, and queue.
- **Build**: `make -j$(nproc) && make install`
- **Usage**: `redis-server` (start) / `redis-cli` (connect) → `SET key value` / `GET key`
- **Docs**: https://redis.io/docs/
- **Use case**: Fast caching layer, session storage, pub/sub messaging, rate limiting. Pairs with PostgreSQL as a cache layer, or standalone for real-time data like sensor readings.

## Package Management

### Nix → `NixOS/nix`
Purely functional package manager with reproducible builds. Every build is hermetic and deterministic.
- **Build**: `./bootstrap.sh && ./configure && make -j$(nproc) && make install`
- **Usage**: `nix-env -i <package>` / `nix-shell -p <package>` (temporary env) / `nix build`
- **Docs**: https://nixos.org/manual/nix/
- **Why it matters**: Reproducible builds mean you can rebuild the exact same binary from source, every time. Critical for a survival archive where you need to trust your software supply chain. Also supports rollbacks — if an upgrade breaks something, instantly revert.

### Nixpkgs → `NixOS/nixpkgs`
The Nix package collection — 100,000+ packages with reproducible build recipes. The largest package repository of any Linux distribution.
- **Usage**: `nix-env -iA nixpkgs.<package>` or reference in flake/shell expressions
- **Docs**: https://nixos.org/manual/nixpkgs/
- **Size**: ~3GB repository (recipes only, not binaries)
- **Why it matters**: Contains build instructions for virtually every open-source project. Even without the Nix daemon, the build expressions serve as a massive reference for how to compile software and its dependencies.

## Containers

### Podman → `containers/podman`
Daemonless, rootless container engine. Drop-in replacement for Docker on the Linux side.
- **Build**: `make binaries && make install`
- **Deps**: Go, conmon, crun or runc, CNI plugins, slirp4netns
- **Usage**: `podman run -it alpine sh` / `podman build -t myimage .` / `podman pod create`
- **Docs**: https://docs.podman.io/
- **Note**: FreeBSD has native jails for containers. Podman fills that gap on the Linux side. Rootless mode means no daemon and no root required.

### Buildah → `containers/buildah`
Build OCI/Docker container images without a daemon. Scriptable, rootless, no Dockerfile required.
- **Build**: `make buildah && make install`
- **Usage**: `buildah from alpine && buildah run <container> apk add nginx && buildah commit <container> myimage`
- **Docs**: https://buildah.io/
- **Use case**: Build container images in CI/automation or from shell scripts. More flexible than `podman build` for complex image creation.

### Skopeo → `containers/skopeo`
Copy, inspect, and sign container images between registries without pulling them.
- **Build**: `make bin/skopeo && make install`
- **Usage**: `skopeo copy docker://alpine docker-archive:alpine.tar` / `skopeo inspect docker://nginx`
- **Docs**: https://github.com/containers/skopeo/blob/main/README.md
- **Use case**: Pre-download container images to local archives for offline use. Inspect image metadata without pulling. Transfer images between air-gapped networks.

### Container Runtime Dependencies

These libraries are **required** for Podman/Buildah/Skopeo to actually function.

### containers/image → `containers/image`
Go library for container image operations — pulling, pushing, copying, inspecting images across registries.

### containers/common → `containers/common`
Shared configuration and libraries for all container tools. Defines default registries, storage, and policy.

### containers/storage → `containers/storage`
Container storage backend. Manages image layers, overlay filesystems, and container state.

### conmon → `containers/conmon`
OCI container runtime monitor. Required for Podman to manage container lifecycle (logging, signal handling, exit status).
- **Build**: `make && make install`

### crun → `containers/crun`
Lightweight OCI container runtime in C. The actual executor that creates and runs containers.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Note**: Alternative to runc. Podman needs either crun or runc to run containers.

### Netavark → `containers/netavark`
Container networking stack in Rust. Handles bridge networks, port forwarding, DNS for Podman 4+.
- **Build**: `make`

### Aardvark-DNS → `containers/aardvark-dns`
DNS server for container name resolution. Companion to Netavark.
- **Build**: `make`

### fuse-overlayfs → `containers/fuse-overlayfs`
FUSE-based overlay filesystem. Required for rootless Podman (running containers without root).
- **Build**: `./autogen.sh && ./configure && make && make install`

### slirp4netns → `rootless-containers/slirp4netns`
User-mode networking for unprivileged network namespaces. Required for rootless container networking.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: https://github.com/rootless-containers/slirp4netns

### rootlesskit → `rootless-containers/rootlesskit`
Linux-native fake root for rootless containers. The foundation that Podman/Docker rootless mode depends on.
- **Build**: `make`
- **Docs**: https://github.com/rootless-containers/rootlesskit

## Crypto & Security

### OpenSSL / LibreSSL
See [01-system-foundation.md](01-system-foundation.md) — TLS/crypto libraries.

### GnuPG → `gpg/gnupg`
Encrypt files and sign communications.
- **Build**: `./configure && make && make install` (needs libgpg-error, libgcrypt, libassuan, libksba, npth, pinentry)
- **Usage**: `gpg --gen-key` / `gpg -e -r recipient file` / `gpg -d file.gpg`
- **Docs**: https://gnupg.org/documentation/

### GnuPG Build Dependencies

These libraries are **required** to build GnuPG from source. Without them, `./configure` will fail.

### libgpg-error → `gpg/libgpg-error`
Error code library — the foundation dependency for ALL GnuPG components. Every other gpg library depends on this.
- **Build**: `./configure && make && make install`
- **Note**: Build this FIRST before any other gpg library.

### libgcrypt → `gpg/libgcrypt`
Cryptographic primitives library (AES, RSA, SHA, ECC, etc.). The crypto backend for GnuPG.
- **Build**: `./configure && make && make install` (requires libgpg-error)

### libassuan → `gpg/libassuan`
IPC library for communication between GnuPG components (gpg ↔ gpg-agent ↔ pinentry).
- **Build**: `./configure && make && make install` (requires libgpg-error)

### libksba → `gpg/libksba`
X.509 certificate and CMS (S/MIME) parsing library. Required for certificate-based operations.
- **Build**: `./configure && make && make install` (requires libgpg-error)

### npth → `gpg/npth`
New Portable Threads library. Threading support for gpg-agent.
- **Build**: `./configure && make && make install`

### pinentry → `gpg/pinentry`
Passphrase entry dialogs for GnuPG. Without this, gpg-agent cannot prompt for passwords.
- **Build**: `./configure && make && make install`
- **Variants**: curses (terminal), GTK, Qt — at minimum build the curses version.

### GPGME → `gpg/gpgme`
GnuPG Made Easy — high-level API used by mail clients, package managers (pacman), and other tools.
- **Build**: `./configure && make && make install` (requires libgpg-error, libassuan)

### Signal Protocol → `signalapp/libsignal`
End-to-end encryption library used by Signal messenger.
- **Build**: `cargo build --release` (Rust)
- **Usage**: Library for building encrypted messaging into applications

### Alerting & Detection Strategy Framework → `palantir/alerting-detection-strategy-framework`
Structured methodology for developing incident detection and response strategies.
- **Contents**: Framework document (ADS-Framework.md) with worked examples
- **Use case**: Build systematic detection coverage — defines data sources, alert logic, triage procedures, and response playbooks for each threat
- **Note**: Pure documentation/methodology — no code, no dependencies

### log4j-sniffer → `palantir/log4j-sniffer`
Standalone scanner that finds vulnerable log4j versions in archives and directories.
- **Build**: `go build .`
- **Usage**: `log4j-sniffer crawl /path/to/check`
- **Use case**: Audit Java dependencies in your archive for CVE-2021-44228. No network required.

### SSL Configuration Generator → `mozilla/ssl-config-generator`
Generate secure, Mozilla-recommended TLS configurations for web servers.
- **Build**: `npm install && npm run build`
- **Supported**: Apache, Nginx, HAProxy, AWS ELB, Caddy, and more
- **Docs**: https://ssl-config.mozilla.org/
- **Use case**: Harden any web server with best-practice TLS settings. Works offline once built.

### CipherScan → `mozilla/cipherscan`
Audit SSL/TLS configurations by scanning which ciphersuites a server supports.
- **Usage**: `./cipherscan target:443`
- **Output**: Lists supported ciphers, protocols, key exchange, and certificate details
- **Use case**: Find weak crypto in your infrastructure. Pure read-only scanner.

### cargo-vet → `mozilla/cargo-vet`
Supply-chain security auditing for Rust crate dependencies.
- **Build**: `cargo install cargo-vet`
- **Usage**: `cargo vet` — checks all dependencies against audit records
- **Docs**: https://mozilla.github.io/cargo-vet/
- **Use case**: Verify that Rust dependencies in your archive are trustworthy and reviewed

### Bleach → `mozilla/bleach`
HTML sanitization library for Python. Prevents XSS by stripping dangerous markup.
- **Install**: `pip install bleach`
- **Usage**: `bleach.clean(user_html, tags=['p', 'b', 'i', 'a'], attributes={'a': ['href']})`
- **Use case**: Sanitize any HTML processed by your web tools. Allowlist-based — safe by default.

## Directory Services

### OpenLDAP → `openldap/openldap`
Open-source LDAP directory service. Centralized user management, authentication, and authorization across multiple machines.
- **Build**: `./configure && make depend && make && make install`
- **Usage**: `slapd` (daemon) / `ldapsearch`, `ldapadd`, `ldapmodify` (client tools)
- **Docs**: https://www.openldap.org/doc/admin26/
- **Use case**: Manage users, groups, and permissions across a network of machines. Single sign-on without cloud identity providers.

### FreeIPA → `freeipa/freeipa`
Integrated identity management: LDAP + Kerberos + DNS + NTP + certificate authority in one package.
- **Build**: Complex — `make rpms` or `make wheel`
- **Deps**: 389-ds-base (LDAP), MIT Kerberos, BIND DNS, Dogtag PKI
- **Docs**: https://www.freeipa.org/page/Documentation
- **Use case**: Full identity management for a network of Linux/FreeBSD machines. More batteries-included than raw OpenLDAP.

## Message Queuing

### RabbitMQ → `rabbitmq/rabbitmq-server`
Lightweight, reliable message broker supporting AMQP, MQTT, and STOMP protocols.
- **Build**: `make` (requires Erlang/OTP)
- **Usage**: `rabbitmq-server` (start) / `rabbitmqctl status` (check)
- **Docs**: https://www.rabbitmq.com/docs
- **Use case**: Reliable message passing between services. Lighter than Kafka for small-to-medium deployments. Supports MQTT for IoT sensor networks.

## Backup

### Borg → `borgbackup/borg`
Deduplicating backup with encryption and compression.
- **Build**: `pip install borgbackup` or `python setup.py install`
- **Usage**: `borg init --encryption=repokey /path/to/backup && borg create /path/to/backup::archive ~/important`
- **Docs**: https://borgbackup.readthedocs.io/

### Restic → `restic/restic`
Fast, encrypted backups written in Go.
- **Build**: `go build ./cmd/restic`
- **Usage**: `restic init --repo /backup && restic backup ~/important`
- **Docs**: https://restic.readthedocs.io/

## Printing

### CUPS → `OpenPrinting/cups`
The Common UNIX Printing System.
- **Build**: `./configure && make && make install`
- **Usage**: Web UI at `http://localhost:631`
- **Docs**: https://openprinting.github.io/cups/

## Virtualization

### QEMU → `qemu/qemu`
Full system emulation — run any OS on any architecture.
- **Build**: `./configure --target-list=x86_64-softmmu,aarch64-softmmu && make -j$(nproc)`
- **Usage**: `qemu-system-x86_64 -m 2G -cdrom install.iso -hda disk.qcow2`
- **Docs**: https://www.qemu.org/docs/master/

## System Monitoring

### Prometheus → `prometheus/prometheus`
Metrics collection and time-series database. Pull-based monitoring for infrastructure health.
- **Build**: `make build`
- **Usage**: `./prometheus --config.file=prometheus.yml` → scrapes targets → stores metrics → web UI at `:9090`
- **Docs**: https://prometheus.io/docs/
- **Use case**: Monitor CPU, memory, disk, network, solar production, battery state — anything that produces numbers over time. Pairs with Grafana for dashboards.

### Grafana → `grafana/grafana`
Visualization and dashboarding platform. Turn metrics into beautiful, actionable dashboards.
- **Build**: `make build-go && yarn install && yarn build`
- **Usage**: Web UI at `:3000`. Add Prometheus as data source → create dashboards
- **Docs**: https://grafana.com/docs/grafana/latest/
- **Use case**: Centralized dashboards for energy monitoring, system health, network status, sensor data. The standard visualization layer for Prometheus metrics.

### btop → `aristocratos/btop`
Beautiful resource monitor with mouse support and GPU monitoring.
- **Build**: `make && make install`
- **Usage**: `btop`

### htop → `htop-dev/htop`
Classic interactive process viewer.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Usage**: `htop`

### osquery → `osquery/osquery`
SQL-powered operating system instrumentation. Query processes, open ports, packages, users, file integrity, and more using standard SQL.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `osqueryi` (interactive shell) → `SELECT * FROM listening_ports;`
- **Docs**: https://osquery.readthedocs.io/
- **Key tables**: `processes`, `listening_ports`, `users`, `file`, `hash`, `interface_addresses`, `arp_cache`
- **Use case**: Endpoint visibility, intrusion detection, compliance auditing

### Grafana Loki → `grafana/loki`
Log aggregation system (like Prometheus, but for logs). Centralized logging for infrastructure.
- **Build**: `make build`
- **Docs**: https://grafana.com/docs/loki/latest/
- **Use case**: Centralized logging for infrastructure

### Prometheus Alertmanager → `prometheus/alertmanager`
Alert routing, deduplication, grouping for Prometheus.
- **Build**: `make build`
- **Docs**: https://prometheus.io/docs/alerting/latest/alertmanager/
- **Use case**: Route and manage alerts from Prometheus monitoring

### Prometheus Node Exporter → `prometheus/node_exporter`
Exports hardware/OS metrics (CPU, memory, disk, network). Deploy on every machine.
- **Build**: `make build`
- **Docs**: https://prometheus.io/docs/guides/node-exporter/
- **Use case**: Hardware and OS metrics collection for Prometheus monitoring

### osquery Detection Rules → `palantir/osquery-configuration`
Battle-tested threat detection query packs for osquery, organized by Endpoints and Servers.
- **Contents**: Pre-built query packs for detecting malware, persistence mechanisms, lateral movement, and anomalous behavior
- **Usage**: Deploy packs to osquery via `/etc/osquery/osquery.conf`
- **Note**: Pure configuration (SQL queries + JSON) — no executable code, no external dependencies
