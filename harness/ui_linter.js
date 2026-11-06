/**
 * VibeDesign-Harness UI Linter & Aesthetic Auditor (v3.0.0 — 35+ Anti-Slop & Architecture Gates)
 * 100% Pure JavaScript (Zero Python Dependency, Zero External Runtime, <1ms execution)
 * Supports:
 *  - .viberc.json / .vibe-design/config.json auto-loading
 *  - Scoped detection (--scope layout|type|color|motion|copy|slop|dashboard|all)
 *  - Inline ignore comments (<!-- vibe-disable rule-id -->)
 *  - --fix deterministic auto-remediation
 */

import fs from 'fs';
import path from 'path';

export const BANNED_PATTERNS = [
    // --- COLOR & GRADIENT SLOP ---
    {
        id: 'generic-purple-gradient',
        scope: 'color',
        pattern: /from-purple-\d+\s+to-blue-\d+/i,
        message: 'Generic purple-to-blue AI gradient detected [generic-purple-gradient]',
        fix: 'from-zinc-900 to-black'
    },
    {
        id: 'cheesy-indigo-gradient',
        scope: 'color',
        pattern: /bg-gradient-to-r\s+from-indigo-\d+\s+via-purple-\d+/i,
        message: 'Cheesy generic AI gradient detected [cheesy-indigo-gradient]',
        fix: 'bg-zinc-950 border border-zinc-800'
    },
    {
        id: 'weak-gray-backdrop',
        scope: 'color',
        pattern: /(?<!selection:|hover:|focus:)\bbg-(gray|zinc|slate)-800(?!\/)\b/i,
        message: 'Weak gray background (use deep dark bg-zinc-950 or #08090a) [weak-gray-backdrop]',
        fix: 'bg-zinc-950'
    },
    {
        id: 'raw-inline-gradient',
        scope: 'color',
        pattern: /style="[^"]*background:\s*linear-gradient[^"]*"/i,
        message: 'Raw inline gradient detected (use semantic tokens) [raw-inline-gradient]',
        fix: 'class="bg-zinc-950 border border-zinc-800"'
    },
    {
        id: 'harsh-multi-gradient',
        scope: 'color',
        pattern: /from-(rose|pink|purple|amber)-\d+\s+to-(indigo|blue|emerald|teal)-\d+/i,
        message: 'Harsh multi-gradient clash on surface (use neutral surface + 1 subtle semantic accent) [harsh-multi-gradient]'
    },
    {
        id: 'conic-gradient-slop',
        scope: 'color',
        pattern: /conic-gradient/i,
        message: 'Conic-gradient = visual slop (use palette-matched low-chroma tonal grade) [conic-gradient-slop]'
    },
    {
        id: 'gradient-text',
        scope: 'color',
        pattern: /gradient.*text|bg-clip-text\s+text-transparent/i,
        message: 'Gradient headline text = lazy AI Tell (use solid high-contrast + single accent) [gradient-text]'
    },
    {
        id: 'pink-orange-gradient',
        scope: 'color',
        pattern: /from-pink-\d+\s+to-orange-\d+/i,
        message: 'Pink-to-orange creator gradient = slop (use palette-matched tonal grade) [pink-orange-gradient]'
    },
    {
        id: 'radial-spotlight-glow',
        scope: 'color',
        pattern: /blur-3xl[^>]*radial-gradient|radial-gradient\([^)]+\)[^>]*blur-(?:2xl|3xl)/i,
        message: 'Floating radial-gradient spotlight cloud behind copy is a reflex AI decoration [radial-spotlight-glow]'
    },
    {
        id: 'repeating-stripes-gradient',
        scope: 'color',
        pattern: /repeating-(?:linear|radial)-gradient/i,
        message: 'Repeating-gradient decorative stripes are a recurring generated-UI signature [repeating-stripes-gradient]'
    },

    // --- LAYOUT, CARD & STRUCTURE SLOP ---
    {
        id: 'unstyled-native-button',
        scope: 'layout',
        pattern: /<button(?![^>]*(?:class|className)=)/i,
        message: 'Unstyled native button tag detected [unstyled-native-button]',
        fix: '<button class="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 font-medium hover:bg-white transition"'
    },
    {
        id: 'toy-box-logo',
        scope: 'slop',
        pattern: /class="[^"]*w-\d+\s+h-\d+\s+rounded-[^"]*bg-gradient-to-[^"]*text-white[^"]*font-black[^"]*">\s*[A-Z0-9]{2,3}\s*<\/div>/i,
        message: 'Toy-box initial sticker logo detected (use minimalist SVG vector mark or typographic wordmark) [toy-box-logo]'
    },
    {
        id: 'emoji-in-badge',
        scope: 'slop',
        pattern: />\s*[🪙🔥⭐🎁🎉🚀💸✨]\s*</i,
        message: 'Raw emoji used as UI icon in element (use subtle monochrome 14-16px SVG vector icon) [emoji-in-badge]'
    },
    {
        id: 'elongated-pill-cta',
        scope: 'layout',
        pattern: /rounded-full\s+px-(?:10|12|14|16)/i,
        message: 'Elongated pill CTA button detected (use rounded-lg or rounded-xl with balanced padding) [elongated-pill-cta]'
    },
    {
        id: 'border-accent-on-rounded',
        scope: 'layout',
        pattern: /class="[^"]*\brounded-(?:lg|xl|2xl|3xl)\b[^"]*\bborder-[lrtb]-(?:2|4|8)\b[^"]*"|class="[^"]*\bborder-[lrtb]-(?:2|4|8)\b[^"]*\brounded-(?:lg|xl|2xl|3xl)\b[^"]*"/i,
        message: 'Thick side-tab accent border on a rounded card clashes with rounded corners — classic AI tell [border-accent-on-rounded]'
    },
    {
        id: 'gpt-thin-border-wide-shadow',
        scope: 'layout',
        pattern: /class="[^"]*\bborder\b[^"]*\bshadow-2xl\b[^"]*"[\s\S]{1,400}class="[^"]*\bborder\b[^"]*\bshadow-2xl\b[^"]*"/i,
        message: 'Row of cards each wearing a hairline border plus wide shadow-2xl is a recurring generated-UI signature [gpt-thin-border-wide-shadow]'
    },
    {
        id: 'numbered-section-labels',
        scope: 'layout',
        pattern: />\s*01\s*<\/span>[\s\S]{1,1200}>\s*02\s*<\/span>[\s\S]{1,1200}>\s*03\s*<\/span>/i,
        message: 'Repeated 01 / 02 / 03 index badges on cards/sections are AI editorial scaffolding [numbered-section-labels]'
    },
    {
        id: 'broken-image',
        scope: 'layout',
        pattern: /<img(?![^>]*\bsrc=["'][^"']+["'])[^>]*>|<img[^>]*\bsrc=["'](?:#|about:blank|placeholder\.jpg|todo)["'][^>]*>/i,
        message: 'Broken or placeholder <img> tag detected (use real asset or remove tag) [broken-image]'
    },

    // --- TYPOGRAPHY & HIERARCHY SLOP ---
    {
        id: 'ai-slop-fonts',
        scope: 'type',
        pattern: /\b(Space\s*Grotesk|Syne|Outfit|Sora|Chivo|Unbounded)\b/i,
        message: 'Banned AI-slop font detected (use Inter, Plus Jakarta Sans, Inter Tight, or Oswald) [ai-slop-fonts]'
    },
    {
        id: 'italic-serif-display',
        scope: 'type',
        pattern: /<h1[^>]*class="[^"]*\bfont-serif\b[^"]*\bitalic\b[^"]*"|<h1[^>]*class="[^"]*\bitalic\b[^"]*\bfont-serif\b[^"]*"/i,
        message: 'Oversized italic serif hero H1 has become a default AI-startup trope — set roman or intentional display [italic-serif-display]'
    },
    {
        id: 'justified-text',
        scope: 'type',
        pattern: /\btext-justify\b(?![^"']*hyphens-auto)/i,
        message: 'Justified text without hyphens-auto creates vertical rivers of whitespace [justified-text]'
    },
    {
        id: 'crushed-letter-spacing',
        scope: 'type',
        pattern: /tracking-\[-0\.0[6-9]em\]|letter-spacing:\s*-0\.0[6-9]em/i,
        message: 'Letter-spacing crushed past legibility (<-0.05em) [crushed-letter-spacing]'
    },
    {
        id: 'wide-body-tracking',
        scope: 'type',
        pattern: /<p[^>]*class="[^"]*\btracking-(?:widest|wider)\b[^"]*"/i,
        message: 'Wide tracking on body paragraphs disrupts word shapes and slows reading [wide-body-tracking]'
    },
    {
        id: 'skipped-heading',
        scope: 'type',
        pattern: /<h1[\s>](?:(?!<h2[\s>])[\s\S])*?<h3[\s>]/i,
        message: 'Skipped heading level (<h1> followed by <h3> with no <h2> in between) breaks document outline [skipped-heading]'
    },

    // --- MOTION SLOP ---
    {
        id: 'animate-bounce',
        scope: 'motion',
        pattern: /\banimate-bounce\b/i,
        message: 'Bounce animation = AI motion slop (use exponential ease-out cubic-bezier(0.16, 1, 0.3, 1)) [animate-bounce]'
    },
    {
        id: 'bounce-easing',
        scope: 'motion',
        pattern: /cubic-bezier\(\s*[0-9.]+\s*,\s*1\.[3-9][0-9]*|ease-elastic|ease-bounce/i,
        message: 'Overshoot/elastic easing feels dated and tacky (use natural deceleration cubic-bezier(0.16, 1, 0.3, 1)) [bounce-easing]'
    },
    {
        id: 'pulsing-dot',
        scope: 'motion',
        pattern: /rounded-full[^>]*\banimate-(?:pulse|ping)\b|\banimate-(?:pulse|ping)\b[^>]*rounded-full/i,
        message: 'Decorative pulsing status dot simulates fake liveness (use static indicator unless tied to live socket data) [pulsing-dot]'
    },

    // --- COPYWRITING & CADENCE SLOP ---
    {
        id: 'marketing-buzzword',
        scope: 'copy',
        pattern: /\b(unleash|revolutionize|supercharge|empowering|next-gen|seamless\s+platform|transformative\s+platform|game-changing|synergize|world-class|cutting-edge|enterprise-grade)\b/i,
        message: 'Generic AI marketing buzzword detected (write specific verbs and concrete outcomes) [marketing-buzzword]'
    },
    {
        id: 'fake-placeholder-brand',
        scope: 'copy',
        pattern: /\b(Acme|Nexus\s|Flowbit|Quantumly|NovaCore)\b/i,
        message: 'Fake placeholder brand name detected (use real project name or domain-specific brand) [fake-placeholder-brand]'
    },
    {
        id: 'theater-slop-phrase',
        scope: 'copy',
        pattern: /\b(security\s+theater|productivity\s+theater|compliance\s+theater|innovation\s+theater)\b/i,
        message: 'Dismissing something as "X theater" is a recurring AI copy tic [theater-slop-phrase]'
    },
    {
        id: 'aphoristic-cadence',
        scope: 'copy',
        pattern: /Not\s+a\s+[a-z]+\.\s+A\s+[a-z]+\.|No\s+fluff\.\s+No\s+bloat\.\s+Just\b/i,
        message: 'Manufactured-contrast aphorism ("Not a X. A Y." / "No fluff. Just Z.") reads as AI cadence [aphoristic-cadence]'
    },

    // --- APP & DASHBOARD ARCHITECTURAL GATES (Cleanroom App UI/UX Spec) ---
    {
        id: 'solid-red-destructive-button',
        scope: 'dashboard',
        pattern: /<button[^>]*class(?:Name)?=["'][^"']*\bbg-(?:rose|red)-(?:500|600|700)\b[^"']*\btext-white\b[^"']*["']/i,
        message: 'Locked Rule #2 (I4): Destructive buttons must use subtle rose fill (bg-rose-500/10 text-rose-700), never solid bg-rose-500/600 text-white [solid-red-destructive-button]',
        fix: 'bg-rose-500/10 text-rose-700 hover:bg-rose-500/15'
    },
    {
        id: 'hover-scale-on-card',
        scope: 'dashboard',
        pattern: /class(?:Name)?=["'][^"']*\brounded-(?:xl|2xl|3xl)\b[^"']*\bhover:scale-(?:105|110)\b[^"']*["']/i,
        message: 'Rule P7/F22: hover:scale-105 on cards blurs text during transition; elevate shadow one step (hover:shadow-md) instead [hover-scale-on-card]',
        fix: 'hover:shadow-md'
    },
    {
        id: 'scrollbar-width-none-on-vertical',
        scope: 'dashboard',
        pattern: /overflow-y-(?:auto|scroll)[^"']*\bscrollbar-none\b/i,
        message: 'Locked Rule #13 (I18): Never hide vertical scrollbars with scrollbar-width:none (causes horizontal layout jump); use 4px transparent-thumb autohide [scrollbar-width-none-on-vertical]'
    },
    {
        id: 'tight-stacked-nav-gap',
        scope: 'dashboard',
        pattern: /<(?:nav|aside)[^>]*class(?:Name)?=["'][^"']*\b(?:gap-0\.5|space-y-0\.5)\b[^"']*["']/i,
        message: 'Locked Rule #19: Stacked interactive nav/sidebar items require at least 4px gap (gap-1), never gap-0.5 or space-y-0.5 [tight-stacked-nav-gap]',
        fix: 'gap-1'
    },
    {
        id: 'hardcoded-white-on-primary-token',
        scope: 'dashboard',
        pattern: /\bbg-primary\s+text-white\b/i,
        message: 'Brand Token Rule: Use bg-primary text-primary-foreground instead of bg-primary text-white so dark-mode inverted primary remains legible [hardcoded-white-on-primary-token]',
        fix: 'bg-primary text-primary-foreground'
    },
    {
        id: 'tailwind-v4-self-referential-token',
        scope: 'dashboard',
        pattern: /--color-([a-z0-9-]+):\s*var\(--color-\1\)/i,
        message: 'Tailwind v4 Trap (W2): Self-referential @theme token (--color-x: var(--color-x)) creates a circular CSS variable; map to var(--x) instead [tailwind-v4-self-referential-token]'
    }
];

export const REQUIRED_PATTERNS = [
    { pattern: /(bg-zinc-950|bg-slate-950|#08090a|#09090b|#050505|#05060f|#f4f4f6|bg-surface|bg-background|bg-white|#ffffff|#fbfbfd|#fafafa|#f8fbfd|#f4f6f5|#f7f5f0)/i, message: 'Foundation background color token missing' },
    { pattern: /(font-|tracking-tight|inter|be vietnam|ibm plex|geist|oswald|sans-serif|serif|--app-font)/i, message: 'Modern typography scale declaration missing' }
];

/**
 * List all available deterministic detector rules
 */
export function listLintRules(scope = null) {
    const rules = BANNED_PATTERNS.map(r => ({
        id: r.id,
        scope: r.scope || 'slop',
        message: r.message,
        fixable: Boolean(r.fix)
    }));
    if (scope && scope !== 'all') {
        return rules.filter(r => r.scope === scope);
    }
    return rules;
}

/**
 * Auto-discover and load local .viberc.json, vibe.config.json, or .vibe-design/config.json if present
 */
export function loadLocalConfig(customPath = null) {
    const candidates = customPath ? [customPath] : [
        path.resolve(process.cwd(), '.viberc.json'),
        path.resolve(process.cwd(), '.viberc'),
        path.resolve(process.cwd(), 'vibe.config.json'),
        path.resolve(process.cwd(), '.vibe-design/config.json')
    ];

    for (const file of candidates) {
        if (fs.existsSync(file)) {
            try {
                const raw = fs.readFileSync(file, 'utf-8');
                return JSON.parse(raw);
            } catch (e) {
                // Ignore parse errors, fallback to default
            }
        }
    }
    return null;
}

/**
 * Parse inline ignore comments: <!-- vibe-disable rule1, rule2 -->
 */
function extractInlineIgnores(content) {
    const ignored = new Set();
    const regex = /(?:vibe-disable)(?:-line|-next-line)?\s+([a-z0-9_,\s*-]+?)(?:-->|\*\/|\n|$)/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const tokens = match[1].split(/[,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
        tokens.forEach(t => ignored.add(t));
    }
    return ignored;
}

/**
 * Check raw HTML content or file for AI-slop visual anti-patterns
 * @param {string} filePathOrContent File path or raw HTML string
 * @param {Object} options Optional config / scope / remote rules / custom rules
 */
export function checkFile(filePathOrContent, options = {}) {
    let content = '';
    let filePath = filePathOrContent;

    if (typeof filePathOrContent === 'string' && fs.existsSync(filePathOrContent)) {
        try {
            content = fs.readFileSync(filePathOrContent, 'utf-8');
        } catch (err) {
            return {
                file: filePathOrContent,
                success: false,
                passed: false,
                errors: [`File read error: ${err.message}`],
                warnings: []
            };
        }
    } else {
        content = filePathOrContent || '';
        filePath = '<raw_content>';
    }

    const localConfig = loadLocalConfig(options.configPath);
    const activeOptions = { ...localConfig, ...options };
    const scope = activeOptions.scope || 'all';
    const inlineIgnores = extractInlineIgnores(content);

    if (inlineIgnores.has('*')) {
        return {
            file: filePath,
            success: true,
            passed: true,
            errors: [],
            warnings: [],
            violation_count: 0
        };
    }

    const errors = [];
    const warnings = [];

    // Combine base banned patterns with local / remote config
    let activeBanned = [...BANNED_PATTERNS];
    if (scope && scope !== 'all') {
        activeBanned = activeBanned.filter(r => r.scope === scope);
    }

    if (activeOptions.banned_patterns && Array.isArray(activeOptions.banned_patterns)) {
        activeOptions.banned_patterns.forEach((item, idx) => {
            if (typeof item === 'string') {
                activeBanned.push({ id: `custom-${idx}`, scope: 'custom', pattern: new RegExp(item, 'i'), message: `Custom rule violation: ${item}` });
            } else if (item.pattern) {
                activeBanned.push({ id: item.id || `custom-${idx}`, scope: item.scope || 'custom', pattern: new RegExp(item.pattern, 'i'), message: item.message || 'Custom violation' });
            }
        });
    }

    for (const rule of activeBanned) {
        if (rule.id && inlineIgnores.has(rule.id.toLowerCase())) {
            continue;
        }
        if (rule.pattern.test(content)) {
            errors.push(`❌ FAIL: ${rule.message}`);
        }
    }

    // Check em-dash saturation (AGS editorial rule: >= 8 em-dashes in body copy)
    const emDashMatches = content.match(/—|--/g);
    if (emDashMatches && emDashMatches.length >= 12 && !inlineIgnores.has('em-dash-overuse')) {
        warnings.push(`⚠️ WARN: High em-dash saturation (${emDashMatches.length} instances) — common AI copywriting tell [em-dash-overuse]`);
    }

    for (const { pattern, message } of REQUIRED_PATTERNS) {
        if (!pattern.test(content)) {
            warnings.push(`⚠️ WARN: ${message}`);
        }
    }

    const passed = errors.length === 0;
    return {
        file: filePath,
        scope,
        success: true,
        passed,
        errors,
        warnings,
        violation_count: errors.length
    };
}

/**
 * Auto-fixer: remediates known AI-slop patterns into production-grade tokens
 * @param {string} content Raw HTML/JSX content string
 */
export function fixContent(content) {
    let fixed = content;
    let fixCount = 0;

    // 1. Replace weak gray-800 with deep obsidian/zinc-950
    if (/\bbg-(gray|zinc|slate)-800\b/i.test(fixed)) {
        fixed = fixed.replace(/\bbg-(gray|zinc|slate)-800\b/gi, 'bg-zinc-950');
        fixCount++;
    }

    // 2. Replace generic purple-to-blue gradients
    if (/from-purple-\d+\s+to-blue-\d+/i.test(fixed)) {
        fixed = fixed.replace(/from-purple-\d+\s+to-blue-\d+/gi, 'from-zinc-900 to-black');
        fixCount++;
    }

    // 3. Replace pink-to-orange gradients
    if (/from-pink-\d+\s+to-orange-\d+/i.test(fixed)) {
        fixed = fixed.replace(/from-pink-\d+\s+to-orange-\d+/gi, 'from-zinc-900 to-zinc-950');
        fixCount++;
    }

    // 4. Replace unstyled button tags
    if (/<button(?![^>]*class=)/i.test(fixed)) {
        fixed = fixed.replace(/<button(?![^>]*class=)([^>]*)>/gi, '<button class="px-5 py-2.5 rounded-lg bg-white text-zinc-900 font-semibold hover:bg-zinc-200 transition shadow-sm"$1>');
        fixCount++;
    }

    // 5. Replace animate-bounce with smooth transition
    if (/\banimate-bounce\b/i.test(fixed)) {
        fixed = fixed.replace(/\banimate-bounce\b/gi, 'transition-transform duration-300');
        fixCount++;
    }

    // 6. Replace decorative animate-pulse on dots
    if (/\banimate-pulse\b/i.test(fixed)) {
        fixed = fixed.replace(/\banimate-pulse\b/gi, 'opacity-90');
        fixCount++;
    }

    // 7. Replace elongated pill CTA padding
    if (/rounded-full\s+px-(?:10|12|14|16)/i.test(fixed)) {
        fixed = fixed.replace(/rounded-full\s+px-(?:10|12|14|16)/gi, 'rounded-xl px-7');
        fixCount++;
    }

    // 8. Replace banned AI-slop fonts with Plus Jakarta Sans
    if (/\b(Space\s*Grotesk|Syne|Outfit|Sora|Chivo|Unbounded)\b/i.test(fixed)) {
        fixed = fixed.replace(/\b(Space\s*Grotesk|Syne|Outfit|Sora|Chivo|Unbounded)\b/gi, 'Plus Jakarta Sans');
        fixCount++;
    }

    // 9. Fix text-justify without hyphens
    if (/\btext-justify\b(?![^"']*hyphens-auto)/i.test(fixed)) {
        fixed = fixed.replace(/\btext-justify\b/gi, 'text-left');
        fixCount++;
    }

    // 10. Fix bg-primary text-white -> bg-primary text-primary-foreground
    if (/\bbg-primary\s+text-white\b/i.test(fixed)) {
        fixed = fixed.replace(/\bbg-primary\s+text-white\b/gi, 'bg-primary text-primary-foreground');
        fixCount++;
    }

    // 11. Fix solid red destructive buttons -> subtle rose semantic button (Locked Rule #2)
    if (/<button([^>]*)class=["']([^"']*)\bbg-(?:rose|red)-(?:500|600|700)\b([^"']*)\btext-white\b([^"']*)["']/i.test(fixed)) {
        fixed = fixed.replace(
            /\bbg-(?:rose|red)-(?:500|600|700)\b(\s+)\btext-white\b/gi,
            'bg-rose-500/10$1text-rose-700 hover:bg-rose-500/15'
        );
        fixCount++;
    }

    // 12. Fix hover:scale-105 on cards -> hover:shadow-md (Rule P7/F22)
    if (/\bhover:scale-(?:105|110)\b/i.test(fixed)) {
        fixed = fixed.replace(/\bhover:scale-(?:105|110)\b/gi, 'hover:shadow-md');
        fixCount++;
    }

    return {
        fixedContent: fixed,
        fixCount,
        changed: fixCount > 0
    };
}

export default {
    checkFile,
    fixContent,
    loadLocalConfig,
    listLintRules,
    BANNED_PATTERNS,
    REQUIRED_PATTERNS
};
