# 07 — Medical & Health

Hospital-grade health records, medical imaging, diagnostics, field medicine, open-source medical devices, and public health infrastructure — everything needed to provide medical care without commercial systems.

## Electronic Health Records

### OpenMRS → `openmrs/openmrs-core`
The world's largest open-source medical record system, deployed in 6,500+ facilities across 40+ countries serving 14.6 million patients.
- **Install**: Docker Compose recommended; also runs standalone on any Java-capable system with MySQL
- **Features**: Modular architecture with 90+ feature modules, patient registration, clinical encounters, observations, orders, visit tracking, role-based access, REST API, extensible via community modules
- **Docs**: https://openmrs.org/

### OpenEMR → `openemr/openemr`
ONC-certified electronic health records and medical practice management, the most popular open-source EHR worldwide.
- **Install**: Docker, or LAMP stack (PHP/MySQL/Apache)
- **Features**: Patient demographics, scheduling, e-prescribing, electronic billing, clinical decision rules, lab integration, patient portal, FHIR API, multilingual
- **Docs**: https://www.open-emr.org/wiki/

### Bahmni → `Bahmni/bahmni-docker`
Integrated hospital system combining OpenMRS (EMR) + OpenELIS (lab) + Odoo (operations) into one platform, used in 500+ sites across 50+ countries.
- **Install**: `docker compose up` via bahmni-docker; choose Lite (clinics) or Standard (full hospital)
- **Features**: Clinical EMR, lab management, radiology, pharmacy, billing, patient registration, bed management, operation theater scheduling
- **Docs**: https://bahmni.atlassian.net/wiki/

### GNU Health → `gnuhealth` (Codeberg)
UN-recognized Digital Public Good for public health and hospital management, built on the Tryton framework.
- **Install**: Python/pip install or Ansible automated deployment; requires PostgreSQL
- **Features**: Hospital information system, EMR, lab information system, epidemiology, genetics/genomics, personal health record (MyGNUHealth), health federation via Thalamus
- **Docs**: https://docs.gnuhealth.org/
- **Source**: https://codeberg.org/gnuhealth

### HospitalRun → `HospitalRun/hospitalrun`
Offline-first hospital information system built for developing world requirements using React and PouchDB/CouchDB.
- **Install**: Clone monorepo and follow setup instructions; Docker available
- **Features**: Patient records, scheduling, inventory, imaging, incident management, offline-capable with sync when connectivity returns
- **Docs**: https://hospitalrun.io/

### LibreHealth EHR → `LibreHealthIO/lh-ehr`
Free open-source electronic health records forked from OpenEMR, part of the Software Freedom Conservancy.
- **Install**: Docker (PHP 7.2 + MariaDB) or manual LAMP stack
- **Features**: Patient records, prescriptions, billing, scheduling, clinical workflows, CDA document support
- **Docs**: https://librehealth.io/projects/lh-ehr/

## Medical Imaging

### OHIF Viewer → `OHIF/Viewers`
Zero-footprint DICOM web viewer for medical imaging, with progressive web app support and extensible plugin architecture.
- **Install**: `yarn install && yarn start` or deploy as static web app; Docker available
- **Features**: 2D/3D/MPR rendering, DICOM SR, segmentation, RT struct, whole slide microscopy, measurement tracking, PDF viewing, DICOMweb integration
- **Docs**: https://docs.ohif.org/

### 3D Slicer → `Slicer/Slicer`
NIH-funded medical image computing platform with 300+ modules for visualization, segmentation, registration, and analysis.
- **Install**: Download binaries from https://download.slicer.org/ for Windows/Mac/Linux; build from source with CMake
- **Features**: DICOM import, volume rendering, surface models, segmentation editor, registration, 3D printing export, Python scripting, extension manager, VR/AR support
- **Docs**: https://slicer.readthedocs.io/

### Orthanc → `jodogne/OrthancMirror`
Lightweight DICOM server that turns any computer into a medical image archive (mini-PACS) with no database administration required.
- **Install**: Download binaries or `docker pull orthancteam/orthanc`; standalone single-file config
- **Features**: DICOM store/query/retrieve, DICOMweb, REST API, web viewer, plugin system, JPEG/PNG export, anonymization, Lua scripting
- **Docs**: https://www.orthanc-server.com/

