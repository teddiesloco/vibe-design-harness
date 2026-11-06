#!/usr/bin/env node

/**
 * VibeDesign-Harness Unified CLI (v3.0.0)
 * 100% Pure UI/UX Engineering, App Dashboard Architecture, Scroll Choreography & Anti-Slop Harness
 */

import {
    lintUI,
    fixUI,
    generateDesignMD,
    generateProductMD,
    listThemes,
    listComponents,
    listLintRules,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
    fetchRemoteRules,
    checkVietnameseFontSupport,
    DASHBOARD_FACES,
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
    scaffoldScrollStoryPage
} from '../index.js';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
    console.log(`
🎨 VibeDesign-Harness CLI v3.0.0 — Unified UI/UX Design System, App Dashboard Architecture & Scroll Choreography Engine

Usage:
  npx vibe-design-harness <command> [options]

Core UI/UX Commands:
  lint <file> [--fix] [--scope <scope>]  Audit HTML/JSX/CSS for 35+ AI-slop & Dashboard rules (scopes: all|color|layout|type|motion|copy|slop|dashboard)
  rules [--scope <scope>]                List all 35+ deterministic detector rules
  command [name]                         Get post-processing UI playbook (audit, critique, polish, distill, bolder, quieter, delight, harden, animate, clarify, adapt, overdrive)
  init-context [theme] [--name <brand>]  Generate paired PRODUCT.md + DESIGN.md in current directory
  design-system <theme> [accent]         Generate DESIGN.md brand tokens for AI coding agents
  scaffold <theme> [output] [--framework react|html] Assemble studio-grade zero-slop Landing Page
  themes                                 List all 14 Landing Themes + 10 Dashboard Faces + 5 Scroll Grammars
  components                             List curated Pro UI component blocks
  check-font <fontName>                  Verify Vietnamese Unicode diacritics support (U+0102–U+1EF9)

App & Dashboard Commands (10-Face Architecture):
  dashboard [userRole] [--job <job>] [--industry <ind>] Recommend Dashboard Face, Screen Layout & Industry Accent
  scaffold-dashboard [face] [output] [--framework react|html] Assemble zero-slop App Dashboard screen
  tokens-css [face] [accent] [output]    Generate production Tailwind v4 tokens.css (:root, .dark, @theme inline, 4px autohide scrollbar)
  ui-ref [topic]                         Read or list the 49 Cleanroom App UI/UX reference specs (app, styles, review, checklist, charts, button, etc.)
  probe [url] [--quick] [--stress] [--sweep] Run live Playwright multi-viewport DOM & WCAG inspector

Scroll Choreography Commands (60fps Scrollytelling Engine):
  scroll [brief] [--grammar <g>] [--world <w>] Recommend Scroll Grammar (5 grammars), Visual World (8 worlds) & 16 Choreography Devices
  scaffold-scroll [output] [--grammar <g>] [--world <w>] [--brand <name>] [--inline] Assemble a 60fps Scrollytelling page powered by VibeScroll
  scroll-ref [topic]                     Read or list the 14 Cleanroom Scroll Choreography specs & runtime (engine/vibe-scroll.js, engine/vibe-scroll.css, devices, worldflight, etc.)
  fingerprint <jsonCandidate> [jsonHistory] Validate a build against the 6-dimension Uniqueness Fingerprint Gate (>= 4/6 dimensions must differ)

Examples:
  npx vibe-design-harness lint src/App.tsx --fix
  npx vibe-design-harness dashboard "ketoan" --job "bang du lieu" --industry "tai chinh"
  npx vibe-design-harness scaffold-dashboard clean dashboard.html
  npx vibe-design-harness scroll "luxury resort spatial flythrough" --grammar worldflight
  npx vibe-design-harness scaffold-scroll story.html --brand "AETHER" --inline
`);
}

