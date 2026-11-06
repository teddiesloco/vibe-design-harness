/**
 * VibeDesign-Harness — Cleanroom App & Dashboard Architecture Engine (v2.1.0)
 *
 * Encodes the complete App/Dashboard UI/UX System:
 *  - 10 Named Dashboard Faces across 5 orthogonal axes (Nav, Container, Header, Surface, Font)
 *  - 10 Screen Content Layouts mapped by Primary User Job (U2)
 *  - 12 Empirical Industry Accent Palettes (WCAG >= 5.0:1 verified)
 *  - 19 Locked Architectural Rules & Hard Budgets
 *  - Full Tailwind v4 Semantic Token Generator (`tokens.css` with `:root`, `.dark`, `@theme inline`, scrollbar autohide)
 *  - Reference Docs Resolver (49 cleanroom Markdown & CSS specs + live Playwright DOM probe runner)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const APP_REFS_DIR = path.join(REPO_ROOT, 'references', 'app-ui-ux');
const SCRIPTS_DIR = path.join(REPO_ROOT, 'scripts');

/**
 * 5 Orthogonal Dashboard Face Axes (P13)
 */
export const DASHBOARD_FACE_AXES = {
    nav: ['sidebar', 'sidebar-dark', 'rail', 'rail-labeled', 'topnav'],
    container: ['classic', 'inset', 'unified', 'floating', 'canvas'],
    header: ['content', 'full'],
    surface: ['flat', 'elevated', 'dark', 'borderless', 'layered', 'editorial'],
    font: ['Inter', 'Be Vietnam Pro', 'IBM Plex Sans']
};

/**
 * 10 Named Dashboard Faces (P13)
 * Each face is a battle-tested combination of (nav, container, header, surface, font).
 */
export const DASHBOARD_FACES = {
    clean: {
        id: 'clean',
        name: 'Clean',
        verified: true,
        nav: 'sidebar',
        container: 'classic',
        header: 'content',
        surface: 'flat',
        font: 'Inter',
        target_users: 'Office knowledge workers handling dense tables & numbers all day (B2B SaaS, accounting, internal ops, multi-table admin).',
        summary: 'White sidebar (`--surface`) without right border against light gray canvas (`--background` #f4f4f6); flat cards with 1px hairline border (`--border` #f7f7f8).'
    },
    dark_sidebar: {
        id: 'dark_sidebar',
        name: 'Dark Sidebar',
        verified: true,
        nav: 'sidebar-dark',
        container: 'classic',
        header: 'content',
        surface: 'flat',
        font: 'Inter',
        target_users: 'Operators who keep the software open all day and switch modules constantly (CRM, warehouse/WMS, HRIS, clinic management, booking ops).',
        summary: 'Sidebar locked to `.force-dark` token scope while main workspace remains light flat `#f4f4f6` + `#ffffff` cards.'
    },
    soft: {
        id: 'soft',
        name: 'Soft',
        verified: true,
        nav: 'sidebar',
        container: 'classic',
        variants: ['canvas'],
        header: 'content',
        surface: 'elevated',
        font: 'Be Vietnam Pro',
        target_users: 'Shop owners, spa managers, non-technical staff checking the app mid-shift: fewer dense tables, more visual cards and imagery.',
        summary: 'Borderless sidebar, 4-tier shadow hierarchy (`shadow-sm` card -> `shadow-md` hover -> `shadow-popover` -> `shadow-modal`), friendly Be Vietnam Pro typography.'
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight',
        verified: true,
        nav: 'sidebar',
        container: 'classic',
        header: 'content',
        surface: 'dark',
        font: 'IBM Plex Sans',
        target_users: 'Shift operators monitoring real-time metrics (live ops, trading desks, infrastructure observability, security NOC).',
        summary: 'Deep navy-black primary canvas (`#05060f`), progressive surface elevation (`#0f111a` card -> `#171a26` overlay), crisp IBM Plex Sans tabular numerals.'
    },
    inset: {
        id: 'inset',
        name: 'Inset',
        verified: false,
        experimental: true,
        nav: 'sidebar',
        container: 'inset',
        variants: ['layered'],
        header: 'content',
        surface: 'flat',
        font: 'Inter',
        target_users: 'Power users switching across multiple views of the same dataset (Kanban board, list, overview) all day: project management, issue trackers, billing.',
        summary: 'Sidebar sits directly on the `#f4f4f6` page background; main content is wrapped inside a single rounded white `--surface` container.'
    },
    paper: {
        id: 'paper',
        name: 'Paper',
        verified: false,
        experimental: true,
        nav: 'sidebar',
        container: 'unified',
        variants: ['borderless'],
        header: 'content',
        surface: 'flat',
        font: 'Inter',
        target_users: 'Readers scanning full-width tables, long document lists, or linear ticket queues with minimal card chrome.',
        summary: 'Single unified white plane (`--surface`); structural boundaries use `--border-strong` (`#eaeaea`) and whitespace rather than gray page backgrounds.'
    },
    float: {
        id: 'float',
        name: 'Float',
        verified: false,
        experimental: true,
        nav: 'sidebar',
        container: 'floating',
        header: 'content',
        surface: 'flat',
        font: 'Inter',
        target_users: 'Content, marketing, and creative teams browsing media-heavy cards, publishing calendars, and asset libraries.',
        summary: 'Detached floating white sidebar card (`rounded-2xl`, no drop shadow) hovering over the `#f4f4f6` canvas.'
    },
    rail: {
        id: 'rail',
        name: 'Rail',
        verified: false,
        experimental: true,
        nav: 'rail',
        variants: ['rail-labeled'],
        container: 'classic',
        header: 'content',
        surface: 'flat',
        font: 'Inter',
        max_nav_items: 8,
        target_users: 'Horizontal-space-hungry tools with <= 7-8 top-level destinations (dispatch maps, multi-column calendars, code/video editors, IDE tools).',
        summary: 'Compact icon rail (`rail` up to 8 items for daily pros; `rail-labeled` up to 7 items with micro-labels).'
    },
    topbar: {
        id: 'topbar',
        name: 'Topbar',
        verified: false,
        experimental: true,
        nav: 'topnav',
        container: 'classic',
        header: 'full',
        surface: 'flat',
        font: 'Inter',
        max_nav_items: 6,
        target_users: 'Occasional users visiting a few times a week with <= 6 top-level items and no nested groups (client portals, simple analytics, micro-SaaS).',
        summary: 'Full-width top navigation bar without a left sidebar; maximum 6 primary links.'
    },
    editorial: {
        id: 'editorial',
        name: 'Editorial',
        verified: false,
        experimental: true,
        nav: 'topnav',
        container: 'unified',
        header: 'full',
        surface: 'editorial',
        font: 'Inter',
        target_users: 'Executives, founders, and investors reading weekly/quarterly numbers and narrative reports rather than operating forms.',
        summary: 'Print-inspired 12-column grid, high-contrast `border-t border-foreground` section dividers, `text-5xl` hero KPIs, uppercase micro-labels, zero card boxes.'
    }
};

