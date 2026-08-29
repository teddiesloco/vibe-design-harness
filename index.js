import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function lintUI(filePath) {
  const scriptPath = path.join(__dirname, 'harness/ui_linter.py');
  return execSync(`python3 ${scriptPath} ${filePath}`, { encoding: 'utf-8' });
}

export function expandPrompt(promptText, domain = 'auto') {
  const scriptPath = path.join(__dirname, 'harness/prompt_expander.py');
  return execSync(`python3 ${scriptPath} "${promptText}" --domain ${domain}`, { encoding: 'utf-8' });
}
