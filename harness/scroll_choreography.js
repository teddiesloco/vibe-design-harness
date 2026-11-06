/**
 * VibeDesign-Harness: Scroll Choreography & Scrollytelling Engine (v3.0.0)
 * Cleanroom Whitelabel Architecture — Zero-Dependency 60fps Scrollytelling,
 * 5 Scroll Grammars, 16 Choreography Devices, 8 Visual Worlds, Worldflight Mode,
 * and 6-Dimension Uniqueness Fingerprint Gate.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCROLL_REF_DIR = path.resolve(__dirname, '../references/scroll-choreography');

/**
 * 5 Distinct Scroll Grammars (Breaking the Default 6-Act Monoculture)
 */
export const SCROLL_GRAMMARS = {
    filmic_six_act: {
        id: 'filmic_six_act',
        name: 'Filmic Six-Act (Default Narrative Arc)',
        acts: ['recognition (scrub)', 'tension (pin)', 'turn (flow + reveal)', 'substance (scrub)', 'range (pan)', 'commitment (pin + spotlight)'],
        vhBudget: [10, 14],
        bestFor: ['Product launches', 'Hardware / physical goods', 'Flagship brand stories', 'Cinematic software reveals'],
        devicesAllowed: ['scrub', 'pin', 'flow', 'pan', 'reveal', 'kinetic', 'tilt', 'magnet', 'spotlight', 'drift'],
        devicesBanned: [],
        chromeStyle: 'Floating quiet header bar (mark + single CTA label), footer docked inside closing stage',
        rules: [
            'At least 4 distinct device families across the page',
            'Never repeat the same device family twice in a row',
            'Maximum 2 scrub acts across the entire page',
            'Closing act is the last element on the page (span <= 1.2vh) with footer docked inside'
        ]
    },
    worldflight: {
        id: 'worldflight',
        name: 'Continuous Camera Worldflight (One-Shot Spatial Journey)',
        acts: ['leg-0 (arrival)', 'leg-1 (passage)', 'leg-2 (interior)', 'leg-3 (destination + dock)'],
        vhBudget: [5, 9],
        bestFor: ['Architecture & real estate', 'Luxury hospitality & resorts', 'Automotive & aviation', 'Spatial / 3D experiences'],
        devicesAllowed: ['worldflight', 'segment', 'seam-dissolve', 'copy-window', 'waypoint'],
        devicesBanned: ['flow', 'pan', 'reveal', 'tilt', 'parallax'],
        chromeStyle: 'Persistent HUD / Waypoint indicator + minimal top mark, zero document-flow sections',
        rules: [
            'One fixed viewport stage ([data-sc-world]) and one spacer in document flow',
            'Every leg frame chains into the next (last frame of leg N = first frame of leg N+1)',
            'Outgoing leg holds opacity 1.0 until incoming leg reaches 1.0 across the seam band',
            'Copy translates at most 4vh and never overlaps across adjacent windows'
        ]
    },
    editorial_dossier: {
        id: 'editorial_dossier',
        name: 'Editorial Monograph & Sticky Plate Dossier',
        acts: ['folio-cover (flow)', 'thesis-plate (pin + split)', 'evidence-ledger (flow + count)', 'specimen-pan (pan)', 'colophon-close (flow)'],
        vhBudget: [7, 11],
        bestFor: ['Research labs', 'Advisory & consulting firms', 'Financial reports', 'Long-form essays & manifestos'],
        devicesAllowed: ['flow', 'pin', 'reveal', 'count', 'pan', 'drift'],
        devicesBanned: ['spotlight', 'tilt'],
        chromeStyle: 'Folio running header with section numeral + issue metadata, ruled hairlines',
        rules: [
            'Typography and real figures lead; reading column capped at 60-68ch',
            'Sticky plates hold diagrams or specimen plates while text columns scroll past',
            'Zero decorative glow or cursor spotlights; precision hairlines carry the grid'
        ]
    },
    kinetic_cutlist: {
        id: 'kinetic_cutlist',
        name: 'High-Velocity Kinetic Cutlist (Hard-Cut Pulse)',
        acts: ['hook-cut', 'beat-01', 'beat-02', 'beat-03', 'beat-04', 'beat-05', 'beat-06', 'abrupt-cta'],
        vhBudget: [8, 13],
        bestFor: ['Streetwear & drops', 'Music & live events', 'Energy & sports brands', 'Youth consumer apps'],
        devicesAllowed: ['flow', 'in', 'reveal', 'count', 'drift', 'kinetic'],
        devicesBanned: ['pin', 'spotlight', 'magnet', 'dwell', 'parallax'],
        chromeStyle: 'Loud full-width high-contrast bar ( holds persistent peak choreography in fixed chrome)',
        rules: [
            '12 to 20 short hard-cut sections, each under 1.4vh',
            'No pinning, no dwell > 0.1, no slow crossfades',
            'Front-loaded cue windows so every section is legible in the first third of its span',
            'Peak choreography lives in the persistent fixed chrome layer while acts cut underneath'
        ]
    },
    specimen_workbench: {
        id: 'specimen_workbench',
        name: 'Interactive Specimen Workbench & Live Proof',
        acts: ['live-stage-hero (pin)', 'parameter-matrix (flow)', 'horizontal-bench (pan)', 'telemetry-proof (pin + count)', 'direct-commit (flow)'],
        vhBudget: [8, 12],
        bestFor: ['Developer tools & AI infrastructure', 'Design systems', 'Audio / synth / creative tools', 'B2B SaaS platforms'],
        devicesAllowed: ['pin', 'flow', 'pan', 'count', 'kinetic', 'magnet', 'reveal'],
        devicesBanned: [],
        chromeStyle: 'Technical utility bar with live status readout + keyboard shortcut hint + primary CTA',
        rules: [
            'Hero leads with an interactive control or live specimen on the first viewport',
            'Every interactive state updates a persistent receipt, code preview, or visual specimen',
            'Tabular numerals mandatory on all counters, metrics, and benchmarks'
        ]
    }
};

