# 14 — Manufacturing

CNC machining, PCB design, motor control, FPGA, and reverse engineering.

## CNC Machining

### LinuxCNC → `LinuxCNC/linuxcnc`
Controls CNC mills, lathes, 3D printers, laser/plasma cutters, and robot arms.
- **Install**: Use the LinuxCNC ISO, or build from source
- **Build**: `cd src && ./autogen.sh && ./configure && make`
- **Usage**: Load G-code, set offsets, run programs via GUI (AXIS or QtVCP)
- **Docs**: https://linuxcnc.org/docs/stable/html/

### grblHAL → `grblHAL/core`
CNC controller firmware for microcontrollers. Successor to GRBL.
- **Build**: Platform-specific (STM32, ESP32, etc.) — see driver repos
- **Usage**: Send G-code over serial: `G0 X10 Y20 Z5`
- **Docs**: https://github.com/grblHAL/core/wiki

### bCNC → `vlachoudis/bCNC`
G-code sender, CNC controller interface, and basic CAM (toolpath generation) in Python/Tkinter.
- **Install**: `pip install bCNC` or run from source
- **Usage**: Connect to GRBL/grblHAL controller → load DXF/SVG → generate toolpaths → send G-code
- **Features**: 3D visualization, probing, autoleveling, tool change, built-in CAM for 2.5D operations
- **Docs**: https://github.com/vlachoudis/bCNC/wiki
- **Use case**: The missing link between CAD and CNC — generates toolpaths from drawings without needing commercial CAM software.

## Industrial Automation

### OpenPLC v3 → `thiagoralves/OpenPLC_v3`
Open-source Programmable Logic Controller runtime. Run PLC programs on Raspberry Pi, Arduino, or x86.
- **Install**: `./install.sh linux` (Pi/x86) or flash to Arduino
- **Usage**: Web editor at `localhost:8080` → write Ladder Logic, Structured Text, or Function Block programs → deploy to hardware
- **Docs**: https://autonomylogic.com/docs/
- **Languages**: IEC 61131-3 compliant — Ladder Diagram, Structured Text, Function Block Diagram, Instruction List
- **Use case**: Automate industrial processes — water pumps, irrigation valves, generator start/stop, conveyor belts, alarm systems. Replaces expensive commercial PLCs with a $35 Raspberry Pi.

## PCB Design

### KiCad → `KiCad/kicad-source-mirror`
Full PCB EDA suite: schematic capture, PCB layout, 3D viewer, Gerber export.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Schematic → Assign footprints → Route PCB → Export Gerbers
- **Docs**: https://docs.kicad.org/
- **Note**: Can also export 3D models for FreeCAD integration

### KiCad Symbols → `KiCad/kicad-symbols`
Official KiCad schematic symbol libraries. Thousands of component symbols for resistors, capacitors, ICs, connectors, and more. Without these, KiCad cannot represent any components.
- **Install**: Copy to KiCad library path
- **Note**: Archived at KiCad 5 era but complete and functional.

### KiCad Footprints → `KiCad/kicad-footprints`
Official KiCad PCB footprint libraries. Component land patterns for PCB layout.
- **Install**: Copy to KiCad library path
- **Note**: Archived at KiCad 5 era but complete and functional.

### KiCad 3D Packages → `KiCad/kicad-packages3D`
3D models for PCB rendering and mechanical CAD integration. Enables 3D preview of PCBs and export to FreeCAD.
- **Size**: ~1.2GB
- **Note**: Archived but complete.

### Circuit Simulation — qucs_s → `ra3xdh/qucs_s`
Qt-based circuit simulator wrapping ngspice/Xyce SPICE backends.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Draw schematic → Simulate → View waveforms
- **Docs**: https://ra3xdh.github.io/

### ngspice → `ngspice/ngspice`
The SPICE engine. Command-line circuit simulation.
- **Build**: `./configure --with-x && make && make install`
- **Usage**: `ngspice circuit.cir` → `.tran 1u 10m` → `plot v(out)`
- **Docs**: https://ngspice.sourceforge.io/docs.html

