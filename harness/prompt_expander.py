import sys
import json

VISUAL_DOMAINS = {
    "codex_ui_clean": {
        "prefix": "OpenAI Codex CLI clean UI component spec, production-ready Tailwind CSS v4, accessible WCAG AA contrast, deep dark background slate-950, crisp zinc borders, strict typographic scale, micro-interactions.",
        "negative": "purple gradient slop, unstyled button, generic gray backdrop, broken alignment"
    },
    "gemini_imagen_pro": {
        "prefix": "Gemini Imagen ultra-high fidelity render, photorealistic lighting physics, sharp focal depth, master studio art direction, 8k crisp details, color graded perfection.",
        "negative": "DALL-E cartoonish artifacts, blurry textures, oversaturated plastic look, deformed geometry"
    },
    "photorealism": {
        "prefix": "Ultra-realistic photographic shot, raw 35mm lens camera capture, natural lighting physics, subsurface micro-textures, photorealistic depth of field, neutral color balance, highly detailed cinematic framing.",
        "negative": "3d render, cartoon, illustration, painting, plastic skin, fake lighting, blurry, over-saturated, anime, CGI"
    },
    "anime": {
        "prefix": "Masterpiece anime illustration, vibrant 2D cel-shading art style, clean dynamic line art, Studio Ghibli and Makoto Shinkai visual aesthetics, dramatic volumetric sky and lighting.",
        "negative": "photorealistic human skin, 3D CGI render, realistic photograph, blurry lines, noisy photographic textures"
    },
    "3d_animation": {
        "prefix": "3D Pixar animation style render, smooth subsurface material scattering, Octane render finish, studio rim lighting, expressive character geometry, hyper-clean materials.",
        "negative": "2D flat drawing, low-poly, realistic live photo, noisy photograph, blurry background"
    },
    "infographic": {
        "prefix": "Swiss vector infographic design, semantic data visual hierarchy, crisp iconography, vector geometry, clean grid layout, high contrast typography.",
        "negative": "photographic realistic background, cluttered text, chaotic layout, noise, realistic faces"
    },
    "typography_poster": {
        "prefix": "Swiss Grid typography poster, high-contrast magazine lettering, bold editorial design, graphic art balance, structured negative space, minimalist color palette.",
        "negative": "photographic noise, low-resolution illegible text, script chaos, 3D realistic clutter"
    },
    "carousel_ad": {
        "prefix": "High-converting social ad carousel graphic, clear safe-zone margin for text CTA, pattern interrupt visual focal point, crisp UI elements, vibrant brand colors.",
        "negative": "off-center text clutter, unreadable zones, low contrast background, grainy photo"
    },
    "logo_branding": {
        "prefix": "Professional vector logo design, minimalist geometry, high scalability, pristine negative space, clean vector line work, iconic brand emblem.",
        "negative": "3d photographic background, complex realistic texture, noisy clutter, raster pixels"
    },
    "cover_thumbnail": {
        "prefix": "High CTR YouTube thumbnail background graphic, dramatic visual focal weight, clear headline placement zones, saturated contrast, vibrant lighting effect.",
        "negative": "dull muted colors, low contrast background, small unreadable text, cluttered visual noise"
    },
    "face_swap_ugc": {
        "prefix": "Authentic UGC customer review product photo, natural smartphone camera angle, realistic lighting, preserved subject facial features, seamless head blending.",
        "negative": "photoshop edge seams, artificial gloss, unnatural skin smoothing, fake cartoon lighting"
    },
    "sales_creative": {
        "prefix": "Direct-response high-converting sales creative, hero product placement, social proof badge layout, clear visual hierarchy, premium editorial aesthetic.",
        "negative": "abstract messy artwork, dull lighting, unreadable CTA, chaotic background clutter"
    },
    "claude_design_app": {
        "prefix": "Claude Design UI prototype, clean component-driven React HTML mockup, Tailwind CSS tokens, WCAG accessible contrast, modern dark/light mode toggle, sleek dashboard layout.",
        "negative": "AI-slop purple gradients, low contrast text, unstyled raw buttons, clunky wireframes"
    },
    "claude_design_deck": {
        "prefix": "Claude Design pitch deck slide presentation, 16:9 widescreen layout, Swiss typography, visual data cards, high contrast slide structure, executive summary design.",
        "negative": "wall of text, low contrast backgrounds, messy slide alignment, generic template slop"
    },
            "mrbeast_ab_thumbnail_variant_a": {
        "prefix": "High CTR MrBeast style A/B testing YouTube thumbnail, exaggerated face expression cutout, glowing neon stroke outline around subject, saturated cyan and yellow backdrop, extreme foreground element, 16:9 4K render.",
        "negative": "dull colors, low contrast, blurry face, hidden subject, wall of text, dark gloomy backdrop"
    },
    "mrbeast_ab_thumbnail_variant_b": {
        "prefix": "Curiosity gap A/B testing YouTube thumbnail, bold red arrow pointing to glowing mystery element, extreme contrast, dramatic reaction subject on right side, high saturation background, 16:9 crisp layout.",
        "negative": "unclear focal point, faint arrows, low saturation, boring composition, small text"
    },
    "mrbeast_ab_thumbnail_variant_c": {
        "prefix": "Before vs After split screen A/B testing YouTube thumbnail, dramatic 50/50 vertical divider, left side gloomy low-tier state vs right side hyper-vibrant 100x transformed state, high visual contrast.",
        "negative": "single subject without split, low contrast divider, dull colors, subtle change"
    },
    "pod_tshirt": {
        "prefix": "Clean vector graphic for T-shirt POD print, isolated on solid background, zero background noise, crisp outline, high contrast artwork, vector artwork, print-ready 300 DPI aesthetic, bold composition.",
        "negative": "photorealistic background noise, blurry edges, photorealistic human model, complex drop shadows, background clutter, raster artifacts"
    },
    "sticker_vector": {
        "prefix": "Die-cut sticker design, clean white border contour outline, vibrant vector graphic, isolated on plain background, pop art aesthetic, crisp vector lines, sticker pack art.",
        "negative": "no border contour, photorealistic background, realistic photo clutter, blurry line art, un-isolated canvas"
    },
    "shopify_storefront": {
        "prefix": "High-converting Shopify store hero banner, clean ecommerce visual hierarchy, promotional product display, clear trust badge placement zones, WCAG compliant contrast, modern DTC visual aesthetic.",
        "negative": "AI-slop gradients, unreadable promotional text, cluttered banner noise, cheap banner design"
    },
    "dropship_product": {
        "prefix": "Amazon & Shopify product photography mockup, isolated white studio lighting, crisp product highlights, commercial DTC product showcase, clean drop shadow physics, high CTR visual appeal.",
        "negative": "blurry reflection, dark muddy shadows, chaotic background clutter, distorted product geometry"
    },
    "claude_design_hyperframe": {
        "prefix": "Claude Design HyperFrames HTML motion graphic, smooth CSS @keyframes animations, SVG vector path motion, staggered entry transitions, high-framerate kinetic typography.",
        "negative": "static image, choppy frame rates, unaligned layout shifts, low resolution export"
    }
}