/**
 * 16 Choreography Devices supported by vibe-scroll.js + vibe-scroll.css
 */
export const CHOREOGRAPHY_DEVICES = {
    scrub: {
        id: 'scrub',
        category: 'act',
        attr: 'data-sc-act="scrub" data-sc-span="2.6" data-sc-dwell="0.34"',
        description: 'Pinned viewport stage with lerped video playhead scrubbing and middle dwell plateau for reading copy.'
    },
    pin: {
        id: 'pin',
        category: 'act',
        attr: 'data-sc-act="pin" data-sc-span="3.0"',
        description: 'Sticky viewport stage where overlapping cue windows sequence arguments or layered visual planes.'
    },
    pan: {
        id: 'pan',
        category: 'act',
        attr: 'data-sc-act="pan" data-sc-span="3.2" + data-sc-pan="0.06"',
        description: 'Vertical scroll converted into horizontal rail travel with optional end-slack.'
    },
    flow: {
        id: 'flow',
        category: 'act',
        attr: 'data-sc-act="flow"',
        description: 'Natural document scroll act that rests the reader between pinned stages.'
    },
    worldflight: {
        id: 'worldflight',
        category: 'mode',
        attr: 'data-sc-mode="worldflight" data-sc-seam="0.12"',
        description: 'Full-viewport continuous camera rig chaining multiple video legs across seamless dissolve bands.'
    },
    cue: {
        id: 'cue',
        category: 'choreography',
        attr: 'data-sc-cue="0.12 0.78" (or 3rd arg 0 for greet)',
        description: 'Scroll-windowed opacity & subtle rise (enters, holds at 1.0, exits cleanly).'
    },
    kinetic: {
        id: 'kinetic',
        category: 'typography',
        attr: 'data-sc-kinetic="lines|words|chars"',
        description: 'Splits display headings into measured line/word/character masks driven by scroll or intersection.'
    },
    reveal: {
        id: 'reveal',
        category: 'media',
        attr: 'data-sc-reveal="up|left|right|iris|inset" data-sc-reveal-at="0.15 0.65"',
        description: 'Scroll-linked clip-path wipe unveiling figures or architectural plates without layout shift.'
    },
    parallax: {
        id: 'parallax',
        category: 'depth',
        attr: 'data-sc-parallax="0.18"',
        description: 'Subtle vertical counter-translation driven by viewport progress.'
    },
    scale: {
        id: 'scale',
        category: 'depth',
        attr: 'data-sc-scale="0.92 1.04"',
        description: 'Smooth scale interpolation across an act or viewport passage.'
    },
    drift: {
        id: 'drift',
        category: 'atmosphere',
        attr: 'data-sc-drift="#0e1015"',
        description: 'Interpolates document canvas background color smoothly as acts cross the viewport center.'
    },
    in: {
        id: 'in',
        category: 'choreography',
        attr: 'data-sc-in data-sc-stagger="70"',
        description: 'One-shot IntersectionObserver entrance with automatic child stagger.'
    },
    count: {
        id: 'count',
        category: 'typography',
        attr: 'data-sc-count="99.4" data-sc-suffix="%" data-sc-decimals="1"',
        description: 'Tabular-numeral counter triggered on scroll arrival (strictly for real verified figures).'
    },
    tilt: {
        id: 'tilt',
        category: 'pointer',
        attr: 'data-sc-tilt="6"',
        description: 'Spring-damped 3D perspective card tilt tracking pointer coordinates.'
    },
    magnet: {
        id: 'magnet',
        category: 'pointer',
        attr: 'data-sc-magnet="0.26" data-sc-rise="0"',
        description: 'Magnetic pull on primary CTAs toward cursor within proximity threshold.'
    },
    spotlight: {
        id: 'spotlight',
        category: 'pointer',
        attr: 'data-sc-spotlight',
        description: 'Radial cursor-following accent illumination across a closing stage or dark card surface.'
    }
};