## FPGA Development

### Yosys → `YosysHQ/yosys`
Open synthesis suite for FPGAs. Converts Verilog/VHDL to gate-level netlists.
- **Build**: `make -j$(nproc) && make install`
- **Usage**: `yosys -p "read_verilog design.v; synth_ice40; write_json design.json"`
- **Docs**: https://yosyshq.readthedocs.io/

### nextpnr → `YosysHQ/nextpnr`
FPGA place-and-route. Takes Yosys output → produces bitstream.
- **Build**: `cmake -B build -DARCH=ice40 && cmake --build build`
- **Usage**: `nextpnr-ice40 --hx8k --json design.json --pcf pins.pcf --asc design.asc`
- **Supported FPGAs**: iCE40, ECP5, Gowin, Nexus

**Together**: Yosys + nextpnr = fully open FPGA toolchain. No vendor tools needed.

## Motor Control

### ODrive → `odriverobotics/ODrive`
High-performance brushless motor controller with FOC.
- **Build**: Firmware via `tup` build system, or use pre-built
- **Usage**: `odrivetool` → `odrv0.axis0.requested_state = AXIS_STATE_CLOSED_LOOP_CONTROL`
- **Docs**: https://docs.odriverobotics.com/
- **Applications**: CNC spindles, robot joints, electric vehicles, wind turbines

### VESC → `vedderb/bldc`
Open-source ESC firmware for brushless motors.
- **Build**: Requires VESC Tool and STM32 toolchain
- **Usage**: Flash to VESC hardware, configure via VESC Tool GUI
- **Docs**: https://vesc-project.com/
- **Applications**: E-bikes, e-skateboards, power tools, drones

## Signal Analysis

### libsigrok → `sigrokproject/libsigrok`
Signal analysis library for logic analyzers, oscilloscopes, multimeters.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: https://sigrok.org/wiki/Libsigrok

### PulseView → `sigrokproject/pulseview`
GUI for sigrok — view logic analyzer and oscilloscope data.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Connect logic analyzer → capture → decode protocols (SPI, I2C, UART, CAN)
- **Docs**: https://sigrok.org/wiki/PulseView

## Debugging & Programming

### OpenOCD → `openocd-org/openocd`
On-Chip Debugger for embedded development. JTAG/SWD debugging and programming for STM32, ESP32, nRF52, RP2040, and many more MCUs.
- **Build**: `./bootstrap && ./configure && make -j$(nproc) && make install`
- **Usage**: `openocd -f interface/cmsis-dap.cfg -f target/stm32f4x.cfg`
- **Docs**: https://openocd.org/doc/html/
- **Note**: The `debugprobe` repo (Pico CMSIS-DAP) produces the hardware probe; OpenOCD is the software that drives it.

## RTOS (Extended)

### Zephyr RTOS → `zephyrproject-rtos/zephyr`
Modern real-time operating system for IoT and embedded devices. Supports 600+ boards across ARM, RISC-V, x86, and more.
- **Build**: `west init && west update && west build -b <board> samples/hello_world`
- **Docs**: https://docs.zephyrproject.org/
- **Why it matters**: The LibreSolar BMS firmware and charge controller firmware both use Zephyr (`west build`). Without Zephyr, you cannot build the energy stack firmware. Also used by many modern embedded projects.

### Zephyr HALs
Hardware Abstraction Layers required to run Zephyr on specific MCU families:
- `hal_stm32` (fork of `zephyrproject-rtos/hal_stm32`) → STM32 series — the most common MCU family
- `hal_espressif` (fork of `zephyrproject-rtos/hal_espressif`) → ESP32 series — WiFi/BLE SoCs
- `hal_nordic` (fork of `zephyrproject-rtos/hal_nordic`) → nRF series — dominant in BLE/mesh
- `hal_nxp` (fork of `zephyrproject-rtos/hal_nxp`) → i.MX, LPC, Kinetis — industrial/automotive

