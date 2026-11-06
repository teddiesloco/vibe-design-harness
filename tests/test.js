import assert from 'assert';
import {
    lintUI,
    fixUI,
    checkVietnameseFontSupport,
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
    scaffoldDashboardApp,
    SCROLL_GRAMMARS,
    CHOREOGRAPHY_DEVICES,
    VISUAL_WORLDS,
    recommendScrollChoreography,
    verifyScrollFingerprint,
    getScrollChoreographyReference,
    scaffoldScrollStoryPage
} from '../index.js';

console.log('🧪 Starting VibeDesign-Harness v3.0.0 Unified UI/UX Test Suite...\n');

// Test 1: Design Engine & 14 Built-in Themes
console.log('Test 1: Verifying 14 Built-in Themes (Quiet Luxury, Modern Clean, Linear, Editorial)...');
const themes = listThemes();
assert(themes.length >= 14, `Must have at least 14 themes, got ${themes.length}`);
const luxury = getTheme('luxury_editorial');
assert.strictEqual(luxury.color_mode, 'dark');
assert(luxury.fonts.headline.includes('Playfair'), 'Luxury theme must have Playfair font');
const appleLuxury = getTheme('apple_luxury');
assert.strictEqual(appleLuxury.color_mode, 'light');
console.log('✅ Test 1 Passed: 14 Themes correctly registered.');

// Test 2: 35+ Gate Deterministic UI Linter AI-Slop Detection
console.log('\nTest 2: Verifying 35+ Gate Deterministic UI Linter AI-Slop Detection...');
const rules = listLintRules();
assert(rules.length >= 35, `Must have at least 35 deterministic rules, got ${rules.length}`);

const slopHtml = '<div class="from-purple-600 to-blue-600 bg-gray-800"><button>Click me</button></div>';
const lintResult = lintUI(slopHtml);
assert.strictEqual(lintResult.passed, false, 'Slop HTML must fail lint check');
assert(lintResult.violation_count >= 2, 'Must detect at least 2 violations');

// Test 2b: Typography & Pill button check
const fontPillSlop = '<div class="font-[Syne]"><button class="rounded-full px-12 py-3">Pill</button></div>';
const fontPillLint = lintUI(fontPillSlop);
assert.strictEqual(fontPillLint.passed, false, 'Font/Pill slop must fail lint check');
assert(fontPillLint.violation_count >= 2, 'Must detect overused display font and pill button');

// Test 2c: Taste & Structural gates (pulsing dot, side-tab border, aphoristic cadence, italic serif H1)
const agsTasteSlop = `
<div class="animate-bounce rounded-xl border-l-4">
  <span class="w-2 h-2 rounded-full animate-pulse"></span>
  <h1 class="font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">Unleash your potential</h1>
  <p class="text-justify">Not a tool. A platform. Stop security theater.</p>
</div>`;
const it2cLint = lintUI(agsTasteSlop);
assert.strictEqual(it2cLint.passed, false, 'Taste slop must fail lint check');
assert(it2cLint.violation_count >= 7, `Must detect >=7 violations, got ${it2cLint.violation_count}`);

// Test 2d: Scoped detection & inline ignore support
const copyOnlyLint = lintUI(agsTasteSlop, { scope: 'copy' });
assert.strictEqual(copyOnlyLint.passed, false);
assert(copyOnlyLint.violation_count >= 2, 'Copy scope must catch buzzword + theater/aphorism');

const ignoredHtml = '<!-- vibe-disable generic-purple-gradient, weak-gray-backdrop, harsh-multi-gradient --><div class="from-purple-600 to-blue-600 bg-gray-800 font-sans">Clean</div>';
const ignoredLint = lintUI(ignoredHtml);
assert.strictEqual(ignoredLint.passed, true, 'Inline vibe-disable comment must suppress specified rules');
console.log('✅ Test 2 Passed: 35+ Gate Linter, Scoped Detection, and Inline Ignores verified.');

// Test 3: Auto-Fixer
console.log('\nTest 3: Verifying Auto-Fixer remediation...');
const fixRes = fixUI(slopHtml);
assert.strictEqual(fixRes.changed, true, 'Fixer must remediate code');
assert(!fixRes.fixedContent.includes('bg-gray-800'), 'Fixed content must not have bg-gray-800');
assert(fixRes.fixedContent.includes('bg-zinc-950'), 'Fixed content must have bg-zinc-950');
console.log('✅ Test 3 Passed: Auto-fixer remediated defects successfully.');

// Test 4: HTML & React TSX Scaffold Zero-Slop Self-Verification
console.log('\nTest 4: Verifying HTML & React TSX scaffolds pass 100% of Lint Gates...');
const htmlScaffold = scaffoldLandingPage({ theme: 'luxury_editorial', framework: 'html' });
assert.strictEqual(htmlScaffold.lint_passed, true, `HTML scaffold failed lint: ${JSON.stringify(htmlScaffold.lint_violations)}`);

const reactScaffold = scaffoldLandingPage({ theme: 'apple_luxury', framework: 'react' });
assert.strictEqual(reactScaffold.framework, 'react');
assert.strictEqual(reactScaffold.lint_passed, true, `React scaffold failed lint: ${JSON.stringify(reactScaffold.lint_violations)}`);
assert(reactScaffold.code.includes("'use client'"), 'React scaffold must include use client directive');
assert(reactScaffold.code.includes('export default function LandingPage()'), 'React scaffold must export component');
console.log('✅ Test 4 Passed: Both HTML & React TSX scaffolds pass 100% zero-slop verification.');

