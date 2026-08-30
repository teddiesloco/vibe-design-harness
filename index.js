import https from 'https';
import { checkFile } from './harness/ui_linter.js';
import { expandPrompt, VISUAL_DOMAINS, ALIASES } from './harness/prompt_expander.js';
import { generateDesignMD, THEMES, listThemes } from './harness/claude_design_engine.js';

const REMOTE_RULES_URL = 'https://raw.githubusercontent.com/teddiesloco/vibe-design-harness/main/harness/remote_rules.json';

// In-memory cache for remote rules
let remoteRulesCache = null;
let lastFetchTime = 0;

/**
 * 100% Free Open-Source Remote Rule Sync (Dynamic Rule Engine)
 * Fetches latest AI-slop patterns with 5s cache TTL
 */
export async function fetchRemoteRules() {
    const now = Date.now();
    if (remoteRulesCache && (now - lastFetchTime < 300000)) { // 5 min cache
        return remoteRulesCache;
    }

    return new Promise((resolve) => {
        const req = https.get(REMOTE_RULES_URL, { timeout: 2500 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    remoteRulesCache = JSON.parse(data);
                    lastFetchTime = Date.now();
                    resolve(remoteRulesCache);
                } catch {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
        req.on('timeout', () => { req.destroy(); resolve(null); });
    });
}

/**
 * Deterministic Zero-Token UI/UX Linter (Pure JS)
 * @param {string} filePath Path to HTML file or raw HTML string
 * @param {Object} options Optional config or custom rules
 */
export function lintUI(filePath, options = {}) {
    try {
        return checkFile(filePath, options);
    } catch (err) {
        return { success: false, passed: false, error: err.message };
    }
}

export {
    expandPrompt,
    generateDesignMD,
    listThemes,
    THEMES,
    VISUAL_DOMAINS,
    ALIASES
};

export default {
    lintUI,
    expandPrompt,
    generateDesignMD,
    listThemes,
    fetchRemoteRules,
    THEMES,
    VISUAL_DOMAINS,
    ALIASES
};
