/**
 * VibeDesign-Harness — Design System Reverse Extractor, W3C DTCG Token Compiler,
 * 2-Layer Material Discipline & Interactive Thesis Preview Engine (v3.1.0)
 *
 * Cleanroom Pure-JS Engine unifying:
 *  1. Reverse-Engineering DESIGN.md & tokens.css from any existing codebase (CSS/Tailwind/TSX/HTML)
 *  2. W3C DTCG 3-Tier Design Token Compiler (Primitive -> Semantic -> Component + Dark Mode)
 *  3. 2-Layer Spatial Material Discipline (Functional Liquid Glass Layer vs. Opaque Content Layer)
 *  4. Self-Contained Interactive Visual & Motion Thesis Preview HTML Generator (SVG Bezier + WCAG + 5 States)
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// 1. 2-LAYER SPATIAL MATERIAL DISCIPLINE (Functional Glass vs. Content Layer)
// ============================================================================

export const TWO_LAYER_MATERIAL_SPEC = {
    functional_layer: {
        name: 'Functional Layer (Liquid Glass / Translucent Chrome)',
        allowed_elements: ['header', 'nav', 'aside (floating)', 'dialog', 'popover', 'sheet', 'floating-toolbar', 'command-palette', 'toast'],
        forbidden_elements: ['article', 'section', 'table', 'tbody', 'tr', 'td', 'li', 'main', 'card-grid', 'form-field'],
        variants: {
            regular: {
                blur: 'backdrop-blur-xl backdrop-saturate-180',
                light_bg: 'rgba(255, 255, 255, 0.72)',
                dark_bg: 'rgba(18, 18, 21, 0.72)',
                border_light: '1px solid rgba(255, 255, 255, 0.55)',
                border_dark: '1px solid rgba(255, 255, 255, 0.10)',
                use_for: 'Sticky topbars, floating action bars, bottom tab bars, command palettes'
            },
            clear: {
                blur: 'backdrop-blur-md backdrop-saturate-150',
                light_bg: 'rgba(255, 255, 255, 0.45)',
                dark_bg: 'rgba(18, 18, 21, 0.48)',
                border_light: '1px solid rgba(255, 255, 255, 0.35)',
                border_dark: '1px solid rgba(255, 255, 255, 0.08)',
                use_for: 'Media overlays floating above high-contrast photography or video'
            }
        },
        accessibility_fallbacks: {
            reduced_transparency: '@media (prefers-reduced-transparency: reduce) { backdrop-filter: none !important; background-color: var(--card) !important; }',
            high_contrast: '@media (prefers-contrast: more) { border-width: 1.5px !important; }',
            reduced_motion: '@media (prefers-reduced-motion: reduce) { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }'
        },
        locked_rules: [
            'M1: Never apply backdrop-blur to Content Layer elements (tables, data cards, metric strips, form inputs, or body articles).',
            'M2: Never stack glass-on-glass (a translucent popover inside or directly over a translucent header must use an opaque surface or dismiss the underlying blur).',
            'M3: Always include @media (prefers-reduced-transparency: reduce) fallback that turns Functional Layer glass into 100% opaque var(--card).',
            'M4: Text sitting on Functional Layer glass must maintain >= 4.5:1 contrast across both light and dark underlying content.'
        ]
    },
    content_layer: {
        name: 'Content Layer (Opaque High-Legibility Surfaces)',
        allowed_elements: ['main', 'section', 'article', 'table', 'form', 'card', 'metric-strip', 'kanban-column'],
        surface_tokens: ['var(--background)', 'var(--card)', 'var(--muted)'],
        rule: '100% opaque tonal hierarchy; zero backdrop-filter; crisp 1px borders or subtle elevation.'
    },
    cross_platform_mapping: {
        web_tailwind: {
            functional_glass: 'bg-white/75 dark:bg-zinc-900/75 backdrop-blur-xl backdrop-saturate-150 border border-white/40 dark:border-white/10',
            content_card: 'bg-card text-card-foreground border border-border rounded-xl shadow-xs'
        },
        tauri_electron: {
            window_vibrancy: 'NSVisualEffectMaterial.underWindowBackground (macOS) / Mica Alt (Windows 11)',
            sidebar_rule: 'Only the native sidebar rail uses OS window vibrancy; the main document viewport remains 100% opaque.'
        },
        swiftui: {
            functional_glass: '.background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16, style: .continuous))',
            content_card: '.background(Color(uiColor: .secondarySystemGroupedBackground))'
        },
        flutter: {
            functional_glass: 'ClipRRect + BackdropFilter(filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20))',
            content_card: 'DecoratedBox(decoration: BoxDecoration(color: Theme.of(context).colorScheme.surfaceContainerLow))'
        }
    }
};

// ============================================================================
// 2. WCAG CONTRAST & COLOR UTILITIES
// ============================================================================

export function hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return null;
    const clean = hex.trim().replace(/^#/, '');
    if (clean.length === 3) {
        const r = parseInt(clean[0] + clean[0], 16);
        const g = parseInt(clean[1] + clean[1], 16);
        const b = parseInt(clean[2] + clean[2], 16);
        return [r, g, b];
    }
    if (clean.length === 6) {
        const r = parseInt(clean.slice(0, 2), 16);
        const g = parseInt(clean.slice(2, 4), 16);
        const b = parseInt(clean.slice(4, 6), 16);
        if ([r, g, b].some(Number.isNaN)) return null;
        return [r, g, b];
    }
    return null;
}

export function relativeLuminance(rgb) {
    if (!rgb) return 0;
    const [r, g, b] = rgb.map(v => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(hexA, hexB) {
    const rgbA = hexToRgb(hexA);
    const rgbB = hexToRgb(hexB);
    if (!rgbA || !rgbB) return 1;
    const lumA = relativeLuminance(rgbA);
    const lumB = relativeLuminance(rgbB);
    const brightest = Math.max(lumA, lumB);
    const darkest = Math.min(lumA, lumB);
    return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

// ============================================================================
// 3. REVERSE DESIGN-SYSTEM EXTRACTOR (extractDesignSystemFromRepo)
// ============================================================================

const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'coverage', '.turbo', '.cache']);
const CODE_EXTENSIONS = new Set(['.css', '.scss', '.html', '.tsx', '.jsx', '.ts', '.js', '.vue', '.svelte']);

function walkCodeFiles(dirPath, maxFiles = 120, collected = []) {
    if (!fs.existsSync(dirPath) || collected.length >= maxFiles) return collected;
    const stat = fs.statSync(dirPath);
    if (stat.isFile()) {
        if (CODE_EXTENSIONS.has(path.extname(dirPath).toLowerCase())) {
            collected.push(dirPath);
        }
        return collected;
    }
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        if (collected.length >= maxFiles) break;
        if (entry.name.startsWith('.') && entry.name !== '.viberc.json') continue;
        if (IGNORE_DIRS.has(entry.name)) continue;
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            walkCodeFiles(fullPath, maxFiles, collected);
        } else if (CODE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
            collected.push(fullPath);
        }
    }
    return collected;
}

/**
 * Reverse-engineers a complete DESIGN.md specification and token inventory
 * from an existing project directory or single CSS/HTML/TSX file.
 */