### Zephyr Ecosystem Tools
- `west` (fork of `zephyrproject-rtos/west`) → Zephyr build orchestrator and workspace manager
- `sdk-ng` (fork of `zephyrproject-rtos/sdk-ng`) → Zephyr SDK with toolchains and dev tools
- `mcuboot` (fork of `zephyrproject-rtos/mcuboot`) → Secure bootloader for 32-bit MCUs (OTA updates, secure boot)
- `cmsis` (fork of `zephyrproject-rtos/cmsis`) → ARM CMSIS headers for bare-metal ARM development

### Embassy → `embassy-rs/embassy`
Async embedded framework for Rust. Modern alternative to FreeRTOS with Rust safety guarantees.
- **Build**: `cargo build --release --target thumbv7em-none-eabihf`
- **Docs**: https://embassy.dev/
- **Supported**: STM32, nRF, RP2040, ESP32
- **Use case**: Write safe, concurrent embedded firmware in Rust with async/await.

## Electronics Reference

### TMC2209 → `BIGTREETECH-TMC2209-V1.2`
Stepper motor driver reference documentation and schematics.
- **Note**: Reference design only — schematics, datasheets, and configuration guides for the TMC2209 silent stepper driver

## 3D Scanning / Reverse Engineering

### Meshroom → `alicevision/Meshroom`
Photogrammetry pipeline: photos → 3D textured mesh.
- **Build**: Requires AliceVision library + Qt
- **Usage**: Import photos → Compute structure → Dense reconstruction → Meshing → Texturing
- **Docs**: https://meshroom-manual.readthedocs.io/
- **Use case**: Photograph a broken part, reconstruct in 3D, modify in FreeCAD, reprint

### Cartographer → `cartographer`
Real-time simultaneous localization and mapping (SLAM) in 2D and 3D.
- **Build**: CMake with Abseil, Ceres Solver, protobuf dependencies
- **Usage**: Feed sensor data (LiDAR, IMU) → real-time map + position
- **Docs**: https://google-cartographer.readthedocs.io/
- **Applications**: Robot navigation, warehouse mapping, building scanning, autonomous vehicles

## Arduino & Microcontroller Ecosystem

### Core Toolchain

### Arduino IDE 1.x → `arduino/Arduino`
Classic Arduino IDE. Java-based, fully offline, battle-tested for 15+ years.
- **Build**: `ant build` (requires Java JDK)
- **Usage**: Open `.ino` sketch → select board → click Upload

### Arduino CLI → `arduino/arduino-cli`
Command-line Arduino tool. Compiles, uploads, manages libraries and boards from terminal. The backbone of headless/offline Arduino workflows.
- **Build**: `go build`
- **Usage**: `arduino-cli compile -b arduino:avr:uno sketch/ && arduino-cli upload -p /dev/ttyACM0`

### Arduino IDE 2.x → `arduino/arduino-ide`
Modern Electron-based IDE with language server. Works offline but has optional cloud hooks — strip cloud references if used.

### AVR Toolchain → `arduino/toolchain-avr`
AVR GCC compiler toolchain (avr-gcc, avr-libc, avr-binutils).
- **Note**: Pre-compiled binaries — bundled with Arduino IDE and PlatformIO

### Arduino Builder → `arduino/arduino-builder`
Legacy standalone sketch compiler. Independent build path.
- **Build**: `go build`
- **Usage**: `arduino-builder -hardware /path/to/hardware -tools /path/to/tools -fqbn arduino:avr:uno sketch.ino`

### AVRDUDE → `avrdudes/avrdude`
Standard utility for programming AVR microcontrollers. Supports ISP, JTAG, PDI, UPDI.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: `avrdude -c usbasp -p m328p -U flash:w:firmware.hex`

### Arduino Makefile → `sudar/Arduino-Makefile`
Makefile-based build system — compiles and uploads with no IDE dependency.
- **Usage**: Set `BOARD_TAG=uno` in Makefile → `make && make upload`

