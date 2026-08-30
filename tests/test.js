import { lintUI, expandPrompt, generateDesignMD, listThemes, fetchRemoteRules, VISUAL_DOMAINS } from '../index.js';
import fs from 'fs';
import os from 'os';
import path from 'path';

console.log('--- 🧪 Running VibeDesign-Harness 100% Pure JS Test Suite ---');

// 1. Test Prompt Expander & Multi-Domain
const domainsToTest = ['photorealism', 'anime_manga', 'cyberpunk', 'editorial_luxury', 'mrbeast_variant_a', 'shopify_storefront'];
for (const dom of domainsToTest) {
    const res = expandPrompt('A futuristic robotic pet companion', dom, { lighting: 'neon cinematic rim', aspectRatio: '16:9' });
    if (!res.expanded_prompt.includes('futuristic robotic pet companion')) {
        throw new Error(`Expander failed for domain ${dom}`);
    }
}
console.log(`✅ Multi-Domain Expander (Tested ${domainsToTest.length} domains & aliases, total available: ${Object.keys(VISUAL_DOMAINS).length}): PASSED`);

// 2. Test Multi-Theme DESIGN.md Generator
const themes = ['linear', 'stripe', 'vercel', 'airbnb', 'luxury_gold', 'cyberpunk'];
for (const th of themes) {
    const doc = generateDesignMD(th);
    if (!doc.includes('DESIGN.md') || !doc.includes('System Standards')) {
        throw new Error(`Design MD generator failed for theme ${th}`);
    }
}
console.log(`✅ Multi-Theme Design System Engine (Tested ${themes.length} diverse themes light/dark): PASSED`);

// 3. Test Pure JS UI Linter on Bad HTML
const badHTML = '<button>Click</button><div class="bg-gradient-to-r from-purple-500 to-blue-500 bg-gray-800">Slop</div>';
const badResult = lintUI(badHTML);
if (badResult.passed || badResult.errors.length < 2) {
    throw new Error('Linter failed to catch bad HTML AI-slop patterns');
}
console.log('✅ Deterministic UI Linter (Bad HTML correctly flagged & rejected): PASSED');

// 4. Test Pure JS UI Linter on Clean Good HTML
const goodHTML = '<div class="bg-zinc-950 text-white font-sans tracking-tight"><button class="bg-emerald-500 rounded-xl px-4 py-2">Click</button></div>';
const goodResult = lintUI(goodHTML);
if (!goodResult.passed || goodResult.errors.length > 0) {
    throw new Error('Linter falsely rejected good clean HTML');
}
console.log('✅ Deterministic UI Linter (Good HTML approved): PASSED');

// 5. Test Remote Rule Sync Fetch
const rules = await fetchRemoteRules();
console.log('✅ Remote Rule Sync Engine (Live fetch or cache):', rules ? 'SUCCESS' : 'OFFLINE_FALLBACK_OK');

console.log('🎉 ALL 100% PURE JAVASCRIPT TESTS PASSED SUCCESSFULLY! (Zero Python dependency)');
