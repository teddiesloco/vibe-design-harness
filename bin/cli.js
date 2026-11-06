#!/usr/bin/env node

/**
 * AGS Design & Visual Studio Harness Unified CLI (v2.1.0)
 */

import {
    lintUI,
    expandPrompt,
    generateDesignMD,
    generateProductMD,
    listThemes,
    listDomains,
    listComponents,
    listLintRules,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
    fetchRemoteRules,
    fixUI,
    checkVietnameseFontSupport,
    formatForPlatform,
    exportTypographyAsset,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    DASHBOARD_FACES,
    SCREEN_CONTENT_LAYOUTS,
    INDUSTRY_ACCENT_PALETTES,
    LOCKED_ARCHITECTURAL_RULES,
    recommendDashboardSystem,
    generateAppTokensCSS,
    getAppUIReference,
    runLiveUIProbe,
    scaffoldDashboardApp
} from '../index.js';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
    console.log(`
🎨 AGS Design & Visual Studio Harness CLI v2.1.0 — Deterministic UI/UX Design System, App Dashboard Architecture & Anti-Slop Harness

Usage:
  npx vibe-design-harness <command> [options]

Commands:
  lint <file> [--fix] [--scope <scope>]  Audit HTML/JSX for 35+ AI-slop & Dashboard rules (scopes: all|color|layout|type|motion|copy|slop|dashboard)
  rules [--scope <scope>]                List all 35+ deterministic detector rules
  dashboard [userRole] [--job <job>] [--industry <ind>] Recommend Dashboard Face (10 Faces), Screen Layout & Industry Accent
  scaffold-dashboard [face] [output] [--framework react|html] Assemble zero-slop App Dashboard screen (clean, dark_sidebar, soft, midnight, etc.)
  tokens-css [face] [accent] [output]    Generate production Tailwind v4 tokens.css (:root, .dark, @theme inline, 4px autohide scrollbar)
  ui-ref [topic]                         Read or list the 49 Cleanroom App UI/UX reference specs (app, styles, review, checklist, charts, button, etc.)
  probe [url] [--quick] [--stress] [--sweep] Run live Playwright multi-viewport DOM & WCAG inspector (probe.mjs)
  command [name]                         Get AGS Studio-grade post-processing playbook (audit, critique, polish, distill, bolder, quieter, delight, harden, animate, clarify, adapt, overdrive)
  init-context [theme] [--name <brand>]  Generate paired PRODUCT.md + DESIGN.md in current directory
  scaffold <theme> [output] [--framework react|html] Assemble studio-grade zero-slop Landing Page (HTML or React TSX)
  expand <prompt> [domain]               Generate studio-grade camera physics visual prompts
  design-system <theme> [accent]         Generate DESIGN.md brand tokens for AI agents
  themes                                 List all 14 supported landing themes + 10 dashboard faces
  domains                                List all 30+ visual prompt domains
  components                             List curated Pro component blocks

Examples:
  npx vibe-design-harness lint src/App.tsx --fix
  npx vibe-design-harness dashboard "ketoan" --job "bang du lieu" --industry "tai chinh"
  npx vibe-design-harness scaffold-dashboard clean dashboard.html
  npx vibe-design-harness tokens-css soft indigo globals.css
  npx vibe-design-harness ui-ref layouts/app
  npx vibe-design-harness probe http://localhost:3000 --quick
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
        let options = { scope };

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

    if (command === 'expand') {
        const prompt = args[1];
        const domain = args[2] || 'photorealism';
        if (!prompt) {
            console.error('❌ Error: Please specify a prompt to expand.');
            process.exit(1);
        }
        const result = expandPrompt(prompt, domain);
        console.log('\n--- 📸 UNIVERSAL IMAGE PROMPT EXPANSION ---');
        console.log(`Domain: ${result.domain_name} (${result.domain})`);
        console.log(`\nPositive Prompt:\n${result.positive_prompt}`);
        console.log(`\n2026 Studio Brief (Nano Banana Pro / GPT-Image-2 / CapCut VN Guard):\n${result.studio_brief}`);
        console.log(`\nNegative Constraints:\n${result.negative_prompt}`);
        console.log('\n--- 💡 Recommended Parameters ---');
        console.log(JSON.stringify(result.recommended_parameters, null, 2));
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
        console.log('\n🎨 Supported Design Themes (14 Landing Themes):');
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
        process.exit(0);
    }

    if (command === 'domains') {
        console.log('\n📸 Supported Visual Prompt Domains (30+ Domains):');
        console.table(listDomains());
        process.exit(0);
    }

    if (command === 'export-typography') {
        const presetIdx = args.indexOf('--preset');
        const preset = presetIdx !== -1 ? args[presetIdx + 1] : (args[1] && !args[1].startsWith('--') ? args[1] : 'editorial_luxury');
        const titleIdx = args.indexOf('--title');
        const title = titleIdx !== -1 ? args[titleIdx + 1] : 'Hệ Thống AI Agent Tự Động Hóa';
        const subIdx = args.indexOf('--subtitle');
        const subtitle = subIdx !== -1 ? args[subIdx + 1] : 'Chuẩn hóa thiết kế & vận hành 24/7 cho doanh nghiệp';
        const badgeIdx = args.indexOf('--badge');
        const badge = badgeIdx !== -1 ? args[badgeIdx + 1] : 'AGS STUDIO';
        const outIdx = args.indexOf('--out');
        const outputDir = outIdx !== -1 ? args[outIdx + 1] : process.cwd();
        const exported = exportTypographyAsset({ preset, title, subtitle, badge, outputDir });
        console.log(`\n✨ Exported CapCut / Figma Vietnamese Typography Asset (preset: ${exported.preset})`);
        console.log(`   SVG Overlay : ${exported.svg_path}`);
        console.log(`   JSON Config : ${exported.json_path}`);
        process.exit(0);
    }

    if (command === 'check-font') {
        const fontName = args.slice(1).join(' ') || 'Be Vietnam Pro';
        console.log('\n🔤 Vietnamese Font Support Check (U+0102–U+1EF9):');
        console.log(JSON.stringify(checkVietnameseFontSupport(fontName), null, 2));
        process.exit(0);
    }

    if (command === 'format') {
        const promptText = args[1] || '';
        const platIdx = args.indexOf('--platform');
        const platform = platIdx !== -1 ? args[platIdx + 1] : 'nano_banana_pro';
        console.log(JSON.stringify(formatForPlatform(promptText, platform), null, 2));
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
