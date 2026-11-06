---
name: ags-design-harness
description: "Use when designing UI/UX, dashboards, web apps, landing pages, forms, tables, or generating studio images and Vietnamese typography overlays. Enforces the 10-Face App Dashboard Architecture, 49 Cleanroom UI/UX Specs, 35+ Gate Anti-Slop & Dashboard Linter, Live Playwright DOM Probe, 5-Platform Studio Image Compiler, and CapCut Vietnamese Typography Engine."
---

# AGS Design & Visual Studio Harness (v2.1.0)

> **Engine:** Cleanroom App & Dashboard Architecture (10 Named Faces · 10 Screen Content Layouts · 12 Industry Accent Palettes · 19 Locked Rules · 49 Reference Specs · Live Playwright DOM Probe) · 35+ Gate Deterministic UI Linter · 5-Platform Studio Image Compiler · CapCut Vietnamese Typography Engine.

## 1. App & Dashboard UI/UX Workflow (Cleanroom 10-Face System)

Whenever designing or reviewing an App Screen, Dashboard, CRM, Admin Panel, Table, Kanban, Calendar, or Form:

1. **Recommend Dashboard Face, Content Layout & Industry Accent (`recommendDashboardSystem` / CLI `dashboard` / MCP `recommend_dashboard_system`)**:
   - **5 Orthogonal Axes**: `nav` (`sidebar`, `sidebar-dark`, `rail`, `rail-labeled`, `topnav`) × `container` (`classic`, `inset`, `unified`, `floating`, `canvas`) × `header` (`content`, `full`) × `surface` (`flat`, `elevated`, `dark`, `borderless`, `layered`, `editorial`) × `font` (`Inter`, `Be Vietnam Pro`, `IBM Plex Sans`).
   - **10 Named Faces**: `Clean`, `Dark Sidebar`, `Soft`, `Midnight` (verified defaults) + `Inset`, `Paper`, `Float`, `Rail`, `Topbar`, `Editorial`.
   - **10 Job-Driven Screen Content Layouts**: `overview_blocks`, `table_first`, `list_detail`, `kanban`, `calendar_grid`, `chart_first`, `narrative_numbers`, `split_workspace`, `activity_stream`, `form_first`.
   - **12 Empirical Industry Accent Palettes**: Verified WCAG AA (`>= 5.0:1` white text contrast); never uses red/rose for brand primary because `--danger` (`#c70036`) owns destructive actions (`I4`).
2. **Generate Tailwind v4 Semantic Tokens (`generateAppTokensCSS` / CLI `tokens-css` / MCP `generate_app_tokens_css`)**:
   - Outputs `:root`, `.dark`, `.force-light`, `.force-dark`, `@theme inline`, semantic status tokens, and the 4px transparent-thumb autohide scrollbar (`I18`).
3. **Consult the 49 Cleanroom UI/UX Reference Specs (`getAppUIReference` / CLI `ui-ref` / MCP `get_app_ui_reference`)**:
   - Deep component & layout specs under `references/app-ui-ux/` (`layouts/app`, `layouts/overlay`, `layouts/form`, `styles`, `budgets`, `locked-rules`, `review`, `checklist`, `components/charts`, `components/button`, `components/choice-controls`, etc.).
4. **Scaffold Zero-Slop Dashboard Screens (`scaffoldDashboardApp` / CLI `scaffold-dashboard` / MCP `scaffold_dashboard_app`)**:
   - Builds HTML or React TSX screens adhering to unified metric strips (`divide-x`), asymmetric `col-span-2` primary widgets, and all 19 Locked Architectural Rules.
5. **Run Live Multi-Viewport Playwright DOM Probe (`runLiveUIProbe` / CLI `probe` / MCP `run_live_ui_probe`)**:
   - Executes `scripts/probe.mjs` across `375,768,1024,1280,1440,1920` (with `--quick`, `--stress` 60-char Vietnamese strings & 10-digit numbers, `--sweep`, `--dark`) to catch horizontal overflow, clipping, contrast failures, and focus/hover bugs.

## 2. Frontend & UI/UX Anti-Slop Workflow (35+ Gate Linter)

1. **Initialize Brand Context**:
   ```bash
   npx vibe-design-harness init-context ags_editorial --name "AgentSea"
   ```
2. **Audit & Auto-Fix Every UI File Before Delivery**:
   ```bash
   npx vibe-design-harness lint <file.html|file.tsx> --fix
   ```
3. **12 Post-Processing Design Flows**:
   ```bash
   npx vibe-design-harness command <audit|critique|polish|distill|bolder|quieter|delight|harden|clarify|adapt|colorize|animate>
   ```

## 3. Visual & Image Generation Workflow (5-Platform Studio Harness)

Before sending any prompt to an image model (`ag/gemini-3.1-flash-image`, `cx/gpt-image-2`, Midjourney V7, Seedance 2.5, or FLUX):

1. **Compile with 7-Part Studio Brief (`compileStudioImagePrompt` / MCP `compile_studio_brief`)**:
   - Strips AI-slop keywords (`8k render`, `Dribbble`, `Behance`, raw `#HEX` codes, inline CSS `34pt` specs, `#1/#2` list numbers).
   - Infers true aspect ratio (`9:16`, `16:9`, `4:5`, `3:4`, `1:1`) from natural Vietnamese or English cues.
   - Enforces the **CapCut Vietnamese Typography Guard**.
2. **Verify Vietnamese Fonts (`checkVietnameseFontSupport` / CLI `check-font`)**:
   - Blocks broken Latin-only display fonts (`Impact`, `Bebas Neue`, `Futura`, `Monument`) for Vietnamese copy and maps to verified 134/134 Vietnamese-glyph presets.
