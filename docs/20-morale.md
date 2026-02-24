# 20 — Morale & Entertainment

Games, music, art, and entertainment. People need more than survival.

## Game Engines

### Godot → `godotengine/godot`
Full 2D/3D game engine with visual editor. No licensing fees.
- **Build**: `scons platform=linuxbsd`
- **Usage**: Full IDE — create games, simulations, educational tools, interactive stories
- **Docs**: https://docs.godotengine.org/
- **Beyond games**: Training simulators, physics demos, UI prototyping, educational software

## Emulators

### RetroArch → `libretro/RetroArch`
Multi-system emulator frontend. One app runs NES, SNES, Genesis, N64, PS1, GBA, Arcade, and 80+ other systems via loadable cores.
- **Build**: `./configure && make -j$(nproc) && make install`
- **Usage**: Download cores (emulator backends), load ROMs, play. Supports shaders, save states, netplay, achievements.
- **Docs**: https://docs.libretro.com/
- **Why this over individual emulators?**: One build replaces dozens of standalone emulators. Consistent UI, controller mapping, and save state system across all platforms.

### MAME → `mamedev/mame`
Multi-machine arcade emulator. 40,000+ supported games.
- **Build**: `make -j$(nproc)`
- **Usage**: `mame <romname>` — requires ROM files (acquire legally)
- **Docs**: https://docs.mamedev.org/

### NES Emulator → `fogleman/nes`
Nintendo Entertainment System emulator written in Go.
- **Build**: `go build`
- **Usage**: `./nes romfile.nes`

### Minecraft Clone → `fogleman/Craft`
Simple Minecraft clone in C. Runs on anything.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Explore, build, create. Spatial planning tool and entertainment.

## Music

### MuseScore → `musescore/MuseScore`
Professional music notation software.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Compose, arrange, transpose, print sheet music
- **Docs**: https://musescore.org/en/handbook
- **Value**: Preserve and create music; teach instruments; cultural continuity

### LMMS → `LMMS/lmms`
Digital audio workstation. Create music with synthesizers and samples.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Piano roll, beat editor, synths, effects, mixing
- **Docs**: https://docs.lmms.io/

### Ardour → `Ardour/ardour`
Professional audio workstation for recording and mixing.
- **Build**: `./waf configure && ./waf && ./waf install`
- **Usage**: Multi-track recording, mixing, mastering
- **Docs**: https://manual.ardour.org/
- **Use cases**: Record music, produce radio broadcasts, create training audio

## Visual Art

### GIMP → `GNOME/gimp`
See [04-desktop.md](04-desktop.md#gimp--gnomegimp) — image editing

### Inkscape → `inkscape/inkscape`
See [04-desktop.md](04-desktop.md#inkscape--inkscapeinkscape) — vector graphics

### Graphite → `GraphiteEditor/Graphite`
2D vector graphics editor built with Rust and WebGPU.
- **Build**: `cargo build --release`
- **Docs**: https://graphite.rs/

### Pinta → `PintaProject/Pinta`
Simple image editor (Paint.NET-like).
- **Build**: `dotnet build`
- **Docs**: https://www.pinta-project.com/

### Stable Diffusion → `AUTOMATIC1111/stable-diffusion-webui`
See [18-ai-ml.md](18-ai-ml.md#stable-diffusion-webui--automatic1111stable-diffusion-webui) — AI art generation

## Video

### mpv → `mpv-player/mpv`
See [04-desktop.md](04-desktop.md#mpv--mpv-playermpv) — plays anything

### VLC → `videolan/vlc`
See [04-desktop.md](04-desktop.md#vlc--videolanvlc) — universal media player

### OBS Studio → `obsproject/obs-studio`
See [04-desktop.md](04-desktop.md#obs-studio--obsprojectobs-studio) — screen recording

## Strategy Games

### Lichess → `lichess-org/lila`
**17.8k+ stars.** Self-hostable chess server. Play, analyze, study, and run tournaments — all offline.
- **Build**: Scala/sbt — `sbt compile` (requires JDK, MongoDB, Redis)
- **Features**: Online play, puzzles, analysis board, opening explorer, tournaments, studies
- **Docs**: https://github.com/lichess-org/lila/blob/master/README.md
- **Use case**: Chess is the oldest competitive game in continuous play. Lichess provides the full experience — puzzles, analysis, and multi-player — on a LAN with no internet.

## Pre-Collapse Entertainment Archival

Use `yt-dlp` to download while internet exists:
- Educational lectures and courses
- Music videos and performances
- Repair and how-to guides
- Documentaries
- Movies and series (where legal)

```bash
# Download entire YouTube playlists
yt-dlp -f "best[height<=1080]" --write-subs --embed-subs \
  "https://youtube.com/playlist?list=PLxxxxxxx"

# Download with metadata
yt-dlp --write-info-json --write-thumbnail --embed-thumbnail \
  "https://youtube.com/watch?v=xxxxx"
```

## Why Morale Matters

In any survival scenario, psychological well-being determines long-term success. Music, games, art, and stories aren't luxuries — they're what keep communities cohesive and individuals functional. Every historical civilization preserved its art alongside its tools.
