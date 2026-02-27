# 21 — Drones & UAVs

Everything needed to design, build, program, fly, and operate composable drones in any format — multirotor, fixed-wing, VTOL, FPV racing, cargo/delivery, agricultural, and swarm configurations. From RTOS kernel through flight control, communication, autonomy, mapping, and regulatory compliance.

## Build Order

```
RTOS (NuttX/ChibiOS) → Flight Controller Firmware (ArduPilot/PX4/Betaflight)
→ ESC Firmware (AM32/Bluejay/BLHeli_S) → Hardware (Pixhawk/custom PCB)
→ RC Link (ExpressLRS/EdgeTX) → FPV Video (OpenHD/WFB-NG)
→ Ground Control (QGroundControl/MissionPlanner)
→ MAVLink Protocol → SDK (MAVSDK/DroneKit)
→ Simulation (Gazebo/AirSim/JSBSim) → Autonomy (SLAM/Planning/Avoidance)
→ Mapping (OpenDroneMap) → Swarm → Compliance (Remote ID/UTM)
```

## Quick Reference: Stack by Drone Type

| Type | Flight Controller | RC Link | Video | GCS | Extras |
|------|------------------|---------|-------|-----|--------|
| **Multirotor (autonomous)** | ArduPilot/PX4 | ExpressLRS | OpenHD | QGroundControl | MAVSDK, SLAM |
| **Multirotor (FPV)** | Betaflight | ExpressLRS | OpenHD/WFB-NG | Betaflight Configurator | PID Analyzer |
| **Fixed-wing** | ArduPilot (ArduPlane)/PX4 | ExpressLRS | OpenHD | MissionPlanner | JSBSim sim |
| **VTOL** | ArduPilot/PX4/dRehmFlight | ExpressLRS | OpenHD | QGroundControl | — |
| **FPV Racing** | Betaflight | ExpressLRS | OpenHD | Betaflight Configurator | Blackbox logs |
| **Helicopter** | Rotorflight | ExpressLRS | — | Rotorflight Configurator | — |
| **Cargo/Delivery** | ArduPilot/PX4 | ExpressLRS | OpenHD | QGroundControl | Remote ID, UTM |
| **Agricultural** | ArduPilot/PX4 | ExpressLRS | — | MissionPlanner | OpenDroneMap, NDVI |
| **Swarm** | PX4/Crazyflie | MAVLink | — | QGroundControl | Crazyswarm2, EGO-Planner |
| **Nano/Micro** | Crazyflie/ESP-Drone | WiFi | ESP32-CAM | — | Crazyswarm2 |

---

## Flight Controller Firmware

### ArduPilot → `ardupilot` (fork of `ardupilot/ardupilot`)
The most complete open-source autopilot. Supports copters, planes, helicopters, rovers, boats, and submarines. Runs on ChibiOS RTOS. 12k+ stars.
- **Build**: `./waf configure --board=Pixhawk6X && ./waf copter` (or `plane`, `rover`, etc.)
- **Usage**: Flash to Pixhawk, configure via MissionPlanner or QGroundControl
- **Vehicles**: ArduCopter (multirotor), ArduPlane (fixed-wing), ArduSub, ArduRover
- **Docs**: https://ardupilot.org/dev/

### PX4 Autopilot → `PX4-Autopilot` (fork of `PX4/PX4-Autopilot`)
Professional-grade autopilot for multirotors, fixed-wing, VTOL, rovers. Runs on NuttX RTOS. Dronecode Foundation.
- **Build**: `make px4_fmu-v6x_default` (target depends on hardware)
- **Usage**: Flash via QGroundControl, configure parameters
- **Docs**: https://docs.px4.io/

### Betaflight → `betaflight` (fork of `betaflight/betaflight`)
Leading FPV/racing flight controller firmware. STM32 F4/F7/H7 targets. Huge community.
- **Build**: `make TARGET` (e.g., `make STM32F405`)
- **Usage**: Flash via Betaflight Configurator, tune PIDs, set rates
- **Docs**: https://betaflight.com/docs

