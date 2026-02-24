# 08 — Water & Sanitation

Water quality monitoring, purification system control, hydroponics, aquaponics, waste management, and environmental monitoring — clean water and sanitation are the foundation of survival.

## Water Quality Monitoring

### KnowFlow → `KnowFlow/KnowFlow_AWM`
Open-source automatic water monitoring device — low-cost, Arduino-based, designed for environmental activists and researchers.
- **Install**: Arduino IDE — load sketch onto Arduino Uno, wire DFRobot sensor modules
- **Features**: Monitors pH, temperature, dissolved oxygen, electrical conductivity, ORP; stores data to micro-SD card; Bluetooth phone readout
- **Docs**: https://github.com/KnowFlow/KnowFlow_AWM/blob/master/README.md

### Open Waters → `open-environment/open-waters`
Web-based water quality data management software for tracking monitoring locations, projects, samples, and results.
- **Install**: ASP.NET web application — requires IIS/SQL Server
- **Features**: EPA-WQX data import/export, geospatial mapping of monitoring locations, reference data synced with EPA, role-based security, multi-organization support
- **Docs**: https://github.com/open-environment/open-waters

### EzoGateway → `100prznt/EzoGateway`
Open-source gateway app bringing Atlas Scientific EZO sensor modules to the IoT — ideal for pool and water quality monitoring.
- **Install**: UWP app on Windows IoT Core (Raspberry Pi) with Tentacle T3 HAT
- **Features**: REST API for live measurements, web interface, sensor calibration, MQTT publishing, Siemens LOGO! PLC integration
- **Docs**: https://github.com/100prznt/EzoGateway/wiki

## Purification & Treatment

### PoolMaster → `Loic74650/PoolMaster`
Arduino-based home pool filtration and pH/ORP regulation system with PID control loops.
- **Install**: Flash ATmega2560 (Arduino Mega or CONTROLLINO MAXI); ESP32 port also available at `Gixy31/ESP32-PoolMaster`
- **Features**: pH and ORP PID regulation, peristaltic pump control for acid/chlorine dosing, water temperature regulation, MQTT reporting, 3.5" Nextion touchscreen, web configuration
- **Docs**: https://github.com/Loic74650/PoolMaster/blob/master/README.md

**Note**: Dedicated open-source UV/solar water purification controllers are scarce. For custom UV sterilization builds, an ESP32 with relay control, UV-C lamp, and flow sensor can be assembled using Mycodo (below) or Home Assistant. See [09-survival.md](09-survival.md) for Home Assistant.

## Hydroponics & Aquaponics

### Mycodo → `kizniche/Mycodo`
Environmental monitoring and regulation system for Raspberry Pi — the Swiss Army knife of sensor-driven automation.
- **Install**: `curl -L https://kizniche.github.io/Mycodo/install | bash` (Raspberry Pi OS)
- **Features**: PID control loops, sensor inputs (temperature, humidity, pH, EC, CO2, and dozens more), relay/pump outputs, InfluxDB time-series storage, web dashboard, conditional triggers, camera integration, custom Python functions
- **Docs**: https://kizniche.github.io/Mycodo/
- **Use cases**: Hydroponics, aquaponics, mushroom cultivation, fermentation, aquariums, greenhouses — anything requiring sensor-driven regulation

### Hydruino → `NachtRaveVL/Simple-Hydroponics-Arduino`
Professional-grade hydroponic automation controller for Arduino-compatible microcontrollers — no internet or cloud required.
- **Install**: Download library into Arduino custom libraries folder, load example sketch
- **Features**: Reservoir/pump/probe/relay management, automated feed dosing and lighting schedules, built-in crop data library with growth-phase parameters, SD card data logging, OLED/LCD display support
- **Docs**: https://github.com/NachtRaveVL/Simple-Hydroponics-Arduino
- **License**: MIT

### Hydromisc → `hydromisc/hydromisc`
Open-hardware PCB for managing mid-size hydroponic grows over Wi-Fi — measures EC and pH, drives pumps and valves.
- **Install**: Order PCB from Gerber files, populate components, flash ESP32 firmware
- **Features**: 8 solenoid valve outputs, 6 pump outputs with current monitoring, 4 peristaltic dosing pump outputs, 2 pH probe interfaces, 2 EC probe interfaces, temperature/humidity/strain gauge inputs
- **Docs**: https://github.com/hydromisc/hydromisc/tree/master/doc

### DRO-Matic → `drolsen/DRO-Matic`
Fully automated hydroponic OS for Arduino Mega — nutrient dosing, irrigation, top-offs, timers, EC and pH drift fixing.
- **Install**: Compile and upload to Arduino Mega 2560 via Arduino IDE
- **Features**: Crop profiles stored on MicroSD, peristaltic pump calibration (mL/min), configurable dosing delays, EC/pH 3-point calibration, LCD screen interface, shareable crop configurations
- **Docs**: https://github.com/drolsen/DRO-Matic/wiki

### ESP32 Greenhouse Tower → `ZanzyTHEbar/ESP32GreenhouseTowerDIY`
Open-source DIY automated aeroponics/hydroponic modular tower garden based on ESP32.
- **Install**: Flash ESP32 via Arduino IDE or PlatformIO; 3D-print tower parts
- **Features**: Vertical tower design with 20L bucket reservoir, Home Assistant integration, optional 3D-printable aeroponics nozzle, sensor monitoring, low-cost build (~$100 total)
- **Docs**: https://github.com/ZanzyTHEbar/ESP32GreenhouseTowerDIY

## Waste Management

