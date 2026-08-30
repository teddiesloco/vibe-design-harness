# VibeDesign-Harness 🎨🛡️

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Server](https://img.shields.io/badge/MCP%20Server-Compatible-purple.svg)](https://modelcontextprotocol.io)
[![Runtime](https://img.shields.io/badge/Runtime-100%25%20Pure%20JS%20(Zero%20Python)-brightgreen)](https://github.com/teddiesloco/vibe-design-harness)

> **The Quality Harness for Vibe Coding.** Guarantees studio-grade UI/UX for Websites, SaaS WebApps, and Mini Apps by enforcing design system guardrails and purging AI-slop deterministically in <1ms.

---

## 🎯 The Single Pain Point in Vibe Coding

Everyone is **vibe coding** today with Claude 3.7, Cursor, Gemini, and Codex CLI. Coding functionality has become effortless, but **visual design quality remains completely unconstrained**:

1. **AI-Slop Visual Drift:** Without deterministic guardrails, AI default to generic purple gradients (`from-purple-600 to-indigo-600`), unstyled raw buttons, washed-out gray backdrops (`bg-gray-800`), and claustrophobic whitespace.
2. **Design System Fragmentation:** Prompts alone cannot reliably enforce token scales, typographic hierarchy, and WCAG AA contrast across multi-turn sessions.

### 🛡️ The Solution: A Pure Design Harness
`vibe-design-harness` is **not a heavy component library**. It is an **active quality harness** that sits between your AI coding agent and your output code:
* **Pre-generation:** Injects unified architectural design tokens (`DESIGN.md`) across 12+ curated styles.
* **Post-generation:** Audits and catches aesthetic anti-patterns in <1ms via zero-token deterministic AST/regex rules.

---

## 💎 Verified Showcase Proofs (Generated via Gemini 3.7 + Harness)

Inspect verified, zero-slop production samples built with Gemini 3.7 Flash & VibeDesign Harness in `examples/`:

1. **[Vogue Luxury Editorial (`examples/luxury_editorial.html`)](https://github.com/teddiesloco/vibe-design-harness/blob/main/examples/luxury_editorial.html)**
   * *Style:* Deep obsidian palette (`#050505`), Playfair serif typography, Champagne gold accents (`#d4af37`), generous editorial breathing room.
2. **[Swiss Pure Minimalism (`examples/swiss_minimalism.html`)](https://github.com/teddiesloco/vibe-design-harness/blob/main/examples/swiss_minimalism.html)**
   * *Style:* Monolithic layout, strict grid hierarchy, pristine high-contrast monochrome surfaces (`#ffffff` / `#000000`).
3. **[Deep Space Glassmorphism SaaS (`examples/glassmorphism_saas.html`)](https://github.com/teddiesloco/vibe-design-harness/blob/main/examples/glassmorphism_saas.html)**
   * *Style:* Frosted acrylic surfaces (`backdrop-blur-xl`), emerald cyan neon accents (`#00f0ff`), layered multi-tier depth.

---

## ⚡ Quick Start (CLI & NPX)

### 1. Audit Any UI Code for AI-Slop (Zero-Token Linter)
Catch washed-out grays, purple gradient cliches, and unstyled interactive elements instantly:
```bash
npx vibe-design-harness lint src/components/Dashboard.html
```

### 2. Scaffold Instant Reference Layout
Generate a baseline reference layout adhering 100% to selected design system rules:
```bash
npx vibe-design-harness scaffold luxury_editorial my_page.html
npx vibe-design-harness scaffold minimalism webapp.html
```

### 3. Generate Agent Design System Tokens
Pre-inject architectural design tokens into your coding agent's context window:
```bash
npx vibe-design-harness design-system luxury_gold "#d4af37"
npx vibe-design-harness design-system minimalism
```

---

## 🔌 Model Context Protocol (MCP) Setup

Add to your `claude_desktop_config.json`, Cursor, or Hermes Agent:

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

---

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco) — Built for the Autonomous Vibe Coding Era.