### iNav → `inav` (fork of `iNavFlight/inav`)
Navigation-focused firmware with GPS waypoints, return-to-home, and mission planning. Cleanflight lineage.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Flash via iNav Configurator, configure GPS/compass/baro
- **Docs**: https://github.com/iNavFlight/inav/wiki

### Paparazzi UAV → `paparazzi` (fork of `paparazzi/paparazzi`)
Academic-oriented free autopilot with integrated hardware+software for fixed-wing and rotorcraft. GPLv2.
- **Build**: `make && make install`
- **Usage**: Full IDE with flight plan editor, ground control, and data link
- **Docs**: https://paparazziuav.org/

### Rotorflight → `rotorflight-firmware` (fork of `rotorflight/rotorflight-firmware`)
Flight controller firmware specifically for single-rotor RC helicopters. Based on Betaflight 4.3.
- **Build**: Similar to Betaflight build process
- **Usage**: Flash via Rotorflight Configurator

### dRehmFlight → `dRehmFlight` (fork of `nickrehm/dRehmFlight`)
Teensy 4.0/Arduino VTOL flight controller. Under $30 hardware. Educational focus.
- **Build**: Arduino IDE or PlatformIO
- **Usage**: Upload to Teensy 4.0, wire sensors/servos/ESCs
- **Great for**: Learning flight control theory, experimental VTOL designs

### Crazyflie Firmware → `crazyflie-firmware` (fork of `bitcraze/crazyflie-firmware`)
Firmware for Crazyflie nano quadcopter and Crazyflie Bolt. FreeRTOS-based, C.
- **Build**: `make` (requires ARM GCC toolchain)
- **Usage**: Flash via cfclient, control via Python cflib
- **Great for**: Swarm research, indoor navigation, education

### ESP-Drone → `esp-drone` (fork of `espressif/esp-drone`)
Mini drone firmware for ESP32 and ESP32-S series SoCs by Espressif.
- **Build**: ESP-IDF framework
- **Usage**: WiFi-controlled mini drone, Crazyflie-compatible protocol

### madflight → `madflight` (fork of `qqqlab/madflight`)
Flight controller toolbox for ESP32-S3/ESP32/RP2350/RP2040/STM32. Under $10 builds.
- **Build**: Arduino IDE or PlatformIO
- **Usage**: Configurable FC on cheap hardware

### ESP-FC → `esp-fc` (fork of `rtlopez/esp-fc`)
Betaflight-compatible firmware for ESP32. Configurable via Betaflight Configurator.
- **Build**: PlatformIO
- **Usage**: Flash to ESP32, configure via standard Betaflight Configurator

### Legacy/Research Firmware
- **EmuFlight** → `EmuFlight` (fork of `emuflight/EmuFlight`) — Betaflight fork with innovative filtering
- **dRonin** → `dRonin` (fork of `d-ronin/dRonin`) — OpenPilot/Tau Labs family, acro + research
- **Cleanflight** → `cleanflight` (fork of `cleanflight/cleanflight`) — Historical, Betaflight/iNav forked from this
- **Liberty-X** → `Liberty-X` (fork of `F33RNI/Liberty-X`) — STM32 multicopter for camera/delivery drones
- **HadesFCS** → `HadesFCS` (fork of `pms67/HadesFCS`) — Complete FC system from scratch, KiCad hardware

---

## ESC Firmware & Hardware

### AM32 → `AM32` (fork of `am32-firmware/AM32`)
Open-source ESC firmware for ARM-based (STM32) motor controllers. BLHeli_32 alternative.
- **Build**: ARM GCC toolchain
- **Usage**: Flash to compatible ESCs, configure via ESC Configurator web app
- **Docs**: https://github.com/am32-firmware/AM32/wiki

