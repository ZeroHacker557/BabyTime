# Baby Time — Website Master Prompt

> Bu faylni to'liq nusxalab AI website builder'ga (Claude, v0.dev, Lovable, Cursor, Bolt) bering.
> Logotipni ham yuklang — u ranglarni aniq olishi uchun.

---

## MASTER PROMPT (English — copy everything below)

You are a senior product designer and front-end engineer with a portfolio of Awwwards-winning
marketing sites for consumer mobile apps (think: Calm, Duolingo, Headspace, Cal.com quality bar).
Your task is to design and build the official marketing website for **Baby Time**.

The single most important success metric of this website is: **a visitor lands, instantly
understands the product, trusts the brand, and taps "Download" on the App Store or Google Play.**
Everything on the page serves that one action.

---

### 1. PRODUCT CONTEXT

**Baby Time** is a mobile app (iOS + Android) operating in Uzbekistan.

What it does: when parents are busy — work, meetings, errands, appointments — they open the app,
see verified kindergartens and childcare centers **on an interactive map**, filter by distance and
availability, **pick a specific date and time slot**, and book a place for their child. Drop the
child off, go handle your day, pick them up. Hourly/flexible childcare, booked in under 60 seconds.

Core value props (build the page around these four):
1. **Map-first discovery** — see every kindergarten near you, with real distance and open slots.
2. **Book by date & time** — not a monthly subscription; you book exactly the hours you need.
3. **Verified & safe** — licensed centers, staff credentials, photos, parent reviews, ratings.
4. **Instant confirmation** — booking confirmed in the app, no phone calls, no paperwork.

Audience: working parents aged 25–40 in Tashkent and regional cities. Mostly mobile users.
Mothers are the primary decision-maker. They are cautious — **trust and safety must be visually
loud**, not buried in fine print.

Emotional tone: warm, calm, reassuring, energetic but never chaotic. The message is
*"you are a good parent, and we've got you covered."* Never make the visitor feel guilty for
needing childcare. Never look like a cheap directory or a coupon site.

---

### 2. BRAND FOUNDATION

**Logo:** a vivid green circle rendered as a clock face (tick marks around the edge), containing a
smiling cartoon boy's face with bold black hair. Below it, the wordmark "BABY TIME" in a heavy,
rounded, playful black display typeface. The concept is literal and strong: **time + childhood**.

**Color system** — sample the exact green from the supplied logo file, then build this scale:

| Token | Value (approx — refine from logo) | Use |
|---|---|---|
| `--brand-500` | `#5CC421` (vivid brand green) | primary CTAs, active states, accents |
| `--brand-600` | `#4AA518` | CTA hover, pressed |
| `--brand-100` | `#E8F8DC` | soft section backgrounds, badges, chips |
| `--brand-50`  | `#F4FCEE` | large tinted panels |
| `--ink-900`   | `#0E1210` (near-black, slight green cast) | headlines, wordmark |
| `--ink-600`   | `#4A524D` | body copy |
| `--ink-400`   | `#8A928C` | captions, meta |
| `--surface`   | `#FFFFFF` | cards, base |
| `--canvas`    | `#F7F9F7` | page background between white cards |
| `--warm-accent` | `#FFB43D` (soft amber) | secondary accent only — ratings, highlights |

Rules: green is a **precision instrument**, not a paint bucket. Roughly 70% white/near-white,
20% ink, 10% green. Never a full-viewport saturated green hero. Never green text on green.
Amber appears at most 3 times on the whole page.

**Typography:**
- Display/headings: a geometric rounded sans with real personality and heavy weights —
  `Nunito`, `Baloo 2`, or `Poppins` at 700–800. It must feel like a sibling of the logo wordmark.
- Body/UI: a clean neutral sans — `Inter` at 400/500/600.
- Scale (fluid, `clamp()`): H1 `clamp(2.6rem, 6vw, 4.8rem)` / H2 `clamp(2rem, 4vw, 3.2rem)` /
  body `1.0625rem` at `1.65` line-height. Headline tracking `-0.02em`. Body max width `65ch`.
- Uzbek and Russian text is longer than English — every font must have full Latin **and Cyrillic**
  coverage, and no layout may break when a headline grows 30% longer.

**Shape language:** generously rounded. Cards `24px`, buttons fully pill-shaped, images `20–28px`.
This echoes the circular logo. No sharp 90° corners anywhere except the header divider.

**Shadows:** soft, large, low-opacity, tinted with the brand green rather than pure black —
e.g. `0 20px 48px -16px rgba(46,90,20,0.14)`. Never a hard grey box-shadow.

---

### 3. PAGE STRUCTURE

Build a single-page site (with separate routes for legal + contact). Section by section:

**Header (sticky, transparent → frosted white on scroll)**
Logo left. Center nav: Imkoniyatlar · Qanday ishlaydi · Bog'chalar uchun · Savollar.
Right: language switcher (UZ / RU / EN) + pill "Ilovani yuklab olish" button.
Mobile: full-screen slide-in menu with large tappable rows and the CTA pinned at the bottom.

