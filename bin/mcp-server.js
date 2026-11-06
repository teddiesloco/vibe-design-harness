#!/usr/bin/env node
/**
 * VibeDesign-Harness — Unified UI/UX Design System, App Architecture & Scroll Choreography MCP Server (v3.0.0)
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
    lintUI,
    fixUI,
    checkVietnameseFontSupport,
    generateDesignMD,
    generateProductMD,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
    fetchRemoteRules,
    recommendDashboardSystem,
    generateAppTokensCSS,
    getAppUIReference,
    runLiveUIProbe,
    scaffoldDashboardApp,
    recommendScrollChoreography,
    verifyScrollFingerprint,
    getScrollChoreographyReference,
    scaffoldScrollStoryPage,
    TWO_LAYER_MATERIAL_SPEC,
    DEFAULT_DTCG_TOKENS,
    extractDesignSystemFromRepo,
    compileDTCGTokens,
    generateDesignPreviewHTML
} from '../index.js';

const server = new Server(
    {
        name: 'vibe-design-harness-mcp',
        version: '3.1.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'lint_ui_aesthetic',
                description: 'Deterministic zero-token 35+ gate UI/UX aesthetic & dashboard architectural linter for HTML/JSX/Tailwind.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        filePathOrContent: {
                            type: 'string',
                            description: 'Path to the generated HTML/JSX file OR raw code string to audit.',
                        },
                        scope: {
                            type: 'string',
                            description: 'Optional detector scope: all, color, layout, type, motion, copy, slop, dashboard.',
                            default: 'all',
                        },
                        autoFix: {
                            type: 'boolean',
                            description: 'Whether to also return auto-remediated code for fixable patterns.',
                            default: false,
                        },
                        useRemoteRules: {
                            type: 'boolean',
                            description: 'Whether to fetch and apply latest remote anti-slop rules.',
                            default: false,
                        },
                    },
                    required: ['filePathOrContent'],
                },
            },
            {
                name: 'generate_design_system',
                description: 'Generates paired DESIGN.md and PRODUCT.md token specifications for AI coding agents across 14 themes.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: { type: 'string', default: 'ags_editorial' },
                        brandName: { type: 'string', default: 'AgentSea' },
                        customAccent: { type: 'string' },
                    },
                },
            },
            {
                name: 'scaffold_landing_page',
                description: 'Assembles a complete, high-converting, zero-slop landing page in HTML or React TSX.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: {
                            type: 'string',
                            description: 'Design theme: ags_editorial, minimalism, luxury_editorial, luxury_gold, apple_luxury, modern_clean, linear, stripe, vercel, airbnb, neo_brutalism, nordic_clean, zen_japanese, glassmorphism_dark, cyberpunk.',
                            default: 'ags_editorial',
                        },
                        framework: {
                            type: 'string',
                            description: 'Output format: html or react (TSX)',
                            default: 'html',
                        },
                        title: { type: 'string', description: 'Web page title' },
                        brand: { type: 'string', description: 'Brand name' },
                        heroTitle: { type: 'string', description: 'Hero main headline' },
                        heroSubtitle: { type: 'string', description: 'Hero sub-headline' },
                        customAccent: { type: 'string', description: 'Custom hex accent color override' },
                    },
                },
            },
            {
                name: 'recommend_dashboard_system',
                description: 'Recommends the optimal App Dashboard Face (from 10 Named Faces across 5 Axes: Clean, Dark Sidebar, Soft, Midnight, Inset, Paper, Float, Rail, Topbar, Editorial), Screen Content Layout (10 job-driven layouts), and WCAG-verified Industry Accent Palette.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        userRole: { type: 'string', description: 'Who uses the app (e.g. accountant, spa owner, NOC shift operator, B2B sales).' },
                        primaryJob: { type: 'string', description: 'Main job on this screen (e.g. overview, data table, ticket queue, kanban, calendar, analytics, settings form).' },
                        industry: { type: 'string', description: 'Industry vertical (e.g. finance, clinic, food, spa, retail, education, real estate, logistics, hr, crm, travel).' },
                        navCount: { type: 'number', description: 'Number of top-level navigation items (default 5).', default: 5 },
                        allowExperimental: { type: 'boolean', description: 'Whether to include experimental faces (Inset, Paper, Float, Rail, Topbar, Editorial).', default: false },
                    },
                },
            },
            {
                name: 'scaffold_dashboard_app',
                description: 'Assembles a zero-slop App Dashboard screen (HTML or React TSX) adhering to the 10-Face Architecture, unified metric strip, asymmetric widget grid, and 19 Locked Rules.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        face: { type: 'string', description: 'Dashboard face: clean, dark_sidebar, soft, midnight, inset, paper, float, rail, topbar, editorial.', default: 'clean' },
                        framework: { type: 'string', description: 'Output format: html or react (TSX).', default: 'html' },
                        brand: { type: 'string', description: 'Workspace / Brand name.', default: 'AgentSea Workspace' },
                        title: { type: 'string', description: 'Page title (`text-xl`).', default: 'Tổng quan vận hành' },
                        accent: { type: 'string', description: 'Brand accent key: blue, indigo, violet, fuchsia, teal, green, orange, neutral.', default: 'indigo' },
                    },
                },
            },
            {
                name: 'generate_app_tokens_css',
                description: 'Generates the complete Tailwind v4 `tokens.css` stylesheet (:root, .dark, .force-light/.force-dark, @theme inline, semantic danger/error/warning/success tokens, and 4px autohide scrollbar).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        face: { type: 'string', description: 'Dashboard face (clean, dark_sidebar, soft, midnight, etc.).', default: 'clean' },
                        accent: { type: 'string', description: 'Accent color key (neutral, blue, indigo, violet, fuchsia, teal, green, orange) or hex.', default: 'neutral' },
                    },
                },
            },
            {
                name: 'get_app_ui_reference',
                description: 'Reads or lists the 49 Cleanroom App UI/UX reference specifications (e.g. list, PLAYBOOK, styles, budgets, locked-rules, review, checklist, layouts/app, layouts/overlay, layouts/form, components/charts, components/button, components/choice-controls).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        topic: { type: 'string', description: 'Reference key or "list" to browse all 49 cleanroom reference files.', default: 'list' },
                    },
                },
            },
            {
                name: 'recommend_scroll_choreography',
                description: 'Recommends a 60fps Scroll Choreography Blueprint: selects from 5 Scroll Grammars (filmic_six_act, worldflight, editorial_dossier, kinetic_cutlist, specimen_workbench), 8 Visual Worlds, and 16 Choreography Devices (`data-sc-*`).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        brief: { type: 'string', description: 'Project or brand brief (e.g. "luxury architecture spatial flythrough" or "developer benchmark workbench").' },
                        grammar: { type: 'string', description: 'Optional grammar override: filmic_six_act, worldflight, editorial_dossier, kinetic_cutlist, specimen_workbench.' },
                        world: { type: 'string', description: 'Optional visual world override: low_key_cinematic, high_key_editorial, natural_documentary, hard_light_graphic, macro_texture, architectural_spatial, nocturne_neon, technical_drawing.' },
                    },
                },
            },
            {
                name: 'scaffold_scroll_story',
                description: 'Scaffolds a complete 60fps Scrollytelling HTML page powered by the zero-dependency VibeScroll runtime (`vibe-scroll.js` + `vibe-scroll.css`).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        brandName: { type: 'string', default: 'AETHER' },
                        headline: { type: 'string', default: 'Precision engineered for the next frontier.' },
                        subheadline: { type: 'string', default: 'Scroll-linked choreography, tactile surfaces, and zero-jank 60fps motion.' },
                        ctaLabel: { type: 'string', default: 'Request Early Access' },
                        grammar: { type: 'string', default: 'filmic_six_act' },
                        world: { type: 'string', default: 'low_key_cinematic' },
                        inlineRuntime: { type: 'boolean', description: 'Inline vibe-scroll.css and vibe-scroll.js into a single self-contained HTML file.', default: false },
                    },
                },
            },
            {
                name: 'get_scroll_choreography_reference',
                description: 'Reads or lists the 14 Cleanroom Scroll Choreography specifications & runtime files (e.g. list, uniqueness, devices, feel, taste, hero-depth, worldflight, worlds, verify, engine/vibe-scroll.js, engine/vibe-scroll.css).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        topic: { type: 'string', description: 'Reference topic or "list".', default: 'list' },
                    },
                },
            },
            {
                name: 'verify_scroll_fingerprint',
                description: 'Validates a planned scrollytelling build against prior builds on the 6 Uniqueness Fingerprint dimensions (grammar, navTreatment, heroDevice, actSequence, closePattern, signatureMove). Requires >= 4/6 differences against every prior build.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        candidate: { type: 'object', description: 'Candidate build dimensions object.' },
                        existingRows: { type: 'array', items: { type: 'object' }, description: 'Array of prior fingerprint objects.' },
                    },
                    required: ['candidate'],
                },
            },
            {
                name: 'run_live_ui_probe',
                description: 'Runs or returns the CLI command for the Playwright multi-viewport live DOM & WCAG inspector (`scripts/probe.mjs`).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', description: 'Live URL to inspect (leave empty or set dryRun=true to get CLI command & flags).' },
                        quick: { type: 'boolean', description: 'Static layout/contrast/overflow check only (4x faster).', default: true },
                        stress: { type: 'boolean', description: 'Inject 60-char Vietnamese strings and 10-digit numbers to test layout resilience.', default: false },
                        dark: { type: 'boolean', description: 'Inspect in dark mode.', default: false },
                        dryRun: { type: 'boolean', description: 'Return command without launching browser.', default: false },
                    },
                },
            },
            {
                name: 'run_design_command',
                description: 'Executes one of the 12 post-processing UI/UX design flows (audit, critique, polish, distill, bolder, quieter, delight, harden, clarify, adapt, colorize, animate).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        command: {
                            type: 'string',
                            description: 'Command name: audit, critique, polish, distill, bolder, quieter, delight, harden, clarify, adapt, colorize, animate.',
                        },
                    },
                    required: ['command'],
                },
            },
            {
                name: 'check_vietnamese_font',
                description: 'Validates whether a font family supports the full Vietnamese Unicode range (U+0102–U+1EF9, 134 stacked diacritics) and returns a safe UI replacement if blacklisted.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fontName: {
                            type: 'string',
                            description: 'Font family name or CSS font stack to verify (e.g. Impact, Bebas Neue, Be Vietnam Pro).',
                        },
                    },
                    required: ['fontName'],
                },
            },
            {
                name: 'extract_design_system_from_repo',
                description: 'Reverse-engineers a complete DESIGN.md specification, color luminance roles, CSS custom properties, and geometry tokens from an existing codebase directory or CSS/TSX file.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        targetPath: { type: 'string', description: 'Directory or file path to scan.' },
                        projectName: { type: 'string', description: 'Optional project name for the DESIGN.md header.' },
                    },
                    required: ['targetPath'],
                },
            },
            {
                name: 'compile_dtcg_tokens',
                description: 'Compiles a W3C DTCG 3-tier token tree (Primitive -> Semantic -> Component + Dark Mode) into deterministic CSS variables and checks for unresolved aliases.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        tokenTree: { type: 'object', description: 'Optional custom W3C DTCG JSON object (uses built-in 3-tier default if omitted).' },
                    },
                },
            },
            {
                name: 'generate_design_preview_html',
                description: 'Generates a self-contained HTML Interactive Visual & Motion Thesis Preview page (SVG Cubic-Bezier plot, live motion trajectory replay, WCAG Light/Dark contrast swatches, and 5-state button matrix).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        brandName: { type: 'string', default: 'AgentSea Studio' },
                        thesis: { type: 'string' },
                        primaryHex: { type: 'string', default: '#4f46e5' },
                        durationMs: { type: 'number', default: 320 },
                    },
                },
            },
            {
                name: 'get_two_layer_material_spec',
                description: 'Returns the 2-Layer Spatial Material Discipline (Functional Liquid Glass Layer vs. Opaque Content Layer) and cross-platform adapters (Web Tailwind, Tauri/Electron, SwiftUI, Flutter).',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    if (name === 'check_vietnamese_font') {
        const res = checkVietnameseFontSupport(args.fontName);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'scaffold_landing_page') {
        const res = scaffoldLandingPage({
            theme: args.theme || 'ags_editorial',
            framework: args.framework || 'html',
            title: args.title,
            brand: args.brand,
            heroTitle: args.heroTitle,
            heroSubtitle: args.heroSubtitle,
            customAccent: args.customAccent
        });
        return { content: [{ type: 'text', text: typeof res === 'string' ? res : JSON.stringify(res, null, 2) }] };
    }

    if (name === 'recommend_dashboard_system') {
        const res = recommendDashboardSystem(args);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'scaffold_dashboard_app') {
        const res = scaffoldDashboardApp(args);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'generate_app_tokens_css') {
        const res = generateAppTokensCSS(args);
        return { content: [{ type: 'text', text: res.css }] };
    }

    if (name === 'get_app_ui_reference') {
        const res = getAppUIReference(args.topic || 'list');
        return { content: [{ type: 'text', text: res.content ? res.content : JSON.stringify(res, null, 2) }] };
    }

    if (name === 'recommend_scroll_choreography') {
        const res = recommendScrollChoreography(args);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'scaffold_scroll_story') {
        const res = scaffoldScrollStoryPage(args);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'get_scroll_choreography_reference') {
        const res = getScrollChoreographyReference(args.topic || 'list');
        return { content: [{ type: 'text', text: res.content ? res.content : JSON.stringify(res, null, 2) }] };
    }

    if (name === 'verify_scroll_fingerprint') {
        const res = verifyScrollFingerprint(args.candidate || {}, args.existingRows || []);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'run_live_ui_probe') {
        const res = runLiveUIProbe(args);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'lint_ui_aesthetic') {
        const options = { scope: args.scope || 'all' };
        if (args.useRemoteRules) {
            const remote = await fetchRemoteRules();
            if (remote && remote.banned_classes) options.banned_patterns = remote.banned_classes;
        }
        const report = lintUI(args.filePathOrContent, options);
        if (args.autoFix) {
            report.auto_fix = fixUI(args.filePathOrContent);
        }
        return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] };
    }

    if (name === 'run_design_command') {
        const cmd = getDesignCommand(args.command);
        return { content: [{ type: 'text', text: JSON.stringify(cmd || { available: listDesignCommands() }, null, 2) }] };
    }

    if (name === 'generate_design_system') {
        const designMd = generateDesignMD(args.theme || 'ags_editorial', { customAccent: args.customAccent });
        const productMd = generateProductMD({ name: args.brandName || 'AgentSea', theme: args.theme || 'ags_editorial' });
        return { content: [{ type: 'text', text: JSON.stringify({ DESIGN_MD: designMd, PRODUCT_MD: productMd }, null, 2) }] };
    }

    if (name === 'extract_design_system_from_repo') {
        const res = extractDesignSystemFromRepo(args.targetPath || process.cwd(), { projectName: args.projectName });
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'compile_dtcg_tokens') {
        const res = compileDTCGTokens(args.tokenTree || DEFAULT_DTCG_TOKENS);
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'generate_design_preview_html') {
        const html = generateDesignPreviewHTML(args);
        return { content: [{ type: 'text', text: html }] };
    }

    if (name === 'get_two_layer_material_spec') {
        return { content: [{ type: 'text', text: JSON.stringify(TWO_LAYER_MATERIAL_SPEC, null, 2) }] };
    }

    throw new Error(`Unknown MCP tool: ${name}`);
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

run().catch((err) => {
    console.error('VibeDesign-Harness MCP Server Error:', err);
    process.exit(1);
});
