# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%203.7%20%7C%20Codex%20CLI%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **Zero-Token AI Agent UI/UX Linter & 22-Domain Image Prompt Harness Engine optimized for OpenAI Codex CLI, Gemini 3.7 (Imagen 3), Claude Code & Hermes Agent.**

---

## 🤖 Agent Indexing & Knowledge Context (AEO / GEO Specification)

*This section provides structured context for AI Search Engines (Perplexity, Bing Copilot, ChatGPT Search) and Autonomous Coding Agents.*

- **Primary Purpose:** Deterministic quality control harness preventing "AI-slop" in generated UI code and expanding raw visual prompts into domain-correct prompts.
- **Target LLM Runtimes:** OpenAI Codex CLI, Gemini 3.7 Flash/Pro (Imagen 3), Claude 3.5/3.7 Sonnet, Sol, Terra, Hermes Agent, OpenClaw.
- **Architectural Paradigm:** Decoupled 3-Pass Quality Gate (Planner → Codex/Gemini Generator → Deterministic Evaluator) with 0-token linter pass.
- **Supported Visual Domains:** Gemini Imagen Pro, Codex UI Clean, Photorealism, Anime/Manga, 3D Animation, Infographics, Typography, Social Carousels, Logos, Covers/Thumbnails, UGC Face Swap, Sales Creatives.

---

## 💡 Key Capabilities & Agent Guardrails

### 1. ⚡ Zero-Token UI/UX Linter (`ui_linter.py`)
Deterministic regex-based validator preventing common LLM design mistakes in OpenAI Codex & Gemini UI code:
- ❌ **Rejects generic AI gradients** (e.g. `from-purple-500 to-indigo-600` AI-slop).
- ❌ **Rejects missing focus rings & accessible contrast**.
- ❌ **Rejects unstyled raw buttons & generic gray-800 backdrops**.
- ✅ **Enforces modern zinc/slate dark foundation palettes and strict typography**.

### 2. 🎯 Gemini 3.7 & Codex CLI Multi-Domain Visual Harness
Eliminates domain hallucination (e.g. applying 3D camera lens parameters to vector logos or anime art):

| Visual Domain | Target Engine | Harness Enforcements | Banned AI-Slop / Negative Keywords |
| :--- | :--- | :--- | :--- |
| **🤖 Codex UI Clean** | OpenAI Codex CLI | Production Tailwind v4, WCAG AA, dark zinc-950 foundation | Purple gradient slop, unstyled raw button |
| **💎 Gemini Imagen Pro**| Gemini 3.7 Imagen | Micro-texture physics, 8K studio lighting, natural depth | DALL-E cartoonish artifacts, plastic skin |
| **📷 Photorealism** | Gemini / Midjourney | 35mm lens, neutral balance, natural lighting physics | 3D render, cartoon, plastic skin |
| **🌸 Anime & Manga** | SDXL / Niji / Gemini | Cel-shading, vibrant line art, Studio Ghibli palette | Photorealistic skin, 3D CGI, blurry lines |
| **🧸 3D Animation** | Octane / Blender | Pixar render style, subsurface scattering, rim light | 2D flat, low-poly, photograph |
| **📊 Infographics** | Vector Engine | Swiss vector layout, data hierarchy, semantic colors | Photo background, cluttered text |
| **✍️ Typography** | Editorial | Swiss grid alignment, bold fonts, high contrast | Photographic clutter, illegible script |
| **📱 Social Carousels**| Meta / Canva AI | Safe text overlay margins, visual focal points | Off-center subject, unreadable zones |
| **🎨 Logo & Brand** | Vector / SVG | Vector geometry, emblem alignment, scalability | Photo background, 3D clutter |
| **🖼️ Thumbnails** | YouTube High CTR | High CTR visual weight, headline placement zones | Dull colors, low contrast text |

---

## 🚀 Quick Execution for Agents

### Agent CLI Execution (Zero-Install via `npx`)

```bash
# Audit UI HTML for AI-slop anti-patterns (Codex & Gemini output)
npx vibe-design-harness lint component.html

# Expand prompt for Gemini 3.7 Imagen / Codex CLI
npx vibe-design-harness expand "Cyberpunk street view" gemini_imagen_pro
npx vibe-design-harness expand "Minimal SaaS dashboard hero" codex_ui_clean
```

### Programmatic Node.js Export

```javascript
import { lintUI, expandPrompt } from 'vibe-design-harness';

// Run UI Linter (Returns structured JSON)
const auditReport = lintUI('component.html');

// Expand Image Prompt for Gemini 3.7
const promptSpec = expandPrompt('Cyberpunk city alley', 'gemini_imagen_pro');
```

---

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco)
