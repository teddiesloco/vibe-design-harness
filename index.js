/**
 * VibeDesign-Harness (v3.1.0) — Unified UI/UX Design System, App Architecture,
 * Scroll Choreography, Reverse Token Extractor & Interactive Truth Engine
 * 100% Pure JavaScript (Zero Python Dependency, Single-Purpose UI/UX Engineering)
 */
import { checkFile, fixContent, loadLocalConfig, listLintRules, BANNED_PATTERNS, REQUIRED_PATTERNS } from './harness/ui_linter.js';
import {
    generateDesignMD,
    getTheme,
    registerTheme,
    listThemes,
    THEMES,
    VIETNAMESE_FONT_BLACKLIST,
    VIETNAMESE_SAFE_FONTS,
    hasVietnameseDiacritics,
    checkVietnameseFontSupport
} from './harness/ags_design_engine.js';
import { getComponent, listComponents, PRO_COMPONENTS } from './harness/components.js';
import { scaffoldLandingPage } from './harness/landing_assembler.js';
import { CRAFT_FLOOR, DESIGN_COMMANDS, listDesignCommands, getDesignCommand, generateProductMD } from './harness/design_commands.js';
import {
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
} from './harness/app_ui_system.js';
import {
    SCROLL_GRAMMARS,
    CHOREOGRAPHY_DEVICES,
    VISUAL_WORLDS,
    recommendScrollChoreography,
    verifyScrollFingerprint,
    getScrollChoreographyReference,
    scaffoldScrollStoryPage
} from './harness/scroll_choreography.js';
import {
    TWO_LAYER_MATERIAL_SPEC,
    DEFAULT_DTCG_TOKENS,
    hexToRgb,
    relativeLuminance,
    getContrastRatio,
    extractDesignSystemFromRepo,
    compileDTCGTokens,
    generateDesignPreviewHTML
} from './harness/design_extractor.js';

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
        // Fallback to local rules
    }
    return null;
}

export {
    generateDesignMD,
    getTheme,
    registerTheme,
    listThemes,
    THEMES,
    VIETNAMESE_FONT_BLACKLIST,
    VIETNAMESE_SAFE_FONTS,
    hasVietnameseDiacritics,
    checkVietnameseFontSupport,
    getComponent,
    listComponents,
    PRO_COMPONENTS,
    scaffoldLandingPage,
    loadLocalConfig,
    listLintRules,
    BANNED_PATTERNS,
    REQUIRED_PATTERNS,
    CRAFT_FLOOR,
    DESIGN_COMMANDS,
    listDesignCommands,
    getDesignCommand,
    generateProductMD,
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
    scaffoldDashboardApp,
    SCROLL_GRAMMARS,
    CHOREOGRAPHY_DEVICES,
    VISUAL_WORLDS,
    recommendScrollChoreography,
    verifyScrollFingerprint,
    getScrollChoreographyReference,
    scaffoldScrollStoryPage,
    TWO_LAYER_MATERIAL_SPEC,
    DEFAULT_DTCG_TOKENS,
    hexToRgb,
    relativeLuminance,
    getContrastRatio,
    extractDesignSystemFromRepo,
    compileDTCGTokens,
    generateDesignPreviewHTML
};

export default {
    lintUI,
    fixUI,
    generateDesignMD,
    getTheme,
    registerTheme,
    listThemes,
    VIETNAMESE_FONT_BLACKLIST,
    VIETNAMESE_SAFE_FONTS,
    hasVietnameseDiacritics,
    checkVietnameseFontSupport,
    getComponent,
    listComponents,
    scaffoldLandingPage,
    fetchRemoteRules,
    loadLocalConfig,
    listLintRules,
    CRAFT_FLOOR,
    DESIGN_COMMANDS,
    listDesignCommands,
    getDesignCommand,
    generateProductMD,
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
    scaffoldDashboardApp,
    SCROLL_GRAMMARS,
    CHOREOGRAPHY_DEVICES,
    VISUAL_WORLDS,
    recommendScrollChoreography,
    verifyScrollFingerprint,
    getScrollChoreographyReference,
    scaffoldScrollStoryPage,
    TWO_LAYER_MATERIAL_SPEC,
    DEFAULT_DTCG_TOKENS,
    hexToRgb,
    relativeLuminance,
    getContrastRatio,
    extractDesignSystemFromRepo,
    compileDTCGTokens,
    generateDesignPreviewHTML
};
