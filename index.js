import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function lintUI(filePath) {
    const pythonScript = path.join(__dirname, 'harness', 'ui_linter.py');
    try {
        const output = execSync(`python3 "${pythonScript}" "${filePath}"`, { encoding: 'utf-8' });
        return JSON.parse(output);
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export function expandPrompt(prompt, domain = 'photorealism') {
    const pythonScript = path.join(__dirname, 'harness', 'prompt_expander.py');
    try {
        const output = execSync(`python3 "${pythonScript}" "${prompt}" "${domain}"`, { encoding: 'utf-8' });
        return JSON.parse(output);
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export function generateDesignMD(brandName = 'Linear') {
    const pythonScript = path.join(__dirname, 'harness', 'claude_design_engine.py');
    try {
        const output = execSync(`python3 "${pythonScript}" --design-md "${brandName}"`, { encoding: 'utf-8' });
        return output;
    } catch (err) {
        return `# DESIGN.md — ${brandName}\nError generating spec.`;
    }
}

export default {
    lintUI,
    expandPrompt,
    generateDesignMD
};
