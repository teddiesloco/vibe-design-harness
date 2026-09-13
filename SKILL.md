---
name: vibe-harness-design
description: "Universal AI Agent UI/UX Design System Engine & Anti-Slop Harness for Frontend, Landing Pages, and Web Apps."
version: 1.4.0
---

# Vibe-Harness-Design (Universal UI/UX Design & Anti-Slop Engine) 🎨🤖

Universal AI Agent UI/UX Design System Engine, Full Landing Page Assembler & Multi-Model Image Prompt Harness for Antigravity, Gemini 3.8 Flash High, Claude, Codex & Hermes.

> **Mục tiêu tối thượng:** Hợp nhất **ABS Design Tokens + Hallmark 57 Slop Gates + UX/UI Triad + Deterministic Double-Check Gate** để Antigravity / Gemini 3.8 Flash High tạo ra sản phẩm UI/UX và Landing Page đẹp, sắc nét, sang trọng ngang tầm Claude Sonnet 4-6 và Codex, triệt tiêu 100% mùi AI-slop.

---

## ⚡ Khi Nào Kích Hoạt (Auto Triggers)

Tự động kích hoạt khi người dùng yêu cầu:
- "làm UI", "thiết kế web", "tạo landing page", "code frontend", "giao diện web"
- "làm component", "sửa giao diện", "làm form", "thiết kế dashboard"
- "Tailwind UI", "v0 design", "HTML/CSS giao diện"

---

## 🏛️ Pipeline Thực Thi 3 Bước Tự Động

```
[BƯỚC 1: PRE-INJECT TOKENS] ──▶ [BƯỚC 2: CODE ENGINE] ──▶ [BƯỚC 3: AUTO DOUBLE-CHECK]
  (Bắt buộc dark token,       (Antigravity dựng code      (Chạy linter bắt slop,
   font chuẩn, cấm gradient)     HTML/Tailwind/React)        tự sửa nếu lỗi trước khi giao)
```

---

## 🎨 Bước 1: 4 Token Cứng Bắt Buộc (UX/UI Triad & Hallmark)

Trước khi viết bất kỳ dòng code HTML/CSS nào, model **bắt buộc tuân thủ 4 quy tắc**:

1. **Background Cực Sâu (Deep Dark):**
   - Dùng: `bg-zinc-950` (`#09090b`), `bg-slate-950` (`#020617`), hoặc `bg-[#08090a]`.
   - **CẤM:** Xám xi măng lười biếng (`bg-gray-800`, `bg-gray-900`, `#1f2937`).

2. **Màu Điểm Nhấn (Accent High-Contrast):**
   - Dùng: Emerald (`#10b981`), Teal (`#14b8a6`), Amber Gold (`#f59e0b`), hoặc Cyber Blue (`#06b6d4`).
   - **CẤM:** Gradient tím-hồng AI-slop (`from-purple-500 to-pink-500`, `from-blue-500 to-purple-600`).

3. **Font Typography Chuẩn (Hallmark Gate):**
   - **Heading:** `Plus Jakarta Sans`, `Inter Tight`, `Oswald`, hoặc `Bricolage Grotesque` (kèm `tracking-tight`).
   - **Body:** `Inter`, `Be Vietnam Pro`, hoặc `Plus Jakarta Sans`.
   - **CẤM TIỆT:** `Space Grotesk`, `Syne`, `Outfit`, `Sora`, `Chivo`, `Unbounded`. CẤM heading in nghiêng (`italic`).

4. **Lưới 8pt & Bo Góc Tinh Tế:**
   - Card padding: `p-6` hoặc `p-8`. Gap: `gap-6`.
   - Border radius: `rounded-xl` hoặc `rounded-2xl` mỏng viền `border border-white/10`.
   - **CẤM:** Nút bấm con nhộng dài ngoẵng AI-slop (`rounded-full px-12`).

---

## 🛠️ Bước 2: Dựng Code Chuẩn v0/Tailwind + Hallmark

Mọi giao diện dựng ra phải có đủ:
- Thẻ `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- 100% SVG Icons inline (Lucide SVG), **tuyệt đối CẤM dùng Emoji làm icon**
- Đủ trạng thái tương tác cơ bản: `hover:opacity-90 active:scale-[0.98] transition-all`
- 6 khối phễu nếu là Landing Page: Hero ➔ Proof ➔ Pain/Solution ➔ Bento Grid ➔ Pricing ➔ FAQ/CTA

---

## 🔍 Bước 3: Cổng Chặn Tự Động (Auto Double-Check Gate)

Sau khi tạo file HTML xong, **tự động chạy ngay lệnh linter trong terminal**:

```bash
# Linter từ repo vibe-design-harness (Zero Dependency)
node /root/vibe-design-harness/bin/cli.js lint <đường_dẫn_file.html>
```
hoặc:
```bash
bash /root/.hermes/skills/devops/double-check/scripts/double-check-content.sh <đường_dẫn_file.html>
```

- **Nếu PASSED (Exit 0):** Bàn giao kết quả ngay cho người dùng.
- **Nếu FAIL (Exit 2):** Đọc lỗi trong log ➔ **Tự động patch lại code ngay lập tức** (hoặc dùng `node /root/vibe-design-harness/bin/cli.js fix <file>` để auto-remediate) rồi mới bàn giao.

---

## 💻 Available CLI Commands

```bash
# 1. Scaffold full landing page theo theme
npx vibe-design-harness scaffold luxury_editorial my_page.html
npx vibe-design-harness scaffold minimalism

# 2. Lint UI code chống slop
npx vibe-design-harness lint component.html

# 3. Tự động sửa lỗi slop
npx vibe-design-harness fix component.html

# 4. Xuất bộ Design Tokens
npx vibe-design-harness design-system luxury_gold "#d4af37"

# 5. Mở rộng prompt hình ảnh Studio/Optics chuẩn cho FLUX/Midjourney
npx vibe-design-harness expand "Luxury skincare serum bottle on dark granite" luxury_editorial
```

---

## 🔌 MCP Server Integration

Thêm vào `claude_desktop_config.json`, Cursor MCP hoặc Hermes config:

```json
{
  "mcpServers": {
    "vibe-design-harness": {
      "command": "npx",
      "args": ["-y", "vibe-design-harness-mcp"]
    }
  }
}
```