// Test 5: 12 Post-Processing Design Commands, Paired PRODUCT.md & Vietnamese Font Guard
console.log('\nTest 5: Verifying 12 Post-Processing Design Commands, Paired PRODUCT.md & Vietnamese Font Guard...');
const cmds = listDesignCommands();
assert.strictEqual(cmds.length, 12, 'Must expose all 12 post-processing design commands');
const polishCmd = getDesignCommand('polish');
assert.strictEqual(polishCmd.name, 'polish');
assert(Array.isArray(polishCmd.checklist) && polishCmd.checklist.length >= 4);
const productMd = generateProductMD({ name: 'AgentSeaCloud' });
assert(productMd.includes('# PRODUCT.md — AgentSeaCloud'), 'Must generate valid PRODUCT.md');
const designMd = generateDesignMD('apple_luxury');
assert(designMd.includes('Precision Quiet Luxury Light'), 'Must generate valid DESIGN.md');

const badFont = checkVietnameseFontSupport('Impact', 'Hệ thống quản trị doanh nghiệp');
assert.strictEqual(badFont.supported, false, 'Impact must be flagged as unsupported/blacklisted for Vietnamese diacritics');
const goodFont = checkVietnameseFontSupport('Be Vietnam Pro', 'Hệ thống quản trị doanh nghiệp');
assert.strictEqual(goodFont.supported, true, 'Be Vietnam Pro must pass Vietnamese glyph verification');
console.log('✅ Test 5 Passed: 12 Design Commands, PRODUCT.md/DESIGN.md & Vietnamese Font Guard verified.');

// Test 6: Cleanroom App & Dashboard Architecture Engine (10 Faces, 10 Content Layouts, 12 Industry Palettes, 49 Reference Specs)
console.log('\nTest 6: Verifying Cleanroom App & Dashboard Architecture Engine...');
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
console.log('✅ Test 6 Passed: Cleanroom 10-Face Dashboard Engine, 49 Reference Specs, Dashboard Gates & Probe Runner verified.');

// Test 7: Cleanroom Scroll Choreography & Scrollytelling Engine (5 Grammars, 16 Devices, 8 Worlds, VibeScroll Runtime & Fingerprint Gate)
console.log('\nTest 7: Verifying Cleanroom Scroll Choreography & Scrollytelling Engine...');
assert.strictEqual(Object.keys(SCROLL_GRAMMARS).length, 5, 'Must expose all 5 Scroll Grammars');
assert.strictEqual(Object.keys(CHOREOGRAPHY_DEVICES).length, 16, 'Must expose all 16 Choreography Devices');
assert.strictEqual(Object.keys(VISUAL_WORLDS).length, 8, 'Must expose all 8 Visual Worlds');

const wfRec = recommendScrollChoreography({ brief: 'Luxury architectural resort spatial flythrough experience' });
assert.strictEqual(wfRec.grammar.id, 'worldflight', 'Spatial flythrough brief must recommend worldflight grammar');

const scrollRefs = getScrollChoreographyReference('list');
assert(scrollRefs.count >= 13, `Must have at least 13 cleanroom scroll choreography reference files, got ${scrollRefs.count}`);

const jsRuntime = getScrollChoreographyReference('engine/vibe-scroll.js');
assert.strictEqual(jsRuntime.found, true, 'Must resolve engine/vibe-scroll.js runtime');
assert(jsRuntime.content.includes('VibeScroll'), 'Runtime must expose cleanroom VibeScroll namespace');

const fpPass = verifyScrollFingerprint(
    {
        grammar: 'worldflight',
        navTreatment: 'hud-waypoint',
        heroDevice: 'continuous-camera-leg',
        actSequence: '4-legs-seam-0.12',
        closePattern: 'docked-ledger',
        signatureMove: 'svg-elevation-trace'
    },
    [
        {
            project: 'Prior Build 1',
            grammar: 'filmic_six_act',
            navTreatment: 'floating-quiet-bar',
            heroDevice: 'pinned-scrub',
            actSequence: 'scrub-pin-flow-scrub-pan-pin',
            closePattern: 'pinned-spotlight',
            signatureMove: 'cursor-waveform'
        }
    ]
);
assert.strictEqual(fpPass.passed, true, 'Distinct build must pass 6-dimension fingerprint gate');

const fpFail = verifyScrollFingerprint(
    {
        grammar: 'filmic_six_act',
        navTreatment: 'floating-quiet-bar',
        heroDevice: 'pinned-scrub',
        actSequence: 'scrub-pin-flow-scrub-pan-pin',
        closePattern: 'pinned-spotlight',
        signatureMove: 'new-move-only'
    },
    [
        {
            project: 'Prior Build 1',
            grammar: 'filmic_six_act',
            navTreatment: 'floating-quiet-bar',
            heroDevice: 'pinned-scrub',
            actSequence: 'scrub-pin-flow-scrub-pan-pin',
            closePattern: 'pinned-spotlight',
            signatureMove: 'cursor-waveform'
        }
    ]
);
assert.strictEqual(fpFail.passed, false, 'Clone build differing on <4 dimensions must fail fingerprint gate');

const storyPage = scaffoldScrollStoryPage({ brandName: 'AETHER', inlineRuntime: true });
assert(storyPage.html.includes('data-sc-act="pin"'), 'Scaffolded scroll story must contain choreography acts');
assert(storyPage.html.includes('window.VibeScroll.mount'), 'Scaffolded scroll story must mount VibeScroll');
console.log('✅ Test 7 Passed: Scroll Choreography Engine, VibeScroll Runtime & 6-Dimension Fingerprint Gate verified.');

console.log('\n🎉 ALL 7 UNIFIED UI/UX TEST SUITES PASSED (100% Zero Defect — v3.0.0 Ready).\n');
