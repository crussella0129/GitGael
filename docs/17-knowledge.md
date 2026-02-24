# 17 — Offline Knowledge

Tools for preserving, accessing, and processing human knowledge without internet.

## Offline Encyclopedias

### Kiwix → `kiwix/kiwix-desktop`, `kiwix/kiwix-tools`, `kiwix/kiwix-build`
Offline reader for Wikipedia, Stack Overflow, Project Gutenberg, Khan Academy, and more.
- **Install**: Binary downloads from https://kiwix.org/en/applications/ or build from source
- **Features**: GUI reader for ZIM files (`kiwix-desktop`), CLI tools including `kiwix-serve` HTTP server (`kiwix-tools`), build system (`kiwix-build`)
- **Docs**: https://wiki.kiwix.org/
- **Download ZIM files**: https://wiki.kiwix.org/wiki/Content — get these BEFORE collapse:
  - `wikipedia_en_all.zim` (~100GB) — Complete English Wikipedia
  - `stackoverflow.com_en_all.zim` (~50GB) — All Stack Overflow Q&A
  - `gutenberg_en_all.zim` (~60GB) — 70,000+ Project Gutenberg ebooks

### Internet-in-a-Box → `iiab/iiab`
**1.7k stars.** Raspberry Pi-based Library of Alexandria. Goes beyond Kiwix.
- **Install**: `curl d.iiab.io/install.txt | sudo bash`
- **Features**: Wikipedia, Khan Academy, OpenStreetMap, medical references, educational content — all served from a single Raspberry Pi
- **Docs**: https://wiki.iiab.io/
- **Hardware**: Raspberry Pi 4 + large SD card or USB drive

### DevDocs → `freeCodeCamp/devdocs`
**38k+ stars.** Offline API documentation browser for 600+ libraries and frameworks.
- **Install**: `bundle install && thor docs:download --all` (downloads all docs)
- **Features**: Fast search, offline mode, dark theme, 600+ documentation sets
- **Docs**: https://github.com/freeCodeCamp/devdocs/blob/main/README.md
- **Key**: Download ALL docs while internet exists

## Digital Preservation

### ArchiveBox → `ArchiveBox/ArchiveBox`
**27k+ stars.** Self-hosted web archiving. Takes URLs/browser history/bookmarks and saves HTML, JS, PDFs, media, and more.
- **Install**: `pip install archivebox` or Docker
- **Features**: Saves pages as HTML, PDF, PNG screenshots, WARC, media files. Uses standard tools (Chrome, wget, yt-dlp). All output in standard readable formats guaranteed to last decades
- **Docs**: https://docs.archivebox.io/

### Heritrix → `internetarchive/heritrix3`
**3.2k stars.** The Internet Archive's open-source, extensible, web-scale, archival-quality web crawler.
- **Install**: Download release JAR, requires Java 8+
- **Features**: Web-scale crawling, WARC output, extensive configuration, the same crawler that powers the Wayback Machine
- **Docs**: https://github.com/internetarchive/heritrix3/wiki

### Webrecorder pywb → `webrecorder/pywb`
**1.6k stars.** Core Python web archiving toolkit for high-fidelity replay and recording of web archives.
- **Install**: `pip install pywb` or Docker (`webrecorder/pywb`)
- **Features**: WARC file replay, recording proxy, Wayback Machine-compatible, embargo/access control, localization
- **Docs**: https://github.com/webrecorder/pywb/wiki

### HTTrack → `xroche/httrack`
**4.3k stars.** Open-source website copier — download entire websites for offline browsing.
- **Install**: `apt install httrack` or build from source (C, GPL v3)
- **Features**: Recursive download, resume interrupted downloads, update existing mirrors, GUI and CLI, cross-platform (Linux, Windows, Android)
- **Docs**: https://www.httrack.com/

### Zotero → `zotero/zotero`
**13.5k stars.** Free, open-source reference and research management tool.
- **Install**: Download from https://www.zotero.org/ or build from source
- **Features**: Collect, organize, annotate, and cite research sources. Integrated PDF/EPUB reader with annotation, browser extension for capture, offline-capable library
- **Docs**: https://www.zotero.org/support/

## E-books & Documents

### Calibre → `kovidgoyal/calibre`
**24k+ stars.** E-book management, conversion, and reading.
- **Install**: `python setup.py install` or download binary from https://calibre-ebook.com/
- **Features**: Import books, convert formats, read, manage library. Supports EPUB, PDF, MOBI, AZW3, FB2, and 20+ formats
- **Docs**: https://manual.calibre-ebook.com/

