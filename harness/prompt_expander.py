#!/usr/bin/env python3
"""
VibeDesign Multi-Style & Pro-Graphics Harnessing Engine (v1.3.0)
Supports 10 Pro Visual Domains:
1. Photorealism (UGC & Commercial)
2. Anime & Manga (2D Cel-shading)
3. 3D Animation (Pixar/Blender Render)
4. Infographics & Diagrams (Data Viz)
5. Typography & Posters (Swiss Design)
6. Social Carousels & FB/IG Ads
7. Logo & Branding Design (Minimalist, Vector, Emblem, 3D Logo)
8. Covers & Thumbnails (YouTube, Ebook, Fanpage, Podcast)
9. UGC Review & Face/Head Swap (Consistent Persona & Product Review)
10. Pro Sales Creatives & Print Media (Brochure, Flyer, Landing Page Asset)
"""
import sys
import json
import argparse

DOMAIN_HARNESS_RULES = {
    "photorealism": {
        "required": ["35mm/50mm lens photography", "natural studio lighting", "micro-texture details (skin pores, fabric grain)", "zero artificial glow"],
        "negative": "3D render, cartoon, illustration, plastic skin, distorted hands"
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
    },
    "logo_branding": {
        "required": ["vector geometry", "clean emblem/wordmark alignment", "flat color fill or subtle metallic gradient", "high scalability"],
        "negative": "complex photographic background, tiny illegible text, realistic 3D clutter, blurry raster edges"
    },
    "cover_thumbnail": {
        "required": ["high visual weight focal point", "bold 3-word max headline placement zone", "high saturation contrast for click-through rate"],
        "negative": "dull colors, low contrast text, cluttered background, tiny unreadable fonts"
    },
    "face_swap_ugc": {
        "required": ["preserved facial identity features", "seamless neck and hair blend", "matching lighting angle and color temperature", "authentic UGC smartphone camera angle"],
        "negative": "photoshop seam lines, mismatched skin tones, floating head, AI unnatural gloss"
    },
    "sales_creative": {
        "required": ["direct response layout", "clear product hero section", "social proof badge placement", "high-converting call-to-action visual hierarchy"],
        "negative": "abstract messy art, missing focal product, dull dark muddy lighting"
    }
}

def expand_by_style(prompt_text, style_domain="auto"):
    style_domain = style_domain.lower()
    if style_domain not in DOMAIN_HARNESS_RULES:
        lower = prompt_text.lower()
        if any(w in lower for w in ["logo", "brand identity", "emblem", "vector mark", "icon"]):
            style_domain = "logo_branding"
        elif any(w in lower for w in ["thumbnail", "cover", "banner", "fanpage", "header"]):
            style_domain = "cover_thumbnail"
        elif any(w in lower for w in ["face swap", "head swap", "ugc review", "customer photo", "testimonial"]):
            style_domain = "face_swap_ugc"
        elif any(w in lower for w in ["sales", "ad creative", "landing page image", "offer", "discount"]):
            style_domain = "sales_creative"
        elif any(w in lower for w in ["anime", "manga", "ghibli", "shinkai", "comic"]):
            style_domain = "anime"
        elif any(w in lower for w in ["infographic", "chart", "diagram", "mindmap", "schema"]):
            style_domain = "infographic"
        elif any(w in lower for w in ["poster", "typography", "flyer", "brochure"]):
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

    expanded_prompt = f"[{style_domain.upper()} SPEC] {prompt_text}. Style Harness Requirements: {req_str}. Masterpiece graphic quality. Negative prompt: {neg_str}."
    return expanded_prompt, style_domain

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="VibeDesign Pro Graphics Image Harness Engine")
    parser.add_argument("prompt", type=str, help="Raw input prompt")
    parser.add_argument("--domain", type=str, default="auto", choices=["auto"] + list(DOMAIN_HARNESS_RULES.keys()))

    args = parser.parse_args()
    expanded, domain = expand_by_style(args.prompt, args.domain)
    print("Applied Domain: " + domain)
    print("Expanded Prompt: " + expanded)
