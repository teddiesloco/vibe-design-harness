# VibeDesign-Harness Skill Reference 🎨🤖

Universal AI Agent UI/UX Design System Engine, Full Landing Page Assembler & Multi-Model Image Prompt Harness (Midjourney, FLUX.1, SDXL, Imagen, GPT Image) for Codex CLI, Claude, Gemini & Hermes.

---

## Overview

`vibe-design-harness` equips LLM coding and creative agents with:
1. **Instant Landing Page Assembler:** Assemble complete responsive landing pages (Hero Spotlight, Bento Grid, Pricing Matrix, Navbar, Footer) in <1ms.
2. **12+ Design System Themes:** Minimalism, Luxury Editorial, Luxury Gold, Quiet Luxury, Nordic Clean, Zen Japanese, Neo-Brutalism, Glassmorphism, Linear, Stripe, Vercel.
3. **Universal Multi-Model Image Engine:** Enforce Hasselblad/Leica camera optics, studio lighting physics, and strict negative constraints across **Midjourney v6+, FLUX.1, SDXL, Imagen 3, GPT Image 2, Recraft V3, and Ideogram 2.0**.
4. **Deterministic Zero-Token UI Linter:** 100% Pure JavaScript anti-slop linter catching bad grays, purple gradients, and unstyled buttons.

---

## Available Commands

### 1. Scaffold Full Landing Page
```bash
npx vibe-design-harness scaffold luxury_editorial my_page.html
npx vibe-design-harness scaffold minimalism
npx vibe-design-harness scaffold glassmorphism_dark
```

### 2. Lint UI Code
```bash
npx vibe-design-harness lint component.html
```

### 3. Expand Visual Image Prompt (Universal Model Support)
```bash
npx vibe-design-harness expand "Luxury skincare serum bottle on dark granite" luxury_editorial
npx vibe-design-harness expand "Old money architectural villa" quiet_luxury
npx vibe-design-harness expand "MrBeast mystery vault with 3D red arrow" mrbeast_ab_thumbnail_variant_b
```

### 4. Generate DESIGN.md Tokens
```bash
npx vibe-design-harness design-system luxury_gold "#d4af37"
npx vibe-design-harness design-system minimalism
```

---

## MCP Server Integration

Add to `claude_desktop_config.json` or Cursor MCP configuration:

```json
{
  "mcpServers": {
    "vibe-design-harness": {
      "command": "npx",
      "args": ["-y", "vibe-design-harness-mcp"]
    }
  }
}
```