### dcm4chee Archive → `dcm4che/dcm4chee-arc-light`
Enterprise-grade DICOM archive and PACS server, IHE-compliant, built on Java EE and the dcm4che library.
- **Install**: Docker Compose (with PostgreSQL) or deploy on WildFly application server
- **Features**: DICOM storage, query/retrieve, DICOMweb (STOW/QIDO/WADO), HL7v2, LDAP configuration, audit logging, compression, vendor-neutral archive
- **Docs**: https://github.com/dcm4che/dcm4chee-arc-light/wiki

### InVesalius → `invesalius/invesalius3`
3D medical image reconstruction from CT/MRI DICOM sequences, developed by the Brazilian Ministry of Health.
- **Install**: Download binaries or run from Python source
- **Features**: 2D DICOM import, 3D surface reconstruction, volume rendering, STL export for 3D printing, measurement tools, neuronavigation support
- **Docs**: https://invesalius.github.io/

### ITK → `InsightSoftwareConsortium/ITK`
Insight Toolkit for N-dimensional scientific image processing, segmentation, and registration — the foundation library behind most medical imaging software.
- **Install**: `pip install itk` (Python) or build from source with CMake (C++)
- **Features**: Image filtering, segmentation algorithms, registration framework, I/O for DICOM/NIfTI/MetaImage, Python wrapping, GPU acceleration, remote module system
- **Docs**: https://itk.org/

### VTK → `Kitware/VTK`
Visualization Toolkit for 3D computer graphics, image processing, and scientific visualization — used by 3D Slicer, ParaView, and many medical tools.
- **Install**: `pip install vtk` (Python) or build from source with CMake (C++)
- **Features**: Volume rendering, surface reconstruction, contouring, mesh processing, 2D/3D widgets, GPU ray casting, VTK.js for web
- **Docs**: https://vtk.org/

### QuPath → `qupath/qupath`
Open-source digital pathology and whole slide image analysis platform for research and diagnostics.
- **Install**: Download from https://qupath.github.io/ for Windows/Mac/Linux
- **Features**: Whole slide image viewer, cell detection/counting, tissue microarray analysis, pixel/object classification with machine learning, batch processing, scripting with Groovy
- **Docs**: https://qupath.readthedocs.io/

## Dental

### OpenMolar → `rowinggolfer/openmolar2`
Open-source dental practice management software developed by a practicing dentist, designed for clinics and dental schools.
- **Install**: Python application with PyQt; requires MySQL/MariaDB
- **Features**: Patient records, charting, treatment planning, appointment scheduling, billing, clinical notes, reporting
- **Docs**: https://openmolar.com/

## Laboratory & Pharmacy

### OpenELIS Global → `DIGI-UW/OpenELIS-Global-2`
Open enterprise laboratory information system for public health labs, deployed at national scale in multiple countries.
- **Install**: Docker Compose with provided setup scripts; supports multi-platform images
- **Features**: Sample tracking, test ordering/results, quality control, barcode support, HL7/FHIR interoperability, analyzer integration, multi-site consolidation
- **Docs**: https://docs.openelisci.org/

### OpenBoxes → `openboxes/openboxes`
Supply chain management system for healthcare facilities, tracking pharmaceuticals and medical supplies from warehouse to patient.
- **Install**: Docker or Grails application with MySQL
- **Features**: Inventory management, stock tracking across facilities, expiration date monitoring, demand forecasting, receiving/shipping, barcode scanning, requisitions
- **Docs**: https://github.com/openboxes/openboxes/wiki

## Field Medicine & Medical Devices

### Glia Stethoscope → `GliaX/Stethoscope`
Research-validated, 3D-printable stethoscope that performs comparably to the Littmann Cardiology III at a cost of $2.50-$5.
- **Install**: 3D print STL files; assemble with silicone tubing and ear tips
- **Features**: Clinically validated acoustic performance, parametric design for customization, published validation data in PLOS ONE
- **Docs**: https://github.com/GliaX/Stethoscope

