/**
 * VibeDesign-Harness Multi-Domain Visual Prompt Expander
 * 100% Pure JavaScript (Zero Python Dependency)
 * 30+ Specialized Visual Domains + Dynamic Domain Registration & Customization.
 */

export const VISUAL_DOMAINS = {
    // 1. CODEX & UI PROTOTYPING
    "codex_ui_clean": {
        "prefix": "OpenAI Codex CLI clean UI component spec, production-ready Tailwind CSS v4, accessible WCAG AA contrast, deep dark background slate-950, crisp zinc borders, strict typographic scale, micro-interactions.",
        "negative": "purple gradient slop, unstyled button, generic gray backdrop, broken alignment"
    },
    "claude_design_app": {
        "prefix": "Claude Design UI prototype, clean component-driven React HTML mockup, Tailwind CSS tokens, WCAG accessible contrast, modern dark/light mode toggle, sleek dashboard layout.",
        "negative": "AI-slop purple gradients, low contrast text, unstyled raw buttons, clunky wireframes"
    },
    "claude_design_deck": {
        "prefix": "Claude Design pitch deck slide presentation, 16:9 widescreen layout, Swiss typography, visual data cards, high contrast slide structure, executive summary design.",
        "negative": "wall of text, low contrast backgrounds, messy slide alignment, generic template slop"
    },
    "claude_design_hyperframe": {
        "prefix": "Claude Design HyperFrames HTML motion graphic, smooth CSS @keyframes animations, SVG vector path motion, staggered entry transitions, high-framerate kinetic typography.",
        "negative": "static image, choppy frame rates, unaligned layout shifts, low resolution export"
    },

    // 2. STUDIO IMAGE HARNESS (Gemini Imagen 3 / GPT Image / DALL-E)
    "gemini_imagen_pro": {
        "prefix": "Gemini Imagen ultra-high fidelity render, photorealistic lighting physics, sharp focal depth, master studio art direction, 8k crisp details, color graded perfection.",
        "negative": "DALL-E cartoonish artifacts, blurry textures, oversaturated plastic look, deformed geometry"
    },
    "photorealism": {
        "prefix": "Ultra-realistic photographic shot, raw 35mm lens camera capture, natural lighting physics, subsurface micro-textures, photorealistic depth of field, neutral color balance, highly detailed cinematic framing.",
        "negative": "3d render, cartoon, illustration, painting, plastic skin, fake lighting, blurry, over-saturated, anime, CGI"
    },
    "editorial_luxury": {
        "prefix": "Vogue/GQ editorial luxury fashion magazine photography, Hasselblad medium format camera, diffused studio softbox lighting, high-end color grading, subtle natural skin texture, haute couture aesthetic.",
        "negative": "cheap lighting, low-res, plastic skin, fake background, amateur photography"
    },
    "quiet_luxury": {
        "prefix": "Old money quiet luxury aesthetic, understated elegance, muted earthy and cream tones, cashmere and linen textures, warm ambient natural sunlight, architectural minimalism, Leica M11 photography.",
        "negative": "flashy gaudy logos, neon colors, plastic reflections, oversaturated contrast"
    },
    "minimalism_visual": {
        "prefix": "Ultra-minimalist architectural photography, clean monolithic geometry, expansive negative space, soft ambient natural shadows, pristine white and concrete textures, disciplined composition.",
        "negative": "cluttered background, busy details, visual noise, complex chaotic patterns"
    },
    "anime": {
        "prefix": "Masterpiece anime illustration, vibrant 2D cel-shading art style, clean dynamic line art, Studio Ghibli and Makoto Shinkai visual aesthetics, dramatic volumetric sky and lighting.",
        "negative": "photorealistic human skin, 3D CGI render, realistic photograph, blurry lines, noisy photographic textures"
    },
    "cyberpunk_anime": {
        "prefix": "Retro 90s cyberpunk anime visual, neo-Tokyo neon reflections, sharp ink line art, cel-shaded characters, volumetric rain atmosphere, hyper-detailed futuristic mechanical elements.",
        "negative": "modern flat 3D, dull colors, plastic lighting, low-res textures"
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

    // 3. MARKETING, ADS & SOCIAL MEDIA CONVERSION
    "carousel_ad": {
        "prefix": "High-converting social ad carousel graphic, clear safe-zone margin for text CTA, pattern interrupt visual focal point, crisp UI elements, vibrant brand colors.",
        "negative": "off-center text clutter, unreadable zones, low contrast background, grainy photo"
    },
    "sales_creative": {
        "prefix": "Direct-response high-converting sales creative, hero product placement, social proof badge layout, clear visual hierarchy, premium editorial aesthetic.",
        "negative": "abstract messy artwork, dull lighting, unreadable CTA, chaotic background clutter"
    },
    "face_swap_ugc": {
        "prefix": "Authentic UGC customer review product photo, natural smartphone camera angle, realistic lighting, preserved subject facial features, seamless head blending.",
        "negative": "photoshop edge seams, artificial gloss, unnatural skin smoothing, fake cartoon lighting"
    },
    "cover_thumbnail": {
        "prefix": "High CTR YouTube thumbnail background graphic, dramatic visual focal weight, clear headline placement zones, saturated contrast, vibrant lighting effect.",
        "negative": "dull muted colors, low contrast background, small unreadable text, cluttered visual noise"
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

    // 4. E-COMMERCE, POD & BRANDING
    "logo_branding": {
        "prefix": "Professional vector logo design, minimalist geometry, high scalability, pristine negative space, clean vector line work, iconic brand emblem.",
        "negative": "3d photographic background, complex realistic texture, noisy clutter, raster pixels"
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
    }
};

export const ALIASES = {
    "anime_manga": "anime",
    "infographic_diagram": "infographic",
    "social_carousel": "carousel_ad",
    "typography": "typography_poster",
    "gemini_imagen": "gemini_imagen_pro",
    "claude_design": "claude_design_app",
    "mrbeast_variant_a": "mrbeast_ab_thumbnail_variant_a",
    "mrbeast_variant_b": "mrbeast_ab_thumbnail_variant_b",
    "mrbeast_variant_c": "mrbeast_ab_thumbnail_variant_c",
    "luxury": "editorial_luxury",
    "quiet_luxury_aesthetic": "quiet_luxury",
    "minimalism": "minimalism_visual",
    "minimalist": "minimalism_visual",
    "cyberpunk": "cyberpunk_anime"
};

/**
 * Register a custom visual prompt domain dynamically
 * @param {string} domainKey Unique domain name
 * @param {string} prefix Prompt enhancement prefix
 * @param {string} negative Negative prompt constraints
 */
export function registerDomain(domainKey, prefix, negative = '') {
    if (!domainKey || !prefix) {
        throw new Error('registerDomain requires domainKey and prefix.');
    }
    const key = domainKey.toLowerCase().trim();
    VISUAL_DOMAINS[key] = { prefix, negative };
    return VISUAL_DOMAINS[key];
}

/**
 * Expand raw image prompt with domain-specific optics, lighting, and negative constraints
 * @param {string} prompt Raw prompt concept
 * @param {string} domain Visual domain style
 * @param {Object} options Custom options (lighting, composition, mood, customPrefix, customNegative)
 */
export function expandPrompt(prompt, domain = 'photorealism', options = {}) {
    let domKey = (domain || 'photorealism').toLowerCase().trim();
    if (ALIASES[domKey]) {
        domKey = ALIASES[domKey];
    }

    let spec = VISUAL_DOMAINS[domKey] || VISUAL_DOMAINS['photorealism'];
    let prefix = options.customPrefix || spec.prefix;
    let negative = options.customNegative || spec.negative;

    let customModifier = '';
    if (options.lighting) customModifier += `, ${options.lighting} lighting`;
    if (options.composition) customModifier += `, ${options.composition} composition`;
    if (options.aspectRatio) customModifier += `, aspect ratio ${options.aspectRatio}`;
    if (options.mood) customModifier += `, ${options.mood} atmosphere`;

    const expandedPrompt = `${prefix} ${prompt}${customModifier}. High quality, master art direction.`;

    return {
        original_prompt: prompt,
        domain: domKey,
        expanded_prompt: expandedPrompt,
        negative_prompt: negative,
        engine_guidance: 'Pass expanded_prompt as primary prompt and negative_prompt as negative prompt parameter.'
    };
}

export default {
    expandPrompt,
    registerDomain,
    VISUAL_DOMAINS,
    ALIASES
};