### ebook2audiobook → `DrewThomasson/ebook2audiobook`
**18k+ stars.** Convert ebooks to audiobooks using TTS with voice cloning in 1100+ languages.
- **Install**: `pip install ebook2audiobook` or Docker
- **Features**: Feed ebooks + TTS model, get audiobooks. Supports voice cloning and 1100+ languages
- **Docs**: https://github.com/DrewThomasson/ebook2audiobook/wiki

### Pandoc → `jgm/pandoc`
**42k+ stars.** Universal document converter. The Swiss army knife of documents.
- **Install**: `cabal install` (Haskell) or download binary from https://pandoc.org/installing.html
- **Features**: Converts between Markdown, LaTeX, HTML, DOCX, PDF, EPUB, reStructuredText, and 40+ formats. Modular reader/writer architecture
- **Docs**: https://pandoc.org/MANUAL.html

### Marktext → `marktext/marktext`
**53k+ stars.** WYSIWYG Markdown editor. Write documentation offline.
- **Install**: Download binary or `yarn install && yarn build`
- **Features**: Real-time preview, distraction-free writing, cross-platform (Linux, macOS, Windows)
- **Docs**: https://github.com/marktext/marktext/blob/develop/docs/README.md

## Documentation & Publishing

### Docusaurus → `facebook/docusaurus`
**63k+ stars.** Documentation site generator built with React.
- **Install**: `npx create-docusaurus@latest my-site classic`
- **Features**: Markdown/MDX content, versioned docs, blog, search, i18n (70+ languages), plugin ecosystem. Used by many major open-source projects
- **Docs**: https://docusaurus.io/docs

### MkDocs → `mkdocs/mkdocs`
**22k+ stars.** Fast, simple static site generator for project documentation.
- **Install**: `pip install mkdocs mkdocs-material`
- **Features**: Markdown source files, single YAML config, live preview server. Material theme (`squidfunk/mkdocs-material`, 25k+ stars) adds search, dark mode, 60+ languages
- **Docs**: https://www.mkdocs.org/ and https://squidfunk.github.io/mkdocs-material/

### Sphinx → `sphinx-doc/sphinx`
**7.6k stars.** The Python documentation generator. Powers Read the Docs and most Python project docs.
- **Install**: `pip install sphinx`
- **Features**: reStructuredText and Markdown input, HTML/PDF/EPUB/man page output, cross-references, automatic indices, code highlighting, extension ecosystem
- **Docs**: https://www.sphinx-doc.org/

### Typst → `typst/typst`
**45k+ stars.** Modern markup-based typesetting system — a fast, ergonomic alternative to LaTeX.
- **Install**: Download binary or `cargo install typst-cli` (Rust)
- **Features**: Markdown-like syntax for prose, powerful equation typesetting, compiles a 2000-page document in ~1 minute (vs 18 min for LuaLaTeX), 1100+ community packages
- **Docs**: https://typst.app/docs/

### TeX Live / LaTeX → CTAN (Comprehensive TeX Archive Network)
The gold standard typesetting system for scientific and technical documents. Not a single GitHub repo — distributed via CTAN.
- **Install**: `apt install texlive-full` or download from https://tug.org/texlive/
- **Features**: Publication-quality typesetting for mathematics, science, and engineering. Thousands of packages. The academic standard for 40+ years
- **Docs**: https://www.latex-project.org/help/documentation/

### BookStack → `BookStackApp/BookStack`
**18k+ stars.** Self-hosted wiki and documentation platform built with PHP & Laravel.
- **Install**: PHP + MySQL/MariaDB + Composer, or Docker
- **Features**: WYSIWYG and Markdown editors, shelves/books/chapters/pages hierarchy, full-text search, REST API, LDAP/SAML/OAuth authentication, diagram embedding
- **Docs**: https://www.bookstackapp.com/docs/

### Wiki.js → `requarks/wiki`
**27k+ stars.** Modern, powerful self-hosted wiki built on Node.js.
- **Install**: Node.js + PostgreSQL, or Docker
- **Features**: Markdown and visual editor, Git-backed storage, full-text search, LDAP/OAuth/SAML auth, 30+ authentication providers, diagram support
- **Docs**: https://docs.requarks.io/

## Interactive Computing