### Glia Otoscope → `GliaX/Otoscope`
Open-source, 3D-printable ear inspection device using disposable specula, targeting $3-$5 per unit production cost.
- **Install**: 3D print STL files; uses standard LED and disposable specula
- **Features**: Ear canal examination, low-cost disposable tips, parametric CAD files for modification
- **Docs**: https://github.com/GliaX/Otoscope

### Glia Pulse Oximeter → `GliaX/oximeter`
Open-source DIY pulse oximeter using Arduino for SpO2 and heart rate monitoring.
- **Install**: Arduino firmware upload; assemble with MAX30100/MAX30102 sensor and 3D-printed enclosure
- **Features**: Blood oxygen saturation measurement, heart rate monitoring, open hardware design
- **Docs**: https://github.com/GliaX/oximeter

### OpenBCI → `OpenBCI/OpenBCI_GUI`
Open-source biosensing platform for recording brain (EEG), muscle (EMG), and heart (ECG) activity with affordable hardware.
- **Install**: Download standalone app or build from Processing 4 IDE
- **Features**: Real-time EEG/EMG/ECG visualization, FFT analysis, configurable channel layouts, data recording/export, widget-based interface
- **Docs**: https://docs.openbci.com/

See also: `OpenBCI/Ultracortex` — 3D-printable research-grade EEG headset with STL files for Mark IV design

### OpenBionics Prosthetic Hands → `OpenBionics/Prosthetic-Hands`
Affordable (<$200), lightweight (<300g) anthropomorphic prosthetic hands using 3D printing and a novel selectively-lockable differential mechanism.
- **Install**: 3D print parts from STL files; assemble with off-the-shelf components (single motor, tendons, silicone)
- **Features**: 144 distinct hand postures from one motor, bio-inspired tendon-driven flexion, whiffletree differential mechanism, parametric design
- **Docs**: https://openbionics.org/affordableprosthetichands/

See [15-3d-printing.md](15-3d-printing.md) for 3D printing tools needed to fabricate prosthetics and medical device enclosures.

### OpenVentilator → `popsolutions/openventilator`
Open-source BVM-based mechanical ventilator designed during COVID-19 for resource-constrained regions in Africa, South America, and the Middle East.
- **Install**: Build from hardware plans; Arduino-based controller firmware
- **Features**: Adjustable PEEP, maximum pressure threshold, configurable inspiratory/expiratory timing, wide BPM and I:E ratio range, locally sourceable materials
- **Docs**: https://github.com/popsolutions/openventilator

### Poseidon Syringe Pump → `pachterlab/poseidon`
Open-source syringe pump and microscope system for laboratories, costing under $400 and assembled in about an hour.
- **Install**: 3D print parts; assemble with Raspberry Pi, Arduino, CNC shield, and stepper motors; `pip install pyqt5` for GUI
- **Features**: Up to 3 pumps per controller, touchscreen GUI, sub-microliter precision, microscope integration, Python control API
- **Docs**: https://pachterlab.github.io/poseidon/

### OpenHardwareExG → `OpenElectronicsLab/OpenHardwareExG`
Open-source electrophysiology platform for ECG, EEG, EMG, ENG, and EOG applications using Arduino Due and ADS1299 analog front end.
- **Install**: Build from KiCad schematics and Arduino firmware; hand-solderable PCB design with readily available components
- **Features**: 5kV reinforced isolation for patient safety, 8-channel ADS1299 AFE, standard disposable electrode compatibility, USB data output
- **Docs**: http://openelectronicslab.github.io/OpenHardwareExG/

## Healthcare Interoperability

### HAPI FHIR → `hapifhir/hapi-fhir`
Complete open-source implementation of the HL7 FHIR standard for healthcare data interoperability, enabling systems to exchange patient data.
- **Install**: Maven dependency for Java projects, or deploy HAPI FHIR JPA Server as standalone FHIR endpoint
- **Features**: FHIR DSTU2 through R5 support, RESTful client and server, JPA persistence, terminology services, validation, subscriptions, bulk data export
- **Docs**: https://hapifhir.io/

## Telemedicine & Public Health

