# 13 — OSINT & Intelligence

Open-source intelligence gathering, threat analysis, global monitoring, and situational awareness — the tools used by investigative journalists, SOC analysts, and intelligence professionals to find what others try to hide.

## Global Monitoring

### World Monitor → `koala73/worldmonitor`
AI-powered global intelligence dashboard — real-time geopolitical monitoring, military tracking, infrastructure security, and economic intelligence in a unified situational awareness interface.
- **Install**: Clone repo and open `index.html` in browser — runs entirely client-side with no server dependency; AI fallback chain: Ollama (local) → Groq → OpenRouter → browser-side T5 via Transformers.js
- **Features**: 100+ data sources including GDELT/ACLED/OpenSky/NASA FIRMS, Country Instability Index, 25+ data layers, 220+ military base tracking, flight and naval vessel monitoring, economic indicators (FRED, oil, sanctions), earthquake and severe weather, World/Tech/Finance variants from single codebase, 14-language localization, fully offline-capable
- **Docs**: https://github.com/koala73/worldmonitor/blob/main/docs/DOCUMENTATION.md

## OSINT Frameworks & Automation

### SpiderFoot → `smicallef/spiderfoot`
OSINT automation platform with 200+ modules for threat intelligence and attack surface mapping.
- **Install**: `pip install spiderfoot` or `docker pull spiderfoot/spiderfoot` — embedded web server provides GUI, also works as CLI
- **Features**: 200+ modules (most need no API keys), scans IPs/domains/emails/names/ASNs/subnets, correlation engine for linking discovered data, web-based and CLI interfaces, JSON/CSV export, MIT-licensed
- **Docs**: https://github.com/smicallef/spiderfoot

### Recon-ng → `lanmaster53/recon-ng`
Modular web reconnaissance framework with a Metasploit-like console interface.
- **Install**: `git clone https://github.com/lanmaster53/recon-ng.git && cd recon-ng && pip install -r REQUIREMENTS` — modules installed from the separate `recon-ng-marketplace` repo
- **Features**: Interactive console, marketplace of installable modules, workspace management, database-backed results, reporting engine, Metasploit-style workflow for OSINT
- **Docs**: https://github.com/lanmaster53/recon-ng/wiki

### theHarvester → `laramies/theHarvester`
Gather emails, subdomains, IPs, and URLs from public sources during reconnaissance.
- **Install**: `git clone https://github.com/laramies/theHarvester.git && cd theHarvester && pip install -r requirements.txt` — requires Python 3.12+
- **Features**: Queries Censys, Shodan, SecurityTrails, VirusTotal, DuckDuckGo, Bing, Google, and many more; subdomain enumeration via certificate transparency logs; API key support for premium sources
- **Docs**: https://github.com/laramies/theHarvester/wiki

### OSINT Framework → `lockfale/OSINT-Framework`
Interactive web-based directory of OSINT tools and resources organized by category — the canonical starting point for any investigation.
- **Install**: `git clone https://github.com/lockfale/OSINT-Framework.git` and serve locally with Node.js, or use live at osintframework.com
- **Features**: Categorized tree of hundreds of free OSINT tools, from social media to geolocation to dark web; community-contributed; filterable by category
- **Docs**: https://osintframework.com/

### awesome-osint → `jivoi/awesome-osint`
Curated list of OSINT tools and resources — the "awesome list" for open-source intelligence.
- **Install**: Reference list — browse on GitHub or clone for offline use
- **Features**: Organized by category (search engines, social media, domain/IP, geolocation, dark web, threat intel, people search), regularly updated by community
- **Docs**: https://github.com/jivoi/awesome-osint

### OSINT Stuff Tool Collection → `cipher387/osint_stuff_tool_collection`
Collection of 1000+ online OSINT tools organized by function, maintained since 2021.
- **Install**: Browse at cipher387.github.io/osint_stuff_tool_collection/ or clone repo for offline reference
- **Features**: 1000+ tools categorized by purpose (maps, social media, transport, IoT, archives, leaks, etc.), web-based searchable interface, regularly updated with new tools
- **Docs**: https://github.com/cipher387/osint_stuff_tool_collection