/**
 * 8 Photographic & Technical Art Direction Worlds
 */
export const VISUAL_WORLDS = {
    low_key_cinematic: {
        id: 'low_key_cinematic',
        name: 'Low-Key Cinematic (Default Dark)',
        mode: 'dark',
        tokens: {
            canvas: '#08090b',
            surface: '#101217',
            ink: '#f4f2ef',
            inkSoft: '#9a9ba1',
            accent: '#d8ff3e',
            accentInk: '#08090b',
            fontDisplay: '"Syne", "Plus Jakarta Sans", system-ui, sans-serif',
            fontText: '"Plus Jakarta Sans", system-ui, sans-serif'
        },
        bestFor: ['AI products', 'Hardware', 'Luxury goods', 'Spirits & coffee', 'Developer tools']
    },
    high_key_editorial: {
        id: 'high_key_editorial',
        name: 'High-Key Editorial (Bone Cyclorama)',
        mode: 'light',
        tokens: {
            canvas: '#f7f5f0',
            surface: '#efeae1',
            ink: '#141413',
            inkSoft: '#5c5a55',
            accent: '#1d4ed8',
            accentInk: '#ffffff',
            fontDisplay: '"Instrument Serif", Georgia, serif',
            fontText: '"Plus Jakarta Sans", system-ui, sans-serif'
        },
        bestFor: ['Skincare & wellness', 'Fintech', 'Editorial publications', 'Architecture studios']
    },
    natural_documentary: {
        id: 'natural_documentary',
        name: 'Natural Documentary (Warm Human Grain)',
        mode: 'dark',
        tokens: {
            canvas: '#0f0e0c',
            surface: '#191714',
            ink: '#f2ece1',
            inkSoft: '#a69f91',
            accent: '#e06d3b',
            accentInk: '#0f0e0c',
            fontDisplay: '"Fraunces", Georgia, serif',
            fontText: '"DM Sans", system-ui, sans-serif'
        },
        bestFor: ['Craft & hospitality', 'Culinary', 'Community platforms', 'Human-centric services']
    },
    hard_light_graphic: {
        id: 'hard_light_graphic',
        name: 'Hard-Light Graphic (High-Contrast Studio)',
        mode: 'dark',
        tokens: {
            canvas: '#060606',
            surface: '#121212',
            ink: '#ffffff',
            inkSoft: '#a1a1aa',
            accent: '#ff3b1d',
            accentInk: '#ffffff',
            fontDisplay: '"Space Grotesk", system-ui, sans-serif',
            fontText: '"Inter", system-ui, sans-serif'
        },
        bestFor: ['Streetwear', 'Sports & energy', 'Music festivals', 'Bold consumer launches']
    },
    macro_texture: {
        id: 'macro_texture',
        name: 'Macro Texture (Tactile Materiality)',
        mode: 'dark',
        tokens: {
            canvas: '#090807',
            surface: '#141210',
            ink: '#f5f0e6',
            inkSoft: '#9c9488',
            accent: '#f59e0b',
            accentInk: '#090807',
            fontDisplay: '"Playfair Display", Georgia, serif',
            fontText: '"Plus Jakarta Sans", system-ui, sans-serif'
        },
        bestFor: ['Watchmaking', 'Materials science', 'Bespoke furniture', 'Artisanal gastronomy']
    },
    architectural_spatial: {
        id: 'architectural_spatial',
        name: 'Architectural Spatial (Cool Linear Geometry)',
        mode: 'dark',
        tokens: {
            canvas: '#0a0d12',
            surface: '#11161f',
            ink: '#edf2f7',
            inkSoft: '#8a99ad',
            accent: '#38bdf8',
            accentInk: '#0a0d12',
            fontDisplay: '"Outfit", system-ui, sans-serif',
            fontText: '"Inter", system-ui, sans-serif'
        },
        bestFor: ['Real estate & urbanism', 'Cloud infrastructure', 'Enterprise B2B', 'Robotics']
    },
    nocturne_neon: {
        id: 'nocturne_neon',
        name: 'Nocturne Practical (Wet Asphalt & Sodium)',
        mode: 'dark',
        tokens: {
            canvas: '#05070c',
            surface: '#0c101a',
            ink: '#eef2ff',
            inkSoft: '#7e8bb6',
            accent: '#22d3ee',
            accentInk: '#05070c',
            fontDisplay: '"Syne", system-ui, sans-serif',
            fontText: '"JetBrains Mono", monospace'
        },
        bestFor: ['Cybersecurity', 'Automotive', 'Gaming & esports', 'Nightlife & audio']
    },
    technical_drawing: {
        id: 'technical_drawing',
        name: 'Technical Patent Drawing (Monochrome Blueprint)',
        mode: 'light',
        tokens: {
            canvas: '#f4f1ea',
            surface: '#eae5da',
            ink: '#18181b',
            inkSoft: '#52525b',
            accent: '#0f766e',
            accentInk: '#ffffff',
            fontDisplay: '"Space Grotesk", system-ui, sans-serif',
            fontText: '"JetBrains Mono", monospace'
        },
        bestFor: ['Deep tech & aerospace', 'Hardware schematics', 'Protocol documentation', 'Engineering labs']
    }
};

