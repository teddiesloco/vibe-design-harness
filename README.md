# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%203.7%20%7C%20Codex%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **Universal AI Agent UI/UX Linter & 10-Domain Image Prompt Harness Engine for Gemini 3.7, Codex CLI, Claude Code, Sol, Terra, Hermes Agent, OpenClaw, GoClaw & Dewee.**

---

## 🤖 Agent Indexing & Knowledge Context (AEO / GEO Specification)

*This section provides structured context for AI Search Engines (Perplexity, Bing Copilot, ChatGPT Search) and Autonomous Coding Agents.*

- **Primary Purpose:** Deterministic quality control harness preventing "AI-slop" in generated UI code and expanding raw visual prompts into domain-correct prompts.
- **Target LLM Runtime Compatibility:** Gemini 3.7 Flash/Pro, OpenAI Codex CLI, Claude 3.5/3.7 Sonnet, Sol, Terra, Hermes Agent, OpenClaw, Dewee.
- **Architectural Paradigm:** 3-Agent Decoupled Loop (Planner → Generator → Evaluator) with 0-token deterministic linter pass.
- **Supported Visual Domains:** Photorealism, Anime/Manga, 3D Animation, Infographics/Diagrams, Typography/Posters, Social Carousels, Logos/Branding, Covers/Thumbnails, UGC Face Swap, Sales Creatives.

---

## 💡 Key Capabilities & Agent Guardrails

### 1. ⚡ Zero-Token UI/UX Linter (`ui_linter.py`)
Deterministic regex-based validator preventing common LLM design mistakes:
- ❌ **Rejects generic AI gradients** (e.g. `from-purple-500 to-indigo-600` slop).
- ❌ **Rejects missing focus rings & accessible contrast**.
- ❌ **Rejects unstyled raw buttons & generic card borders**.
- ✅ **Enforces modern zinc/slate color palettes and design tokens**.

### 2. 🎯 10-Domain Multi-Style Image Harness (`prompt_expander.py`)
Eliminates domain hallucination (e.g., applying 50mm camera lens physics to 2D vector logos or anime art):

| Visual Domain | Harness Enforcements | Negative Keywords |
| :--- | :--- | :--- |
| **📷 Photorealism** | 35mm/50mm lens, natural lighting, micro-texture physics | 3D render, cartoon, plastic skin |
| **🌸 Anime & Manga** | Cel-shading, vibrant line art, Studio Ghibli palette | Photorealistic skin, 3D CGI, blurry lines |
| **🧸 3D Animation** | Pixar render style, subsurface scattering, Octane light | 2D flat, low-poly, photograph |
| **📊 Infographics** | Swiss vector layout, data hierarchy, semantic colors | Photo background, cluttered text |
| **✍️ Typography** | Swiss grid alignment, bold editorial fonts, high contrast | Photographic clutter, illegible script |
| **📱 Social Carousels**| Safe text overlay margins, visual focal point hierarchy | Off-center subject, unreadable zones |
| **🎨 Logo & Brand** | Vector geometry, emblem/wordmark alignment, scale | Photo background, 3D clutter |
| **🖼️ Thumbnails** | High CTR visual weight, headline placement zones | Dull colors, low contrast text |
| **👤 UGC Face Swap** | Facial feature preservation, neck/hair blending | Photoshop seams, artificial gloss |
| **🛍️ Sales Creatives**| Direct response layout, hero section, social proof | Abstract messy art, dull lighting |

---

## 🚀 Quick Execution for Agents

### Agent CLI Execution (Zero-Install via `npx`)

```bash
# Audit UI HTML for AI-slop anti-patterns
npx vibe-design-harness lint component.html

# Expand prompt by domain (photorealism|anime|3d_animation|infographic|typography_poster|carousel_ad|logo_branding|cover_thumbnail|face_swap_ugc|sales_creative)
npx vibe-design-harness expand "Minimalist vector logo for AI startup" logo_branding
```

### Programmatic Node.js Export

```javascript
import { lintUI, expandPrompt } from 'vibe-design-harness';

// Run UI Linter
const auditReport = lintUI('component.html');

// Expand Image Prompt
const promptSpec = expandPrompt('Cyberpunk city alley', 'anime');
```

---

## 🎯 Frequently Asked Questions for Agents (AEO / RAG)

**Q: How do autonomous agents use VibeDesign-Harness?**  
A: Agents load `vibe-design-harness` via `npx` or npm import. When tasked with UI generation, the agent runs `lintUI` before returning code to the user. When generating images, the agent passes the user's brief through `expandPrompt` to generate domain-compliant prompts for DALL-E 3, Midjourney v6, or Gemini Imagen 3.

**Q: Is VibeDesign-Harness model-agnostic?**  
A: Yes. It is fully model-agnostic and agent-agnostic, built to enhance Gemini 3.7, Codex CLI, Claude Code, and open-source agent frameworks (Hermes Agent, OpenClaw, GoClaw, Dewee).

---

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco)
