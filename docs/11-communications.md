# 11 — Communications

Radio, mesh networking, and encryption for when cell towers and internet are gone.

## Software-Defined Radio

### GNU Radio → `gnuradio/gnuradio`
THE software-defined radio framework. Build any radio system in software.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: GNU Radio Companion (GRC) — drag-and-drop signal processing flowgraphs
- **Docs**: https://wiki.gnuradio.org/
- **Applications**: FM radio, amateur radio, weather satellites, ADS-B aircraft tracking

### gqrx → `gqrx-sdr/gqrx`
User-friendly SDR receiver with GUI. Listen to any frequency.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Select SDR device → tune frequency → select demodulation mode
- **Docs**: https://gqrx.dk/doc
- **Hardware**: Works with RTL-SDR ($20), HackRF, USRP, etc.

### GNSS-SDR → `gnss-sdr/gnss-sdr`
Software-defined GPS/GNSS receiver. Get position from raw satellite signals.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Connect SDR at GPS L1 frequency (1575.42 MHz) → process → get position fix
- **Docs**: https://gnss-sdr.org/docs/
- **Use case**: Verify position/timing without trusting commercial GPS receivers

## Mesh Networking

### Meshtastic → `meshtastic/firmware`
Off-grid mesh communication using LoRa radios. No cell service needed.
- **Build**: PlatformIO — `pio run -e <board>` (ESP32, nRF52, RP2040)
- **Hardware**: $20-40 LoRa boards (T-Beam, Heltec, RAK)
- **Range**: 1-10km line-of-sight, mesh extends range
- **Features**: Text messaging, GPS tracking, telemetry, encrypted
- **Docs**: https://meshtastic.org/docs/

## Ham Radio

### HamPi → `dslotter/HamPi`
All-in-one Raspberry Pi image with 100+ ham radio applications pre-installed.
- **Install**: Flash to SD card, boot Pi
- **Includes**: WSJT-X (FT8), JS8Call, Fldigi, Pat (Winlink), Dire Wolf, CHIRP, and many more
- **Docs**: https://github.com/dslotter/HamPi/wiki

### Dire Wolf → `wb2osz/direwolf`
Software soundcard modem for AX.25 packet radio and APRS.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Connect to radio sound card → decode/encode packet radio
- **Docs**: https://github.com/wb2osz/direwolf/tree/master/doc
- **Applications**: APRS position tracking, packet BBS, Winlink gateway

## Encryption & VPN

