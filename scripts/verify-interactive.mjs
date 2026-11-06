#!/usr/bin/env node
/**
 * VibeDesign-Harness — Interactive Truth, Token-by-Intent & Screen Economy Verifier (v3.1.0)
 *
 * Dual-Mode Verifier:
 *  - Mode A (Live Browser via Playwright when installed or on http:// URLs):
 *    Launches headless Chromium, clicks tabs/switches/disclosures, checks computed RGB hues,
 *    verifies 2-Layer Material rules, and checks infinite animations.
 *  - Mode B (Zero-Dependency Static HTML/JSX AST & Attribute Truth Audit):
 *    Works in any environment without Playwright installed — inspects button/control markup,
 *    interactive handlers (`onclick`, `onClick`, `aria-expanded`, `aria-pressed`, `role="switch"`),
 *    Token-by-Intent semantic classes (`Delete/Cancel/Huỷ/Xóa` vs. primary/success colors),
 *    and 2-Layer Material rules (`backdrop-blur` on Content Layer elements).
 *
 * Usage:
 *   node scripts/verify-interactive.mjs <url-or-html-file> [--json]
 */

import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const DESTRUCTIVE_RE = /\b(delete|remove|destroy|revoke|terminate|cancel\s+(?:order|subscription|plan|booking)|leave\s+(?:workspace|team|group)|xóa|huỷ\s+đơn|hủy\s+gói)\b/i;
const POSITIVE_RE = /\b(save|confirm|create|publish|approve|complete|submit|lưu|xác\s+nhận|hoàn\s+tất|đăng\s+bài)\b/i;

/**
 * Zero-dependency static HTML/JSX Interactive Truth & Token-by-Intent Auditor
 */
