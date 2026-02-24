# GitGael Content Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand GitGael from ~390 to ~500+ repos by rewriting Sections 12 & 13 and adding Sections 15, 17, 18.

**Architecture:** Content-first — write markdown docs with real, verified open-source repos in GitGael format (`### Name → \`fork-name\``). The Electron app auto-seeds from `docs/*.md`, so new sections appear automatically. Only Home.tsx needs code changes for new section icons.

**Tech Stack:** Markdown docs, web research for repo verification, React/TypeScript for minor app updates.

---

### Task 1: Rewrite Section 12 — Offline Knowledge (15 → 40+ repos)

**Files:**
- Modify: `docs/12-knowledge.md` (complete rewrite, preserve existing repos)

**Step 1: Research repos**
Web search for real, active open-source projects in these categories:
- Digital Preservation: ArchiveBox, Heritrix, LOCKSS, ReproZip, Webrecorder
- Offline Education: Kolibri, OpenStax, Anki, Moodle
- Documentation & Publishing: Docusaurus, MkDocs, Sphinx, TeX Live, Typst, BookStack, Wiki.js
- Data Archival: git-annex, DVC, IPFS (kubo), Perkeep
- Offline Dev Infrastructure: Gitea/Forgejo, Verdaccio, devpi, apt-mirror/aptly, createrepo

Verify each repo exists on GitHub. Note exact org/repo paths.

**Step 2: Write the expanded doc**
Rewrite `12-knowledge.md` in GitGael format. Keep all existing repos (Kiwix, Internet-in-a-Box, DevDocs, Calibre, Pandoc, Marktext, etc.). Add new subsections with full entries including build/install/usage/docs fields. Add cross-references to other sections where relevant. Update the Pre-Collapse Archival Checklist.

**Step 3: Verify format**
Read back the file. Confirm every entry follows `### Name → \`org/repo\`` format. Confirm no broken cross-references.

---

### Task 2: Rewrite Section 13 — Survival, Agriculture & Field Craft (11 → 30+ repos)

**Files:**
- Modify: `docs/13-survival.md` (complete rewrite, preserve existing repos)

**Step 1: Research repos**
Web search for real, active open-source projects in these categories:
- Hunting & Trapping: ballistics calculators, wildlife camera trap software, game management
- Foraging & Botany: PlantNet (plant ID), iNaturalist, mushroom identification, wild edible databases
- Physical Defence & Perimeter Security: Frigate (NVR), ZoneMinder, motion detection, ATAK/CivTAK
- Scavenging & Salvage: parts inventory, electronics component ID, repair tools
- Welding & Metalwork: CNC plasma/laser control, welding parameter databases, metallurgy references
- Militia Tactics & Strategy: ATAK/CivTAK (Android tactical awareness), terrain analysis (QGIS), logistics, wargaming/strategy simulation
- Makeshift Equipment: OpenSCAD/FreeCAD parametric designs, 3D-printable tool libraries, field-expedient engineering
- Contact Protocols & Zero-Trust: Meshtastic, Briar (offline messaging), dead-drop tools, barter/trade tracking
- Survival Radio & Distress: GNU Radio, gqrx, Dire Wolf (AX.25/APRS), SDR scanning, emergency beacon protocols
- Shelter & Structural: structural analysis (OpenSees cross-ref), thermal simulation, parametric shelter design
- Disaster Preparedness: Ushahidi (crisis mapping), emergency communication, resource management
Keep existing: farmOS, plant-it, Tandoor Recipes, CraftBeerPi, weewx, Seamly2D, Organic Maps, GNSS-SDR, OpenDBC, Home Assistant

**Step 2: Write the expanded doc**
Rewrite `13-survival.md` with new title "Survival, Agriculture & Field Craft". Full GitGael format entries. Cross-reference SDR/radio to 09-communications.md, 3D printing to 06, CNC to 07, structural to 11.

**Step 3: Verify format**

---

### Task 3: Create Section 15 — Medical & Health (~35 repos)

**Files:**
- Create: `docs/15-medical.md`

