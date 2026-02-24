# 09 — Survival, Agriculture & Field Craft

Hunting, foraging, defense, agriculture, field craft, welding, radio, shelter, and everything needed to survive and rebuild.

## Agriculture

### farmOS → `farmOS/farmOS`
Web-based farm management: crop planning, animal tracking, soil data, field mapping.
- **Install**: Drupal-based — requires PHP/MySQL stack
- **Features**: Planting schedules, harvest logs, input tracking, area mapping
- **Docs**: https://farmos.org/guide/

### plant-it → `MDeLuise/plant-it`
Self-hosted plant management app. Track your garden.
- **Install**: Docker or build from source
- **Features**: Plant diary, watering reminders, photo tracking, species database
- **Docs**: https://github.com/MDeLuise/plant-it/wiki

### Growstuff → `Growstuff/growstuff`
Community crop tracking and garden planning. Track what you grow, when you plant and harvest, and share data.
- **Install**: Rails app — `bundle install && rails db:setup && rails server`
- **Deps**: Ruby, PostgreSQL, Node.js
- **Features**: Crop database, planting/harvest tracking, seed saving records, community knowledge sharing
- **Docs**: https://github.com/Growstuff/growstuff/wiki
- **Use case**: Community-level food production tracking. Know what grows in your area, when to plant, expected yields, and who has seeds to share.

## Food & Recipes

### Tandoor Recipes → `TandoorRecipes/recipes`
Self-hosted recipe manager with meal planning.
- **Install**: Docker recommended, or Django app
- **Features**: Recipe import, meal planning, shopping lists, nutritional info, offline PWA
- **Docs**: https://docs.tandoor.dev/

### CraftBeerPi → `craftbeerpi/craftbeerpi`
Raspberry Pi-based fermentation/brewing controller.
- **Install**: `pip install craftbeerpi`
- **Features**: Temperature profiles, step automation, sensor monitoring
- **Docs**: https://craftbeerpi.gitbook.io/
- **Use cases**: Beer, wine, kombucha, yogurt, cheese — any fermentation

## Medical

For the complete medical software stack (OpenMRS, GNU Health, OpenEMR, drug databases, clinical decision support, and more), see [07-medical.md](07-medical.md).

## Hunting & Trapping

### py-ballisticcalc → `o-murphy/py-ballisticcalc`
LGPL library for small arms ballistic calculations based on point-mass (3 DoF) plus spin drift.
- **Install**: `pip install py-ballisticcalc[exts,charts]`
- **Features**: Trajectory calculation for firearms/airguns/bows, G1/G7 drag models, wind drift, Coriolis effect, multiple ballistic coefficients
- **Docs**: https://github.com/o-murphy/py-ballisticcalc#readme

### PyTorch Wildlife → `microsoft/CameraTraps`
AI platform for wildlife detection and classification — includes MegaDetector for camera trap image processing.
- **Install**: `pip install PytorchWildlife`
- **Features**: MegaDetector V6 animal/person/vehicle detection, species classification, batch processing of camera trap images
- **Docs**: https://microsoft.github.io/CameraTraps/
- **Use case**: Process thousands of trail camera images automatically — identify game species, detect intruders, monitor wildlife patterns

### Ballistic Calculator App → `nikolaygekht/ballistic.calculator.app`
Windows ballistic calculator with accuracy comparable to commercial products, 100% WinE compatible.
- **Install**: Build from source (.NET) or download release binary
- **Features**: Full trajectory tables, zero range calculation, atmospheric corrections, reticle-based adjustments
- **Docs**: https://github.com/nikolaygekht/ballistic.calculator.app#readme

## Foraging & Botany

### Pl@ntNet-300K → `plantnet/PlantNet-300K`
Large-scale plant image dataset (306k images, 1081 species) with trained ML models for plant identification.
- **Install**: Clone repo, requires Python + PyTorch
- **Features**: Pre-trained species classifiers, benchmark dataset, species distribution metadata
- **Docs**: https://github.com/plantnet/PlantNet-300K#readme
- **Use case**: Train or fine-tune local plant identification models that work offline — critical for foraging identification

### iNaturalist Open Data → `inaturalist/inaturalist-open-data`
Research-grade species observation data from the iNaturalist community science platform — millions of verified identifications.
- **Install**: Download datasets (AWS Open Data)
- **Features**: Photos and observations for plants, animals, fungi; research-grade identifications; geographic metadata
- **Docs**: https://github.com/inaturalist/inaturalist-open-data#readme
- **Use case**: Build local species reference databases for your region — combine with ML models for offline identification

