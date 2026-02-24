# 01 — System Foundation

Everything needed to boot a machine from bare metal to a running system — Linux or FreeBSD.

## Boot Chain

### coreboot → `coreboot/coreboot`
Open-source firmware replacing proprietary BIOS/UEFI on x86 machines.
- **Build**: `make crossgcc-i386 CPUS=$(nproc) && make`
- **Usage**: Flash to motherboard SPI chip; replaces vendor BIOS entirely
- **Docs**: https://doc.coreboot.org/
- **Note**: Hardware-specific; check supported boards at https://coreboot.org/status/board-status.html

### GRUB2 → `rhboot/grub2`
The primary x86/x86_64 bootloader. Supports BIOS and UEFI, multiboot, LVM, RAID, encryption.
- **Build**: `./bootstrap && ./configure --with-platform=efi && make -j$(nproc) && make install`
- **Usage**: `grub-install /dev/sda && grub-mkconfig -o /boot/grub/grub.cfg`
- **Docs**: https://www.gnu.org/software/grub/manual/
- **Note**: Red Hat's maintained fork of GNU GRUB. Original lives on GNU Savannah.

### U-Boot → `u-boot/u-boot`
Universal bootloader for ARM/embedded (Raspberry Pi, SBCs, routers).
- **Build**: `make <board>_defconfig && make CROSS_COMPILE=aarch64-linux-gnu-`
- **Usage**: Flash to SD card/eMMC boot partition
- **Docs**: https://docs.u-boot.org/

### iPXE → `ipxe/ipxe`
Open-source network boot firmware. Boot machines over the network via HTTP, iSCSI, AoE, or FCoE.
- **Build**: `cd src && make`
- **Usage**: Flash to NIC ROM, USB, or chainload from GRUB/U-Boot. Boot diskless machines from a server.
- **Docs**: https://ipxe.org/docs
- **Use case**: Network boot and provisioning without USB drives. Supports scripting, HTTPS, and dynamic boot menus. More capable than legacy PXE.

### ONB Classic → `palantir/onb-classic`
All-in-one PXE network boot server combining ProxyDHCP, TFTP, and HTTP services.
- **Build**: `./gradlew build` (Java)
- **Usage**: Run on a server machine → other machines boot from the network without USB drives
- **Use case**: Bare-metal provisioning of multiple machines from a single boot server. Deploy OS images across a LAN without physical media.

### Linux Firmware → `wkennington/linux-firmware`
Binary firmware blobs for WiFi, GPU, Bluetooth, etc.
- **Install**: `cp -r lib/firmware/* /lib/firmware/`
- **Note**: Most WiFi cards won't work without these blobs

## Kernel

### Linux → `torvalds/linux`
The mainline Linux kernel for x86/ARM/RISC-V.
- **Build**:
  ```bash
  make defconfig        # or: make menuconfig (interactive)
  make -j$(nproc)
  make modules_install
  make install
  ```
- **Docs**: https://docs.kernel.org/
- **Key configs**: Enable drivers for your hardware, filesystem support, networking

### Raspberry Pi Linux → `raspberrypi/linux`
RPi-patched kernel with Pi-specific drivers and device trees.
- **Build**: Same as mainline but use `bcm2711_defconfig` for Pi 4
- **Docs**: https://www.raspberrypi.com/documentation/computers/linux_kernel.html

### Arch Linux Kernel → `archlinux/linux`
Arch-patched kernel sources with Arch-specific configuration and patches.
- **Build**: Same as mainline; uses Arch-specific defconfig
- **Docs**: https://wiki.archlinux.org/title/Kernel

## Init System

### mkosi → `systemd/mkosi`
Build bootable OS images from package managers (apt, dnf, pacman, zypper). Minimal, reproducible, immutable images.
- **Install**: `pip install mkosi`
- **Usage**: `mkosi` in a directory with `mkosi.conf` → produces bootable disk image
- **Docs**: https://github.com/systemd/mkosi/blob/main/docs/
- **Use case**: Create minimal, reproducible Linux images for deployment. Build custom appliance images (router, server, workstation) from a config file. Works with systemd-nspawn, QEMU, or bare metal.