### ESPTool → `espressif/esptool`
Serial flashing utility for all Espressif SoCs (ESP8266, ESP32, S2/S3/C3/C6/H2). Python-based.
- **Install**: `pip install esptool`
- **Usage**: `esptool.py --port /dev/ttyUSB0 write_flash 0x0 firmware.bin`

### MCU Cores (AVR)

### ArduinoCore AVR → `arduino/ArduinoCore-avr`
Official core for ATmega328P (Uno), ATmega2560 (Mega), ATmega32U4 (Leonardo). Includes bootloaders.
- **Install**: Bundled with Arduino IDE. PlatformIO: `platform = atmelavr`

### ArduinoCore SAMD → `arduino/ArduinoCore-samd`
Core for SAMD21 (Zero, MKR family). 32-bit ARM Cortex-M0+.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### ArduinoCore API → `arduino/ArduinoCore-API`
Hardware-independent API abstraction. Reference for building custom cores.
- **Note**: Not installed directly — used as a dependency by other cores

### MiniCore → `MCUdude/MiniCore`
ATmega8/48/88/168/328/328PB support with custom bootloaders and fuse settings.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### MegaCore → `MCUdude/MegaCore`
ATmega64/128/640/1280/2560 and AT90CAN support.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### MightyCore → `MCUdude/MightyCore`
ATmega1284/644/324/164 — 40-pin AVR DIP chips popular in DIY projects.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### ATTinyCore → `SpenceKonde/ATTinyCore`
Definitive ATtiny series support (1634, 828, x313, x4, x5, x61, x7, x8).
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### megaTinyCore → `SpenceKonde/megaTinyCore`
Modern tinyAVR 0/1/2-series chips with UPDI programming.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### DxCore → `SpenceKonde/DxCore`
AVR DA, DB, DD, EA series. Microchip's newest AVR architecture.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO

### MCU Cores (ARM/ESP)

### STM32 Core → `stm32duino/Arduino_Core_STM32`
Arduino core for hundreds of STM32F/G/H/L/W series MCUs.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO `platform = ststm32`

### ESP8266 Arduino → `esp8266/Arduino`
ESP8266 core for Arduino. WiFi-capable MCU with Arduino compatibility.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO `platform = espressif8266`

### ESP32 Arduino → `espressif/arduino-esp32`
Arduino core for ESP32. Dual-core, WiFi, BLE, extensive peripherals. Apache-2.0.
- **Install**: Add board URL to Arduino IDE Board Manager or use PlatformIO `platform = espressif32`

### ESP-IDF → `espressif/esp-idf`
Full native ESP32 SDK. FreeRTOS, lwIP, WiFi/BT stacks, all peripheral drivers. Prune cloud-specific components.
- **Build**: `. ./export.sh && idf.py build`
- **Docs**: https://docs.espressif.com/projects/esp-idf/

### ESP8266 RTOS SDK → `espressif/ESP8266_RTOS_SDK`
FreeRTOS-based ESP8266 SDK. More capable than the Arduino core.
- **Build**: `. ./export.sh && idf.py build` (ESP-IDF style)
- **Docs**: https://docs.espressif.com/projects/esp8266-rtos-sdk/

### MicroPython → `micropython/micropython`
Lean Python 3 for microcontrollers. Runs on RP2040, ESP32, STM32.
- **Build**: `make -C ports/rp2 BOARD=RPI_PICO` (varies by target)
- **Usage**: Flash `.uf2` → connect REPL via serial → `import machine; machine.Pin(25).toggle()`
- **Docs**: https://docs.micropython.org/

### RTOS

### FreeRTOS → `FreeRTOS/FreeRTOS`
Industry-standard RTOS for microcontrollers. MIT licensed.
- **Build**: Integrated into MCU projects — add source files to your build
- **Docs**: https://www.freertos.org/Documentation/