### Bluejay → `bluejay` (fork of `mathiasvr/bluejay`)
Digital ESC firmware for brushless motors (Busy Bee MCUs). BLHeli_S successor.
- **Build**: SDCC compiler
- **Usage**: Flash via ESC Configurator, replaces stock BLHeli_S firmware

### BLHeli_S → `BLHeli_S` (fork of `betaflight/BLHeli_S`)
Revived BLHeli_S open source brushless ESC firmware. Also covers original BLHeli (same fork network).
- **Usage**: Flash via BLHeliSuite or ESC Configurator
- **Note**: Fork network includes original `bitdump/BLHeli`

### Betaflight ESC → `betaflight-esc` (fork of `betaflight/betaflight-esc`)
Betaflight's own open source ESC firmware project.
- **Build**: ARM GCC toolchain

---

## Ground Control Stations

### QGroundControl → `qgroundcontrol` (fork of `mavlink/qgroundcontrol`)
Cross-platform GCS for MAVLink drones. Android, iOS, Mac, Linux, Windows. Dronecode project.
- **Build**: Qt 6 + CMake
- **Usage**: Plan missions, configure parameters, monitor telemetry in real-time
- **Docs**: https://docs.qgroundcontrol.com/

### Mission Planner → `MissionPlanner` (fork of `ArduPilot/MissionPlanner`)
Full-featured GCS for ArduPilot. C#/.NET. Windows primary, Linux/Mac via Mono.
- **Build**: Visual Studio or `msbuild`
- **Usage**: Plan waypoints, tune PIDs, view logs, calibrate sensors
- **Docs**: https://ardupilot.org/planner/

### MAVProxy → `MAVProxy` (fork of `ArduPilot/MAVProxy`)
Command-line GCS and MAVLink proxy. Extensible via Python modules. GPLv3.
- **Install**: `pip install MAVProxy`
- **Usage**: `mavproxy.py --master=/dev/ttyUSB0 --baudrate=115200`
- **Great for**: Headless operation, scripting, forwarding telemetry

### APM Planner 2 → `apm_planner` (fork of `ArduPilot/apm_planner`)
Cross-platform GCS in C++/Qt for APM-based autopilots.
- **Build**: `qmake && make`

---

## Communication Protocols & SDKs

### MAVLink → `mavlink` (fork of `mavlink/mavlink`)
The universal drone communication protocol. Lightweight binary messaging for drones.
- **Usage**: Auto-generated libraries for C, C++, Python, Java, etc.
- **Docs**: https://mavlink.io/en/

### MAVSDK → `MAVSDK` (fork of `mavlink/MAVSDK`)
High-level MAVLink API library (C++, with Python/Swift/Java/JS wrappers). gRPC architecture.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://mavsdk.mavlink.io/

### MAVSDK-Python → `MAVSDK-Python` (fork of `mavlink/MAVSDK-Python`)
Python client for MAVSDK. High-level async drone control via MAVLink.
- **Install**: `pip install mavsdk`
- **Usage**: `from mavsdk import System; drone = System(); await drone.connect()`

### MAVROS → `mavros` (fork of `mavlink/mavros`)
MAVLink-to-ROS bridge. Standard way to connect PX4/ArduPilot to ROS/ROS2.
- **Build**: `catkin build mavros` (ROS1) or `colcon build` (ROS2)
- **Docs**: https://wiki.ros.org/mavros

### DroneKit-Python → `dronekit-python` (fork of `dronekit/dronekit-python`)
Python library for MAVLink drone communication. Simple high-level API.
- **Install**: `pip install dronekit`
- **Usage**: `from dronekit import connect; vehicle = connect('/dev/ttyUSB0')`

### pymavlink → `pymavlink` (fork of `ArduPilot/pymavlink`)
Low-level Python MAVLink message processing library. Used by MAVProxy, DroneKit, etc.
- **Install**: `pip install pymavlink`

### Micro-XRCE-DDS → `Micro-XRCE-DDS-Agent` (fork of `eProsima/Micro-XRCE-DDS-Agent`)
DDS middleware agent for PX4-to-ROS2 bridge. uORB topics become ROS2 topics.
- **Build**: `cmake -B build && cmake --build build`

