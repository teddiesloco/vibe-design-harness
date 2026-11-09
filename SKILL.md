---
name: vibe-design-harness
description: "Use when designing UI/UX, dashboards, web apps, mobile app prototypes (iOS/Android/React Native/Flutter), landing pages, scrollytelling experiences, forms, or tables. Enforces the Cleanroom 10-Face App Dashboard & 9-Face Mobile Prototype Architecture (97 specs), 60fps Scroll Choreography Engine (5 grammars, 16 devices, VibeScroll runtime), Reverse DESIGN.md Extractor, W3C DTCG 3-Tier Token Compiler, 2-Layer Material Discipline, 14 Brand Themes, 40+ Gate Anti-Slop Linter, and Interactive Truth Verifier."
---

# VibeDesign-Harness (v3.2.0) — Pure UI/UX Engineering System

> **Single-Purpose UI/UX Engine:** Unifies **App, Dashboard & Mobile Prototype Architecture** (10 Web Dashboard Faces · 9 Mobile App Faces · 6 Mobile Tab Bar Styles · 12 Screen Content Layouts · 12 Industry Palettes · 97 Reference Specs), **60fps Scroll Choreography** (5 Scroll Grammars · 16 `data-sc-*` Devices · 8 Visual Worlds · `vibe-scroll.js`/`.css`), **Reverse DESIGN.md Extractor & W3C DTCG 3-Tier Token Compiler**, **2-Layer Spatial Material Discipline (Liquid Glass vs. Opaque Content)**, **Landing Page & Design System Tokens** (14 Themes · 12 Post-Processing Flows · Vietnamese Font Guard), and **40+ Gate Anti-Slop Linter + Interactive Truth & Live Playwright DOM/Mobile Probe**.

## 1. App, Dashboard & Mobile Prototype UI/UX Workflow (10 Web Faces + 9 Mobile Faces)

Whenever designing or reviewing a Web App Screen, Dashboard, CRM, Admin Panel, Table, Kanban, Calendar, Form, or Mobile App Prototype (iOS / Android / React Native / Flutter):

1. **Recommend Dashboard Face, Content Layout & Industry Accent (`recommendDashboardSystem` / CLI `dashboard` / MCP `recommend_dashboard_system`)**:
   - **5 Orthogonal Axes**: `nav` (`sidebar`, `sidebar-dark`, `rail`, `rail-labeled`, `topnav`) × `container` (`classic`, `inset`, `unified`, `floating`, `canvas`) × `header` (`content`, `full`) × `surface` (`flat`, `elevated`, `dark`, `borderless`, `layered`, `editorial`) × `font` (`Inter`, `Be Vietnam Pro`, `IBM Plex Sans`).
   - **10 Named Faces**: `Clean`, `Dark Sidebar`, `Soft`, `Midnight` (verified defaults) + `Inset`, `Paper`, `Float`, `Rail`, `Topbar`, `Editorial`.
   - **12 Job-Driven Screen Content Layouts**: `overview_blocks`, `table_first`, `list_detail`, `kanban`, `calendar_grid`, `chart_first`, `narrative_numbers`, `split_workspace`, `activity_stream`, `form_first`, `entity_grid`, `live_monitor`.
   - **12 Empirical Industry Accent Palettes**: Verified WCAG AA (`>= 5.0:1` white text contrast); never uses red/rose for brand primary because `--danger` (`#c70036`) owns destructive actions (`I4`).
2. **Generate Tailwind v4 Semantic Tokens (`generateAppTokensCSS` / CLI `tokens-css` / MCP `generate_app_tokens_css`)**:
   - Outputs `:root`, `.dark`, `.force-light`, `.force-dark`, `@theme inline`, semantic status tokens, and the 4px transparent-thumb autohide scrollbar (`I18`).