### Bellingcat Investigation Toolkit → `bellingcat/toolkit`
Collaborative online investigation toolkit from Bellingcat — the gold standard for open-source investigations.
- **Install**: Browse at bellingcat.gitbook.io/toolkit or clone repo for offline reference
- **Features**: Tools organized by category (satellite imagery, flight tracking, social media, archiving), in-depth descriptions with use cases, maintained by volunteer community, 10+ years of investigative experience
- **Docs**: https://bellingcat.gitbook.io/toolkit

## Identity & Username Enumeration

### Sherlock → `sherlock-project/sherlock`
Hunt down social media accounts by username across 400+ websites and social networks.
- **Install**: `pipx install sherlock-project` or `pip install sherlock-project` — single command, no API keys required
- **Features**: 400+ supported sites, proxy and Tor support, XLSX export, concurrent requests, customizable site lists, included in Kali Linux
- **Docs**: https://github.com/sherlock-project/sherlock

### Maigret → `soxoj/maigret`
Collect a dossier on a person by username — checks 3000+ sites and builds comprehensive profiles.
- **Install**: `pip3 install maigret` or clone from GitHub — supports Tor/I2P sites, web interface available with `--web` flag
- **Features**: 3000+ sites supported (500 popular sites by default), recursive search across linked profiles, HTML/PDF/JSON/CSV reports, web UI with graph visualization, Telegram bot available
- **Docs**: https://github.com/soxoj/maigret

### Holehe → `megadose/holehe`
Check if an email address is registered on 120+ sites using the password reset function — without alerting the target.
- **Install**: `pip install holehe` — Python 3, works as CLI or embeddable library
- **Features**: 120+ site checks, uses forgotten password endpoints (non-intrusive), structured output with recovery info (partial phone/email), rate limit detection, fast async checks
- **Docs**: https://github.com/megadose/holehe

### GHunt → `mxrch/GHunt`
Offensive Google framework — investigate Google accounts from a Gmail address, GAIA ID, or Drive link.
- **Install**: `pip3 install ghunt` — authenticates via GHunt Companion browser extension with your own Google session
- **Features**: Pivots from Gmail/GAIA ID/Drive links/BSSID, reveals YouTube channels, Google Photos, Maps reviews, Calendar events, and more; AGPL-3.0 licensed
- **Docs**: https://github.com/mxrch/GHunt

### GitFive → `mxrch/GitFive`
Track down GitHub users — investigate profiles, uncover email addresses, and find secondary accounts.
- **Install**: `pipx install gitfive` — Python-based, no API keys required
- **Features**: Username/name history and variations, email-to-GitHub lookup, repository cloning and analysis, SSH public key extraction, secondary account detection, JSON export
- **Docs**: https://github.com/mxrch/GitFive

### social-analyzer → `qeeqbox/social-analyzer`
API, CLI, and web app for finding a person's profile across 1000+ social media sites.
- **Install**: `pip install social-analyzer` or `docker pull qeeqbox/social-analyzer` — also available as Node.js web app
- **Features**: 1000+ platforms, detection rating system (0-100), multiple analysis modules, used by law enforcement agencies, API/CLI/web modes, JSON output
- **Docs**: https://github.com/qeeqbox/social-analyzer

### WhatsMyName → `WebBreacher/WhatsMyName`
Username enumeration JSON database for 640+ sites — the data backbone behind many username search tools.
- **Install**: Reference data — `wmn-data.json` can be consumed by any tool; web interface at whatsmyname.app; Maltego transforms available
- **Features**: 640+ site definitions with URI patterns and response matching, community-contributed, JSON format for easy integration, powers multiple third-party tools
- **Docs**: https://github.com/WebBreacher/WhatsMyName

## Network & Infrastructure Reconnaissance

