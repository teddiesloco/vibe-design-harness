# VibeDesign-Harness (v3.0.0)

[![Version](https://img.shields.io/badge/version-3.0.0-10b981.svg)](#)
[![Focus](https://img.shields.io/badge/Single_Purpose-Pure_UI%2FUX_Engineering-0e1116.svg)](#)
[![App_UI_UX](https://img.shields.io/badge/App_Dashboard_Faces-10_Faces_%C3%97_49_Specs-4f46e5.svg)](#)
[![Scroll_Choreography](https://img.shields.io/badge/Scroll_Choreography-60fps_VibeScroll_Engine-f59e0b.svg)](#)

> **Single-Purpose, Industrial-Grade UI/UX Engineering Harness for AI Agents:**
> 1. **App & Dashboard Architecture Engine** (10 Named Faces · 10 Screen Content Layouts · 12 Industry Accent Palettes · 19 Locked Rules · 49 Cleanroom Specs · Tailwind v4 Token Generator).
> 2. **60fps Scroll Choreography & Scrollytelling Engine** (5 Scroll Grammars · 16 `data-sc-*` Choreography Devices · 8 Visual Worlds · Worldflight Mode · 6-Dimension Uniqueness Fingerprint Gate · Zero-Dependency `vibe-scroll.js` + `vibe-scroll.css`).
> 3. **Landing Page & Design System Engine** (14 Brand Themes · Paired `DESIGN.md` + `PRODUCT.md` · 12 Post-Processing UI Flows · Curated Pro Component Blocks · Vietnamese Diacritics Guard).
> 4. **35+ Gate Anti-Slop Linter & Live Playwright DOM Probe** (`lintUI()` / `fixUI()` in `<1ms` + `scripts/probe.mjs` & `scripts/scroll-shoot.mjs`).

---

## 🏛️ Unified 4-Pillar UI/UX Architecture (v3.0.0)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              VIBE-DESIGN-HARNESS v3.0.0 (PURE UI/UX)                            │
├────────────────────────┬────────────────────────┬────────────────────────┬──────────────────────┤
│ 1. App & Dashboard     │ 2. Scroll Choreography │ 3. Landing & Design    │ 4. Anti-Slop Linter  │
│    10-Face System      │    (60fps VibeScroll)  │    System Tokens       │    & Live DOM Probe  │
├────────────────────────┼────────────────────────┼────────────────────────┼──────────────────────┤
│ • 10 Named Faces (5 Ax)│ • 5 Scroll Grammars    │ • 14 Curated Themes    │ • 35+ AST/Regex Gates│
│ • 10 Content Layouts   │ • 16 data-sc-* Devices │ • Paired DESIGN.md &   │ • Auto-Fixer (<1ms)  │
│ • 12 Industry Palettes │ • 8 Visual Worlds      │   PRODUCT.md Generator │ • Live Playwright    │
│ • 19 Locked Rules      │ • Worldflight Rig      │ • 12 Post-Processing   │   Probe (probe.mjs)  │
│ • 49 Cleanroom Specs   │ • 6-Dim Fingerprint    │   Refinement Flows     │ • Scroll Contact     │
│ • Tailwind v4 Tokens   │ • vibe-scroll.js/.css  │ • VN Font Glyph Guard  │   Sheet (shoot.mjs)  │
└────────────────────────┴────────────────────────┴────────────────────────┴──────────────────────┘
```

---

## 🚀 Key Capabilities (v3.0.0)

| Pillar | Core Functions | Output / Guarantee |
| :--- | :--- | :--- |
| **1. App & Dashboard System** | `recommendDashboardSystem()`, `scaffoldDashboardApp()`, `generateAppTokensCSS()`, `getAppUIReference()` | Selects and scaffolds the optimal App Dashboard Face (`Clean`, `Dark Sidebar`, `Soft`, `Midnight`, `Inset`, `Paper`, `Float`, `Rail`, `Topbar`, `Editorial`), 10 job-driven screen layouts, 12 WCAG-verified industry accents, Tailwind v4 `tokens.css`, and 49 Cleanroom specs. |
| **2. Scroll Choreography Engine** | `recommendScrollChoreography()`, `scaffoldScrollStoryPage()`, `verifyScrollFingerprint()`, `getScrollChoreographyReference()` | 60fps scrollytelling powered by `vibe-scroll.js` & `vibe-scroll.css` (`scrub`, `pin`, `pan`, `flow`, `worldflight`, `kinetic`, `reveal`, `drift`, `tilt`, `magnet`, `spotlight`). Enforces the 6-dimension Uniqueness Fingerprint Gate (`>= 4/6` dimensions must differ from every prior build). |
| **3. Landing & Design System** | `generateDesignMD()`, `generateProductMD()`, `scaffoldLandingPage()`, `getDesignCommand()`, `checkVietnameseFontSupport()` | Generates paired `DESIGN.md` + `PRODUCT.md`, scaffolds zero-slop HTML/React TSX landing pages across 14 themes, runs 12 post-processing flows (`polish`, `distill`, `harden`, `critique`, etc.), and guards Vietnamese typography (`U+0102–U+1EF9`). |
| **4. Linter & Live DOM Probe** | `lintUI()`, `fixUI()`, `runLiveUIProbe()` | Sub-millisecond static audit blocking 35+ AI-slop & dashboard anti-patterns + live Playwright multi-viewport DOM & WCAG inspection (`375..1920`) and scroll contact-sheet verification. |

---

## ⚡ CLI Reference

```bash
# 1. App & Dashboard Architecture (10 Faces × 10 Layouts × 49 Specs)
npx vibe-design-harness dashboard "ketoan" --job "bang du lieu" --industry "tai chinh"
npx vibe-design-harness scaffold-dashboard clean Dashboard.html
npx vibe-design-harness tokens-css soft violet tokens.css
npx vibe-design-harness ui-ref layouts/app

# 2. Scroll Choreography & Scrollytelling (5 Grammars × 16 Devices × 8 Worlds)
npx vibe-design-harness scroll "luxury architectural resort spatial flythrough"
npx vibe-design-harness scaffold-scroll Story.html --brand "AETHER" --grammar filmic_six_act --inline
npx vibe-design-harness scroll-ref devices
npx vibe-design-harness scroll-ref engine/vibe-scroll.js

# 3. Landing Pages, Design System Tokens & 12 Post-Processing Commands
npx vibe-design-harness init-context ags_editorial --name "AgentSea"
npx vibe-design-harness scaffold linear Landing.tsx --framework react
npx vibe-design-harness command polish
npx vibe-design-harness check-font "Be Vietnam Pro"

# 4. 35+ Gate Anti-Slop Linter & Live Playwright DOM Probe
npx vibe-design-harness lint src/App.tsx --fix
npx vibe-design-harness probe http://localhost:3000 --quick --stress
```

---

## 🔌 Model Context Protocol (MCP Server — 13 UI/UX Tools)

Add **VibeDesign-Harness MCP** to Claude Code, Cursor, Codex, or Hermes Agent:

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

### Exposed MCP Tools (13 Focused UI/UX Tools)
1. `lint_ui_aesthetic` — Runs the 35+ gate deterministic UI/UX & Dashboard anti-slop linter + auto-fixer.
2. `generate_design_system` — Generates paired `DESIGN.md` + `PRODUCT.md` brand specifications across 14 themes.
3. `scaffold_landing_page` — Scaffolds complete HTML or React TSX landing pages.
4. `recommend_dashboard_system` — Recommends Dashboard Face (10 Faces), Screen Content Layout (10 layouts), and WCAG Industry Accent Palette.
5. `scaffold_dashboard_app` — Scaffolds zero-slop App Dashboard screens (HTML or React TSX) following the 10-Face Architecture and 19 Locked Rules.
6. `generate_app_tokens_css` — Generates Tailwind v4 `tokens.css` with `:root`, `.dark`, `@theme inline`, and 4px autohide scrollbars.
7. `get_app_ui_reference` — Reads or lists the 49 Cleanroom App UI/UX reference playbooks & component specifications.
8. `recommend_scroll_choreography` — Recommends a 60fps Scroll Choreography Blueprint (5 Scroll Grammars, 8 Visual Worlds, 16 Choreography Devices).
9. `scaffold_scroll_story` — Scaffolds a 60fps Scrollytelling page powered by `vibe-scroll.js` and `vibe-scroll.css`.
10. `get_scroll_choreography_reference` — Reads or lists the 14 Cleanroom Scroll Choreography specifications & runtime engine files.
11. `verify_scroll_fingerprint` — Validates a planned scrollytelling build against the 6-dimension Uniqueness Fingerprint Gate (`>= 4/6` differences).
12. `run_live_ui_probe` — Runs or builds the CLI command for the live Playwright multi-viewport DOM & WCAG probe (`scripts/probe.mjs`).
13. `run_design_command` & `check_vietnamese_font` — Executes 12 post-processing UI flows and validates Vietnamese font glyph support.

---

## 📂 Clean Repository Structure

```
vibe-design-harness/
├── bin/
│   ├── cli.js                        # Unified UI/UX CLI (lint, dashboard, scroll, scaffold, tokens-css, probe)
│   └── mcp-server.js                 # 13-Tool Model Context Protocol (MCP) stdio server
├── harness/
│   ├── ags_design_engine.js          # 14 Brand Themes, DESIGN.md generator & Vietnamese Font Guard
│   ├── app_ui_system.js              # 10-Face Dashboard Engine, 10 Content Layouts, 12 Industry Palettes, Token Generator
│   ├── scroll_choreography.js        # 60fps Scroll Choreography Engine (5 Grammars, 16 Devices, 8 Worlds, Fingerprint Gate)
│   ├── ui_linter.js                  # 35+ Gate Sub-Millisecond Anti-Slop & Dashboard Linter & Auto-Fixer
│   ├── design_commands.js            # 12 Post-Processing UI Flows & Craft Floor
│   ├── components.js                 # Curated Pro UI Component Blocks (HTML & React TSX)
│   ├── landing_assembler.js          # Full-Page Landing Page Assembler
│   └── remote_rules.json             # Syncable Anti-Slop Ban Rules
├── references/
│   ├── app-ui-ux/                    # 49 Cleanroom App & Dashboard UI/UX Specifications (layouts, components, rules, tokens.css)
│   └── scroll-choreography/          # 14 Cleanroom Scrollytelling Specs & Runtime (engine/vibe-scroll.js, engine/vibe-scroll.css)
├── scripts/
│   ├── probe.mjs                     # Live Playwright Multi-Viewport DOM, Overflow, Contrast & Stress Probe
│   ├── scroll-shoot.mjs              # Playwright Scroll Contact-Sheet & Cue Settlement Harness
│   ├── worldflight-assert.mjs        # Continuous Camera Worldflight Rig Assertions
│   └── lint-skill.mjs                # Cleanroom Reference Prose & Specification Linter
├── tests/
│   └── test.js                       # 7-Suite Zero-Defect Automated Test Runner
├── index.js                          # ESM Public API Entry Point
├── SKILL.md                          # Agent Skill Specification
└── package.json                      # Package Manifest (v3.0.0)
```

---

## 📄 License
MIT © AgentSea (AGS)