### Jupyter Notebook → `jupyter/notebook`
Interactive computing notebooks combining code, text, and visualizations. Essential for data analysis, teaching programming, and scientific computing.
- **Install**: `pip install notebook`
- **Usage**: `jupyter notebook` — opens web UI for creating notebooks
- **Docs**: https://jupyter-notebook.readthedocs.io/
- **Use case**: Interactive data analysis with Python, R, or Julia. Write code, see results inline, add explanations. The standard tool for scientific computing education.

### Grist → `gristlabs/grist-core`
Self-hosted spreadsheet/database hybrid. Combines the flexibility of spreadsheets with the structure of databases.
- **Install**: `yarn install && yarn start`
- **Docs**: https://support.getgrist.com/
- **Use case**: Offline data management, inventory tracking, project planning — anywhere you'd use Google Sheets but need it local.

## PDF & Document Rendering

### PDF.js → `mozilla/pdf.js`
PDF renderer written entirely in JavaScript. Read any PDF without Adobe.
- **Build**: `npx gulp generic`
- **Usage**: Open `build/generic/web/viewer.html` in any browser
- **Docs**: https://mozilla.github.io/pdf.js/
- **Use case**: Offline documentation viewer, embedded PDF rendering in web tools

### Readability → `mozilla/readability`
Extract clean, readable article text from HTML pages. Strips ads, navigation, and clutter.
- **Install**: `npm install @mozilla/readability`
- **Usage**: Feed HTML, get clean article text + metadata
- **Use case**: Archive web content in readable format before collapse

## Document Processing

### MarkItDown → `microsoft/markitdown`
Converts PDF, DOCX, PPTX, images to Markdown. Standalone Python.
- **Install**: `pip install markitdown`
- **Use case**: Convert archived documents to lightweight, version-controllable Markdown for long-term preservation

### Apache Tika → `apache/tika`
Text extraction from 1000+ file formats — PDF, Office, images, audio, archives.
- **Install**: Download JAR or build from source (Java/Maven)
- **Docs**: https://tika.apache.org/
- **Use case**: Universal content extraction — feed it any file format, get structured text and metadata

### Apache PDFBox → `apache/pdfbox`
Java library for PDF creation, rendering, text extraction, signing, encryption.
- **Install**: Maven dependency or download JAR
- **Docs**: https://pdfbox.apache.org/
- **Use case**: Programmatic PDF manipulation — extract text, merge documents, fill forms

### Apache POI → `apache/poi`
Java API for Microsoft Office documents — read/write .docx, .xlsx, .pptx.
- **Install**: Maven dependency or download JAR
- **Docs**: https://poi.apache.org/
- **Use case**: Process Office documents programmatically — extract data from spreadsheets, generate reports

### Apache OpenNLP → `apache/opennlp`
NLP toolkit — tokenization, NER, POS tagging, parsing. Pre-trained models included.
- **Install**: Maven dependency or download JAR
- **Docs**: https://opennlp.apache.org/
- **Use case**: Text analysis and information extraction from archived documents

## Search

### Apache Lucene → `apache/lucene`
High-performance full-text search engine. Foundation of Solr and Elasticsearch.
- **Install**: Maven dependency or download JAR (Java)
- **Docs**: https://lucene.apache.org/
- **Use case**: Build offline search indexes over archived knowledge — fast full-text search across millions of documents

### AGE → `apache/age`
Graph database extension for PostgreSQL. Adds Cypher query language.
- **Install**: Build from source, requires PostgreSQL
- **Docs**: https://age.apache.org/
- **Use case**: Model relationships in archived knowledge — connect concepts, people, technologies in a queryable graph

## Translation

