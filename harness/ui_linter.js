/**
 * VibeDesign-Harness UI Linter & Aesthetic Auditor (Pass 2 Deterministic Audit)
 * 100% Pure JavaScript (Zero Python Dependency, Zero External Runtime)
 * Supports: .viberc.json auto-loading, custom rules, and --fix auto-remediation.
 */

import fs from 'fs';
import path from 'path';

export const BANNED_PATTERNS = [
    { pattern: /from-purple-\d+\s+to-blue-\d+/i, message: 'Generic purple-to-blue AI gradient detected', fix: 'from-zinc-900 to-black' },
    { pattern: /bg-gradient-to-r\s+from-indigo-\d+\s+via-purple-\d+/i, message: 'Cheesy generic AI gradient detected', fix: 'bg-zinc-950 border border-zinc-800' },
    { pattern: /\bbg-(gray|zinc|slate)-800\b/i, message: 'Weak gray background (use deep dark bg-zinc-950 or #08090a)', fix: 'bg-zinc-950' },
    { pattern: /<button(?![^>]*class=)/i, message: 'Unstyled native button tag detected', fix: '<button class="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 font-medium hover:bg-white transition"' },
    { pattern: /style="[^"]*background:\s*linear-gradient[^"]*"/i, message: 'Raw inline gradient detected (use semantic tokens)', fix: 'class="bg-zinc-950 border border-zinc-800"' },
    // Professional UI/UX Anti-Slop Rules
    { pattern: /class="[^"]*w-\d+\s+h-\d+\s+rounded-[^"]*bg-gradient-to-[^"]*text-white[^"]*font-black[^"]*">\s*[A-Z0-9]{2,3}\s*<\/div>/i, message: 'Toy-box initial sticker logo detected (use minimalist SVG vector mark or typographic wordmark)' },
    { pattern: />\s*[🪙🔥⭐🎁🎉🚀💸]\s*</i, message: 'Raw emoji used as UI icon in element (use subtle monochrome 14-16px SVG vector icon)' },
    { pattern: /from-(rose|pink|purple|amber)-\d+\s+to-(indigo|blue|emerald|teal)-\d+/i, message: 'Harsh multi-gradient clash on surface (use neutral surface + 1 subtle semantic accent)' },
    // Hallmark 57 + Impeccable + Taste Gates: Typography, Motion & Copy Rules
    { pattern: /\b(Space\s*Grotesk|Syne|Outfit|Sora|Chivo|Unbounded)\b/i, message: 'Banned AI-slop font detected (use Inter, Plus Jakarta Sans, Inter Tight, or Oswald)' },
    { pattern: /rounded-full\s+px-(?:10|12|14|16)/i, message: 'Elongated pill CTA button detected (use rounded-lg or rounded-xl with balanced padding)' },
    // Impeccable 41-rule gates (learned from pbakaus/impeccable)
    { pattern: /animate-bounce/i, message: '[Impeccable] animate-bounce = AI motion slop (use transition-all or purposeful easing)' },
    { pattern: /conic-gradient/i, message: '[Impeccable] conic-gradient = visual slop (use palette-matched low-chroma tonal grade)' },
    { pattern: /gradient.*text|bg-clip-text\s+text-transparent/i, message: '[Impeccable] Gradient headline text = lazy premium shortcut (use solid high-contrast + single accent)' },
    // Taste Skill anti-copy & anti-brand-slop (learned from tasteskill/tasteskill)
    { pattern: /unleash|revolutionize|next-gen|seamless.*platform|transformative\s+platform/i, message: '[Taste] Generic startup copy detected (write short, specific, believable copy instead)' },
    { pattern: /\b(Acme|Nexus\s|Flowbit|Quantumly|NovaCore)\b/i, message: '[Taste] Fake placeholder brand name detected (use real name or design-safe copy)' },
    { pattern: /from-pink-\d+\s+to-orange-\d+/i, message: '[Taste] Pink-to-orange creator gradient = slop (use palette-matched tonal grade)' }
];

export const REQUIRED_PATTERNS = [
    { pattern: /(bg-zinc-950|bg-slate-950|#08090a|#09090b|#050505|bg-white|#ffffff)/i, message: 'Foundation background color token missing' },
    { pattern: /(font-|tracking-tight|inter|geist|oswald|sans-serif|serif)/i, message: 'Modern typography scale declaration missing' }
];

/**
 * Auto-discover and load local .viberc.json or vibe.config.json if present
 */
export function loadLocalConfig(customPath = null) {
    const candidates = customPath ? [customPath] : [
        path.resolve(process.cwd(), '.viberc.json'),
        path.resolve(process.cwd(), '.viberc'),
        path.resolve(process.cwd(), 'vibe.config.json')
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
 * Check raw HTML content or file for AI-slop visual anti-patterns
 * @param {string} filePathOrContent File path or raw HTML string
 * @param {Object} options Optional config / remote rules / custom rules
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

    const errors = [];
    const warnings = [];

    // Combine base banned patterns with local / remote config
    const activeBanned = [...BANNED_PATTERNS];
    if (activeOptions.banned_patterns && Array.isArray(activeOptions.banned_patterns)) {
        activeOptions.banned_patterns.forEach(item => {
            if (typeof item === 'string') {
                activeBanned.push({ pattern: new RegExp(item, 'i'), message: `Custom rule violation: ${item}` });
            } else if (item.pattern) {
                activeBanned.push({ pattern: new RegExp(item.pattern, 'i'), message: item.message || 'Custom violation' });
            }
        });
    }

    for (const { pattern, message } of activeBanned) {
        if (pattern.test(content)) {
            errors.push(`❌ FAIL: ${message}`);
        }
    }

    for (const { pattern, message } of REQUIRED_PATTERNS) {
        if (!pattern.test(content)) {
            warnings.push(`⚠️ WARN: ${message}`);
        }
    }

    const passed = errors.length === 0;
    return {
        file: filePath,
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

    // 3. Replace unstyled button tags
    if (/<button(?![^>]*class=)/i.test(fixed)) {
        fixed = fixed.replace(/<button(?![^>]*class=)([^>]*)>/gi, '<button class="px-5 py-2.5 rounded-lg bg-white text-zinc-900 font-semibold hover:bg-zinc-200 transition shadow-sm"$1>');
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
    BANNED_PATTERNS,
    REQUIRED_PATTERNS
};