BRAND_DESIGN_SYSTEMS = {
    "linear": {
        "name": "Linear Dark Precision",
        "bg": "#08090a",
        "surface": "#121417",
        "border": "#22252a",
        "text": "#f7f8f8",
        "accent": "#5e6ad2",
        "font": "Inter, system-ui, sans-serif"
    },
    "stripe": {
        "name": "Stripe Enterprise Clean",
        "bg": "#0a2540",
        "surface": "#ffffff",
        "border": "#e6ebf1",
        "text": "#0a2540",
        "accent": "#635bff",
        "font": "Inter, system-ui, sans-serif"
    },
    "vercel": {
        "name": "Vercel Minimalist Mono",
        "bg": "#000000",
        "surface": "#0a0a0a",
        "border": "#333333",
        "text": "#ffffff",
        "accent": "#0070f3",
        "font": "Geist, Geist Mono, sans-serif"
    },
    "figma": {
        "name": "Figma Canvas Studio",
        "bg": "#1e1e1e",
        "surface": "#2c2c2c",
        "border": "#383838",
        "text": "#ffffff",
        "accent": "#0cf25d",
        "font": "Inter, sans-serif"
    }
}

def expand_prompt(prompt, domain="photorealism"):
    dom_key = domain.lower()
    if dom_key not in VISUAL_DOMAINS:
        dom_key = "photorealism"
    
    spec = VISUAL_DOMAINS[dom_key]
    expanded_prompt = f"{spec['prefix']} {prompt}. High quality, master art direction."
    
    return {
        "original_prompt": prompt,
        "domain": dom_key,
        "expanded_prompt": expanded_prompt,
        "negative_prompt": spec["negative"],
        "engine_guidance": "Pass expanded_prompt as primary prompt and negative_prompt as negative prompt parameter."
    }

def get_design_system(brand="linear"):
    brand_key = brand.lower()
    if brand_key not in BRAND_DESIGN_SYSTEMS:
        brand_key = "linear"
    return BRAND_DESIGN_SYSTEMS[brand_key]

if __name__ == "__main__":
    if len(sys.argv) > 2:
        prompt_arg = sys.argv[1]
        domain_arg = sys.argv[2]
        res = expand_prompt(prompt_arg, domain_arg)
        print(json.dumps(res, indent=2))
    elif len(sys.argv) == 2 and sys.argv[1] == "--systems":
        print(json.dumps(BRAND_DESIGN_SYSTEMS, indent=2))
    else:
        print(json.dumps({"error": "Usage: python prompt_expander.py <prompt> <domain>"}, indent=2))
