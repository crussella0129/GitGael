# 19 — Simulation

Physics, engineering, and scientific simulation for designing and testing without physical prototypes.

## Scientific Data Formats

### HDF5 → `HDFGroup/hdf5`
Hierarchical Data Format for managing large, complex datasets. The standard for scientific data storage.
- **Build**: `cmake -B build && cmake --build build && cmake --install build`
- **Docs**: https://portal.hdfgroup.org/documentation/
- **Use case**: Required by netCDF, NumPy (HDF5 backend), WRF, and many simulation tools. Stores multi-dimensional arrays, images, tables.

### netCDF → `Unidata/netcdf-c`
Network Common Data Form — the standard format for meteorological, oceanographic, and climate data.
- **Build**: `cmake -B build -DHDF5_DIR=/path/to/hdf5 && cmake --build build`
- **Deps**: HDF5 (above)
- **Docs**: https://www.unidata.ucar.edu/software/netcdf/
- **Use case**: Required dependency for WRF (weather simulation), climate models, and scientific data exchange.

### netCDF Fortran → `Unidata/netcdf-fortran`
Fortran bindings for netCDF. Required by WRF and many meteorological/climate codes written in Fortran.
- **Build**: `cmake -B build && cmake --build build` (requires netcdf-c)
- **Docs**: https://www.unidata.ucar.edu/software/netcdf/

### UDUNITS-2 → `Unidata/UDUNITS-2`
Physical unit arithmetic library (convert between meters/feet, Kelvin/Celsius, etc.). Essential for scientific data processing — data without units is meaningless.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://www.unidata.ucar.edu/software/udunits/

## Visualization

### ParaView → `Kitware/ParaView`
Scientific visualization application built on VTK. 3D rendering of simulation results from OpenFOAM, Elmer, MOOSE, and other solvers.
- **Build**: `cmake -B build && cmake --build build` (large build, many dependencies)
- **Docs**: https://www.paraview.org/documentation/
- **Use case**: Visualize CFD flow fields, FEA stress distributions, temperature gradients, particle trajectories. The standard post-processor for nearly every simulation tool in this section.

### VTK → `Kitware/VTK`
Visualization Toolkit — the foundation library that ParaView is built on. 3D computer graphics, image processing, and visualization.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://vtk.org/documentation/
- **Use case**: Build custom visualization tools or embed 3D rendering in applications. Also used by FreeCAD and other CAD tools.

### ITK → `Kitware/ITK`
Insight Segmentation and Registration Toolkit. Gold standard for medical image processing (CT, MRI, X-ray).
- **Build**: `cmake -B build && cmake --build build` (large build)
- **Docs**: https://itk.org/Doxygen/html/
- **Use case**: Medical imaging pipeline for analyzing CT/MRI scans. Pairs with VTK for 3D visualization.

### CDash → `Kitware/CDash`
Software testing dashboard. Companion to CTest (part of CMake). Tracks build/test results.
- **Build**: `composer install` (PHP/MySQL)
- **Docs**: https://www.cdash.org/

### Ceres Solver → `ceres-solver/ceres-solver`
Nonlinear least squares optimization library. Required for SLAM (Simultaneous Localization and Mapping) and many computer vision/robotics applications.
- **Build**: `cmake -B build && cmake --build build`
- **Deps**: Eigen3, glog, gflags
- **Docs**: http://ceres-solver.org/
- **Use case**: Required by Cartographer (SLAM) for robot/drone navigation. Also used for camera calibration, photogrammetry, and curve fitting.

## Structural / Finite Element Analysis

### Elmer FEM → `ElmerCSC/elmerfem`
Multi-physics FEM solver: structural, thermal, fluid, and electromagnetic.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: ElmerGUI for setup → ElmerSolver for computation → ParaView for visualization
- **Docs**: https://www.elmerfem.org/documentation/
- **Use cases**: Structural analysis, heat transfer, electromagnetics

### FEniCS (DOLFINx) → `FEniCS/dolfinx`
Next-gen finite element platform. Solve arbitrary PDEs with Python.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Define variational problem in Python → solve → visualize
- **Docs**: https://docs.fenicsproject.org/
- **Use cases**: Heat conduction, convection-diffusion, elasticity

### OpenSees → `OpenSees/OpenSees`
Earthquake engineering structural analysis.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://opensees.berkeley.edu/
- **Use cases**: Seismic analysis, nonlinear structural response

### Topology Optimization (topy) → `williamhunter/topy`
Optimize part geometry for minimum material / maximum strength.
- **Install**: `pip install topy`
- **Usage**: Define loads and constraints → optimize → export for 3D printing
- **Use case**: Design lightweight, strong 3D-printed parts

