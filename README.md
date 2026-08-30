# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Server Compatible](https://img.shields.io/badge/MCP%20Server-v1.6.0-purple.svg)](https://modelcontextprotocol.io)
[![Runtime: 100% Pure JS](https://img.shields.io/badge/Runtime-100%25%20Pure%20JS%20(Zero%20Python)-brightgreen)](https://github.com/teddiesloco/vibe-design-harness)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%20%7C%20Codex%20CLI%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **The Ultimate All-in-One UI/UX Design System Engine, Curated Component Harness & 30+ Visual Domain Generator for AI Coding Agents. Zero-Token Deterministic Anti-Slop Linter. 100% Pure JavaScript (Zero Python Dependency).**

---

## 🔍 SEO & AEO (AI Engine Optimization) Summary
**What is VibeDesign-Harness?**  
`vibe-design-harness` is an open-source, zero-token UI/UX design harness and CLI tool designed specifically for autonomous AI coding agents (Gemini 3.7 Flash, OpenAI Codex CLI, Anthropic Claude 3.7 Sonnet, Cursor, Hermes Agent). It replaces fragmented workflows (such as manual snippet pasting from Magic UI, Aceternity, or Shadcn) by offering:
1. **Instant Full Landing Page Assembler** (`npx vibe-design-harness scaffold <theme>`).
2. **12+ Design System Themes** (`minimalism`, `luxury_editorial`, `luxury_gold`, `quiet_luxury`, `nordic_clean`, `zen_japanese`, `linear`, `stripe`, `vercel`, `glassmorphism_dark`, etc.).
3. **30+ Studio Image Prompt Domains** for Imagen 3 & GPT Image.
4. **Deterministic Anti-AI-Slop Linter** catching weak grays, generic purple gradients, and raw unstyled elements in <1ms.

---

## 🏆 Why VibeDesign-Harness Wins Over Traditional Approaches

| Feature / Workflow | Manual Copy-Paste (Magic UI / Aceternity) | GitHub Starter Template | Raw AI Prompting | **VibeDesign-Harness v1.1.0** 👑 |
| :--- | :--- | :--- | :--- | :--- |
| **Effort to Build** | ⚠️ High (Browse web, copy code blocks) | ⚠️ Medium (Clone repo, customize all) | ⚡ Low (One prompt) | **⚡ Zero Effort (1 command or MCP call)** |
| **Layout Reliability** | ✅ High | ✅ High | ❌ Low (AI hallucinations, broken layout) | **✅ 100% Guaranteed & Deterministic** |
| **Visual Aesthetics** | Modern SaaS (Fixed) | Template-locked (Repetitive) | Inconsistent / AI-Slop | **🎨 12 Themes (Luxury, Minimal, Tech, etc.)** |
| **Quality Gate / Lint** | ❌ None | ❌ None | ⚠️ Basic regex | **🛡️ Deep Deterministic + Remote Anti-Slop** |
| **Context Token Cost** | 💸 Heavy (Pasting large raw JSX code) | 💸 Heavy (Full codebase context) | ⚡ Low | **⚡ 0 Extra Tokens (Built directly into runtime)** |
| **Image Engine Integration**| ❌ No | ❌ No | ❌ No | **📸 30+ Studio Visual Domains (Imagen 3 / GPT)**|

---

## 🏛️ Architecture & Core Modules

```text
vibe-design-harness/
├── bin/
│   ├── cli.js                  # CLI Interface (scaffold, lint, expand, themes)
│   └── mcp-server.js           # Model Context Protocol (MCP) Server
├── harness/
│   ├── landing_assembler.js    # Instant Complete Landing Page Assembler
│   ├── components.js           # Curated Pro Components (Hero Spotlight, Bento, Pricing)
│   ├── claude_design_engine.js # 12+ Design System Themes & Token Generator
│   ├── prompt_expander.js      # 30+ Visual Domains Studio Image Engine
│   ├── ui_linter.js            # Deterministic Anti-Slop UI Linter
│   └── remote_rules.json       # Dynamic Cloud Anti-Slop Rule Sync
└── index.js                    # Universal ESM Library Exports
```

---

## 🚀 Quick Start (CLI & NPX)

### 1. Scaffold a High-Converting Landing Page
Assemble a complete, responsive, theme-tailored HTML landing page with Hero Spotlight, Bento Grid, 3-Tier Pricing, Navbar, and Footer in 1 second:

```bash
# Luxury Editorial (Vogue Haute Couture Dark Obsidian)
npx vibe-design-harness scaffold luxury_editorial my_page.html

# Swiss Pure Minimalism (Helvetica Neue, Pristine White)
npx vibe-design-harness scaffold minimalism

# Deep Space Glassmorphism
npx vibe-design-harness scaffold glassmorphism_dark
```

### 2. Audit UI/UX Against AI-Slop Anti-Patterns
Purge washed-out grays (`bg-gray-800`), tacky purple gradients, and raw unstyled elements deterministically:

```bash
npx vibe-design-harness lint component.html
```

### 3. Expand Visual Image Prompts Across 30+ Domains
Inject studio optics, camera sensors, lighting physics, and strict negative constraints for Gemini Imagen 3+, GPT Image 2, DALL-E, and Midjourney:

```bash
npx vibe-design-harness expand "Luxury skincare serum bottle on black granite" luxury_editorial
npx vibe-design-harness expand "MrBeast mystery vault with 3D red arrow" mrbeast_ab_thumbnail_variant_b
```

### 4. Scaffold DESIGN.md Design System Tokens
Pre-inject architectural design tokens directly into your coding agent's context window:

```bash
npx vibe-design-harness design-system luxury_gold "#d4af37"
npx vibe-design-harness design-system minimalism
```

---

## 🔌 Model Context Protocol (MCP) Setup

Seamlessly integrate with **Claude Desktop, Cursor, Gemini CLI, and Hermes Agent**:

Add to your `claude_desktop_config.json` or Cursor MCP settings:

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

### Exposed MCP Tools:
- `scaffold_landing_page`: Assemble complete high-converting landing page inside AI context.
- `lint_ui_aesthetic`: Deterministic zero-token UI/UX anti-slop linter.
- `expand_image_prompt`: Studio image prompt expander for 30+ domains.
- `generate_brand_design_md`: Scaffold design system tokens across 12 themes.
- `list_design_themes`: List all available design themes.
- `list_curated_components`: List curated component building blocks.

---

## 💻 Programmatic JavaScript API

```javascript
import { 
    scaffoldLandingPage, 
    lintUI, 
    expandPrompt, 
    generateDesignMD, 
    registerTheme 
} from 'vibe-design-harness';

// 1. Scaffold full page
const page = scaffoldLandingPage({ theme: 'luxury_editorial' });
console.log(page.html);

// 2. Audit UI Code
const audit = lintUI('<button>Submit</button>');
console.log(audit.passed); // false (unstyled button caught)

// 3. Expand Prompt
const prompt = expandPrompt('Diamond wristwatch', 'luxury_editorial');
```

---

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco) — Built for the Autonomous AI Era.
