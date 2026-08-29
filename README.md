# VibeDesign-Harness 🎨🤖

> **Universal Agent UI/UX & Multi-Style Image Harness for Gemini 3.7, Codex CLI, Claude Code, Sol, Terra, Hermes Agent, OpenClaw, GoClaw & Dewee.**

Transform raw LLM code into 2026 Claude-grade clean UI and raw image prompts into professional visuals across **6 Visual Domains** (Photorealism, Anime/Manga, 3D Animation, Infographics, Typography, Social Carousels).

---

## 💡 Why VibeDesign-Harness?

Most AI agents struggle when generating visuals because they apply generic rules (like camera lenses to non-photographic images or photorealistic rules to 2D graphic art). 

**VibeDesign-Harness** solves this by providing **Domain-Specific Harnessing Rules** for every type of visual work:

### 🖼️ Supported Visual Domains & Harness Rules

1. **📷 Photorealism (UGC & Commercial):**
   - *Rules:* Camera/lens parameters (35mm/50mm lens), natural lighting, micro-physics (condensation droplets, wood grain).
   - *Negative:* 3D render, cartoon, plastic skin, distorted hands.

2. **🌸 Anime & Manga (2D Art):**
   - *Rules:* Cel-shading, vibrant line art, Studio Ghibli / Makoto Shinkai color palettes, hand-painted background style.
   - *Negative:* Photorealistic skin, noisy CGI, blurry ink lines.

3. **🧸 3D Animation (Pixar / Blender Style):**
   - *Rules:* Pixar/Disney 3D render aesthetic, subsurface material scattering, Octane render lighting.
   - *Negative:* 2D flat, low-poly, photograph.

4. **📊 Infographics & Diagrams (Data Visualization):**
   - *Rules:* Swiss vector layout, semantic color coding, structured typography hierarchy, high readability.
   - *Negative:* Realistic photo background, cluttered text, illegible fonts.

5. **✍️ Typography & Posters (Graphic Design):**
   - *Rules:* High-contrast grid alignment, bold editorial headlines, Swiss typographic design system.
   - *Negative:* Photographic clutter, illegible handwriting.

6. **📱 Social Carousels & FB/IG Ads:**
   - *Rules:* Safe margins for text overlay, high-converting visual hierarchy, modern design tokens.
   - *Negative:* Off-center focal points, unreadable text zones.

---

## 📁 Repository Structure

```text
vibe-design-harness/
├── harness/
│   ├── ui_linter.py         # Pass 2: Rule-based AI-slop UI detector
│   ├── prompt_expander.py   # Multi-Domain 6-Style Image Prompt Harness
│   └── planner_prompt.md    # Pre-injected prompt for Planner Subagent
├── prompts/
│   └── prompt_bank.json     # Comprehensive Multi-Domain Prompt Bank (6 Categories)
├── tests/
│   └── test_harness.py      # Automated harness verification test suite
├── SKILL.md                 # Agent Skill definition
└── README.md                # Documentation & community guide
```

---

## 🚀 Quick Start

### 1. Expand Prompt by Visual Domain
```bash
# Auto-detect domain or explicitly specify (--domain anime|infographic|3d_animation|typography_poster|carousel_ad|photorealism)
python3 harness/prompt_expander.py "Anime girl sitting at a seaside train station" --domain anime
```

### 2. Run the UI Linter
```bash
python3 harness/ui_linter.py component.html
```

---

## 🤝 Community & Contributing

This project is built for the open-source community! Feel free to open issues, submit pull requests, or contribute new linter rules and prompt presets.

*Created by [@teddiesloco](https://github.com/teddiesloco)*