### Arduino FreeRTOS → `feilipu/Arduino_FreeRTOS_Library`
FreeRTOS ported to Arduino ATmega devices (Uno, Leonardo, Mega).
- **Usage**: `#include <Arduino_FreeRTOS.h>` → `xTaskCreate(taskFunc, "Task1", 128, NULL, 1, NULL);`

### Sensor Libraries

> **Arduino Library Install**: All libraries below install via Arduino IDE Library Manager or PlatformIO `lib install`. For manual install: clone into `~/Arduino/libraries/` or `~/.platformio/lib/`.

### DHT Sensor → `adafruit/DHT-sensor-library`
DHT11/DHT22 temperature and humidity sensors.
- **Usage**: `#include <DHT.h>` → `DHT dht(PIN, DHT22); dht.readTemperature();`

### DS18B20 Temperature → `milesburton/Arduino-Temperature-Control-Library`
DS18B20/DS18S20 waterproof temperature sensors (1-Wire).
- **Usage**: `#include <DallasTemperature.h>` → `sensors.requestTemperatures(); sensors.getTempCByIndex(0);`

### OneWire → `PaulStoffregen/OneWire`
1-Wire protocol driver. Dependency for DS18B20 and other 1-Wire devices.
- **Usage**: `#include <OneWire.h>` → `OneWire ow(PIN); ow.search(addr);`

### Adafruit Sensor → `adafruit/Adafruit_Sensor`
Unified sensor abstraction layer. Common interface for all Adafruit sensors.
- **Usage**: `#include <Adafruit_Sensor.h>` — base class, included by Adafruit sensor libraries automatically

### BME280 → `adafruit/Adafruit_BME280_Library`
Temperature, humidity, and pressure in one chip. Gold standard for weather stations.
- **Usage**: `#include <Adafruit_BME280.h>` → `bme.readTemperature(); bme.readHumidity(); bme.readPressure();`

### TinyGPS++ → `mikalhart/TinyGPSPlus`
NMEA GPS parsing. Passive receive-only. Critical for navigation and timekeeping.
- **Usage**: `#include <TinyGPSPlus.h>` → `gps.encode(Serial1.read()); gps.location.lat();`

### u-blox GNSS → `sparkfun/SparkFun_u-blox_GNSS_Arduino_Library`
Full UBX binary protocol for precision GPS.
- **Usage**: `#include <SparkFun_u-blox_GNSS_Arduino_Library.h>` → `myGNSS.begin(Wire); myGNSS.getLatitude();`

### MPU6050 IMU → `adafruit/Adafruit_MPU6050`
6-axis accelerometer + gyroscope.
- **Usage**: `#include <Adafruit_MPU6050.h>` → `mpu.getEvent(&a, &g, &temp);`

### Madgwick AHRS → `arduino-libraries/MadgwickAHRS`
Sensor fusion algorithm for IMU orientation.
- **Usage**: `#include <MadgwickAHRS.h>` → `filter.updateIMU(gx, gy, gz, ax, ay, az); filter.getRoll();`

### INA219 Power Monitor → `adafruit/Adafruit_INA219`
I2C current/voltage/power monitoring. Essential for battery and solar monitoring.
- **Usage**: `#include <Adafruit_INA219.h>` → `ina219.getCurrent_mA(); ina219.getBusVoltage_V();`

### BatterySense → `rlogiacco/BatterySense`
Battery voltage monitoring and state-of-charge estimation.
- **Usage**: `#include <Battery.h>` → `Battery batt(3000, 4200, A0); batt.level();`

### Display Libraries

> **Arduino Library Install**: All libraries below install via Arduino IDE Library Manager or PlatformIO `lib install`. For manual install: clone into `~/Arduino/libraries/` or `~/.platformio/lib/`.

### u8g2 → `olikraus/u8g2`
Universal monochrome display library. Supports 100+ display controllers (SSD1306, SH1106, etc.).
- **Usage**: `#include <U8g2lib.h>` → `u8g2.drawStr(0, 10, "Hello");`