---

## RC Link & Transmitter Firmware

### ExpressLRS → `ExpressLRS` (fork of `ExpressLRS/ExpressLRS`)
High-performance open source RC link. ESP32/SX127x/SX1280 LoRa. 900MHz + 2.4GHz. Up to 1000Hz packet rate.
- **Build**: PlatformIO
- **Usage**: Flash TX and RX modules, bind, fly
- **Docs**: https://www.expresslrs.org/
- **Why**: Lowest latency, longest range, most hackable RC link available

### EdgeTX → `edgetx` (fork of `EdgeTX/edgetx`)
Cutting-edge open source firmware for RC radio transmitters. Fork of OpenTX.
- **Build**: CMake + ARM toolchain
- **Usage**: Flash to supported radios (RadioMaster, Jumper, FrSky, etc.)
- **Docs**: https://edgetx.org/

### OpenTX → `opentx` (fork of `opentx/opentx`)
Original open source RC transmitter firmware. Legacy — EdgeTX is the active successor.

---

## FPV Video Systems

### OpenHD → `OpenHD` (fork of `OpenHD/OpenHD`)
Open source digital FPV ecosystem. Long-range WiFi broadcast. 2.4/5.8/6GHz. 50km+ range tested.
- **Build**: Custom Linux image for Raspberry Pi / Radxa
- **Usage**: Air unit (Pi + camera) + ground unit (Pi + display)
- **Docs**: https://openhdfpv.org/

### WFB-NG → `wfb-ng` (fork of `svpcom/wfb-ng`)
WifiBroadcast Next Generation. Long-range packet radio via raw WiFi monitor mode. FEC error correction.
- **Build**: `make` (requires patched WiFi drivers)
- **Usage**: Provides low-latency video + telemetry transport layer
- **Note**: Foundation technology that OpenHD builds upon

### RubyFPV → `RubyFPV` (fork of `RubyFPV/RubyFPV`)
Open source digital FPV system. Multi-band redundant links. Relay node support.
- **Build**: Raspberry Pi image
- **Usage**: Air + ground Pi units

### MSP-OSD → `msp-osd` (fork of `fpv-wtf/msp-osd`)
MSP DisplayPort OSD renderer for DJI FPV systems.

### Gyroflow → `gyroflow` (fork of `gyroflow/gyroflow`)
Video stabilization using gyroscope data from camera or Blackbox flight logs. Rust-based.
- **Build**: `cargo build --release`
- **Usage**: Import video + gyro data → stabilize → export
- **Supports**: GoPro, Insta360, Sony, DJI, Betaflight Blackbox
- **Docs**: https://gyroflow.xyz/

---

## Simulation

### Gazebo → `gz-sim` (already existed, private)
New-generation Gazebo. Full physics simulation with PX4/ArduPilot SITL integration.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Launch with PX4 SITL models for hardware-in-the-loop testing
- **Docs**: https://gazebosim.org/

### PX4 Gazebo Models → `PX4-SITL_gazebo-classic` (fork of `PX4/PX4-SITL_gazebo-classic`)
PX4 plugins, vehicle models, and worlds for Gazebo Classic (SITL & HITL).
- **Usage**: Launch alongside PX4 SITL for full simulation

### AirSim → `AirSim` (fork of `microsoft/AirSim`)
Microsoft's high-fidelity simulator on Unreal Engine for drones and cars. Archived — see ProjectAirSim.
- **Build**: Requires Unreal Engine 4 + Visual Studio
- **Note**: No longer maintained, but code is complete and functional

### ProjectAirSim → `ProjectAirSim` (fork of `iamaisim/ProjectAirSim`)
AirSim successor by former Microsoft engineers. UE5 based. Modern simulation platform.
- **Build**: Unreal Engine 5 + CMake