### FungalTraits → `traitecoevo/fungaltraits`
Dynamic database of fungal trait measurements — ecology, morphology, and functional attributes of fungi.
- **Install**: R package: `remotes::install_github("traitecoevo/fungaltraits")`
- **Features**: Functional guild data, growth form, decay type, edibility indicators, enzymatic traits
- **Docs**: https://github.com/traitecoevo/fungaltraits#readme
- **Use case**: Cross-reference mushroom field observations with trait data to assess edibility and toxicity

## Physical Defence & Perimeter Security

### Frigate → `blakeblackshear/frigate`
NVR with realtime local AI object detection for IP cameras. Actively maintained with v0.17+ in 2026.
- **Install**: Docker: `docker run -d ghcr.io/blakeblackshear/frigate:stable`
- **Features**: Realtime person/vehicle/animal detection, 24/7 recording, event clips, zone-based alerts, Home Assistant integration
- **Docs**: https://docs.frigate.video/
- **Use case**: Perimeter security with AI — detect humans approaching before they reach your position

### ZoneMinder → `ZoneMinder/zoneminder`
Full-featured video surveillance system for Linux — supports IP, USB, and analog cameras.
- **Install**: `apt install zoneminder` (Debian/Ubuntu) or build from source
- **Features**: Multi-camera monitoring, motion detection, event recording, web interface, mobile apps, scalable architecture
- **Docs**: https://zoneminder.readthedocs.io/

### Motion → `Motion-Project/motion`
Lightweight software motion detector — monitors video signals and triggers actions on movement.
- **Install**: `apt install motion` (Debian/Ubuntu)
- **Features**: Video4Linux support, network camera support, Pi camera support, configurable motion zones, event scripting
- **Docs**: https://motion-project.github.io/
- **Use case**: Low-resource perimeter monitoring — runs on a Raspberry Pi with a cheap USB camera

### ATAK-CIV → `deptofdefense/AndroidTacticalAssaultKit-CIV`
Android Tactical Awareness Kit — civilian release of the US military geospatial situational awareness tool.
- **Install**: Build from source (Android SDK) or download APK from tak.gov
- **Features**: Real-time team position tracking, terrain analysis, route planning, plugin architecture, offline map support
- **Docs**: https://www.civtak.org/
- **Use case**: Coordinate group defense, patrol routes, and resource locations on shared tactical maps

## Scavenging & Salvage

### InvenTree → `inventree/InvenTree`
Open-source inventory management system — powerful stock control and part tracking.
- **Install**: Docker recommended, or `pip install inventree`
- **Features**: Part categorization, stock tracking, BOM management, supplier integration, barcode scanning, REST API
- **Docs**: https://docs.inventree.org/
- **Use case**: Track salvaged parts, manage supply caches, know exactly what you have and where it is

### rtl_433 → `merbanan/rtl_433`
Decode radio transmissions from ISM band devices (433 MHz, 868 MHz, 315 MHz, 915 MHz) using RTL-SDR.
- **Install**: `apt install rtl-433` (Debian/Ubuntu) or `brew install rtl_433` (macOS)
- **Features**: 250+ device protocol decoders, weather stations, alarm sensors, tire pressure monitors, utility meters, JSON/MQTT output
- **Docs**: https://github.com/merbanan/rtl_433#readme
- **Use case**: Scan for active wireless devices in an area — locate occupied buildings, functioning weather stations, active alarm systems

## Welding & Metalwork