/**
 * Recommend a complete Scroll Choreography Blueprint based on brief/industry
 */
export function recommendScrollChoreography({
    brief = '',
    grammar = null,
    world = null
} = {}) {
    const q = String(brief).toLowerCase();

    let selectedGrammarKey = grammar && SCROLL_GRAMMARS[grammar] ? grammar : null;
    if (!selectedGrammarKey) {
        if (/worldflight|one-shot|continuous|spatial|architecture|resort|real estate|flythrough/.test(q)) {
            selectedGrammarKey = 'worldflight';
        } else if (/editorial|dossier|research|report|essay|manifesto|advisory|consulting|finance/.test(q)) {
            selectedGrammarKey = 'editorial_dossier';
        } else if (/cutlist|fast|streetwear|sport|energy|music|event|drop|pulse/.test(q)) {
            selectedGrammarKey = 'kinetic_cutlist';
        } else if (/workbench|saas|developer|api|tool|platform|ai|benchmark|code/.test(q)) {
            selectedGrammarKey = 'specimen_workbench';
        } else {
            selectedGrammarKey = 'filmic_six_act';
        }
    }

    let selectedWorldKey = world && VISUAL_WORLDS[world] ? world : null;
    if (!selectedWorldKey) {
        if (/light|editorial|clean|skincare|wellness|calm|paper/.test(q)) {
            selectedWorldKey = 'high_key_editorial';
        } else if (/patent|schematic|blueprint|engineering|diagram|hardware/.test(q)) {
            selectedWorldKey = 'technical_drawing';
        } else if (/cyber|security|night|gaming|neon|automotive/.test(q)) {
            selectedWorldKey = 'nocturne_neon';
        } else if (/streetwear|sport|loud|graphic|festival/.test(q)) {
            selectedWorldKey = 'hard_light_graphic';
        } else if (/architecture|spatial|cloud|enterprise|robotics/.test(q)) {
            selectedWorldKey = 'architectural_spatial';
        } else if (/craft|human|documentary|food|hospitality/.test(q)) {
            selectedWorldKey = 'natural_documentary';
        } else {
            selectedWorldKey = 'low_key_cinematic';
        }
    }

    const grammarSpec = SCROLL_GRAMMARS[selectedGrammarKey];
    const worldSpec = VISUAL_WORLDS[selectedWorldKey];

    return {
        grammar: grammarSpec,
        world: worldSpec,
        devicesCatalog: Object.values(CHOREOGRAPHY_DEVICES),
        signatureMoveIdeas: [
            'Scroll-as-playhead over a persistent bottom trace rail stamping act waypoints',
            'Self-drawing SVG technical schematic driven by --sc-p stroke-dashoffset',
            'Running telemetry ledger accumulating verified claims as the visitor scrolls',
            'Single environmental control (time-of-day / load / frequency) that regrades the entire page'
        ],
        hardBudgets: {
            maxTotalViewportHeights: grammarSpec.vhBudget[1],
            minTotalViewportHeights: grammarSpec.vhBudget[0],
            maxScrubActs: 2,
            minDistinctDeviceFamilies: 4,
            closingActMaxSpanVh: 1.2,
            gpuSafePropertiesOnly: ['transform', 'opacity', 'clip-path', 'filter']
        }
    };
}

