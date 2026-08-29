import json
import re

class ClaudeDesignEngine:
    """
    Claude Design Engine for Gemini 3.7 & Codex CLI.
    Enables App Prototypes, Pitch Decks (Slides), HyperFrames (HTML Motion), and Figma AST export schemas.
    """
    
    @staticmethod
    def generate_design_md(brand_name="Linear", primary_color="#5e6ad2", theme="dark"):
        return f"""# DESIGN.md — {brand_name} System Tokens

## 1. Visual Hierarchy & Palette ({theme.upper()} MODE)
- **Background:** {('#08090a' if theme == 'dark' else '#ffffff')}
- **Surface:** {('#121417' if theme == 'dark' else '#f8f9fa')}
- **Border:** {('#22252a' if theme == 'dark' else '#e9ecef')}
- **Text Main:** {('#f7f8f8' if theme == 'dark' else '#1a1d20')}
- **Text Muted:** {('#8a8f98' if theme == 'dark' else '#6c757d')}
- **Primary Accent:** {primary_color}

## 2. Typography Scale
- **Display Heading:** 48px / Line Height 1.1 / Font Weight 700 (Letter Spacing -0.03em)
- **H1 Section:** 32px / Line Height 1.2 / Font Weight 600
- **H2 Card Title:** 20px / Line Height 1.3 / Font Weight 600
- **Body Regular:** 14px / Line Height 1.5 / Font Weight 400
- **Caption / Code:** 12px Mono / Line Height 1.4

## 3. Component Guidelines
- **Buttons:** 8px border-radius, 12px 20px padding, subtle 1px border highlight, focus-visible ring 2px {primary_color}.
- **Cards:** Subtle 1px solid border, 12px border-radius, background surface token. NO generic heavy drop shadows.
- **Interactions:** CSS smooth transition 150ms ease-in-out on hover/active states.
"""

    @staticmethod
    def to_figma_ir_schema(html_content):
        """
        Parses DOM structure into Figma IR (Intermediate Representation) JSON schema
        compatible with claude-to-figma import bridge.
        """
        has_buttons = bool(re.search(r'<button|class="[^"]*btn', html_content, re.IGNORECASE))
        has_cards = bool(re.search(r'class="[^"]*card|border', html_content, re.IGNORECASE))
        
        ir_document = {
            "version": "1.0.0",
            "generator": "VibeDesign-Harness Claude Design Engine",
            "target": "Figma Desktop Plugin API",
            "canvas": {
                "width": 1440,
                "height": 900,
                "backgroundColor": "#08090a"
            },
            "components": [],
            "tokens": {
                "colors": {
                    "color/primary": "#5e6ad2",
                    "color/background": "#08090a",
                    "color/surface": "#121417"
                }
            }
        }
        
        if has_buttons:
            ir_document["components"].append({
                "id": "comp-button-primary",
                "name": "Button / Primary",
                "type": "FRAME",
                "layoutMode": "HORIZONTAL",
                "padding": [12, 20, 12, 20],
                "itemSpacing": 8,
                "fills": [{"type": "SOLID", "color": "#5e6ad2"}],
                "cornerRadius": 8
            })
            
        if has_cards:
            ir_document["components"].append({
                "id": "comp-card-surface",
                "name": "Card / Surface",
                "type": "FRAME",
                "layoutMode": "VERTICAL",
                "padding": [24, 24, 24, 24],
                "itemSpacing": 16,
                "fills": [{"type": "SOLID", "color": "#121417"}],
                "strokes": [{"type": "SOLID", "color": "#22252a"}],
                "cornerRadius": 12
            })
            
        return ir_document

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--design-md":
        brand = sys.argv[2] if len(sys.argv) > 2 else "Linear"
        print(ClaudeDesignEngine.generate_design_md(brand))
    else:
        print(json.dumps(ClaudeDesignEngine.to_figma_ir_schema("<div class='card'><button>Action</button></div>"), indent=2))
