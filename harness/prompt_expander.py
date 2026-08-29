#!/usr/bin/env python3
"""
VibeDesign Multi-Style Image Harnessing Engine (v1.2.0)
Supports 6 Visual Domains: Photorealism, Anime/Manga, 2D/3D Animation,
Infographics & Diagrams, Typography & Posters, Social Carousels.
"""
import sys
import json
import argparse

DOMAIN_HARNESS_RULES = {
    "photorealism": {
        "required": ["camera/lens (e.g. 35mm/50mm f/1.8)", "natural lighting", "micro-physics (condensation, textures)", "zero sci-fi glow"],
        "negative": "3D render, cartoon, illustration, oversaturated, plastic skin, distorted hands"
    },
    "anime": {
        "required": ["cel-shading", "vibrant line art", "Makoto Shinkai / Studio Ghibli color aesthetic", "expressive key visual framing"],
        "negative": "photorealistic skin, 3D CGI, blurry lines, noisy gradient background"
    },
    "3d_animation": {
        "required": ["Pixar/Disney 3D render style", "subsurface scattering on materials", "soft studio key lighting", "octane render finish"],
        "negative": "photograph, 2D flat, low-poly, pixelated, harsh shadows"
    },
    "infographic": {
        "required": ["clean vector layout", "structured data hierarchy", "semantic color palette", "accessible typography", "minimalist icons"],
        "negative": "realistic photo background, cluttered text, illegible fonts, 3D realistic noise"
    },
    "typography_poster": {
        "required": ["Swiss Graphic Design style", "bold editorial headline font", "high-contrast grid layout", "vector-sharp edges"],
        "negative": "photographic portrait, random realistic clutter, illegible handwriting"
    },
    "carousel_ad": {
        "required": ["clean content margin (safe zones for text overlay)", "high contrast focal point", "modern brand design tokens"],
        "negative": "distracting background details, off-center subject, unreadable text zones"
    }
}

def expand_by_style(prompt_text, style_domain="auto"):
    style_domain = style_domain.lower()
    if style_domain not in DOMAIN_HARNESS_RULES:
        lower = prompt_text.lower()
        if any(w in lower for w in ["anime", "manga", "ghibli", "shinkai", "comic"]):
            style_domain = "anime"
        elif any(w in lower for w in ["infographic", "chart", "diagram", "mindmap", "schema"]):
            style_domain = "infographic"
        elif any(w in lower for w in ["poster", "typography", "logo", "banner", "flyer"]):
            style_domain = "typography_poster"
        elif any(w in lower for w in ["carousel", "ad", "facebook post", "instagram story"]):
            style_domain = "carousel_ad"
        elif any(w in lower for w in ["3d", "pixar", "disney", "cartoon", "render"]):
            style_domain = "3d_animation"
        else:
            style_domain = "photorealism"

    rules = DOMAIN_HARNESS_RULES[style_domain]
    req_str = ", ".join(rules["required"])
    neg_str = rules["negative"]

    expanded_prompt = f"[{style_domain.upper()} SPEC] {prompt_text}. Style Harness Requirements: {req_str}. High resolution masterwork finish. Negative prompt: {neg_str}."
    return expanded_prompt, style_domain

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="VibeDesign Image Prompt Harness Engine")
    parser.add_argument("prompt", type=str, help="Raw input prompt")
    parser.add_argument("--domain", type=str, default="auto", choices=["auto", "photorealism", "anime", "3d_animation", "infographic", "typography_poster", "carousel_ad"])

    args = parser.parse_args()
    expanded, domain = expand_by_style(args.prompt, args.domain)
    print("Applied Domain: " + domain)
    print("Expanded Prompt: " + expanded)
