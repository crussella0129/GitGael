# 02 — Toolchains & Programming Languages

Every compiler, interpreter, and learning resource in the archive.

## Systems Languages

### C/C++ — GCC → `gcc-mirror/gcc`
The GNU Compiler Collection. Compiles C, C++, Fortran, Go, and more.
- **Build**: `./contrib/download_prerequisites && mkdir build && cd build && ../configure --enable-languages=c,c++ --disable-multilib && make -j$(nproc)`
- **Usage**: `gcc -o program program.c` / `g++ -o program program.cpp`
- **Docs**: https://gcc.gnu.org/onlinedocs/
- **Learn C**: `TheAlgorithms/C` fork, K&R "The C Programming Language" (not on GH)
- **Learn C++**: `CppCoreGuidelines` fork, `C-Plus-Plus` (algorithms), `draft` (C++ standard draft)

### NASM → `nasm` (fork of `netwide-assembler/nasm`)
x86/x64 assembler. Essential for low-level programming, bootloaders, and OS development.
- **Build**: `./autogen.sh && ./configure && make -j$(nproc) && make install`
- **Usage**: `nasm -f elf64 program.asm -o program.o && ld program.o -o program`
- **Docs**: https://nasm.us/doc/
- **Use case**: Write bootloader code, kernel assembly stubs, hand-optimized routines. Required for many bare-metal OS tutorials in section 12.

### C/C++ — LLVM/Clang → `llvm/llvm-project`
Modern compiler infrastructure with Clang C/C++ frontend.
- **Build**: `cmake -S llvm -B build -G Ninja -DLLVM_ENABLE_PROJECTS="clang;lld" && ninja -C build`
- **Usage**: `clang -o program program.c` / `clang++ -o program program.cpp`
- **Docs**: https://llvm.org/docs/