/**
 * 10 Screen Content Layouts by Primary User Job (U2 / layouts/app.md)
 */
export const SCREEN_CONTENT_LAYOUTS = {
    overview_blocks: {
        id: 'overview_blocks',
        name: 'Tổng quan khối (Dashboard Overview)',
        primary_job: 'Glance across multiple signals quickly and jump into specific areas.',
        examples: ['Workspace home', 'Executive overview'],
        structure: [
            '1. Top Metric Strip: Single unified card split by vertical hairline dividers (`divide-x`), 4 metrics in 1 neutral color (`text-foreground`), never 4 separate rainbow cards.',
            '2. Asymmetric Widget Grid: Primary trend widget takes `col-span-2` (bar chart for discrete period counts, line chart for continuous series); secondary widgets stack on the right.',
            '3. Default 4-Block Cap: Metric strip + Trend chart + Grouped progress list + Today action queue (add Recent Activity stream up to 5 items if multi-user).',
            '4. Column Bottom Alignment: Left and right grid columns must terminate at roughly equal heights (cap list rows to 5-8 items with "Xem tất cả").'
        ]
    },
    table_first: {
        id: 'table_first',
        name: 'Bảng trước (Data Table First)',
        primary_job: 'Scan, compare, filter, and batch-edit many structured records by column.',
        examples: ['Customer directory', 'Inventory/SKU ledger', 'Tabular CRM'],
        structure: [
            '1. Header Row: Page title (`text-xl font-semibold`) + single primary CTA (`bg-primary text-primary-foreground`).',
            '2. Filter Bar: Status tabs (`underline` or `boxed`, collapses to `Trạng thái:` dropdown under `sm`) + search input (`h-11 md:h-10` with clear `X` button) + filter dropdowns (no hover fill).',
            '3. Full-Bleed Table: Numeric columns right-aligned with `tabular-nums`; checkbox-selected row and hovered row share `--surface-hover`; max 1 primary link column.'
        ]
    },
    list_detail: {
        id: 'list_detail',
        name: 'Danh sách + chi tiết (Master-Detail Queue)',
        primary_job: 'Process items sequentially from a queue without losing list context.',
        examples: ['Support inbox', 'Ticket triage', 'Order approval queue', 'New lead qualification'],
        structure: [
            '1. Left Pane (List Queue): Fixed width `w-80` to `w-96`, scrollable with autohide 4px scrollbar, `gap-1` between rounded list rows.',
            '2. Right Pane (Active Record Detail): Sticky action header + scrollable detail body + inline comment/activity stream.',
            '3. Selection State: Active row uses `bg-secondary font-medium`, hovered row uses `hover:bg-item-hover`.'
        ]
    },
    kanban: {
        id: 'kanban',
        name: 'Kanban (Stage Pipeline)',
        primary_job: 'Move work items across discrete lifecycle stages.',
        examples: ['Sprint tasks', 'Sales deal pipeline', 'Recruitment funnel'],
        structure: [
            '1. Horizontal Stage Columns: `gap-4` between columns, column header `mb-3` with count in plain `tabular-nums text-muted`.',
            '2. Cards in Column: `p-4` minimum padding (never `p-3` when >= 2 lines of text), `gap-3` between cards.',
            '3. Card Density Cap: Title + up to 3 metadata signals (assignee avatar, due date badge, priority indicator).'
        ]
    },
    calendar_grid: {
        id: 'calendar_grid',
        name: 'Lịch, lưới giờ (Calendar & Time Grid)',
        primary_job: 'Schedule or inspect work bound to specific dates, time slots, staff, or rooms.',
        examples: ['Clinic appointments', 'Shift roster', 'Room booking'],
        structure: [
            '1. Time-Slot Grid: Auto-scrolls to `[data-now]` current time indicator on mount.',
            '2. Date Switcher & View Segmented Control: Day / Week / Month segmented control using `--shadow-segment-track` and `--shadow-segment-thumb`.',
            '3. Nested Cell Hover: Sub-elements inside hoverable rows use `--background-hover` (`#e7e7ea`) so they never vanish on hover (`M18`).'
        ]
    },
    chart_first: {
        id: 'chart_first',
        name: 'Biểu đồ trước (Analytics & Monitoring)',
        primary_job: 'Analyze trends, compare periods, and spot anomalies.',
        examples: ['Revenue analytics', 'System telemetry', 'Funnel attribution'],
        structure: [
            '1. Period & Comparison Bar: Date range picker + period comparison toggle.',
            '2. Hero Chart Card: Full-width or `col-span-2` chart using `--chart-fill` (70% opacity in dark mode `M32`), dashed strokes for incomplete current period.',
            '3. Breakdown Grid: Secondary dimension breakdowns below.'
        ]
    },
    narrative_numbers: {
        id: 'narrative_numbers',
        name: 'Kể bằng số (Executive Editorial Report)',
        primary_job: 'Read top-down narrative performance: headline figure -> trend -> segment breakdown -> detail.',
        examples: ['Weekly executive brief', 'Investor update', 'Monthly P&L digest'],
        structure: [
            '1. Editorial Surface (`P16`): `text-3xl` page title, `text-5xl tabular-nums` hero figure, uppercase `text-xs tracking-wider text-muted` labels.',
            '2. Bold Section Rules: Each section opens with a full-width `border-t border-foreground` rule.',
            '3. 12-Column Strict Grid: Monochrome charts with a single accent highlight point.'
        ]
    },
    split_workspace: {
        id: 'split_workspace',
        name: 'Hai panel làm việc (Split Live Workspace)',
        primary_job: 'Edit or configure on one side and see the live output immediately on the other.',
        examples: ['Prompt <-> Output studio', 'Editor <-> Live preview', 'Workflow builder <-> Test runner'],
        structure: [
            '1. Left Input/Config Panel: Form controls (`h-11 md:h-10`) with instant state sync.',
            '2. Right Preview/Result Canvas: Live rendered output with viewport/mode switcher in panel header.'
        ]
    },
    activity_stream: {
        id: 'activity_stream',
        name: 'Dòng hoạt động (Workspace Audit & Activity Feed)',
        primary_job: 'Inspect who changed what and audit recent workspace mutations.',
        examples: ['Audit log', 'Change history', 'Security event stream'],
        structure: [
            '1. Actor-First Row Formula: Left `size-8` user avatar (never category icon circles or vertical timeline connectors).',
            '2. Single-Sentence Action: `font-medium text-foreground` actor name + muted verb + linked `text-foreground` target entity (`N8`).',
            '3. Sub-line Metadata: `text-xs text-muted` project · relative timestamp (`tabular-nums`).'
        ]
    },
    form_first: {
        id: 'form_first',
        name: 'Form trước (Settings & Configuration)',
        primary_job: 'Configure workspace settings, edit profile, or create a structured entity.',
        examples: ['Account settings', 'Security & 2FA', 'Create project wizard'],
        structure: [
            '1. Paired Control Height: Every input, select, and form button shares `h-11 md:h-10` (44px mobile, 40px desktop; standalone auth forms may use `h-12`).',
            '2. Always-Visible Top Labels (`I26`): Required fields marked with red `*` (`locked-rule #15`).',
            '3. Inline Field Errors Only: On submit error, scroll & focus first invalid field (`--error` border + `--error-ring` + `--error-text` message below); no red summary banner at top of normal forms.'
        ]
    }
};