### JSBSim → `jsbsim` (fork of `JSBSim-Team/jsbsim`)
Flight dynamics model library in C++. Fixed-wing, rockets, spacecraft. Used by ArduPilot SITL.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `JSBSim --script=scripts/c172_cruise.xml`
- **Docs**: https://jsbsim.sourceforge.net/

### Gym-PyBullet-Drones → `gym-pybullet-drones` (fork of `utiasDSL/gym-pybullet-drones`)
PyBullet Gymnasium environments for single/multi-agent reinforcement learning of quadcopter control.
- **Install**: `pip install gym-pybullet-drones`
- **Usage**: Train RL agents on drone tasks (hover, waypoint, formation)

---

## Hardware Design

### Pixhawk Hardware → `Hardware` (fork of `pixhawk/Hardware`)
Official Pixhawk PX4 hardware designs (FMUv1-v5 schematics, PCB layouts). CC BY-SA 3.0.
- **Contents**: KiCad/Eagle schematics, BOM, mechanical drawings
- **Use case**: Manufacture your own Pixhawk flight controller

### Pixhawk Standards → `Pixhawk-Standards` (fork of `pixhawk/Pixhawk-Standards`)
Pixhawk open standards for mechanical/electrical specs and interoperability guidelines.

### Frame Designs
- **Source One** → `source_one` (fork of `tbs-trappy/source_one`) — Industry-standard open FPV frame. DXF/STEP files.
- **Source Two** → `source_two` (fork of `ps915/source_two`) — Open FPV racing frame. Community design.

### Gimbal Controller
- **STorM32 BGC** → `storm32bgc` (fork of `olliw42/storm32bgc`) — 3-axis brushless gimbal controller (STM32). MAVLink compatible.

---

## Computer Vision & Autonomy

### Visual SLAM

#### ORB-SLAM3 → `ORB_SLAM3` (fork of `UZ-SLAMLab/ORB_SLAM3`)
Visual, Visual-Inertial, and Multi-Map SLAM. Monocular/stereo/RGB-D. Pin-hole + fisheye cameras.
- **Build**: `cmake -B build && cmake --build build` (requires OpenCV, Eigen3, Pangolin)
- **Usage**: `./mono_tum Vocabulary/ORBvoc.txt TUM1.yaml path_to_sequence`

#### ORB-SLAM2 → `ORB_SLAM2` (fork of `raulmur/ORB_SLAM2`)
Real-time SLAM for monocular, stereo, and RGB-D cameras with loop detection. Reference implementation.

#### VINS-Fusion → `VINS-Fusion` (fork of `HKUST-Aerial-Robotics/VINS-Fusion`)
Optimization-based multi-sensor state estimator. Mono+IMU, stereo+IMU. GPS fusion support.
- **Build**: `catkin build` (ROS workspace)
- **Usage**: Real-time visual-inertial odometry for GPS-denied environments

#### VINS-Mono → `VINS-Mono` (fork of `HKUST-Aerial-Robotics/VINS-Mono`)
Real-time monocular visual-inertial SLAM. Sliding window optimization.

#### OpenVINS → `open_vins` (fork of `rpng/open_vins`)
Visual-inertial navigation research platform. Winner of IROS 2019 VIO competition.
- **Build**: `colcon build` (ROS2) or `catkin build` (ROS1)

#### RTAB-Map → `rtabmap` (fork of `introlab/rtabmap`)
Real-Time Appearance-Based Mapping. RGB-D/stereo/LiDAR graph-based SLAM.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://introlab.github.io/rtabmap/

### Object Detection
- **Ultralytics (YOLO)** → `ultralytics` (already existed, private) — YOLOv8/v11 for drone-mounted object detection
- **OpenCV** → `opencv` (fork of `opencv/opencv`) — Foundation computer vision library

### Obstacle Avoidance
- **PX4-Avoidance** → `PX4-Avoidance` (fork of `PX4/PX4-Avoidance`) — ROS nodes for depth sensor fusion, VFH+* planner

### Path Planning & Trajectory

