#!/usr/bin/env node
import { execSync } from 'child_process';
import fileURLToPath from 'url';
import path from 'path';
import fs from 'fs';

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  console.log(`
VibeDesign Harness CLI (v1.0.0)
Usage:
  npx vibe-design-harness lint <file.html>          # Audit UI for AI-slop
  npx vibe-design-harness expand "<prompt>" [domain] # Expand image prompt (photorealism|anime|3d_animation|infographic|typography_poster|carousel_ad)
  npx vibe-design-harness info                      # Print Agent Harness Spec
  `);
  process.exit(0);
}

const rootDir = path.resolve(path.dirname(import.meta.url.replace('file://', '')), '..');

if (command === 'lint') {
  const filePath = args[1];
  if (!filePath) {
    console.error('Error: Missing HTML file path.');
    process.exit(1);
  }
  try {
    const output = execSync(`python3 ${path.join(rootDir, 'harness/ui_linter.py')} ${filePath}`, { encoding: 'utf-8' });
    console.log(output);
  } catch (err) {
    console.error(err.stdout || err.message);
    process.exit(1);
  }
} else if (command === 'expand') {
  const prompt = args[1];
  const domain = args[2] || 'auto';
  if (!prompt) {
    console.error('Error: Missing prompt text.');
    process.exit(1);
  }
  try {
    const output = execSync(`python3 ${path.join(rootDir, 'harness/prompt_expander.py')} "${prompt}" --domain ${domain}`, { encoding: 'utf-8' });
    console.log(output);
  } catch (err) {
    console.error(err.stdout || err.message);
    process.exit(1);
  }
} else if (command === 'info') {
  const skillPath = path.join(rootDir, 'SKILL.md');
  console.log(fs.readFileSync(skillPath, 'utf-8'));
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
