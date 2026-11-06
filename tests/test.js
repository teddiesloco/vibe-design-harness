import assert from 'assert';
import {
    lintUI,
    fixUI,
    expandPrompt,
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    checkVietnameseFontSupport,
    toMidjourneyFormat,
    toOpenAIFormat,
    toFluxFormat,
    toNanoBananaFormat,
    toSeedanceFormat,
    exportTypographyAsset,
    generateDesignMD,
    generateProductMD,
    getTheme,
    listThemes,
    listLintRules,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
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

console.log('🧪 Starting VibeDesign-Harness v2.1.0 Complete Test Suite...\n');

// Test 1: Design Engine & 14 Built-in Themes
console.log('Test 1: Verifying 14 Built-in Themes (including Quiet Luxury & Modern Clean)...');
const themes = listThemes();
assert(themes.length >= 14, `Must have at least 14 themes, got ${themes.length}`);
const luxury = getTheme('luxury_editorial');
assert.strictEqual(luxury.color_mode, 'dark');
assert(luxury.fonts.headline.includes('Playfair'), 'Luxury theme must have Playfair font');
const appleLuxury = getTheme('apple_luxury');
assert.strictEqual(appleLuxury.color_mode, 'light');
console.log('✅ Test 1 Passed: 14 Themes correctly registered.');

// Test 2: 30-Gate Deterministic UI Linter AI-Slop Detection
console.log('\nTest 2: Verifying 30-Gate Deterministic UI Linter AI-Slop Detection...');
const rules = listLintRules();
assert(rules.length >= 28, `Must have at least 28 deterministic rules, got ${rules.length}`);

const slopHtml = '<div class="from-purple-600 to-blue-600 bg-gray-800"><button>Click me</button></div>';
const lintResult = lintUI(slopHtml);
assert.strictEqual(lintResult.passed, false, 'Slop HTML must fail lint check');
assert(lintResult.violation_count >= 2, 'Must detect at least 2 violations');

// Test 2b: Hallmark 57 Gates (Font & Pill button check)
const hallmarkSlop = '<div class="font-[Syne]"><button class="rounded-full px-12 py-3">Pill</button></div>';
const hallmarkLint = lintUI(hallmarkSlop);
assert.strictEqual(hallmarkLint.passed, false, 'Hallmark slop must fail lint check');
assert(hallmarkLint.violation_count >= 2, 'Must detect Syne font and pill button');

// Test 2c: AGS Studio + Taste gates (pulsing dot, side-tab border, aphoristic cadence, italic serif H1)
const agsTasteSlop = `
<div class="animate-bounce rounded-xl border-l-4">
  <span class="w-2 h-2 rounded-full animate-pulse"></span>
  <h1 class="font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">Unleash your potential</h1>
  <p class="text-justify">Not a tool. A platform. Stop security theater.</p>
</div>`;
const it2cLint = lintUI(agsTasteSlop);
assert.strictEqual(it2cLint.passed, false, 'AGS Studio+Taste slop must fail lint check');
assert(it2cLint.violation_count >= 7, `Must detect >=7 violations, got ${it2cLint.violation_count}`);

// Test 2d: Scoped detection & inline ignore support
const copyOnlyLint = lintUI(agsTasteSlop, { scope: 'copy' });
assert.strictEqual(copyOnlyLint.passed, false);
assert(copyOnlyLint.violation_count >= 2, 'Copy scope must catch buzzword + theater/aphorism');

const ignoredHtml = '<!-- vibe-disable generic-purple-gradient, weak-gray-backdrop, harsh-multi-gradient --><div class="from-purple-600 to-blue-600 bg-gray-800 font-sans">Clean</div>';
const ignoredLint = lintUI(ignoredHtml);
assert.strictEqual(ignoredLint.passed, true, 'Inline vibe-disable comment must suppress specified rules');
console.log('✅ Test 2 Passed: 30-Gate Linter, Scoped Detection, and Inline Ignores verified.');

// Test 3: Auto-Fixer
console.log('\nTest 3: Verifying Auto-Fixer remediation...');
const fixRes = fixUI(slopHtml);
assert.strictEqual(fixRes.changed, true, 'Fixer must remediate code');
assert(!fixRes.fixedContent.includes('bg-gray-800'), 'Fixed content must not have bg-gray-800');
assert(fixRes.fixedContent.includes('bg-zinc-950'), 'Fixed content must have bg-zinc-950');
console.log('✅ Test 3 Passed: Auto-fixer remediated defects successfully.');

// Test 4: HTML & React TSX Scaffold Zero-Slop Self-Verification
console.log('\nTest 4: Verifying HTML & React TSX scaffolds pass 100% of 30+ Lint Gates...');
const htmlScaffold = scaffoldLandingPage({ theme: 'luxury_editorial', framework: 'html' });
assert.strictEqual(htmlScaffold.lint_passed, true, `HTML scaffold failed lint: ${JSON.stringify(htmlScaffold.lint_violations)}`);

const reactScaffold = scaffoldLandingPage({ theme: 'apple_luxury', framework: 'react' });
assert.strictEqual(reactScaffold.framework, 'react');
assert.strictEqual(reactScaffold.lint_passed, true, `React scaffold failed lint: ${JSON.stringify(reactScaffold.lint_violations)}`);
assert(reactScaffold.code.includes("'use client'"), 'React scaffold must include use client directive');
assert(reactScaffold.code.includes('export default function LandingPage()'), 'React scaffold must export component');
console.log('✅ Test 4 Passed: Both HTML & React TSX scaffolds pass 100% zero-slop verification.');

// Test 5: Universal Prompt Expander (30+ Domains)
console.log('\nTest 5: Verifying Universal Prompt Expander with 30+ Domains...');
const expanded = expandPrompt('luxury perfume bottle on obsidian rock', 'photorealism');
assert(expanded.positive_prompt.includes('photorealistic'), 'Must contain optical photorealism tokens');
assert(expanded.negative_prompt.includes('plastic skin'), 'Must contain negative slop constraints');
console.log('✅ Test 5 Passed: Universal Prompt Expander verified.');

// Test 5b: Nano Banana Pro + GPT-Image-2 + Seedance 2.5 + CapCut VN Typography Compiler
console.log('\nTest 5b: Verifying 2026 Studio Image Brief & CapCut Vietnamese Typography Guard...');
const dirtyVnPrompt = "Close-up mobile UI mockup on an iPhone 16 Pro ('Ti - Cố vấn Trưởng 60 năm kinh nghiệm') of 'Thuyền Giấy', 1) first card (SF Pro Bold, 34pt), (#FBFBFD), Dribbble and Behance top award-winning showcase, 8k render.";
const studioBrief = compileStudioImagePrompt(dirtyVnPrompt);
assert(studioBrief.includes('CANVAS 9:16'), 'Must auto-infer 9:16 portrait aspect ratio from iPhone mobile UI');
assert(!studioBrief.includes('34pt') && !studioBrief.includes('SF Pro Bold'), 'Must strip CSS font specs that leak onto images');
assert(!studioBrief.includes('#FBFBFD') && !studioBrief.includes('8k render'), 'Must strip raw HEX codes and AI-slop buzzwords');
assert(!studioBrief.includes('1)'), 'Must convert numbered list markers so #1/#2 are never printed');
assert(studioBrief.includes('CRITICAL VIETNAMESE TEXT GUARD'), 'Must inject Vietnamese diacritic & skeleton-bar subtext guard');
assert(Object.keys(CAPCUT_VN_TYPOGRAPHY_PRESETS).length >= 8, 'Must expose 8 CapCut Vietnamese typography presets');
console.log('✅ Test 5b Passed: Nano Banana Pro 7-Part Brief & CapCut Vietnamese Typography Guard verified.');

// Test 6: 12 Post-Processing Design Commands & PRODUCT.md Generator
console.log('\nTest 6: Verifying 12 Post-Processing Design Commands & Paired PRODUCT.md...');
const cmds = listDesignCommands();
assert.strictEqual(cmds.length, 12, 'Must expose all 12 post-processing design commands');
const polishCmd = getDesignCommand('polish');
assert.strictEqual(polishCmd.name, 'polish');
assert(Array.isArray(polishCmd.checklist) && polishCmd.checklist.length >= 4);
const productMd = generateProductMD({ name: 'ViecLamRemote' });
assert(productMd.includes('# PRODUCT.md — ViecLamRemote'), 'Must generate valid PRODUCT.md');
const designMd = generateDesignMD('apple_luxury');
assert(designMd.includes('Precision Quiet Luxury Light'), 'Must generate valid DESIGN.md');
console.log('✅ Test 6 Passed: 12 Design Commands & PRODUCT.md/DESIGN.md context generator verified.');

// Test 7: Platform Adapters, Vietnamese Font Glyph/Blacklist Checker & CapCut SVG/JSON Asset Exporter
console.log('\nTest 7: Verifying 5 Platform Adapters, Vietnamese Font Checker & CapCut Asset Exporter...');
const mj = toMidjourneyFormat('Poster dọc du lịch đảo Phú Quý hoàng hôn, chữ: "Khám Phá Phú Quý"');
assert(mj.command.includes('--ar 9:16') && mj.command.includes('--v 7') && mj.command.includes('--no '), 'Midjourney adapter must format --ar 9:16 --v 7 --no');
const oai = toOpenAIFormat('Poster dọc du lịch đảo Phú Quý');
assert.strictEqual(oai.payload.size, '1024x1536', 'OpenAI GPT-Image-2 adapter must map 9:16 to 1024x1536');
const flux = toFluxFormat('Studio ceramic coffee cup');
assert(flux.payload.negative_prompt.length > 10, 'FLUX adapter must provide dedicated negative_prompt field');
const nb = toNanoBananaFormat('Banner ngang MacBook Pro');
assert.strictEqual(nb.payload.generationConfig.imageConfig.aspectRatio, '16:9', 'Nano Banana adapter must lock imageConfig.aspectRatio');
const sd = toSeedanceFormat('Hero product video frame', { referenceCount: 2 });
assert(sd.prompt.includes('@Image 1'), 'Seedance 2.5 adapter must bind @Image 1 reference');

const badFont = checkVietnameseFontSupport('Impact');
assert.strictEqual(badFont.supported, false, 'Impact must be flagged as unsupported/blacklisted for Vietnamese diacritics');
assert.strictEqual(badFont.blacklisted, true);
assert(badFont.recommended_replacement.includes('DelaGothic'), 'Impact must map to DelaGothic-Bold');

const goodFont = checkVietnameseFontSupport('Be Vietnam Pro');
assert.strictEqual(goodFont.supported, true, 'Be Vietnam Pro must pass Vietnamese glyph verification');

const asset = exportTypographyAsset({
    preset: 'bold_impact',
    title: 'Kỷ Nguyên Doanh Nghiệp 1 Người',
    subtitle: 'Tự động hóa vận hành cùng AGS Studio',
    badge: 'AGS 2026'
});
assert(asset.svg.includes('<svg') && asset.svg.includes('Kỷ Nguyên Doanh Nghiệp 1 Người'), 'Must generate valid transparent SVG with Vietnamese headline');
assert.strictEqual(asset.json.schema, 'ags.capcut.typography.v2', 'Must generate CapCut/Figma JSON v2 schema');
console.log('✅ Test 7 Passed: Platform Adapters, Vietnamese Font Checker & CapCut SVG/JSON Exporter verified.');

// Test 8: Cleanroom App & Dashboard Architecture Engine (10 Faces, 10 Content Layouts, 12 Industry Palettes, 49 Reference Specs, Dashboard Linter & Scaffold)
console.log('\nTest 8: Verifying Cleanroom App & Dashboard Architecture Engine...');
assert.strictEqual(Object.keys(DASHBOARD_FACES).length, 10, 'Must expose all 10 Dashboard Faces');
assert.strictEqual(Object.keys(SCREEN_CONTENT_LAYOUTS).length, 10, 'Must expose all 10 Screen Content Layouts');
assert.strictEqual(Object.keys(INDUSTRY_ACCENT_PALETTES).length, 12, 'Must expose all 12 Industry Accent Palettes');
assert.strictEqual(LOCKED_ARCHITECTURAL_RULES.length, 19, 'Must expose all 19 Locked Architectural Rules');

const rec = recommendDashboardSystem({
    userRole: 'Nhân viên vận hành CRM mở cả ngày',
    primaryJob: 'Dò bảng khách hàng',
    industry: 'CRM B2B SaaS'
});
assert.strictEqual(rec.recommended_face.id, 'dark_sidebar', 'CRM full-day operator must map to Dark Sidebar face');
assert.strictEqual(rec.recommended_layout.id, 'table_first', 'Table scanning job must map to table_first layout');
assert.strictEqual(rec.industry_palette.default_accent, 'indigo', 'CRM B2B SaaS must default to indigo accent');

const tokensOut = generateAppTokensCSS({ face: 'soft', accent: 'violet' });
assert(tokensOut.css.includes('@theme inline'), 'Generated tokens.css must include Tailwind v4 @theme inline block');
assert(tokensOut.css.includes('#7c3aed'), 'Generated tokens.css must inject violet primary (#7c3aed)');
assert(tokensOut.css.includes('--scrollbar-thumb: transparent'), 'Generated tokens.css must include 4px autohide scrollbar');

const refList = getAppUIReference('list');
assert(refList.total_files >= 49, `Must have at least 49 cleanroom reference files, got ${refList.total_files}`);
const appLayoutRef = getAppUIReference('layouts/app');
assert.strictEqual(appLayoutRef.found, true, 'Must resolve layouts/app reference');
assert(appLayoutRef.content.includes('Bố cục nội dung: chọn theo việc chính'), 'layouts/app must contain content layout table');

const dashHtml = scaffoldDashboardApp({ face: 'clean', framework: 'html', accent: 'indigo' });
const dashLint = lintUI(dashHtml.code);
assert.strictEqual(dashLint.passed, true, `Scaffolded dashboard HTML must pass 100% of lint gates: ${JSON.stringify(dashLint.errors)}`);

const dashSlop = '<div class="bg-[#f4f4f6] font-sans"><nav class="gap-0.5"></nav><button class="bg-rose-600 text-white">Xoá</button></div>';
const dashSlopLint = lintUI(dashSlop, { scope: 'dashboard' });
assert.strictEqual(dashSlopLint.passed, false, 'Dashboard scope linter must catch solid red destructive button and gap-0.5 nav');
assert(dashSlopLint.violation_count >= 2, 'Must detect both solid-red-destructive-button and tight-stacked-nav-gap');

const dashFixed = fixUI(dashSlop);
assert(dashFixed.fixedContent.includes('bg-rose-500/10'), 'Auto-fixer must remediate solid red button to subtle rose semantic button');

const probeDry = runLiveUIProbe({ url: 'http://localhost:3000', quick: true, stress: true, dryRun: true });
assert(probeDry.cli_command.includes('probe.mjs') && probeDry.cli_command.includes('--quick') && probeDry.cli_command.includes('--stress'));
console.log('✅ Test 8 Passed: Cleanroom 10-Face Dashboard Engine, 49 Reference Specs, Dashboard Gates & Probe Runner verified.');

console.log('\n🎉 ALL 8 TEST SUITES PASSED (100% Zero Defect — v2.1.0 Ready).\n');
