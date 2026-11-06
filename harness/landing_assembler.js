import { getTheme } from './ags_design_engine.js';
import { getComponent } from './components.js';
import { checkFile } from './ui_linter.js';

export function scaffoldLandingPage(options = {}) {
    const themeKey = options.theme || 'linear';
    const baseTheme = getTheme(themeKey);
    const customAccent = options.customAccent || null;
    const theme = customAccent ? { ...baseTheme, accent: customAccent } : baseTheme;
    const title = options.title || `${theme.name} • Design System`;
    const brand = options.brand || 'VIBE';
    const heroTitle = options.heroTitle || 'Autonomous Software Without Design Slop';
    const heroSubtitle = options.heroSubtitle || 'Deterministic quality harness enforcing 14 architectural design systems and purging aesthetic defects in <1ms.';
    const framework = (options.framework || 'html').toLowerCase();

    if (framework === 'react' || framework === 'tsx') {
        const tsxCode = `'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-dvh ${theme.color_mode === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} antialiased font-sans selection:bg-zinc-800 selection:text-white">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b ${theme.color_mode === 'dark' ? 'border-zinc-800/80 bg-zinc-950/70' : 'border-zinc-200/80 bg-white/70'}">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
              ${brand.slice(0, 2).toUpperCase()}
            </div>
            <span className="font-bold tracking-tight text-lg">${brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition">Harness</a>
            <a href="#themes" className="hover:text-white transition">Design Systems</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition">Sign In</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition shadow-sm font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>VibeDesign Harness • ${theme.name}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          ${heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          ${heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition shadow-sm flex items-center justify-center gap-2">
            <span>Explore Playground</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-300 font-medium hover:bg-zinc-800/60 transition">
            View Design Tokens
          </button>
        </div>
      </section>

      {/* 3. Core Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Engineered for Studio Craft</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur">
            <ShieldCheck className="w-8 h-8 text-zinc-300 mb-4" />
            <h3 className="text-xl font-bold mb-2">30-Gate Linter</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Deterministic AST validation purging generic purple gradients, slop fonts, and weak grays in &lt;1ms.</p>
          </div>
          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur">
            <Layers className="w-8 h-8 text-zinc-300 mb-4" />
            <h3 className="text-xl font-bold mb-2">14 Design Systems</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Swiss Minimalism, Vogue Luxury Editorial, Quiet Luxury, Nordic Clean, and Linear aesthetics.</p>
          </div>
          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur">
            <Zap className="w-8 h-8 text-zinc-300 mb-4" />
            <h3 className="text-xl font-bold mb-2">12 Post-Processing Flows</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Audit, Critique, Polish, Distill, Bolder, Quieter, and Harden flows ready for Claude, Cursor, and Hermes.</p>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="border-t border-zinc-800/80 py-12 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 ${brand}. Built with VibeDesign-Harness.</p>
      </footer>
    </div>
  );
}
`;
        const lintResult = checkFile(tsxCode);
        return {
            theme: theme.name,
            theme_key: themeKey,
            framework: 'react',
            lint_passed: lintResult.passed,
            lint_violations: lintResult.errors,
            code: tsxCode,
            html: tsxCode
        };
    }

    // Default HTML assembler
    const navbarHtml = getComponent('navbar_minimal', theme, { brand });
    const heroHtml = getComponent('hero_spotlight', theme, { title: heroTitle, subtitle: heroSubtitle });
    const bentoHtml = getComponent('bento_grid', theme, {});
    const pricingHtml = getComponent('pricing_matrix', theme, {});
    const footerHtml = getComponent('footer_minimal', theme, { brand });

    const fullHtml = `<!DOCTYPE html>
<html lang="en" class="${theme.color_mode === 'dark' ? 'dark' : ''}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: ${theme.bg || (theme.color_mode === 'dark' ? '#08090a' : '#ffffff')};
            color: ${theme.textMain || (theme.color_mode === 'dark' ? '#f4f4f5' : '#09090b')};
        }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="${theme.color_mode === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} antialiased selection:bg-zinc-800 selection:text-white">
    ${navbarHtml}
    ${heroHtml}
    ${bentoHtml}
    ${pricingHtml}
    ${footerHtml}
</body>
</html>`;

    const lintResult = checkFile(fullHtml);

    return {
        theme: theme.name,
        theme_key: themeKey,
        framework: 'html',
        lint_passed: lintResult.passed,
        lint_violations: lintResult.errors,
        html: fullHtml,
        code: fullHtml
    };
}

export default {
    scaffoldLandingPage
};
