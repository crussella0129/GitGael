# 12 — Security & Governance

Network defense, encryption, identity management, democratic decision-making, resource allocation, and community coordination — the tools needed to build and protect a functioning society.

## Network Security & Firewall

### OPNsense → `opnsense/core`
FreeBSD-based firewall and routing platform — the open-source successor to pfSense.
- **Install**: Download ISO from opnsense.org, flash to USB, install on dedicated hardware (any x86_64 box with 2+ NICs)
- **Features**: Stateful firewall, traffic shaping, VPN (OpenVPN/WireGuard/IPsec), intrusion detection via Suricata, web proxy, DNS filtering, plugin ecosystem
- **Docs**: https://docs.opnsense.org/

### Suricata → `OISF/suricata`
High-performance network intrusion detection and prevention engine.
- **Install**: `sudo add-apt-repository ppa:oisf/suricata-stable && sudo apt install suricata` or build from source with `./configure && make && make install`
- **Features**: Real-time IDS/IPS, network security monitoring, pcap processing, protocol identification, file extraction, multi-threaded
- **Docs**: https://docs.suricata.io/

### Snort → `snort3/snort3`
The original open-source network intrusion prevention system, now maintained by Cisco.
- **Install**: Build from source — install LibDAQ first, then `./configure_cmake.sh --prefix=/usr/local && cd build && make -j$(nproc) install`
- **Features**: Real-time traffic analysis, packet logging, protocol analysis, content searching, rule-based detection engine
- **Docs**: https://docs.snort.org/

### CrowdSec → `crowdsecurity/crowdsec`
Collaborative security engine — like fail2ban but crowd-powered and written in Go.
- **Install**: `curl -s https://install.crowdsec.net | sudo sh` or `apt install crowdsec`
- **Features**: Log analysis, behavioral detection, community-shared threat intelligence, remediation components (firewall, Nginx, Cloudflare), 60x faster than fail2ban
- **Docs**: https://docs.crowdsec.net/

### fail2ban → `fail2ban/fail2ban`
Scans log files and bans IPs with too many authentication failures.
- **Install**: `apt install fail2ban` or `pip install fail2ban`
- **Features**: Monitors SSH, Apache, Nginx, and other service logs; configurable ban thresholds and durations; jail-based architecture; iptables/firewalld/nftables backends
- **Docs**: https://github.com/fail2ban/fail2ban/wiki

### Wazuh → `wazuh/wazuh`
Unified security monitoring platform — XDR and SIEM in one open-source package.
- **Install**: `curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh && sudo bash wazuh-install.sh -a` (all-in-one), or deploy agents on individual hosts
- **Features**: Intrusion detection, log analysis, file integrity monitoring, vulnerability detection, compliance auditing (PCI DSS, HIPAA), active response, agent-based architecture
- **Docs**: https://documentation.wazuh.com/

## Encryption & Privacy

### age → `FiloSottile/age`
Simple, modern file encryption with no configuration needed.
- **Install**: `apt install age`, `brew install age`, or `go install filippo.io/age/cmd/...@latest`
- **Features**: Public-key and passphrase encryption, SSH key compatibility (ssh-ed25519, ssh-rsa), UNIX-pipe composability, no config files, YubiKey support via plugin
- **Docs**: https://age-encryption.org/

