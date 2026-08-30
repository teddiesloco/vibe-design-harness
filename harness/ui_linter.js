/**
 * VibeDesign-Harness UI Linter & Aesthetic Auditor (Pass 2 Deterministic Audit)
 * 100% Pure JavaScript (Zero Python Dependency, Zero External Runtime)
 */

import fs from 'fs';

export const BANNED_PATTERNS = [
    { pattern: /from-purple-\d+\s+to-blue-\d+/i, message: 'Generic purple-to-blue AI gradient detected' },
    { pattern: /bg-gradient-to-r\s+from-indigo-\d+\s+via-purple-\d+/i, message: 'Cheesy generic AI gradient detected' },
    { pattern: /\bbg-(gray|zinc|slate)-800\b/i, message: 'Weak gray background (use deep dark bg-zinc-950 or #08090a)' },
    { pattern: /<button(?![^>]*class=)/i, message: 'Unstyled native button tag detected' },
    { pattern: /style="[^"]*background:\s*linear-gradient/i, message: 'Raw inline gradient detected (use semantic tokens)' }
];

export const REQUIRED_PATTERNS = [
    { pattern: /(bg-zinc-950|bg-slate-950|#08090a|#09090b|bg-white|#ffffff)/i, message: 'Foundation background color token missing' },
    { pattern: /(font-|tracking-tight|inter|geist|oswald|sans-serif|serif)/i, message: 'Modern typography scale declaration missing' }
];

/**
 * Check raw HTML content or file for AI-slop visual anti-patterns
 * @param {string} filePathOrContent File path or raw HTML string
 * @param {Object} options Optional remote rules / custom rules
 */
export function checkFile(filePathOrContent, options = {}) {
    let content = '';
    let filePath = filePathOrContent;

    if (fs.existsSync(filePathOrContent)) {
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
        content = filePathOrContent;
        filePath = '<raw_content>';
    }

    const errors = [];
    const warnings = [];

    // Custom / remote banned patterns
    const activeBanned = [...BANNED_PATTERNS];
    if (options.banned_patterns && Array.isArray(options.banned_patterns)) {
        options.banned_patterns.forEach(item => {
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

export default {
    checkFile,
    BANNED_PATTERNS,
    REQUIRED_PATTERNS
};
