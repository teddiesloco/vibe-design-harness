/**
 * VibeDesign-Harness Multi-Style & Multi-Theme Design System Engine
 * 100% Pure JavaScript (Zero Python Dependency)
 * Rich Theme Presets: Linear Dark, Stripe Clean, Vercel Mono, Airbnb Warm,
 * Luxury Editorial, Cyberpunk, Neo-Brutalism, Swiss Minimalism, Nordic Clean,
 * Glassmorphism Dark, Zen Japanese, Modern SaaS.
 * Supports full theme customization & dynamic overrides.
 */

export const THEMES = {
    // 1. Dark Precision & Tech
    linear: {
        name: "Linear Precision Dark",
        bg: "#08090a",
        surface: "#121417",
        border: "#22252a",
        textMain: "#f7f8f8",
        textMuted: "#8a8f98",
        accent: "#5e6ad2",
        font: "Inter, system-ui, sans-serif",
        radius: "8px",
        shadow: "0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px #22252a",
        mode: "dark"
    },
    vercel: {
        name: "Vercel Minimalist Monochrome",
        bg: "#000000",
        surface: "#0a0a0a",
        border: "#333333",
        textMain: "#ffffff",
        textMuted: "#888888",
        accent: "#0070f3",
        font: "Geist, Geist Mono, monospace",
        radius: "6px",
        shadow: "none",
        mode: "dark"
    },
    cyberpunk: {
        name: "Cyberpunk Neon Grid",
        bg: "#090a0f",
        surface: "#111422",
        border: "#252b45",
        textMain: "#00f0ff",
        textMuted: "#6f7a9f",
        accent: "#ff0055",
        font: "JetBrains Mono, monospace",
        radius: "4px",
        shadow: "0 0 15px rgba(0, 240, 255, 0.2)",
        mode: "dark"
    },

    // 2. Clean Light & Enterprise
    stripe: {
        name: "Stripe Enterprise Clean",
        bg: "#f8fbfd",
        surface: "#ffffff",
        border: "#e6ebf1",
        textMain: "#0a2540",
        textMuted: "#425466",
        accent: "#635bff",
        font: "Inter, -apple-system, sans-serif",
        radius: "6px",
        shadow: "0 2px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
        mode: "light"
    },
    airbnb: {
        name: "Airbnb Warm Soft",
        bg: "#ffffff",
        surface: "#f7f7f7",
        border: "#dddddd",
        textMain: "#222222",
        textMuted: "#717171",
        accent: "#ff385c",
        font: "Circular, -apple-system, sans-serif",
        radius: "12px",
        shadow: "0 6px 16px rgba(0,0,0,0.08)",
        mode: "light"
    },
    saas_modern: {
        name: "Modern SaaS Emerald & Slate",
        bg: "#0b0f17",
        surface: "#111827",
        border: "#1f2937",
        textMain: "#f9fafb",
        textMuted: "#9ca3af",
        accent: "#10b981",
        font: "Plus Jakarta Sans, sans-serif",
        radius: "10px",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
        mode: "dark"
    },

    // 4. Precision Clean & Luxury Themes
    apple_luxury: {
        name: "Precision Quiet Luxury Light",
        bg: "#fbfbfd",
        surface: "#ffffff",
        border: "#e5e5ea",
        textMain: "#1d1d1f",
        textMuted: "#86868b",
        accent: "#0071e3",
        font: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Plus Jakarta Sans', sans-serif",
        radius: "12px",
        shadow: "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
        mode: "light"
    },
    modern_clean: {
        name: "Modern Precision Clean Light",
        bg: "#fafafa",
        surface: "#ffffff",
        border: "#e4e4e7",
        textMain: "#09090b",
        textMuted: "#71717a",
        accent: "#18181b",
        font: "Geist, 'Plus Jakarta Sans', sans-serif",
        radius: "8px",
        shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        mode: "light"
    },

    // 3. Luxury & Editorial
    luxury_gold: {
        name: "Luxury Dark Emerald & Gold",
        bg: "#051610",
        surface: "#0a231b",
        border: "#184335",
        textMain: "#f4ede4",
        textMuted: "#a2b4ad",
        accent: "#d4af37",
        font: "Plus Jakarta Sans, Oswald, serif",
        radius: "8px",
        shadow: "0 4px 20px rgba(0,0,0,0.6)",
        mode: "dark"
    },
    luxury_editorial: {
        name: "Vogue Haute Couture Obsidian",
        bg: "#0d0d0d",
        surface: "#171717",
        border: "#292929",
        textMain: "#fcfbf7",
        textMuted: "#949494",
        accent: "#c5a059",
        font: "Playfair Display, Cormorant Garamond, serif",
        radius: "0px",
        shadow: "none",
        mode: "dark"
    },

    // 4. Minimalism & Cultural Aesthetics
    minimalism: {
        name: "Swiss Pure Minimalism",
        bg: "#ffffff",
        surface: "#fbfbfb",
        border: "#e5e5e5",
        textMain: "#111111",
        textMuted: "#666666",
        accent: "#000000",
        font: "Helvetica Neue, Arial, sans-serif",
        radius: "0px",
        shadow: "none",
        mode: "light"
    },
    nordic_clean: {
        name: "Nordic Serene Pine & Sage",
        bg: "#f4f6f5",
        surface: "#ffffff",
        border: "#dbe2de",
        textMain: "#1f2923",
        textMuted: "#5c6b62",
        accent: "#2d5a43",
        font: "Plus Jakarta Sans, system-ui, sans-serif",
        radius: "14px",
        shadow: "0 2px 8px rgba(31, 41, 35, 0.05)",
        mode: "light"
    },
    zen_japanese: {
        name: "Zen Washi & Sumi Ink",
        bg: "#f7f5f0",
        surface: "#ebe7df",
        border: "#d6cfc4",
        textMain: "#2b2b2b",
        textMuted: "#736f68",
        accent: "#8c3b2b",
        font: "Noto Serif JP, Georgia, serif",
        radius: "4px",
        shadow: "0 1px 3px rgba(0,0,0,0.04)",
        mode: "light"
    },

    // 5. Avant-Garde & Experimental
    neo_brutalism: {
        name: "Neo-Brutalism High Voltage",
        bg: "#fef08a",
        surface: "#ffffff",
        border: "#000000",
        textMain: "#000000",
        textMuted: "#333333",
        accent: "#ff007f",
        font: "Space Grotesk, Syne, sans-serif",
        radius: "0px",
        shadow: "4px 4px 0px #000000",
        mode: "light"
    },
    glassmorphism_dark: {
        name: "Deep Space Frosted Acrylic Glass",
        bg: "#030712",
        surface: "rgba(17, 24, 39, 0.65)",
        border: "rgba(255, 255, 255, 0.12)",
        textMain: "#f9fafb",
        textMuted: "#9ca3af",
        accent: "#818cf8",
        font: "Inter, system-ui, sans-serif",
        radius: "16px",
        shadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        backdropBlur: "blur(12px)",
        mode: "dark"
    }
};