**1. Hero** — the most important 600px on the internet for this brand.
- Left column: eyebrow chip (`--brand-100` background, green text) reading
  "Endi O'zbekistonda · iOS va Android".
  H1: **"Bolangiz uchun eng yaqin bog'cha — bir necha soniyada"**.
  Sub: one sentence, max 22 words, explaining map + date/time booking.
  Two App Store / Google Play badges (official SVG badges, dark variant, correct proportions,
  never stretched, never recolored — brand guideline compliance matters).
  Below badges: a thin trust row — ★ 4.9 rating · 200+ verified kindergartens · 10,000+ bookings.
  (Use placeholder numbers only if real ones are supplied later; mark them clearly as `TODO:`.)
- Right column: a **floating phone mockup** showing the app's map screen with kindergarten pins.
  Give it a gentle idle float animation (6s, 12px travel, `ease-in-out`, infinite).
  Behind it: a soft green radial glow and 2–3 blurred organic blob shapes — subtle, low opacity.
  Around the phone, 2 small "floating UI cards" break out of the frame — one showing a booking
  confirmation ("Bugun 09:00–13:00 · Tasdiqlandi ✓"), one showing a kindergarten card with rating.
  These are the single strongest visual device on the page. Make them beautiful.
- Background: white/`--canvas`, with a very subtle dotted or grid texture at 3% opacity.

**2. Logo/trust strip** — a quiet grayscale row: "X ta bog'cha bizga ishonadi" + partner marks,
  or, if none exist yet, replace with three inline stat counters that animate on scroll.

**3. Features (4 cards, 2×2 on desktop)**
One card per value prop from section 1. Each card: a custom line-illustration icon in a
`--brand-100` rounded square, a 3–5 word title, two lines of copy. On hover: lift 6px, shadow
deepens, icon square fills to `--brand-500` with a white icon — a 200ms spring.
Do **not** use generic stock icon-font glyphs. Draw simple, consistent 2px-stroke SVG icons:
map pin, calendar-clock, shield-check, bell/confirmation.

**4. "Qanday ishlaydi" — 3 steps**
Horizontal on desktop, vertical timeline on mobile, connected by a dashed green line that
**draws itself as the user scrolls** (SVG `stroke-dashoffset` animation).
Step 1 *Bog'chani tanlang* — map screenshot. Step 2 *Sana va vaqtni belgilang* — date/time picker
screenshot. Step 3 *Bolangizni olib boring* — confirmation screenshot.
Each step gets a large ghosted numeral (01/02/03) in `--brand-100` behind the content.

**5. App showcase — the scroll-driven centerpiece**
A sticky section where the phone stays pinned in the viewport while text panels scroll past on the
side, and the screen inside the phone **cross-fades between app screenshots** in sync with the
active panel. 3–4 screens. This is the section that makes the site feel expensive.
Provide a graceful non-sticky stacked fallback on mobile and under `prefers-reduced-motion`.

**6. Safety & trust section** — visually distinct, on a `--brand-50` panel.
Headline about safety. Four checkmark rows: litsenziyalangan bog'chalar, tekshirilgan
tarbiyachilar, ota-onalar sharhlari, xavfsiz to'lov. Beside it, a photo of a bright, happy
classroom in a rounded frame with a green "Tasdiqlangan ✓" badge overlapping the corner.

**7. Testimonials** — 3 parent quotes in soft cards, each with avatar, name, city, 5 stars.
Slow auto-scrolling marquee on mobile, static grid on desktop. Real quotes only, or clearly
labelled placeholders.

**8. For kindergartens (B2B)** — a dark or deep-green full-bleed band, deliberately contrasting
with the rest of the page. "Bog'cha egasimisiz? Baby Time'ga qo'shiling." Three benefit bullets +
a secondary outline CTA leading to a partner sign-up form.

**9. FAQ** — 6–8 accordion items, smooth height animation, only one open at a time.
Cover: narxlar, xavfsizlik, bekor qilish, yosh chegarasi, to'lov usullari, qamrov hududlari.

**10. Final CTA** — full-width `--brand-500` band with a soft organic top edge (SVG wave or blob
mask, not a straight line). Big white headline, both store badges, and a QR code that opens the
correct store per device. Optional: subtle white confetti/dot pattern at 8% opacity.

**11. Footer** — 4 columns: brand + short blurb + social icons · Ilova · Kompaniya ·
Yuridik (Maxfiylik siyosati, Foydalanish shartlari, Ommaviy oferta).
Bottom bar: © 2026 Baby Time · language switcher · contact email and phone.

---

### 4. MOTION DESIGN

- Every section enters on scroll: `opacity 0→1` + `translateY(24px→0)`, `600ms`,
  `cubic-bezier(0.16, 1, 0.3, 1)`, staggered `80ms` between siblings. Trigger once, at 15% visible.