#### Fast-Planner → `Fast-Planner` (fork of `HKUST-Aerial-Robotics/Fast-Planner`)
Robust and efficient trajectory planner for quadrotors in unknown environments. GPLv3.
- **Build**: `catkin build` (ROS workspace)
- **Usage**: Generates kinodynamically feasible trajectories with obstacle avoidance

#### FUEL → `FUEL` (fork of `HKUST-Aerial-Robotics/FUEL`)
Fast UAV Exploration framework. 3-8x faster than prior state-of-the-art autonomous exploration.

#### EGO-Planner Swarm → `ego-planner-swarm` (fork of `ZJU-FAST-Lab/ego-planner-swarm`)
Decentralized multi-robot trajectory planner. Uses only onboard resources, no central coordination.

---

## ROS Integration

### MAVROS → (see Communication Protocols section above)

### MRS UAV System → `mrs_uav_system` (fork of `ctu-mrs/mrs_uav_system`)
Modular ROS framework for autonomous UAV research from Czech Technical University. Production-tested.
- **Build**: `catkin build` (ROS workspace)
- **Contents**: Control, state estimation, trajectory generation, tracking, sensor integration
- **Docs**: https://ctu-mrs.github.io/

---

## Swarm & Multi-Drone

### Crazyswarm2 → `crazyswarm2` (fork of `IMRCLab/crazyswarm2`)
ROS2 stack for large Crazyflie swarms. Polynomial trajectories, collision avoidance.
- **Build**: `colcon build` (ROS2 workspace)
- **Usage**: Coordinate 50+ nano drones simultaneously
- **Docs**: https://imrclab.github.io/crazyswarm2/

### ACL Swarm → `aclswarm` (fork of `mit-acl/aclswarm`)
MIT ACL distributed formation flying using multirotors. Peer-to-peer communication.
- **Build**: `catkin build` (ROS workspace)

### MAVSDK Drone Show → `mavsdk_drone_show` (fork of `alireza787b/mavsdk_drone_show`)
Unified platform for PX4-based drone shows and intelligent swarm missions.
- **Usage**: Choreograph synchronized drone light shows

---

## Mapping & Photogrammetry

### OpenDroneMap → `ODM` (fork of `OpenDroneMap/ODM`)
Command-line toolkit for maps, point clouds, 3D models, DEMs from drone images.
- **Build**: Docker recommended, or native `./install.sh`
- **Usage**: `docker run -ti --rm -v /images:/datasets opendronemap/odm --project-path /datasets`
- **Outputs**: Orthophotos, DSMs, 3D textured meshes, point clouds
- **Docs**: https://docs.opendronemap.org/

### WebODM → `WebODM` (fork of `OpenDroneMap/WebODM`)
Web-based UI for ODM. Commercial-grade aerial image processing.
- **Build**: `docker compose up`
- **Usage**: Upload drone photos via browser → process → download maps

### NodeODM → `NodeODM` (fork of `OpenDroneMap/NodeODM`)
Lightweight REST API to ODM processing engine. Backend for WebODM.

### ClusterODM → `ClusterODM` (fork of `OpenDroneMap/ClusterODM`)
NodeODM-compatible load balancer with cloud autoscaling (AWS, DO, Hetzner).

---

## LiDAR & Point Cloud Processing

### PDAL → `PDAL` (fork of `PDAL/PDAL`)
Point Data Abstraction Library. C++ API for translating, filtering, processing point clouds.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `pdal translate input.las output.laz --writers.las.compression=true`
- **Docs**: https://pdal.io/

### PCL → `pcl` (fork of `PointCloudLibrary/pcl`)
Point Cloud Library. Large-scale 2D/3D image and point cloud processing. C++.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://pointclouds.org/

### Potree → `potree` (fork of `potree/potree`)
WebGL point cloud viewer for large datasets. Browser-based LiDAR visualization.
- **Usage**: Convert LAS/LAZ to Potree format → serve via web browser

---

## Regulations & Safety