### LinuxCNC → `LinuxCNC/linuxcnc`
See [14-manufacturing.md](14-manufacturing.md#linuxcnc--linuxcnclinuxcnc) — controls CNC machines including plasma cutters and laser cutters for metal fabrication.

### CalculiX → `Dhondtguido/CalculiX`
Three-dimensional structural finite element program for linear/nonlinear static, dynamic, and thermal analysis.
- **Install**: Build from source (C/Fortran), or use PrePoMax GUI on Windows
- **Features**: Heat transfer simulation, stress analysis, nonlinear material models, contact mechanics, coupled thermomechanical analysis
- **Docs**: https://www.calculix.de/
- **Use case**: Simulate weld joint stress, thermal effects on metal structures, verify fabricated designs before committing materials

## Militia Tactics & Strategy

### ATAK-CIV → `deptofdefense/AndroidTacticalAssaultKit-CIV`
See [Physical Defence & Perimeter Security](#atak-civ--deptofdefenseandroidtacticalassaultkit-civ) above — tactical mapping and team coordination.

### QGIS → `qgis/QGIS`
Free, open-source cross-platform geographical information system for terrain analysis and mapping.
- **Install**: Download installer from qgis.org, or `apt install qgis` (Debian/Ubuntu)
- **Features**: Vector/raster analysis, terrain contour generation, viewshed analysis, route planning, GPS integration, 1000+ plugins
- **Docs**: https://docs.qgis.org/
- **Use case**: Analyze terrain for defensive positions, plan supply routes, map resource locations, generate elevation profiles

### Panopticon → `Panopticon-AI-team/panopticon`
Web-based military simulation platform compatible with OpenAI Gym — scenario planning and wargaming.
- **Install**: Clone repo, Python + web stack
- **Features**: Force modeling (air/land/naval), scenario design, AI agent integration, exercise analysis
- **Docs**: https://github.com/Panopticon-AI-team/panopticon#readme
- **Use case**: Run tactical what-if scenarios to test defense plans before committing personnel

## Makeshift Equipment

### OpenSCAD → `openscad/openscad`
See [15-3d-printing.md](15-3d-printing.md#openscad--openscadopenscad) — parametric 3D design from code. Design replacement parts and field-expedient tools.

### FreeCAD → `FreeCAD/FreeCAD`
See [15-3d-printing.md](15-3d-printing.md#freecad--freecadfreecad) — full parametric 3D modeler for designing mechanical parts, shelters, and equipment.

### MCAD Library → `openscad/MCAD`
OpenSCAD parametric CAD library — reusable mechanical components (gears, bearings, screws, nuts, motors).
- **Install**: Clone into OpenSCAD libraries folder
- **Features**: Parametric nuts/bolts, gears, bearings, motors, involute gear profiles, regular shapes
- **Docs**: https://github.com/openscad/MCAD#readme
- **Use case**: Generate replacement mechanical parts from measurements — print or machine on demand

## Contact Protocols & Zero-Trust Encounters

### Meshtastic → `meshtastic/firmware`
Open-source LoRa mesh radio firmware — long-range off-grid communication without internet or cellular.
- **Install**: Flash firmware to supported LoRa hardware (ESP32/nRF52 based)
- **Features**: Encrypted text messaging, GPS position sharing, multi-hop mesh networking, 10+ km range, days of battery life
- **Docs**: https://meshtastic.org/docs/introduction/
- **Use case**: Establish first-contact communication with unknown groups at distance — encrypted, no infrastructure needed

### Briar → `briar/briar`
Decentralized encrypted messenger that works without internet — syncs via Bluetooth, Wi-Fi, or Tor.
- **Install**: F-Droid (Android), or build from source; desktop app for Windows/macOS/Linux
- **Features**: End-to-end encryption, no central servers, Bluetooth/Wi-Fi sync, Tor network support, private groups, forums
- **Docs**: https://briarproject.org/
- **Use case**: Communicate with trusted contacts when all infrastructure is down — Bluetooth range contact, no metadata trail

### libsignal → `signalapp/libsignal`
Signal Protocol implementation — the cryptographic foundation for end-to-end encrypted messaging.
- **Install**: Build from source (Rust core with Java/Swift/TypeScript bindings)
- **Features**: Double Ratchet algorithm, pre-key bundles, sealed sender, zero-knowledge groups, forward secrecy
- **Docs**: https://github.com/signalapp/libsignal#readme
- **Use case**: Build or integrate E2E encryption into any communication system — the gold standard for secure messaging protocols

## Survival Radio & Distress Signaling

### GNU Radio → `gnuradio/gnuradio`
See [11-communications.md](11-communications.md#gnu-radio--gnuradiognuradio) — free software radio ecosystem for building any radio system in software.

### gqrx → `gqrx-sdr/gqrx`
See [11-communications.md](11-communications.md#gqrx--gqrx-sdrgqrx) — SDR receiver for monitoring frequencies, scanning for signals, and spectrum analysis.

### Dire Wolf → `wb2osz/direwolf`
See [11-communications.md](11-communications.md#dire-wolf--wb2oszdirewolf) — software AX.25 packet modem/TNC and APRS encoder/decoder for emergency digital radio.

### KrakenSDR DoA → `krakenrf/krakensdr_doa`
Direction of arrival (DoA) estimation for radio signals using coherent RTL-SDR receivers.
- **Install**: Raspberry Pi image or build from source (Python)
- **Features**: MUSIC algorithm direction finding, real-time bearing display, multi-receiver coherent processing, web UI
- **Docs**: https://github.com/krakenrf/krakensdr_docs/wiki
- **Use case**: Locate the source of radio transmissions — find distress beacons, track unauthorized transmitters, radio fox hunting

## Shelter & Structural

### OpenSees → `OpenSees/OpenSees`
See [19-simulation.md](19-simulation.md#opensees--openseesopensees) — earthquake engineering simulation framework for structural analysis of shelters and buildings.

### CalculiX → `Dhondtguido/CalculiX`
See [Welding & Metalwork](#calculix--dhondtguidocalculix) above — finite element analysis for thermal and structural simulation of shelter designs.

### FreeCAD → `FreeCAD/FreeCAD`
See [15-3d-printing.md](15-3d-printing.md#freecad--freecadfreecad) — design shelter structures, framing, and connections with full parametric modeling and FEM workbench.

## Disaster Preparedness

### Ushahidi → `ushahidi/platform`
Crisis mapping and crowdsourced data collection platform — deployed in 160+ countries for disaster response.
- **Install**: Docker or manual deployment (Laravel/PHP)
- **Features**: Crowdsourced incident reporting, SMS/email/web data collection, geospatial mapping, workflow management, data visualization
- **Docs**: https://docs.ushahidi.com/
- **Use case**: Map disaster zones, track resource needs, coordinate relief — collect reports via SMS when internet is down

### Sahana Eden → `sahana/eden`
Open-source humanitarian platform for disaster management, emergency response, and resource coordination.
- **Install**: Python/web2py stack, deployment scripts in `sahana/eden_deploy`
- **Features**: Shelter registry, inventory management, volunteer coordination, missing persons tracking, supply chain, GIS mapping
- **Docs**: https://eden-asp.readthedocs.io/
- **Use case**: Run a complete disaster response operation — track people, supplies, shelters, and requests from a single platform

## Weather

### weewx → `weewx/weewx`
Open-source weather station software.
- **Install**: `pip install weewx`
- **Features**: Reads weather sensors, logs data, generates reports and graphs
- **Supported hardware**: Davis, AcuRite, Fine Offset, Oregon Scientific, and many more
- **Docs**: https://weewx.com/docs/
- **Use cases**: Agricultural planning, storm warning, climate tracking

## Textiles & Clothing

### Seamly2D → `FashionFreedom/Seamly2D`
Parametric garment pattern design from body measurements.
- **Build**: `qmake && make`
- **Usage**: Enter measurements → Design pattern → Export for cutting
- **Docs**: https://seamly.io/
- **Use case**: Design and produce clothing without commercial patterns. Input body measurements, output sewing patterns.

## Navigation

### Organic Maps → `organicmaps/organicmaps`
Offline maps using OpenStreetMap data.
- **Build**: Complex (Android/iOS app) — pre-build before collapse
- **Usage**: Download region maps → navigate offline with GPS
- **Docs**: https://organicmaps.app/
- **Tip**: Download ALL regional maps while internet exists

### GeoSentinel
Geospatial monitoring platform tracking global movement in real time.
- **Features**: Ship and flight route aggregation, live coordinates, geodata visualization
- **Use case**: Geographic and geopolitical situational awareness, movement analysis

### GNSS-SDR → `gnss-sdr/gnss-sdr`
See [11-communications.md](11-communications.md#gnss-sdr--gnss-sdrgnss-sdr) — software GPS receiver

### QGIS → `qgis/QGIS`
See [Militia Tactics & Strategy](#qgis--qgisqgis) above — GIS terrain analysis, route planning, and offline mapping.

## Economy

### Bitcoin → `bitcoin/bitcoin`
Decentralized digital currency. Peer-to-peer transactions without banks or central authority.
- **Build**: `./autogen.sh && ./configure && make -j$(nproc)`
- **Usage**: `bitcoind` (daemon) / `bitcoin-cli` (commands) / `bitcoin-qt` (GUI)
- **Docs**: https://developer.bitcoin.org/
- **Use case**: Economic infrastructure when traditional financial systems are unavailable. Store of value and medium of exchange for inter-community trade.

## Vehicle Repair

### OpenDBC → `commaai/opendbc`
Open database of vehicle CAN bus definitions.
- **Contains**: DBC files for thousands of vehicle makes/models
- **Usage**: Reference database for reading vehicle diagnostic data
- **Docs**: https://github.com/commaai/opendbc/blob/master/README.md
- **Use case**: When dealerships don't exist, diagnose and repair vehicles by reading CAN bus data with a $10 adapter

## Home Automation

### Home Assistant → `home-assistant/core`
Automate your infrastructure: lighting, heating, solar, irrigation, security, environmental monitoring.
- **Install**: `pip install homeassistant`
- **Usage**: Web UI at `http://localhost:8123`
- **Docs**: https://www.home-assistant.io/docs/
- **Integrations**: Works with Zigbee, Z-Wave, MQTT, GPIO sensors
- **Use cases**: Automate irrigation, integrate with Frigate for security, monitor environmental sensors, medication reminders

## Offline Knowledge for Survival

Use Kiwix (see [17-knowledge.md](17-knowledge.md)) to download:
- Medical first aid articles from Wikipedia
- Agriculture and farming articles
- Water purification and sanitation guides
- Construction and building techniques
- US Army Field Manuals (available as PDFs online)