/**
 * 7 Approved Brand Accent Colors (WCAG >= 5.0:1 with white text on primary buttons, P3)
 */
export const APPROVED_BRAND_ACCENTS = {
    blue: { name: 'Xanh dương (Blue)', primary: '#2563eb', primary_hover: '#1d4ed8', primary_dark: '#60a5fa', hue: 221, contrast_white: 5.17 },
    indigo: { name: 'Chàm (Indigo)', primary: '#4f46e5', primary_hover: '#4338ca', primary_dark: '#818cf8', hue: 243, contrast_white: 6.29 },
    violet: { name: 'Tím (Violet)', primary: '#7c3aed', primary_hover: '#6d28d9', primary_dark: '#a78bfa', hue: 262, contrast_white: 5.70 },
    fuchsia: { name: 'Hồng tím (Fuchsia)', primary: '#a21caf', primary_hover: '#86198f', primary_dark: '#e879f9', hue: 295, contrast_white: 6.32 },
    teal: { name: 'Xanh ngọc (Teal)', primary: '#0f766e', primary_hover: '#115e59', primary_dark: '#2dd4bf', hue: 175, contrast_white: 5.47 },
    green: { name: 'Xanh lá (Green)', primary: '#15803d', primary_hover: '#166534', primary_dark: '#4ade80', hue: 142, contrast_white: 5.02 },
    orange: { name: 'Cam (Orange)', primary: '#c2410c', primary_hover: '#9a3412', primary_dark: '#fb923c', hue: 17, contrast_white: 5.18 },
    neutral: { name: 'Gần đen (Default Neutral)', primary: '#181818', primary_hover: '#2e2e2e', primary_dark: '#e9edf5', hue: 0, contrast_white: 17.4 }
};

/**
 * 12 Industry -> 3 Recommended Accents Mapping (brand-tokens.md)
 * Never use red/rose as brand primary because `--danger` (#c70036) owns destructive actions (I4).
 */
export const INDUSTRY_ACCENT_PALETTES = {
    finance_banking: {
        industry: 'Tài chính, kế toán, ngân hàng (Finance, Accounting, Banking)',
        recommended: ['blue', 'green', 'orange'],
        default_accent: 'blue',
        rationale: 'Empirical convention: Blue/Indigo leads 5/8 top financial apps; Green and Orange provide distinct (>40° hue separation) alternatives.'
    },
    healthcare_clinic: {
        industry: 'Y tế, phòng khám, nha khoa (Healthcare, Clinic, Dental)',
        recommended: ['teal', 'blue', 'violet'],
        default_accent: 'teal',
        rationale: 'Clinical calm and hygiene clarity; Teal (#0f766e, 5.47:1) avoids generic corporate blue while keeping high contrast.'
    },
    food_restaurant: {
        industry: 'Đồ ăn, nhà hàng, F&B (Food, Restaurant, Delivery)',
        recommended: ['orange', 'green', 'indigo'],
        default_accent: 'orange',
        rationale: 'Warm appetite appeal using Orange (#c2410c, 34° away from destructive rose-700) — never red/crimson primary buttons which collide with Delete/Cancel (`I4`).'
    },
    spa_beauty_booking: {
        industry: 'Spa, làm đẹp, đặt lịch (Spa, Beauty, Wellness Booking)',
        recommended: ['violet', 'orange', 'teal'],
        default_accent: 'violet',
        rationale: 'No rigid industry monopoly; Violet, Orange, and Teal avoid cliché low-contrast pastel pink.'
    },
    retail_pos: {
        industry: 'Bán lẻ, cửa hàng, POS (Retail, E-commerce, POS)',
        recommended: ['blue', 'green', 'orange'],
        default_accent: 'blue',
        rationale: 'High-trust checkout and inventory clarity.'
    },
    education_edtech: {
        industry: 'Giáo dục, khoá học (Education, LMS, EdTech)',
        recommended: ['blue', 'violet', 'orange'],
        default_accent: 'blue',
        rationale: 'Structured learning environment with energetic alternative options.'
    },
    real_estate: {
        industry: 'Bất động sản, cho thuê (Real Estate, Property Management)',
        recommended: ['blue', 'teal', 'orange'],
        default_accent: 'blue',
        rationale: 'Architectural stability and property trust.'
    },
    logistics_fleet: {
        industry: 'Vận tải, kho, giao hàng (Logistics, Warehouse, Fleet)',
        recommended: ['blue', 'orange', 'teal'],
        default_accent: 'blue',
        rationale: 'High-visibility operational dispatch and status tracking.'
    },
    hr_payroll: {
        industry: 'Nhân sự, chấm công (HRIS, Recruiting, Payroll)',
        recommended: ['violet', 'blue', 'teal'],
        default_accent: 'violet',
        rationale: 'People-centric modern workspace identity.'
    },
    crm_b2b_saas: {
        industry: 'CRM, bán hàng B2B, SaaS (CRM, B2B Sales, AI Agent Workspace)',
        recommended: ['indigo', 'orange', 'teal'],
        default_accent: 'indigo',
        rationale: 'Indigo (#4f46e5, 6.29:1) gives technical authority without blending into default browser blue.'
    },
    travel_hospitality: {
        industry: 'Du lịch, khách sạn, homestay (Travel, Hospitality, Booking)',
        recommended: ['orange', 'fuchsia', 'blue'],
        default_accent: 'orange',
        rationale: 'Warm destination energy while keeping destructive red reserved for cancellation flows.'
    },
    general_other: {
        industry: 'Ngành khác / Đa năng (General SaaS & Internal Tools)',
        recommended: ['indigo', 'teal', 'orange'],
        default_accent: 'neutral',
        rationale: 'Near-black neutral (`#181818`) or Indigo (`#4f46e5`) never clashes with tenant content.'
    }
};

