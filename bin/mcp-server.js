#!/usr/bin/env node
/**
 * AGS Design & Visual Studio Harness — MCP Server (v2.1.0)
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
    lintUI,
    fixUI,
    expandPrompt,
    compileStudioImagePrompt,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    checkVietnameseFontSupport,
    formatForPlatform,
    exportTypographyAsset,
    generateDesignMD,
    generateProductMD,
    listThemes,
    listComponents,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
    fetchRemoteRules,
    recommendDashboardSystem,
    generateAppTokensCSS,
    getAppUIReference,
    runLiveUIProbe,
    scaffoldDashboardApp
} from '../index.js';

const server = new Server(
    {
        name: 'ags-design-harness-mcp',
        version: '2.1.0',
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
                name: 'compile_studio_brief',
                description: 'Compiles a natural Vietnamese or English image request into a 7-part Studio Image Brief and platform-native payload (nano_banana_pro, openai_gpt_image_2, midjourney_v7, flux_sdxl, seedance_2_5). Automatically strips AI-slop, infers aspect ratio, and protects Vietnamese diacritics.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description: 'Natural Vietnamese or English visual description.',
                        },
                        platform: {
                            type: 'string',
                            description: 'Target model platform: nano_banana_pro, openai_gpt_image_2, midjourney_v7, flux_sdxl, seedance_2_5.',
                            default: 'nano_banana_pro',
                        },
                        aspectRatio: {
                            type: 'string',
                            description: 'Optional aspect ratio override: 1:1, 4:5, 3:4, 9:16, 16:9, 21:9.',
                        },
                        referenceCount: {
                            type: 'number',
                            description: 'Number of reference images attached for identity/composition locking.',
                            default: 0,
                        },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'get_capcut_preset',
                description: 'Returns a verified 100%-Vietnamese CapCut typography preset (fonts, line-height for stacked diacritics, scrim, badge, and shadow spec).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        preset: {
                            type: 'string',
                            description: 'Preset key: editorial_luxury, modern_clean, bold_impact, kinetic_hype, viral_thumbnail, vn_creative, classic_serif, tech_cyber.',
                            default: 'editorial_luxury',
                        },
                    },
                },
            },
            {
                name: 'check_vietnamese_font',
                description: 'Validates whether a font family supports the full Vietnamese Unicode range (U+0102–U+1EF9, 134 stacked diacritics) and returns a safe replacement if blacklisted.',
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
                name: 'export_typography_asset',
                description: 'Generates a transparent SVG typography overlay and CapCut/Figma JSON spec from a Vietnamese headline, subtitle, badge, and preset.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        preset: {
                            type: 'string',
                            description: 'CapCut preset key (editorial_luxury, modern_clean, bold_impact, kinetic_hype, viral_thumbnail, vn_creative, classic_serif, tech_cyber).',
                            default: 'editorial_luxury',
                        },
                        title: { type: 'string', description: 'Main Vietnamese headline text.' },
                        subtitle: { type: 'string', description: 'Secondary Vietnamese subtitle text.' },
                        badge: { type: 'string', description: 'Top pill badge label.' },
                        width: { type: 'number', description: 'Canvas width in pixels (default 1080).', default: 1080 },
                        height: { type: 'number', description: 'Canvas height in pixels (default 1350).', default: 1350 },
                        outputDir: { type: 'string', description: 'Optional directory path to save .svg and .json files.' },
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
                            description: 'Design theme: ags_editorial, minimalism, luxury_editorial, luxury_gold, apple_luxury, modern_clean, linear, stripe, vercel, airbnb, brutalism, swiss_grid, glass_aurora, nordic_frost, cyberpunk.',
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
                name: 'run_design_command',
                description: 'Executes one of the 12 AGS post-processing design flows (audit, critique, polish, distill, bolder, quieter, delight, harden, clarify, adapt, colorize, animate).',
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
                name: 'expand_image_prompt',
                description: 'Expands a raw image prompt with universal camera physics, studio lighting, and negative constraints across 35+ domains.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: { type: 'string', description: 'Raw visual concept.' },
                        domain: { type: 'string', description: 'Visual domain key (default: nano_banana_pro).', default: 'nano_banana_pro' },
                        aspectRatio: { type: 'string', description: 'Aspect ratio (default auto-inferred).' },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'generate_design_system',
                description: 'Generates paired DESIGN.md and PRODUCT.md token specifications for AI coding agents.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: { type: 'string', default: 'ags_editorial' },
                        brandName: { type: 'string', default: 'AgentSea' },
                        customAccent: { type: 'string' },
                    },
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    if (name === 'compile_studio_brief') {
        const studioBrief = compileStudioImagePrompt(args.prompt, {
            aspectRatio: args.aspectRatio,
            referenceCount: args.referenceCount || 0,
        });
        const formatted = formatForPlatform(args.prompt, args.platform || 'nano_banana_pro', {
            aspectRatio: args.aspectRatio,
            referenceCount: args.referenceCount || 0,
        });
        return {
            content: [{ type: 'text', text: JSON.stringify({ studio_brief: studioBrief, platform_adapter: formatted }, null, 2) }],
        };
    }

    if (name === 'get_capcut_preset') {
        const key = args.preset && CAPCUT_VN_TYPOGRAPHY_PRESETS[args.preset] ? args.preset : 'editorial_luxury';
        return {
            content: [{ type: 'text', text: JSON.stringify({ preset_key: key, preset: CAPCUT_VN_TYPOGRAPHY_PRESETS[key], all_presets: Object.keys(CAPCUT_VN_TYPOGRAPHY_PRESETS) }, null, 2) }],
        };
    }

    if (name === 'check_vietnamese_font') {
        const res = checkVietnameseFontSupport(args.fontName);
        return {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
        };
    }

    if (name === 'export_typography_asset') {
        const res = exportTypographyAsset(args);
        return {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
        };
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

    if (name === 'expand_image_prompt') {
        const res = expandPrompt(args.prompt, args.domain || 'nano_banana_pro', { aspectRatio: args.aspectRatio });
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'generate_design_system') {
        const designMd = generateDesignMD(args.theme || 'ags_editorial', { customAccent: args.customAccent });
        const productMd = generateProductMD({ name: args.brandName || 'AgentSea', theme: args.theme || 'ags_editorial' });
        return { content: [{ type: 'text', text: JSON.stringify({ DESIGN_MD: designMd, PRODUCT_MD: productMd }, null, 2) }] };
    }

    throw new Error(`Unknown MCP tool: ${name}`);
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

run().catch((err) => {
    console.error('AGS Design Harness MCP Server Error:', err);
    process.exit(1);
});
