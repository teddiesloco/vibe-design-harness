#!/usr/bin/env node

const { lintUI, expandPrompt, generateDesignMD } = require('../index');

const command = process.argv[2];

if (command === 'lint') {
    const targetFile = process.argv[3];
    if (!targetFile) {
        console.log('Error: Please specify a file path. Example: npx vibe-design-harness lint component.html');
        process.exit(1);
    }
    const report = lintUI(targetFile);
    console.log(JSON.stringify(report, null, 2));
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
    const brand = process.argv[3] || 'Linear';
    const doc = generateDesignMD(brand);
    console.log(doc);
} else {
    console.log(`
VibeDesign-Harness CLI — Claude Design & 10-Domain Visual Engine

Commands:
  npx vibe-design-harness lint <file.html>            Lint UI HTML for AI-slop anti-patterns
  npx vibe-design-harness expand "<prompt>" <domain>   Expand visual prompt by domain
  npx vibe-design-harness design-system <brand>        Scaffold brand-grade DESIGN.md tokens

Visual Domains:
  photorealism, anime, 3d_animation, infographic, typography_poster, carousel_ad, logo_branding, cover_thumbnail, face_swap_ugc, sales_creative, claude_design_app, claude_design_deck, claude_design_hyperframe
`);
}