/**
 * Hard Quantitative Budgets & Rhythm (budgets.md)
 */
export const APP_UI_BUDGETS = {
    max_accent_colors: 1,
    max_font_families: 1,
    max_text_shades: 3,
    max_border_radii: 4,
    max_shadow_tiers_in_flat: 2,
    max_border_tokens: 2,
    max_nesting_depth: 2,
    max_line_width_ch: 75,
    button_variants: ['outline', 'primary', 'secondary', 'ghost'],
    spacing_scale_px: [4, 8, 12, 16, 20, 24, 32, 40],
    inner_control_half_steps_px: [2, 6, 10],
    min_stacked_interactive_gap_px: 4,
    typography_scale: {
        xs: 'Labels, timestamps, uppercase group headers (`text-xs`)',
        sm: 'Default app body copy, table cells, list rows, button labels (`text-sm`)',
        base: 'Card titles, modal titles (`text-base font-semibold`)',
        lg: 'Section titles grouping multiple cards, detail page record header (`text-lg font-semibold`)',
        xl: 'Page title at ALL breakpoints (`text-xl font-semibold`, never `2xl` on app pages)',
        '2xl': 'Metric card numbers from `sm` (`sm:text-2xl font-semibold tabular-nums`), mobile marketing hero',
        '3xl': 'Desktop marketing hero, standalone pricing tier figure (`text-3xl`)'
    },
    rhythm: {
        page_padding: 'p-4 sm:p-6',
        card_padding: 'p-4 sm:p-5',
        kanban_card_padding: 'p-4 (never p-3 for >=2 lines)',
        grid_gap: 'gap-3',
        form_control_height: 'h-11 md:h-10 (paired across input, select, and form buttons)',
        sidebar_link_height: 'h-10 px-3 rounded-xl gap-2.5'
    }
};

/**
 * 19 Locked Architectural Rules (locked-rules.md)
 */
export const LOCKED_ARCHITECTURAL_RULES = [
    { id: 'LR-01', rule: 'Destructive actions (delete, revoke access, terminate running job, logout, bulk logout, cancel subscription) MUST use red semantic tokens (`I4`).' },
    { id: 'LR-02', rule: 'Destructive buttons use subtle rose fill (`bg-rose-500/10 text-rose-700 hover:bg-rose-500/15`), NEVER solid `bg-rose-500 text-white` or red outline.' },
    { id: 'LR-03', rule: 'Destructive confirmation modals use red alert styling; neutral confirmation modals are only allowed when all 3 `I4` destructive criteria are false.' },
    { id: 'LR-04', rule: '`outline` (`border-border-strong bg-surface`) is the default button variant; `secondary` never replaces `outline` as the default.' },
    { id: 'LR-05', rule: 'Outline button hover ONLY changes background (`hover:bg-button-hover`), keeping border color unchanged.' },
    { id: 'LR-06', rule: 'Filter dropdown triggers outside forms have NO hover background fill, matching `<select>` behavior.' },
    { id: 'LR-07', rule: 'Status tabs collapse below `sm` into a labeled dropdown button (`Trạng thái: Tất cả · 32`).' },
    { id: 'LR-08', rule: 'Table rows with checkboxes share `--surface-hover` for both hover and checked states; sidebar and tree items use `hover:bg-item-hover` for hover and `bg-secondary font-medium` for active.' },
    { id: 'LR-09', rule: 'Form input focus uses `border-focus` + subtle 2px `ring-focus` (`rgba(..., 0.1)`), never a solid second border.' },
    { id: 'LR-10', rule: 'Border radius scales by element height (`F1`): height >= 40px (`h-10`+) uses `rounded-xl` (12px); height < 40px uses `rounded-lg` (8px).' },
    { id: 'LR-11', rule: 'App page titles are `text-xl` at all viewports; `text-2xl` is reserved for metric card numbers and marketing heroes.' },
    { id: 'LR-12', rule: 'Slide-over panels and drawers animate at `500ms` enter / `350ms` exit with `cubic-bezier(0.32, 0.72, 0, 1)`.' },
    { id: 'LR-13', rule: 'Scrollbars auto-hide via transparent thumb color while preserving 4px width (`::-webkit-scrollbar { width: 4px }`), preventing layout shift.' },
    { id: 'LR-14', rule: 'Horizontally scrolling tab strips on mobile must not force visible scrollbars.' },
    { id: 'LR-15', rule: 'Required form field asterisk `*` is always colored semantic red (`text-error-text` / `text-red-600`).' },
    { id: 'LR-16', rule: 'Buttons, links, tabs, chips, checkboxes, cards, and rows do not render default focus rings unless explicit accessibility mode is requested (`I13`/`I14`).' },
    { id: 'LR-17', rule: 'Default workflow for new/redesigned screens follows Brief -> Wireframe Options -> Build (`U1`–`U4`) unless "build immediately" is requested.' },
    { id: 'LR-18', rule: 'Header bottom border and sidebar top header divider use hairline `border-border` (`#f7f7f8`), EXCEPT in `unified` (Paper) containers which use `border-border-strong` (`#eaeaea`).' },
    { id: 'LR-19', rule: 'Stacked rounded interactive items (sidebar links, menu items, tree nodes, select options) MUST have at least `4px` gap (`gap-1`), never `gap-0.5` or `space-y-0.5`.' }
];

/**
 * Recommend the optimal Dashboard Face, Screen Content Layout, and Industry Accent Palette
 * @param {Object} query { userRole, primaryJob, industry, navCount, allowExperimental }
 */
