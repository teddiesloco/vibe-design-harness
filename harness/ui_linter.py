#!/usr/bin/env python3
"""
VibeDesign-Harness UI Linter (Pass 2 Deterministic Audit)
Checks generated HTML/CSS/Tailwind for AI-slop visual patterns.
Returns structured JSON output for Node.js / CLI wrapper consumption.
"""
import sys
import re
import json

BANNED_PATTERNS = [
    (r'from-purple-\d+\s+to-blue-\d+', 'Generic purple-to-blue AI gradient detected'),
    (r'bg-gradient-to-r\s+from-indigo-\d+\s+via-purple-\d+', 'Cheesy generic AI gradient detected'),
    (r'\bbg-(gray|zinc|slate)-800\b', 'Weak gray background (use deep dark bg-zinc-950 or #08090a)'),
    (r'<button(?![^>]*class=)', 'Unstyled native button tag detected'),
    (r'style="[^"]*background:\s*linear-gradient', 'Raw inline gradient detected (use semantic tokens)'),
]

REQUIRED_PATTERNS = [
    (r'(bg-zinc-950|bg-slate-950|#08090a|#09090b)', 'Deep dark foundation color missing'),
    (r'(font-|tracking-tight|inter|geist|oswald)', 'Modern typography scale declaration missing'),
]

def check_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {
            "file": filepath,
            "success": False,
            "passed": False,
            "errors": [f"File read error: {str(e)}"],
            "warnings": []
        }

    errors = []
    warnings = []

    for pattern, msg in BANNED_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            errors.append(f"❌ FAIL: {msg}")

    for pattern, msg in REQUIRED_PATTERNS:
        if not re.search(pattern, content, re.IGNORECASE):
            warnings.append(f"⚠️ WARN: {msg}")

    passed = len(errors) == 0
    return {
        "file": filepath,
        "success": True,
        "passed": passed,
        "errors": errors,
        "warnings": warnings,
        "violation_count": len(errors)
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python3 ui_linter.py <file.html>"}))
        sys.exit(1)

    file_path = sys.argv[1]
    res = check_file(file_path)

    # Human-readable mode if --raw passed, otherwise default to clean JSON
    if "--raw" in sys.argv:
        print(f"--- VibeDesign Linter Audit: {file_path} ---")
        if not res["passed"]:
            for e in res["errors"]:
                print(e)
            print(f"Result: REJECTED ({len(res['errors'])} deterministic violations)")
            sys.exit(1)
        else:
            print("✅ PASS: Zero AI-slop patterns detected!")
            for w in res["warnings"]:
                print(w)
            sys.exit(0)
    else:
        print(json.dumps(res, indent=2))
        sys.exit(0 if res["passed"] else 1)
