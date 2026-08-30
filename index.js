/**
 * VibeDesign-Harness Main Entry Point
 * 100% Pure JavaScript (Zero Python Dependency)
 */

import { checkFile, fixContent, loadLocalConfig } from './harness/ui_linter.js';
import { expandPrompt, registerDomain, listDomains, VISUAL_DOMAINS } from './harness/prompt_expander.js';
import { generateDesignMD, getTheme, registerTheme, listThemes, THEMES } from './harness/claude_design_engine.js';
import { getComponent, listComponents, PRO_COMPONENTS } from './harness/components.js';
import { scaffoldLandingPage } from './harness/landing_assembler.js';

export function lintUI(filePathOrContent, options = {}) {
    return checkFile(filePathOrContent, options);
}

export function fixUI(content) {
    return fixContent(content);
}

export async function fetchRemoteRules() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/teddiesloco/vibe-design-harness/main/harness/remote_rules.json');
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        // Silently fallback to local rules
    }
    return null;
}

export {
    expandPrompt,
    registerDomain,
    listDomains,
    VISUAL_DOMAINS,
    generateDesignMD,
    getTheme,
    registerTheme,
    listThemes,
    THEMES,
    getComponent,
    listComponents,
    PRO_COMPONENTS,
    scaffoldLandingPage,
    loadLocalConfig
};

export default {
    lintUI,
    fixUI,
    expandPrompt,
    registerDomain,
    listDomains,
    generateDesignMD,
    getTheme,
    registerTheme,
    listThemes,
    getComponent,
    listComponents,
    scaffoldLandingPage,
    fetchRemoteRules,
    loadLocalConfig
};