### Rust → `rust-lang/rust`
Memory-safe systems language. Half the desktop stack is written in it.
- **Build**: `./x.py build && ./x.py install`
- **Usage**: `rustc program.rs` or use `cargo build`
- **Docs**: https://doc.rust-lang.org/
- **Tooling**:
  - `cargo` (fork of `rust-lang/cargo`) → Rust package manager and build system
  - `rust-clippy` (fork of `rust-lang/rust-clippy`) → Linter with 700+ lint rules
  - `rustfmt` (fork of `rust-lang/rustfmt`) → Code formatter
  - `mdBook` (fork of `rust-lang/mdBook`) → Create books from Markdown (powers Rust docs, this archive's format)
- **Learn**:
  - `book-1` → **The Rust Programming Language** (the official book)
  - `rustlings` → Small exercises to learn Rust syntax
  - `rust-by-example` → Learn by annotated examples
  - `Rust-1` → Algorithm implementations in Rust
  - `rust-raspberrypi-OS-tutorials` → Bare-metal OS on Pi in Rust

### Go → `golang/go`
Google's compiled language. Simple, fast, great for networking/infrastructure.
- **Build**: Bootstraps from Go 1.4 or C compiler: `cd src && ./make.bash`
- **Usage**: `go build program.go && ./program`
- **Docs**: https://go.dev/doc/
- **Standard library extensions**:
  - `tools-1` (fork of `golang/tools`) → Go development tools (gopls, goimports, etc.)
  - `crypto` (fork of `golang/crypto`) → Extended crypto: SSH, ACME, bcrypt, nacl, PKCS12
  - `net` (fork of `golang/net`) → Extended networking: HTTP/2, WebSocket, proxy, ICMP
- **Learn**:
  - `gobyexample` → Annotated Go examples
  - `awesome-go` → Curated list of Go packages
  - `Go-1` → Algorithm implementations in Go

### Zig → `ziglang/zig`
Modern C replacement with no hidden control flow, comptime, and C interop.
- **Build**: Bootstraps via a C++ compiler: `cmake -B build && cmake --build build`
- **Usage**: `zig build-exe program.zig`
- **Docs**: https://ziglang.org/documentation/
- **Note**: Can also compile C/C++ code and cross-compile to any target

### Nim → `nim-lang/Nim`
Python-like syntax that compiles to C/C++/JS.
- **Build**: `sh build_all.sh`
- **Usage**: `nim c -r program.nim`
- **Docs**: https://nim-lang.org/docs/manual.html

### V → `vlang/v`
Simple, fast compiled language inspired by Go/Rust/Nim.
- **Build**: `make`
- **Usage**: `v run program.v`
- **Docs**: https://github.com/vlang/v/blob/master/doc/docs.md

### Crystal → `crystal-lang/crystal`
Ruby-like syntax, compiled, statically typed.
- **Build**: Requires existing Crystal compiler to bootstrap
- **Usage**: `crystal build program.cr`
- **Docs**: https://crystal-lang.org/docs/

### D → `dlang/dmd`
Systems language with GC, templates, and high-level features.
- **Build**: `./compiler/src/build.d`
- **Usage**: `dmd program.d && ./program`
- **Docs**: https://dlang.org/spec/spec.html

## Dynamic / Scripting Languages

### Python → `python/cpython`
The language half the AI/ML world runs on.
- **Build**: `./configure --enable-optimizations && make -j$(nproc) && make install`
- **Usage**: `python3 script.py`
- **Docs**: https://docs.python.org/3/
- **Learn**: `Python` fork (algorithms), `free-programming-books` has extensive Python section
- **Package manager**: `pip` fork (`pypa/pip`)

### Ruby → `ruby/ruby`
Dynamic language known for Rails, scripting, and DSLs.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `ruby script.rb`
- **Docs**: https://docs.ruby-lang.org/

### mruby → `mruby/mruby`
Lightweight Ruby for embedding in C/C++ applications.
- **Build**: `rake`
- **Docs**: https://mruby.org/docs/

### Lua → `lua/lua`
Tiny embeddable scripting language (~30KB). Used in games, nginx, neovim.
- **Build**: `make linux` (or `make macosx`, `make posix`)
- **Usage**: `lua script.lua`
- **Docs**: https://www.lua.org/manual/5.4/

### Elixir → `elixir-lang/elixir`
Functional language on the Erlang VM. Great for distributed/fault-tolerant systems.
- **Build**: `make` (requires Erlang/OTP)
- **Usage**: `elixir script.exs`
- **Docs**: https://hexdocs.pm/elixir/

### Erlang/OTP → `erlang/otp`
Battle-tested platform for telecom-grade concurrent systems. Elixir runs on this.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `erl` (REPL) or `erlc module.erl`
- **Docs**: https://www.erlang.org/docs

### Perl → `perl5` (fork of `Perl/perl5`)
Essential scripting language. Required by the Linux kernel build system, autoconf, and countless build scripts.
- **Build**: `sh Configure -de && make -j$(nproc) && make install`
- **Usage**: `perl script.pl`
- **Docs**: https://perldoc.perl.org/
- **Note**: Many GNU projects (including GCC and the kernel) require Perl to build. Non-optional for bootstrapping.

## Typed / Functional Languages

### Haskell (GHC) → `ghc/ghc`
Purely functional language with powerful type system.
- **Build**: `./boot && ./configure && make -j$(nproc)` (complex bootstrap process)
- **Usage**: `ghc -o program program.hs && ./program`
- **Docs**: https://www.haskell.org/documentation/
- **Learn**: `learnhaskell` fork — curated path for learning Haskell

### OCaml → `ocaml/ocaml`
ML-family functional language. Fast, practical, great type inference.
- **Build**: `./configure && make -j$(nproc) world.opt && make install`
- **Usage**: `ocamlfind ocamlopt -package core program.ml -o program`
- **Docs**: https://ocaml.org/docs

### Racket → `racket/racket`
Scheme descendant. Language-oriented programming, great for education.
- **Build**: `make` in `racket/src`
- **Usage**: `racket script.rkt`
- **Docs**: https://docs.racket-lang.org/

## JVM Languages

### Java (OpenJDK) → `openjdk/jdk`
The JVM and Java compiler/runtime.
- **Build**: `bash configure && make images` (requires a bootstrap JDK)
- **Usage**: `javac Program.java && java Program`
- **Docs**: https://docs.oracle.com/en/java/ and https://dev.java/learn/

### Kotlin → `JetBrains/kotlin`
Modern JVM language by JetBrains. Concise, safe, interops with Java.
- **Build**: `./gradlew dist` (requires JDK)
- **Usage**: `kotlinc program.kt -include-runtime -d program.jar && java -jar program.jar`
- **Docs**: https://kotlinlang.org/docs/

## Scientific / Specialized

### R → `r-source` (fork of `wch/r-source`)
The standard language for statistics, data analysis, and epidemiology. Critical for agriculture, medical research, and population health.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `Rscript script.R` or `R` (interactive REPL)
- **Docs**: https://cran.r-project.org/manuals.html
- **Use case**: Crop yield analysis, epidemiological modeling, weather data analysis, clinical trial statistics. Thousands of packages for every scientific domain.
- **Note**: GitHub mirror of the official R SVN repository.

### Julia → `JuliaLang/julia`
High-performance scientific computing with Python-like syntax.
- **Build**: `make -j$(nproc)` (takes a while)
- **Usage**: `julia script.jl`
- **Docs**: https://docs.julialang.org/

### TypeScript → `microsoft/TypeScript`
Typed superset of JavaScript. Compiles to JS.
- **Build**: `npm install && npm run build`
- **Usage**: `tsc program.ts && node program.js`
- **Docs**: https://www.typescriptlang.org/docs/

### Node.js → `nodejs/node`
JavaScript runtime. Needed to build many desktop apps (Electron-based).
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: `node script.js`
- **Docs**: https://nodejs.org/docs/

### Swift → `swiftlang/swift`
Apple's systems language. Also runs on Linux.
- **Build**: `./utils/build-script --release` (complex, many deps)
- **Usage**: `swift script.swift` or `swiftc -o program program.swift`
- **Docs**: https://www.swift.org/documentation/

## Build Systems

### CMake → `Kitware/CMake`
Cross-platform build system generator. Most C/C++ projects use this.
- **Build**: `./bootstrap && make -j$(nproc) && make install`
- **Usage**: `cmake -B build && cmake --build build`
- **Docs**: https://cmake.org/documentation/

### Meson → `mesonbuild/meson`
Modern build system focused on speed. Used by GNOME, systemd, PipeWire.
- **Install**: `pip install meson` or build from source
- **Usage**: `meson setup build && ninja -C build`
- **Docs**: https://mesonbuild.com/

### pip → `pypa/pip`
Python package installer.
- **Usage**: `pip install <package>`
- **Docs**: https://pip.pypa.io/

### GNU Make → `make` (fork of `mirror/make`)
The foundational build tool. Nearly every C/C++ project uses Make. Required by GCC, the Linux kernel, and hundreds of other projects.
- **Build**: Bootstraps itself — `./bootstrap && ./configure && make && make install`
- **Usage**: `make` / `make -j$(nproc)` / `make install`
- **Docs**: https://www.gnu.org/software/make/manual/
- **Note**: GitHub mirror of GNU Savannah original. Without Make, you cannot build most of this archive.

## GCC Build Dependencies

These libraries are **required** to compile GCC. Without them, you cannot build the compiler.

### GMP → `gmp` (fork of `gmp-mirror/gmp`)
GNU Multiple Precision Arithmetic Library. Required by GCC for constant folding and optimization.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Docs**: https://gmplib.org/manual/

### MPFR → `mpfr` (fork of `BrianGladman/mpfr`)
Multiple Precision Floating-Point Reliable library. Required by GCC.
- **Build**: `./configure --with-gmp=/usr/local && make -j$(nproc) && make install`
- **Docs**: https://www.mpfr.org/mpfr-current/mpfr.html

### MPC → `mpc` (fork of `BrianGladman/mpc`)
Multiple Precision Complex library. Required by GCC.
- **Build**: `./configure --with-gmp=/usr/local --with-mpfr=/usr/local && make -j$(nproc) && make install`

## GNU Autotools

The build infrastructure that most GNU software depends on. Without these, `./configure && make` does not exist.

### GNU Autoconf → `autoconf` (fork of `autotools-mirror/autoconf`)
Generates `./configure` scripts from `configure.ac`. Required by the majority of C/C++ projects in this archive.
- **Build**: `./bootstrap && ./configure && make && make install`
- **Deps**: m4, Perl
- **Docs**: https://www.gnu.org/software/autoconf/manual/

### GNU Automake → `automake` (fork of `autotools-mirror/automake`)
Generates `Makefile.in` files from `Makefile.am`. Paired dependency with Autoconf.
- **Build**: `./bootstrap && ./configure && make && make install`
- **Deps**: autoconf, Perl
- **Docs**: https://www.gnu.org/software/automake/manual/

### GNU Libtool → `libtool` (fork of `autotools-mirror/libtool`)
Shared library management across platforms. Used by autoconf/automake projects.
- **Build**: `./bootstrap && ./configure && make && make install`
- **Docs**: https://www.gnu.org/software/libtool/manual/

### m4 → `m4` (fork of `autotools-mirror/m4`)
GNU macro processor. Autoconf will not run without it.
- **Build**: `./bootstrap && ./configure && make && make install`
- **Docs**: https://www.gnu.org/software/m4/manual/

### Flex → `flex` (fork of `westes/flex`)
Fast lexical analyzer generator. Required to build GCC, the Linux kernel, and many parsers.
- **Build**: `./autogen.sh && ./configure && make -j$(nproc) && make install`
- **Docs**: https://github.com/westes/flex/blob/master/doc/flex.texi

### Bison → `bison` (fork of `akimd/bison`)
GNU parser generator. Required by GCC, the Linux kernel, and many GNU tools.
- **Build**: `./bootstrap && ./configure && make -j$(nproc) && make install`
- **Docs**: https://www.gnu.org/software/bison/manual/

### pkgconf → `pkgconf` (fork of `pkgconf/pkgconf`)
Library discovery tool (pkg-config replacement). Nearly every `./configure` and `meson` project uses it to find dependencies.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Docs**: https://gitea.treesitter.net/pkgconf/pkgconf/src/branch/master/README.md
- **Note**: Drop-in replacement for the original pkg-config. Faster and more correct.

### libffi → `libffi` (fork of `libffi/libffi`)
Foreign Function Interface library. Required by Python (ctypes), Ruby, GCC, and many language runtimes.
- **Build**: `./autogen.sh && ./configure && make -j$(nproc) && make install`
- **Docs**: https://sourceware.org/libffi/

### gettext → `gettext` (fork of `autotools-mirror/gettext`)
GNU internationalization and localization framework. Required at build time by many GNU projects.
- **Build**: `./autogen.sh && ./configure && make -j$(nproc) && make install`
- **Docs**: https://www.gnu.org/software/gettext/manual/

### Texinfo → `texinfo` (fork of `autotools-mirror/texinfo`)
GNU documentation system. The `makeinfo` command is called during the build of GCC and most GNU projects.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Usage**: `makeinfo manual.texi` / `info manual`
- **Docs**: https://www.gnu.org/software/texinfo/manual/

### Ninja → `ninja` (fork of `ninja-build/ninja`)
Small, fast build system. Meson and many CMake projects use Ninja as their build backend.
- **Build**: `./configure.py --bootstrap`
- **Usage**: `ninja -C build`
- **Docs**: https://ninja-build.org/manual.html
- **Note**: When docs say `meson setup build && ninja -C build`, Ninja is what actually runs the build.

### Cosmopolitan Libc → `cosmopolitan` (fork of `jart/cosmopolitan`)
Build-once-run-anywhere C library. Compile a single binary that runs on Linux, macOS, Windows, FreeBSD, and OpenBSD without modification.
- **Build**: `make -j$(nproc)`
- **Docs**: https://justine.lol/cosmopolitan/
- **Use case**: Create portable tools that work across all platforms in the archive.

## Learning Resources

### free-programming-books → `EbookFoundation/free-programming-books`
**382k+ stars.** Massive curated list of free programming books in 30+ languages. The single most valuable learning resource in this archive.

### exercism → `exercism/exercism`
Practice exercises in 70+ languages with mentoring tracks.

### TheAlgorithms
Algorithm implementations with explanations:
- `Python` — Python implementations
- `C` — C implementations
- `C-Plus-Plus` — C++ implementations
- `Rust-1` — Rust implementations
- `Go-1` — Go implementations

### Language-Specific
- `book-1` → The Rust Programming Language (official book)
- `rustlings` → Rust exercises for beginners
- `rust-by-example` → Learn Rust through examples
- `learnhaskell` → Curated Haskell learning path
- `gobyexample` → Go examples with annotations
- `CppCoreGuidelines` → C++ best practices by Bjarne Stroustrup
- `draft` → The C++ Standard draft (latest working document)
- `awesome-go` → Curated Go libraries and frameworks

## Rust FFI & Bindings

### UniFFI → `uniffi-rs` (fork of `mozilla/uniffi-rs`)
Generate multi-language bindings from Rust. One Rust library → Python, Kotlin, Swift, Ruby bindings.
- **Build**: `cargo build --release`
- **Usage**: Define interface in UDL → `uniffi-bindgen generate` → get bindings for target language
- **Docs**: https://mozilla.github.io/uniffi-rs/
- **Use case**: Write core logic once in Rust, use it from any language

### cbindgen → `cbindgen` (fork of `mozilla/cbindgen`)
Generate C/C++ header files from Rust source code for FFI.
- **Build**: `cargo build --release`
- **Usage**: `cbindgen --crate my_crate --output my_crate.h`
- **Docs**: https://github.com/mozilla/cbindgen/blob/master/docs.md
- **Use case**: Expose Rust libraries to C/C++ projects across the archive

## Networking Protocols

### Neqo → `neqo` (fork of `mozilla/neqo`)
QUIC transport protocol implementation in Rust (HTTP/3 foundation).
- **Build**: `cargo build --release`
- **Docs**: https://github.com/mozilla/neqo
- **Use case**: Modern encrypted-by-default networking. QUIC replaces TCP+TLS with a single, faster protocol.

## Serialization & Data Interchange

### Protocol Buffers → `protobuf` (fork of `protocolbuffers/protobuf`)
Language-neutral serialization format with code generators for C++, Java, Python, Go, etc.

### FlatBuffers → `flatbuffers` (fork of `google/flatbuffers`)
Zero-copy serialization library — access data without parsing/unpacking.

### Apache Thrift → `thrift` (fork of `apache/thrift`)
Cross-language RPC framework with IDL and code generation for 15+ languages.

## Text Processing

### RE2 → `re2` (fork of `google/re2`)
Fast, safe regex engine — guarantees linear time matching (no ReDoS).

## TypeScript Ecosystem

### TypeScript (Go Port) → `typescript-go` (fork of `microsoft/typescript-go`)
Native Go port of the TypeScript compiler — faster, smaller, the future of tsc.

## Developer Standards

### Language Server Protocol → `language-server-protocol` (fork of `microsoft/language-server-protocol`)
LSP specification — the universal standard for editor-language integration.

### Draco → `draco` (fork of `google/draco`)
3D mesh and point cloud compression/decompression library.
