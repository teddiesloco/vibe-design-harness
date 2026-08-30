# VibeDesign-Harness 🎨🛡️

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pure JavaScript](https://img.shields.io/badge/Pure_JS-100%25-yellow.svg)](https://nodejs.org)
[![Zero AI-Slop](https://img.shields.io/badge/AI--Slop-0%25_Deterministic-brightgreen.svg)](#)
[![Apple Quiet Luxury](https://img.shields.io/badge/Design_DNA-Apple_%26_21st.dev-black.svg)](#)

> **Universal Quality Harness & Aesthetic Anti-Slop Linter for AI Coding Agents.**  
> Deterministic AST-based UI linter (<1ms) + 21st.dev Apple Quiet Luxury Token Engine + Studio-Grade Multi-Domain Visual Harness. Built for **Cursor, Claude Code, Codex CLI, Gemini 3.7 & Hermes Agent**.

---

## 🎯 1 Problem. 1 Niche. 1 Market Gap.

| The AI Coding Pain | The VibeDesign-Harness Fix (v1.3.0) |
| :--- | :--- |
| **Aesthetic AI-Slop & Toy-Box Logos:** AI models consistently generate cheap purple gradients (`from-purple-600 to-blue-600`), toy-box sticker initial squares, raw emoji badges, and muddy gray backgrounds (`bg-gray-800`). | **Deterministic AST Linter (<1ms):** Intercepts and blocks 100% of generic AI anti-patterns before render. Enforces `tabular-nums` and monochrome micro-depth. Supports `--fix` for instant token remediation. |
| **Visual Inconsistency:** Coding agents drift from brand guidelines across multi-turn sessions. | **Zero-Token Pre-Engine:** Injects structured `DESIGN.md` tokens (14 architectural themes: Apple Quiet Luxury Light, Swiss Minimalism, Vogue Haute Couture, Linear Dark, shadcn/21st Clean). |
| **Framework Lock-in:** Output locked into raw HTML. | **Modern Export:** Export directly to **React (TSX Tailwind / Lucide)** or clean standalone WebApp HTML. |

---

## 🚀 Quickstart

```bash
# 1. Audit any file or HTML component for AI-slop defects (<1ms)
npx vibe-design-harness lint src/App.html

# 2. Auto-fix detected AI-slop anti-patterns instantly
npx vibe-design-harness lint src/App.html --fix

# 3. Scaffold a studio-grade layout (React TSX or HTML)
npx vibe-design-harness scaffold apple_luxury page.tsx --framework react

# 4. Generate DESIGN.md brand tokens for AI agents (Cursor / Claude / Gemini)
npx vibe-design-harness design-system apple_luxury "#65a30d" > DESIGN.md

# 5. Expand visual prompt across 30+ domains (Midjourney, FLUX, Imagen 3, DALL-E 3)
npx vibe-design-harness expand "minimalist luxury ceramic vessel on travertine stone" photorealism
```

---

## 🛡️ Anti-Slop Deterministic Guardrail Rules (21st.dev Standard)

Our linter runs 100% deterministic pattern matching at zero token cost:

* 🚫 **`toy-box-logo`**: Bans 2-letter uppercase initials inside gradient rounded squares.
* 🚫 **`emoji-in-badge`**: Bans raw decorative emojis (`🔥`, `⭐`, `🪙`, `🎁`) inside buttons or status badges — enforces monochrome SVG stroke icons (`stroke-width="1.5"`).
* 🚫 **`harsh-multi-gradient`**: Blocks violent multi-gradient color clashes (e.g. red-to-cyan or pink-to-yellow) on cards.
* 🚫 **`generic-purple-ai`**: Blocks generic `from-purple-600 to-blue-600` default AI patterns.
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
* `get_design_system`: Generate `DESIGN.md` token specifications across 14 themes (including Apple Quiet Luxury & shadcn/21st).
* `scaffold_landing_page`: Assemble complete zero-slop UI components in HTML or React TSX.
* `expand_image_prompt`: Studio-grade multi-model visual prompt generator (30+ domains).

---

## 💎 Verified Proof Cases (100% Deterministic & Anonymized)

Pre-tested, zero-slop design samples available in `examples/`:
1. 🏛️ `examples/agent_services_dashboard.html` — Multi-Agent Management & Leasing OS (8 Modules SPA, Apple Quiet Luxury Light `#fbfbfd`, Lime & Ruby accents).
2. 🏆 `examples/rewards_store_dashboard.html` — 1-1-1 Knowledge & Digital Resource Store (3D book spine depth, SF Pro typography).
3. 🎯 `examples/focus_camp_dashboard.html` — Sprint Hub & 90-Day Discipline Academy (Top XP Leaderboards, Habit Streaks).
4. 📊 `examples/admin_command_center.html` — AETHER Telemetry & Swarm AI Mission Control.
5. 📐 `examples/swiss_minimalism.html` — Swiss Pure Minimalism (High-contrast monochrome, Bauhaus ratio).
6. 🌌 `examples/glassmorphism_saas.html` — Deep Space SaaS WebApp (Multi-layer acrylic backdrop blur).
7. 🍾 `examples/luxury_editorial.html` — Vogue Haute Couture Obsidian (`#050505`, Playfair serif, Champagne gold).

---

## 📄 License

MIT © [teddiesloco](https://github.com/teddiesloco)
