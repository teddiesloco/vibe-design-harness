#!/usr/bin/env python3
"""
VibeDesign-Harness UI Linter (Pass 2 Deterministic Audit)
Checks generated HTML/CSS/Tailwind for AI-slop visual patterns.
"""
import sys
import re

BANNED_PATTERNS = [
    (r'from-purple-\d+\s+to-blue-\d+', 'Generic purple-to-blue AI gradient detected'),
    (r'bg-gradient-to-r\s+from-indigo-\d+\s+via-purple-\d+', 'Cheesy generic AI gradient detected'),
    (r'bg-(gray|zinc|slate)-800', 'Weak gray background (use deep dark bg-zinc-950 or #08090a)'),
    (r'<button(?![^>]*class=)', 'Unstyled native button tag detected'),
    (r'style="[^"]*background:\s*linear-gradient', 'Raw inline gradient detected (use semantic tokens)'),
]

REQUIRED_PATTERNS = [
    (r'(bg-zinc-950|bg-slate-950|#08090a|#09090b)', 'Deep dark foundation color missing'),
    (r'(font-|tracking-tight|inter|geist|oswald)', 'Modern typography scale declaration missing'),
]

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []
    warnings = []

    for pattern, msg in BANNED_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            errors.append(f"❌ FAIL: {msg}")

    for pattern, msg in REQUIRED_PATTERNS:
        if not re.search(pattern, content, re.IGNORECASE):
            warnings.append(f"⚠️ WARN: {msg}")

    return errors, warnings

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 ui_linter.py <file.html>")
        sys.exit(1)

    file_path = sys.argv[1]
    errs, warns = check_file(file_path)

    print(f"--- VibeDesign Linter Audit: {file_path} ---")
    if errs:
        for e in errs:
            print(e)
        print(f"Result: REJECTED ({len(errs)} deterministic violations)")
        sys.exit(1)
    else:
        print("✅ PASS: Zero AI-slop patterns detected!")
        if warns:
            for w in warns:
                print(w)
        sys.exit(0)
