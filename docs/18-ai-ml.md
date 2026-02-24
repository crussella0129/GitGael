# 18 — AI & Machine Learning

Everything needed to run AI locally with no internet.

## CUDA & GPU Computing

The foundational GPU computing stack. Everything below (PyTorch, TensorFlow, llama.cpp) depends on this layer.

### Core SDK

### CUDA Samples → `NVIDIA/cuda-samples`
Official CUDA code samples demonstrating every CUDA Toolkit feature.
- **Build**: `cmake -B build && cmake --build build`
- **Contents**: 200+ examples covering memory management, streams, cooperative groups, libraries
- **Docs**: https://docs.nvidia.com/cuda/cuda-samples/
- **Start here**: `0_Introduction/` for basics, `2_Concepts_and_Techniques/` for intermediate

### CUDA Core Compute Libraries → `NVIDIA/cccl`
Unified C++ parallel algorithms library (replaces thrust + cub + libcudacxx).
- **Build**: CMake-based, header-mostly library
- **Contains**: Thrust (STL-like parallel algorithms), CUB (GPU primitives), libcu++ (C++ std for GPU)
- **Docs**: https://nvidia.github.io/cccl/

### CUTLASS → `NVIDIA/cutlass`
CUDA templates for high-performance matrix multiplication and linear algebra.
- **Build**: `cmake -B build -DCUTLASS_NVCC_ARCHS=<your_arch> && cmake --build build`
- **Docs**: https://github.com/NVIDIA/cutlass/blob/main/media/docs/quickstart.md
- **Why it matters**: The engine behind efficient transformer inference; PyTorch and TensorRT use it internally

### CUDA Python → `NVIDIA/cuda-python`
Python bindings for CUDA Driver and Runtime APIs.
- **Install**: `pip install cuda-python`
- **Docs**: https://nvidia.github.io/cuda-python/

### GPU Drivers

### Open GPU Kernel Modules → `NVIDIA/open-gpu-kernel-modules`
NVIDIA open-source Linux GPU kernel driver modules.
- **Build**: `make modules -j$(nproc) && make modules_install`
- **Docs**: https://github.com/NVIDIA/open-gpu-kernel-modules/blob/main/README.md
- **Note**: Required for GPU compute; covers GeForce, Quadro, Tesla

### NVIDIA Container Toolkit → `NVIDIA/nvidia-container-toolkit`
Run GPU workloads inside containers (Docker, Podman).
- **Install**: Package manager or build from source
- **Docs**: https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/

### GPU Operator → `NVIDIA/gpu-operator`
Automates NVIDIA GPU driver and toolkit management in Kubernetes.
- **Docs**: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/

### Inference Optimization

### TensorRT → `NVIDIA/TensorRT`
High-performance deep learning inference SDK. Optimizes trained models for deployment.
- **Build**: `cmake -B build && cmake --build build`
- **Usage**: Import ONNX/PyTorch model → optimize → deploy with 2-6x speedup
- **Docs**: https://docs.nvidia.com/deeplearning/tensorrt/

### TensorRT-LLM → `NVIDIA/TensorRT-LLM`
LLM-specific inference optimization. Quantization, KV-cache, paged attention.
- **Install**: `pip install tensorrt-llm`
- **Docs**: https://nvidia.github.io/TensorRT-LLM/
- **Use case**: Run LLMs at maximum speed on NVIDIA GPUs

### cuDNN Frontend → `NVIDIA/cudnn-frontend`
C++ wrapper for cuDNN backend API with operation fusion and autotuning.
- **Build**: Header-only C++ library
- **Docs**: https://github.com/NVIDIA/cudnn-frontend/blob/main/docs/

### Multi-GPU & Communication

### NCCL → `NVIDIA/nccl`
Optimized collective communication primitives for multi-GPU and multi-node.
- **Build**: `make -j$(nproc) src.build`
- **Operations**: AllReduce, Broadcast, AllGather, ReduceScatter
- **Docs**: https://docs.nvidia.com/deeplearning/nccl/

### NCCL Tests → `NVIDIA/nccl-tests`
Benchmarking and validation suite for NCCL.
- **Build**: `make MPI=1 NCCL_HOME=/path/to/nccl`
- **Usage**: `./build/all_reduce_perf -b 8 -e 128M -f 2 -g <num_gpus>`

### GPU Programming Languages

