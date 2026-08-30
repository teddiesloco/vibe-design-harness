/**
 * VibeDesign-Harness Curated Pro Component Catalog
 * 100% Pure Vanilla JS + Modern Tailwind CSS
 * Replaces Magic UI & Aceternity UI snippets with pre-tested, theme-aware, zero-slop components.
 */

export const COMPONENTS = {
    // 1. HERO SPOTLIGHT (Aceternity / Magic UI Spotlight equivalent)
    hero_spotlight: {
        name: "Hero Spotlight & Ambient Glow",
        description: "Radial beam spotlight header with glowing pill badge, high-contrast headline, and dual CTA buttons.",
        render: (theme, data = {}) => {
            const title = data.title || "The Autonomous AI Engine for High-Velocity Teams";
            const subtitle = data.subtitle || "Stop stitching fragmented tools. Scaffold, audit, and deploy high-converting digital assets in seconds with zero AI slop.";
            const ctaPrimary = data.ctaPrimary || "Get Started Free";
            const ctaSecondary = data.ctaSecondary || "Explore Live Demo";

            return `
<section class="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
  <!-- Radial Spotlight Beam -->
  <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] md:w-[900px] md:h-[450px] opacity-25 blur-3xl pointer-events-none rounded-full" 
       style="background: radial-gradient(circle, ${theme.accent} 0%, rgba(0,0,0,0) 70%);"></div>
  
  <!-- Shimmer Badge -->
  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-8 border transition-all hover:scale-105"
       style="background: ${theme.surface}; border-color: ${theme.border}; color: ${theme.textMain};">
    <span class="w-2 h-2 rounded-full animate-pulse" style="background: ${theme.accent};"></span>
    <span>Engineered for Gemini 3.7 & Codex CLI</span>
    <span class="text-xs opacity-60">→</span>
  </div>

  <!-- Hero Typography -->
  <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6"
      style="color: ${theme.textMain};">
    ${title}
  </h1>

  <p class="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
     style="color: ${theme.textMuted};">
    ${subtitle}
  </p>

  <!-- CTA Action Group -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
    <a href="#get-started" 
       class="w-full sm:w-auto px-7 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-lg hover:opacity-90 active:scale-95 text-center text-white"
       style="background: ${theme.accent};">
      ${ctaPrimary}
    </a>
    <a href="#demo" 
       class="w-full sm:w-auto px-7 py-3.5 rounded-lg font-medium text-sm border transition-all hover:bg-white/5 active:scale-95 text-center"
       style="border-color: ${theme.border}; color: ${theme.textMain}; background: ${theme.surface};">
      ${ctaSecondary}
    </a>
  </div>
</section>`;
        }
    },

    // 2. BENTO GRID (Linear / Apple / Aceternity Bento equivalent)
    bento_grid: {
        name: "Asymmetric Bento Grid",
        description: "4-card modern responsive grid featuring visual hierarchy, interactive hover borders, and metric pills.",
        render: (theme, data = {}) => {
            const cards = data.cards || [
                {
                    title: "Zero-Token UI Linter",
                    desc: "Deterministic regex engine purging generic purple gradients and unstyled tags in under 1ms.",
                    tag: "DETERMINISTIC",
                    col: "col-span-1 md:col-span-2 lg:col-span-8"
                },
                {
                    title: "30+ Visual Domains",
                    desc: "Studio optics, lens physics, and negative constraints for Imagen 3 & GPT Image 2.",
                    tag: "PRO GRAPHICS",
                    col: "col-span-1 md:col-span-1 lg:col-span-4"
                },
                {
                    title: "12+ Design System Themes",
                    desc: "Instant Swiss Minimalism, Luxury Gold, Nordic Sage, and Cyberpunk token injection.",
                    tag: "MULTI-THEME",
                    col: "col-span-1 md:col-span-1 lg:col-span-4"
                },
                {
                    title: "Model Context Protocol (MCP)",
                    desc: "Native MCP bridge ready to plug into Claude Desktop, Cursor, and Hermes Agent.",
                    tag: "READY-TO-USE",
                    col: "col-span-1 md:col-span-2 lg:col-span-8"
                }
            ];

            return `
<section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div class="text-center max-w-3xl mx-auto mb-16">
    <h2 class="text-xs uppercase tracking-widest font-semibold mb-3" style="color: ${theme.accent};">Precision Architecture</h2>
    <h3 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style="color: ${theme.textMain};">Everything you need to ship world-class assets</h3>
    <p class="text-base" style="color: ${theme.textMuted};">No third-party boilerplate. No broken layouts. Just composable design primitives.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
    ${cards.map((c, i) => `
    <div class="${c.col} p-8 rounded-xl border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
         style="background: ${theme.surface}; border-color: ${theme.border};">
      <div class="flex items-center justify-between mb-6">
        <span class="px-2.5 py-1 rounded text-[11px] font-mono tracking-wide font-medium"
              style="background: ${theme.bg}; color: ${theme.accent}; border: 1px solid ${theme.border};">
          ${c.tag}
        </span>
        <span class="text-xs font-mono opacity-40">0${i + 1}</span>
      </div>
      <h4 class="text-xl font-semibold mb-2" style="color: ${theme.textMain};">${c.title}</h4>
      <p class="text-sm leading-relaxed" style="color: ${theme.textMuted};">${c.desc}</p>
    </div>`).join('')}
  </div>
</section>`;
        }
    },

    // 3. PRICING MATRIX (Shadcn / Linear Pricing with Billing Toggle)
    pricing_matrix: {
        name: "High-Converting Pricing Table",
        description: "Responsive 3-tier pricing matrix with featured tier highlight, feature checklists, and guarantee badge.",
        render: (theme, data = {}) => {
            const tiers = data.tiers || [
                {
                    name: "Starter Kit",
                    price: "$0",
                    period: "/forever",
                    desc: "For solo builders and creators scaffolding initial concepts.",
                    features: ["Zero-Token UI Linter", "6 Essential Design Themes", "10 Visual Prompt Domains", "Open-Source CLI & MCP"],
                    cta: "Start Free",
                    featured: false
                },
                {
                    name: "Pro Engineer",
                    price: "$29",
                    period: "/month",
                    desc: "For professional AI engineers and full-stack developers.",
                    features: ["All 12+ Premium Themes", "All 30+ Visual Domains", "Dynamic Remote Rule Sync", "Custom Token Generator", "Priority MCP Gateway"],
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
<section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div class="text-center max-w-2xl mx-auto mb-16">
    <h2 class="text-xs uppercase tracking-widest font-semibold mb-3" style="color: ${theme.accent};">Transparent Pricing</h2>
    <h3 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style="color: ${theme.textMain};">Invest in speed and design precision</h3>
    <p class="text-base" style="color: ${theme.textMuted};">One tool to replace fragment subscriptions and manual copy-pasting.</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
    ${tiers.map(t => `
    <div class="p-8 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 ${t.featured ? 'scale-105 shadow-2xl z-10' : 'hover:border-slate-500'}"
         style="background: ${t.featured ? theme.surface : theme.bg}; border-color: ${t.featured ? theme.accent : theme.border};">
      ${t.featured ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold text-white tracking-wide" style="background: ${theme.accent};">MOST POPULAR</div>` : ''}
      <div>
        <h4 class="text-lg font-semibold mb-2" style="color: ${theme.textMain};">${t.name}</h4>
        <p class="text-xs mb-6 min-h-[36px]" style="color: ${theme.textMuted};">${t.desc}</p>
        <div class="flex items-baseline gap-1 mb-8">
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
      <button class="w-full py-3 rounded-lg font-semibold text-sm transition-all ${t.featured ? 'text-white shadow-md hover:opacity-90' : 'border hover:bg-white/5'}"
              style="background: ${t.featured ? theme.accent : 'transparent'}; border-color: ${theme.border}; color: ${t.featured ? '#ffffff' : theme.textMain};">
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
      <span class="w-6 h-6 rounded-md flex items-center justify-center text-xs text-white" style="background: ${theme.accent};">VD</span>
      <span>${brand}</span>
    </a>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium" style="color: ${theme.textMuted};">
      <a href="#features" class="hover:text-white transition-colors">Features</a>
      <a href="#themes" class="hover:text-white transition-colors">Themes</a>
      <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
      <a href="#docs" class="hover:text-white transition-colors">Docs</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#get-started" class="px-4 py-2 rounded-md text-xs font-semibold text-white transition-all hover:opacity-90"
         style="background: ${theme.accent};">
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

export function getComponent(name, themeSpec = null, customData = {}) {
    const comp = COMPONENTS[name.toLowerCase().trim()];
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
    return comp.render(theme, customData);
}

export function listComponents() {
    return Object.keys(COMPONENTS).map(k => ({
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