### Open Drone ID → `opendroneid-core-c` (fork of `opendroneid/opendroneid-core-c`)
Open Drone ID Core C Library. ASTM F3411 Remote ID via Bluetooth/WiFi broadcast.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Integrate into flight controller for FAA Remote ID compliance
- **Docs**: https://github.com/opendroneid/opendroneid-core-c

### ArduRemoteID → `ArduRemoteID` (fork of `ArduPilot/ArduRemoteID`)
MAVLink and DroneCAN OpenDroneID transmitter. Meets ASTM F3586-22 compliance.
- **Build**: Arduino/PlatformIO for ESP32
- **Usage**: Add-on module for ArduPilot/PX4 drones

### UTM (Unmanned Traffic Management)
- **Flight Blender** → `flight-blender` (fork of `openutm/flight-blender`) — Network Remote ID, flight authorization, geofence server
- **Flight Spotlight** → `flight-spotlight` (fork of `openutm/flight-spotlight`) — Real-time airspace display
- **InterUSS DSS** → `dss` (fork of `interuss/dss`) — Discovery and Synchronization Service. ASTM standard. Linux Foundation.

---

## Configurators & Tuning Tools

### Betaflight Configurator → `betaflight-configurator` (fork of `betaflight/betaflight-configurator`)
Cross-platform configuration app for Betaflight. PWA (Windows/Linux/Mac/Android).
- **Build**: `yarn install && yarn start`
- **Usage**: Connect FC via USB → configure PIDs, rates, modes, OSD

### iNav Configurator → `inav-configurator` (fork of `iNavFlight/inav-configurator`)
GUI configuration tool for iNav firmware.
- **Build**: `yarn install && yarn start`

### Rotorflight Configurator → `rotorflight-configurator` (fork of `rotorflight/rotorflight-configurator`)
Configuration tool for Rotorflight helicopter firmware.

### PID Analyzer → `PID-Analyzer` (fork of `Plasmatree/PID-Analyzer`)
Python tool that reads Blackbox logs and calculates PID step response via deconvolution.
- **Install**: `pip install -r requirements.txt`
- **Usage**: `python PID-Analyzer.py LOG00042.BFL`

### Blackbox Log Viewer → `blackbox-log-viewer` (fork of `betaflight/blackbox-log-viewer`)
Interactive browser-based flight log viewer for Betaflight Blackbox data. Export to WebM/CSV.

### UAV Log Viewer → `UAVLogViewer` (fork of `ArduPilot/UAVLogViewer`)
Online viewer for UAV log files. Cesium-based map integration.

### Methodic Configurator → `MethodicConfigurator` (fork of `ArduPilot/MethodicConfigurator`)
Semi-automated ArduPilot configuration sequence. Parameter management, IMU calibration, PID tuning.
- **Install**: `pip install MethodicConfigurator`
- **Usage**: Step-by-step guided calibration and tuning workflow

---

## Underlying RTOS

### NuttX → `nuttx` (fork of `apache/nuttx`)
NuttX RTOS — used by PX4. POSIX-compliant, real-time, multi-threaded.
- **Build**: `tools/configure.sh boardname:config && make`
- **Docs**: https://nuttx.apache.org/

### ChibiOS
Used by ArduPilot. Not on GitHub — archive from https://www.chibios.org/ separately.

---

## Repos NOT on GitHub (Archive Separately)

| Project | Source | Why You Need It |
|---------|--------|----------------|
| **ChibiOS** | chibios.org | RTOS used by ArduPilot |
| **Gazebo Classic** | gazebosim.org (some repos on Bitbucket) | Legacy simulation |
| **Google Cartographer** | github.com (archived) | 2D/3D SLAM (already archived) |

---

*Total drone forks: ~80*
*Covers: Flight control, ESC, GCS, MAVLink, RC link, FPV video, simulation, hardware, SLAM, path planning, mapping, LiDAR, swarm, Remote ID, UTM, configurators, RTOS*