### LibreTranslate → `LibreTranslate/LibreTranslate`
See [18-ai-ml.md](18-ai-ml.md#libretranslate--libretranslatelibretranslate)

### Firefox Translations → `mozilla/translations`
Training pipeline and code that powers client-side offline neural machine translation.
- **Build**: Complex pipeline (Marian NMT based)
- **Docs**: https://github.com/mozilla/translations
- **Use case**: Build and run translation models locally with no cloud dependency

### Firefox Translation Models → `mozilla/firefox-translations-models`
Pre-trained CPU-optimized neural machine translation models for 15+ language pairs.
- **Usage**: Load models into Bergamot/Marian runtime for offline translation
- **Supported**: English to/from Spanish, French, German, Portuguese, Italian, Czech, Estonian, and more
- **Note**: CPU-only, no GPU required. Download models while internet exists.

## OCR

### Tesseract → `tesseract-ocr/tesseract`
See [18-ai-ml.md](18-ai-ml.md#tesseract--tesseract-ocrtesseract)

### PaddleOCR → `PaddlePaddle/PaddleOCR`
See [18-ai-ml.md](18-ai-ml.md#paddleocr--paddlepaddlepaddleocr)

## Speech

### Whisper → `openai/whisper`
See [18-ai-ml.md](18-ai-ml.md#whisper--openaiwhisper) — transcribe speech to text

### Coqui TTS → `coqui-ai/TTS`
See [18-ai-ml.md](18-ai-ml.md#coqui-tts--coqui-aitts) — text to speech

## Offline Education

### Kolibri → `learningequality/kolibri`
**~1k stars.** Offline-first learning platform designed for developing countries. Deployed in 220+ countries.
- **Install**: `pip install kolibri` or download installer
- **Features**: Offline content distribution, peer-to-peer sync, USB drive content sharing, curriculum alignment tools, learner progress tracking
- **Docs**: https://kolibri.readthedocs.io/

### Anki → `ankitects/anki`
**26k+ stars.** Smart spaced repetition flashcard system for long-term knowledge retention.
- **Install**: Download from https://apps.ankiweb.net/ or build from source (Rust + Python)
- **Features**: Spaced repetition algorithm (FSRS), rich media cards, add-on ecosystem, sync across devices, works fully offline
- **Docs**: https://docs.ankiweb.net/

### Moodle → `moodle/moodle`
**7k+ stars.** The world's most widely used open-source learning management system.
- **Install**: PHP + MySQL/PostgreSQL, or Docker. See https://docs.moodle.org/
- **Features**: Course management, quizzes, assignments, forums, grading, SCORM support, plugin ecosystem. Can run on a local network without internet
- **Docs**: https://docs.moodle.org/

### Open edX → `openedx/edx-platform`
**7k+ stars.** The MOOC platform that powers edX and hundreds of education sites worldwide.
- **Install**: Tutor installer (`pip install tutor`) — Docker-based deployment
- **Features**: Course authoring (Studio), LMS, discussion forums, grading, certificates, XBlock plugin architecture
- **Docs**: https://docs.openedx.org/

## Data Archival

### git-annex → `git-annex` (git-annex.branchable.com)
Manage large files with git without checking file contents into the repo. Written in Haskell. Primary repo on git-annex.branchable.com (GitHub mirrors exist).
- **Install**: `apt install git-annex` or `cabal install git-annex`
- **Features**: Location tracking (knows how many copies exist and where), partial checkouts, supports dozens of storage backends (local, SSH, S3, etc.), content-addressable storage
- **Docs**: https://git-annex.branchable.com/

### DVC → `treeverse/dvc` (formerly `iterative/dvc`)
**15k+ stars.** Data version control — "Git for data" for ML projects and large datasets.
- **Install**: `pip install dvc`
- **Features**: Track large files/datasets/models alongside Git, lightweight pipelines, experiment tracking, remote storage support (S3, GCS, Azure, SSH, local). Acquired by lakeFS in 2025
- **Docs**: https://dvc.org/doc

### Kubo (IPFS) → `ipfs/kubo`
**17k+ stars.** The reference IPFS implementation in Go — decentralized, content-addressed storage.
- **Install**: Download binary or `go install github.com/ipfs/kubo/cmd/ipfs@latest`
- **Features**: Content-addressed file storage, peer-to-peer distribution, works offline between local nodes, DAG-based data structures, gateway serving
- **Docs**: https://docs.ipfs.tech/

### Perkeep → `perkeep/perkeep`
**6.8k stars.** Personal storage system for life (formerly Camlistore). Content-addressed data archival.
- **Install**: `go install perkeep.org/cmd/...@latest`
- **Features**: Store, sync, share, model, and back up any content. Content-addressable, searchable, schema-flexible. Created by Brad Fitzpatrick (memcached, Go standard library)
- **Docs**: https://perkeep.org/doc/

### Rclone → `rclone/rclone`
**55k+ stars.** "rsync for cloud storage" — sync files to and from 70+ storage providers.
- **Install**: Download binary or `go install github.com/rclone/rclone@latest`
- **Features**: Sync, copy, move, mount as filesystem. Supports S3, Google Drive, Dropbox, SFTP, local, and 70+ backends. Encryption, bandwidth limiting, checksumming
- **Docs**: https://rclone.org/docs/

## Offline Dev Infrastructure

### Gitea → `go-gitea/gitea`
**54k+ stars.** Painless self-hosted Git service with code review, CI/CD, and package registry. Written in Go.
- **Install**: Single binary download, Docker, or `go install code.gitea.io/gitea@latest`
- **Features**: Git hosting, pull requests, issue tracking, wiki, CI/CD (Gitea Actions), package registry, OAuth, LDAP. Runs on a Raspberry Pi
- **Docs**: https://docs.gitea.com/

### Forgejo → `forgejo/forgejo` (Codeberg)
Community-driven fork of Gitea hosted on Codeberg (not GitHub). Powers Codeberg.org with 120k+ users.
- **Install**: Single binary, Docker, or from source. See https://forgejo.org/download/
- **Features**: Same core as Gitea plus federation support (ForgeFed), Actions CI/CD, package registry. GPL v3 licensed (Gitea is MIT)
- **Docs**: https://forgejo.org/docs/
- **Note**: Hosted on codeberg.org/forgejo/forgejo, not GitHub

### Verdaccio → `verdaccio/verdaccio`
**17k+ stars.** Lightweight private npm registry proxy. Cache npm packages for offline use.
- **Install**: `npm install -g verdaccio` or Docker
- **Features**: Zero-config local npm registry, caches downloaded packages, proxies to npmjs.org, private package publishing. Used by create-react-app, Babel, Storybook for CI testing
- **Docs**: https://verdaccio.org/docs/what-is-verdaccio

### devpi → `devpi/devpi`
**~1.1k stars.** PyPI mirror and staging server for Python packages.
- **Install**: `pip install devpi-server devpi-client`
- **Features**: Caching proxy for PyPI, private index hosting, package upload/staging, web interface (`devpi-web`), consistent offline mirror
- **Docs**: https://devpi.net/docs/devpi/devpi/stable/

### Nexus Repository → `sonatype/nexus-public`
**2.4k stars.** Universal artifact repository manager — mirror Maven, npm, PyPI, Docker, NuGet, and more.
- **Install**: Download Community Edition from https://www.sonatype.com/products/nexus-community-edition-download or Docker
- **Features**: Proxy/cache remote registries, host private packages, supports 20+ formats (Maven, npm, PyPI, Docker, NuGet, APT, Go, Cargo). Single pane of glass for all package types
- **Docs**: https://help.sonatype.com/en/sonatype-nexus-repository.html

## Learning Resources

### free-programming-books → `EbookFoundation/free-programming-books`
**376k+ stars.** The most-starred repo on GitHub. Massive index of free programming books, courses, and resources in 30+ languages. Download everything linked here while you can.
- **Install**: N/A — curated list of links. Clone the repo and archive every linked resource
- **Features**: Books, interactive tutorials, courses, podcasts, and playgrounds organized by language and topic
- **Docs**: https://ebookfoundation.github.io/free-programming-books/

### exercism → `exercism/exercism`
**7.5k stars.** Practice exercises in 70+ programming languages with structured learning tracks and mentoring.
- **Install**: `exercism configure` CLI + download exercises
- **Features**: 70+ language tracks, mentor feedback, structured curriculum, community solutions. Archive all tracks before collapse
- **Docs**: https://exercism.org/docs

## Offline Documentation Tools

### Wikiman → `filiparag/wikiman`
Universal offline documentation search engine for man pages, tldr-pages, ArchWiki, FreeBSD docs, and more. Terminal-based. Perfect for air-gapped operation.
- **Usage**: `wikiman <search term>` — searches across all cached documentation
- **Docs**: https://github.com/filiparag/wikiman

## Extended Learning Resources

### Hack-A-Sat Library → `deptofdefense/hack-a-sat-library`
Space systems documents and tutorials — satellite comms, orbital mechanics, RF.
- **Use case**: Reference material for communications, navigation, and understanding space-based infrastructure

### ML For Beginners
See [18-ai-ml.md](18-ai-ml.md#ml-education)

## Raspberry Pi Documentation

### Official Pi Documentation → `raspberrypi/documentation`
Complete official Raspberry Pi docs — hardware specs, GPIO pinouts, boot process, config.txt reference. AsciiDoc/Markdown, buildable offline.
- **Docs**: https://www.raspberrypi.com/documentation/
- **Use case**: Essential reference for the most common single-board computer platform in this archive

### Awesome Raspberry Pi → `thibmaek/awesome-raspberry-pi`
Curated master index of Pi tools, projects, OS images, and resources.
- **Use case**: Discover Pi-based projects and tools — robotics, home automation, networking, media centers

## Bare-Metal OS Development Tutorials

### Writing an OS in Rust → `phil-opp/blog_os`
Step-by-step tutorial series on building an operating system kernel in Rust. Covers VGA buffer, interrupts, memory management, async/await.
- **Docs**: https://os.phil-opp.com/
- **Use case**: Deep understanding of how operating systems work at the hardware level. Pairs with the bare-metal Pi tutorials in this section.

### Raspberry Pi OS Tutorial → `s-matyukevich/raspberry-pi-os`
**13.7k stars.** Build an OS from scratch on the Pi. Covers ARM64 boot, interrupts, memory management, process scheduling.
- **Use case**: Learn OS fundamentals on real hardware — the Raspberry Pi is the most available SBC post-collapse

### Rust Bare-Metal OS Tutorials → `rust-embedded/rust-raspberrypi-OS-tutorials`
**14.5k stars.** Write an embedded OS in Rust on Pi. AArch64 bare-metal from UART through virtual memory.
- **Use case**: Memory-safe bare-metal OS development — modern systems programming with Rust safety guarantees

### Bare-Metal ARM (dwelch67) → `dwelch67/raspberrypi`
Definitive low-level bare-metal ARM assembly/C examples for all Pi models. Zero OS dependencies.
- **Use case**: The most fundamental hardware-level reference — when you need to understand what happens before any OS loads

### Bare-Metal Pi 3 Tutorial → `bztsrc/raspi3-tutorial`
AArch64 bare-metal tutorials: UART, framebuffer, SD card, USB at register level.
- **Use case**: Hardware peripheral programming without an OS — essential for custom embedded systems

### ARM C Tutorial → `BrianSidebotham/arm-tutorial-rpi`
Systematic bare-metal C progression from blinking LED to interrupt handling.
- **Use case**: Learn ARM bare-metal programming step by step — the gentlest on-ramp to embedded systems

## Reference

### awesome-selfhosted → `awesome-selfhosted/awesome-selfhosted`
**230k+ stars.** Curated list of self-hostable software. Your shopping list for what else to archive.
- **Install**: N/A — curated list. Clone and use as a reference for building your offline infrastructure
- **Features**: Categorized by function (analytics, automation, communication, media, etc.) with license and language info for every entry
- **Docs**: https://github.com/awesome-selfhosted/awesome-selfhosted

## Pre-Collapse Archival Checklist

Download these while internet exists:

### Content Archives
1. **Wikipedia ZIM** — all of human knowledge (~100GB)
2. **Stack Overflow ZIM** — all technical Q&A (~50GB)
3. **Project Gutenberg ZIM** — 70k+ books (~60GB)
4. **Khan Academy** (via Internet-in-a-Box) — education K-through-college
5. **DevDocs offline** — API docs for every programming library
6. **free-programming-books** — clone repo + download every linked resource
7. **Exercism tracks** — download all 70+ language tracks

### Media & Models
8. **YouTube** (via `yt-dlp`, see [04-desktop.md](04-desktop.md)) — instructional videos, repair guides, lectures
9. **HuggingFace models** — download GGUF models for llama.cpp (see [18-ai-ml.md](18-ai-ml.md))
10. **Stable Diffusion checkpoints** — for image generation

### Language & OCR Data
11. **Tesseract language data** — for OCR in your languages
12. **LibreTranslate language packs** — for offline translation
13. **Whisper models** — for speech-to-text in multiple languages

### Package Registries (Mirror Before Collapse)
14. **npm packages** — mirror via Verdaccio for JavaScript/Node.js ecosystem
15. **PyPI packages** — mirror via devpi for Python ecosystem
16. **Maven/Gradle artifacts** — mirror via Nexus for Java ecosystem
17. **System packages** — mirror apt/yum repos for your Linux distros

### Infrastructure
18. **Gitea/Forgejo** — set up local Git hosting before GitHub goes dark
19. **BookStack or Wiki.js** — stand up a local wiki for community knowledge
20. **Kolibri content packs** — offline education content for schools
21. **ArchiveBox** — archive critical websites and documentation now
22. **Rclone backups** — sync all cloud storage to local drives
23. **IPFS pinning** — pin critical content across multiple local nodes