### Nuclei → `projectdiscovery/nuclei`
Fast, template-based vulnerability scanner powered by the global security community.
- **Install**: `go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest` or `docker pull projectdiscovery/nuclei`
- **Features**: 6500+ community templates (CVEs, misconfigs, exposures), YAML-based DSL for custom templates, JSON/SARIF output, CI/CD integration, headless browser support, multi-protocol (HTTP, DNS, TCP, SSL)
- **Docs**: https://docs.projectdiscovery.io/

### Subfinder → `projectdiscovery/subfinder`
Fast passive subdomain enumeration tool using multiple public sources.
- **Install**: `go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest` — requires Go 1.24+
- **Features**: Passive-only (no direct target contact), multiple data sources (Censys, Shodan, VirusTotal, SecurityTrails, etc.), JSON/plain output, pipe-friendly for chaining with other tools
- **Docs**: https://docs.projectdiscovery.io/tools/subfinder/overview

### httpx → `projectdiscovery/httpx`
Multi-purpose HTTP toolkit for probing web servers — fast technology detection and fingerprinting.
- **Install**: `go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest`
- **Features**: HTTP probing with status codes/titles/technologies, content-length/hash/CDN detection, TLS certificate info, follow redirects, JSON output, pipeline integration with subfinder/nuclei
- **Docs**: https://docs.projectdiscovery.io/tools/httpx/overview

### Katana → `projectdiscovery/katana`
Next-generation web crawling and spidering framework with headless browser support.
- **Install**: `go install github.com/projectdiscovery/katana/cmd/katana@latest`
- **Features**: Standard and headless crawling modes (handles SPAs/React/Angular), configurable depth and scope, automatic form filling, customizable output fields, pipeline integration, JavaScript rendering
- **Docs**: https://docs.projectdiscovery.io/tools/katana/overview

### Uncover → `projectdiscovery/uncover`
Discover exposed hosts on the internet via Shodan, Censys, Fofa, ZoomEye, and more.
- **Install**: `go install -v github.com/projectdiscovery/uncover/cmd/uncover@latest`
- **Features**: Query multiple search engines simultaneously (Shodan, Censys, Fofa, Quake, Hunter, ZoomEye, Netlas, CriminalIP), pipe results to httpx/nuclei, JSON output
- **Docs**: https://docs.projectdiscovery.io/tools/uncover/overview

### Amass → `owasp-amass/amass`
In-depth subdomain enumeration, asset discovery, and network mapping — an OWASP project.
- **Install**: `go install -v github.com/owasp-amass/amass/v4/...@master` or `snap install amass` or `brew install amass`
- **Features**: 80+ data sources, active and passive modes, graph database for storing findings across enumerations, DNS brute-forcing, name alterations, ASN discovery, network visualization
- **Docs**: https://github.com/owasp-amass/amass/blob/master/doc/user_guide.md

### IVRE → `ivre/ivre`
Network recon framework — build your own self-hosted Shodan/Censys/GreyNoise alternative.
- **Install**: `pip install ivre` or Docker images — uses Nmap, Masscan, Zeek, p0f, and ProjectDiscovery tools as backends
- **Features**: Active and passive recon, Passive DNS service, web interface for browsing scan results, import Nmap/Masscan/Zeek output, flow analysis, fully self-hosted
- **Docs**: https://doc.ivre.rocks/

### Sublist3r → `aboul3la/Sublist3r`
Fast subdomain enumeration using search engines and public databases.
- **Install**: `git clone https://github.com/aboul3la/Sublist3r.git && cd Sublist3r && pip install -r requirements.txt`
- **Features**: Queries Google, Yahoo, Bing, Baidu, Ask, Netcraft, VirusTotal, DNSdumpster; port scanning of discovered subdomains; threaded for speed; GPL licensed
- **Docs**: https://github.com/aboul3la/Sublist3r

## Social Media Intelligence (SOCMINT)

### Instaloader → `instaloader/instaloader`
Download Instagram photos, videos, stories, and metadata — the actively maintained Instagram OSINT standard.
- **Install**: `pip3 install instaloader` — Python 3, MIT-licensed
- **Features**: Public and private profile download, stories/feeds/saved media, comments and geotags, caption extraction, automatic profile rename detection, resume interrupted downloads, JSON metadata export
- **Docs**: https://instaloader.github.io/