/**
 * Validate a candidate build's 6 dimensions against prior builds (Uniqueness Fingerprint Gate).
 * Must differ from EVERY existing row on at least 4 of the 6 dimensions.
 */
export function verifyScrollFingerprint(candidate = {}, existingRows = []) {
    const dimensions = ['grammar', 'navTreatment', 'heroDevice', 'actSequence', 'closePattern', 'signatureMove'];
    const conflicts = [];

    for (let i = 0; i < existingRows.length; i++) {
        const row = existingRows[i];
        const shared = [];
        const differed = [];

        for (const dim of dimensions) {
            const a = String(candidate[dim] || '').trim().toLowerCase();
            const b = String(row[dim] || '').trim().toLowerCase();
            if (a && b && a === b) {
                shared.push(dim);
            } else {
                differed.push(dim);
            }
        }

        if (differed.length < 4) {
            conflicts.push({
                rowIndex: i,
                projectName: row.project || `Build #${i + 1}`,
                differedCount: differed.length,
                requiredMinimum: 4,
                sharedDimensions: shared
            });
        }
    }

    return {
        passed: conflicts.length === 0,
        candidate,
        checkedAgainst: existingRows.length,
        conflicts
    };
}

/**
 * Retrieve any cleanroom Scroll Choreography reference doc or runtime asset
 */
export function getScrollChoreographyReference(topic = 'list') {
    if (!fs.existsSync(SCROLL_REF_DIR)) {
        return { found: false, error: 'Scroll choreography reference directory not found' };
    }

    const allFiles = [];
    function walk(dir, prefix = '') {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
            if (entry.isDirectory()) {
                walk(path.join(dir, entry.name), rel);
            } else {
                allFiles.push({
                    key: rel.replace(/\.(md|css|js|html)$/, ''),
                    file: rel,
                    absPath: path.join(dir, entry.name)
                });
            }
        }
    }
    walk(SCROLL_REF_DIR);

    if (!topic || topic === 'list' || topic === 'index') {
        return {
            found: true,
            count: allFiles.length,
            availableReferences: allFiles.map(f => ({ key: f.key, file: f.file }))
        };
    }

    const rawQ = String(topic).toLowerCase().trim();
    const q = rawQ.replace(/\.(md|css|js|html)$/, '');
    const match =
        allFiles.find(f => f.file.toLowerCase() === rawQ) ||
        allFiles.find(f => f.file.toLowerCase().endsWith(`/${rawQ}`)) ||
        allFiles.find(f => f.key.toLowerCase() === q) ||
        allFiles.find(f => f.key.toLowerCase().endsWith(`/${q}`)) ||
        allFiles.find(f => f.key.toLowerCase().includes(q));

    if (!match) {
        return {
            found: false,
            query: topic,
            availableReferences: allFiles.map(f => f.key)
        };
    }

    return {
        found: true,
        key: match.key,
        file: match.file,
        content: fs.readFileSync(match.absPath, 'utf8')
    };
}

/**
 * Scaffold a complete, production-ready Scrollytelling Page (HTML + inline or linked vibe-scroll runtime)
 */
