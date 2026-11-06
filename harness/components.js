/**
 * VibeDesign-Harness Curated Pro Component Catalog (v1.6.0 — AGS Studio Craft Floor Compliant)
 * 100% Pure Vanilla JS + Modern Tailwind CSS
 * Pre-tested, theme-aware, zero-slop components (passes all 30+ deterministic lint gates).
 */

export const COMPONENTS = {
    // 1. HERO SPOTLIGHT
    hero_spotlight: {
        name: "Hero Editorial & Architectural Focus",
        description: "High-contrast architectural header with crisp status pill, balanced measure headline, and dual CTA buttons.",
        render: (theme, data = {}) => {
            const title = data.title || "The Autonomous AI Engine for High-Velocity Teams";
            const subtitle = data.subtitle || "Stop stitching fragmented tools. Scaffold, audit, and deploy high-converting digital assets in seconds with zero design slop.";
            const ctaPrimary = data.ctaPrimary || "Get Started Free";
            const ctaSecondary = data.ctaSecondary || "Explore Live Demo";

            return `
<section class="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
  <!-- Status Pill -->
  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 border transition-all"
       style="background: ${theme.surface}; border-color: ${theme.border}; color: ${theme.textMain}; padding: 8px 16px;">
    <span class="w-2 h-2 rounded-full" style="background: ${theme.accent};"></span>
    <span>Engineered for AI Coding Agents & Production Teams</span>
    <span class="text-xs opacity-60">→</span>
  </div>

  <!-- Hero Typography -->
  <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6"
      style="color: ${theme.textMain}; font-size: clamp(2.5rem, 5vw, 4.25rem); line-height: 1.08;">
    ${title}
  </h1>

  <p class="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
     style="color: ${theme.textMuted}; font-size: 1.125rem; line-height: 1.6;">
    ${subtitle}
  </p>

  <!-- CTA Action Group -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
    <a href="#get-started" 
       class="w-full sm:w-auto px-7 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-sm hover:opacity-90 active:scale-[0.98] text-center text-white"
       style="background: ${theme.accent}; color: #ffffff; padding: 14px 28px;">
      ${ctaPrimary}
    </a>
    <a href="#demo" 
       class="w-full sm:w-auto px-7 py-3.5 rounded-lg font-medium text-sm border transition-all hover:opacity-90 active:scale-[0.98] text-center"
       style="border-color: ${theme.border}; color: ${theme.textMain}; background: ${theme.surface}; padding: 14px 28px;">
      ${ctaSecondary}
    </a>
  </div>
</section>`;
        }
    },

    // 2. BENTO GRID
    bento_grid: {
        name: "Asymmetric Bento Grid",
        description: "4-card modern responsive grid featuring visual hierarchy, interactive hover borders, and semantic tags.",
        render: (theme, data = {}) => {
            const cards = data.cards || [
                {
                    title: "Zero-Token UI Linter",
                    desc: "Deterministic 30-gate engine purging generic purple gradients, AI-slop fonts, and unstyled tags in under 1ms.",
                    tag: "DETERMINISTIC",
                    meta: "30+ GATES",
                    col: "col-span-1 md:col-span-2 lg:col-span-8"
                },
                {
                    title: "60fps Scroll Choreography",
                    desc: "5 scroll grammars, 16 data-sc-* devices, and the 6-dimension uniqueness gate powered by VibeScroll.",
                    tag: "MOTION",
                    meta: "60FPS GPU",
                    col: "col-span-1 md:col-span-1 lg:col-span-4"
                },
                {
                    title: "14 Design System Themes",
                    desc: "Instant Swiss Minimalism, Luxury Editorial, Quiet Luxury, Nordic Sage, and Linear token injection.",
                    tag: "MULTI-THEME",
                    meta: "TOKENS",
                    col: "col-span-1 md:col-span-1 lg:col-span-4"
                },
                {
                    title: "12 Post-Processing Flows",
                    desc: "Built-in Audit, Critique, Polish, Distill, Bolder, Quieter, and Harden flows for studio refinement.",
                    tag: "CRAFT FLOOR",
                    meta: "MCP READY",
                    col: "col-span-1 md:col-span-2 lg:col-span-8"
                }
            ];

            return `
<section id="features" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div class="text-center max-w-3xl mx-auto mb-16">
    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style="color: ${theme.textMain}; font-size: clamp(1.875rem, 3vw, 2.5rem); line-height: 1.15;">Everything you need to ship studio-grade assets</h2>
    <p class="text-base" style="color: ${theme.textMuted};">Composable design primitives verified against 30+ deterministic anti-slop rules.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
    ${cards.map((c) => `
    <div class="${c.col} p-8 rounded-xl border relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5"
         style="background: ${theme.surface}; border-color: ${theme.border}; padding: 32px;">
      <div class="flex items-center justify-between mb-6">
        <span class="px-2.5 py-1 rounded text-[11px] font-mono tracking-wide font-medium"
              style="background: ${theme.bg}; color: ${theme.accent}; border: 1px solid ${theme.border}; padding: 4px 10px;">
          ${c.tag}
        </span>
        <span class="text-xs font-mono opacity-50" style="color: ${theme.textMuted};">${c.meta || ''}</span>
      </div>
      <h3 class="text-xl font-semibold mb-2" style="color: ${theme.textMain}; font-size: 1.25rem; line-height: 1.35;">${c.title}</h3>
      <p class="text-sm leading-relaxed" style="color: ${theme.textMuted};">${c.desc}</p>
    </div>`).join('')}
  </div>
</section>`;
        }
    },

    // 3. PRICING MATRIX
    pricing_matrix: {
        name: "High-Converting Pricing Table",
        description: "Responsive 3-tier pricing matrix with featured tier highlight, tabular numbers, and feature checklists.",
        render: (theme, data = {}) => {
            const tiers = data.tiers || [
                {
                    name: "Starter Kit",
                    price: "$0",
                    period: "/forever",
                    desc: "For solo builders and creators scaffolding initial concepts.",
                    features: ["30-Gate Zero-Token UI Linter", "6 Essential Design Themes", "10 Visual Prompt Domains", "Open-Source CLI & MCP"],
                    cta: "Start Free",
                    featured: false
                },
                {
                    name: "Pro Engineer",
                    price: "$29",
                    period: "/month",
                    desc: "For professional AI engineers and full-stack product teams.",
                    features: ["All 14 Premium Themes", "All 30+ Visual Domains", "12 Post-Processing Commands", "PRODUCT.md + DESIGN.md Generator", "Priority MCP Gateway"],
                    cta: "Upgrade to Pro",
                    featured: true
                },
                {
                    name: "Enterprise Studio",
                    price: "$99",
                    period: "/month",
                    desc: "For digital agencies and multi-agent automated production swarms.",
                    features: ["Unlimited Custom Themes", "Automated CI/CD Quality Gates", "Multi-Tenant Agent Hooks", "Dedicated SLA & Support"],
                    cta: "Contact Team",
                    featured: false
                }
            ];

            return `
<section id="pricing" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div class="text-center max-w-2xl mx-auto mb-16">
    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style="color: ${theme.textMain}; font-size: clamp(1.875rem, 3vw, 2.5rem); line-height: 1.15;">Invest in speed and design precision</h2>
    <p class="text-base" style="color: ${theme.textMuted};">One unified harness to replace fragmented design scripts and manual layout fixes.</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
    ${tiers.map(t => `
    <div class="p-8 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 ${t.featured ? 'z-10' : ''}"
         style="background: ${t.featured ? theme.surface : theme.bg}; border-color: ${t.featured ? theme.accent : theme.border}; padding: 32px;">
      ${t.featured ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold text-white tracking-wide" style="background: ${theme.accent}; color: #ffffff; padding: 4px 12px;">RECOMMENDED</div>` : ''}
      <div>
        <h3 class="text-lg font-semibold mb-2" style="color: ${theme.textMain}; font-size: 1.25rem; line-height: 1.35;">${t.name}</h3>
        <p class="text-xs mb-6 min-h-[36px]" style="color: ${theme.textMuted};">${t.desc}</p>
        <div class="flex items-baseline gap-1 mb-8 tabular-nums">
          <span class="text-4xl sm:text-5xl font-bold tracking-tight" style="color: ${theme.textMain};">${t.price}</span>
          <span class="text-sm" style="color: ${theme.textMuted};">${t.period}</span>
        </div>
        <ul class="space-y-3 mb-8 text-sm">
          ${t.features.map(f => `
          <li class="flex items-center gap-3" style="color: ${theme.textMain};">
            <span class="text-xs font-bold" style="color: ${theme.accent};">✓</span>
            <span>${f}</span>
          </li>`).join('')}
        </ul>
      </div>
      <button class="w-full py-3 rounded-lg font-semibold text-sm transition-all ${t.featured ? 'text-white shadow-sm hover:opacity-90' : 'border hover:opacity-80'}"
              style="background: ${t.featured ? theme.accent : 'transparent'}; border-color: ${theme.border}; color: ${t.featured ? '#ffffff' : theme.textMain}; padding: 12px 20px;">
        ${t.cta}
      </button>
    </div>`).join('')}
  </div>
</section>`;
        }
    },

    // 4. NAVBAR (Sticky Minimalist Navigation)
    navbar_minimal: {
        name: "Sticky Clean Navbar",
        description: "Backdrop-blur minimalist header with logo, navigation links, and action button.",
        render: (theme, data = {}) => {
            const brand = data.brand || "VibeDesign";
            return `
<header class="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all"
        style="background: ${theme.bg}cc; border-color: ${theme.border};">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <a href="#" class="flex items-center gap-2 font-bold text-lg tracking-tight" style="color: ${theme.textMain};">
      <span class="w-6 h-6 rounded-md flex items-center justify-center text-xs text-white" style="background: ${theme.accent}; color: #ffffff; padding: 4px 6px;">VD</span>
      <span>${brand}</span>
    </a>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium" style="color: ${theme.textMuted};">
      <a href="#features" class="hover:opacity-80 transition-opacity">Features</a>
      <a href="#themes" class="hover:opacity-80 transition-opacity">Themes</a>
      <a href="#pricing" class="hover:opacity-80 transition-opacity">Pricing</a>
      <a href="#docs" class="hover:opacity-80 transition-opacity">Docs</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#get-started" class="px-4 py-2 rounded-md text-xs font-semibold text-white transition-all hover:opacity-90"
         style="background: ${theme.accent}; color: #ffffff; padding: 8px 16px;">
        Get Started
      </a>
    </div>
  </div>
</header>`;
        }
    },

    // 5. FOOTER (Minimalist Clean Footer)
    footer_minimal: {
        name: "Clean Minimalist Footer",
        description: "Standard compliant footer with copyright, links, and system status indicator.",
        render: (theme, data = {}) => {
            const brand = data.brand || "VibeDesign-Harness";
            const year = new Date().getFullYear();
            return `
<footer class="border-t py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs"
        style="border-color: ${theme.border}; color: ${theme.textMuted};">
  <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
    <div class="flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
      <span class="font-medium" style="color: ${theme.textMain};">${brand}</span>
      <span>© ${year}. All rights reserved.</span>
    </div>
    <div class="flex items-center gap-6">
      <a href="https://github.com/teddiesloco/vibe-design-harness" class="hover:underline">GitHub</a>
      <a href="https://www.npmjs.com/package/vibe-design-harness" class="hover:underline">NPM Registry</a>
      <a href="#privacy" class="hover:underline">Privacy</a>
      <a href="#terms" class="hover:underline">Terms</a>
    </div>
  </div>
</footer>`;
        }
    }
};

// Aliases so both getComponent('navbar') and getComponent('navbar_minimal') work seamlessly
COMPONENTS.navbar = COMPONENTS.navbar_minimal;
COMPONENTS.footer = COMPONENTS.footer_minimal;

export function getComponent(name, themeSpec = null, customData = {}) {
    const key = (name || '').toLowerCase().trim();
    const comp = COMPONENTS[key];
    if (!comp) {
        throw new Error(`Component '${name}' not found. Available components: ${Object.keys(COMPONENTS).join(', ')}`);
    }
    const theme = themeSpec || {
        bg: '#08090a',
        surface: '#121417',
        border: '#22252a',
        textMain: '#f7f8f8',
        textMuted: '#8a8f98',
        accent: '#5e6ad2',
        font: 'Inter, sans-serif'
    };
    const safeData = (typeof customData === 'object' && customData !== null) ? customData : {};
    return comp.render(theme, safeData);
}

export function listComponents() {
    return ['hero_spotlight', 'bento_grid', 'pricing_matrix', 'navbar_minimal', 'footer_minimal'].map(k => ({
        key: k,
        name: COMPONENTS[k].name,
        description: COMPONENTS[k].description
    }));
}

export const PRO_COMPONENTS = COMPONENTS;

export default {
    COMPONENTS,
    PRO_COMPONENTS,
    getComponent,
    listComponents
};