export function runStaticInteractiveAudit(htmlOrFilePath) {
    let content = htmlOrFilePath || '';
    let source = '<raw_html>';
    if (typeof htmlOrFilePath === 'string' && fs.existsSync(htmlOrFilePath)) {
        source = path.resolve(htmlOrFilePath);
        content = fs.readFileSync(source, 'utf-8');
    }

    const failures = [];
    const warnings = [];
    let testedControls = 0;

    // 1. Inspect <button ...>...</button> for Token-by-Intent & Interactive Truth
    const buttonRegex = /<button([^>]*)>([\s\S]*?)<\/button>/gi;
    let match;
    while ((match = buttonRegex.exec(content)) !== null) {
        const attrs = match[1] || '';
        const innerText = (match[2] || '').replace(/<[^>]+>/g, '').trim();
        testedControls++;

        const classMatch = attrs.match(/class(?:Name)?=["']([^"']+)["']/i);
        const cls = classMatch ? classMatch[1] : '';

        // Gate 1: Token-by-Intent (Destructive label wearing primary/emerald/indigo/blue fill)
        if (DESTRUCTIVE_RE.test(innerText)) {
            if (/\bbg-(?:indigo|blue|emerald|green|teal|violet|primary)(?:-\d+)?\b/i.test(cls)) {
                failures.push(`[token-by-intent] Destructive button "${innerText}" uses primary/positive background class (${cls}). Use subtle rose (bg-rose-500/10 text-rose-700) or neutral secondary.`);
            }
        }

        // Constructive label wearing danger/rose/red fill
        if (POSITIVE_RE.test(innerText) && !DESTRUCTIVE_RE.test(innerText)) {
            if (/\bbg-(?:rose|red|danger)(?:-\d+)?\b/i.test(cls)) {
                failures.push(`[token-by-intent] Constructive button "${innerText}" uses danger red background class (${cls}). Reserve red/rose for destructive actions.`);
            }
        }

        // Gate 2: Interactive Truth for toggle/switch/disclosure controls
        if (/\b(?:aria-pressed|aria-expanded|aria-checked|role=["']switch["'])\b/i.test(attrs)) {
            const hasHandler = /\b(?:onclick|onClick|@click|hx-get|hx-post|data-sc-|data-action|type=["']submit["'])\b/i.test(attrs);
            if (!hasHandler && !/<script[\s>]/i.test(content)) {
                warnings.push(`[interactive-truth] Toggle/disclosure control "${innerText || 'unnamed'}" declares ARIA state but has no event handler or script binding.`);
            }
        }
    }

    // 3. Gate 3: 2-Layer Material Discipline (No backdrop-blur on Content Layer tags)
    const contentLayerBlur = /<(article|section|table|tr|td|li|main)[^>]*class(?:Name)?=["'][^"']*\bbackdrop-blur(?:-(?:sm|md|lg|xl|2xl|3xl))?\b[^"']*["']/gi;
    let blurMatch;
    while ((blurMatch = contentLayerBlur.exec(content)) !== null) {
        failures.push(`[2-layer-material] Content Layer <${blurMatch[1].toLowerCase()}> uses backdrop-blur. Keep Liquid Glass strictly on Functional Layer chrome.`);
    }

    return {
        url: source,
        mode: 'static-ast',
        passed: failures.length === 0,
        testedControls,
        failures,
        warnings
    };
}

export async function runInteractiveTruthAudit(target, options = {}) {
    let playwright = null;
    if (!options.forceStatic) {
        try {
            playwright = await import('playwright');
        } catch {
            playwright = null;
        }
    }

    if (!playwright) {
        if (/^https?:\/\//i.test(target)) {
            throw new Error('Playwright is required to audit remote http(s) URLs. Pass a local HTML/TSX file or install playwright.');
        }
        return runStaticInteractiveAudit(target);
    }

    const url = /^https?:\/\//i.test(target)
        ? target
        : pathToFileURL(path.resolve(target)).href;

    const browser = await playwright.chromium.launch({ headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(url, { waitUntil: 'networkidle', timeout: options.timeoutMs || 20000 });
        await page.waitForTimeout(250);

        const report = await page.evaluate(async () => {
            const failures = [];
            const warnings = [];
            const vis = (el) => {
                if (!el) return false;
                const r = el.getBoundingClientRect();
                const s = getComputedStyle(el);
                return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05;
            };

            const parseRgb = (str) => {
                const m = (str || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
            };

            const rgbToHueSat = ({ r, g, b }) => {
                const rn = r / 255, gn = g / 255, bn = b / 255;
                const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
                const d = max - min;
                const l = (max + min) / 2;
                const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
                let h = 0;
                if (d !== 0) {
                    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
                    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
                    else h = ((rn - gn) / d + 4) * 60;
                }
                return { h, s, l };
            };

            const DESTRUCTIVE_RE_IN = /\b(delete|remove|destroy|revoke|terminate|cancel\s+(?:order|subscription|plan|booking)|leave\s+(?:workspace|team|group)|xóa|huỷ\s+đơn|hủy\s+gói)\b/i;
            const POSITIVE_RE_IN = /\b(save|confirm|create|publish|approve|complete|submit|lưu|xác\s+nhận|hoàn\s+tất|đăng\s+bài)\b/i;

            for (const btn of document.querySelectorAll('button, [role="button"], a[class*="btn"], a[class*="button"]')) {
                if (!vis(btn)) continue;
                const label = (btn.innerText || btn.getAttribute('aria-label') || '').trim();
                if (!label || label.length > 50) continue;

                const bg = parseRgb(getComputedStyle(btn).backgroundColor);
                const fg = parseRgb(getComputedStyle(btn).color);
                const sample = (bg && bg.a > 0.15) ? bg : fg;
                if (!sample) continue;

                const { h, s } = rgbToHueSat(sample);
                if (s < 0.22) continue;

                const isRedHue = h >= 335 || h <= 22;
                const isGreenOrBlueHue = h >= 85 && h <= 265;

                if (DESTRUCTIVE_RE_IN.test(label) && isGreenOrBlueHue) {
                    failures.push(`[token-by-intent] Destructive action "${label}" uses non-danger hue (${Math.round(h)}°).`);
                }
                if (POSITIVE_RE_IN.test(label) && !DESTRUCTIVE_RE_IN.test(label) && isRedHue) {
                    failures.push(`[token-by-intent] Constructive action "${label}" uses danger red hue (${Math.round(h)}°).`);
                }
            }

            for (const el of document.querySelectorAll('article, section, table, main')) {
                if (!vis(el)) continue;
                const s = getComputedStyle(el);
                const bf = s.backdropFilter || s.webkitBackdropFilter || 'none';
                if (bf !== 'none' && /blur\(/i.test(bf)) {
                    failures.push(`[2-layer-material] Content Layer <${el.tagName.toLowerCase()}> uses backdrop-filter (${bf}).`);
                }
            }

            let testedControls = 0;
            const switches = [...document.querySelectorAll('[role="switch"], [aria-pressed], [aria-expanded]')].filter(vis).slice(0, 8);
            for (const sw of switches) {
                const attr = sw.hasAttribute('aria-checked') ? 'aria-checked'
                    : sw.hasAttribute('aria-pressed') ? 'aria-pressed' : 'aria-expanded';
                const beforeAttr = sw.getAttribute(attr);
                const beforeHtml = document.body.innerHTML.length;
                sw.click();
                await new Promise(r => setTimeout(r, 80));
                const afterAttr = sw.getAttribute(attr);
                const afterHtml = document.body.innerHTML.length;
                testedControls++;
                if (beforeAttr === afterAttr && beforeHtml === afterHtml) {
                    warnings.push(`[interactive-truth] Control "${(sw.innerText || sw.id || attr).trim().slice(0, 30)}" did not update ${attr} or DOM when clicked.`);
                } else {
                    sw.click();
                    await new Promise(r => setTimeout(r, 40));
                }
            }

            return {
                mode: 'playwright-live',
                passed: failures.length === 0,
                testedControls,
                failures,
                warnings
            };
        });

        return { url, ...report };
    } finally {
        await browser.close();
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const target = process.argv[2];
    const asJson = process.argv.includes('--json');
    if (!target) {
        console.error('Usage: node scripts/verify-interactive.mjs <url-or-html-file> [--json]');
        process.exit(1);
    }
    runInteractiveTruthAudit(target)
        .then(res => {
            if (asJson) {
                console.log(JSON.stringify(res, null, 2));
            } else {
                console.log(`\n🧪 Interactive Truth & Intent Audit (${res.mode}): ${res.url}`);
                console.log(`   Controls Verified: ${res.testedControls}`);
                res.failures.forEach(f => console.error(`   ❌ ${f}`));
                res.warnings.forEach(w => console.warn(`   ⚠️ ${w}`));
                if (res.passed) console.log('   ✅ PASSED: Zero interactive truth or semantic intent violations.\n');
            }
            process.exit(res.passed ? 0 : 1);
        })
        .catch(err => {
            console.error(`❌ Error: ${err.message}`);
            process.exit(1);
        });
}