### Triton → `triton-lang/triton`
Python-like GPU programming language and compiler. Write GPU kernels without CUDA C.
- **Install**: `pip install triton`
- **Usage**: Decorate Python functions with `@triton.jit` → compiles to GPU code
- **Docs**: https://triton-lang.org/
- **Why it matters**: Used by PyTorch 2.0 torch.compile; much easier than raw CUDA

### CUDA Quantum → `NVIDIA/cuda-quantum`
Hybrid quantum-classical computing platform.
- **Build**: `pip install cudaq`
- **Docs**: https://nvidia.github.io/cuda-quantum/

### Training at Scale

### Megatron-LM → `NVIDIA/Megatron-LM`
Large-scale transformer model training (tensor/pipeline/data parallelism).
- **Docs**: https://github.com/NVIDIA/Megatron-LM/blob/main/README.md
- **Use case**: Train GPT/BERT-scale models across multiple GPUs/nodes

### NeMo → `NVIDIA-NeMo/NeMo`
End-to-end framework for generative AI (LLMs, speech, multimodal).
- **Install**: `pip install nemo_toolkit`
- **Docs**: https://docs.nvidia.com/nemo-framework/

### Apex → `NVIDIA/apex`
PyTorch extension for mixed precision and distributed training utilities.
- **Install**: `pip install apex` or build from source for full features
- **Docs**: https://nvidia.github.io/apex/

### DeepLearningExamples → `NVIDIA/DeepLearningExamples`
State-of-the-art training scripts for 50+ models (ResNet, BERT, GPT, etc.).
- **Docs**: https://github.com/NVIDIA/DeepLearningExamples/blob/master/README.md

### GPU-Accelerated Data Science

### NVIDIA Warp → `NVIDIA/warp`
Python framework for GPU-accelerated simulation and spatial computing.
- **Install**: `pip install warp-lang`
- **Usage**: Write Python → JIT compiles to CUDA kernels
- **Docs**: https://nvidia.github.io/warp/

### NVIDIA DALI → `NVIDIA/DALI`
GPU-accelerated data loading and preprocessing pipeline.
- **Install**: `pip install nvidia-dali-cuda120`
- **Use case**: Decode images/video on GPU; 3-10x faster data pipeline
- **Docs**: https://docs.nvidia.com/deeplearning/dali/

### cuDF → `rapidsai/cudf`
GPU DataFrame library — pandas API on the GPU.
- **Install**: `pip install cudf-cu12`
- **Usage**: `import cudf; df = cudf.read_csv('data.csv')` → 10-100x faster
- **Docs**: https://docs.rapids.ai/api/cudf/

### cuML → `rapidsai/cuml`
GPU-accelerated machine learning (sklearn-compatible API).
- **Install**: `pip install cuml-cu12`
- **Docs**: https://docs.rapids.ai/api/cuml/
- **Algorithms**: Random Forest, KNN, DBSCAN, PCA, UMAP, etc. on GPU

### tiny-cuda-nn → `NVlabs/tiny-cuda-nn`
Lightning-fast C++/CUDA neural network framework for small networks.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://github.com/NVlabs/tiny-cuda-nn/blob/master/README.md
- **Use case**: Neural radiance fields (NeRF), neural hash grids

### Debugging

### CUDA GDB → `NVIDIA/cuda-gdb`
CUDA-aware debugger based on GDB.
- **Build**: `./configure && make`
- **Usage**: `cuda-gdb ./my_cuda_app` → set breakpoints in GPU kernels
- **Docs**: https://docs.nvidia.com/cuda/cuda-gdb/

### Learning Resources

### GPU Mode Lectures → `gpu-mode/lectures`
Comprehensive GPU programming course material with code examples.
- **Contents**: CUDA fundamentals, memory hierarchy, kernel optimization, Triton, profiling
- **Docs**: https://github.com/gpu-mode/lectures

### GPU Mode Resource Stream → `gpu-mode/resource-stream`
Curated collection of GPU programming articles, papers, and tools.

### CUDA Crash Course → `CoffeeBeforeArch/cuda_programming`
Companion code for the "CUDA Crash Course" YouTube series.
- **Contents**: Progressive examples from basics to advanced optimization
- **Video series**: https://www.youtube.com/playlist?list=PLxNPSjHT5qvtYRVdNN1yDcdSl39uHV_sU

## Inference Engines