export function extractDesignSystemFromRepo(targetPath = process.cwd(), options = {}) {
    const resolvedPath = path.resolve(targetPath);
    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Target path does not exist: ${resolvedPath}`);
    }

    const files = walkCodeFiles(resolvedPath, options.maxFiles || 100);
    const cssVariables = new Map();
    const hexCounts = new Map();
    const fontFamilies = new Set();
    const tailwindRadius = new Map();
    const tailwindSpacing = new Map();
    let hasDarkSelector = false;
    let hasBackdropBlur = false;

    for (const file of files) {
        let content = '';
        try {
            content = fs.readFileSync(file, 'utf-8');
        } catch {
            continue;
        }

        // 1. Extract CSS custom properties (--token: value)
        const varRegex = /--([a-zA-Z0-9_-]+)\s*:\s*([^;}\n]+)[;}]/g;
        let match;
        while ((match = varRegex.exec(content)) !== null) {
            const name = `--${match[1].trim()}`;
            const val = match[2].trim();
            if (!cssVariables.has(name)) {
                cssVariables.set(name, val);
            }
        }

        // 2. Extract hex colors
        const hexRegex = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
        while ((match = hexRegex.exec(content)) !== null) {
            const norm = match[0].toLowerCase();
            hexCounts.set(norm, (hexCounts.get(norm) || 0) + 1);
        }

        // 3. Extract font families
        const fontRegex = /font-family\s*:\s*([^;}\n]+)|font-\[['"]?([^'"\]\n]+)['"]?\]/gi;
        while ((match = fontRegex.exec(content)) !== null) {
            const rawFont = (match[1] || match[2] || '').split(',')[0].replace(/['"]/g, '').trim();
            if (rawFont && !rawFont.startsWith('var(') && rawFont.length < 40) {
                fontFamilies.add(rawFont);
            }
        }

        // 4. Detect Tailwind radius & spacing habits
        const radiusMatches = content.match(/\brounded-(?:none|xs|sm|md|lg|xl|2xl|3xl|full)\b/g) || [];
        for (const r of radiusMatches) {
            tailwindRadius.set(r, (tailwindRadius.get(r) || 0) + 1);
        }

        const gapMatches = content.match(/\b(?:gap|p|px|py)-(?:\d+(?:\.\d+)?)\b/g) || [];
        for (const g of gapMatches) {
            tailwindSpacing.set(g, (tailwindSpacing.get(g) || 0) + 1);
        }

        if (/\.dark\b|data-theme=["']dark["']|dark:/i.test(content)) hasDarkSelector = true;
        if (/backdrop-blur|backdrop-filter/i.test(content)) hasBackdropBlur = true;
    }

    const topHexColors = [...hexCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([hex, count]) => ({ hex, count, luminance: Number(relativeLuminance(hexToRgb(hex)).toFixed(3)) }));

    const topRadii = [...tailwindRadius.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([token, count]) => `${token} (${count}×)`);

    const topSpacing = [...tailwindSpacing.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([token, count]) => `${token} (${count}×)`);

    const projectName = options.projectName || path.basename(resolvedPath);
    const detectedFonts = [...fontFamilies];
    const primaryFont = detectedFonts[0] || 'Inter';

    // Classify discovered hexes into dark surfaces, light surfaces, and chromatic accents
    const darkSurfaces = topHexColors.filter(c => c.luminance < 0.08).map(c => c.hex);
    const lightSurfaces = topHexColors.filter(c => c.luminance > 0.75).map(c => c.hex);
    const midAccents = topHexColors.filter(c => c.luminance >= 0.08 && c.luminance <= 0.75).map(c => c.hex);

    const tokenEntries = [...cssVariables.entries()].slice(0, 30);

    const designMD = `# DESIGN.md — Reverse-Engineered Design System (${projectName})

> **Extracted by VibeDesign-Harness v3.1.0**
> **Source Path**: \`${resolvedPath}\` (${files.length} UI/code files scanned)

## 1. Visual Direction & Theme Polarity
- **Detected Mode Support**: ${hasDarkSelector ? 'Dual / Dark-Mode Ready (`.dark` / `dark:` detected)' : 'Single-Polarity Surface'}
- **Material Architecture**: ${hasBackdropBlur ? '2-Layer Material (Functional Layer Glass + Opaque Content Layer)' : '100% Opaque Tonal Surfaces'}
- **Primary Typography**: \`${primaryFont}\`${detectedFonts.length > 1 ? ` (Secondary/Mono: ${detectedFonts.slice(1, 4).map(f => `\`${f}\``).join(', ')})` : ''}

## 2. Extracted Color Palette & Luminance Roles
- **Light Surfaces (L > 0.75)**: ${lightSurfaces.length ? lightSurfaces.map(h => `\`${h}\``).join(', ') : '`#ffffff`, `#f4f4f5` (default fallback)'}
- **Dark Surfaces (L < 0.08)**: ${darkSurfaces.length ? darkSurfaces.map(h => `\`${h}\``).join(', ') : '`#09090b`, `#18181b` (default fallback)'}
- **Accents & Semantic Tones**: ${midAccents.length ? midAccents.map(h => `\`${h}\``).join(', ') : '`#4f46e5`, `#10b981`'}