async function main() {
    if (!command || command === 'help' || command === '--help') {
        printHelp();
        process.exit(0);
    }

    if (command === 'lint') {
        const target = args[1];
        if (!target) {
            console.error('❌ Error: Please specify a file path or HTML string to lint.');
            process.exit(1);
        }

        const shouldFix = args.includes('--fix');
        if (shouldFix && fs.existsSync(target)) {
            const rawContent = fs.readFileSync(target, 'utf-8');
            const fixRes = fixUI(rawContent);
            if (fixRes.changed) {
                fs.writeFileSync(target, fixRes.fixedContent, 'utf-8');
                console.log(`✨ AUTO-FIX: Remediated ${fixRes.fixCount} AI-slop patterns in ${target}`);
            }
        }

        const scopeIdx = args.indexOf('--scope');
        const scope = scopeIdx !== -1 ? args[scopeIdx + 1] : 'all';
        const useRemote = args.includes('--remote');
        const options = { scope };

        if (useRemote) {
            console.log('🔄 Fetching remote aesthetic rules...');
            const remoteRules = await fetchRemoteRules();
            if (remoteRules && remoteRules.banned_classes) {
                options.banned_patterns = remoteRules.banned_classes;
            }
        }

        const result = lintUI(target, options);
        console.log(`\n🔍 Linting: ${result.file} (scope: ${result.scope})`);
        if (result.passed) {
            console.log('✅ PASSED: Zero AI-slop violations found. Aesthetic grade: Studio-Quality.');
            if (result.warnings && result.warnings.length > 0) {
                result.warnings.forEach(w => console.warn(`   ${w}`));
            }
            process.exit(0);
        } else {
            console.error(`❌ FAILED: Found ${result.violation_count} design anti-pattern violations:`);
            result.errors.forEach(e => console.error(`   ${e}`));
            process.exit(1);
        }
    }

    if (command === 'rules') {
        const scopeIdx = args.indexOf('--scope');
        const scope = scopeIdx !== -1 ? args[scopeIdx + 1] : 'all';
        console.log(`\n🛡️ Deterministic Anti-Slop & App UI Detector Rules (scope: ${scope}):`);
        console.table(listLintRules(scope));
        process.exit(0);
    }

    if (command === 'dashboard') {
        const userRole = args[1] && !args[1].startsWith('--') ? args[1] : '';
        const jobIdx = args.indexOf('--job');
        const primaryJob = jobIdx !== -1 ? args[jobIdx + 1] : '';
        const indIdx = args.indexOf('--industry');
        const industry = indIdx !== -1 ? args[indIdx + 1] : '';
        const exp = args.includes('--experimental');

        const rec = recommendDashboardSystem({ userRole, primaryJob, industry, allowExperimental: exp });
        console.log('\n📐 Recommended App & Dashboard System Architecture:');
        console.log(JSON.stringify(rec, null, 2));
        process.exit(0);
    }

    if (command === 'scaffold-dashboard') {
        const face = (args[1] && !args[1].startsWith('--')) ? args[1] : 'clean';
        const outputFile = (args[2] && !args[2].startsWith('--')) ? args[2] : null;
        const framework = args.includes('--framework') ? args[args.indexOf('--framework') + 1] : 'html';
        const brandIdx = args.indexOf('--brand');
        const brand = brandIdx !== -1 ? args[brandIdx + 1] : 'AgentSea Workspace';
        const accentIdx = args.indexOf('--accent');
        const accent = accentIdx !== -1 ? args[accentIdx + 1] : 'indigo';

        const result = scaffoldDashboardApp({ face, framework, brand, accent });
        if (outputFile) {
            const resolvedPath = path.resolve(process.cwd(), outputFile);
            fs.writeFileSync(resolvedPath, result.code, 'utf-8');
            console.log(`🎉 Assembled App Dashboard (${result.face} / ${result.framework}) -> ${outputFile}`);
        } else {
            console.log(result.code);
        }
        process.exit(0);
    }

    if (command === 'tokens-css') {
        const face = (args[1] && !args[1].startsWith('--')) ? args[1] : 'clean';
        const accent = (args[2] && !args[2].startsWith('--')) ? args[2] : 'neutral';
        const outputFile = (args[3] && !args[3].startsWith('--')) ? args[3] : null;
        const res = generateAppTokensCSS({ face, accent });
        if (outputFile) {
            const resolvedPath = path.resolve(process.cwd(), outputFile);
            fs.writeFileSync(resolvedPath, res.css, 'utf-8');
            console.log(`✅ Generated Tailwind v4 App Tokens CSS (Face: ${res.face}, Accent: ${res.accent.name}) -> ${outputFile}`);
        } else {
            console.log(res.css);
        }
        process.exit(0);
    }

    if (command === 'ui-ref' || command === 'ref') {
        const topic = args[1] || 'list';
        const res = getAppUIReference(topic);
        if (res.content) {
            console.log(res.content);
        } else {
            console.log(JSON.stringify(res, null, 2));
        }
        process.exit(0);
    }

    if (command === 'scroll') {
        const brief = (args[1] && !args[1].startsWith('--')) ? args[1] : '';
        const gIdx = args.indexOf('--grammar');
        const grammar = gIdx !== -1 ? args[gIdx + 1] : null;
        const wIdx = args.indexOf('--world');
        const world = wIdx !== -1 ? args[wIdx + 1] : null;
        const rec = recommendScrollChoreography({ brief, grammar, world });
        console.log('\n🎬 Recommended Scroll Choreography & Scrollytelling Blueprint:');
        console.log(JSON.stringify(rec, null, 2));
        process.exit(0);
    }

    if (command === 'scaffold-scroll') {
        const outputFile = (args[1] && !args[1].startsWith('--')) ? args[1] : null;
        const gIdx = args.indexOf('--grammar');
        const grammar = gIdx !== -1 ? args[gIdx + 1] : 'filmic_six_act';
        const wIdx = args.indexOf('--world');
        const world = wIdx !== -1 ? args[wIdx + 1] : 'low_key_cinematic';
        const bIdx = args.indexOf('--brand');
        const brandName = bIdx !== -1 ? args[bIdx + 1] : 'AETHER';
        const inlineRuntime = args.includes('--inline');

        const res = scaffoldScrollStoryPage({ brandName, grammar, world, inlineRuntime });
        if (outputFile) {
            const resolvedPath = path.resolve(process.cwd(), outputFile);
            fs.writeFileSync(resolvedPath, res.html, 'utf-8');
            console.log(`🎉 Assembled 60fps Scrollytelling Page (${res.grammar.id} / ${res.world.id}) -> ${outputFile}`);
        } else {
            console.log(res.html);
        }
        process.exit(0);
    }

    if (command === 'scroll-ref') {
        const topic = args[1] || 'list';
        const res = getScrollChoreographyReference(topic);
        if (res.content) {
            console.log(res.content);
        } else {
            console.log(JSON.stringify(res, null, 2));
        }
        process.exit(0);
    }

    if (command === 'fingerprint') {
        const candStr = args[1] || '{}';
        const histStr = args[2] || '[]';
        const candidate = JSON.parse(candStr);
        const history = JSON.parse(histStr);
        const res = verifyScrollFingerprint(candidate, history);
        console.log(JSON.stringify(res, null, 2));
        process.exit(res.passed ? 0 : 1);
    }

    if (command === 'probe') {
        const url = args[1] && !args[1].startsWith('--') ? args[1] : '';
        const res = runLiveUIProbe({
            url,
            quick: args.includes('--quick'),
            stress: args.includes('--stress'),
            dark: args.includes('--dark'),
            sweep: args.includes('--sweep'),
            dryRun: !url || args.includes('--dry-run')
        });
        if (res.stdout) console.log(res.stdout);
        if (res.stderr) console.error(res.stderr);
        if (!url || args.includes('--dry-run')) {
            console.log(JSON.stringify(res, null, 2));
        }
        process.exit(res.exit_code || 0);
    }

    if (command === 'command' || command === 'commands') {
        const sub = args[1];
        if (!sub || sub === 'list') {
            console.log('\n🎯 Available Post-Processing Design Commands (12 Flows):');
            console.table(listDesignCommands());
            process.exit(0);
        }
        const playbook = getDesignCommand(sub);
        console.log(`\n# 🎯 Design Command: /${playbook.name} (${playbook.category.toUpperCase()})`);
        console.log(`${playbook.summary}\n`);
        console.log('## Execution Checklist:');
        playbook.checklist.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
        console.log(`\n## Agent Directive:\n  ${playbook.directive}\n`);
        process.exit(0);
    }

    if (command === 'init-context') {
        const theme = (args[1] && !args[1].startsWith('--')) ? args[1] : 'linear';
        const nameIdx = args.indexOf('--name');
        const name = nameIdx !== -1 ? args[nameIdx + 1] : 'Project';
        const designMd = generateDesignMD(theme);
        const productMd = generateProductMD({ name });
        const designPath = path.resolve(process.cwd(), 'DESIGN.md');
        const productPath = path.resolve(process.cwd(), 'PRODUCT.md');
        fs.writeFileSync(designPath, designMd, 'utf-8');
        fs.writeFileSync(productPath, productMd, 'utf-8');
        console.log(`✅ Initialized paired design context:`);
        console.log(`   - ${productPath}`);
        console.log(`   - ${designPath} (theme: ${theme})`);
        process.exit(0);
    }

    if (command === 'scaffold') {
        const theme = args[1] || 'linear';
        const outputFile = args[2] && !args[2].startsWith('--') ? args[2] : null;
        const framework = args.includes('--framework') ? args[args.indexOf('--framework') + 1] : 'html';

        const result = scaffoldLandingPage({ theme, framework });
        if (outputFile) {
            const resolvedPath = path.resolve(process.cwd(), outputFile);
            fs.writeFileSync(resolvedPath, result.code, 'utf-8');
            console.log(`🎉 Assembled studio-grade ${result.theme} (${framework}) -> ${outputFile}`);
        } else {
            console.log(result.code);
        }
        process.exit(0);
    }

    if (command === 'design-system') {
        const theme = args[1] || 'linear';
        const accent = args[2] || null;
        const doc = generateDesignMD(theme, accent);
        console.log(doc);
        process.exit(0);
    }

    if (command === 'themes') {
        console.log('\n🎨 Supported Landing Themes (14 Themes):');
        console.table(listThemes());
        console.log('\n📐 Supported App & Dashboard Faces (10 Faces across 5 Axes):');
        console.table(Object.values(DASHBOARD_FACES).map(f => ({
            id: f.id,
            name: f.name,
            verified: f.verified,
            nav: f.nav,
            container: f.container,
            surface: f.surface,
            font: f.font
        })));
        console.log('\n🎬 Supported Scroll Choreography Grammars (5 Grammars):');
        console.table(Object.values(SCROLL_GRAMMARS).map(g => ({
            id: g.id,
            name: g.name,
            vhBudget: `${g.vhBudget[0]}-${g.vhBudget[1]}vh`,
            acts: g.acts.length
        })));
        process.exit(0);
    }

    if (command === 'check-font') {
        const fontName = args.slice(1).join(' ') || 'Be Vietnam Pro';
        console.log('\n🔤 Vietnamese Font Support Check (U+0102–U+1EF9):');
        console.log(JSON.stringify(checkVietnameseFontSupport(fontName), null, 2));
        process.exit(0);
    }

    if (command === 'components') {
        console.log('\n🧱 Curated Pro Component Blocks:');
        console.table(listComponents());
        process.exit(0);
    }

    console.error(`❌ Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}

main().catch(err => {
    console.error('CLI Fatal Error:', err);
    process.exit(1);
});
