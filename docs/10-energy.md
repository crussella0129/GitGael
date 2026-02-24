# 10 — Energy & Power

Solar charging, battery management, and energy monitoring for off-grid operation.

## Solar

### MPPT Solar Charge Controller → `LibreSolar/mppt-2420-lc`
Open-hardware Maximum Power Point Tracking solar charge controller (24V/20A).
- **Contains**: KiCad schematics, PCB layout, BOM, and firmware
- **Build hardware**: Order PCBs from Gerber files, populate with BOM components
- **Docs**: https://libre.solar/mppt-2420-lc/

### Charge Controller Firmware → `LibreSolar/charge-controller-firmware`
Firmware for Libre Solar MPPT/PWM charge controllers.
- **Build**: `west build -b <board>`
- **Docs**: https://libre.solar/charge-controller-firmware/

### Building DC Energy Systems → `LibreSolar/learn.libre.solar`
Open educational resource covering DC energy system design — solar sizing, battery selection, charge controller theory, wiring, and safety.
- **Build**: VitePress site — `npm install && npm run build`
- **Docs**: https://learn.libre.solar/
- **Use case**: The reference guide for designing your off-grid power system from scratch. Covers theory, component selection, and practical wiring.

### MPPT 1210 HUS → `LibreSolar/mppt-1210-hus`
12V/10A MPPT charge controller with dual USB. Simpler and smaller than the 2420 — ideal for small panels.
- **Contains**: KiCad schematics, PCB layout, BOM

### MPPT 2420 HC → `LibreSolar/mppt-2420-hc`
24V/20A MPPT controller with high-side load switch and CAN bus. More capable than the 2420-lc.
- **Contains**: KiCad schematics, PCB layout, BOM

### MPPT 2420 HPX → `LibreSolar/mppt-2420-hpx`
Hybrid solar+wind charge controller. The only LibreSolar controller with wind turbine support.
- **Contains**: KiCad schematics, PCB layout, BOM

## Solar System Modeling

### SAM (System Advisor Model) → `NREL/SAM`
NREL's comprehensive solar/wind/battery system performance and financial modeling tool. Calculate array sizing, tilt angles, expected output, and system costs.
- **Build**: wxWidgets-based desktop app — `cmake -B build && cmake --build build`
- **Docs**: https://sam.nrel.gov/
- **Use case**: Size your solar array before building. Input location, panel specs, load profile → get expected kWh/year, optimal tilt angle, battery sizing.

### EnergyPlus → `NREL/EnergyPlus`
NREL's building energy simulation engine. Models heating, cooling, lighting, ventilation, and renewable energy systems.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://energyplus.net/documentation
- **Use case**: Design energy-efficient shelters and buildings. Simulate insulation choices, window placement, passive solar heating, and HVAC sizing before construction.

### OpenStudio → `NREL/OpenStudio`
GUI-based building energy modeling platform. Graphical front-end for EnergyPlus with SketchUp integration.
- **Build**: `cmake -B build && cmake --build build` (Ruby/C++ — large build)
- **Docs**: https://openstudio-sdk-documentation.s3.amazonaws.com/index.html
- **Use case**: Visual building energy design. Draw building geometry in SketchUp → apply materials/HVAC in OpenStudio → run EnergyPlus simulation → analyze results. Much more accessible than raw EnergyPlus input files.

## Battery Management

### diyBMSv4 → `stuartpittaway/diyBMSv4`
Complete DIY battery management system for lithium cell packs.
- **Contains**: PCB designs (KiCad), ESP32 firmware, web interface
- **Features**: Per-cell voltage monitoring, active balancing, temperature sensing, over/under voltage protection
- **Build**: Flash ESP32 firmware, order PCBs, wire to battery pack
- **Docs**: https://github.com/stuartpittaway/diyBMSv4/wiki
- **Use case**: Safely manage salvaged laptop/EV lithium cells into battery packs

### BMS Firmware → `LibreSolar/bms-firmware`
Firmware for LibreSolar BMS boards based on bq769x0, bq769x2, and ISL94202 ICs. Zephyr RTOS-based.
- **Build**: `west build -b <board>`
- **Supported ICs**: bq76920 (5 cells), bq76930 (10 cells), bq76940 (15 cells), bq769x2, ISL94202
- **Docs**: https://libre.solar/bms-firmware/
- **Use case**: Flash onto LibreSolar BMS boards for cell balancing, over-voltage/under-voltage protection, temperature monitoring, and SOC estimation.

### BMS C1 → `LibreSolar/bms-c1`
16S/100A battery management system. LibreSolar's most capable BMS — handles full 48V battery packs.
- **Contains**: KiCad schematics, PCB layout, BOM
- **Use case**: Large-scale battery management for off-grid solar systems

### BMS 5S50 SC → `LibreSolar/bms-5s50-sc`
5-cell 50A BMS using bq76920. Simpler BMS for 12V-18V battery packs.

### BMS 15S80 SC → `LibreSolar/bms-15s80-sc`
15-cell 80A BMS using bq76940. High-cell-count BMS for 48V systems.

### BMS 8S50 IC → `LibreSolar/bms-8s50-ic`
8-cell 50A BMS using ISL94202. Different IC family from bq769x for hardware diversity.

## Energy Data Gateway

### ESP32 Edge Firmware → `LibreSolar/esp32-edge-firmware`
CAN/UART to WiFi gateway for connecting Libre Solar devices to your network. Data logging to SD card.
- **Build**: PlatformIO — `pio run`
- **Features**: ThingSet protocol, MQTT publishing, SD card logging, web interface
- **Use case**: Bridge between your solar charge controllers/BMS and Home Assistant or emoncms. Also logs data to SD card for offline analysis.

## Energy Monitoring

### emoncms → `emoncms/emoncms`
OpenEnergyMonitor's web app for logging and visualizing energy data.
- **Install**: PHP/MySQL stack + `git clone` into web root
- **Usage**: Connect energy monitors (CT clamps, voltage sensors) → log to emoncms → visualize dashboards
- **Docs**: https://guide.openenergymonitor.org/

## Integration with Home Assistant

Your `core` fork (Home Assistant) integrates with all of the above for centralized energy management:
- Solar production monitoring
- Battery state of charge
- Load management and scheduling
- Weather-based predictions (pair with `weewx` weather station)

## Arduino Power Monitoring

See [14-manufacturing.md](14-manufacturing.md) for Arduino sensor and power libraries relevant to energy systems:
- **INA219 Current Sensor** — I2C current/voltage/power monitoring
- **BatterySense** — Battery voltage monitoring and SOC estimation
- **ArduinoLowPower** — Sleep modes for solar/battery deployments
- **PID Controller** — Solar tracking, temperature control
- **PiJuice UPS** — See [01-system-foundation.md](01-system-foundation.md) — Solar charging HAT for Raspberry Pi