export function scaffoldScrollStoryPage({
    brandName = 'AETHER',
    headline = 'Precision engineered for the next frontier.',
    subheadline = 'Scroll-linked choreography, tactile surfaces, and zero-jank 60fps motion.',
    ctaLabel = 'Request Early Access',
    grammar = 'filmic_six_act',
    world = 'low_key_cinematic',
    inlineRuntime = false
} = {}) {
    const blueprint = recommendScrollChoreography({ grammar, world });
    const w = blueprint.world.tokens;

    const cssEngine = getScrollChoreographyReference('engine/vibe-scroll.css');
    const jsEngine = getScrollChoreographyReference('engine/vibe-scroll.js');

    const styleBlock = inlineRuntime && cssEngine.found
        ? `<style>\n${cssEngine.content}\n</style>`
        : `<link rel="stylesheet" href="vibe-scroll.css">`;

    const scriptBlock = inlineRuntime && jsEngine.found
        ? `<script>\n${jsEngine.content}\n</script>`
        : `<script src="vibe-scroll.js"></script>`;

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${brandName} — ${headline}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  ${styleBlock}
  <style>
    :root {
      --sc-canvas: ${w.canvas};
      --sc-surface: ${w.surface};
      --sc-ink: ${w.ink};
      --sc-ink-soft: ${w.inkSoft};
      --sc-accent: ${w.accent};
      --sc-accent-ink: ${w.accentInk};
      --sc-font-display: ${w.fontDisplay};
      --sc-font-text: ${w.fontText};
    }
    .site-bar {
      position: fixed;
      inset: 0 0 auto 0;
      z-index: 40;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem clamp(1.5rem, 4vw, 3.5rem);
      backdrop-filter: blur(12px);
      background: color-mix(in oklch, var(--sc-canvas) 78%, transparent);
      border-bottom: 1px solid color-mix(in oklch, var(--sc-ink) 10%, transparent);
    }
    .site-mark {
      font-family: var(--sc-font-display);
      font-weight: 700;
      letter-spacing: -0.02em;
      font-size: 1.05rem;
      color: var(--sc-ink);
      text-decoration: none;
    }
    .site-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1.15rem;
      border-radius: 9999px;
      background: var(--sc-accent);
      color: var(--sc-accent-ink);
      font-weight: 600;
      font-size: 0.875rem;
      text-decoration: none;
      transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
    }
    .site-cta:focus-visible {
      outline: 2px solid var(--sc-accent);
      outline-offset: 3px;
    }
    .split-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
      gap: clamp(2rem, 5vw, 4.5rem);
      align-items: center;
    }
    .rail {
      display: flex;
      align-items: stretch;
      gap: 2rem;
      padding: 0 clamp(1.5rem, 5vw, 4rem);
    }
    .rail-card {
      flex: 0 0 min(82vw, 26rem);
      padding: 2rem;
      border-radius: 1rem;
      background: var(--sc-surface);
      border: 1px solid color-mix(in oklch, var(--sc-ink) 10%, transparent);
    }
    .close-stage {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem) 2rem;
    }
    .site-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1.5rem;
      border-top: 1px solid color-mix(in oklch, var(--sc-ink) 12%, transparent);
      font-size: 0.825rem;
      color: var(--sc-ink-soft);
    }
  </style>