### TFT_eSPI → `Bodmer/TFT_eSPI`
High-performance color TFT library for ESP32, ESP8266, RP2040, STM32. DMA-based rendering.
- **Usage**: `#include <TFT_eSPI.h>` → `tft.init(); tft.fillScreen(TFT_BLACK); tft.drawString("Hello", 0, 0);`

### SSD1306 OLED → `adafruit/Adafruit_SSD1306`
Library for the most common small OLED displays (128x64, 128x32).
- **Usage**: `#include <Adafruit_SSD1306.h>` → `display.begin(SSD1306_SWITCHCAPVCC, 0x3C); display.print("Hi");`

### Adafruit GFX → `adafruit/Adafruit-GFX-Library`
Core graphics primitives, fonts, bitmaps. Required by Adafruit display drivers.
- **Usage**: `#include <Adafruit_GFX.h>` — base class, included by Adafruit display libraries automatically

### E-Paper (GxEPD2) → `ZinggJM/GxEPD2`
E-Ink display library. Extremely low power, readable in sunlight. Perfect for off-grid dashboards.
- **Usage**: `#include <GxEPD2_BW.h>` → `display.init(); display.drawPaged(drawCallback);`

### LovyanGFX → `lovyan03/LovyanGFX`
High-performance graphics library with touch and sprite support.
- **Usage**: `#include <LovyanGFX.hpp>` → `gfx.init(); gfx.fillScreen(TFT_BLACK);`

### LiquidCrystal → `arduino-libraries/LiquidCrystal`
HD44780-based character LCDs (16x2, 20x4). Indestructible, available everywhere.
- **Usage**: `#include <LiquidCrystal.h>` → `lcd.begin(16, 2); lcd.print("Hello");`

### Motor Control & Actuators

> **Arduino Library Install**: All libraries below install via Arduino IDE Library Manager or PlatformIO `lib install`. For manual install: clone into `~/Arduino/libraries/` or `~/.platformio/lib/`.

### Servo → `arduino-libraries/Servo`
Official RC servo control via PWM.
- **Usage**: `#include <Servo.h>` → `myServo.attach(9); myServo.write(90);`

### StepperDriver → `laurb9/StepperDriver`
A4988, DRV8825 stepper drivers. Essential for CNC, 3D printers, automation.
- **Usage**: `#include <BasicStepperDriver.h>` → `stepper.begin(RPM, MICROSTEPS); stepper.move(200);`

### PCA9685 Servo Driver → `adafruit/Adafruit-PWM-Servo-Driver-Library`
16-channel I2C PWM servo driver.
- **Usage**: `#include <Adafruit_PWMServoDriver.h>` → `pwm.begin(); pwm.setPWM(channel, 0, pulse);`

### PID Library → `br3ttb/Arduino-PID-Library`
PID control algorithm. Critical for temperature control, motor regulation, solar tracking.
- **Usage**: `#include <PID_v1.h>` → `PID myPID(&input, &output, &setpoint, Kp, Ki, Kd, DIRECT);`

### Utility Libraries

> **Arduino Library Install**: All libraries below install via Arduino IDE Library Manager or PlatformIO `lib install`. For manual install: clone into `~/Arduino/libraries/` or `~/.platformio/lib/`.

### ArduinoJson → `bblanchon/ArduinoJson`
JSON parsing/serialization. Essential for structured data handling.
- **Usage**: `#include <ArduinoJson.h>` → `JsonDocument doc; doc["temp"] = 22.5; serializeJson(doc, Serial);`

### SdFat → `greiman/SdFat`
FAT16/FAT32/exFAT for SD cards. Essential for data logging.
- **Usage**: `#include <SdFat.h>` → `sd.begin(CS_PIN); file.open("log.csv", O_WRITE | O_CREAT);`

### SD → `arduino-libraries/SD`
Official Arduino SD card library.
- **Usage**: `#include <SD.h>` → `SD.begin(CS_PIN); File f = SD.open("data.txt", FILE_WRITE);`