### systemd → `systemd/systemd`
Init system, service manager, and much more (udev, journald, networkd, resolved, boot).
- **Build**: `meson setup build && ninja -C build && ninja -C build install`
- **Deps**: meson, glib, libcap, util-linux, and many more
- **Docs**: https://systemd.io/
- **Note**: Also provides `systemd-boot` (UEFI bootloader alternative to GRUB)

### eudev → `eudev-project/eudev`
Standalone udev fork for non-systemd systems (Gentoo, Alpine).
- **Build**: `autoreconf -ivf && ./configure && make && make install`
- **Docs**: Manpages included; compatible with udev rules

## Initramfs

### dracut-ng → `dracut-ng/dracut-ng`
Event-driven initramfs generator.
- **Build**: `./configure && make && make install`
- **Usage**: `dracut --force /boot/initramfs.img $(uname -r)`
- **Docs**: `man dracut`

### mkinitcpio → `archlinux/mkinitcpio`
Arch Linux initramfs generation (simpler, hook-based).
- **Usage**: `mkinitcpio -p linux`
- **Config**: `/etc/mkinitcpio.conf` — add hooks for encrypt, lvm2, etc.

## OS Installation

### archinstall → `archlinux/archinstall`
Guided Arch Linux installer with templates and profiles.
- **Usage**: `python -m archinstall` or `archinstall` from the Arch ISO
- **Features**: Guided install, profile templates, disk encryption, custom mirrors
- **Docs**: https://archinstall.readthedocs.io/

## Device Management

### polkit → `polkit-org/polkit`
Authorization framework for controlling system-wide privileges.
- **Build**: `meson setup build && ninja -C build`
- **Usage**: Allows unprivileged users to perform specific admin tasks (mount drives, reboot, etc.)

## Essential Libraries

### glibc → `bminor/glibc`
The GNU C Library — the foundation EVERY Linux program links against.
- **Build**: `mkdir build && cd build && ../configure --prefix=/usr && make -j$(nproc)`
- **Warning**: Replacing system glibc can brick your system; cross-compile or use chroot
- **Docs**: https://www.gnu.org/software/libc/manual/

### musl-cross-make → `richfelker/musl-cross-make`
Builds musl-libc + GCC cross-compiler toolchain. Lighter alternative to glibc.
- **Build**: `make -j$(nproc) TARGET=x86_64-linux-musl install`
- **Usage**: Produces static binaries that run anywhere
- **Docs**: https://musl.libc.org/

### zlib → `madler/zlib`
Compression library everything depends on.
- **Build**: `./configure && make && make install`
- **Use case**: Required by virtually every C project — PNG, HTTP, git, OpenSSL, and hundreds more depend on it.

### OpenSSL → `openssl/openssl`
TLS/SSL and cryptographic library.
- **Build**: `./Configure && make -j$(nproc) && make install`
- **Docs**: https://www.openssl.org/docs/
- **Use case**: TLS/HTTPS for secure communication. Required by curl, OpenSSH, Python, and nearly every networked application.

### LibreSSL → `libressl/portable`
OpenBSD's cleaner fork of OpenSSL.
- **Build**: `./autogen.sh && ./configure && make && make install`

### curl → `curl/curl`
Data transfer tool and library (HTTP, FTP, SCP, etc.).
- **Build**: `autoreconf -fi && ./configure --with-openssl && make && make install`
- **Docs**: https://curl.se/docs/
- **Use case**: HTTP client used by package managers, build scripts, and applications worldwide. Many scripts assume curl is available.

### freetype → `freetype/freetype`
Font rendering engine.
- **Build**: `meson setup build && ninja -C build`
- **Use case**: Font rendering — without freetype, no text appears on screen in any GUI application.
- **Docs**: https://freetype.org/documentation.html

### harfbuzz → `harfbuzz/harfbuzz`
Text shaping engine (complex script rendering).
- **Build**: `meson setup build && ninja -C build`
- **Use case**: Text shaping — converts Unicode text to positioned glyphs. Required by every GUI toolkit (GTK, Qt, browsers).
- **Docs**: https://harfbuzz.github.io/

### fontconfig → `behdad/fontconfig`
Font configuration and matching library.
- **Build**: `meson setup build && ninja -C build`
- **Use case**: Font discovery and matching. Applications use fontconfig to find installed fonts.
- **Docs**: https://www.freedesktop.org/wiki/Software/fontconfig/