export function recommendDashboardSystem(query = {}) {
    const roleText = String(query.userRole || query.persona || '').toLowerCase();
    const jobText = String(query.primaryJob || query.task || '').toLowerCase();
    const indText = String(query.industry || '').toLowerCase();
    const navCount = Number(query.navCount || 5);
    const allowExperimental = Boolean(query.allowExperimental);

    // 1. Pick Dashboard Face
    let faceKey = 'clean';
    if (/noc|monitor|trading|giám sát|trực ca|thời gian thực|realtime|security|observability|devops/i.test(roleText + ' ' + jobText)) {
        faceKey = 'midnight';
    } else if (/spa|shop|cửa hàng|bán lẻ|chủ quán|salon|lịch hẹn|card|ảnh/i.test(roleText + ' ' + indText)) {
        faceKey = 'soft';
    } else if (/crm|kho|wms|nhân sự|hr|phòng khám|clinic|module|cả ngày/i.test(roleText + ' ' + indText)) {
        faceKey = 'dark_sidebar';
    } else if (allowExperimental) {
        if (/báo cáo tuần|nhà đầu tư|executive|investor|c-level|editorial|đọc số/i.test(roleText + ' ' + jobText)) {
            faceKey = 'editorial';
        } else if (navCount <= 6 && /portal|cổng khách|đơn giản|micro/i.test(roleText + ' ' + jobText)) {
            faceKey = 'topbar';
        } else if (navCount <= 8 && /bản đồ|map|editor|code|lịch|calendar/i.test(roleText + ' ' + jobText)) {
            faceKey = 'rail';
        } else if (/marketing|content|media|thư viện ảnh|social/i.test(roleText + ' ' + jobText)) {
            faceKey = 'float';
        } else if (/board|kanban|nhiều view|project|saas/i.test(roleText + ' ' + jobText)) {
            faceKey = 'inset';
        }
    }

    const face = DASHBOARD_FACES[faceKey] || DASHBOARD_FACES.clean;

    // 2. Pick Content Layout by Primary Job
    let layoutKey = 'overview_blocks';
    if (/bảng|table|dò|so sánh|crm|danh sách khách|kho hàng|inventory/i.test(jobText)) {
        layoutKey = 'table_first';
    } else if (/hàng đợi|queue|inbox|hộp thư|ticket|duyệt đơn|lead/i.test(jobText)) {
        layoutKey = 'list_detail';
    } else if (/kanban|pipeline|trạng thái|kéo thả|tuyển dụng/i.test(jobText)) {
        layoutKey = 'kanban';
    } else if (/lịch|calendar|ca làm|đặt phòng|appointment|giờ/i.test(jobText)) {
        layoutKey = 'calendar_grid';
    } else if (/biểu đồ|xu hướng|chart|analytics|doanh thu|trend/i.test(jobText)) {
        layoutKey = 'chart_first';
    } else if (/kể bằng số|báo cáo lãnh đạo|investor|narrative|editorial/i.test(jobText)) {
        layoutKey = 'narrative_numbers';
    } else if (/hai panel|split|preview|xem trước|prompt|playground/i.test(jobText)) {
        layoutKey = 'split_workspace';
    } else if (/nhật ký|hoạt động|audit|history|log|ai vừa làm gì/i.test(jobText)) {
        layoutKey = 'activity_stream';
    } else if (/form|cài đặt|settings|hồ sơ|profile|tạo mới/i.test(jobText)) {
        layoutKey = 'form_first';
    }

    const contentLayout = SCREEN_CONTENT_LAYOUTS[layoutKey];

    // 3. Pick Industry Accent Palette
    let industryKey = 'general_other';
    if (/tài chính|ngân hàng|kế toán|finance|bank|fintech|accounting/i.test(indText)) industryKey = 'finance_banking';
    else if (/y tế|phòng khám|nha khoa|health|clinic|medical|dental/i.test(indText)) industryKey = 'healthcare_clinic';
    else if (/đồ ăn|nhà hàng|f&b|food|restaurant|cafe/i.test(indText)) industryKey = 'food_restaurant';
    else if (/spa|làm đẹp|beauty|salon|wellness/i.test(indText)) industryKey = 'spa_beauty_booking';
    else if (/bán lẻ|pos|retail|shop|ecommerce|cửa hàng/i.test(indText)) industryKey = 'retail_pos';
    else if (/giáo dục|khoá học|edu|lms|school|academy/i.test(indText)) industryKey = 'education_edtech';
    else if (/bất động sản|real estate|property|cho thuê/i.test(indText)) industryKey = 'real_estate';
    else if (/vận tải|kho|giao hàng|logistics|fleet|shipping/i.test(indText)) industryKey = 'logistics_fleet';
    else if (/nhân sự|chấm công|hr|payroll|recruiting/i.test(indText)) industryKey = 'hr_payroll';
    else if (/crm|b2b|saas|agent|ai|agency/i.test(indText)) industryKey = 'crm_b2b_saas';
    else if (/du lịch|khách sạn|homestay|travel|hotel|booking|phú quý/i.test(indText)) industryKey = 'travel_hospitality';

    const industryPalette = INDUSTRY_ACCENT_PALETTES[industryKey];
    const primaryAccentSpec = APPROVED_BRAND_ACCENTS[industryPalette.default_accent] || APPROVED_BRAND_ACCENTS.neutral;

    return {
        recommended_face: face,
        recommended_layout: contentLayout,
        industry_palette: {
            ...industryPalette,
            primary_token_spec: primaryAccentSpec,
            alternatives: industryPalette.recommended.map(k => APPROVED_BRAND_ACCENTS[k])
        },
        budgets: APP_UI_BUDGETS,
        delivery_note_template: `Bộ mặt: **${face.name}** (nav: \`${face.nav}\`, vùng chứa: \`${face.container}\`, bề mặt: \`${face.surface}\`, font: \`${face.font}\`) · Bố cục màn: **${contentLayout.name}** · Màu nhấn: **${primaryAccentSpec.name}** (\`${primaryAccentSpec.primary}\`).`
    };
}

/**
 * Generate production-ready `tokens.css` (Tailwind v4 `@theme inline` + Light/Dark + Autohide 4px Scrollbar)
 * @param {Object} options { face: 'clean'|'soft'|'midnight'|..., accent: 'indigo'|'#2563eb'|..., includeDark: true }
 */
