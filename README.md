# VibeDesign-Harness 🎨🛡️

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pure JavaScript](https://img.shields.io/badge/Pure_JS-100%25-yellow.svg)](https://nodejs.org)
[![Zero AI-Slop](https://img.shields.io/badge/AI--Slop-0%25_Deterministic-brightgreen.svg)](#)

> **Universal Quality Harness & Aesthetic Linter for AI Coding Agents.**  
> Pre-generation design tokens + Post-generation deterministic anti-slop linter (<1ms) & auto-fixer. Built for **Cursor, Claude Code, Codex CLI, Gemini 3.7 & Hermes Agent**.

---

## 🎯 1 Problem. 1 Niche. 1 Market Gap.

| The AI Coding Pain | The VibeDesign-Harness Fix |
| :--- | :--- |
| **Aesthetic AI-Slop:** AI models consistently generate cheap purple gradients (`from-purple-600 to-blue-600`), muddy gray backgrounds (`bg-gray-800`), and unstyled elements. | **Deterministic AST Linter (<1ms):** Intercepts and blocks 100% of generic AI anti-patterns before render. Supports `--fix` for instant token remediation. |
| **Visual Inconsistency:** Coding agents drift from brand guidelines across multi-turn sessions. | **Zero-Token Pre-Engine:** Injects structured `DESIGN.md` tokens (12 architectural themes: Swiss Minimalism, Vogue Editorial, Linear Dark, Quiet Luxury). |
| **Framework Lock-in:** Output locked into raw HTML. | **Modern Export:** Export directly to **React (TSX Tailwind / Lucide)** or clean standalone HTML. |

---

## 🚀 Quickstart

```bash
# 1. Audit any file or HTML component for AI-slop defects
npx vibe-design-harness lint src/App.html

# 2. Auto-fix detected AI-slop anti-patterns instantly
npx vibe-design-harness lint src/App.html --fix

# 3. Scaffold a studio-grade layout (React TSX or HTML)
npx vibe-design-harness scaffold luxury_editorial page.tsx --framework react

# 4. Generate DESIGN.md brand tokens for AI agents (Cursor / Claude)
npx vibe-design-harness design-system luxury_gold "#d4af37" > DESIGN.md

# 5. Expand visual prompt across 30+ domains (Midjourney, FLUX, Imagen 3, DALL-E 3)
npx vibe-design-harness expand "perfume bottle on obsidian stone" photorealism
```

---

## ⚙️ Custom Configuration (`.viberc.json`)

Customize brand rules and ban lists directly in your project root:

```json
{
  "banned_patterns": [
    "bg-red-500",
    "font-comic-sans"
  ]
}
```

---

## 🤖 Model Context Protocol (MCP Server)

Plug into **Claude Desktop**, **Cursor**, or **Hermes Agent** in 1 line:

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

### 🛠️ Exposed MCP Tools
* `lint_ui`: Deterministic UI/UX linter checking for AI-slop.
* `fix_ui`: Remediate AI-slop anti-patterns automatically.
* `get_design_system`: Generate `DESIGN.md` token specifications across 12 themes.
* `scaffold_landing_page`: Assemble complete zero-slop UI components in HTML or React TSX.
* `expand_image_prompt`: Studio-grade multi-model visual prompt generator (30+ domains).

---

## 💎 Verified Proof Cases (Generated with Gemini 3.7)

Pre-tested, zero-slop design samples available in `examples/`:
1. 🏛️ `examples/luxury_editorial.html` — Vogue Haute Couture Obsidian (`#050505`, Playfair serif, Champagne gold).
2. 📐 `examples/swiss_minimalism.html` — Swiss Pure Minimalism (High-contrast monochrome, Bauhaus ratio).
3. 🌌 `examples/glassmorphism_saas.html` — Deep Space SaaS WebApp (Multi-layer acrylic backdrop blur).

---

## 📄 License

MIT © [teddiesloco](https://github.com/teddiesloco)
