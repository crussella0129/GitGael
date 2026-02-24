# GitGael Content & Section Expansion — Design

**Date:** 2026-02-24

## Goal

Massively expand survival, medical, and knowledge preservation content. Add three new sections. Bring fork count from ~390 to ~500+.

## Changes

### Section 12: Offline Knowledge (rewrite — 15 → 40+ repos)

New subsections:
- **Digital Preservation**: ArchiveBox, Heritrix, LOCKSS, ReproZip
- **Offline Education**: Kolibri, OpenStax, Anki, Moodle
- **Documentation & Publishing**: Docusaurus, MkDocs, Sphinx, LaTeX/Typst, BookStack, Wiki.js
- **Data Archival**: git-annex, DVC, IPFS, Perkeep
- **Offline Dev Infrastructure**: Gitea/Forgejo, Verdaccio, devpi, apt-mirror, createrepo
- Keep existing: Kiwix, Internet-in-a-Box, Calibre, DevDocs, Pandoc, etc.

### Section 13: Survival, Agriculture & Field Craft (rewrite — 11 → 30+ repos)

New subsections:
- **Hunting & Trapping**: ballistics calculators, wildlife camera traps, game processing
- **Foraging & Botany**: PlantNet, iNaturalist, mushroom ID, wild edibles, medicinal plants
- **Physical Defence & Perimeter**: Frigate, ZoneMinder, motion detection, fortification
- **Scavenging & Salvage**: component ID, repair tools, e-waste recovery, RF scanning, asset tracking
- **Welding & Metalwork**: CNC/CAM, welding parameter references, metallurgy, open welding controllers
- **Militia Tactics & Strategy**: ATAK/CivTAK tactical mapping, terrain analysis, coordination, strategy simulation, logistics
- **Makeshift Equipment**: parametric field tools, 3D-printable parts, improvised engineering
- **Contact Protocols & Zero-Trust**: Meshtastic mesh coordination, dead-drop comms, identity verification, barter tracking
- **Survival Radio & Distress**: GNU Radio, gqrx, emergency beacons, Dire Wolf AX.25/APRS, ham emergency nets, direction-finding
- Keep/expand existing: farmOS, plant-it, Organic Maps, weewx, CraftBeerPi, Seamly2D, OpenDBC, Home Assistant
- **Shelter & Structural**: structural calculators, thermal analysis, parametric shelter design
- **Disaster Preparedness**: emergency comms, resource rationing, offline references

### Section 15: Medical & Health (NEW — ~35 repos)

- **Electronic Health Records**: OpenMRS, OpenEMR, Bahmni, GNUHealth, HospitalRun, LibreHealth
- **Medical Imaging**: OHIF Viewer, 3D Slicer, Orthanc PACS, InVesalius, ITK/VTK
- **Laboratory & Pharmacy**: OpenELIS, OpenBoxes, drug data tools
- **Field Medicine & Reference**: anatomy/pharmacology textbooks, WHO essential medicines, first aid, Hesperian guides
- **Medical Devices**: OpenVentilator, Medtronic PB560, pulse oximetry, OpenBCI ECG, prosthetics (e-NABLE)
- **Telemedicine & Public Health**: OpenIMIS, DHIS2

### Section 17: Water & Sanitation (NEW — ~18 repos)

- Water quality monitoring sensors/IoT
- Purification system controllers
- Hydroponics controllers
- Waste management systems
- Rainwater harvesting calculators
- Environmental monitoring

### Section 18: Security & Governance (NEW — ~18 repos)

- **Network Security**: pfSense, Suricata, Snort, CrowdSec
- **Encryption**: age, WireGuard, VeraCrypt
- **Identity & Access**: Keycloak, Authentik
- **Voting & Consensus**: Helios, Decidim
- **Resource Management**: ERPNext
- **Project Coordination**: Leantime, Focalboard

### README.md

- Add Sections 15, 17, 18 to TOC
- Update fork count to ~500+
- Update naming collisions / mirrors if needed

### Electron App

- Home.tsx: add section grid entries for 15, 17, 18 with icons
- main.mjs auto-seeds from docs/*.md — no schema changes needed
- Verify all new docs parse correctly

## Research Approach

- Web search for real, actively maintained open-source projects
- Verify each repo exists (GitHub preferred, note GitLab/other)
- Write in standard GitGael format: `### Name → \`fork-name\``
- Include build/usage/docs/note fields where applicable
- Cross-reference between sections

## Out of Scope

- Tauri backend changes
- GitHub OAuth implementation
- Actually forking the new repos on GitHub
- Database schema changes