</head>
<body>
  <span data-sc-progress></span>
  <div class="sc-grain" aria-hidden="true"></div>

  <header class="site-bar">
    <a class="site-mark" href="#top">${brandName}</a>
    <a class="site-cta" href="#commit">${ctaLabel}</a>
  </header>

  <main id="top">
    <!-- 1 · RECOGNITION: Pinned Stage with Kinetic Headline -->
    <section data-sc-act="pin" data-sc-span="2.2" data-sc-drift="${w.canvas}">
      <div data-sc-stage>
        <div class="sc-scrim sc-scrim--lead" aria-hidden="true"></div>
        <div class="sc-copy sc-copy--lead" data-sc-cue="0 0.82 0">
          <h1 class="sc-display sc-display--xl" data-sc-kinetic="lines">${headline}</h1>
          <p class="sc-body">${subheadline}</p>
        </div>
      </div>
    </section>

    <!-- 2 · TENSION: Sequenced Overlapping Argument Windows -->
    <section data-sc-act="pin" data-sc-span="2.8" data-sc-drift="${w.surface}">
      <div data-sc-stage class="sc-wrap">
        <p class="sc-display sc-display--md" data-sc-cue="0 0.36 0">Static interfaces lose attention before the first fold ends.</p>
        <p class="sc-display sc-display--md" data-sc-cue="0.30 0.68">Every scroll tick should advance a single continuous thought.</p>
        <p class="sc-display sc-display--md" data-sc-cue="0.62 0.96">Built on transform and opacity alone for locked 60fps precision.</p>
      </div>
    </section>

    <!-- 3 · TURN: Document Flow + Clip-Path Wipe + Verified Metrics -->
    <section class="sc-section" data-sc-act="flow" data-sc-drift="${w.canvas}">
      <div class="sc-wrap split-grid">
        <div class="sc-stack" data-sc-in data-sc-stagger="70">
          <h2 class="sc-display sc-display--lg">Engineered to feel physical.</h2>
          <p class="sc-body">Natural flow sections give the eye a resting cadence between pinned choreography stages while preserving strict typographic measure.</p>
          <div style="font-variant-numeric: tabular-nums; font-size: 2.5rem; font-weight: 700; color: var(--sc-accent);">
            <span data-sc-count="60" data-sc-suffix=" fps">60 fps</span>
          </div>
        </div>
        <figure class="rail-card" data-sc-reveal="left" data-sc-reveal-at="0.15 0.60">
          <h3 class="sc-display sc-display--md">Deterministic Motion</h3>
          <p class="sc-body">Full reduced-motion parity and zero layout shift across desktop and mobile viewports.</p>
        </figure>
      </div>
    </section>

    <!-- 4 · RANGE: Horizontal Pan Rail with 3D Tilt Cards -->
    <section data-sc-act="pan" data-sc-span="2.8" data-sc-drift="${w.surface}">
      <div data-sc-stage>
        <div class="rail" data-sc-pan="0.06">
          <div class="rail-card sc-stack">
            <h2 class="sc-display sc-display--md">Three Pillars.</h2>
            <p class="sc-body">Vertical scroll converts cleanly into lateral exploration.</p>
          </div>
          <article class="rail-card" data-sc-tilt="5">
            <h3 class="sc-display sc-display--md">01 · Rhythm</h3>
            <p class="sc-body">Alternating pinned stages and natural document flow prevent scroll fatigue.</p>
          </article>
          <article class="rail-card" data-sc-tilt="5">
            <h3 class="sc-display sc-display--md">02 · Restraint</h3>
            <p class="sc-body">Maximum two simultaneous motion vectors on any single viewport.</p>
          </article>
          <article class="rail-card" data-sc-tilt="5">
            <h3 class="sc-display sc-display--md">03 · Verification</h3>
            <p class="sc-body">Automated contact-sheet capture proves every cue reaches full opacity.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 5 · COMMITMENT: Closing Pin + Cursor Spotlight + Docked Footer -->
    <section id="commit" data-sc-act="pin" data-sc-span="1.15" data-sc-drift="${w.canvas}">
      <div data-sc-stage class="close-stage" data-sc-spotlight>
        <div class="sc-stack" style="max-width: 44rem;">
          <h2 class="sc-display sc-display--lg" data-sc-cue="0.05" data-sc-kinetic="lines">Ready to ship interfaces that feel crafted, not generated.</h2>
          <div>
            <a class="site-cta" href="#top" data-sc-magnet="0.24" data-sc-cue="0.05" data-sc-rise="0">${ctaLabel}</a>
          </div>
        </div>
        <footer class="site-foot">
          <span>${brandName}</span>
          <span>Crafted with VibeDesign-Harness v3.0</span>
        </footer>
      </div>
    </section>
  </main>

  ${scriptBlock}
  <script>
    if (window.VibeScroll) {
      window.VibeScroll.mount(document.body);
    }
  </script>
</body>
</html>`;

    return {
        brandName,
        grammar: blueprint.grammar,
        world: blueprint.world,
        html,
        runtimeFiles: {
            css: path.join(SCROLL_REF_DIR, 'engine/vibe-scroll.css'),
            js: path.join(SCROLL_REF_DIR, 'engine/vibe-scroll.js')
        }
    };
}

export default {
    SCROLL_GRAMMARS,
    CHOREOGRAPHY_DEVICES,
    VISUAL_WORLDS,
    recommendScrollChoreography,
    verifyScrollFingerprint,
    getScrollChoreographyReference,
    scaffoldScrollStoryPage
};