export function generateAppTokensCSS(options = {}) {
    const faceKey = String(options.face || 'clean').toLowerCase().replace(/[\s-]+/g, '_');
    const face = DASHBOARD_FACES[faceKey] || DASHBOARD_FACES.clean;
    const accentKey = String(options.accent || 'neutral').toLowerCase();
    const accentObj = APPROVED_BRAND_ACCENTS[accentKey] || {
        name: 'Custom Accent',
        primary: options.accent && options.accent.startsWith('#') ? options.accent : '#181818',
        primary_hover: '#2e2e2e',
        primary_dark: '#e9edf5'
    };

    const baseCssPath = path.join(APP_REFS_DIR, 'tokens.css');
    let css = fs.existsSync(baseCssPath)
        ? fs.readFileSync(baseCssPath, 'utf-8')
        : '';

    if (css) {
        // Inject Face comment & Font
        css = `/* Bộ mặt: ${face.name} (nav: ${face.nav}, container: ${face.container}, surface: ${face.surface}) */\n` + css;
        css = css.replace(
            /--app-font:\s*"Inter"[^;]*;/,
            `--app-font: "${face.font}", ui-sans-serif, system-ui, sans-serif;`
        );
        if (accentKey !== 'neutral') {
            css = css.replace(/--primary:\s*#181818;/, `--primary: ${accentObj.primary};`);
            css = css.replace(/--primary-hover:\s*#2e2e2e;/, `--primary-hover: ${accentObj.primary_hover};`);
            css = css.replace(/--primary-light:\s*#1818180d;/, `--primary-light: color-mix(in srgb, ${accentObj.primary} 8%, transparent);`);
            css = css.replace(/--primary:\s*#e9edf5;/, `--primary: ${accentObj.primary_dark};`);
        }
    }

    return {
        face: face.name,
        font: face.font,
        accent: accentObj,
        css
    };
}

/**
 * List or read cleanroom UI/UX reference specifications inside `references/app-ui-ux/`
 * @param {string} topic Optional file or component name (e.g. 'app', 'styles', 'charts', 'table', 'button', 'review', 'checklist')
 */
export function getAppUIReference(topic = '') {
    if (!fs.existsSync(APP_REFS_DIR)) {
        return { error: 'References directory not found', path: APP_REFS_DIR };
    }

    const allFiles = [];
    function walk(dir, prefix = '') {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(full, rel);
            } else {
                allFiles.push({
                    key: rel.replace(/\.(md|css|html)$/, ''),
                    file: rel,
                    size_bytes: fs.statSync(full).size
                });
            }
        }
    }
    walk(APP_REFS_DIR);

    if (!topic || topic === 'list') {
        return {
            total_files: allFiles.length,
            categories: {
                core_playbooks: allFiles.filter(f => !f.file.includes('/')).map(f => f.file),
                layouts: allFiles.filter(f => f.file.startsWith('layouts/')).map(f => f.file),
                components: allFiles.filter(f => f.file.startsWith('components/')).map(f => f.file)
            },
            files: allFiles
        };
    }

    const q = String(topic).toLowerCase().trim().replace(/\.(md|css|html)$/, '');
    const match =
        allFiles.find(f => f.key.toLowerCase() === q) ||
        allFiles.find(f => f.key.toLowerCase().endsWith(`/${q}`)) ||
        allFiles.find(f => f.key.toLowerCase().includes(q));

    if (!match) {
        return {
            found: false,
            requested: topic,
            available_keys: allFiles.map(f => f.key)
        };
    }

    const fullPath = path.join(APP_REFS_DIR, match.file);
    return {
        found: true,
        key: match.key,
        file: match.file,
        path: fullPath,
        content: fs.readFileSync(fullPath, 'utf-8')
    };
}

/**
 * Run or return command for the Live Playwright Multi-Viewport DOM Probe (`scripts/probe.mjs`)
 * Measures computed layout alignment, horizontal overflow, text truncation, WCAG contrast, focus/hover states, and stress data injection.
 */
export function runLiveUIProbe(options = {}) {
    const probeScript = path.join(SCRIPTS_DIR, 'probe.mjs');
    const url = options.url || '';
    const args = [probeScript];

    if (url) args.push(url);
    if (options.widths) args.push('--widths', Array.isArray(options.widths) ? options.widths.join(',') : String(options.widths));
    if (options.out) args.push('--out', options.out);
    if (options.dark) args.push('--dark');
    if (options.quick) args.push('--quick');
    if (options.stress) args.push('--stress');
    if (options.sweep) args.push('--sweep', typeof options.sweep === 'string' ? options.sweep : '1440,375,20');
    if (options.wireframe) args.push('--wireframe', options.wireframe);
    if (options.playwrightDir) args.push('--pw', options.playwrightDir);

    const cliCommand = `node ${args.map(a => (a.includes(' ') ? `"${a}"` : a)).join(' ')}`;

    if (!url || options.dryRun) {
        return {
            probe_script: probeScript,
            cli_command: cliCommand,
            supported_flags: [
                '--widths 375,768,1024,1280,1440,1920',
                '--quick (static layout/contrast/overflow only, 4x faster)',
                '--stress (injects 60-char Vietnamese names & 10-digit numbers to test truncation/wrapping)',
                '--sweep 1440,375,20 (continuous responsive sweep every 20px)',
                '--dark (measure in dark mode)',
                '--wireframe <url> (diff built screen against approved wireframe)'
            ]
        };
    }

    const res = spawnSync('node', args, {
        encoding: 'utf-8',
        timeout: options.timeoutMs || 120000
    });

    return {
        probe_script: probeScript,
        cli_command: cliCommand,
        exit_code: res.status,
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        passed: res.status === 0
    };
}

/**
 * Assemble a Zero-Slop App Dashboard Screen (HTML or React TSX) following the 10-Face & App Layout Spec
 * Passes 100% of VibeDesign-Harness lint gates + App Dashboard architectural gates.
 */
export function scaffoldDashboardApp(options = {}) {
    const faceKey = String(options.face || 'clean').toLowerCase().replace(/[\s-]+/g, '_');
    const face = DASHBOARD_FACES[faceKey] || DASHBOARD_FACES.clean;
    const brand = options.brand || 'AgentSea Workspace';
    const pageTitle = options.title || 'Tổng quan vận hành';
    const framework = String(options.framework || 'html').toLowerCase();
    const accentKey = options.accent || 'indigo';
    const accent = APPROVED_BRAND_ACCENTS[accentKey] || APPROVED_BRAND_ACCENTS.indigo;
    const isDarkSurface = face.surface === 'dark';
    const isDarkSidebar = face.nav === 'sidebar-dark';

    const bgClass = isDarkSurface ? 'bg-[#05060f] text-[#e9edf5]' : 'bg-[#f4f4f6] text-[#2c2c2c]';
    const cardClass = isDarkSurface
        ? 'bg-[#0f111a] border border-white/10'
        : (face.surface === 'elevated'
            ? 'bg-white shadow-sm ring-1 ring-black/5'
            : 'bg-white border border-[#f7f7f8]');
    const sidebarClass = isDarkSidebar
        ? 'bg-[#0f111a] text-[#e9edf5] border-r border-white/10'
        : (isDarkSurface
            ? 'bg-[#0f111a] text-[#e9edf5] border-r border-white/10'
            : 'bg-white text-[#2c2c2c]');

    const htmlCode = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle} — ${brand}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(face.font)}:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Bộ mặt: ${face.name} (P13) */
    :root {
      color-scheme: ${isDarkSurface ? 'dark' : 'light'};
      --app-font: "${face.font}", ui-sans-serif, system-ui, sans-serif;
      --primary: ${accent.primary};
      --primary-hover: ${accent.primary_hover};
      --primary-foreground: #ffffff;
      --background: ${isDarkSurface ? '#05060f' : '#f4f4f6'};
      --surface: ${isDarkSurface ? '#0f111a' : '#ffffff'};
      --foreground: ${isDarkSurface ? '#e9edf5' : '#2c2c2c'};
      --muted: ${isDarkSurface ? '#8b93a7' : '#707070'};
      --border: ${isDarkSurface ? 'rgba(160, 180, 220, 0.12)' : '#f7f7f8'};
      --border-strong: ${isDarkSurface ? 'rgba(160, 180, 220, 0.16)' : '#eaeaea'};
    }
    body {
      font-family: var(--app-font);
      -webkit-font-smoothing: antialiased;
    }
    * { --scrollbar-thumb: transparent; }
    *:hover { --scrollbar-thumb: rgba(112, 112, 112, 0.25); }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 9999px; }
  </style>