**Step 1: Research repos**
Web search for real, active open-source projects:
- Electronic Health Records: OpenMRS, OpenEMR, Bahmni, GNUHealth, HospitalRun, LibreHealth EHR
- Medical Imaging: OHIF Viewer (DICOM), 3D Slicer, Orthanc (PACS server), InVesalius, ITK, VTK
- Laboratory & Pharmacy: OpenELIS, OpenBoxes (medical supply chain), drug reference tools
- Field Medicine & Reference: WHO essential medicines, first aid training, Hesperian digital health guides, offline medical references
- Medical Devices: open-source ventilators, pulse oximetry, OpenBCI (EEG/ECG), e-NABLE prosthetics
- Telemedicine & Public Health: OpenIMIS, DHIS2, disease surveillance
- Veterinary: open-source vet records (animals matter in survival)

Verify each repo exists. Note exact org/repo paths.

**Step 2: Write the doc**
Create `15-medical.md` with H1 header `# 15 — Medical & Health`, description, subsections with H2, entries with H3 in GitGael format. Cross-reference AI/ML section for medical imaging ML. Cross-reference 3D printing for prosthetics.

**Step 3: Verify format**

---

### Task 4: Create Section 17 — Water & Sanitation (~18 repos)

**Files:**
- Create: `docs/17-water-sanitation.md`

**Step 1: Research repos**
Web search for real, active open-source projects:
- Water Quality Monitoring: sensor platforms, IoT water testing, data loggers
- Purification Systems: UV/filter controller firmware, water treatment calculators
- Hydroponics & Aquaponics: controller software, nutrient management, automation
- Waste Management: composting systems, biogas monitoring, sanitation tracking
- Rainwater Harvesting: collection calculators, storage management
- Environmental Monitoring: air quality, soil sensors, weather integration

**Step 2: Write the doc**
Create `17-water-sanitation.md` in GitGael format. Cross-reference Home Assistant (13), energy monitoring (08), sensors.

**Step 3: Verify format**

---

### Task 5: Create Section 18 — Security & Governance (~18 repos)

**Files:**
- Create: `docs/18-security-governance.md`

**Step 1: Research repos**
Web search for real, active open-source projects:
- Network Security: pfSense/OPNsense, Suricata, Snort, CrowdSec, fail2ban
- Encryption & Privacy: age, WireGuard, VeraCrypt, Tails, OnionShare
- Identity & Access: Keycloak, Authentik, Authelia
- Voting & Consensus: Helios Voting, Decidim, CONSUL
- Resource Management: ERPNext (full ERP), Inventree (inventory)
- Project Coordination: Leantime, Focalboard, Taiga, Vikunja
- Legal & Documentation: contract templates, governance frameworks

**Step 2: Write the doc**
Create `18-security-governance.md` in GitGael format. Cross-reference encryption tools in 03-core-userland.md and 09-communications.md.

**Step 3: Verify format**

---

### Task 6: Update README.md

**Files:**
- Modify: `README.md`

**Step 1: Update Table of Contents**
Add rows for Sections 15, 17, 18. Update Section 13 description to "Survival, agriculture, field craft, defense, radio, welding".

**Step 2: Update fork count**
Change "350+ private forks" and "Total forks: 390+" to reflect new count (~500+).

**Step 3: Update date**
Set last updated to 2026-02-24.

---

### Task 7: Update Electron App — Home.tsx Icons

**Files:**
- Modify: `app/packages/frontend/src/components/Home.tsx`

**Step 1: Add section icons**
Add entries to SECTION_ICONS for:
- 15: medical cross or stethoscope emoji
- 17: water/droplet emoji
- 18: shield/lock emoji

---

### Task 8: Verify — Launch Electron App

**Step 1: Delete old database**
Remove the existing SQLite DB file so it re-seeds from updated docs.

**Step 2: Start Vite dev server**
Run: `cd C:/tmp/GitGael/app/packages/frontend && npx vite`

**Step 3: Start Electron**
Run: `cd C:/tmp/GitGael/app/packages/electron && npx electron src/main.mjs`

**Step 4: Verify all sections appear**
- Home page shows all 18 sections with correct icons and repo counts
- Each section navigable, Guide tab renders markdown
- Search finds repos from new sections
- No console errors

---

## Parallelization

Tasks 1-5 are fully independent (separate files, separate research). They can run as parallel subagents.

Task 6 depends on Tasks 1-5 (needs final repo counts).

Task 7 is independent of content but small enough to batch with Task 6.

Task 8 depends on all others.

```
[Task 1] ─┐
[Task 2] ─┤
[Task 3] ─┼─→ [Task 6+7] → [Task 8]
[Task 4] ─┤
[Task 5] ─┘
```
