# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Server Compatible](https://img.shields.io/badge/MCP%20Server-v1.6.0-purple.svg)](https://modelcontextprotocol.io)
[![Runtime: 100% Pure JS](https://img.shields.io/badge/Runtime-100%25%20Pure%20JS%20(Zero%20Python)-brightgreen)](https://github.com/teddiesloco/vibe-design-harness)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%20%7C%20Codex%20CLI%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **The All-in-One Autonomous Landing Page & UI Harness for AI Agents. Outperforms fragmented workflows (Magic UI / Aceternity / Shadcn / Starters) with Built-in Curated Pro Components, 12+ Themes, 30+ Image Domains, and Deterministic Zero-Token UI Linter.**

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

## 🏛️ Core Capabilities

1. **⚡ Instant Landing Page Assembler (Hero Spotlight + Bento Grid + Pricing + Navbar + Footer):**
   - Không cần mở trình duyệt copy Magic UI hay Aceternity. Chỉ cần gọi 1 lệnh hoặc 1 tool MCP là có trọn vẹn HTML Landing Page chuẩn responsive, tự đổi theo theme.
2. **🎨 12 Built-in Design System Themes + Unlimited Runtime Overrides:**
   - `minimalism`, `luxury_editorial`, `luxury_gold`, `quiet_luxury`, `linear`, `stripe`, `vercel`, `airbnb`, `nordic_clean`, `zen_japanese`, `neo_brutalism`, `glassmorphism_dark`.
3. **📸 30+ Pro Visual Prompt Domains:**
   - Studio optics, lens physics, camera gear, lighting, và negative constraints cho Gemini Imagen 3+, GPT Image 2, DALL-E, Midjourney.
4. **🛡️ Deterministic Zero-Token UI Linter:**
   - Loại bỏ triệt để màu tím sến AI-slop (`from-purple-500`), nền xám rửa trôi (`bg-gray-800`), và nút bấm không style.
5. **🔌 Native Model Context Protocol (MCP) Server:**
   - Sẵn sàng tích hợp vào Claude Desktop, Cursor, Gemini CLI, Hermes Agent.

---

## 🚀 Quick Start (CLI & NPX)

```bash
# 1. Assemble full landing page in 1 second
npx vibe-design-harness scaffold luxury_editorial my_landing_page.html
npx vibe-design-harness scaffold minimalism
npx vibe-design-harness scaffold glassmorphism_dark

# 2. Audit generated HTML UI
npx vibe-design-harness lint my_landing_page.html

# 3. Expand prompt for Imagen 3 / GPT Image
npx vibe-design-harness expand "Luxury diamond wristwatch" luxury_editorial

# 4. Generate DESIGN.md tokens
npx vibe-design-harness design-system luxury_gold "#d4af37"
```

---

## 🔌 Model Context Protocol (MCP) Setup

Add to `claude_desktop_config.json` or Cursor:

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

## 📄 License & Author

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco)
