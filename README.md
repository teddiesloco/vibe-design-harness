# VibeDesign-Harness 🎨🛡️

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pure JavaScript](https://img.shields.io/badge/Pure_JS-100%25-yellow.svg)](https://nodejs.org)
[![Zero AI-Slop](https://img.shields.io/badge/AI--Slop-0%25_Deterministic-brightgreen.svg)](#)
[![High Conversion UI](https://img.shields.io/badge/Design_Engine-High_Conversion_UI-black.svg)](#)

> **Universal Quality Harness & Aesthetic Anti-Slop Linter for AI Coding Agents.**  
> Deterministic AST-based UI linter (<1ms) + High-Converting Design Token Engine + Studio-Grade Multi-Domain Visual Harness. Built for **Cursor, Claude Code, Codex CLI, Gemini 3.7 & Hermes Agent**.

---

## 🎯 1 Problem. 1 Niche. 1 Market Gap.

| The AI Coding Pain | The VibeDesign-Harness Fix (v1.4.0) |
| :--- | :--- |
| **Aesthetic AI-Slop & Toy-Box Logos:** AI models consistently generate cheap purple gradients (`from-purple-600 to-blue-600`), toy-box sticker initial squares, raw emoji badges, muddy gray backgrounds (`bg-gray-800`), and AI-slop fonts (`Syne`, `Space Grotesk`, `Outfit`). | **Deterministic AST Linter (<1ms):** Intercepts and blocks 100% of generic AI anti-patterns before render (including Hallmark 57 gates, font blacklists, and elongated pill buttons). Supports `--fix` for instant token remediation. |
| **Visual Inconsistency:** Coding agents drift from brand guidelines across multi-turn sessions. | **Zero-Token Pre-Engine:** Injects structured `DESIGN.md` tokens (14 architectural themes: Precision Quiet Luxury, Swiss Minimalism, Vogue Haute Couture, Linear Dark, Modern Clean). |
| **Framework Lock-in:** Output locked into raw HTML. | **Modern Export:** Export directly to **React (TSX Tailwind / Lucide)** or clean standalone High-Converting Sales Pages / WebApp HTML. |

---

## 🚀 Quickstart

```bash
# 1. Audit any file or HTML component for AI-slop defects (<1ms)
npx vibe-design-harness lint src/App.html

# 2. Auto-fix detected AI-slop anti-patterns instantly
npx vibe-design-harness lint src/App.html --fix

# 3. Scaffold a high-converting sales page or dashboard layout (React TSX or HTML)
npx vibe-design-harness scaffold apple_luxury page.tsx --framework react

# 4. Generate DESIGN.md brand tokens for AI agents (Cursor / Claude / Gemini)
npx vibe-design-harness design-system apple_luxury "#65a30d" > DESIGN.md

# 5. Expand visual prompt across 30+ domains (Midjourney, FLUX, Imagen 3, DALL-E 3)
npx vibe-design-harness expand "minimalist luxury ceramic vessel on travertine stone" photorealism
```

---

## 🛡️ Anti-Slop Deterministic Guardrail Rules

Our linter runs 100% deterministic pattern matching at zero token cost:

* 🚫 **`toy-box-logo`**: Bans 2-letter uppercase initials inside gradient rounded squares.
* 🚫 **`emoji-in-badge`**: Bans raw decorative emojis (`🔥`, `⭐`, `🪙`, `🎁`) inside buttons or status badges — enforces monochrome SVG stroke icons (`stroke-width="1.5"`).
* 🚫 **`harsh-multi-gradient`**: Blocks violent multi-gradient color clashes (e.g. red-to-cyan or pink-to-yellow) on cards.
* 🚫 **`generic-purple-ai`**: Blocks generic `from-purple-600 to-blue-600` default AI patterns.
* 🚫 **`ai-slop-fonts`**: Blocks generic AI fonts (`Space Grotesk`, `Syne`, `Outfit`, `Sora`, `Chivo`). Enforces clean grotesque or serif (`Inter`, `Plus Jakarta Sans`, `Oswald`).
* 🚫 **`elongated-pill-cta`**: Blocks unstyled `rounded-full px-12+` pill buttons; enforces balanced `rounded-lg` or `rounded-xl`.
* ✅ **`tabular-nums`**: Enforces strict monospace numeric alignment on telemetry dashboards and price tags.

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
* `lint_ui`: Deterministic UI/UX linter checking for AI-slop defects.
* `fix_ui`: Remediate AI-slop anti-patterns automatically.
* `get_design_system`: Generate `DESIGN.md` token specifications across 14 themes (including Quiet Luxury & Modern Clean).
* `scaffold_landing_page`: Assemble complete high-converting sales pages & UI components in HTML or React TSX.
* `expand_image_prompt`: Studio-grade multi-model visual prompt generator (30+ domains).

---

## 📄 License

MIT © [teddiesloco](https://github.com/teddiesloco)