### DHIS2 → `dhis2/dhis2-core`
The world's largest health management information system platform, used as national-scale HMIS in 70+ countries covering 40% of the world's population. WHO Collaborating Centre.
- **Install**: Docker (`docker compose up`) or deploy WAR file on Tomcat with PostgreSQL
- **Features**: Aggregate and individual data collection, dashboards, pivot tables, GIS mapping, data validation, Android offline app, tracker for case-based surveillance, immunization registries, FHIR support
- **Docs**: https://docs.dhis2.org/

### OpenIMIS → `openimis`
Health insurance and social protection management platform impacting 36+ million beneficiaries across 14 countries.
- **Install**: Docker Compose; modular microservices architecture
- **Features**: Beneficiary enrollment, contribution management, claims processing, provider contracts, policy administration, payment tracking, reporting
- **Docs**: https://openimis.org/

### SORMAS → `SORMAS-Foundation/SORMAS-Project`
Surveillance, Outbreak Response Management and Analysis System — developed after the 2014 Ebola epidemic for infectious disease tracking.
- **Install**: Docker via SORMAS-Docker images or server deployment; Android app for field data collection
- **Features**: Case management, contact tracing, event tracking, sample management, task scheduling, real-time statistics, offline-capable mobile app, configurable disease profiles
- **Docs**: https://sormas-foundation.github.io/SORMAS-Project/

### Community Health Toolkit → `medic/cht-core`
Offline-first digital health platform for community health workers, deployed in 15 countries supporting 40,000+ health workers.
- **Install**: Docker deployment; `cht-conf` CLI for app configuration
- **Features**: SMS and smartphone workflows, task management, decision support, patient longitudinal records, reporting hierarchies, offline sync, configurable care protocols
- **Docs**: https://docs.communityhealthtoolkit.org/

### Intelehealth → `opensource-emr/Telemedicine`
Open-source telemedicine platform connecting patients with doctors via video call, designed for remote and underserved areas.
- **Install**: Angular frontend + .NET Core backend + PostgreSQL; Docker available
- **Features**: Video consultations, chat messaging, document sharing during calls, appointment scheduling, patient records
- **Docs**: https://github.com/opensource-emr/Telemedicine

## Veterinary

### OpenVPMS → `CharltonIT/openvpms`
Open-source veterinary practice management system providing comprehensive clinic operations management.
- **Install**: Download from https://www.openvpms.org/download; Java web application
- **Features**: Patient/client management, appointment scheduling, billing/invoicing, inventory management, prescription tracking, lab results, reporting, investigation management
- **Docs**: https://openvpms.org/

### Ababu → `oldauntie/ababu`
Problem-oriented, multi-platform veterinary clinical software for managing animal patient records.
- **Install**: PHP + MariaDB stack; runs on Windows, Mac, Linux, tablets, and mobile
- **Features**: Problem-oriented medical records, patient history, treatment tracking, multi-lingual support, lightweight web interface
- **Docs**: https://github.com/oldauntie/ababu

---

## Cross-References

- See [15-3d-printing.md](15-3d-printing.md) — 3D printing tools for fabricating prosthetic hands (e-NABLE, OpenBionics), medical device enclosures, and stethoscope/otoscope components
- See [18-ai-ml.md](18-ai-ml.md) — Machine learning frameworks (PyTorch, TensorFlow) for medical image classification, pathology detection, and diagnostic AI models
- See [11-communications.md](11-communications.md) — Radio and mesh networking for coordinating field medical teams and telemedicine in austere environments
- See [09-survival.md](09-survival.md) — Agriculture and food safety tools that complement public health infrastructure

## Survival Notes

In a collapse scenario, prioritize deployment in this order:

1. **Immediate**: OpenEMR or OpenMRS for patient records (runs on a single laptop), Glia stethoscope/otoscope (3D print immediately), WHO essential medicines list reference
2. **Field hospital**: Bahmni for integrated hospital operations, OpenBoxes for supply chain tracking, Orthanc + OHIF for any salvaged imaging equipment
3. **Public health**: DHIS2 for disease surveillance and outbreak tracking, SORMAS for epidemic response, CHT for community health worker coordination
4. **Long-term**: 3D Slicer + InVesalius for advanced imaging analysis, OpenBionics prosthetics for rehabilitation, OpenBCI for neurological assessment, OpenVPMS for livestock health