### Osintgram → `Datalux/Osintgram`
Interactive shell for Instagram account analysis — collect, analyze, and run reconnaissance.
- **Install**: `git clone https://github.com/Datalux/Osintgram.git && cd Osintgram && pip install -r requirements.txt` or use Docker
- **Features**: Interactive shell by target username, download posts/stories/followers/following lists, photo analysis, geolocation data, v2 branch with improved performance
- **Docs**: https://github.com/Datalux/Osintgram

### Social-Media-OSINT Collection → `The-Osint-Toolbox/Social-Media-OSINT`
Curated collection of social media OSINT tools, techniques, and tradecraft organized by platform.
- **Install**: Reference collection — browse on GitHub or clone for offline use
- **Features**: Tools organized by platform (Twitter/X, Facebook, Instagram, TikTok, Snapchat, Reddit, Mastodon, LinkedIn), geo-search tools, hashtag analysis, profile enumeration
- **Docs**: https://github.com/The-Osint-Toolbox/Social-Media-OSINT

**Note**: Twint (`twintproject/twint`) was the dominant Twitter scraping tool but is now archived. Community forks exist at `ail-project/twint`. For Bluesky OSINT, see the TWINT Project's SkySearch tool.

## Dark Web & Hidden Services

### TorBot → `DedSecInside/TorBot`
Dark web OSINT crawler — spider .onion domains and map link relationships.
- **Install**: `pip install torbot` or clone and install from source — requires a running Tor instance
- **Features**: .onion domain crawling with page title/description extraction, live link checker, JSON export of link trees, visual graph of link relationships, OWASP project
- **Docs**: https://github.com/DedSecInside/TorBot

### OnionScan → `s-rah/onionscan`
Investigate the dark web by scanning .onion services for security issues and information leaks.
- **Install**: `go get github.com/s-rah/onionscan` — requires Go and a running Tor SOCKS proxy
- **Features**: Apache mod_status leaks, open directories, EXIF metadata in images, SSH key fingerprints, PGP identity correlation, Bitcoin address discovery, server fingerprinting
- **Docs**: https://onionscan.org/

**Note**: The original OnionScan is unmaintained. For .onion v3 support, see `N4rr34n6/OnionScanner` which adds SQLite integration, v3 domain validation, and scalability improvements.

## Phone & Email Intelligence

### PhoneInfoga → `sundowndev/phoneinfoga`
Information gathering framework for international phone numbers.
- **Install**: Download binary from releases or `go install github.com/sundowndev/phoneinfoga/v2@latest` — Go binary with REST API and Vue.js web client
- **Features**: Country/carrier/line-type identification, multiple scanner plugins, REST API with web interface, local and remote scanning, structured output
- **Docs**: https://sundowndev.github.io/phoneinfoga/

### h8mail → `khast3x/h8mail`
Email OSINT and password breach hunting using multiple breach databases and reconnaissance services.
- **Install**: `pip3 install h8mail` — Python 3, supports API keys for premium services
- **Features**: Queries scylla.sh, hunter.io, and other breach databases; local breach file search (plaintext and tar.gz); email chasing (related email discovery); JSON output; targets from file
- **Docs**: https://github.com/khast3x/h8mail/wiki

