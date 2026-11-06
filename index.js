/**
 * AGS Design & Visual Studio Harness (v2.1.0)
 * 100% Pure JavaScript (Zero Python Dependency)
 */
import { checkFile, fixContent, loadLocalConfig, listLintRules, BANNED_PATTERNS, REQUIRED_PATTERNS } from './harness/ui_linter.js';
import {
    expandPrompt,
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    registerDomain,
    listDomains,
    VISUAL_DOMAINS
} from './harness/prompt_expander.js';
import {
    VIETNAMESE_FONT_BLACKLIST,
    VIETNAMESE_SAFE_FONTS,
    hasVietnameseDiacritics,
    checkVietnameseFontSupport,
    toMidjourneyFormat,
    toOpenAIFormat,
    toFluxFormat,
    toNanoBananaFormat,
    toSeedanceFormat,
    formatForPlatform,
    exportTypographyAsset
} from './harness/studio_image_engine.js';
import { generateDesignMD, getTheme, registerTheme, listThemes, THEMES } from './harness/ags_design_engine.js';
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
    expandPrompt,
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    VIETNAMESE_FONT_BLACKLIST,
    VIETNAMESE_SAFE_FONTS,
    hasVietnameseDiacritics,
    checkVietnameseFontSupport,
    toMidjourneyFormat,
    toOpenAIFormat,
    toFluxFormat,
    toNanoBananaFormat,
    toSeedanceFormat,
    formatForPlatform,
    exportTypographyAsset,
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
    scaffoldDashboardApp
};

export default {
    lintUI,
    fixUI,
    expandPrompt,
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    VIETNAMESE_FONT_BLACKLIST,
    VIETNAMESE_SAFE_FONTS,
    hasVietnameseDiacritics,
    checkVietnameseFontSupport,
    toMidjourneyFormat,
    toOpenAIFormat,
    toFluxFormat,
    toNanoBananaFormat,
    toSeedanceFormat,
    formatForPlatform,
    exportTypographyAsset,
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
    scaffoldDashboardApp
};
