/**
 * VibeDesign-Harness Complete Landing Page Assembler Engine
 * Combines 12 Design System Themes, Curated Pro Components (Hero Spotlight, Bento Grid, Pricing),
 * and Auto-Validates via Deterministic UI Linter.
 * Eliminates the need to manually copy Magic UI / Aceternity snippets.
 */

import { THEMES, generateDesignMD } from './claude_design_engine.js';
import { COMPONENTS, getComponent } from './components.js';
import { checkFile } from './ui_linter.js';

/**
 * Assemble a complete, production-ready, zero-slop HTML Landing Page
 * @param {Object} options Configuration parameters
 */
export function scaffoldLandingPage(options = {}) {
    const themeKey = (options.theme || 'linear').toLowerCase().trim();
    const theme = THEMES[themeKey] || THEMES.linear;
    
    // Allow custom accent override
    const activeTheme = {
        ...theme,
        accent: options.customAccent || theme.accent,
        font: options.customFont || theme.font
    };

    const title = options.title || "VibeDesign — Autonomous AI Design Harness";
    const brand = options.brand || "VibeDesign";
    
    // Assemble component sections in order
    const navbar = getComponent('navbar_minimal', activeTheme, { brand });
    const hero = getComponent('hero_spotlight', activeTheme, {
        title: options.heroTitle || "High-Velocity AI Landing Pages. Zero AI Slop.",
        subtitle: options.heroSubtitle || "Scaffold, audit, and ship production-grade landing pages directly inside your AI Agent context without pasting external code blocks.",
        ctaPrimary: options.ctaPrimary || "Start Building",
        ctaSecondary: options.ctaSecondary || "View Architecture"
    });
    const bento = getComponent('bento_grid', activeTheme, {
        cards: options.bentoCards
    });
    const pricing = getComponent('pricing_matrix', activeTheme, {
        tiers: options.pricingTiers
    });
    const footer = getComponent('footer_minimal', activeTheme, { brand });

    const htmlContent = `<!DOCTYPE html>
<html lang="en" class="${activeTheme.mode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: ${activeTheme.font};
      background-color: ${activeTheme.bg};
      color: ${activeTheme.textMain};
      min-height: 100vh;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body class="selection:bg-emerald-500/30 selection:text-emerald-300">
  ${navbar}
  <main>
    ${hero}
    ${bento}
    ${pricing}
  </main>
  ${footer}
</body>
</html>`;

    // Self-validate output through built-in UI Linter
    const lintResult = checkFile(htmlContent);

    return {
        theme: activeTheme.name,
        theme_key: themeKey,
        html: htmlContent,
        lint_passed: lintResult.passed,
        lint_errors: lintResult.errors || [],
        design_md: generateDesignMD(themeKey, activeTheme.accent)
    };
}

export default {
    scaffoldLandingPage
};
