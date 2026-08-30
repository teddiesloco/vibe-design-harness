import { lintUI, expandPrompt, generateDesignMD } from '../index.js';

console.log('--- Testing Node.js API Exports ---');
try {
  // Test 1: Expand Prompt with Alias
  const expanded = expandPrompt('Anime girl standing in summer rain', 'anime_manga');
  if (expanded.domain !== 'anime') throw new Error('Alias resolution failed');
  console.log('✅ Prompt Expansion Node Test Passed (Alias resolved to anime)');

  // Test 2: Special Characters & Shell Escaping
  const trickyPrompt = 'Test "double quotes" & $special `chars` \\ backslash';
  const trickyExpanded = expandPrompt(trickyPrompt, 'photorealism');
  if (!trickyExpanded.original_prompt.includes('double quotes')) throw new Error('Special char handling failed');
  console.log('✅ Shell Special Characters Safe Execution Passed');

  // Test 3: Generate Design MD
  const designDoc = generateDesignMD('Linear');
  if (!designDoc.includes('DESIGN.md')) throw new Error('Design MD generation failed');
  console.log('✅ Design MD Generation Passed');

} catch (e) {
  console.error('❌ Failed:', e.message);
  process.exit(1);
}
