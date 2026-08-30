#!/usr/bin/env node

/**
 * VibeDesign-Harness Unified CLI
 */

import { lintUI, expandPrompt, generateDesignMD, listThemes, listDomains, listComponents, scaffoldLandingPage, fetchRemoteRules, fixUI } from '../index.js';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
    console.log(`
🎨 VibeDesign-Harness CLI — Deterministic UI/UX Design System Harness

Usage:
  npx vibe-design-harness <command> [options]

Commands:
  lint <file> [--fix]                  Audit HTML/component for AI-slop violations (with auto-fix support)
  scaffold <theme> [output] [--framework react|html] Assemble studio-grade zero-slop UI (HTML or React TSX)
  expand <prompt> [domain]            Generate studio-grade camera physics visual prompts
  design-system <theme> [accent]      Generate DESIGN.md brand tokens for AI agents
  themes                              List all 12 supported design themes
  domains                             List all 30+ visual prompt domains
  components                          List curated Pro component blocks

Options:
  --remote                            Fetch latest remote ban rules when linting
  --fix                               Auto-fix detectable AI-slop defects in file
  --framework react                   Export as React / TSX Tailwind component

Examples:
  npx vibe-design-harness lint src/App.html --fix
  npx vibe-design-harness scaffold luxury_editorial page.tsx --framework react
  npx vibe-design-harness design-system luxury_gold "#d4af37"
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

        const useRemote = args.includes('--remote');
        let options = {};

        if (useRemote) {
            console.log('🔄 Fetching remote aesthetic rules...');
            const remoteRules = await fetchRemoteRules();
            if (remoteRules && remoteRules.banned_classes) {
                options.banned_patterns = remoteRules.banned_classes;
            }
        }

        const result = lintUI(target, options);
        console.log(`\n🔍 Linting: ${result.file}`);
        if (result.passed) {
            console.log('✅ PASSED: Zero AI-slop violations found. Aesthetic grade: Studio-Quality.');
            process.exit(0);
        } else {
            console.error(`❌ FAILED: Found ${result.violation_count} design anti-pattern violations:`);
            result.errors.forEach(e => console.error(`   ${e}`));
            process.exit(1);
        }
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
        console.log('\n🎨 Supported Design Themes:');
        console.table(listThemes());
        process.exit(0);
    }

    if (command === 'domains') {
        console.log('\n📸 Supported Visual Prompt Domains (30+ Domains):');
        console.table(listDomains());
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