### GLib → `GNOME/glib`
Foundation library (data structures, main loop, GObject, GIO).
- **Build**: `meson setup build && ninja -C build`
- **Docs**: https://docs.gtk.org/glib/

### Pango → `GNOME/pango`
Text layout and rendering (used by GTK).
- **Build**: `meson setup build && ninja -C build`
- **Deps**: harfbuzz, fontconfig, freetype, glib

### ncurses → `mirror/ncurses`
Terminal UI library. Required by bash, Python, vim, htop, and dozens of other interactive terminal programs.
- **Build**: `./configure --with-shared && make -j$(nproc) && make install`
- **Docs**: https://invisible-island.net/ncurses/ncurses.html
- **Note**: GitHub mirror of GNU Savannah original. Without ncurses, you have no interactive terminal programs.

### Device Tree Compiler → `dgibson/dtc`
Compiles device tree source files (`.dts`) to device tree blobs (`.dtb`). Required for ARM/embedded Linux boot.
- **Build**: `make && make install`
- **Usage**: `dtc -I dts -O dtb -o board.dtb board.dts`
- **Note**: All Raspberry Pi and ARM SBC boot requires device tree blobs compiled by `dtc`.

### IANA Timezone Database → `eggert/tz`
The authoritative timezone definitions used by glibc, musl, Python, Java, and every OS. Without correct timezone data, timestamps are wrong, TLS certificates fail, cron jobs drift, and scheduling breaks.
- **Build**: `make TOPDIR=/usr/local install`
- **Docs**: https://www.iana.org/time-zones

### Rufus → `pbatard/rufus`
USB bootable media creator for Windows. Create bootable Linux/FreeBSD install USB drives.
- **Build**: MSVC or MinGW — see repo README
- **Usage**: Select ISO → select USB drive → Flash
- **Docs**: https://rufus.ie/
- **Use case**: Critical for initial archive deployment. Create bootable install media from Windows before bootstrapping Linux/FreeBSD.

## Build Systems & Testing

### Bazel → `bazelbuild/bazel`
Fast, scalable, hermetic multi-language build system. Reproducible builds.
- **Build**: `./compile.sh`
- **Docs**: https://bazel.build/docs

### GoogleTest → `google/googletest`
C/C++ testing and mocking framework (GTest + GMock). The standard for C++ testing.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `#include <gtest/gtest.h>` → `TEST(Suite, Case) { EXPECT_EQ(1, 1); }`
- **Docs**: https://google.github.io/googletest/

### Apache Maven → `apache/maven`
Java build system and dependency management. Use with `--offline` flag.
- **Usage**: `mvn clean install -o` (offline mode)
- **Docs**: https://maven.apache.org/guides/

## Essential Libraries (Extended)

### Abseil C++ → `abseil/abseil-cpp`
Google's C++ standard library extensions — strings, sync, hash maps, time.
- **Build**: `cmake -B build && cmake --build build`

### cpu_features → `google/cpu_features`
Cross-platform runtime CPU feature detection (SSE, AVX, NEON).
- **Build**: `cmake -B build && cmake --build build`

### mimalloc → `microsoft/mimalloc`
High-performance drop-in malloc replacement. Pure C, zero dependencies.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `LD_PRELOAD=/usr/local/lib/libmimalloc.so myprogram` (drop-in replacement)

## Web Servers & Application Servers

### Apache HTTP Server → `apache/httpd`
The foundational web server since 1995. Pure C, battle-tested.
- **Build**: `./configure && make && make install`
- **Docs**: https://httpd.apache.org/docs/

### Apache Tomcat → `apache/tomcat`
Java servlet container — reference implementation of Jakarta Servlet/JSP.
- **Build**: `ant` or use pre-built distribution
- **Docs**: https://tomcat.apache.org/tomcat-10.1-doc/

## Infrastructure Provisioning

### OpenTofu → `opentofu/opentofu`
Infrastructure-as-code engine. MPL-2.0 fork of Terraform. Works with local providers.
- **Build**: `go install`
- **Docs**: https://opentofu.org/docs/

### Packer → `hashicorp/packer`
Automated machine image builder. QEMU/VirtualBox/Docker builders work offline.
- **Build**: `make dev`
- **Usage**: `packer build template.pkr.hcl`
- **Docs**: https://developer.hashicorp.com/packer/docs

## Service Discovery & Orchestration