### CompostSensor → `kinasmith/CompostSensor`
Wireless temperature and moisture sensor network for logging and automating medium-scale composting operations.
- **Install**: Arduino IDE — flash Moteino wireless boards; assemble gateway with Adafruit FONA cellular module
- **Features**: Wireless radio mesh of compost probes, SHT21 temperature/humidity sensors, cellular data upload via Sparkfun Data Service, solar-powered gateway with display, SD card logging
- **Docs**: https://github.com/kinasmith/CompostSensor

### GHE Data Logger → `Global-Health-Engineering/GHE-data-logger`
ESP32-based data logger for remote monitoring of biogas digesters — designed by ETH Zurich's Global Health Engineering group.
- **Install**: Order custom PCB from Gerber files, flash ESP32-DevKitC-V4 firmware
- **Features**: DS3231 RTC for precise timestamps, MicroSD logging, SIMCom 4G/LTE cellular connectivity, robust PCB with integrated ESP32, 20000mAh power bank support
- **Docs**: https://global-health-engineering.github.io/GHE-data-logger/

**Note**: Dedicated open-source greywater recycling controllers are not yet available as standalone projects. For greywater system automation, combine an ESP32 with relay modules, flow sensors, and water level sensors under Mycodo or Home Assistant control. See [09-survival.md](09-survival.md) for Home Assistant integration.

## Rainwater Harvesting

### Rainwater Calculator → `caminosdeagua/rainwater-calculator`
Web-based calculator for sizing rainwater harvesting systems — designed for the Independence Watershed in Mexico but globally applicable.
- **Install**: Static HTML/JS — open `index.html` in browser or host on any web server
- **Features**: Calculates collection capacity from roof area and local rainfall data, determines minimum cistern size per household, estimates drinking/cooking water coverage
- **Docs**: https://caminosdeagua.github.io/rainwater-calculator/

### Watmonitor → `martinius96/hladinomer-studna-scripty`
Open-source water level monitor for wells, tanks, and cisterns using ultrasonic sensors with Arduino, ESP8266, or ESP32.
- **Install**: Arduino IDE — flash firmware for your board; deploy PHP/MySQL backend for web dashboard
- **Features**: HC-SR04/JSN-SR04T ultrasonic sensor support, FreeRTOS on ESP32, ultra-low-power deep sleep mode, WiFi/Ethernet/LoRa/Sigfox connectivity, OTA updates, MQTT support, web dashboard with charts
- **Docs**: https://martinius96.github.io/hladinomer-studna-scripty/en/

## Environmental Monitoring

### Sensor.Community Firmware → `opendata-stuttgart/sensors-software`
Firmware for the Sensor.Community (formerly Luftdaten.info) citizen-science air quality network — the largest open environmental sensor network in the world.
- **Install**: Flash ESP8266/ESP32 via airrohr-firmware-flasher tool; configure via WiFi AP at `http://192.168.4.1`
- **Features**: PM2.5/PM10 particulate monitoring (SDS011, PMS, SPS30), temperature/humidity/pressure (BME280, DHT22, SHT3x), OLED/LCD display, CSV output via USB serial, auto-AP mode for configuration, multi-API data submission
- **Docs**: https://sensor.community/en/sensors/
- **Cross-ref**: Pairs with weewx weather data — see [09-survival.md](09-survival.md#weewx--weewxweewx)

### OpenAQ API → `openaq/openaq-api-v2`
Open-source API providing access to global real-time and historical air quality data from thousands of stations worldwide.
- **Install**: `poetry install` then `poetry run uvicorn openaq_api.main:app --reload` (FastAPI/Python)
- **Features**: PM2.5, PM10, SO2, NO2, CO, O3 measurements, REST API with JSON responses, historical data access, station/sensor filtering, global coverage from government and research sources
- **Docs**: https://docs.openaq.org/

### b-parasite → `rbaron/b-parasite`
Open-source BLE soil moisture, temperature, humidity, and light sensor — works with Home Assistant out of the box.
- **Install**: Order PCB from Gerber files, flash nRF52 firmware; detected automatically by Home Assistant via BTHome
- **Features**: Bluetooth Low Energy broadcasting, soil moisture + air temp/humidity + light sensing, battery voltage reporting, ESPHome integration, ultra-low power for months of battery life
- **Docs**: https://github.com/rbaron/b-parasite/blob/main/README.md

### Vinduino → `ReiniervdL/Vinduino`
Open-license soil moisture monitoring and irrigation management platform — born from vineyard water conservation.
- **Install**: Arduino IDE — flash Vinduino R3 board firmware
- **Features**: 4 electrically isolated soil moisture sensor inputs, ESP8266 WiFi or LoRa connectivity, irrigation valve control with pressure feedback, solar battery charger, real-time clock, low-cost gypsum sensors for multi-depth monitoring
- **Docs**: https://hackaday.io/project/6444-vinduino-a-wine-growers-water-saving-project

### EPA SWMM → `USEPA/Stormwater-Management-Model`
Dynamic hydrology-hydraulic water quality simulation model for stormwater, wastewater, and combined sewer systems — the industry standard, now open source.
- **Install**: Build from C source, or use Python wrapper `pip install pyswmm`
- **Features**: Continuous or event-based runoff simulation, green infrastructure / low-impact development modeling, dynamic pump/orifice/weir control rules, water quality tracking, GUI available via `USEPA/SWMM-EPANET_User_Interface`
- **Docs**: https://www.epa.gov/water-research/storm-water-management-model-swmm

---

## Cross-References

- **Home Assistant** for sensor integration and automation dashboards — see [09-survival.md](09-survival.md)
- **Energy monitoring** (emoncms, solar controllers) — see [10-energy.md](10-energy.md)
- **Weather stations** (weewx) for rainfall data and agricultural planning — see [09-survival.md](09-survival.md#weewx--weewxweewx)
- **farmOS** for crop management alongside hydroponic systems — see [09-survival.md](09-survival.md#farmos--farmosfarmos)
