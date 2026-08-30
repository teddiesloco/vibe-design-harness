#!/usr/bin/env node

import { lintUI, expandPrompt, generateDesignMD, listThemes, VISUAL_DOMAINS } from '../index.js';

const command = process.argv[2];

if (command === 'lint') {
    const targetFile = process.argv[3];
    if (!targetFile) {
        console.log('Error: Please specify a file path. Example: npx vibe-design-harness lint component.html');
        process.exit(1);
    }
    const report = lintUI(targetFile);
    console.log(JSON.stringify(report, null, 2));
    if (!report.passed || report.success === false) {
        process.exit(1);
    }
} else if (command === 'expand') {
    const prompt = process.argv[3];
    const domain = process.argv[4] || 'photorealism';
    if (!prompt) {
        console.log('Error: Please specify a prompt. Example: npx vibe-design-harness expand "Cyberpunk city" anime');
        process.exit(1);
    }
    const result = expandPrompt(prompt, domain);
    console.log(JSON.stringify(result, null, 2));
} else if (command === 'design-system') {
    const brandOrTheme = process.argv[3] || 'linear';
    const accent = process.argv[4] || null;
    const doc = generateDesignMD(brandOrTheme, accent);
    console.log(doc);
} else if (command === 'themes') {
    console.log(JSON.stringify(listThemes(), null, 2));
} else if (command === 'domains') {
    console.log(JSON.stringify(Object.keys(VISUAL_DOMAINS), null, 2));
} else {
    console.log(`
VibeDesign-Harness CLI — 100% Pure JS AI UI/UX Linter & Multi-Domain Visual Engine

Commands:
  npx vibe-design-harness lint <file.html>             Lint UI HTML for AI-slop anti-patterns (Zero Python)
  npx vibe-design-harness expand "<prompt>" <domain>    Expand visual prompt by domain (25+ domains)
  npx vibe-design-harness design-system <theme> [accent] Scaffold multi-theme DESIGN.md tokens
  npx vibe-design-harness themes                       List available design system themes
  npx vibe-design-harness domains                      List all 25+ visual prompt domains

Supported Themes:
  linear (dark), stripe (light), vercel (mono dark), airbnb (warm light), luxury_gold (emerald gold), cyberpunk (neon)
`);
}
