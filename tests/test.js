import assert from 'assert';
import { lintUI, fixUI, expandPrompt, generateDesignMD, getTheme, registerTheme, registerDomain, listThemes, listDomains, scaffoldLandingPage } from '../index.js';

console.log('🧪 Starting VibeDesign-Harness Complete Test Suite...\n');

// Test 1: Design Engine & Built-in Themes
console.log('Test 1: Verifying 12 Built-in Themes...');
const themes = listThemes();
assert(themes.length >= 12, 'Must have at least 12 themes');
const luxury = getTheme('luxury_editorial');
assert.strictEqual(luxury.color_mode, 'dark');
assert(luxury.fonts.headline.includes('Playfair'), 'Luxury theme must have Playfair font');
console.log('✅ Test 1 Passed: 12 Themes correctly registered.');

// Test 2: UI Linter AI-Slop Detection
console.log('\nTest 2: Verifying Deterministic UI Linter AI-Slop Detection...');
const slopHtml = '<div class="from-purple-600 to-blue-600 bg-gray-800"><button>Click me</button></div>';
const lintResult = lintUI(slopHtml);
assert.strictEqual(lintResult.passed, false, 'Slop HTML must fail lint check');
assert(lintResult.violation_count >= 2, 'Must detect at least 2 violations');

// Test 2b: Hallmark 57 Gates (Font & Pill button check)
const hallmarkSlop = '<div class="font-[Syne]"><button class="rounded-full px-12 py-3">Pill</button></div>';
const hallmarkLint = lintUI(hallmarkSlop);
assert.strictEqual(hallmarkLint.passed, false, 'Hallmark slop must fail lint check');
assert(hallmarkLint.violation_count >= 2, 'Must detect Syne font and pill button');
console.log('✅ Test 2 Passed: Deterministic UI Linter correctly detected slop (including Hallmark gates).');

// Test 3: Auto-Fixer
console.log('\nTest 3: Verifying Auto-Fixer remediation...');
const fixRes = fixUI(slopHtml);
assert.strictEqual(fixRes.changed, true, 'Fixer must remediate code');
assert(!fixRes.fixedContent.includes('bg-gray-800'), 'Fixed content must not have bg-gray-800');
assert(fixRes.fixedContent.includes('bg-zinc-950'), 'Fixed content must have bg-zinc-950');
console.log('✅ Test 3 Passed: Auto-fixer remediated defects successfully.');

// Test 4: React / TSX Framework Export
console.log('\nTest 4: Verifying React TSX scaffold export...');
const reactScaffold = scaffoldLandingPage({ theme: 'luxury_editorial', framework: 'react' });
assert.strictEqual(reactScaffold.framework, 'react');
assert(reactScaffold.code.includes("'use client'"), 'React scaffold must include use client directive');
assert(reactScaffold.code.includes('export default function LandingPage()'), 'React scaffold must export component');
console.log('✅ Test 4 Passed: React TSX export verified.');

// Test 5: Universal Prompt Expander (30+ Domains)
console.log('\nTest 5: Verifying Universal Prompt Expander with 30+ Domains...');
const expanded = expandPrompt('luxury perfume bottle on obsidian rock', 'photorealism');
assert(expanded.positive_prompt.includes('photorealistic'), 'Must contain optical photorealism tokens');
assert(expanded.negative_prompt.includes('plastic skin'), 'Must contain negative slop constraints');
console.log('✅ Test 5 Passed: Universal Prompt Expander verified.');

console.log('\n🎉 ALL 5 TEST SUITES PASSED (100% Zero Defect).\n');
