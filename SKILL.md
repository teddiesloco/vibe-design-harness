---
name: vibe-design-harness
description: "Use when designing UI/UX, dashboards, web apps, landing pages, scrollytelling experiences, forms, or tables. Enforces the Cleanroom 10-Face App Dashboard Architecture (49 specs), 60fps Scroll Choreography Engine (5 grammars, 16 devices, VibeScroll runtime), 14 Brand Themes, 35+ Gate Anti-Slop Linter, and Live Playwright DOM Probe."
---

# VibeDesign-Harness (v3.0.0) — Pure UI/UX Engineering System

> **Single-Purpose UI/UX Engine:** Unifies **App & Dashboard Architecture** (10 Named Faces · 10 Screen Content Layouts · 12 Industry Palettes · 49 Reference Specs), **60fps Scroll Choreography** (5 Scroll Grammars · 16 `data-sc-*` Devices · 8 Visual Worlds · `vibe-scroll.js`/`.css`), **Landing Page & Design System Tokens** (14 Themes · 12 Post-Processing Flows · Vietnamese Font Guard), and **35+ Gate Anti-Slop Linter + Live Playwright DOM Probe**.

## 1. App & Dashboard UI/UX Workflow (10-Face Architecture)

Whenever designing or reviewing an App Screen, Dashboard, CRM, Admin Panel, Table, Kanban, Calendar, or Form:

1. **Recommend Dashboard Face, Content Layout & Industry Accent (`recommendDashboardSystem` / CLI `dashboard` / MCP `recommend_dashboard_system`)**:
   - **5 Orthogonal Axes**: `nav` (`sidebar`, `sidebar-dark`, `rail`, `rail-labeled`, `topnav`) × `container` (`classic`, `inset`, `unified`, `floating`, `canvas`) × `header` (`content`, `full`) × `surface` (`flat`, `elevated`, `dark`, `borderless`, `layered`, `editorial`) × `font` (`Inter`, `Be Vietnam Pro`, `IBM Plex Sans`).
   - **10 Named Faces**: `Clean`, `Dark Sidebar`, `Soft`, `Midnight` (verified defaults) + `Inset`, `Paper`, `Float`, `Rail`, `Topbar`, `Editorial`.
   - **10 Job-Driven Screen Content Layouts**: `overview_blocks`, `table_first`, `list_detail`, `kanban`, `calendar_grid`, `chart_first`, `narrative_numbers`, `split_workspace`, `activity_stream`, `form_first`.
   - **12 Empirical Industry Accent Palettes**: Verified WCAG AA (`>= 5.0:1` white text contrast); never uses red/rose for brand primary because `--danger` (`#c70036`) owns destructive actions (`I4`).
2. **Generate Tailwind v4 Semantic Tokens (`generateAppTokensCSS` / CLI `tokens-css` / MCP `generate_app_tokens_css`)**:
   - Outputs `:root`, `.dark`, `.force-light`, `.force-dark`, `@theme inline`, semantic status tokens, and the 4px transparent-thumb autohide scrollbar (`I18`).
3. **Consult the 49 Cleanroom UI/UX Reference Specs (`getAppUIReference` / CLI `ui-ref` / MCP `get_app_ui_reference`)**:
   - Deep component & layout specs under `references/app-ui-ux/` (`layouts/app`, `layouts/overlay`, `layouts/form`, `styles`, `budgets`, `locked-rules`, `review`, `checklist`, `components/*`).
4. **Scaffold Zero-Slop Dashboard Screens (`scaffoldDashboardApp` / CLI `scaffold-dashboard` / MCP `scaffold_dashboard_app`)**:
   - Builds HTML or React TSX screens adhering to unified metric strips (`divide-x`), asymmetric `col-span-2` primary widgets, and all 19 Locked Architectural Rules.

## 2. Scroll Choreography & Scrollytelling Workflow (60fps VibeScroll)

Whenever building an immersive product launch, cinematic landing page, spatial flythrough, or interactive story:

1. **Select Scroll Grammar & Visual World (`recommendScrollChoreography` / CLI `scroll` / MCP `recommend_scroll_choreography`)**:
   - **5 Distinct Scroll Grammars**: `filmic_six_act`, `worldflight` (continuous camera one-shot), `editorial_dossier` (sticky plates & folio), `kinetic_cutlist` (high-velocity hard cuts), `specimen_workbench` (live interactive proof).
   - **8 Visual Worlds**: `low_key_cinematic`, `high_key_editorial`, `natural_documentary`, `hard_light_graphic`, `macro_texture`, `architectural_spatial`, `nocturne_neon`, `technical_drawing`.
   - **16 Choreography Devices (`data-sc-*`)**: `scrub`, `pin`, `pan`, `flow`, `worldflight`, `cue`, `kinetic`, `reveal`, `parallax`, `scale`, `drift`, `in`, `count`, `tilt`, `magnet`, `spotlight`.
2. **Check the 6-Dimension Uniqueness Fingerprint Gate (`verifyScrollFingerprint` / CLI `fingerprint` / MCP `verify_scroll_fingerprint`)**:
   - Every new build must differ from every prior build on at least **4 of 6 dimensions** (`grammar`, `navTreatment`, `heroDevice`, `actSequence`, `closePattern`, `signatureMove`).
3. **Scaffold & Verify (`scaffoldScrollStoryPage` / CLI `scaffold-scroll` / `scripts/scroll-shoot.mjs`)**:
   - Generates self-contained or linked HTML using `references/scroll-choreography/engine/vibe-scroll.js` and `vibe-scroll.css`.

## 3. Anti-Slop Linting, Post-Processing & Live Playwright Verification

1. **Initialize Paired Design Context (`PRODUCT.md` + `DESIGN.md`)**:
   ```bash
   npx vibe-design-harness init-context ags_editorial --name "AgentSea"
   ```
2. **Audit & Auto-Fix Every UI File Before Delivery (`<1ms`)**:
   ```bash
   npx vibe-design-harness lint <file.html|file.tsx> --fix
   ```
3. **Run 12 Post-Processing UI Flows**:
   ```bash
   npx vibe-design-harness command <audit|critique|polish|distill|bolder|quieter|delight|harden|clarify|adapt|colorize|animate>
   ```
4. **Run Live Multi-Viewport Playwright DOM Probe**:
   ```bash
   npx vibe-design-harness probe http://localhost:3000 --quick --stress
   ```