- Buttons: `scale(1.02)` + shadow lift on hover, `scale(0.98)` on press, `180ms`.
- Hero phone: infinite idle float. Floating cards drift on a slightly different offset so they
  never move in lockstep.
- Numbers count up when their section enters the viewport.
- **Hard rule:** `@media (prefers-reduced-motion: reduce)` disables all transforms and
  auto-playing motion, keeping only instant opacity changes. Non-negotiable.
- Never: parallax on text, spinning elements, bouncing CTAs, entrance animations on every
  paragraph, anything that delays the visitor from reaching a download badge.

---

### 5. TECHNICAL REQUIREMENTS

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.
  If a single-file deliverable is requested instead, produce one self-contained `index.html`
  with inlined CSS/JS and zero external runtime dependencies.
- **Design tokens first:** define the full color, spacing, radius, shadow, and type scale as CSS
  custom properties / Tailwind theme extensions before writing any component. No hard-coded hex
  values in markup.
- **Mobile-first**, then `640 / 768 / 1024 / 1280 / 1536`. Test mentally at 360px width — most
  visitors arrive there. Touch targets ≥ 44px. Nothing may scroll horizontally, ever.
- **Smart store routing:** detect the user agent and make the primary CTA deep-link to the App
  Store on iOS, Google Play on Android, and show both badges on desktop.
- **Performance:** Lighthouse ≥ 95 on all four categories. LCP < 2.0s on 4G — Uzbek mobile
  networks are not fast. Next-gen image formats, explicit `width`/`height` to prevent CLS,
  lazy-load everything below the fold, `next/font` with `display: swap`, self-hosted fonts,
  no render-blocking third-party scripts.
- **Accessibility:** WCAG 2.1 AA. Verify contrast — **`--brand-500` green on white fails for body
  text, so never use it for small text; use it for large headlines, icons, and as a background
  behind white text only.** Full keyboard navigation, visible focus rings in brand green,
  semantic landmarks, `alt` text on every image, `aria-expanded` on the FAQ accordion,
  a skip-to-content link.
- **i18n:** ship UZ (Latin) as default, plus RU and EN. Keep all copy in per-locale JSON files —
  never hard-code strings into components.
- **SEO:** unique title + meta description, Open Graph and Twitter card images (1200×630),
  `SoftwareApplication` + `FAQPage` + `Organization` JSON-LD, canonical URL, `hreflang` for the
  three locales, `sitemap.xml`, `robots.txt`, favicon set from the logo mark.
- **Code quality:** small, single-purpose, typed components. Content lives in data arrays at the
  top of each section file so it can be edited without touching JSX. Clear folder structure.
  Comment only where intent isn't obvious from the code.

---

### 6. WHAT WOULD MAKE THIS FAIL

Avoid these completely — they are the difference between a template and a brand site:

- Generic Bootstrap/AI-builder layout: centered hero, three grey feature boxes, done.
- Purple/blue gradients. This brand is green. Do not import someone else's SaaS palette.
- Stock photos of unnaturally happy families in a white studio. If photos are used, they must look
  like real Uzbek kindergartens and real local families.
- Rainbow "kids app" clichés — Comic Sans energy, primary-color confetti, wobbling cartoons.
  Baby Time sells to *parents*, and parents buy calm competence. Playful, not childish.
- Walls of text. Every section: one clear idea, one headline, ≤ 2 lines of support copy.
- Fake numbers, fake reviews, or invented awards. Mark unknown data as `TODO:` in the code.
- More than two competing CTAs in one viewport. Downloading the app always wins.
- Modified store badges (recolored, restretched, custom-drawn). Use the official assets exactly.

---

### 7. DELIVERABLES

1. A brief design rationale (≤ 150 words) explaining the visual direction before you write code.
2. The complete, production-ready, runnable codebase.
3. `tokens.css` (or the Tailwind theme config) as a standalone, reusable design system.
4. All copy in UZ / RU / EN locale files.
5. A short README: how to run it, where to swap the store URLs, screenshots, and real statistics.

Start with the design rationale, then build. If any product detail is missing (real download
links, pricing, actual kindergarten count), make a sensible assumption, mark it `TODO:` in the
code, and list every assumption at the end — do not stop to ask.

---

## Ishlatish bo'yicha izoh (UZ)

- **Logotipni albatta yuklang** — AI yashil rangning aniq HEX kodini logotipdan olsin.
- **Ilova skrinshotlari** bo'lsa, ularni ham yuklang. Bo'lmasa AI mockup chizadi, keyin
  almashtirasiz.
- Real ma'lumotlarni promptda `TODO:` o'rniga yozib qo'ying: bog'chalar soni, App Store/Play
  havolalari, telefon, email, ijtimoiy tarmoqlar.
- Natija yoqmasa, butun promptni qayta yubormang — faqat kerakli bo'limni ayting:
  *"Hero bo'limini qayta ishla: telefon mockup kattaroq, sarlavha qisqaroq."*