### GnuPG → `gpg/gnupg`
See [03-core-userland.md](03-core-userland.md#gnupg--gpggnupg)

### Signal Protocol → `signalapp/libsignal`
See [03-core-userland.md](03-core-userland.md#signal-protocol--signalapplibsignal)

### WireGuard Tools → `WireGuard/wireguard-tools`
Userspace tools for WireGuard VPN — `wg` and `wg-quick`. The actual configuration and management utilities.
- **Build**: `make -C src && make -C src install`
- **Usage**: `wg genkey | tee privatekey | wg pubkey > publickey` → configure `/etc/wireguard/wg0.conf` → `wg-quick up wg0`
- **Docs**: https://www.wireguard.com/quickstart/
- **Note**: WireGuard kernel module is in Linux 5.6+. These tools configure it. Tailscale uses WireGuard under the hood.

### Tailscale → `tailscale/tailscale`
See [03-core-userland.md](03-core-userland.md#tailscale--tailscaletailscale)

## Messaging & Team Communication

### Dendrite (Matrix Server) → `matrix-org/dendrite`
Second-generation Matrix homeserver written in Go. Federated, encrypted, self-hosted chat.
- **Build**: `go build -o dendrite ./cmd/dendrite`
- **Usage**: Run the binary → configure via `dendrite.yaml` → connect with Element or any Matrix client
- **Docs**: https://matrix-org.github.io/dendrite/
- **Use case**: Persistent team chat server for your community. End-to-end encrypted, supports rooms, file sharing, voice. Lighter than Synapse.

### Element Web (Matrix Client) → `element-hq/element-web`
The standard web-based Matrix chat client. Provides the UI for Dendrite.
- **Build**: `yarn install && yarn build`
- **Usage**: Serve the built files via nginx/Caddy → point at your Dendrite server
- **Docs**: https://github.com/element-hq/element-web/blob/develop/README.md
- **Features**: End-to-end encryption, rooms, threads, file sharing, voice/video calls, emoji reactions
- **Use case**: The user-facing chat interface. Deploy alongside Dendrite for a complete Slack/Discord replacement on your LAN.

### Mailu (Email Server) → `Mailu/Mailu`
Full-featured self-hosted email server with web UI, antispam, antivirus, and webmail.
- **Install**: Docker Compose-based — `docker compose up -d`
- **Features**: SMTP, IMAP, POP3, webmail (Roundcube/Rainloop), antispam (rspamd), DKIM, DMARC
- **Docs**: https://mailu.io/
- **Use case**: Run your own email infrastructure for local or inter-site communication. Works on a LAN with no internet.

### Asterisk (VoIP PBX) → `asterisk/asterisk`
Open-source telephony engine — PBX, IVR, conferencing, voicemail. The standard for VoIP.
- **Build**: `./configure && make -j$(nproc) && make install && make samples`
- **Usage**: Configure SIP extensions → connect IP phones or softphones → make calls
- **Docs**: https://docs.asterisk.org/
- **Use case**: Voice communication over any IP network. Works on a LAN with cheap SIP phones or softphone apps. No phone company needed.

### Mosquitto (MQTT Broker) → `eclipse/mosquitto`
Lightweight MQTT message broker. The glue for IoT sensor networks.
- **Build**: `cmake -B build && cmake --build build && cmake --install build`
- **Usage**: `mosquitto -c /etc/mosquitto/mosquitto.conf` → devices publish/subscribe to topics
- **Docs**: https://mosquitto.org/documentation/
- **Use case**: Central message bus for all your sensors, charge controllers, weather stations, and automation. Pairs with Home Assistant, emoncms, and the `pubsubclient` Arduino library.

## Network Infrastructure

### Pi-hole → `pi-hole/pi-hole`
See [03-core-userland.md](03-core-userland.md#pi-hole--pi-holepi-hole)

### OpenWrt → `openwrt/openwrt`
Linux-based router/networking OS.
- **Build**: `./scripts/feeds update -a && ./scripts/feeds install -a && make menuconfig && make -j$(nproc)`
- **Usage**: Flash to commodity router hardware → configure via LuCI web UI
- **Docs**: https://openwrt.org/docs/
- **Applications**: Routers, mesh nodes, firewalls, VPN gateways


## Advanced Networking

### BoringTun → `cloudflare/boringtun`
Userspace WireGuard VPN in Rust — no kernel module required.

### Quiche → `cloudflare/quiche`
QUIC transport protocol and HTTP/3 implementation in Rust.

### Pingora → `cloudflare/pingora`
Rust framework for building high-performance network proxies. Nginx-replacement tier.

## Network Testing & Resilience

### Toxiproxy → `Shopify/toxiproxy`
TCP proxy for simulating network failures, latency, bandwidth limits.

### Chaos Monkey → `Netflix/chaosmonkey`
Resiliency testing via random instance termination.

### bpftop → `Netflix/bpftop`
Real-time eBPF program monitor — like `top` for kernel eBPF programs.

### FlameScope → `Netflix/flamescope`
Flame graph visualization for performance profiling.

## Container & Service Infrastructure

### Kraken → `uber/kraken`
P2P Docker registry for distributing container images across LAN.

### Zap → `uber-go/zap`
Ultra-fast zero-allocation structured logging library for Go.

### Liquid → `Shopify/liquid`
Safe, sandboxed template language. No arbitrary code execution.

### Piranha → `uber/piranha`
Automated code refactoring for cleaning up feature flag dead code.

## Geospatial

### H3 → `uber/h3`
Hexagonal hierarchical geospatial indexing system. Pure C, zero dependencies.


## FreeBSD Networking

### pfSense → `pfsense/pfsense`
Complete firewall/router distribution based on FreeBSD. Web GUI for pf management, traffic shaping, VPN, IDS/IPS.
- **Usage**: Install on dedicated hardware → configure via local web GUI
- **Docs**: https://docs.netgate.com/pfsense/en/latest/
- **Note**: Mature, widely deployed in enterprise. Fully offline-capable, no mandatory cloud services.

### FreeBSD WiFi Build → `freebsd/freebsd-wifi-build`
Build system for FreeBSD WiFi firmware and driver components. Useful for offline WiFi preparation.


## Arduino Radio & Wireless

### RadioLib → `jgromes/RadioLib`
Universal wireless library. Supports LoRa (SX1276/SX1262), nRF24L01, CC1101, Si4432, RFM69, and more. The single most important radio library for survival comms.

### arduino-LoRa → `sandeepmistry/arduino-LoRa`
Simple LoRa library for SX1276/77/78/79. Point-to-point long-range communication.

### RF24 → `nRF24/RF24`
Driver for nRF24L01+ 2.4GHz radio transceivers. Short-range, high-speed local wireless.

### RF24Network → `nRF24/RF24Network`
OSI Layer 3 networking on top of nRF24L01+ radios.

### RF24Mesh → `nRF24/RF24Mesh`
Self-healing mesh networking on cheap 2.4GHz nRF24 radios.

### ArduinoBLE → `arduino-libraries/ArduinoBLE`
Bluetooth Low Energy for short-range device communication.

### WiFiManager → `tzapu/WiFiManager`
Captive portal WiFi configuration for ESP8266/ESP32. Auto-creates AP when no network found.

### ESPAsyncWebServer → `me-no-dev/ESPAsyncWebServer`
Async web server for ESP8266/ESP32. Local device dashboards. Archived but functional.

### ArduinoWebSockets → `Links2004/arduinoWebSockets`
WebSocket client and server. Real-time local communication.

### ArduinoOTA → `JAndrassy/ArduinoOTA`
Over-the-Air firmware updates over local WiFi. Use with authentication on isolated networks only.

## Industrial Protocols

### ArduinoModbus → `arduino-libraries/ArduinoModbus`
Modbus RTU and TCP. Industrial protocol for PLCs, solar charge controllers, generators.

### MCP2515 CAN Bus → `coryjfowler/MCP_CAN_lib`
CAN bus communication. Vehicle diagnostics, industrial automation.

### MCP2515 CAN (alt) → `autowp/arduino-mcp2515`
Newer MCP2515 CAN bus library with cleaner API.

### MQTT Client → `knolleary/pubsubclient`
Lightweight MQTT publish/subscribe messaging. Works with local Mosquitto broker, no cloud.

## Raspberry Pi Networking

### RaspAP → `RaspAP/raspap-webgui`
Full WiFi router/access point management GUI. Turns Pi into a WiFi router with web config. Manages hostapd, dnsmasq, WireGuard. Audit installer before deploying.

### PiVPN → `pivpn/pivpn`
Simplest WireGuard/OpenVPN installer for Pi. Pre-install dependencies for offline use.


## Communication Plan

**Short range** (building/campus): WiFi mesh via OpenWrt
**Medium range** (1-10km): Meshtastic LoRa mesh
**Long range** (100km+): HF ham radio with HamPi (JS8Call, Winlink)
**All ranges**: Encrypted with WireGuard/Tailscale over any IP layer