/**
 * Generate comprehensive DESIGN.md token specification
 * @param {string|Object} themeInput Brand/theme key (e.g. 'luxury_gold') OR custom theme object
 * @param {Object|string} options Custom overrides (accent, font, bg, radius, etc.)
 */
export function generateDesignMD(themeInput = 'linear', options = {}) {
    let baseTheme = THEMES.linear;

    if (typeof themeInput === 'object' && themeInput !== null) {
        baseTheme = { ...THEMES.linear, ...themeInput };
    } else if (typeof themeInput === 'string') {
        const key = themeInput.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        baseTheme = THEMES[key] || THEMES.linear;
    }

    // Support string accent as second parameter for backward compatibility
    let customOpts = {};
    if (typeof options === 'string') {
        customOpts.accent = options;
    } else if (typeof options === 'object' && options !== null) {
        customOpts = options;
    }

    const mergedTheme = {
        ...baseTheme,
        ...customOpts
    };

    const themeName = mergedTheme.name || 'Custom Engineered Design System';
    const themeMode = (mergedTheme.mode || 'dark').toUpperCase();

    let extraTokens = '';
    if (mergedTheme.backdropBlur) {
        extraTokens += `- **Backdrop Filter:** \`${mergedTheme.backdropBlur}\`\n`;
    }
    if (mergedTheme.shadow) {
        extraTokens += `- **Elevation Shadow:** \`${mergedTheme.shadow}\`\n`;
    }

    return `# DESIGN.md — ${themeName} System Tokens

> **Auto-generated by VibeDesign-Harness Multi-Theme & Custom Engine**  
> Mode: **${themeMode}** | Foundation: **${mergedTheme.bg}** | Accent: **${mergedTheme.accent}**

---

## 1. 🎨 Color Hierarchy & Surface Architecture
- **Canvas Background:** \`${mergedTheme.bg}\` (Foundation layer, zero washed-out AI gray)
- **Component Surface:** \`${mergedTheme.surface}\` (Cards, navigation, modals, popovers)
- **Structural Border:** \`${mergedTheme.border}\` (Crisp perimeter boundary)
- **Primary Accent:** \`${mergedTheme.accent}\` (CTA buttons, active indicators, focus rings)
- **Main Heading/Text:** \`${mergedTheme.textMain}\` (Optimal contrast ratio >= 7:1)
- **Muted Subtext/Meta:** \`${mergedTheme.textMuted}\` (Secondary labels, captions)
${extraTokens}
---

## 2. ✍️ Typographic Scale & Font Stack
- **Primary Font Stack:** \`${mergedTheme.font}\`
- **Display Hero:** 48px – 64px / Line Height 1.05 / Font Weight 700 / Tracking -0.03em
- **H1 Section Title:** 32px – 40px / Line Height 1.15 / Font Weight 600 / Tracking -0.02em
- **H2 Subsection:** 20px – 24px / Line Height 1.25 / Font Weight 600
- **Body Text:** 14px – 16px / Line Height 1.55 / Font Weight 400
- **Caption / Badge:** 11px – 12px / Line Height 1.4 / Font Weight 500 / Letter Spacing +0.02em

---

## 3. 🧩 Component Guidelines & Interaction Rules
- **Border Radius:** Base \`${mergedTheme.radius || '8px'}\` | Pills \`9999px\` for status tags.
- **Button Standards:** Padding \`10px 20px\`, 1px solid border highlight, \`focus-visible:ring-2\` ring-offset-2. Never unstyled.
- **Card Standards:** 1px perimeter border \`${mergedTheme.border}\`, surface token \`${mergedTheme.surface}\`.
- **Transitions:** Micro-interactions with CSS \`transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1)\`.

---

## 4. ⚡ Tailwind CSS v4 (@theme CSS Tokens Preset)
\`\`\`css
@theme {
  --color-background: ${mergedTheme.bg};
  --color-surface: ${mergedTheme.surface};
  --color-border: ${mergedTheme.border};
  --color-primary: ${mergedTheme.accent};
  --color-foreground: ${mergedTheme.textMain};
  --color-muted: ${mergedTheme.textMuted};
  --font-sans: ${mergedTheme.font};
  --radius-base: ${mergedTheme.radius || '8px'};
}
\`\`\`

`;
}