### llama.cpp → `ggml-org/llama.cpp`
Run large language models on consumer hardware (CPU and GPU).
- **Build**: `cmake -B build -DGGML_CUDA=ON && cmake --build build` (or without CUDA for CPU-only)
- **Usage**: `./llama-server -m model.gguf -c 4096 --host 0.0.0.0 --port 8080`
- **Docs**: https://github.com/ggml-org/llama.cpp/blob/master/README.md
- **Models**: Download GGUF models from HuggingFace before collapse

### Jan → `janhq/jan`
Local-first LLM chat interface. Clean UI, runs models via llama.cpp.
- **Build**: `yarn install && yarn build`
- **Docs**: https://jan.ai/docs

### llamafile → `Mozilla-Ocho/llamafile`
Package and run LLMs as single executable files. One file = model + runtime.
- **Build**: `make` (or download pre-built llamafiles)
- **Usage**: `./model.llamafile --server --port 8080` — runs on any x86-64/ARM machine
- **Docs**: https://github.com/Mozilla-Ocho/llamafile/blob/main/README.md
- **Why it matters**: Zero-install LLM distribution. No Python, no CUDA, no dependencies. Just one file.

### Ollama → `ollama/ollama`
The simplest way to run LLMs locally. Single binary, model management, OpenAI-compatible API.
- **Build**: `go build .`
- **Usage**: `ollama run llama3` / `ollama serve` (API at localhost:11434)
- **Docs**: https://github.com/ollama/ollama/blob/main/README.md
- **Why it matters**: Wraps llama.cpp with dead-simple UX. Download model once → `ollama run`. Supports Llama, Mistral, Gemma, Phi, CodeLlama, and hundreds more. 163k+ stars.

## AMD GPU Computing

### ROCm → `ROCm/ROCm`
AMD's open-source GPU computing platform. The AMD equivalent of CUDA.
- **Docs**: https://rocm.docs.amd.com/
- **Contains**: ROCm meta-repo with documentation, issue tracking, and links to all component repos
- **Components**: HIP (CUDA translation layer), rocBLAS, rocFFT, MIOpen (cuDNN equivalent), ROCr runtime
- **Why it matters**: Without ROCm, AMD GPUs are stranded for ML/AI workloads. PyTorch and TensorFlow both support ROCm. If you have AMD hardware, this is non-optional.
- **Note**: This is the meta-repo. Key component repos (hipBLAS, MIOpen, etc.) can be cloned from the ROCm GitHub org as needed.

## Scientific Python Stack

The foundational libraries that PyTorch, TensorFlow, scikit-learn, and nearly every scientific Python package depends on.

### NumPy → `numpy/numpy`
Foundational numerical computing library for Python. N-dimensional arrays, linear algebra, FFT, random number generation.
- **Build**: `pip install .` or `python setup.py install`
- **Usage**: `import numpy as np; a = np.array([1,2,3]); np.dot(a, a)`
- **Docs**: https://numpy.org/doc/
- **Note**: Hard dependency for PyTorch, TensorFlow, scikit-learn, SciPy, Pandas, Matplotlib, and virtually every scientific Python library in this archive.

### SciPy → `scipy/scipy`
Scientific algorithms: optimization, integration, interpolation, signal processing, linear algebra, statistics, sparse matrices.
- **Build**: `pip install .` (requires NumPy, Fortran compiler)
- **Usage**: `from scipy.optimize import minimize`
- **Docs**: https://docs.scipy.org/doc/scipy/

### Matplotlib → `matplotlib/matplotlib`
The standard Python plotting library. Publication-quality charts, graphs, and figures.
- **Build**: `pip install .`
- **Usage**: `import matplotlib.pyplot as plt; plt.plot([1,2,3]); plt.savefig('chart.png')`
- **Docs**: https://matplotlib.org/stable/contents.html
- **Use case**: Visualize energy data, sensor readings, weather forecasts, crop yields — any data in the archive.

### Pandas → `pandas-dev/pandas`
Data manipulation and analysis. The standard for tabular data in Python.
- **Build**: `pip install .` (requires NumPy)
- **Usage**: `import pandas as pd; df = pd.read_csv('data.csv'); df.describe()`
- **Docs**: https://pandas.pydata.org/docs/

## Frameworks

### PyTorch → `pytorch/pytorch`
THE deep learning framework. Most open models use this.
- **Build**: `python setup.py install` (complex, many CUDA deps)
- **Usage**: `import torch; model = torch.load("model.pt")`
- **Docs**: https://pytorch.org/docs/

