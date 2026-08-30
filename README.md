# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Server Compatible](https://img.shields.io/badge/MCP%20Server-v1.6.0-purple.svg)](https://modelcontextprotocol.io)
[![Runtime: 100% Pure JS](https://img.shields.io/badge/Runtime-100%25%20Pure%20JS%20(Zero%20Python)-brightgreen)](https://github.com/teddiesloco/vibe-design-harness)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%20%7C%20Codex%20CLI%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **Universal Zero-Token UI/UX Linter + 12-Theme Design System Engine & 30+ Domain Visual Studio Harness. 100% Pure JavaScript (Zero Python Dependency). Fully Customizable at Runtime.**

---

## 🏛️ Core Highlights & Capabilities (v1.1.0)

1. **⚡ 100% Pure JavaScript (Zero Python Runtime):** Runs in Node.js, Bun, Deno, Vercel, and CI runners with 0ms execution lag.
2. **🎨 12 Built-in Design System Themes + Unlimited Custom Themes:**
   - **`minimalism`**: Swiss pure minimalism (`#ffffff`, Helvetica Neue, strict negative space).
   - **`luxury_editorial`**: Vogue haute couture obsidian (`#0d0d0d`, Playfair Display, gold accent `#c5a059`).
   - **`luxury_gold`**: Dark emerald & gold luxury (`#051610`, Plus Jakarta Sans, `#d4af37`).
   - **`quiet_luxury`**: Old-money understated elegance (warm cashmere & linen tones, natural sunlight).
   - **`linear`**: Dark precision (`#08090a`, Inter, accent indigo `#5e6ad2`).
   - **`stripe`**: Enterprise clean light (`#f8fbfd`, clean crisp borders `#e6ebf1`, accent `#635bff`).
   - **`vercel`**: Minimalist monochrome dark (`#000000`, Geist Mono).
   - **`airbnb`**: Warm soft light (`#ffffff`, Circular font, soft ambient elevation).
   - **`nordic_clean`**: Serene pine & sage (`#f4f6f5`, Plus Jakarta Sans, deep forest accent).
   - **`zen_japanese`**: Washi paper & sumi ink (`#f7f5f0`, Noto Serif JP, vermilion accent).
   - **`neo_brutalism`**: High voltage pop (`#fef08a`, Space Grotesk, 4px hard shadow).
   - **`glassmorphism_dark`**: Deep space frosted acrylic glass (`rgba(17, 24, 39, 0.65)`, backdrop-blur).
3. **📸 30+ Pro Visual Prompt Domains:**
   - Studio optics, lighting physics, camera lenses, and negative constraints for **Gemini Imagen 3+, GPT Image 2, DALL-E, and Midjourney**.
4. **🛠️ Runtime Theme & Domain Registration:**
   - Define your own brand themes and prompt domains dynamically via code or CLI.
5. **🔌 Model Context Protocol (MCP) Server:** Plug-and-play for Cursor, Claude Desktop, and Hermes Agent.

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
- `expand_image_prompt`: Expand raw prompt across 30+ visual domains with lighting/aspect ratio/mood modifiers.
- `generate_brand_design_md`: Scaffold design tokens across 12 built-in themes or custom tokens.
- `list_design_themes`: List all available design themes and active palettes.

---

## 🚀 CLI Commands

```bash
# 1. Audit generated HTML UI
npx vibe-design-harness lint component.html

# 2. Expand prompt across visual domains
npx vibe-design-harness expand "Luxury skincare serum bottle on black granite" luxury_editorial
npx vibe-design-harness expand "Minimalist concrete villa" minimalism_visual
npx vibe-design-harness expand "MrBeast mystery vault with 3D red arrow" mrbeast_ab_thumbnail_variant_b

# 3. Generate design tokens for your project
npx vibe-design-harness design-system luxury_editorial "#d4af37"
npx vibe-design-harness design-system minimalism
npx vibe-design-harness design-system glassmorphism_dark

# 4. List all themes and domains
npx vibe-design-harness themes
npx vibe-design-harness domains
```

---

## 💻 Programmatic JavaScript API & Customization

```javascript
import { 
    lintUI, 
    expandPrompt, 
    generateDesignMD, 
    registerTheme, 
    registerDomain 
} from 'vibe-design-harness';

// 1. Audit UI Code (Zero Python)
const report = lintUI('<div class="bg-zinc-950 text-white font-sans"><button class="bg-emerald-500 rounded px-4 py-2">Submit</button></div>');
console.log(report.passed); // true

// 2. Expand Prompt with Custom Optics & Mood
const luxuryPrompt = expandPrompt('Diamond wristwatch on black velvet', 'luxury_editorial', {
    lighting: 'dramatic rim softbox',
    aspectRatio: '4:5',
    mood: 'exclusive high-end prestige'
});

// 3. Register a Custom Brand Theme Dynamically
registerTheme('my_agency', {
    name: 'AgentSea Luxury Dark',
    bg: '#040711',
    surface: '#0c1222',
    border: '#1e293b',
    accent: '#10b981',
    font: 'Plus Jakarta Sans, sans-serif'
});

// 4. Generate DESIGN.md
const designDoc = generateDesignMD('my_agency');
```

---

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco)