### Consul → `hashicorp/consul`
Service discovery, health checking, KV store, service mesh. Raft consensus.
- **Build**: `make dev`
- **Docs**: https://developer.hashicorp.com/consul/docs

### Nomad → `hashicorp/nomad`
Lightweight workload orchestrator — containers, VMs, raw binaries. Single binary.
- **Build**: `make dev`
- **Docs**: https://developer.hashicorp.com/nomad/docs

### Serf → `hashicorp/serf`
Gossip-based cluster membership and orchestration. Zero central server.

### Consul Template → `hashicorp/consul-template`
Dynamic config rendering from Consul/Vault data.

## Distributed Systems Libraries

### Raft → `hashicorp/raft`
Pure Go Raft consensus protocol implementation.

### Memberlist → `hashicorp/memberlist`
SWIM gossip protocol for cluster membership and failure detection.

### go-plugin → `hashicorp/go-plugin`
Go plugin system over RPC with process isolation.

### HCL → `hashicorp/hcl`
HashiCorp Configuration Language — human-friendly config syntax.

## Coordination & Messaging

### Apache ZooKeeper → `apache/zookeeper`
Distributed coordination service for configuration, naming, synchronization.
- **Build**: `mvn clean install -DskipTests`
- **Docs**: https://zookeeper.apache.org/documentation.html

### Apache NiFi → `apache/nifi`
Visual drag-and-drop data flow automation and ETL.
- **Build**: `mvn clean install -DskipTests`
- **Docs**: https://nifi.apache.org/documentation/

### Apache Cassandra → `apache/cassandra`
Distributed NoSQL database — peer-to-peer, no single point of failure.
- **Build**: `ant`
- **Docs**: https://cassandra.apache.org/doc/latest/

## Remote Access

### Apache Guacamole Server → `apache/guacamole-server`
Clientless remote desktop gateway (RDP/VNC/SSH via browser). C daemon.
- **Build**: `./configure && make && make install`
- **Docs**: https://guacamole.apache.org/doc/gug/

### Apache Guacamole Client → `apache/guacamole-client`
Web frontend for Guacamole. Java web app.
- **Build**: `mvn package`
- **Usage**: Deploy `.war` to Tomcat → access via browser at `http://host:8080/guacamole`

## Raspberry Pi Stack

### Firmware & Boot

### Pi Firmware → `raspberrypi/firmware`
Pre-compiled kernel, modules, and GPU/bootloader firmware. Essential for offline boot.
- **Install**: Copy to `/boot/` partition on SD card
- **Note**: Pre-compiled binaries — no build required

### Pi EEPROM → `raspberrypi/rpi-eeprom`
Bootloader EEPROM tools for Pi 4/5. Critical for hardware recovery.
- **Usage**: `rpi-eeprom-update -a` (update bootloader EEPROM)

### Pi Firmware (Minimal) → `raspberrypi/rpi-firmware`
Lighter boot file repository for minimal image builds.

### WiFi/BT Firmware → `RPi-Distro/firmware-nonfree`
Broadcom wireless firmware blobs. Required for WiFi/Bluetooth on all Pi models.

### OS Image Building

### pi-gen → `RPi-Distro/pi-gen`
Official tool for creating Raspberry Pi OS images from scratch. Shell-based, fully offline.
- **Build**: `./build.sh` (creates Raspberry Pi OS images)
- **Docs**: https://github.com/RPi-Distro/pi-gen/blob/master/README.md

### pi-gen-micro → `raspberrypi/pi-gen-micro`
Builds minimal Pi images without apt/dpkg. Smaller attack surface.

### rpi-image-gen → `raspberrypi/rpi-image-gen`
Next-generation image builder with fine-grained configuration.

### raspi-config → `RPi-Distro/raspi-config`
Standard Pi configuration tool (interfaces, locale, boot, SSH). Essential for headless setup.

### System Mods → `RPi-Distro/raspberrypi-sys-mods`
System config files and udev rules that make Pi OS work.

### rpi-update → `raspberrypi/rpi-update`
Firmware update script. Useful for pre-downloading specific firmware versions.

### Userland & Utilities

### Userland → `raspberrypi/userland`
ARM-side GPU interface libraries (vcgencmd, raspistill, raspivid). Archived but essential for Pi 0-3.