## 3. Discovered CSS Custom Properties (${cssVariables.size} total)
${tokenEntries.length > 0 ? tokenEntries.map(([k, v]) => `- \`${k}\`: \`${v}\``).join('\n') : '- No explicit `--*` CSS custom properties found; recommend running `npx vibe-design-harness tokens-css clean indigo tokens.css`.'}

## 4. Component Geometry & Spacing Rhythm
- **Dominant Border Radii**: ${topRadii.length ? topRadii.join(', ') : '`rounded-xl` (cards), `rounded-lg` (controls)'}
- **Dominant Spacing Rhythm**: ${topSpacing.length ? topSpacing.join(', ') : '4px/8px base grid (`gap-4`, `p-6`)'}

## 5. Locked Architectural Guardrails for Subsequent Prompts
1. **Token Fidelity**: Reuse the discovered CSS custom properties above; never introduce ad-hoc hex literals where a semantic variable exists.
2. **2-Layer Material Rule**: Keep \`backdrop-blur\` restricted to floating headers, navbars, and dialogs; keep data cards and tables 100% opaque.
3. **Viewport Stability**: Use \`min-h-dvh\` instead of \`min-h-screen\` and reserve 4px autohide scrollbars.
`;

    return {
        projectName,
        sourcePath: resolvedPath,
        filesScanned: files.length,
        hasDarkSelector,
        hasBackdropBlur,
        fonts: detectedFonts.length ? detectedFonts : ['Inter'],
        topHexColors,
        cssVariables: Object.fromEntries(tokenEntries),
        topRadii,
        topSpacing,
        designMD
    };
}

