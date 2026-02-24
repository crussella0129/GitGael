# 16 — Silicon & Hardware Fabrication

The complete chain from raw silicon to a working Linux PC — open-source EDA tools, process design kits, CPU cores, SoC frameworks, and open hardware.

## EDA Tools (RTL-to-GDSII)

### Yosys → `YosysHQ/yosys`
Open synthesis suite. Converts Verilog/SystemVerilog to gate-level netlists for both ASIC and FPGA targets.
- **Build**: `make -j$(nproc) && make install`
- **Usage**: `yosys -p "read_verilog design.v; synth -top top; write_json design.json"`
- **Docs**: https://yosyshq.readthedocs.io/
- **Note**: Also listed in [14-manufacturing.md](14-manufacturing.md#yosys--yosyshqyosys) for FPGA use; this is the primary entry

### OpenROAD → `The-OpenROAD-Project/OpenROAD`
Autonomous physical design: floorplanning, placement, CTS, routing, and finishing for ASIC flows.
- **Build**: `./etc/DependencyInstaller.sh && mkdir build && cd build && cmake .. && make -j$(nproc)`
- **Usage**: `openroad -gui` or script via Tcl: `read_lef tech.lef; read_def design.def; detailed_placement`
- **Docs**: https://openroad.readthedocs.io/

### OpenLane → `The-OpenROAD-Project/OpenLane`
Automated RTL-to-GDSII flow wrapping Yosys, OpenROAD, Magic, and KLayout into a push-button pipeline.
- **Build**: `make` (uses Docker) or `pip install openlane` for OpenLane 2
- **Usage**: `flow.tcl -design <name> -config config.json`
- **Docs**: https://openlane.readthedocs.io/
- **Note**: Targets SkyWater 130nm and GlobalFoundries 180nm PDKs

### nextpnr → `YosysHQ/nextpnr`
See [14-manufacturing.md](14-manufacturing.md#nextpnr--yosyshqnextpnr) — FPGA place-and-route for iCE40, ECP5, Gowin, and Nexus.

### Magic → `RTimothyEdwards/magic`
Interactive VLSI layout editor. DRC, extraction, and GDS output for custom cell design.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `magic -T sky130A.tech layout.mag`
- **Docs**: http://opencircuitdesign.com/magic/

### KLayout → `klayout/klayout`
GDSII/OASIS layout viewer and editor with Python/Ruby scripting for DRC and LVS.
- **Build**: `./build.sh -j$(nproc)`
- **Usage**: `klayout design.gds` or run DRC scripts: `klayout -b -r drc_deck.py`
- **Docs**: https://www.klayout.de/doc.html

## Simulation & Verification

### Verilator → `verilator/verilator`
Fastest open-source Verilog/SystemVerilog simulator. Compiles RTL to multi-threaded C++.
- **Build**: `autoconf && ./configure && make -j$(nproc) && make install`
- **Usage**: `verilator --cc design.v --exe sim_main.cpp && make -C obj_dir -f Vdesign.mk`
- **Docs**: https://verilator.org/guide/latest/

### Icarus Verilog → `steveicarus/iverilog`
Full-featured Verilog simulator. Supports IEEE 1364-2005.
- **Build**: `sh autoconf.sh && ./configure && make -j$(nproc) && make install`
- **Usage**: `iverilog -o sim design.v testbench.v && vvp sim`
- **Docs**: https://steveicarus.github.io/iverilog/

### GHDL → `ghdl/ghdl`
Open-source VHDL simulator supporting VHDL-87 through VHDL-2008.
- **Build**: `./configure --prefix=/usr/local && make -j$(nproc) && make install`
- **Usage**: `ghdl -a design.vhd && ghdl -e top && ghdl -r top --wave=out.ghw`
- **Docs**: https://ghdl.github.io/ghdl/

### cocotb → `cocotb/cocotb`
Python-based RTL verification framework. Write testbenches in Python against any simulator.
- **Install**: `pip install cocotb`
- **Usage**: Write `@cocotb.test()` coroutines, run with `make SIM=verilator` or `SIM=icarus`
- **Docs**: https://docs.cocotb.org/

## Process Design Kits

### SkyWater PDK → `google/skywater-pdk`
Open-source 130nm CMOS PDK from SkyWater Technology. First manufacturable open PDK.
- **Install**: `git clone --recursive https://github.com/google/skywater-pdk && make timing`
- **Usage**: Provides cell libraries, I/O, SRAM for use with OpenLane/OpenROAD
- **Docs**: https://skywater-pdk.readthedocs.io/
- **Note**: Actual silicon tapeouts available via Efabless/Google shuttle programs

### open_pdks → `RTimothyEdwards/open_pdks`
PDK installer that builds open-source-compatible PDK files from foundry sources.
- **Build**: `./configure --enable-sky130-pdk && make && make install`
- **Usage**: Produces Magic/KLayout/OpenROAD-compatible tech files
- **Docs**: http://opencircuitdesign.com/open_pdks/

### Caravel → `efabless/caravel`
Standard SoC harness for open-source tapeouts. Provides padframe, power, clocking, and a management core.
- **Build**: `make setup` (installs PDK and dependencies)
- **Usage**: Place your design in `user_project_wrapper`, run `make user_proj_example`
- **Docs**: https://caravel-harness.readthedocs.io/
- **Note**: Submit designs to Efabless chipIgnite shuttle for real fabrication

## Open-Source CPU Cores (RISC-V)

### Rocket Chip → `chipsalliance/rocket-chip`
Parameterizable RISC-V SoC generator written in Chisel. In-order pipeline, MMU, caches.
- **Build**: `sbt "runMain freechips.rocketchip.system.Generator ..."`
- **Usage**: Generates synthesizable Verilog from Scala/Chisel configuration
- **Docs**: https://chipyard.readthedocs.io/en/stable/Generators/Rocket-Chip.html
- **Note**: Foundation of the Chipyard ecosystem

### BOOM → `riscv-boom/riscv-boom`
Out-of-order superscalar RISC-V core. Research-grade high-performance design.
- **Build**: Built via Chipyard: `sbt "runMain chipyard.Generator ..."`
- **Usage**: Configurable pipeline width, branch predictor, and cache hierarchy
- **Docs**: https://docs.boom-core.org/

### CVA6 → `openhwgroup/cva6`
6-stage application-class RISC-V core. Boots Linux. Formerly known as Ariane.
- **Build**: `make verilate` (Verilator simulation) or target FPGA via Vivado/Quartus
- **Usage**: `./work-ver/Variane_testharness <binary>.elf`
- **Docs**: https://docs.openhwgroup.org/projects/cva6-user-manual/

### Ibex → `lowRISC/ibex`
Production-quality 32-bit embedded RISC-V core (RV32IMC). Low area, 2-stage pipeline.
- **Build**: `fusesoc --cores-root=. run --target=lint lowrisc:ibex:ibex_top`
- **Usage**: Integrate into SoC via FuseSoC or manual instantiation
- **Docs**: https://ibex-core.readthedocs.io/
- **Note**: Used as the main processor in OpenTitan

### PicoRV32 → `YosysHQ/picorv32`
Size-optimized 32-bit RISC-V softcore. Fits in tiny FPGAs.
- **Build**: `make -C tests` (runs test suite via Icarus Verilog)
- **Usage**: Instantiate in Verilog: `picorv32 #(.ENABLE_MUL(1)) cpu (...);`
- **Docs**: https://github.com/YosysHQ/picorv32/blob/main/README.md

### VexRiscv → `SpinalHDL/VexRiscv`
Highly configurable RISC-V core written in SpinalHDL. Plugin-based architecture.
- **Build**: `sbt "runMain vexriscv.demo.GenFull"`
- **Usage**: Pick plugins (MMU, FPU, caches) to generate custom CPU configurations
- **Docs**: https://github.com/SpinalHDL/VexRiscv/blob/master/README.md
- **Note**: Popular in LiteX SoC designs

### OpenSBI → `riscv-software-src/opensbi`
RISC-V Supervisor Binary Interface firmware. Provides M-mode runtime services for S-mode OS.
- **Build**: `make CROSS_COMPILE=riscv64-linux-gnu- PLATFORM=generic FW_PAYLOAD_PATH=u-boot.bin`
- **Usage**: Loaded before bootloader; provides SBI calls to Linux kernel
- **Docs**: https://github.com/riscv-software-src/opensbi/blob/master/docs/

## SoC Frameworks & Memory

### Chipyard → `ucb-bar/chipyard`
Unified RISC-V SoC design framework integrating Rocket, BOOM, accelerators, and peripherals.
- **Build**: `./scripts/init-submodules-no-riscv-tools.sh && source env.sh && make`
- **Usage**: Configure SoC in Scala, generate Verilog, run on FPGA or simulate
- **Docs**: https://chipyard.readthedocs.io/
- **Note**: Full flow from RTL generation through VLSI (via Hammer)

### LiteX → `enjoy-digital/litex`
Python-based SoC builder using Migen HDL. Rapid SoC prototyping for FPGAs.
- **Install**: `pip install litex` or `./litex_setup.py --init --install`
- **Usage**: `python -m litex_boards.targets.digilent_arty --build --load`
- **Docs**: https://github.com/enjoy-digital/litex/wiki
- **Note**: Supports VexRiscv, Rocket, and other CPU cores

### LiteDRAM → `enjoy-digital/litedram`
Configurable DRAM controller (DDR2/3/4, LPDDR4, SDR) for LiteX SoCs.
- **Build**: Integrated into LiteX builds
- **Usage**: `litedram_gen soc.yml` to generate standalone controller
- **Docs**: https://github.com/enjoy-digital/litedram/blob/master/README.md

### LiteEth → `enjoy-digital/liteeth`
Lightweight Ethernet core (MAC + PHY + UDP/IP stack) for LiteX SoCs.
- **Build**: Integrated into LiteX builds
- **Usage**: `liteeth_gen soc.yml` to generate standalone core
- **Docs**: https://github.com/enjoy-digital/liteeth/blob/master/README.md

### LitePCIe → `enjoy-digital/litepcie`
PCIe core for LiteX SoCs. Gen1/Gen2 endpoint with DMA.
- **Build**: Integrated into LiteX builds; Linux driver in `software/`
- **Usage**: `litepcie_gen soc.yml` to generate standalone core
- **Docs**: https://github.com/enjoy-digital/litepcie/blob/master/README.md

## Open-Source GPU

### Vortex → `vortexgpgpu/vortex`
RISC-V-based GPGPU with OpenCL support. Full open-source GPU pipeline.
- **Build**: `make -C runtime && make -C driver && make -C tests`
- **Usage**: Write OpenCL kernels, compile with Vortex toolchain, run on FPGA or simulator
- **Docs**: https://vortex.cc.gatech.edu/
- **Note**: Research platform for GPU architecture exploration

## Security Silicon

### OpenTitan → `lowRISC/opentitan`
Google-backed open-source silicon root of trust. Hardware security module on a chip.
- **Build**: `./bazelisk.sh build //sw/device/...` (software) or `fusesoc` for RTL
- **Usage**: Secure boot, key management, cryptographic acceleration
- **Docs**: https://opentitan.org/documentation/
- **Note**: Uses Ibex core; targets real silicon fabrication

## Architecture Simulation

### gem5 → `gem5/gem5`
Detailed computer architecture simulator. Cycle-accurate CPU, memory, and network modeling.
- **Build**: `scons build/X86/gem5.opt -j$(nproc)`
- **Usage**: `build/X86/gem5.opt configs/example/se.py -c ./benchmark`
- **Docs**: https://www.gem5.org/documentation/
- **Use cases**: CPU microarchitecture research, cache hierarchy exploration, memory system design

## Open Hardware Computers

### MNT Reform → `MNT/reform`
Fully open-source modular laptop. Open schematics, PCB, chassis, and firmware.
- **Build**: KiCad for PCB, FreeCAD for mechanical — all source files included
- **Usage**: Assemble from kit or modify designs for custom configurations
- **Docs**: https://mntre.com/reform/
- **Note**: Supports swappable CPU modules (i.MX8M, RK3588, RISC-V)

### Precursor → `betrusted-io/betrusted-wiki`
Open-source secure handheld device with FPGA-based SoC. Hardware-verifiable security.
- **Build**: Betrusted SoC built with LiteX + Renode for simulation
- **Usage**: Xous OS for secure messaging, TOTP, and password management
- **Docs**: https://precursor.dev/
- **Note**: Designed so the entire hardware+software stack can be audited

## Educational

### Tiny Tapeout → `TinyTapeout/tinytapeout`
Community silicon manufacturing program. Get your digital design fabricated on real chips.
- **Usage**: Write Verilog fitting in a tile, submit via GitHub Actions, receive packaged IC
- **Docs**: https://tinytapeout.com/
- **Note**: Lowest-cost path to custom silicon (~$100 per tile per shuttle run)

## HDL Languages & Tooling

### SpinalHDL → `SpinalHDL/SpinalHDL`
Scala-based hardware description language. Generates VHDL/Verilog with strong type safety.
- **Build**: `sbt publishLocal` (library) or use as dependency in SBT projects
- **Usage**: `SpinalVerilog(new MyComponent)` generates synthesizable Verilog
- **Docs**: https://spinalhdl.github.io/SpinalDoc-RTD/

### Amaranth → `amaranth-lang/amaranth`
Python-based HDL (successor to nMigen). Productive hardware design with Python ecosystem.
- **Install**: `pip install amaranth`
- **Usage**: Define `Elaboratable` classes, generate Verilog, simulate, or target FPGAs
- **Docs**: https://amaranth-lang.org/docs/amaranth/

### Chisel → `chipsalliance/chisel`
Scala-embedded hardware description language. Powers Rocket Chip and BOOM.
- **Build**: `sbt compile` (library) or use as dependency in SBT projects
- **Usage**: `class MyModule extends Module { val io = IO(...) }`
- **Docs**: https://www.chisel-lang.org/docs

## PCB & Component Design

### LibrePCB → `LibrePCB/LibrePCB`
Modern open-source PCB design tool with built-in library management.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Schematic → Board layout → Generate Gerbers for fabrication
- **Docs**: https://librepcb.org/docs/
- **Note**: Supplements KiCad — see [14-manufacturing.md](14-manufacturing.md#kicad--kicad-source-mirror-fork-of-kicadkicad-source-mirror)

### ngspice → `ngspice/ngspice`
See [14-manufacturing.md](14-manufacturing.md#ngspice--ngspicengspice) — SPICE circuit simulation engine.
