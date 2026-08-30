#!/usr/bin/env node

import fs from 'fs';
import { lintUI, expandPrompt, generateDesignMD, listThemes, listComponents, scaffoldLandingPage, VISUAL_DOMAINS } from '../index.js';

const command = process.argv[2];

if (command === 'lint') {
    const targetFile = process.argv[3];
    if (!targetFile) {
        console.error('❌ Error: Missing file path to lint.');
        console.log('Usage: npx vibe-design-harness lint <path/to/file.html>');
        process.exit(1);
    }
    const result = lintUI(targetFile);
    console.log(JSON.stringify(result, null, 2));
    if (!result.passed) {
        process.exit(1);
    }
} else if (command === 'expand') {
    const prompt = process.argv[3];
    const domain = process.argv[4] || 'photorealism';
    if (!prompt) {
        console.error('❌ Error: Missing prompt.');
        console.log('Usage: npx vibe-design-harness expand "<prompt>" [domain]');
        process.exit(1);
    }
    const result = expandPrompt(prompt, domain);
    console.log(JSON.stringify(result, null, 2));
} else if (command === 'design-system') {
    const theme = process.argv[3] || 'linear';
    const accent = process.argv[4];
    console.log(generateDesignMD(theme, accent));
} else if (command === 'scaffold' || command === 'page') {
    const theme = process.argv[3] || 'linear';
    const outputFile = process.argv[4] || 'landing_page.html';
    const res = scaffoldLandingPage({ theme });
    fs.writeFileSync(outputFile, res.html);
    console.log(`🎉 Assembled high-converting ${res.theme} landing page -> ${outputFile}`);
    console.log(`✅ Linter check: ${res.lint_passed ? 'PASSED (0 errors)' : 'WARNINGS'}`);
} else if (command === 'themes') {
    console.log(JSON.stringify(listThemes(), null, 2));
} else if (command === 'components') {
    console.log(JSON.stringify(listComponents(), null, 2));
} else if (command === 'domains') {
    console.log(JSON.stringify(Object.keys(VISUAL_DOMAINS), null, 2));
} else {
    console.log(`
🎨 VibeDesign-Harness CLI v1.1.0 (Zero-Python, Multi-Theme, Curated Pro Engine)

Usage:
  npx vibe-design-harness lint <file.html>          # Deterministic UI/UX Linter
  npx vibe-design-harness scaffold [theme] [file]   # Assemble full landing page (Hero, Bento, Pricing)
  npx vibe-design-harness expand "<prompt>" [style] # 30+ Domain Visual Prompt Expander
  npx vibe-design-harness design-system [theme]     # Generate DESIGN.md tokens
  npx vibe-design-harness themes                    # List all 12 design themes
  npx vibe-design-harness components                # List curated component blocks
  npx vibe-design-harness domains                   # List all 30+ visual domains
`);
}