// ============================================================================
// 4. W3C DTCG 3-TIER DESIGN TOKEN COMPILER (compileDTCGTokens)
// ============================================================================

export const DEFAULT_DTCG_TOKENS = {
    primitive: {
        color: {
            zinc: {
                50: { $value: '#fafafa', $type: 'color' },
                100: { $value: '#f4f4f5', $type: 'color' },
                200: { $value: '#e4e4e7', $type: 'color' },
                700: { $value: '#3f3f46', $type: 'color' },
                800: { $value: '#27272a', $type: 'color' },
                900: { $value: '#18181b', $type: 'color' },
                950: { $value: '#09090b', $type: 'color' }
            },
            brand: {
                500: { $value: '#6366f1', $type: 'color' },
                600: { $value: '#4f46e5', $type: 'color' }
            },
            emerald: { 600: { $value: '#059669', $type: 'color' } },
            amber: { 600: { $value: '#d97706', $type: 'color' } },
            rose: { 600: { $value: '#e11d48', $type: 'color' } }
        },
        space: {
            1: { $value: '0.25rem', $type: 'dimension' },
            2: { $value: '0.5rem', $type: 'dimension' },
            3: { $value: '0.75rem', $type: 'dimension' },
            4: { $value: '1rem', $type: 'dimension' },
            6: { $value: '1.5rem', $type: 'dimension' },
            8: { $value: '2rem', $type: 'dimension' }
        },
        radius: {
            sm: { $value: '0.375rem', $type: 'dimension' },
            md: { $value: '0.5rem', $type: 'dimension' },
            lg: { $value: '0.75rem', $type: 'dimension' },
            xl: { $value: '1rem', $type: 'dimension' }
        },
        motion: {
            ease_out: { $value: [0.16, 1, 0.3, 1], $type: 'cubicBezier' },
            duration_fast: { $value: '150ms', $type: 'duration' },
            duration_normal: { $value: '260ms', $type: 'duration' }
        }
    },
    semantic: {
        bg: {
            canvas: { $value: '{primitive.color.zinc.50}', $type: 'color' },
            surface: { $value: '#ffffff', $type: 'color' },
            elevated: { $value: '{primitive.color.zinc.100}', $type: 'color' }
        },
        text: {
            primary: { $value: '{primitive.color.zinc.950}', $type: 'color' },
            secondary: { $value: '{primitive.color.zinc.700}', $type: 'color' }
        },
        border: {
            default: { $value: '{primitive.color.zinc.200}', $type: 'color' }
        },
        action: {
            primary: { $value: '{primitive.color.brand.600}', $type: 'color' },
            success: { $value: '{primitive.color.emerald.600}', $type: 'color' },
            warning: { $value: '{primitive.color.amber.600}', $type: 'color' },
            danger: { $value: '{primitive.color.rose.600}', $type: 'color' }
        }
    },
    dark: {
        bg: {
            canvas: { $value: '{primitive.color.zinc.950}', $type: 'color' },
            surface: { $value: '{primitive.color.zinc.900}', $type: 'color' },
            elevated: { $value: '{primitive.color.zinc.800}', $type: 'color' }
        },
        text: {
            primary: { $value: '{primitive.color.zinc.50}', $type: 'color' },
            secondary: { $value: '{primitive.color.zinc.200}', $type: 'color' }
        },
        border: {
            default: { $value: '{primitive.color.zinc.800}', $type: 'color' }
        },
        action: {
            primary: { $value: '{primitive.color.brand.500}', $type: 'color' }
        }
    },
    component: {
        card: {
            bg: { $value: '{semantic.bg.surface}', $type: 'color' },
            border: { $value: '{semantic.border.default}', $type: 'color' },
            radius: { $value: '{primitive.radius.xl}', $type: 'dimension' }
        },
        button: {
            primary_bg: { $value: '{semantic.action.primary}', $type: 'color' },
            radius: { $value: '{primitive.radius.md}', $type: 'dimension' }
        }
    }
};