3. **Consult the 97 Cleanroom UI/UX Reference Specs (`getAppUIReference` / CLI `ui-ref` / MCP `get_app_ui_reference`)**:
   - Deep component, web layout, wireframe & mobile specs under `references/app-ui-ux/` (`layouts/app/*`, `layouts/mobile-*.html`, `mobile/*`, `wireframe`, `styles`, `budgets`, `locked-rules`, `review`, `checklist`, `components/*`).
4. **Scaffold Zero-Slop Web Dashboards & Clickable Mobile App Prototypes (`scaffoldDashboardApp` / `recommendMobileSystem` / `scaffoldMobileApp`)**:
   - Web: Builds HTML or React TSX screens adhering to unified metric strips (`divide-x`), asymmetric `col-span-2` primary widgets, and all 19 Locked Architectural Rules.
   - Mobile (`J1`–`J19`): Recommends 9 Mobile App Faces (`Clean`, `Photo`, `Playful`, `Immersive`, `Brand`, `Tinted`, `Glow`, `Mono`, `Editorial`) + 6 Tab Bar Styles (`float`, `center`, `pill`, `dark`, `bubbles`, `glass`), and scaffolds multi-screen clickable HTML prototypes inside a `390×844` phone frame + Desktop Flow Board (`>=900px`), audited via `node scripts/probe.mjs <file> --mobile --widths 390,1280`.
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

## 3. Reverse DESIGN.md Extraction, W3C DTCG Tokens, 2-Layer Material & Thesis Preview (v3.1.0)

1. **Reverse-Engineer `DESIGN.md` from Any Existing Repo (`extractDesignSystemFromRepo` / CLI `extract-design` / MCP `extract_design_system_from_repo`)**:
   - Scans existing CSS/Tailwind/TSX/HTML files to extract surface luminance roles, CSS custom properties, typography, border radii, and spacing rhythm before adding new screens.
2. **Compile W3C DTCG 3-Tier Tokens (`compileDTCGTokens` / CLI `compile-dtcg` / MCP `compile_dtcg_tokens`)**:
   - Resolves `Primitive -> Semantic -> Component` aliases and re-resolves component tokens in `.dark` mode so dark surfaces never inherit light ink.
3. **Enforce 2-Layer Spatial Material Discipline (`TWO_LAYER_MATERIAL_SPEC` / CLI `material-spec` / MCP `get_two_layer_material_spec`)**:
   - **Functional Layer** (`header`, `nav`, floating toolbars, sheets, popovers): Allowed to use Liquid Glass (`backdrop-blur-xl`) with mandatory `@media (prefers-reduced-transparency: reduce)` opaque fallback.
   - **Content Layer** (`main`, `section`, `article`, `table`, data cards): Must remain **100% opaque**; `backdrop-blur` on Content Layer elements is blocked by the linter (`liquid-glass-on-content-card`).
4. **Generate Interactive Visual & Motion Thesis Preview (`generateDesignPreviewHTML` / CLI `preview-thesis` / MCP `generate_design_preview_html`)**:
   - Produces a self-contained HTML specimen plotting the SVG `cubic-bezier` curve, live motion replay, dual-polarity WCAG contrast swatches, and the 5-state interactive button matrix.

## 4. 40+ Gate Anti-Slop Linting, Interactive Truth & Live Playwright Verification

1. **Audit & Auto-Fix Every UI File Before Delivery (`<1ms`)**:
   ```bash
   npx vibe-design-harness lint <file.html|file.tsx> --fix
   ```
2. **Run Interactive Truth & Token-by-Intent Verification**:
   ```bash
   npx vibe-design-harness verify-interactive <file.html|url>
   ```
3. **Run 12 Post-Processing UI Flows**:
   ```bash
   npx vibe-design-harness command <audit|critique|polish|distill|bolder|quieter|delight|harden|clarify|adapt|colorize|animate>
   ```
4. **Run Live Multi-Viewport Playwright DOM Probe**:
   ```bash
   npx vibe-design-harness probe http://localhost:3000 --quick --stress
   ```