## Fluid Dynamics (CFD)

### OpenFOAM → `OpenFOAM/OpenFOAM-dev`
Industry-standard open-source CFD toolkit.
- **Build**: `./Allwmake -j$(nproc)`
- **Usage**: `blockMesh` → `simpleFoam` → `paraFoam` (visualize)
- **Docs**: https://www.openfoam.com/documentation/
- **Use cases**: Pipe flow, hydraulics, aerodynamics, heat exchangers

### FluidX3D → `ProjectPhysX/FluidX3D`
GPU-accelerated Lattice Boltzmann CFD. Fast visualization.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://github.com/ProjectPhysX/FluidX3D/blob/master/README.md
- **Use case**: Quick flow visualization, complex geometry CFD

### LIGGGHTS → `CFDEMproject/LIGGGHTS-PUBLIC`
Discrete Element Method for granular materials.
- **Build**: `cd src && make auto`
- **Docs**: https://www.cfdem.com/liggghts-open-source-discrete-element-method-particle-simulation-code
- **Use cases**: Soil mechanics, powder processing, mining simulation

## Physics Engines

### Bullet Physics → `bulletphysics/bullet3`
Real-time collision detection and rigid/soft body dynamics.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://pybullet.org/wordpress/
- **Use cases**: Robotics simulation, VR physics, engineering prototyping

### MuJoCo → `google-deepmind/mujoco`
High-fidelity physics for articulated bodies. Best for robotics.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://mujoco.readthedocs.io/

### Gazebo → `gazebosim/gz-sim`
Full robotics simulator with sensors, physics, and ROS integration.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://gazebosim.org/docs

## Chemistry & Thermodynamics

### Cantera → `Cantera/cantera`
Chemical kinetics, thermodynamics, and transport.
- **Build**: `scons build && scons install`
- **Docs**: https://cantera.org/documentation/
- **Use cases**: Combustion modeling, fuel cells, electrochemistry

### RDKit → `rdkit/rdkit`
Cheminformatics toolkit for molecular manipulation.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://www.rdkit.org/docs/
- **Use cases**: Drug synthesis reference, materials science, chemical property computation

## System Simulation

### OpenModelica → `OpenModelica/OpenModelica`
Full Modelica environment for modeling complex systems.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://openmodelica.org/doc/
- **Use cases**: Power plants, HVAC, hydraulic systems, control systems, electrical networks

### MOOSE → `idaholab/moose`
Multiphysics simulation framework from Idaho National Lab.
- **Build**: Follow https://mooseframework.inl.gov/getting_started/
- **Docs**: https://mooseframework.inl.gov/
- **Use cases**: Coupled thermal-mechanical-nuclear simulations

## Electromagnetic / Antenna

### MEEP → `NanoComp/meep`
FDTD electromagnetic simulation from MIT.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: https://meep.readthedocs.io/
- **Use cases**: Antenna design, waveguides, photonics, RF engineering

## Optics

### ray-optics → `mjhoptics/ray-optics`
Geometric ray tracing for optical system design.
- **Install**: `pip install rayoptics`
- **Docs**: https://ray-optics.readthedocs.io/
- **Use cases**: Solar concentrator design, lens systems, telescopes

## Weather & Climate

### WRF (Weather Research and Forecasting) → `WRF-model/WRF`
NCAR/NOAA mesoscale weather prediction model. The standard for numerical weather prediction.
- **Build**: `./configure && ./compile em_real` (Fortran, requires netCDF, MPI)
- **Deps**: Fortran compiler (gfortran), netCDF, HDF5, MPI (optional for parallel)
- **Docs**: https://www2.mmm.ucar.edu/wrf/users/
- **Use case**: Local weather forecasting for agricultural planning, storm prediction, and seasonal planning. Can run on a single machine for local-area forecasts. Input terrain data + initial conditions → get multi-day weather forecasts.
- **Note**: Computationally intensive. A 3-day forecast for a small domain runs in hours on a modern workstation.

## Nuclear / Radiation

### OpenMC → `openmc-dev/openmc`
Monte Carlo particle transport for neutron and photon simulations.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://docs.openmc.org/
- **Use cases**: Radiation shielding design, nuclear reactor physics, criticality safety

## Circuit Simulation

### qucs_s → `ra3xdh/qucs_s`
See [14-manufacturing.md](14-manufacturing.md#circuit-simulation--qucs_s--ra3xdhqucs_s)

### ngspice → `ngspice/ngspice`
See [14-manufacturing.md](14-manufacturing.md#ngspice--ngspicengspice)
