# VibeDesign-Harness 🎨🤖

[![npm version](https://img.shields.io/npm/v/vibe-design-harness.svg?color=emerald)](https://www.npmjs.com/package/vibe-design-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Server Compatible](https://img.shields.io/badge/MCP%20Server-v1.6.0-purple.svg)](https://modelcontextprotocol.io)
[![Runtime: 100% Pure JS](https://img.shields.io/badge/Runtime-100%25%20Pure%20JS%20(Zero%20Python)-brightgreen)](https://github.com/teddiesloco/vibe-design-harness)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Gemini%20%7C%20Codex%20CLI%20%7C%20Claude%20%7C%20Hermes-emerald)](https://github.com/teddiesloco/vibe-design-harness)

> **Studio-Grade UI/UX Design System Engine, Pro Component Assembler & Anti-Slop Harness for AI Coding Agents. Guarantees insanely beautiful, world-class Websites, SaaS WebApps, and Mini Apps with Zero AI-Slop.**

---

## 🎯 Vấn Đề Nhức Nhối Của Mọi Coding Agent Hiện Nay

Khi dùng AI (Claude 3.7 Sonnet, OpenAI Codex CLI, Gemini Flash, Hermes, Cursor) để code giao diện:
1. **Bệnh "AI-Slop" (Giao diện rác & sến súa):** AI tự động phang màu tím generic (`from-purple-600 to-indigo-600`), nền xám rửa trôi bạc phếch (`bg-gray-800`), font chữ mặc định Times/Arial, và các nút bấm thô thiển không có micro-interactions.
2. **Gãy bố cục & Tỷ lệ xộc xệch (Layout Drift):** AI không có mắt thẩm mỹ về khoảng thở (whitespace), visual hierarchy bị phẳng lỳ, card bento bị lệch tỷ lệ, padding/margin chật chội.
3. **Cực hình Copy-Paste (Component Fatigue):** Phải mở 5-7 tab web (Magic UI, Aceternity, Shadcn) copy từng đoạn JSX/Framer Motion nhét vào context làm tốn hàng chục ngàn input token và dễ xung đột dependencies.

---

## 💎 VibeDesign-Harness Giải Quyết Triệt Để Ra Sao?

**`vibe-design-harness` biến mọi Coding Agent thành một Senior UI/UX Designer & Frontend Architect thực thụ:**

* 🌟 **Đẹp Tuyệt Đối Cho Mọi Sản Phẩm Số:**
  * **High-Converting Websites & Landing Pages:** Hero spotlight hào quang, Asymmetric Bento Grid 4 tầng, bảng giá 3 tier chuyển đổi cao.
  * **SaaS WebApps & Dashboards:** Chuẩn Dark Mode chiều sâu đa tầng (`#08090a` -> `#121417`), viền border sắc nét (`#22252a`), Typography tỉ lệ vàng.
  * **Telegram / Mobile Mini Apps:** Giao diện tối ưu touch gesture, backdrop-blur mờ ảo, safe-area margins chuẩn iOS/Android.
* 🛡️ **Linter Chặn Rác UI/UX Tất Định (<1ms):** Bắt và diệt 100% gradient tím sến, nền xám bẩn và button thiếu style ngay trước khi render.
* 🎨 **12+ Design System Themes Thượng Hạng:** Vogue Luxury Editorial, Swiss Minimalism, Luxury Gold, Quiet Luxury, Nordic Clean, Zen Japanese, Linear, Stripe, Vercel, Glassmorphism...
* 📸 **Universal Visual Engine:** Tự động mở rộng prompt ảnh chuẩn máy ảnh Hasselblad/Leica cho Midjourney, FLUX.1, SDXL, Imagen, GPT Image.

---

## 🏆 Bảng So Sánh Chiến Lược

| Tiêu Chí | Cách Làm Cũ (Magic UI / Aceternity) | Dùng Starter Template | Prompt AI Chay | **VibeDesign-Harness v1.1.0** 👑 |
| :--- | :--- | :--- | :--- | :--- |
| **Độ Thẩm Mỹ UI/UX** | Đẹp (nhưng rời rạc) | Quen mắt, khó đột phá | ❌ Xấu, sến (AI-slop) | **💎 Studio-Grade (Đẳng cấp 12 themes)** |
| **Hỗ trợ Web, App, Mini App**| ⚠️ Chỉ có component lẻ | ⚠️ Bị đóng khung | ❌ Dễ gãy responsive | **🚀 Chuẩn 100% Website, WebApp, Mini App** |
| **Công sức ra lệnh** | ⚠️ Phải copy-paste tay | ⚠️ Phải sửa cả repo | ⚡ Gõ 1 câu | **⚡ 1 Lệnh CLI hoặc 1 MCP Tool Call** |
| **Chất lượng code** | Phụ thuộc thư viện ngoài | Thừa file, nặng nề | Hên xui | **⚡ Pure HTML + Modern Tailwind (Zero Bloat)** |
| **Kiểm soát chất lượng** | ❌ Không có | ❌ Không có | ❌ Không có | **🛡️ Deterministic Anti-Slop Linter** |

---

## 🚀 Hướng Dẫn Sử Dụng (CLI & NPX)

### 1. Sinh trọn bộ giao diện đỉnh cao trong 1 giây:
```bash
# Giao diện Luxury Editorial (Thời trang, trang sức, luxury real estate)
npx vibe-design-harness scaffold luxury_editorial luxury_site.html

# Giao diện Swiss Minimalism (SaaS, WebApp, Fintech, AI Tool)
npx vibe-design-harness scaffold minimalism webapp.html

# Giao diện Glassmorphism / Cyberpunk (Telegram Mini App, Web3, Crypto)
npx vibe-design-harness scaffold glassmorphism_dark miniapp.html
```

### 2. Kiểm định và loại bỏ rác AI-slop:
```bash
npx vibe-design-harness lint my_component.html
```

### 3. Mở rộng Prompt tạo ảnh đỉnh cao (Mọi Model AI):
```bash
npx vibe-design-harness expand "Luxury diamond wristwatch on dark marble" luxury_editorial
```

---

## 🔌 Tích Hợp MCP Server (Claude Code, Cursor, Hermes)

Thêm vào cấu hình MCP (`claude_desktop_config.json` hoặc Cursor):

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

---

## 📄 Bản Quyền & Tác Giả

MIT License © 2026 [@teddiesloco](https://github.com/teddiesloco) — Built for the Autonomous AI Era.
