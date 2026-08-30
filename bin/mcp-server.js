#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { lintUI, expandPrompt, generateDesignMD, listThemes, listComponents, scaffoldLandingPage, fetchRemoteRules } from '../index.js';

const server = new Server(
    {
        name: 'vibe-design-harness-mcp',
        version: '1.1.0',
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
                name: 'scaffold_landing_page',
                description: 'Assembles a complete, high-converting, zero-slop landing page (Navbar, Hero Spotlight, Bento Grid, 3-Tier Pricing, Footer) directly inside AI agent context with auto-linting.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: {
                            type: 'string',
                            description: 'Design theme: minimalism, luxury_editorial, luxury_gold, linear, stripe, vercel, airbnb, nordic_clean, zen_japanese, neo_brutalism, glassmorphism_dark.',
                            default: 'linear',
                        },
                        title: { type: 'string', description: 'Web page title' },
                        brand: { type: 'string', description: 'Brand name' },
                        heroTitle: { type: 'string', description: 'Hero main headline' },
                        heroSubtitle: { type: 'string', description: 'Hero sub-headline' },
                        customAccent: { type: 'string', description: 'Custom hex accent color override (e.g. #10b981)' },
                    },
                },
            },
            {
                name: 'lint_ui_aesthetic',
                description: 'Deterministic zero-token UI/UX aesthetic linter for HTML/Tailwind. Detects and purges generic purple gradients, unstyled buttons, and weak gray backdrops. Runs 100% in Node.js (0ms lag, zero python).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        filePathOrContent: {
                            type: 'string',
                            description: 'Path to the generated HTML file OR raw HTML code string to audit.',
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
                name: 'expand_image_prompt',
                description: 'Studio Multi-Domain Image Prompt Engine for Gemini Imagen 3+, GPT Image 2, DALL-E, and Midjourney. Enforces lens physics, studio lighting, depth of field, and strict negative constraints across 30+ domains.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description: 'Raw image prompt concept.',
                        },
                        domain: {
                            type: 'string',
                            description: 'Visual domain: luxury_editorial, quiet_luxury, minimalism_visual, photorealism, anime, cyberpunk_anime, 3d_animation, infographic, typography_poster, carousel_ad, sales_creative, logo_branding, mrbeast_ab_thumbnail_variant_a/b/c, pod_tshirt, sticker_vector, shopify_storefront, dropship_product, gemini_imagen_pro, etc.',
                            default: 'photorealism',
                        },
                        lighting: {
                            type: 'string',
                            description: 'Optional custom lighting physics (e.g. dramatic softbox, morning golden hour, neon rim light).',
                        },
                        aspectRatio: {
                            type: 'string',
                            description: 'Optional aspect ratio (e.g. 16:9, 1:1, 9:16, 4:5).',
                        },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'generate_brand_design_md',
                description: 'Generates DESIGN.md design system tokens across 12+ themes (Minimalism, Luxury Editorial, Nordic, Zen, Linear, Stripe, Vercel, Glassmorphism, etc.) to pre-inject into coding agents.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: {
                            type: 'string',
                            description: 'Design theme key (e.g. luxury_editorial, minimalism, linear, stripe).',
                            default: 'linear',
                        },
                        customAccent: {
                            type: 'string',
                            description: 'Optional custom hex accent color override (e.g. #10b981).',
                        },
                    },
                },
            },
            {
                name: 'list_design_themes',
                description: 'Lists all available design themes and their color modes supported by the harness.',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'list_curated_components',
                description: 'Lists available curated Pro component building blocks (Hero Spotlight, Bento Grid, Pricing Matrix, Navbar, Footer).',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request;

    if (name === 'scaffold_landing_page') {
        const result = scaffoldLandingPage(args || {});
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        theme: result.theme,
                        lint_passed: result.lint_passed,
                        html: result.html
                    }, null, 2),
                },
            ],
        };
    }

    if (name === 'lint_ui_aesthetic') {
        let options = {};
        if (args.useRemoteRules) {
            const remoteRules = await fetchRemoteRules();
            if (remoteRules && remoteRules.banned_classes) {
                options.banned_patterns = remoteRules.banned_classes;
            }
        }
        const result = lintUI(args.filePathOrContent, options);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }

    if (name === 'expand_image_prompt') {
        const result = expandPrompt(args.prompt, args.domain || 'photorealism', {
            lighting: args.lighting,
            aspectRatio: args.aspectRatio,
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }

    if (name === 'generate_brand_design_md') {
        const theme = args.theme || 'linear';
        const doc = generateDesignMD(theme, args.customAccent);
        return {
            content: [
                {
                    type: 'text',
                    text: doc,
                },
            ],
        };
    }

    if (name === 'list_design_themes') {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(listThemes(), null, 2),
                },
            ],
        };
    }

    if (name === 'list_curated_components') {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(listComponents(), null, 2),
                },
            ],
        };
    }

    throw new Error(`Tool not found: ${name}`);
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

run().catch((err) => {
    console.error('Fatal MCP error:', err);
    process.exit(1);
});
