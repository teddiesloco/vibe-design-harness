import { lintUI, expandPrompt } from '../index.js';

console.log('--- Testing Node.js API Exports ---');
try {
  const expanded = expandPrompt('Anime girl standing in summer rain', 'anime');
  console.log('✅ Prompt Expansion Node Test Passed:');
  console.log(expanded);
} catch (e) {
  console.error('❌ Failed:', e.message);
  process.exit(1);
}