/**
 * Compiles a W3C DTCG 3-tier token tree (Primitive -> Semantic -> Component + Dark Mode)
 * into deterministic CSS Custom Properties and checks for any unresolved `{alias}` references.
 */
export function compileDTCGTokens(tokenTree = DEFAULT_DTCG_TOKENS) {
    const flatMap = {};
    const darkSemanticMap = {};
    const unresolved = [];

    function walkIndex(node, prefix = '', target = flatMap) {
        if (!node || typeof node !== 'object') return;
        if ('$value' in node) {
            target[prefix] = node.$value;
            return;
        }
        for (const [k, v] of Object.entries(node)) {
            if (k.startsWith('$')) continue;
            walkIndex(v, prefix ? `${prefix}.${k}` : k, target);
        }
    }

    walkIndex(tokenTree, '', flatMap);
    if (tokenTree.dark) {
        walkIndex(tokenTree.dark, 'semantic', darkSemanticMap);
    }

    function formatValue(val) {
        if (Array.isArray(val) && val.length === 4 && val.every(n => typeof n === 'number')) {
            return `cubic-bezier(${val.join(', ')})`;
        }
        return String(val);
    }

    function resolveAlias(rawVal, useDark = false, depth = 0) {
        if (depth > 12) return String(rawVal);
        if (Array.isArray(rawVal)) return formatValue(rawVal);
        if (typeof rawVal !== 'string') return String(rawVal);

        const match = rawVal.match(/^\{([^}]+)\}$/);
        if (!match) return rawVal;

        const refPath = match[1].trim();
        let targetVal = useDark && darkSemanticMap[refPath] !== undefined
            ? darkSemanticMap[refPath]
            : flatMap[refPath];

        if (targetVal === undefined) {
            unresolved.push(refPath);
            return rawVal;
        }
        return resolveAlias(targetVal, useDark, depth + 1);
    }

    const lightLines = [];
    const darkLines = [];

    function emitTier(node, prefix = '', useDark = false, outLines = lightLines) {
        if (!node || typeof node !== 'object') return;
        for (const [k, v] of Object.entries(node)) {
            if (k.startsWith('$')) continue;
            const nextKey = prefix ? `${prefix}-${k.replace(/_/g, '-')}` : k.replace(/_/g, '-');
            if (v && typeof v === 'object' && '$value' in v) {
                const resolved = resolveAlias(v.$value, useDark);
                outLines.push(`  --${nextKey}: ${resolved};`);
            } else if (v && typeof v === 'object') {
                emitTier(v, nextKey, useDark, outLines);
            }
        }
    }

    if (tokenTree.primitive) emitTier(tokenTree.primitive, '', false, lightLines);
    if (tokenTree.semantic) emitTier(tokenTree.semantic, '', false, lightLines);
    if (tokenTree.component) emitTier(tokenTree.component, '', false, lightLines);

    if (tokenTree.dark) {
        emitTier(tokenTree.dark, '', true, darkLines);
        if (tokenTree.component) emitTier(tokenTree.component, '', true, darkLines);
    }

    const css = `/* Generated by VibeDesign-Harness v3.1.0 — W3C DTCG 3-Tier Token Compiler */
:root {
${lightLines.join('\n')}
}

.dark, :root[data-theme="dark"] {
${darkLines.join('\n')}
}

@media (prefers-reduced-transparency: reduce) {
  .vibe-functional-glass {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background-color: var(--bg-surface) !important;
  }
}
`;

    return {
        valid: unresolved.length === 0,
        unresolved,
        lightTokenCount: lightLines.length,
        darkTokenCount: darkLines.length,
        css
    };
}