Cross-reference: See [Holehe](#holehe--megadoseholehe) above for checking email registration across 120+ sites.

## Facial Recognition & Image Analysis

### DeepFace → `serengil/deepface`
Lightweight face recognition and facial attribute analysis library — age, gender, emotion, and ethnicity.
- **Install**: `pip install deepface` — Python, uses TensorFlow/Keras
- **Features**: Multiple recognition models (VGG-Face, OpenFace, ArcFace, DeepID, Dlib, SFace, GhostFaceNet), facial attribute analysis (age/gender/emotion/race), real-time webcam processing, 97.5%+ accuracy, REST API available
- **Docs**: https://github.com/serengil/deepface

### face_recognition → `ageitgey/face_recognition`
The world's simplest facial recognition API for Python and the command line.
- **Install**: `pip install face_recognition` — requires dlib (C++ dependency), Docker image available
- **Features**: 99.38% accuracy on LFW benchmark, command-line tools for batch processing, find faces in images, identify who appears in photos, real-time face recognition from webcam
- **Docs**: https://github.com/ageitgey/face_recognition

### DeepfakeBench → `SCLBD/DeepfakeBench`
Comprehensive benchmark for deepfake detection — 15 detection methods across 9 datasets.
- **Install**: Clone repo and follow setup instructions — requires PyTorch, CUDA recommended
- **Features**: 15 state-of-the-art detection methods, 9 deepfake datasets (FaceForensics++, Celeb-DF, DFDC, etc.), standardized evaluation protocols, reproducible benchmarks, NeurIPS 2023 paper
- **Docs**: https://github.com/SCLBD/DeepfakeBench

### ExifTool → `exiftool/exiftool`
The definitive metadata reader/writer — extract EXIF, GPS, IPTC, XMP, and maker notes from images, video, audio, and documents.
- **Install**: `apt install libimage-exiftool-perl` or `brew install exiftool` or download from exiftool.org — Perl-based, cross-platform
- **Features**: Reads/writes metadata in hundreds of formats, GPS coordinate extraction, maker notes for all major camera brands, batch processing, JSON/XML/HTML output, forensic analysis of image manipulation
- **Docs**: https://exiftool.org/

## Document & Metadata Extraction

### Metagoofil → `opsdisk/metagoofil`
Search Google for specific document types hosted on a target domain and download them for analysis.
- **Install**: `git clone https://github.com/opsdisk/metagoofil.git && cd metagoofil && pip install -r requirements.txt`
- **Features**: Searches for pdf/doc/xls/ppt/etc on target domains via Google, bulk download to local storage, defers metadata extraction to ExifTool, default Kali Linux tool
- **Docs**: https://github.com/opsdisk/metagoofil

### MetaDetective → `franckferman/MetaDetective`
Advanced metadata extraction and analysis — the modern successor to Metagoofil's analysis capabilities.
- **Install**: `pip install MetaDetective` — Python 3
- **Features**: Direct web scraping (no Google dependency, avoids IP restrictions), categorized metadata display (authors, software, GPS, modification logs, embedded links), single file and batch modes, extension filtering
- **Docs**: https://github.com/franckferman/MetaDetective

## Threat Intelligence Platforms

### OpenCTI → `OpenCTI-Platform/opencti`
Open cyber threat intelligence platform — structure, store, and visualize threat data using STIX2 standards.
- **Install**: `docker compose` with official stack (Elasticsearch, Redis, RabbitMQ, MinIO, frontend, backend) — community edition is Apache 2.0
- **Features**: STIX2-native knowledge schema, GraphQL API, MITRE ATT&CK integration, connectors for MISP/TheHive/VirusTotal/AlienVault, relationship mapping, confidence levels, import/export (CSV, STIX2 bundles)
- **Docs**: https://docs.opencti.io/

### MISP → `MISP/MISP`
Open-source threat intelligence and sharing platform — the standard for structured indicator exchange.
- **Install**: Deploy via official installer script or Docker — CakePHP application with MySQL/MariaDB backend
- **Features**: Automatic correlation engine, real-time synchronization between MISP instances, granular sharing groups, PyMISP Python library, taxonomies and galaxies for classification, STIX/OpenIOC export, community-maintained threat feeds
- **Docs**: https://www.misp-project.org/

### TheHive → `TheHive-Project/TheHive`
Scalable security incident response platform for SOCs, CSIRTs, and CERTs.
- **Install**: Docker or DEB/RPM packages — Scala/Play backend with Elasticsearch/Cassandra storage
- **Features**: Collaborative case management, observable analysis via Cortex integration, MISP synchronization, customizable dashboards, alert triage, task assignment, REST API
- **Docs**: https://docs.strangebee.com/

**Note**: TheHive 3/4 (open source) is archived. TheHive 5 is commercial via StrangeBee. The open-source v4 remains useful for self-hosted deployments.

### Maltrail → `stamparm/maltrail`
Malicious traffic detection system using public blacklists and heuristic analysis.
- **Install**: `git clone https://github.com/stamparm/maltrail.git && cd maltrail && sudo python3 sensor.py` (sensor) / `python3 server.py` (server)
- **Features**: Domain/URL/IP/user-agent trail detection, publicly sourced blacklists + custom lists, heuristic discovery of unknown threats, web-based reporting dashboard, sensor/server architecture, MIT licensed
- **Docs**: https://github.com/stamparm/maltrail

## Vehicle & Transport Tracking

### OpenALPR → `openalpr/openalpr`
Automatic license plate recognition library — identify plates in images and video streams.
- **Install**: Build from source with CMake + OpenCV, or `docker pull openalpr/openalpr` — C++ with Python/Java/Node.js/Go bindings
- **Features**: Real-time video stream processing, region-specific plate patterns (US states, EU countries), JSON output, configurable top-N results, AGPLv3 license (commercial license available)
- **Docs**: https://github.com/openalpr/openalpr

### tar1090 → `wiedehopf/tar1090`
Improved web interface for ADS-B flight tracking with dump1090-fa and readsb.
- **Install**: `sudo bash -c "$(wget -nv -O - https://github.com/wiedehopf/tar1090/raw/master/install.sh)"` on a Raspberry Pi or Linux box running readsb/dump1090-fa
- **Features**: 1-hour fine-grained history (10-second intervals), "show all tracks" with smooth performance, military/PIA/LADD aircraft filtering, ICAO hex selection, multiple map layers, GPL v2
- **Docs**: https://github.com/wiedehopf/tar1090

### readsb → `wiedehopf/readsb`
ADS-B decoder swiss knife — Mode-S/ADS-B/TIS demodulator for RTL-SDR, BladeRF, and Mode-S Beast hardware.
- **Install**: Build from source on Raspberry Pi or Linux — `git clone https://github.com/wiedehopf/readsb.git && cd readsb && make`
- **Features**: RTL-SDR/BladeRF/Beast/GNS5894 support, beast_reduce output for efficient forwarding, network input/output (Beast, SBS, JSON), aircraft.json API for web frontends, optimized for global map backends
- **Docs**: https://github.com/wiedehopf/readsb

### dump1090-fa → `flightaware/dump1090`
ADS-B Mode S decoder for RTL-SDR devices — the FlightAware-maintained fork with active development.
- **Install**: Included in PiAware Debian package, or build from source — `git clone https://github.com/flightaware/dump1090.git && cd dump1090 && make`
- **Features**: Demodulates ADS-B/Mode S/Mode 3A/3C from RTL-SDR, SkyAware web interface, network output (Beast, SBS BaseStation), integrated with FlightAware network, actively maintained
- **Docs**: https://github.com/flightaware/dump1090

### AisLib → `dma-ais/AisLib`
Java library for handling AIS (Automatic Identification System) messages — decode ship tracking data.
- **Install**: Maven dependency — add to `pom.xml` from Maven Central; requires Java 8+
- **Features**: AIS message parsing and decoding, target tracking with position/speed caching, filtering by vessel characteristics (speed, type, area), serial/TCP/file input, Apache 2.0 license
- **Docs**: https://github.com/dma-ais/AisLib

## Signals Intelligence

### gr-adsb → `mhostetter/gr-adsb`
GNU Radio out-of-tree module for demodulating and decoding ADS-B packets from SDR hardware.
- **Install**: Build with CMake as GNU Radio OOT module — requires GNU Radio (install via PyBOMBS recommended)
- **Features**: Multiple sample rates (2/4/6 Msps), supports USRP/RTL-SDR/HackRF/BladeRF via OsmoSDR, example GRC flowgraph included, optional SQLite burst recording for replay
- **Docs**: https://github.com/mhostetter/gr-adsb

**Cross-references**: For SDR hardware and software, see [11-communications.md](11-communications.md) — GNU Radio, gqrx, rtl_433 for signal processing and protocol decoding. See [09-survival.md](09-survival.md) for radio and mesh networking.

## Website Technology Fingerprinting

### webanalyze → `rverton/webanalyze`
Port of Wappalyzer for mass scanning — identify technologies used on websites from the command line.
- **Install**: `go install -v github.com/rverton/webanalyze/cmd/webanalyze@latest` — single Go binary
- **Features**: Uses Wappalyzer's technologies.json database, mass scanning from file input, CSV/JSON output, configurable workers and crawl depth, `-update` flag for latest definitions, Docker support
- **Docs**: https://github.com/rverton/webanalyze

### WhatWeb → `urbanadventurer/WhatWeb`
Next-generation web scanner — identify web technologies with 1800+ plugins.
- **Install**: `apt install whatweb` (Kali/Debian) or `gem install whatweb` — Ruby-based
- **Features**: 1800+ recognition plugins (CMS, frameworks, servers, analytics, JavaScript libraries), 4 aggression levels (stealthy to aggressive), version detection, email/account extraction, JSON/XML/SQL output
- **Docs**: https://github.com/urbanadventurer/WhatWeb/wiki

## Geospatial Intelligence (GEOINT)

### Geolocation-OSINT → `The-Osint-Toolbox/Geolocation-OSINT`
Curated collection of geolocation OSINT resources, tools, and techniques for verifying locations from imagery.
- **Install**: Reference collection — browse on GitHub or clone for offline use
- **Features**: Satellite imagery tools, street-level verification, sun/shadow analysis, terrain matching, map-based research tools, organized by technique and use case
- **Docs**: https://github.com/The-Osint-Toolbox/Geolocation-OSINT

**Cross-references**: For GIS and mapping, see QGIS in [09-survival.md](09-survival.md). For satellite imagery processing pipelines, see [18-ai-ml.md](18-ai-ml.md). OpenStreetMap and offline mapping tools are covered in [03-core-userland.md](03-core-userland.md).

## Survival Notes

In a post-collapse scenario, OSINT is not about tracking people on social media — it is about **situational awareness**: knowing what is happening around you when centralized information systems have failed.

**Monitoring the airwaves**: With an RTL-SDR dongle ($20) and dump1090/readsb/tar1090, you can track every aircraft broadcasting ADS-B within 200+ miles. This tells you who is flying overhead — military transports, search-and-rescue, supply drops, or unknown aircraft approaching your area. gr-adsb gives you the raw GNU Radio pipeline for custom signal processing.

**Tracking ships and waterways**: AIS receivers (another SDR frequency) let you monitor commercial shipping, coast guard, and naval vessels. AisLib decodes the messages. Knowing what ships are in your port or passing your coast is critical for trade, threat assessment, and supply chain awareness.

**Identifying unknowns**: When strangers arrive, facial recognition (DeepFace, face_recognition) can help identify them against databases you have maintained. EXIF metadata on intercepted documents and photos can reveal who created them, what software was used, and GPS coordinates where images were taken.

**Perimeter intelligence**: License plate recognition (OpenALPR) can be deployed on approach roads with a camera and a Raspberry Pi. Vehicle logs build patterns of who comes and goes.

**Offline threat databases**: MISP and OpenCTI can be deployed on local infrastructure to maintain threat intelligence — even without internet, you can build and share intelligence within a community network about hostile actors, known threats, and suspicious patterns.

**Technology reconnaissance**: When you encounter unknown infrastructure (a radio transmitter, a web server on a local network, an unfamiliar device), tools like WhatWeb, webanalyze, Nuclei, and Nmap help you identify what you are dealing with before engaging.

**Radio signals**: Cross-reference with [11-communications.md](11-communications.md) for GNU Radio, gqrx, and rtl_433. Monitoring shortwave broadcasts, decoding digital modes, and scanning for local radio transmissions are primary intelligence-gathering methods when the internet is gone.

**The principle**: You cannot defend what you do not understand. OSINT tools give you the ability to build a picture of your operational environment from available signals — radio, network, visual, and documentary — without relying on centralized services that may no longer exist.
