# AGS Design & Visual Studio Harness (v2.1.0)

[![Version](https://img.shields.io/badge/version-2.1.0-10b981.svg)](#)
[![Engine](https://img.shields.io/badge/Engine-AGS_Studio_2026-0e1116.svg)](#)
[![App_UI_UX](https://img.shields.io/badge/App_Dashboard_Faces-10_Faces_%C3%97_49_Specs-4f46e5.svg)](#)
[![Vietnamese Diacritics](https://img.shields.io/badge/Vietnamese_Glyphs-134%2F134_Verified-1f6f3d.svg)](#)

> **Industrial-Grade UI/UX & App Dashboard Architecture Engine + 35-Gate Anti-Slop Linter (<1ms) + Live Playwright DOM Probe + 5-Platform Visual Prompt Compiler + CapCut Vietnamese Typography Engine for AI Agents.**  
> Built by **AGS (AgentSea Design System)** for Claude Code, Cursor, Codex, and Hermes Agents.

---

## 🏛️ Architecture Overview (v2.1.0)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         AGS DESIGN & VISUAL STUDIO HARNESS v2.1.0                               │
├────────────────────────┬────────────────────────┬────────────────────────┬──────────────────────┤
│ 1. App & Dashboard     │ 2. UI/UX Anti-Slop     │ 3. 5-Engine Studio     │ 4. CapCut VN         │
│    Architecture Engine │    Linter & Probe      │    Prompt Compiler     │    Typography        │
├────────────────────────┼────────────────────────┼────────────────────────┼──────────────────────┤
│ • 10 Named Faces (5 Ax)│ • 35+ AST/Regex Gates  │ • Nano Banana Pro (2.1)│ • 38 CapCut Fonts    │
│ • 10 Content Layouts   │ • Scoped Audits & Fix  │ • OpenAI GPT-Image-2   │ • U+0102–U+1EF9      │
│ • 12 Industry Palettes │ • Live Playwright DOM  │ • ByteDance Seedance   │   Glyph Checker      │
│ • 19 Locked Rules      │   Probe (probe.mjs)    │ • Midjourney V7        │ • Transparent SVG +  │
│ • 49 Cleanroom Specs   │ • 15 Landing Themes    │ • FLUX.1 Pro / SDXL    │   CapCut JSON Export │
└────────────────────────┴────────────────────────┴────────────────────────┴──────────────────────┘
```

---

## 🚀 Key Capabilities (v2.1.0)

| Module | Capability | Output / Guarantee |
| :--- | :--- | :--- |
| **10-Face Dashboard Engine** | `recommendDashboardSystem()` & `scaffoldDashboardApp()` | Selects and scaffolds the right App Dashboard Face across 5 orthogonal axes (`Clean`, `Dark Sidebar`, `Soft`, `Midnight`, `Inset`, `Paper`, `Float`, `Rail`, `Topbar`, `Editorial`), 10 job-driven screen layouts, and 12 WCAG-verified industry accent palettes. |
| **Tailwind v4 Token Generator** | `generateAppTokensCSS()` | Generates complete `:root`, `.dark`, `.force-light`, `.force-dark`, `@theme inline`, semantic status tokens, and 4px transparent-thumb autohide scrollbars (`tokens.css`). |
| **49 Cleanroom UI/UX Specs** | `getAppUIReference()` | Instant programmatic or CLI lookup across 49 deep layout & component playbooks (`layouts/app`, `layouts/overlay`, `layouts/form`, `styles`, `budgets`, `locked-rules`, `review`, `checklist`, `components/*`). |
| **Live Playwright DOM Probe** | `runLiveUIProbe()` (`scripts/probe.mjs`) | Multi-viewport (`375..1920`) computed DOM & WCAG inspector with `--quick`, `--stress` (60-char Vietnamese strings & 10-digit numbers), `--sweep`, and `--dark`. |
| **35+ Gate UI Linter** | `lintUI()` & `fixUI()` | Sub-millisecond audit blocking purple AI gradients, banned fonts, nested cards, solid-red destructive buttons (`I4`), `hover:scale-105` card blur, `scrollbar-none` layout shifts, and Tailwind v4 circular tokens. |
| **Studio Brief Compiler** | `compileStudioImagePrompt()` | Converts natural Vietnamese or English into a 7-part Art Director Brief + 5 platform adapters (`Nano Banana Pro`, `GPT-Image-2`, `Midjourney V7`, `FLUX`, `Seedance 2.5`). |
| **CapCut VN Typography** | `checkVietnameseFontSupport()` & `exportTypographyAsset()` | Verifies 134/134 Vietnamese stacked diacritics (`U+0102–U+1EF9`) and exports transparent SVG + CapCut/Figma JSON overlays. |

---

## ⚡ CLI Reference

```bash
# 1. Recommend App Dashboard Face, Screen Content Layout & Industry Accent
npx vibe-design-harness dashboard "Nhân viên kế toán" --job "Bảng dữ liệu" --industry "Tài chính"

# 2. Scaffold a zero-slop App Dashboard screen (HTML or React TSX)
npx vibe-design-harness scaffold-dashboard clean Dashboard.html
npx vibe-design-harness scaffold-dashboard dark_sidebar Dashboard.tsx --framework react --accent indigo

# 3. Generate production Tailwind v4 tokens.css (:root, .dark, @theme inline, 4px autohide scrollbar)
npx vibe-design-harness tokens-css soft violet tokens.css

# 4. Browse or read any of the 49 Cleanroom App UI/UX reference specs
npx vibe-design-harness ui-ref list
npx vibe-design-harness ui-ref layouts/app
npx vibe-design-harness ui-ref components/charts

# 5. Run live Playwright multi-viewport DOM & WCAG inspector
npx vibe-design-harness probe http://localhost:3000 --quick --stress

# 6. Audit & auto-fix HTML/React TSX files for 35+ AI-slop & Dashboard rules (<1ms)
npx vibe-design-harness lint src/App.tsx --fix

# 7. Compile visual prompts & check Vietnamese fonts (U+0102–U+1EF9)
npx vibe-design-harness format "Poster dọc du lịch đảo Phú Quý hoàng hôn" --platform midjourney
npx vibe-design-harness check-font "Be Vietnam Pro"
```

---

## 🔌 Model Context Protocol (MCP Server — 14 Tools)

Add **AGS Design Harness MCP** to Claude Desktop, Claude Code, Cursor, or Hermes Agent:

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

### Exposed MCP Tools (14 Tools)
1. `recommend_dashboard_system` — Recommends Dashboard Face (10 Faces), Screen Content Layout (10 layouts), and WCAG Industry Accent Palette.
2. `scaffold_dashboard_app` — Scaffolds zero-slop App Dashboard screens (HTML or React TSX) following the 10-Face Architecture and 19 Locked Rules.
3. `generate_app_tokens_css` — Generates Tailwind v4 `tokens.css` with `:root`, `.dark`, `@theme inline`, and 4px autohide scrollbars.
4. `get_app_ui_reference` — Reads or lists the 49 Cleanroom App UI/UX reference playbooks & component specifications.
5. `run_live_ui_probe` — Runs or builds the CLI command for the live Playwright multi-viewport DOM & WCAG probe (`scripts/probe.mjs`).
6. `lint_ui_aesthetic` — Runs the 35+ gate deterministic UI/UX & Dashboard anti-slop linter + auto-fixer.
7. `scaffold_landing_page` — Scaffolds complete HTML or React TSX landing pages across 15 themes.
8. `run_design_command` — Executes 12 post-processing design flows (`audit`, `critique`, `polish`, `distill`, `bolder`, `quieter`, `delight`, `harden`, `clarify`, `adapt`, `colorize`, `animate`).
9. `generate_design_system` — Generates paired `DESIGN.md` + `PRODUCT.md` brand specifications.
10. `compile_studio_brief` — Compiles natural Vietnamese/English prompts into a 7-part Studio Image Brief + platform-specific payload.
11. `get_capcut_preset` — Returns verified CapCut Vietnamese typography presets.
12. `check_vietnamese_font` — Checks font compatibility with Vietnamese extended Unicode (`U+0102–U+1EF9`).
13. `export_typography_asset` — Generates transparent SVG + CapCut/Figma JSON typography overlays.
14. `expand_image_prompt` — Expands prompts across 35+ camera-physics domains.

---

## 📂 Repository Structure

```
vibe-design-harness/
├── bin/
│   ├── cli.js                    # Unified CLI (dashboard, scaffold-dashboard, tokens-css, ui-ref, probe, lint, etc.)
│   └── mcp-server.js             # 14-Tool Model Context Protocol (MCP) stdio server
├── harness/
│   ├── app_ui_system.js          # Cleanroom 10-Face Dashboard Engine, 10 Content Layouts, 12 Industry Palettes, Token Generator
│   ├── ags_design_engine.js      # 15 Brand Themes (incl. ags_editorial) & DESIGN.md generator
│   ├── studio_image_engine.js    # 5 Platform Adapters, VN Font Checker & CapCut SVG/JSON Exporter
│   ├── prompt_expander.js        # 7-Part Studio Image Compiler & 35+ Visual Domains
│   ├── ui_linter.js              # 35+ Gate Sub-Millisecond Anti-Slop & Dashboard UI/UX Linter & Auto-Fixer
│   ├── design_commands.js        # 12 Post-Processing Design Flows & Craft Floor
│   ├── components.js             # Curated Pro UI Component Blocks (HTML & React TSX)
│   ├── landing_assembler.js      # Full-Page Landing Page Assembler
│   └── remote_rules.json         # Syncable Anti-Slop Ban Rules
├── references/
│   └── app-ui-ux/                # 49 Cleanroom App UI/UX Markdown & CSS Specifications (layouts, components, rules, tokens.css)
├── scripts/
│   ├── probe.mjs                 # Live Playwright Multi-Viewport DOM, Overflow, Contrast & Stress Probe
│   └── lint-skill.mjs            # Cleanroom Prose & Specification Linter
├── prompts/
│   └── prompt_bank.json          # Curated Studio Prompt Templates
├── tests/
│   └── test.js                   # Zero-Defect Automated Test Runner
├── index.js                      # ESM Public API Entry Point
├── SKILL.md                      # Agent Skill Specification
└── package.json                  # Package Manifest (v2.1.0)
```

---

## 📄 License
MIT © AgentSea (AGS)
