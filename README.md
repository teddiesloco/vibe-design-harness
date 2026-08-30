# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Server Compatible](https://img.shields.io/badge/MCP%20Server-v1.6.0-purple.svg)](https://modelcontextprotocol.io)
[![Runtime: 100% Pure JS](https://img.shields.io/badge/Runtime-100%25%20Pure%20JS%20(Zero%20Python)-brightgreen)](https://github.com/teddiesloco/vibe-design-harness)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%20%7C%20Codex%20CLI%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **Universal Zero-Token UI/UX Linter + Multi-Theme Design System Engine & 25+ Domain Studio Image Harness. 100% Pure JavaScript (Zero Python Dependency).**

---

## 🏛️ Core Highlights & Architectural Upgrades (v1.1.0)

1. **⚡ 100% Pure JavaScript / Zero Python:** Runs directly in Node.js, Bun, Deno, Vercel, and CI runners with 0ms execution lag.
2. **🎨 Multi-Theme & Multi-Style Design Systems:** Not locked into one style. Generates `DESIGN.md` across **6 distinct themes**:
   - `linear`: Dark precision (`#08090a`, Inter, accent indigo).
   - `stripe`: Enterprise clean light (`#f8fbfd`, clean borders, accent purple).
   - `vercel`: Minimalist monochrome dark (`#000000`, Geist Mono).
   - `airbnb`: Warm soft light (`#ffffff`, Circular, soft shadows).
   - `luxury_gold`: Dark emerald & gold editorial (`#051610`, gold accent).
   - `cyberpunk`: Neon high-contrast grid (`#090a0f`, JetBrains Mono, cyan/magenta).
3. **📸 25+ Pro Visual Prompt Domains:** Studio optics, lighting physics, camera lenses, and negative constraints for **Gemini Imagen 3+, GPT Image 2, DALL-E, and Midjourney**.
4. **🔄 Dynamic Remote Rule Sync:** Auto-syncs latest anti-AI-slop heuristics from cloud with in-memory caching.
5. **🔌 Full Model Context Protocol (MCP) Support:** Plug-and-play with Cursor, Claude Desktop, Gemini CLI, and Hermes Agent.

---

## 🔌 Model Context Protocol (MCP) Setup

Add to your `mcpServers` configuration (`claude_desktop_config.json` or Cursor):

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

### Exposed MCP Tools
- `lint_ui_aesthetic`: Audit HTML/Tailwind string or file path for AI-slop anti-patterns.
- `expand_image_prompt`: Expand raw prompt across 25+ specialized visual domains with lighting/aspect ratio modifiers.
- `generate_brand_design_md`: Scaffold multi-theme design tokens (`linear`, `stripe`, `vercel`, `airbnb`, `luxury_gold`, `cyberpunk`).
- `list_design_themes`: List all available design themes and active palettes.

---

## 🚀 CLI Commands

```bash
# Audit generated HTML UI
npx vibe-design-harness lint component.html

# Expand prompt across 25+ visual domains
npx vibe-design-harness expand "Cyberpunk alley in rain" cyberpunk_anime
npx vibe-design-harness expand "Luxury skincare bottle" editorial_luxury
npx vibe-design-harness expand "MrBeast mystery vault with 3D red arrow" mrbeast_ab_thumbnail_variant_b

# Generate design tokens for your project
npx vibe-design-harness design-system luxury_gold "#e5c07b"
npx vibe-design-harness design-system vercel

# List themes and domains
npx vibe-design-harness themes
npx vibe-design-harness domains
```

---

## 💻 Programmatic JavaScript API

```javascript
import { lintUI, expandPrompt, generateDesignMD, listThemes } from 'vibe-design-harness';

// 1. Audit UI code
const report = lintUI('<div class="bg-zinc-950 text-white font-sans"><button class="bg-emerald-500 rounded px-4 py-2">Submit</button></div>');
console.log(report.passed); // true

// 2. Expand prompt
const imagePrompt = expandPrompt('Portrait of an architect', 'editorial_luxury', {
    lighting: 'dramatic softbox',
    aspectRatio: '4:5'
});

// 3. Generate DESIGN.md
const designTokens = generateDesignMD('luxury_gold');
```

---

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco)