### Utils → `raspberrypi/utils`
Modern utility scripts (vcgencmd successor, pinctrl, dtoverlay).

### Cross-Compilation Tools → `raspberrypi/tools`
Toolchains for building Pi software from x86 hosts.

### GPIO & Hardware

### gpiozero → `gpiozero/gpiozero`
High-level Python GPIO library. Clean API for LEDs, buttons, sensors, motors.

### WiringPi → `WiringPi/WiringPi`
Fast C GPIO library with direct hardware register access.

### pigpio → `joan2937/pigpio`
C GPIO library with hardware-timed PWM and DMA waveforms. Optional daemon for remote GPIO (bind to localhost for security).

### raspi-gpio → `RPi-Distro/raspi-gpio`
Low-level GPIO state dumper and setter. Hardware debugging essential.

### RTIMULib → `RPi-Distro/RTIMULib`
9/10-DOF IMU sensor library. Works with Sense HAT and I2C IMU breakouts.

### HAT Specs → `raspberrypi/hats`
HAT design guides, EEPROM tools, device tree overlay templates.

### Sense HAT → `raspberrypi/rpi-sense`
Firmware/driver for Sense HAT (LED matrix, joystick, environmental sensors, IMU).

### PiJuice → `PiSupply/PiJuice`
UPS/battery HAT software. Uninterruptible power, solar charging, graceful shutdown. Critical for off-grid Pi.

### Camera & Video

### picamera2 → `raspberrypi/picamera2`
Modern Python camera library based on libcamera. Supports Pi Camera v1/v2/v3.

### libcamera → `raspberrypi/libcamera`
C++ camera framework with Pi-specific pipeline handlers.

### rpicam-apps → `raspberrypi/rpicam-apps`
Camera application suite (capture, record, stream). Replaces legacy raspistill/raspivid.

### Pico / RP2040 / RP2350

### Pico SDK → `raspberrypi/pico-sdk`
Official C/C++ SDK for RP2040 and RP2350. PIO, DMA, USB, all peripherals.
- **Build**: `cmake -B build && cmake --build build` (requires arm-none-eabi-gcc)
- **Docs**: https://www.raspberrypi.com/documentation/pico-sdk/

### Pico Examples → `raspberrypi/pico-examples`
Comprehensive examples covering GPIO, ADC, I2C, SPI, PIO, USB, multicore.

### Pico Extras → `raspberrypi/pico-extras`
Additional libraries: audio, SD card, sleep modes, networking helpers.

### Picotool → `raspberrypi/picotool`
UF2 binary inspector and BOOTSEL mode interaction tool.

### Debug Probe → `raspberrypi/debugprobe`
Turns a Pico into a CMSIS-DAP debugger for another Pico. No expensive JTAG needed.

### RP2350 Boot ROM → `raspberrypi/pico-bootrom-rp2350`
Boot ROM source code. Documents the entire secure boot chain.

### Pico MicroPython Examples → `raspberrypi/pico-micropython-examples`
MicroPython examples companion to the Pico Python SDK book.

### FreeRTOS Kernel (Pico) → `raspberrypi/FreeRTOS-Kernel`
FreeRTOS port for RP2040/RP2350. Deterministic real-time on Pico.

### Pimoroni Pico → `pimoroni/pimoroni-pico`
C++ and MicroPython libraries for Pimoroni Pico add-on boards (displays, sensors, motors, audio).

### Provisioning & Deployment

### USB Boot → `raspberrypi/usbboot`
Boot Pi over USB for flashing eMMC Compute Modules or recovering bricked units.

### Secure Boot Provisioner → `raspberrypi/rpi-sb-provisioner`
Automatic secure boot chain provisioning.

### rpi-clone → `billw2/rpi-clone`
Clone a running Pi's SD card to another card or USB. Bootable backup creator.

### USB Gadget → `raspberrypi/rpi-usb-gadget`
Turns Pi into USB Ethernet gadget for headless networking over a single USB cable.

## FreeBSD Stack

FreeBSD's base system is radically self-contained — kernel, bootloader, init, compiler, firewall, hypervisor, and userland all ship in a single source tree. One repo replaces 10-15 Linux repos.

### Base System

