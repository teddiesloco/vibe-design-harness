import https from 'https';
import { checkFile } from './harness/ui_linter.js';
import { expandPrompt, registerDomain, VISUAL_DOMAINS, ALIASES } from './harness/prompt_expander.js';
import { generateDesignMD, registerTheme, THEMES, listThemes } from './harness/claude_design_engine.js';
import { COMPONENTS, getComponent, listComponents } from './harness/components.js';
import { scaffoldLandingPage } from './harness/landing_assembler.js';

const REMOTE_RULES_URL = 'https://raw.githubusercontent.com/teddiesloco/vibe-design-harness/main/harness/remote_rules.json';

let remoteRulesCache = null;
let lastFetchTime = 0;

export async function fetchRemoteRules() {
    const now = Date.now();
    if (remoteRulesCache && (now - lastFetchTime < 300000)) {
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

export function lintUI(filePath, options = {}) {
    try {
        return checkFile(filePath, options);
    } catch (err) {
        return { success: false, passed: false, error: err.message };
    }
}

export {
    expandPrompt,
    registerDomain,
    generateDesignMD,
    registerTheme,
    listThemes,
    getComponent,
    listComponents,
    scaffoldLandingPage,
    COMPONENTS,
    THEMES,
    VISUAL_DOMAINS,
    ALIASES
};

export default {
    lintUI,
    expandPrompt,
    registerDomain,
    generateDesignMD,
    registerTheme,
    listThemes,
    getComponent,
    listComponents,
    scaffoldLandingPage,
    fetchRemoteRules,
    COMPONENTS,
    THEMES,
    VISUAL_DOMAINS,
    ALIASES
};