/**
 * Register or override a custom theme dynamically at runtime
 * @param {string} key Unique theme identifier
 * @param {Object} themeSpec Theme specification object
 */
export function registerTheme(key, themeSpec) {
    if (!key || typeof themeSpec !== 'object') {
        throw new Error('registerTheme requires a valid key and theme specification object.');
    }
    THEMES[key.toLowerCase().trim()] = {
        name: themeSpec.name || key,
        bg: themeSpec.bg || '#08090a',
        surface: themeSpec.surface || '#121417',
        border: themeSpec.border || '#22252a',
        textMain: themeSpec.textMain || '#ffffff',
        textMuted: themeSpec.textMuted || '#888888',
        accent: themeSpec.accent || '#3b82f6',
        font: themeSpec.font || 'Inter, sans-serif',
        radius: themeSpec.radius || '8px',
        mode: themeSpec.mode || 'dark',
        ...themeSpec
    };
    return THEMES[key.toLowerCase().trim()];
}

export function getTheme(key) {
    const k = (key || 'linear').toLowerCase().trim();
    const t = THEMES[k] || THEMES['linear'];
    return {
        ...t,
        color_mode: t.mode || 'dark',
        fonts: {
            headline: t.font || 'sans-serif',
            body: t.font || 'sans-serif'
        }
    };
}

export function listThemes() {
    return Object.keys(THEMES).map(k => ({
        key: k,
        name: THEMES[k].name,
        mode: THEMES[k].mode,
        bg: THEMES[k].bg,
        accent: THEMES[k].accent
    }));
}

export default {
    THEMES,
    generateDesignMD,
    registerTheme,
    listThemes
};
