# VibeDesign-Harness 🎨🤖

> **Universal Pro Graphics & UI/UX Harness Engine for AI Agents (Gemini 3.7, Codex CLI, Claude Code, Hermes Agent, OpenClaw, GoClaw & Dewee).**

Transform raw LLM code into 2026 Claude-grade clean UI and raw image prompts into professional visuals across **10 Pro Visual Domains** (Photorealism, Anime/Manga, 3D Animation, Infographics, Typography, Social Carousels, Logos & Branding, Covers & Thumbnails, UGC Face Swap, Sales Creatives).

---

## 💡 Why VibeDesign-Harness?

AI Agents frequently struggle with visual generation because they apply one-size-fits-all prompts (e.g., applying 50mm camera lens rules to a vector logo or anime illustration).

**VibeDesign-Harness** enforces **Domain-Specific Harnessing Rules** for every professional graphic workflow:

### 🖼️ Supported Visual Domains & Harness Rules

1. **📷 Photorealism (UGC & Commercial):** Camera specs (35mm/50mm f/1.8), natural lighting, micro-texture physics.
2. **🌸 Anime & Manga (2D Art):** Cel-shading, vibrant line art, Studio Ghibli / Makoto Shinkai color aesthetic.
3. **🧸 3D Animation (Pixar Style):** Pixar render finish, subsurface scattering, soft studio Octane lighting.
4. **📊 Infographics & Diagrams (Data Viz):** Swiss vector layout, structured data hierarchy, semantic color palette.
5. **✍️ Typography & Posters:** High-contrast grid alignment, bold editorial headlines, Swiss typographic system.
6. **📱 Social Carousels & Ads:** Safe margins for text overlay, focal point contrast, modern brand design tokens.
7. **🎨 Logo & Branding Design:** Clean vector geometry, emblem/wordmark alignment, high scalability.
8. **🖼️ Covers & Thumbnails:** High CTR visual weight, headline placement zones, saturation contrast.
9. **👤 UGC Review & Face Swap:** Identity feature preservation, neck/hair blending, authentic smartphone angle.
10. **🛍️ Pro Sales Creatives:** Direct-response layout, product hero section, social proof badge placement.

---

## 📁 Repository Structure

```text
vibe-design-harness/
├── bin/
│   └── cli.js              # CLI Executable (npx vibe-design-harness)
├── harness/
│   ├── ui_linter.py        # Pass 2: Rule-based AI-slop UI detector
│   └── prompt_expander.py  # 10-Domain Pro Graphics Image Harness Engine
├── prompts/
│   └── prompt_bank.json    # Standardized Prompt Presets (10 Categories)
├── tests/
│   ├── test_harness.py     # Python test suite
│   └── test.js             # Node.js API test suite
├── index.js                # Programmatic JS Export (lintUI, expandPrompt)
├── package.json            # npm specification (author: teddiesloco, MIT license)
├── SKILL.md                # In-Context Agent Skill Definition
└── README.md                # Agent-First Documentation
```

---

## 🚀 Quick Start for Agents

### 1. Expand Prompt by Visual Domain
```bash
# Auto-detect domain or explicitly specify (--domain logo_branding|cover_thumbnail|face_swap_ugc|sales_creative|anime|infographic|...)
npx vibe-design-harness expand "Minimalist vector logo for AI startup" logo_branding
```

### 2. Run the UI Linter
```bash
npx vibe-design-harness lint component.html
```

---

## 🤝 Community & Contributing

Built for the open-source AI agent community! PRs and issue submissions welcome.

*Maintained by [@teddiesloco](https://github.com/teddiesloco)*
