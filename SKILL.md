---
name: vibe-design-harness
description: "Universal Agent Design & Image Quality Harness for Gemini 3.7, Codex, Sol, Terra, Claude, Hermes Agent, OpenClaw, GoClaw & Dewee. Turns raw AI code into 2026 Claude-grade UI and raw prompts into ChatGPT DALL-E 3 photorealistic images."
---

# VibeDesign Harness — Universal AI Agent UI/UX & Image Harness (v1.0.0)

Version: 1.0.0 · Model Agnostic · Agent Agnostic (Hermes, Codex, Gemini CLI, Claude Code, OpenClaw, GoClaw, Dewee)

## 🎯 Scope & Core Mission
Gemini & Codex Excel at pure logic/code but lack natural spatial intuition and aesthetic awareness. This harness bridges that gap by enforcing a **3-Agent Loop (Planner → Generator → Evaluator)** and **Deterministic Quality Gates**.

---

## 🏗️ Architecture: The 3-Agent Decoupled Loop

1. **Planner Agent (Design Architect):**
   - Inputs: User brief (1-line or detailed).
   - Outputs: `spec.md` with explicit **Design Tokens** (Colors `#08090a`, Font pairing, 8pt Spacing Grid, Responsive breakpoints, Interaction states).

2. **Generator Agent (Codex / Sol / Terra / Claude / Gemini 3.7):**
   - Inputs: `spec.md` + `sprint_contract.md`.
   - Action: Implements React/Tailwind/HTML components.
   - Outputs: Code files + `generator_report.md`.

3. **Evaluator Agent (Gemini 3.7 Flash / Reviewer Agent):**
   - Action: Runs `python3 harness/ui_linter.py <file>` + Playwright visual verification.
   - Rubric: 9-Axis Evaluation (Design Quality 2× weight, Originality 2× weight, Craft, Functionality, Accessibility, Responsive, Interaction, Hierarchy, Heuristics).
   - Rule: If Design Quality or Originality < 4/5 ➔ Returns `critique.md` with `REDIRECT` directive to force Generator refactor.

---

## 📸 Image Generation Expansion Harness (Gemini Image & DALL-E 3)
Enforces the **6-Block Universal Expansion Protocol** for all image requests:
`[Subject & Action] + [Camera Lens 35mm/85mm] + [Environment & Context] + [Real-world Material & Textures] + [Lighting & Color Grading] + [Negative Constraints]`.

Usage:
```bash
python3 harness/prompt_expander.py "Asian developer at beach cafe working on laptop"
```

---

## 🔌 Agent Integration Adapters

- **Hermes Agent / OpenViking:** Load skill `vibe-design-harness` ➔ Execute 2-Pass Refinement.
- **Codex CLI / Gemini CLI:** Pre-inject `harness/planner_prompt.md` before generating component code.
- **OpenClaw / GoClaw / Dewee:** Run file-based handoff loop using `spec.md` and `critique.md`.
