---
name: vibe-design-harness
description: Universal AI Agent UI/UX Linter & Pro Graphics Engine (Photorealism, Anime, 3D, Infographics, Posters, Logos, Covers, UGC Face Swap, Sales Creatives) for Gemini 3.7, Codex CLI, Claude & Hermes.
category: creative
---

# VibeDesign-Harness 🎨🤖

> **The Universal Pro Graphics & UI/UX Harness Engine for AI Agents**

VibeDesign-Harness equips LLM coding and creative agents (Gemini 3.7, OpenAI Codex, Claude Code, Hermes Agent, OpenClaw, Dewee) with deterministic quality controls, zero-token UI linting, and a 10-Domain Image Harness Engine.

---

## 🏛️ Core Architectural Pillars

### 1. UI/UX Aesthetic Harness (3-Agent Decoupled Loop)
- **Planner Agent:** Creates `spec.md` with explicit Design Tokens, spacing grids, and component architecture.
- **Generator Agent:** Produces Tailwind HTML/CSS components adherence to spec.
- **Evaluator Agent:** Runs `ui_linter.py` (0-token deterministic regex linter) + Playwright 9-axis aesthetic evaluation.

### 2. Pro Graphics & Multi-Domain Image Harness (10 Domains)
Prevents generic visual hallucinations (e.g. applying photorealistic camera lens specs to a 2D vector logo or anime art).

1. `photorealism` — Camera parameters, natural studio lighting, micro-texture physics.
2. `anime` — Cel-shading, line art, Makoto Shinkai / Studio Ghibli palette.
3. `3d_animation` — Pixar render style, subsurface scattering, studio Octane lighting.
4. `infographic` — Swiss vector layout, data hierarchy, semantic color coding.
5. `typography_poster` — Swiss grid alignment, editorial typography, high contrast.
6. `carousel_ad` — Safe text overlay margins, visual focal point hierarchy.
7. `logo_branding` — Clean vector geometry, emblem/wordmark alignment, high scalability.
8. `cover_thumbnail` — High CTR thumbnail composition, headline placement zones.
9. `face_swap_ugc` — Facial feature preservation, neck/hair blending, UGC camera angles.
10. `sales_creative` — Direct response layout, product hero section, social proof badges.

---

## 💻 CLI & Library Usage for Agents

```bash
# Audit HTML UI output for AI-slop
npx vibe-design-harness lint component.html

# Expand prompt with domain-specific rules
npx vibe-design-harness expand "Minimalist vector logo for AI startup" logo_branding
npx vibe-design-harness expand "UGC customer photo holding product bottle" face_swap_ugc
npx vibe-design-harness expand "High CTR YouTube thumbnail background" cover_thumbnail
```

Programmatic JS:
```javascript
import { lintUI, expandPrompt } from 'vibe-design-harness';

const report = lintUI('index.html');
const expanded = expandPrompt('Product review photo', 'face_swap_ugc');
```
