#!/usr/bin/env python3
import subprocess
import os

def test_linter_bad():
    bad_html = '<button>Click</button><div class="bg-gradient-to-r from-purple-500 to-blue-500">Slop</div>'
    test_path = '/tmp/test_bad.html'
    with open(test_path, 'w') as f:
        f.write(bad_html)
    res = subprocess.run(['python3', '/root/vibe-design-harness/harness/ui_linter.py', test_path], capture_output=True, text=True)
    os.remove(test_path)
    assert res.returncode != 0
    print("✅ Test Bad HTML Linter: PASSED (Correctly rejected AI-slop)")

def test_linter_good():
    good_html = '<div class="bg-zinc-950 text-white font-sans tracking-tight"><button class="bg-emerald-500 rounded-xl px-4 py-2">Click</button></div>'
    test_path = '/tmp/test_good.html'
    with open(test_path, 'w') as f:
        f.write(good_html)
    res = subprocess.run(['python3', '/root/vibe-design-harness/harness/ui_linter.py', test_path], capture_output=True, text=True)
    os.remove(test_path)
    assert res.returncode == 0
    print("✅ Test Good HTML Linter: PASSED (Approved clean UI)")

if __name__ == "__main__":
    print("--- Running VibeDesign Harness Self-Test Suite ---")
    test_linter_bad()
    test_linter_good()
    print("All tests passed successfully!")