### TensorFlow → `tensorflow/tensorflow`
Google's ML framework. Some models are TF-only.
- **Build**: `bazel build //tensorflow/tools/pip_package:wheel`
- **Docs**: https://www.tensorflow.org/api_docs

### scikit-learn → `scikit-learn/scikit-learn`
Classical ML (no deep learning). Fast, practical.
- **Install**: `pip install scikit-learn`
- **Usage**: `from sklearn.ensemble import RandomForestClassifier`
- **Docs**: https://scikit-learn.org/stable/documentation.html
- **Use cases**: Crop yield prediction, anomaly detection, classification

### HuggingFace Transformers → `huggingface/transformers`
Load and run any open model (LLMs, vision, audio, etc.).
- **Install**: `pip install transformers`
- **Usage**: `from transformers import pipeline; nlp = pipeline("text-generation")`
- **Docs**: https://huggingface.co/docs/transformers

## Computer Vision

### Ultralytics (YOLOv8) → `ultralytics/ultralytics`
State-of-the-art object detection. Easy to use.
- **Install**: `pip install ultralytics`
- **Usage**: `yolo detect predict model=yolov8n.pt source=image.jpg`
- **Docs**: https://docs.ultralytics.com/
- **Use cases**: Perimeter security, crop monitoring, inventory counting

### Darknet (YOLO) → `AlexeyAB/darknet`
Classic YOLO implementation. Runs on modest hardware.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://github.com/AlexeyAB/darknet/wiki

### DeepFace → `serengil/deepface`
Face recognition and analysis library.
- **Install**: `pip install deepface`
- **Use cases**: Access control, security monitoring

### PaddleOCR → `PaddlePaddle/PaddleOCR`
Optical character recognition supporting 80+ languages.
- **Install**: `pip install paddlepaddle paddleocr`
- **Usage**: `from paddleocr import PaddleOCR; ocr = PaddleOCR(); result = ocr.ocr('image.jpg')`

### PaddlePaddle → `PaddlePaddle/Paddle`
Baidu's deep learning framework. The backend for PaddleOCR and other Paddle ecosystem tools.
- **Build**: `cmake -B build && cmake --build build` (complex, many options)
- **Docs**: https://www.paddlepaddle.org.cn/documentation/docs/en/
- **Use case**: Required runtime for PaddleOCR. Also supports vision, NLP, and speech models with good performance on Intel CPUs.

## Speech & Voice

### Whisper → `openai/whisper`
Best offline speech-to-text. 99 languages.
- **Install**: `pip install openai-whisper`
- **Usage**: `whisper audio.mp3 --model medium --language en`
- **Docs**: https://github.com/openai/whisper/blob/main/README.md

### DeepSpeech → `mozilla/DeepSpeech`
Mozilla's speech-to-text engine. Lightweight, runs on CPU, offline.
- **Install**: `pip install deepspeech` + download pre-trained model
- **Usage**: `deepspeech --model model.pbmm --scorer scorer.scorer --audio audio.wav`
- **Docs**: https://deepspeech.readthedocs.io/
- **Difference from Whisper**: Smaller models, faster on CPU, lower accuracy. Good for real-time or resource-constrained environments (Raspberry Pi). Whisper is better for batch/quality; DeepSpeech is better for speed/size.

### Coqui TTS → `coqui-ai/TTS`
Text-to-speech synthesis. Multiple voices and languages.
- **Install**: `pip install TTS`
- **Usage**: `tts --text "Hello world" --out_path output.wav`
- **Docs**: https://tts.readthedocs.io/

### Moonshine → `moonshine-ai/moonshine`
Lightweight speech recognition optimized for edge devices.
- **Install**: `pip install moonshine`

## Translation

### LibreTranslate → `LibreTranslate/LibreTranslate`
Self-hosted offline translation API. 30+ languages.
- **Install**: `pip install libretranslate && libretranslate`
- **Usage**: Web UI at `http://localhost:5000` or REST API
- **Docs**: https://github.com/LibreTranslate/LibreTranslate/blob/main/README.md

## OCR

### Tesseract → `tesseract-ocr/tesseract`
Gold-standard OCR engine. 100+ languages.
- **Build**: `./autogen.sh && ./configure && make && make install`
- **Usage**: `tesseract image.png output -l eng`
- **Docs**: https://tesseract-ocr.github.io/

## Image Generation