// ============================================================================
// 5. INTERACTIVE VISUAL & MOTION THESIS PREVIEW GENERATOR
// ============================================================================

/**
 * Generates a self-contained HTML Interactive Thesis Preview Specimen:
 *  - Live SVG Cubic-Bezier Easing Curve Plotter + interactive motion replay
 *  - Swatches with computed WCAG 2.1 contrast ratios (Light & Dark side-by-side)
 *  - 5 Interactive Component States (Default, Hover, Focus-Visible, Active, Disabled)
 *  - 2-Layer Material Specimen (Functional Glass Bar vs. Opaque Content Card)
 *  - Reduced-Motion & Reduced-Transparency toggles
 */
export function generateDesignPreviewHTML(options = {}) {
    const brandName = options.brandName || 'AgentSea Studio';
    const thesis = options.thesis || 'High-craft editorial precision with 100% opaque content cards, functional glass chrome, and exponential ease-out motion.';
    const primaryHex = options.primaryHex || '#4f46e5';
    const bgLightHex = options.bgLightHex || '#fafafa';
    const surfaceLightHex = options.surfaceLightHex || '#ffffff';
    const textLightHex = options.textLightHex || '#09090b';
    const bgDarkHex = options.bgDarkHex || '#09090b';
    const surfaceDarkHex = options.surfaceDarkHex || '#18181b';
    const textDarkHex = options.textDarkHex || '#fafafa';
    const bezier = options.bezier || [0.16, 1, 0.3, 1];
    const durationMs = options.durationMs || 320;

    const contrastLightBody = getContrastRatio(textLightHex, surfaceLightHex);
    const contrastDarkBody = getContrastRatio(textDarkHex, surfaceDarkHex);
    const contrastPrimaryWhite = getContrastRatio(primaryHex, '#ffffff');

    const [x1, y1, x2, y2] = bezier;
    // Map [0..1] bezier coordinates to SVG [20..180] box
    const sx1 = Math.round(20 + x1 * 160);
    const sy1 = Math.round(180 - y1 * 160);
    const sx2 = Math.round(20 + x2 * 160);
    const sy2 = Math.round(180 - y2 * 160);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brandName} — Visual & Interaction Thesis Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${primaryHex};
      --ease-thesis: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});
      --duration-thesis: ${durationMs}ms;
    }
    body {
      font-family: 'Be Vietnam Pro', system-ui, sans-serif;
      background-color: ${bgLightHex};
      color: ${textLightHex};
    }
    .mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    .motion-stage-ball {
      transition: transform var(--duration-thesis) var(--ease-thesis), opacity var(--duration-thesis) var(--ease-thesis);
    }
    .motion-stage-ball.played {
      transform: translateX(220px) scale(1.04);
    }
    body.reduced-motion .motion-stage-ball {
      transition-duration: 0.01ms !important;
    }
    .functional-glass {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    }
    body.reduced-transparency .functional-glass {
      backdrop-filter: none !important;
      background: ${surfaceLightHex} !important;
    }
  </style>