</head>
<body class="${bgClass} min-h-dvh antialiased selection:bg-indigo-600 selection:text-white">
  <div class="flex min-h-dvh">
    <!-- Sidebar (w-64 shrink-0, h-10 rounded-xl links, gap-1, no border-r on light classic) -->
    <aside class="hidden lg:flex w-64 shrink-0 flex-col justify-between ${sidebarClass}">
      <div>
        <div class="flex h-14 items-center justify-between px-4 border-b border-[#eaeaea]/60">
          <div class="flex items-center gap-2.5">
            <span class="flex size-7 items-center justify-center rounded-lg bg-[var(--primary)] text-xs font-semibold text-white">AS</span>
            <span class="text-sm font-semibold tracking-tight truncate">${brand}</span>
          </div>
          <span class="text-xs text-[#707070] tabular-nums">⌘K</span>
        </div>

        <nav aria-label="Điều hướng chính" class="flex flex-col gap-1 p-3">
          <a href="#overview" aria-current="page" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium bg-[#e7e8ec]/70 text-[#2c2c2c] transition-colors">
            <span>Tổng quan</span>
            <span class="ml-auto text-xs tabular-nums text-[#2c2c2c]">4</span>
          </a>
          <a href="#orders" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm opacity-75 hover:bg-[#f4f4f6] hover:opacity-100 transition-colors">
            <span>Đơn hàng &amp; Lead</span>
            <span class="ml-auto text-xs tabular-nums text-[#707070]">28</span>
          </a>
          <a href="#customers" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm opacity-75 hover:bg-[#f4f4f6] hover:opacity-100 transition-colors">
            <span>Khách hàng</span>
          </a>

          <div class="mt-4">
            <div class="flex h-10 items-center px-3 text-xs font-medium uppercase tracking-wide text-[#707070]">
              Vận hành
            </div>
            <div class="flex flex-col gap-1">
              <a href="#workflows" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm opacity-75 hover:bg-[#f4f4f6] hover:opacity-100 transition-colors">
                <span>Luồng tự động</span>
                <span class="ml-auto text-xs tabular-nums text-[#707070]">12</span>
              </a>
              <a href="#reports" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm opacity-75 hover:bg-[#f4f4f6] hover:opacity-100 transition-colors">
                <span>Báo cáo doanh thu</span>
              </a>
              <a href="#settings" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm opacity-75 hover:bg-[#f4f4f6] hover:opacity-100 transition-colors">
                <span>Cài đặt hệ thống</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div class="p-3 border-t border-[#eaeaea]/60">
        <div class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm">
          <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7e8ec] text-xs font-semibold text-[#2c2c2c]">MK</span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">Minh Khang</p>
            <p class="truncate text-xs text-[#707070]">Quản trị viên</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Region -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Top Header (h-14, page title text-xl per Locked Rule #11, single primary CTA per I3) -->
      <header class="flex h-14 items-center justify-between border-b border-[#eaeaea]/80 bg-white/90 px-4 sm:px-6">
        <div class="flex items-center gap-3 min-w-0">
          <h1 class="text-xl font-semibold tracking-tight truncate">${pageTitle}</h1>
          <span class="hidden sm:inline-flex items-center rounded-lg bg-[#ecfdf5] px-2.5 py-0.5 text-xs font-medium text-[#007a55]">
            Trực tuyến
          </span>
        </div>
        <div class="flex items-center gap-2.5">
          <button type="button" class="h-10 rounded-xl border border-[#eaeaea] bg-white px-3.5 text-sm font-medium text-[#2c2c2c] hover:bg-[#f1f1f3] transition-colors">
            Xuất dữ liệu
          </button>
          <button type="button" class="h-10 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">
            Tạo chiến dịch
          </button>
        </div>
      </header>

      <!-- Workspace Canvas (p-4 sm:p-6, gap-3 rhythm) -->
      <main class="flex-1 p-4 sm:p-6 space-y-3">
        <!-- Block 1: Unified Metric Strip (1 card divided by hairline borders, single text color) -->
        <section aria-label="Chỉ số tổng quan" class="${cardClass} rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#eaeaea]">
          <div class="p-4 sm:p-5">
            <p class="text-xs font-medium text-[#707070]">Doanh thu tháng này</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">1.284.500.000 ₫</p>
            <p class="mt-1 text-xs text-[#007a55] tabular-nums">+18,4% so với tháng trước</p>
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-xs font-medium text-[#707070]">Đơn hàng hoàn tất</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">1.420</p>
            <p class="mt-1 text-xs text-[#707070] tabular-nums">Tỉ lệ giao thành công 98,2%</p>
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-xs font-medium text-[#707070]">Khách hàng mới</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">312</p>
            <p class="mt-1 text-xs text-[#707070] tabular-nums">Chi phí thu hút 145.000 ₫</p>
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-xs font-medium text-[#707070]">Việc cần xử lý hôm nay</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">7</p>
            <p class="mt-1 text-xs text-[#bb4d00] tabular-nums">2 việc quá hạn cần duyệt</p>
          </div>
        </section>

        <!-- Block 2 & 3: Asymmetric 3-Column Grid (Primary Widget col-span-2 + Right Stack) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
          <!-- Primary Widget (col-span-2): Discrete Weekly Bar Chart -->
          <section class="${cardClass} lg:col-span-2 rounded-2xl p-4 sm:p-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-semibold">Đơn hàng hoàn tất theo tuần</h2>
                <p class="text-xs text-[#707070]">8 tuần gần nhất · đơn vị: đơn hàng</p>
              </div>
              <span class="text-xs font-medium text-[#707070] tabular-nums">Trung bình: 355 đơn/tuần</span>
            </div>

            <div class="grid grid-cols-8 gap-2.5 items-end h-48 pt-6 border-b border-[#eaeaea] pb-2">
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">290</span>
                <div class="w-full rounded-t-md bg-[var(--primary)]/85 h-24"></div>
                <span class="text-xs text-[#707070] tabular-nums">T1</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">315</span>
                <div class="w-full rounded-t-md bg-[var(--primary)]/85 h-28"></div>
                <span class="text-xs text-[#707070] tabular-nums">T2</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">340</span>
                <div class="w-full rounded-t-md bg-[var(--primary)]/85 h-32"></div>
                <span class="text-xs text-[#707070] tabular-nums">T3</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">310</span>
                <div class="w-full rounded-t-md bg-[var(--primary)]/85 h-28"></div>
                <span class="text-xs text-[#707070] tabular-nums">T4</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">365</span>
                <div class="w-full rounded-t-md bg-[var(--primary)]/85 h-36"></div>
                <span class="text-xs text-[#707070] tabular-nums">T5</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">390</span>
                <div class="w-full rounded-t-md bg-[var(--primary)]/85 h-40"></div>
                <span class="text-xs text-[#707070] tabular-nums">T6</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">412</span>
                <div class="w-full rounded-t-md bg-[var(--primary)] h-44"></div>
                <span class="text-xs text-[#707070] tabular-nums">T7</span>
              </div>
              <div class="flex flex-col items-center gap-1.5">
                <span class="text-xs tabular-nums text-[#707070]">218</span>
                <div class="w-full rounded-t-md border border-dashed border-[var(--primary)] bg-[var(--primary)]/20 h-20"></div>
                <span class="text-xs text-[#707070] tabular-nums">T8*</span>
              </div>
            </div>
            <p class="mt-2.5 text-xs text-[#707070]">* Tuần T8 đang diễn ra (dữ liệu tính đến hôm nay).</p>
          </section>

          <!-- Secondary Widget: Project Progress List (bar always bg-primary, only overdue phrase amber) -->
          <section class="${cardClass} rounded-2xl p-4 sm:p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-semibold">Tiến độ theo nhóm</h2>
              <a href="#all-projects" class="inline-flex h-8 items-center text-xs font-medium text-[#707070] hover:text-[#2c2c2c]">Xem tất cả</a>
            </div>

            <div class="space-y-3.5">
              <div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-medium">Tự động hóa CSKH Zalo</span>
                  <span class="tabular-nums text-xs text-[#707070]">92%</span>
                </div>
                <div class="mt-1.5 h-2 w-full rounded-full bg-[#f4f4f6] overflow-hidden" role="progressbar" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100">
                  <div class="h-full rounded-full bg-[var(--primary)]" style="width: 92%"></div>
                </div>
                <p class="mt-1 text-xs text-[#707070] tabular-nums">46 / 50 việc · <span class="text-[#bb4d00] font-medium">2 việc quá hạn</span></p>
              </div>

              <div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-medium">Đồng bộ dữ liệu CRM</span>
                  <span class="tabular-nums text-xs text-[#707070]">75%</span>
                </div>
                <div class="mt-1.5 h-2 w-full rounded-full bg-[#f4f4f6] overflow-hidden" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  <div class="h-full rounded-full bg-[var(--primary)]" style="width: 75%"></div>
                </div>
                <p class="mt-1 text-xs text-[#707070] tabular-nums">18 / 24 việc · Đúng tiến độ</p>
              </div>

              <div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-medium">Cổng thanh toán đối tác</span>
                  <span class="tabular-nums text-xs text-[#707070]">60%</span>
                </div>
                <div class="mt-1.5 h-2 w-full rounded-full bg-[#f4f4f6] overflow-hidden" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                  <div class="h-full rounded-full bg-[var(--primary)]" style="width: 60%"></div>
                </div>
                <p class="mt-1 text-xs text-[#707070] tabular-nums">12 / 20 việc · Đúng tiến độ</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</body>
</html>`;

    if (framework === 'react' || framework === 'tsx') {
        const reactCode = `'use client';
import React from 'react';

/**
 * Bộ mặt: ${face.name} (nav: ${face.nav}, container: ${face.container}, surface: ${face.surface}, font: ${face.font})
 */
export default function DashboardScreen() {
  return (
    <div className="${bgClass} min-h-dvh antialiased">
      <div className="flex min-h-dvh">
        <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between ${sidebarClass}">
          <div>
            <div className="flex h-14 items-center justify-between px-4 border-b border-zinc-200/60">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-semibold text-white">AS</span>
                <span className="text-sm font-semibold tracking-tight truncate">${brand}</span>
              </div>
              <span className="text-xs text-zinc-500 tabular-nums">⌘K</span>
            </div>
            <nav aria-label="Điều hướng chính" className="flex flex-col gap-1 p-3">
              <a href="#overview" aria-current="page" className="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium bg-zinc-200/70 text-zinc-900 transition-colors">
                <span>Tổng quan</span>
                <span className="ml-auto text-xs tabular-nums">4</span>
              </a>
              <a href="#orders" className="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors">
                <span>Đơn hàng &amp; Lead</span>
                <span className="ml-auto text-xs tabular-nums text-zinc-500">28</span>
              </a>
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-zinc-200/80 bg-white px-4 sm:px-6">
            <h1 className="text-xl font-semibold tracking-tight truncate">${pageTitle}</h1>
            <div className="flex items-center gap-2.5">
              <button type="button" className="h-10 rounded-xl border border-zinc-200 bg-white px-3.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors">
                Xuất dữ liệu
              </button>
              <button type="button" className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                Tạo chiến dịch
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 space-y-3">
            <section className="bg-white border border-zinc-100 rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              <div className="p-4 sm:p-5">
                <p className="text-xs font-medium text-zinc-500">Doanh thu tháng này</p>
                <p className="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">1.284.500.000 ₫</p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-medium text-zinc-500">Đơn hàng hoàn tất</p>
                <p className="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">1.420</p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-medium text-zinc-500">Khách hàng mới</p>
                <p className="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">312</p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-medium text-zinc-500">Việc cần xử lý hôm nay</p>
                <p className="mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums">7</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
`;
        return {
            face: face.name,
            framework: 'react',
            code: reactCode
        };
    }

    return {
        face: face.name,
        framework: 'html',
        code: htmlCode
    };
}

export default {
    DASHBOARD_FACE_AXES,
    DASHBOARD_FACES,
    SCREEN_CONTENT_LAYOUTS,
    APPROVED_BRAND_ACCENTS,
    INDUSTRY_ACCENT_PALETTES,
    APP_UI_BUDGETS,
    LOCKED_ARCHITECTURAL_RULES,
    recommendDashboardSystem,
    generateAppTokensCSS,
    getAppUIReference,
    runLiveUIProbe,
    scaffoldDashboardApp
};