### Stable Diffusion WebUI → `AUTOMATIC1111/stable-diffusion-webui`
Full offline text-to-image generation.
- **Install**: `./webui.sh` (downloads dependencies automatically)
- **Usage**: Web UI — enter prompt, generate images
- **Docs**: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki
- **Requires**: Downloaded model checkpoints (download before collapse)


## NVIDIA Advanced AI & Graphics

### GPU Acceleration
### TransformerEngine → `NVIDIA/TransformerEngine`
FP8/FP4 precision acceleration for Transformer models on Hopper/Ada/Blackwell GPUs. Apache-2.0.

### Model Optimizer → `NVIDIA/Model-Optimizer`
Unified model optimization: quantization, pruning, distillation, speculative decoding. Apache-2.0.

### LLM Security
### garak → `NVIDIA/garak`
LLM vulnerability scanner. Tests for jailbreaks, prompt injection, data leakage. Apache-2.0.

### Neural Audio
### BigVGAN → `NVIDIA/BigVGAN`
High-quality neural vocoder for speech/audio/music synthesis. MIT.

### 3D Reconstruction & Rendering
### Instant-NGP → `NVlabs/instant-ngp`
Lightning-fast Neural Radiance Fields for 3D scene reconstruction from photographs.

### nvdiffrast → `NVlabs/nvdiffrast`
Modular primitives for high-performance differentiable rendering.

### nvdiffrec → `NVlabs/nvdiffrec`
Extracts triangular 3D models, materials, and lighting from images.

### Microsoft AI Tools
### BitNet → `microsoft/BitNet`
Inference framework for 1-bit LLMs — viable LLM execution on minimal hardware. MIT.

### ONNX Runtime → `microsoft/onnxruntime`
Cross-platform ML inference engine supporting ONNX format models on CPU/GPU. MIT.

### LightGBM → `microsoft/LightGBM`
High-performance gradient boosting for classification, ranking, regression. MIT.

### Neural Network Intelligence → `microsoft/nni`
AutoML toolkit: neural architecture search, hyperparameter tuning. MIT.

### LoRA → `microsoft/LoRA`
Low-Rank Adaptation for efficient LLM fine-tuning on limited compute. MIT.

### Olive → `microsoft/Olive`
ML model finetuning, conversion, quantization, optimization for CPU/GPU/NPU. MIT.

### Google AI Tools
### gemma.cpp → `google/gemma.cpp`
Lightweight standalone C++ inference engine for Gemma language models. No Python dependency.

## Data Processing & Analytics

### Data Formats
### Apache Arrow → `apache/arrow`
Universal columnar in-memory data format. Multi-language (C++, Python, Rust, Java, Go). Apache-2.0.

### Apache Parquet → `apache/parquet-format`
Columnar storage specification — the standard for analytical data at rest. Apache-2.0.

### Apache Avro → `apache/avro`
Schema-evolving data serialization with compact binary format. Apache-2.0.

### Query Engines
### Apache DataFusion → `apache/datafusion`
Rust SQL query engine. Lightweight alternative to Spark for single-node analytics. Apache-2.0.

### Apache Spark → `apache/spark`
Unified analytics engine for batch, streaming, ML, graph, and SQL workloads. Apache-2.0.

### Apache Hadoop → `apache/hadoop`
Distributed storage (HDFS) and processing (MapReduce/YARN). Apache-2.0.

### Apache Flink → `apache/flink`
Stateful stream processing framework. Runs in standalone mode. Apache-2.0.

### Event Streaming
### Apache Kafka → `apache/kafka`
Distributed event streaming platform. KRaft mode (no ZooKeeper). Apache-2.0.

### Data Visualization
### Apache Superset → `apache/superset`
Self-hosted data visualization platform. Dashboards, charts, SQL exploration. Apache-2.0.

### ML Education
### ML-For-Beginners → `microsoft/ML-For-Beginners`
Complete 12-week, 26-lesson ML curriculum with code. MIT.

## Robotics

### LeRobot → `huggingface/lerobot`
Open-source robot learning framework.
- **Install**: `pip install lerobot`
- **Docs**: https://github.com/huggingface/lerobot

### MuJoCo → `google-deepmind/mujoco`
Physics simulator for robotics. Fast, accurate.
- **Build**: `cmake -B build && cmake --build build`
- **Docs**: https://mujoco.readthedocs.io/

### ROS 2 → `ros2/ros2`
Robot Operating System. Middleware for robot control, perception, planning.
- **Build**: Follow https://docs.ros.org/en/rolling/Installation/
- **Docs**: https://docs.ros.org/
