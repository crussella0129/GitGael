# 15 — 3D Printing

Complete 3D printer ecosystem from firmware to finished prints.

## Firmware / Motion Control

### Klipper → `Klipper3d/klipper`
Python-based 3D printer firmware. Runs on Raspberry Pi + MCU.
- **Install**: `git clone` + run `install-octopi.sh` or KIAUH
- **Config**: `printer.cfg` — defines steppers, heaters, probes, macros
- **Docs**: https://www.klipper3d.org/
- **Companion**: `klippain` fork — pre-built Klipper macros and config framework

### Kalico → `KalicoCrew/kalico`
Klipper fork with additional features (input shaping improvements, etc.).
- **Install**: Same as Klipper, different git source
- **Docs**: https://github.com/KalicoCrew/kalico/wiki

### Marlin → `MarlinFirmware/Marlin`
C++ printer firmware that runs directly on the MCU (no Pi needed).
- **Build**: PlatformIO — `pio run -e <board>`
- **Config**: `Configuration.h` and `Configuration_adv.h`
- **Docs**: https://marlinfw.org/docs/

### Katapult → `Arksine/katapult`
Bootloader for Klipper MCUs. Flash firmware over CAN bus or USB.
- **Build**: `make menuconfig && make`
- **Docs**: https://github.com/Arksine/katapult/blob/master/README.md

## Middleware

### Moonraker → `Arksine/moonraker`
API server for Klipper. Connects front-ends to Klipper.
- **Install**: `git clone` + install script
- **Docs**: https://moonraker.readthedocs.io/

## Front Ends

### Mainsail → `mainsail-crew/mainsail`
Web interface for Klipper printers. Clean, responsive.
- **Install**: `npm install && npm run build` — serve static files via nginx
- **Docs**: https://docs.mainsail.xyz/

### Fluidd → `fluidd-core/fluidd`
Alternative Klipper web UI. Simpler design.
- **Install**: Download release or `npm run build`
- **Docs**: https://docs.fluidd.xyz/

## Slicers

### OrcaSlicer → `SoftFever/OrcaSlicer`
Feature-rich slicer forked from Bambu Studio/PrusaSlicer. Best current option.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://github.com/SoftFever/OrcaSlicer/wiki

### SuperSlicer → `supermerill/SuperSlicer`
PrusaSlicer fork with extra tuning features.
- **Build**: `cmake -B build && cmake --build build`

### Cura → `Ultimaker/Cura`
Ultimaker's slicer. Python/Qt-based.
- **Build**: `pip install .` (requires CuraEngine)
- **Engine**: `CuraEngine` fork — the C++ slicing engine

## CAD / Design

### FreeCAD → `FreeCAD/FreeCAD`
Full parametric 3D CAD with FEM simulation workbench.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://wiki.freecad.org/

### OpenSCAD → `openscad/openscad`
Programmer's 3D CAD — code your models.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Write `.scad` files: `cube([10,20,30]); translate([15,0,0]) sphere(r=5);`
- **Docs**: https://openscad.org/documentation.html

### CadQuery → `CadQuery/cadquery`
Python parametric CAD library.
- **Install**: `pip install cadquery`
- **Usage**: `import cadquery as cq; result = cq.Workplane("XY").box(10,20,30)`
- **Docs**: https://cadquery.readthedocs.io/

### build123d → `gumyr/build123d`
Next-gen Python CAD (successor to CadQuery).
- **Install**: `pip install build123d`
- **Docs**: https://build123d.readthedocs.io/

### OCP → `CadQuery/OCP`
OpenCascade Python bindings. Low-level CAD kernel.

### SDF → `fogleman/sdf`
Generate 3D models using signed distance functions in Python.
- **Install**: `pip install sdf`
- **Docs**: https://github.com/fogleman/sdf/blob/main/README.md

### PicoGK → `leap71/PicoGK`
Computational geometry kernel for generating complex lattice/organic geometries.
- **Docs**: https://leap71.com/PicoGK/

### Blender → `blender/blender`
Full 3D modeling, animation, and rendering suite.
- **Docs**: https://docs.blender.org/

## Voron Ecosystem

### Printer Designs
| Fork | Printer | Description |
|------|---------|-------------|
| `Voron-0` | Voron 0 | Tiny 120mm CoreXY |
| `Voron-2` | Voron 2.4 | Full-size CoreXY, enclosed |
| `Voron-Trident` | Voron Trident | Bed-slinger CoreXY hybrid |
| `Voron-Switchwire` | Voron Switchwire | Converted Ender 3, CoreXZ |
| `Voron-Legacy` | Voron Legacy | Original open-bed design |
| `Voron-Hardware` | PCBs & Electronics | Toolhead PCBs, controller boards |
| `Voron-Stealthburner` | Toolhead | Current standard Voron toolhead |
| `Voron-Tap` | Probe | Nozzle-contact bed probe |
| `VoronUsers` | Community Mods | User-submitted modifications |
| `Voron-Documentation` | Docs | Official build guides |

### Voron Accessories & Mods
| Fork | Purpose |
|------|---------|
| `voron_canbus` | CAN bus wiring guide for Voron |
| `klippain` | Klipper config framework & macros |
| `Klicky-00` | Magnetic probe system |
| `VoronBFI` | Bed fan improvement |
| `VoronTools` | Voron-specific tools |
| `Voron-2.4` | Formbot kit documentation |
| `Trident-EZBake` | Easier Trident build variant |
| `Tridex` | FrankenVoron IDEX design |
| `Cyclops-Extruder` | Multi-material extruder |
| `Quickdraw_Probe` | Quick-attach probe |
| `Orbiter-2-Smart-Sensor` | Smart filament sensor |
| `A4T` | Toolchanger system |
| `quindec-toolchanger` | Another toolchanger design |
| `Nitehawk-SB` | LDO Stealthburner toolboard |
| `Nitehawk-36` | LDO 36mm toolboard |
| `Annex-Engineering_User_Mods` | Annex community mods |
| `installer_script_k1_and_max` | Klipper for Creality K1 |
| `update_klipper_and_mcus` | Klipper MCU update tool |
| `3D-printing-info` | General 3D printing knowledge |
| `Print-Tuning-Guide` | Andrew Ellis print tuning guide |

### Other Printers
| Fork | Design |
|------|--------|
| `VzBoT-Vz330` | High-speed CoreXY |
| `Tiny-T` | PrintersForAnts micro printer |
| `LH-Stinger` | LH-Stinger design |
| `tri-zero` | Triple-Z Voron variant |

## Tuning Reference
- `Print-Tuning-Guide` — Andrew Ellis's definitive print tuning guide
- `Voron-Documentation` — Official Voron build documentation
- `3D-printing-info` — General 3D printing reference