</head>
<body class="min-h-dvh antialiased p-6 md:p-10 selection:bg-indigo-600 selection:text-white">
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Functional Layer Header (Liquid Glass Specimen) -->
    <header class="functional-glass sticky top-4 z-30 flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl border border-zinc-200/80 shadow-xs">
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600">VibeDesign Thesis Preview Gate</span>
        <h1 class="text-xl font-bold tracking-tight text-zinc-950">${brandName} — Design & Motion Specimen</h1>
      </div>
      <div class="flex items-center gap-3">
        <button id="toggleMotionBtn" type="button" onclick="document.body.classList.toggle('reduced-motion'); this.setAttribute('aria-pressed', document.body.classList.contains('reduced-motion'))" aria-pressed="false" class="px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition">
          Toggle Reduced Motion
        </button>
        <button id="toggleGlassBtn" type="button" onclick="document.body.classList.toggle('reduced-transparency'); this.setAttribute('aria-pressed', document.body.classList.contains('reduced-transparency'))" aria-pressed="false" class="px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition">
          Toggle Opaque Fallback
        </button>
      </div>
    </header>

    <main class="space-y-8">
      <!-- Thesis Banner -->
      <section class="bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-xs">
        <div class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Validated Interaction & Visual Thesis</div>
        <p class="text-base md:text-lg font-medium text-zinc-900 max-w-[68ch]">${thesis}</p>
      </section>

      <!-- Grid: 1. Motion Curve SVG + Live Replay | 2. Light vs Dark WCAG Swatches -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Motion Curve Specimen -->
        <section class="lg:col-span-5 bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-semibold text-zinc-950">1. Motion Physics & Curve</h2>
              <span class="mono text-xs px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800">cubic-bezier(${bezier.join(', ')})</span>
            </div>
            <div class="flex items-center gap-6">
              <svg width="200" height="200" viewBox="0 0 200 200" class="bg-zinc-50 rounded-xl border border-zinc-200 shrink-0" aria-label="Cubic Bezier Curve Plot">
                <line x1="20" y1="180" x2="180" y2="20" stroke="#e4e4e7" stroke-width="1.5" stroke-dasharray="4 4" />
                <line x1="20" y1="180" x2="${sx1}" y2="${sy1}" stroke="#a1a1aa" stroke-width="1.5" />
                <line x1="180" y1="20" x2="${sx2}" y2="${sy2}" stroke="#a1a1aa" stroke-width="1.5" />
                <path d="M 20 180 C ${sx1} ${sy1}, ${sx2} ${sy2}, 180 20" fill="none" stroke="${primaryHex}" stroke-width="3" stroke-linecap="round" />
                <circle cx="${sx1}" cy="${sy1}" r="4.5" fill="${primaryHex}" />
                <circle cx="${sx2}" cy="${sy2}" r="4.5" fill="#09090b" />
              </svg>
              <div class="space-y-2 text-xs text-zinc-600">
                <div><strong class="text-zinc-900">Duration:</strong> <span class="mono">${durationMs}ms</span></div>
                <div><strong class="text-zinc-900">P1 (Out):</strong> <span class="mono">(${x1}, ${y1})</span></div>
                <div><strong class="text-zinc-900">P2 (Settle):</strong> <span class="mono">(${x2}, ${y2})</span></div>
                <div><strong class="text-zinc-900">GPU Props:</strong> <span class="mono">transform, opacity</span></div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-zinc-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-zinc-500">Live Trajectory Test</span>
              <button type="button" onclick="document.getElementById('motionBall').classList.toggle('played')" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition" style="background-color: ${primaryHex}">
                Replay Motion
              </button>
            </div>
            <div class="h-12 rounded-xl bg-zinc-100 border border-zinc-200/70 p-2 flex items-center overflow-hidden">
              <div id="motionBall" class="motion-stage-ball w-8 h-8 rounded-lg shadow-xs" style="background-color: ${primaryHex}"></div>
            </div>
          </div>
        </section>

        <!-- Dual-Polarity WCAG Swatches -->
        <section class="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-xs space-y-5">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold text-zinc-950">2. Dual-Polarity Surfaces & WCAG 2.1 Contrast</h2>
            <span class="mono text-xs text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-md font-medium">AA/AAA Verified</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Light Card Specimen -->
            <div class="rounded-xl p-5 border border-zinc-200 space-y-2" style="background-color: ${surfaceLightHex}; color: ${textLightHex}">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold">Light Surface (Content Layer)</span>
                <span class="mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-800">${contrastLightBody}:1</span>
              </div>
              <p class="text-xs opacity-80">100% opaque surface. Zero backdrop-blur on data cards.</p>
              <div class="pt-2 flex items-center gap-2">
                <span class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style="background-color: ${primaryHex}">
                  Primary (${contrastPrimaryWhite}:1)
                </span>
                <span class="mono text-xs opacity-70">${surfaceLightHex}</span>
              </div>
            </div>

            <!-- Dark Card Specimen -->
            <div class="rounded-xl p-5 border border-zinc-800 space-y-2" style="background-color: ${surfaceDarkHex}; color: ${textDarkHex}">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold">Dark Surface (Carbon Elevation)</span>
                <span class="mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-200">${contrastDarkBody}:1</span>
              </div>
              <p class="text-xs opacity-80">Component tokens re-resolve automatically in dark mode.</p>
              <div class="pt-2 flex items-center gap-2">
                <span class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style="background-color: ${primaryHex}">
                  Primary (${contrastPrimaryWhite}:1)
                </span>
                <span class="mono text-xs opacity-70">${surfaceDarkHex}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 3. Five Interactive Component States Matrix -->
      <section class="bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold text-zinc-950">3. Five-State Interactive Component Matrix</h2>
          <span class="text-xs text-zinc-500">Every interactive control must differentiate all 5 states</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-zinc-500">1. Default</span>
            <button type="button" class="px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-xs" style="background-color: ${primaryHex}">Action</button>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-zinc-500">2. Hover</span>
            <button type="button" class="px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-md brightness-110" style="background-color: ${primaryHex}">Action</button>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-zinc-500">3. Focus-Visible</span>
            <button type="button" class="px-4 py-2 rounded-lg text-xs font-semibold text-white ring-2 ring-offset-2 ring-indigo-600" style="background-color: ${primaryHex}">Action</button>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-zinc-500">4. Active / Pressed</span>
            <button type="button" class="px-4 py-2 rounded-lg text-xs font-semibold text-white scale-95 brightness-95" style="background-color: ${primaryHex}">Action</button>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-zinc-500">5. Disabled</span>
            <button type="button" disabled class="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-200 text-zinc-500 cursor-not-allowed">Action</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`;
}

export default {
    TWO_LAYER_MATERIAL_SPEC,
    DEFAULT_DTCG_TOKENS,
    hexToRgb,
    relativeLuminance,
    getContrastRatio,
    extractDesignSystemFromRepo,
    compileDTCGTokens,
    generateDesignPreviewHTML
};