### WireGuard
See [03-core-userland.md](03-core-userland.md#tailscale--tailscaletailscale) — Tailscale builds on WireGuard for mesh VPN. WireGuard itself is in the Linux kernel (`wireguard/wireguard-linux`).

### VeraCrypt → `veracrypt/VeraCrypt`
Full-disk and volume encryption — the maintained successor to TrueCrypt.
- **Install**: Download from veracrypt.io/en/Downloads.html (Linux, Windows, macOS), or build from source with `make`
- **Features**: Encrypted volumes and full-disk encryption, hidden volumes for plausible deniability, AES/Twofish/Serpent cascading, hardware-accelerated AES, cross-platform
- **Docs**: https://veracrypt.io/en/Documentation.html

### OnionShare → `onionshare/onionshare`
Share files, host websites, and chat anonymously over the Tor network.
- **Install**: `apt install onionshare`, `brew install --cask onionshare`, `snap install onionshare`, or `pip install onionshare-cli`
- **Features**: Anonymous file sharing (send and receive), ephemeral onion sites for static web hosting, anonymous chat rooms, no account or server needed, built-in Tor
- **Docs**: https://docs.onionshare.org/

### Tails → `tails/tails` (GitLab: gitlab.tails.boum.org)
Privacy-focused live operating system that routes all traffic through Tor. Now part of the Tor Project.
- **Install**: Download ISO from tails.net, flash to USB with Etcher or `dd`, boot from USB — leaves no trace on host machine
- **Features**: Amnesic by default (no disk writes), all traffic routed through Tor, built-in encryption tools (GnuPG, VeraCrypt), Electrum wallet, secure deletion, persistent storage option
- **Docs**: https://tails.net/doc/

**Cross-reference**: GnuPG and Signal Protocol are covered in [03-core-userland.md](03-core-userland.md#gnupg--gpggnupg) and [11-communications.md](11-communications.md#encryption--vpn).

## Identity & Access Management

### Keycloak → `keycloak/keycloak`
Enterprise identity and access management — SSO, OAuth2, SAML, LDAP in one platform.
- **Install**: `docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev`, or download and run `bin/kc.sh start-dev`
- **Features**: Single sign-on, OpenID Connect/OAuth 2.0/SAML 2.0, LDAP/Active Directory federation, social login, fine-grained authorization, admin console, multi-tenancy (realms)
- **Docs**: https://www.keycloak.org/documentation

### Authentik → `goauthentik/authentik`
Modern identity provider for self-hosted infrastructure — the "authentication glue."
- **Install**: `docker compose` with official stack (PostgreSQL + Redis + server + worker), or Helm chart for Kubernetes
- **Features**: SAML, OAuth2/OIDC, LDAP, RADIUS, SCIM, forward auth proxy, customizable login flows, admin UI, application dashboard, self-service user enrollment
- **Docs**: https://docs.goauthentik.io/

### Authelia → `authelia/authelia`
Lightweight SSO and 2FA portal for reverse proxy authentication.
- **Install**: `docker pull authelia/authelia` or download static binary; configure with YAML, place behind Nginx/Traefik/Caddy
- **Features**: Single sign-on, TOTP/WebAuthn/Duo MFA, OpenID Connect certified, per-resource access policies, password reset, works with Nginx/Traefik/Caddy/HAProxy/Envoy
- **Docs**: https://www.authelia.com/

## Democratic Governance & Voting

### Decidim → `decidim/decidim`
Participatory democracy framework used by cities worldwide — from Barcelona to Helsinki.
- **Install**: Ruby on Rails app — `gem install decidim && decidim my_app` generates a new instance; deploy with standard Rails stack (PostgreSQL, Redis, Sidekiq)
- **Features**: Citizen proposals, participatory budgets, public consultations, assemblies, collaborative legislation drafting, meeting management, comments and endorsements
- **Docs**: https://docs.decidim.org/

### CONSUL Democracy → `consuldemocracy/consuldemocracy`
Open government and e-participation platform used by 250+ cities serving 90 million citizens.
- **Install**: Ruby on Rails app — clone repo, install Ruby 3.3+, PostgreSQL, Node.js, run `bin/setup`; production installer available at `consuldemocracy/installer`
- **Features**: Citizen proposals, public debates, participatory budgets, collaborative legislation, polls/votings, geolocation of proposals, citizen verification
- **Docs**: https://consuldemocracy.org/

### Helios Voting → `benadida/helios-server`
Verifiable online voting system with end-to-end cryptographic auditing.
- **Install**: Python/Django app — clone repo, install dependencies with pip, configure PostgreSQL, run with `python manage.py runserver`
- **Features**: Homomorphic encryption for ballot secrecy, public bulletin board for verification, voter tracking numbers, open-audit elections, used by universities and the International Association for Cryptographic Research
- **Docs**: https://heliosvoting.org/

### Loomio → `loomio/loomio`
Collaborative decision-making for groups — discuss, propose, decide without endless meetings.
- **Install**: Docker-based — clone repo, `docker compose up`; or deploy via loomio.com hosted service
- **Features**: Discussion threads, multiple decision types (polls, proposals, dot voting, ranked choice, score, time poll), group management, email integration, Slack/Microsoft Teams/Discord integration
- **Docs**: https://help.loomio.com/

## Resource Management

### ERPNext → `frappe/erpnext`
Full enterprise resource planning — accounting, inventory, manufacturing, HR, CRM in one system.
- **Install**: `bench init frappe-bench && cd frappe-bench && bench get-app erpnext && bench new-site site1.local --install-app erpnext` (requires Frappe Bench CLI, Python 3.11+, MariaDB, Redis, Node.js)
- **Features**: Accounting and invoicing, inventory and warehouse management, manufacturing and BOM, HR and payroll, CRM, POS, project management, asset management, 1000+ configurable modules
- **Docs**: https://docs.erpnext.com/

### InvenTree → `inventree/InvenTree`
Lightweight inventory management with part tracking, BOMs, and stock control.
- **Install**: `docker compose` with official images, or `pip install inventree` with PostgreSQL/MySQL backend
- **Features**: Hierarchical part categories, stock tracking with location management, bill of materials, purchase/sales orders, barcode scanning, REST API, plugin system, companion mobile app
- **Docs**: https://docs.inventree.org/

### Grocy → `grocy/grocy`
Household and community resource management — ERP beyond your fridge.
- **Install**: Download release and serve with any PHP-capable web server, or `docker compose up` with official image; Windows desktop app available
- **Features**: Stock management with expiration tracking, automatic shopping lists, meal planning, recipe management, chore scheduling, battery tracking, equipment management, barcode scanning, REST API
- **Docs**: https://grocy.info/

## Project Coordination

### Leantime → `Leantime/leantime`
Goal-focused project management designed for accessibility and non-project-managers.
- **Install**: `docker compose up` with official images, or download and deploy on PHP 8.1+/MySQL stack
- **Features**: Kanban boards, Gantt charts, to-do lists, milestones, timesheets, idea boards, retrospectives, goal tracking, document management, LDAP integration
- **Docs**: https://docs.leantime.io/

### Focalboard → `mattermost-community/focalboard`
Self-hosted alternative to Trello, Notion, and Asana — kanban and project boards.
- **Install**: Download standalone desktop app (Mac/Win/Linux) or deploy server via Docker; also available as Mattermost plugin
- **Features**: Kanban boards, table views, calendar views, card-based task management, templates, filters, multi-user collaboration, import from Trello/Asana/Jira
- **Docs**: https://www.focalboard.com/

### Vikunja → `go-vikunja/vikunja`
Open-source task management with multiple views — to-do lists that scale to teams.
- **Install**: Single binary, Docker, or `docker compose` — backend is Go, frontend is Vue.js
- **Features**: List/Kanban/Gantt/table views, task assignments, labels, priorities, due dates, reminders, file attachments, CalDAV sync, team sharing, API-first design
- **Docs**: https://vikunja.io/docs/

### Taiga → `kaleidos-ventures/taiga`
Agile project management for Scrum and Kanban teams.
- **Install**: Docker-based — `docker compose up` with official images (Python/Django backend, Angular frontend, PostgreSQL, RabbitMQ)
- **Features**: Scrum backlog and sprint planning, Kanban board, epics, user stories, issue tracking, wiki, swimlanes, burndown charts, customizable workflows, video conferencing integration
- **Docs**: https://docs.taiga.io/

## Community Security Plan

A community of 50-500 people needs layered defense and organized governance:

**Network perimeter**: OPNsense as gateway firewall, Suricata or Snort for intrusion detection, CrowdSec and fail2ban for automated threat response, Wazuh for centralized monitoring.

**Data protection**: age for encrypting files and backups, VeraCrypt for disk encryption on sensitive machines, WireGuard/Tailscale for site-to-site VPN between community locations, OnionShare when anonymous communication is needed.

**Identity and access**: Keycloak or Authentik as the central identity provider for all community services, Authelia for lightweight SSO/2FA on web apps behind a reverse proxy.

**Decision-making**: Decidim or CONSUL Democracy for formal community proposals and participatory budgets, Loomio for day-to-day group decisions without meetings, Helios for verified elections of community leadership.

**Resource tracking**: ERPNext for full supply chain and accounting if your community is large enough, InvenTree for parts and inventory in workshops, Grocy for food stores and household supplies.

**Work coordination**: Taiga or Leantime for project planning and sprint management, Focalboard or Vikunja for team task boards and personal to-do lists.

**Cross-references**: Networking fundamentals in [03-core-userland.md](03-core-userland.md), radio and mesh networks in [11-communications.md](11-communications.md), GnuPG/Signal for end-to-end encryption in [03-core-userland.md](03-core-userland.md#gnupg--gpggnupg) and [11-communications.md](11-communications.md#encryption--vpn).