### ArduinoThread → `ivanseidel/ArduinoThread`
Simple cooperative threading without RTOS.
- **Usage**: `#include <Thread.h>` → `Thread myThread = Thread(); myThread.onRun(callback);`

### TimerOne → `PaulStoffregen/TimerOne`
Hardware timer for precise interrupts and PWM.
- **Usage**: `#include <TimerOne.h>` → `Timer1.initialize(1000000); Timer1.attachInterrupt(callback);`

### Bounce2 → `thomasfredericks/Bounce2`
Button/switch debouncing. Every project with physical controls needs this.
- **Usage**: `#include <Bounce2.h>` → `Bounce btn; btn.attach(PIN, INPUT_PULLUP); btn.fell();`

### Adafruit BusIO → `adafruit/Adafruit_BusIO`
I2C and SPI bus abstraction. Required dependency for Adafruit libraries.
- **Usage**: `#include <Adafruit_I2CDevice.h>` — base dependency, included by Adafruit sensor/display libraries automatically

### ArduinoLowPower → `arduino-libraries/ArduinoLowPower`
Sleep mode library for SAMD boards. Extends battery life dramatically.
- **Usage**: `#include <ArduinoLowPower.h>` → `LowPower.sleep(60000);`

### ESP32 Camera → `espressif/esp32-camera`
Camera driver for ESP32. Supports OV2640, OV3660 modules. Local-only.
- **Usage**: `#include "esp_camera.h"` → `esp_camera_init(&config); esp_camera_fb_get();`

### OpenLog → `sparkfun/OpenLog`
Hardware data logger. Logs serial data directly to SD card.
- **Usage**: Connect TX to OpenLog RX → `Serial.println(data);` — logged automatically to SD card

### Build Systems

### PlatformIO Core → `platformio/platformio-core`
Build system supporting 1500+ boards. Pre-cache packages for offline use.
- **Install**: `pip install platformio`
- **Usage**: `pio run -e uno` (compile) / `pio run -t upload` (flash)
- **Docs**: https://docs.platformio.org/

### PlatformIO ESP32 Platform → `platformio/platform-espressif32`
Platform definition for ESP32 boards.

### PlatformIO AVR Platform → `platformio/platform-atmelavr`
Platform definition for Atmel AVR boards.

### PCB Design Libraries

### Espressif KiCad Libraries → `espressif/kicad-libraries`
KiCad symbols and footprints for all Espressif SoCs and modules.

### Fritzing → `fritzing/fritzing-app`
Beginner-friendly electronics design tool with breadboard, schematic, and PCB views.
- **Build**: Qt/C++ — `qmake && make`
- **Docs**: https://fritzing.org/learning/
- **Use case**: Visual circuit prototyping and documentation. Simpler than KiCad for beginners and quick wiring diagrams.

### Fritzing Library → `adafruit/Fritzing-Library`
Fritzing parts for Adafruit boards. Visual wiring diagrams.

### SparkFun KiCad Libraries → `sparkfun/SparkFun-KiCad-Libraries`
KiCad symbols and footprints for SparkFun boards.

### SparkFun Eagle Libraries → `sparkfun/SparkFun-Eagle-Libraries`
Eagle PCB footprints. Convertible to KiCad.

### Adafruit CAD Parts → `adafruit/Adafruit_CAD_Parts`
3D CAD models (STEP) for mechanical design integration.

### Arduino Reference & Documentation

### Arduino Language Reference → `arduino/reference-en`
Complete offline Arduino language reference.

### Arduino Docs → `arduino/docs-content`
All Arduino documentation source — tutorials, guides, hardware docs.

### Arduino Examples → `arduino/arduino-examples`
All bundled IDE example sketches.

### LilyGo LoRa Reference → `Xinyuan-LilyGO/LilyGo-LoRa-Series`
Example code and hardware reference for popular Meshtastic-compatible LoRa boards.
