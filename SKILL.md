---
name: vibe-harness-design
description: "Universal AI Agent UI/UX Design System Engine & Anti-Slop Harness for Frontend, Landing Pages, and Web Apps."
version: 1.5.1
---

# Vibe-Harness-Design v1.5.1 — Universal UI/UX & Anti-Slop Engine

> **Powered by:** ABS Design System · Hallmark 57 Gates · UX/UI Triad · Image-First Pipeline · 5-Dim Audit Standard  
> **Mục tiêu:** Mọi AI model tầm trung tạo UI đẹp ngang Claude + Codex. Triệt tiêu 100% mùi AI-slop.

---

## ⚡ Khi Nào Kích Hoạt

Tự động khi người dùng yêu cầu:
- "làm UI", "thiết kế web", "tạo landing page", "code frontend", "giao diện web"
- "làm component", "sửa giao diện", "làm form", "thiết kế dashboard"
- "tạo ảnh tham chiếu", "image reference", "Tailwind UI", "v0 design"

---

## 🏛️ Pipeline 4 Bước (Image-First + Lint Guard)

```
[BƯỚC 0: IMAGE REFERENCE]  ──▶ [BƯỚC 1: TOKENS]  ──▶ [BƯỚC 2: CODE]  ──▶ [BƯỚC 3: LINT]
  Sinh ảnh tham chiếu              Pre-inject 4         Antigravity        Auto double-check,
  từng section riêng               token cứng           code HTML/         tự vá, rồi giao
  (Taste: 1 ảnh/section)                                Tailwind/React
```

**Bước 0 — Khi nào bắt buộc sinh ảnh trước?**
- Task là landing page / marketing site / product page mới hoàn toàn → **bắt buộc**.
- Task chỉ là sửa component nhỏ / form / dashboard → skip Bước 0, đi thẳng Bước 1.

---

## 🎨 Bước 0: Image-First Reference (Học từ Taste Skill)

> "Thay vì để AI tự tưởng tượng, hãy cho nó học từ hình ảnh đẹp trước." — Taste Skill

**Quy tắc bắt buộc:**
- Sinh **1 ảnh riêng biệt (horizontal 16:9) cho TỪNG section** — không nhét nhiều section vào 1 frame.
- `landing page` không có số section → mặc định **6 section = 6 ảnh** (Hero · Proof · Pain/Solution · Bento · Pricing · CTA).
- `full website` → 8 ảnh. `product page` → 6 ảnh.
- Dùng `abs-image-prompt-engine` để mở rộng prompt ảnh.

**Bố cục Hero — Chống AI Default:**
- **CẤM dùng left-text / right-image theo mặc định** (đây là pattern AI nhàm nhất).
- Ưu tiên: `centered over full-bleed image` · `bottom-left text over background` · `stacked center` · `off-grid editorial offset`.
- Chỉ dùng left-text/right-image khi đó thực sự là lựa chọn tốt nhất.

**4 Chế độ thiết kế (chọn 1 trước khi code):**
| Mode | Khi nào | Ưu tiên |
|------|---------|---------|
| **Persuade** | Landing page, marketing, pricing | Kiếm sự chú ý và hành động |
| **Operate** | App UI, dashboard, form, admin | Scanability, consistency |
| **Read** | Docs, blog, hướng dẫn | Cấu trúc rõ, đọc dễ chịu |
| **Experience** | Portfolio, showcase | Artifact dẫn đầu |

---

## 🎯 Bước 1: 4 Token Cứng Bắt Buộc

Trước khi viết bất kỳ dòng code nào:

1. **Background Cực Sâu:** `bg-zinc-950` (`#09090b`) · `bg-slate-950` · `bg-[#08090a]`  
   **CẤM:** `bg-gray-800`, `bg-gray-900`

2. **Accent High-Contrast:** Emerald `#10b981` · Teal `#14b8a6` · Amber `#f59e0b` · Cyber Blue `#06b6d4`  
   **CẤM:** gradient tím-hồng (`from-purple-500 to-pink-500`), pink-to-orange creator gradient

3. **Font chuẩn (ABS Standard):**  
   Heading: `Plus Jakarta Sans` · `Inter Tight` · `Oswald` · `Bricolage Grotesque` (kèm `tracking-tight`)  
   Body: `Inter` · `Be Vietnam Pro`  
   **CẤM TIỆT:** `Space Grotesk` · `Syne` · `Outfit` · `Sora` · `Chivo` · `Unbounded` · gradient headline text

4. **Lưới 8pt + Bo góc:** `p-6`/`p-8` · `gap-6` · `rounded-xl` · `border border-white/10`  
   **CẤM:** pill button `rounded-full px-12+` · `animate-bounce` · `conic-gradient`

---

## 🛠️ Bước 2: Dựng Code Chuẩn

Mọi giao diện phải có:
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- 100% SVG Icons inline (Lucide SVG) — **CẤM Emoji làm icon**
- Trạng thái tương tác: `hover:opacity-90 active:scale-[0.98] transition-all`
- Copy: ngắn, cụ thể, believable — **CẤM:** "unleash", "revolutionize", "next-gen", "seamless platform"

**Gradient được phép (Taste Skill):**  
✅ `low-chroma palette-matched tonal grade` (ink → graphite, cream → sand)  
✅ `single-hue atmospheric grade behind photography`  
❌ rainbow / mesh blob / purple-blue AI default / gradient headline text

---

## 🔍 Bước 3: Cổng Chặn Tự Động

Sau khi tạo file xong, **tự động chạy ngay**:

```bash
node /root/vibe-design-harness/bin/cli.js lint <file.html>
```

- **PASSED (Exit 0):** Bàn giao ngay.
- **FAIL (Exit 2):** Đọc lỗi → tự patch → chạy lại → mới giao.

```bash
# Auto-fix + re-lint
node /root/vibe-design-harness/bin/cli.js fix <file.html>
node /root/vibe-design-harness/bin/cli.js lint <file.html>
```

---

## 🔎 Audit Checklist (sau khi build)

Chấm điểm 5 chiều (0-4 mỗi chiều, tổng 20):
1. **Accessibility** — contrast ≥4.5:1, ARIA, keyboard nav, semantic HTML
2. **Performance** — không layout thrash, lazy load ảnh, không `will-change` tràn lan
3. **Theming** — dùng design tokens, dark mode không vỡ
4. **Responsive** — touch target ≥44px, không overflow ngang, mobile-first
5. **Implementation Integrity** — không generic, có POV rõ ràng, không product-agnostic

Rating: 18-20 Excellent · 14-17 Good · 10-13 Acceptable · ≤9 cần rebuild.

---

## 💻 CLI Commands

```bash
npx vibe-design-harness scaffold luxury_editorial my_page.html
npx vibe-design-harness lint component.html
npx vibe-design-harness fix component.html
npx vibe-design-harness design-system luxury_gold "#d4af37"
npx vibe-design-harness expand "Luxury skincare serum bottle on dark granite" luxury_editorial
```

---

## 📚 Khi Cần Đi Sâu Hơn

- Palette / font ngành cụ thể: `skill_view(name="abs-ux-ui-triad")`
- 21 Hallmark themes, study URL/ảnh: `skill_view(name="hallmark")`
- 3D WebGL / Canvas effects: `skill_view(name="threeui")`