### FreeBSD Source → `freebsd/freebsd-src`
The entire FreeBSD OS: kernel, rc.d init, pf firewall, Clang/LLVM compiler, bhyve hypervisor, jail infrastructure, Capsicum security framework, wpa_supplicant, and 200+ userland utilities.
- **Build**: `make buildworld && make buildkernel && make installkernel && make installworld`
- **Size**: ~4.5 GB source tree
- **Docs**: https://docs.freebsd.org/

### FreeBSD Ports → `freebsd/freebsd-ports`
Build recipes for 34,000+ third-party packages. Equivalent of AUR + all Arch repos.
- **Usage**: `cd /usr/ports/category/port && make install clean`
- **Size**: ~1.5 GB (recipes only — distfiles must be cached separately for offline use)

### FreeBSD Documentation → `freebsd/freebsd-doc`
Official Handbook, FAQ, articles, and man pages in source form. Buildable offline. Essential for the FreeBSD stack.

### Package Management

### pkg → `freebsd/pkg`
Official binary package manager. Supports local repositories for offline use.
- **Usage**: `pkg install <package>` or point at a local repo built by poudriere

### Poudriere → `freebsd/poudriere`
Build binary packages from ports in clean jail environments. The official way to create offline package repositories.
- **Workflow**: ports tree + cached distfiles → poudriere builds in jails → pkg installs from local repo

### GPU Drivers

### DRM Kernel Module → `freebsd/drm-kmod`
GPU driver support for Intel and AMD hardware. Required for desktop graphics on FreeBSD.

### DRM Firmware → `freebsd/drm-kmod-firmware`
Firmware blobs required by drm-kmod. Must be cached for offline GPU setup.

### Jails & Containers

FreeBSD jails provide OS-level virtualization natively in the kernel — no Docker/containerd/runc stack needed.

### Bastille → `BastilleBSD/bastille`
Jail automation with template-based management. The closest FreeBSD equivalent to Docker's ease of use.
- **Usage**: `bastille create myjail 14.0-RELEASE 10.0.0.1` → `bastille console myjail`

### Pot → `bsdpot/pot`
Container framework using jails + ZFS + pf. Thin jails, networking isolation, ZFS snapshots.
- **Build**: `make install`
- **Usage**: `pot create -p myjail -t single -b 14.0-RELEASE`

### AppJail → `DtxdF/AppJail`
Portable jail creation with Makejail automation files. Shell-based.
- **Build**: `make install`
- **Usage**: `appjail quick myjail`

### iocage → `iocage/iocage`
Python-based jail manager with VNET, ZFS, templates. Development slowed; Bastille preferred.
- **Build**: `pip install iocage`
- **Usage**: `iocage create -r 14.0-RELEASE -n myjail`

### runj → `samuelkarp/runj`
Experimental OCI-compatible runtime for FreeBSD jails.

### VM Management

bhyve (FreeBSD's type-2 hypervisor) is built into freebsd-src. These are management wrappers.

### iohyve → `pr1ntf/iohyve`
bhyve manager using ZFS for VM storage. Pure shell, minimal dependencies.

### vm-bhyve → `freebsd/vm-bhyve`
Shell-based bhyve manager. Official FreeBSD project.

### Sylve → `AlchemillaHQ/Sylve`
Web GUI for managing bhyve VMs, jails, ZFS, and networking.

### Boot & Init Alternatives

### rEFInd BSD Black → `indgy/refind-bsd-black`
Black rEFInd theme with BSD-specific icons for multi-boot setups.

### OpenLaunchd → `freebsd/openlaunchd`
Port of Apple's launchd for non-Darwin systems. Alternative to rc.d.

### Embedded

### Crochet → `freebsd/crochet`
Build FreeBSD images for Raspberry Pi, BeagleBone, and other embedded boards.

### Reference Distributions

### NomadBSD → `nomadbsd/NomadBSD`
Live USB system with pre-configured desktop and hardware auto-detection.

### GhostBSD → `ghostbsd/ghostbsd-src`
Desktop-focused FreeBSD derivative with MATE environment.

## Rescue / Minimal System

### BusyBox → `mirror/busybox`
Tiny Unix utilities in a single binary (600+ commands in ~1MB).
- **Build**: `make defconfig && make && make install`
- **Usage**: Single binary provides sh, ls, cp, grep, mount, ifconfig, etc.
- **Docs**: https://busybox.net/
- **Use case**: Emergency rescue system, embedded devices, initramfs
