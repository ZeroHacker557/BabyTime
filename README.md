# Baby Time — rasmiy sayt

Marketing website for the Baby Time app. Next.js (App Router) + TypeScript + Tailwind + Framer Motion.
Uch tilda: **UZ** (asosiy), **RU**, **EN**.

---

## Ishga tushirish

```bash
npm install
```

```bash
npm run dev
```

Sayt: `http://localhost:3000` → avtomatik `/uz` ga o'tadi.

Production build:

```bash
npm run build
```

---

## 🚨 Ishga tushirishdan oldin: majburiy TODO ro'yxati

Kodda hamma joyda `TODO:` deb belgilangan. Eng muhimlari:

| # | Nima | Fayl |
|---|---|---|
| 1 | **App Store va Play Market havolalari** | `src/lib/site.ts` |
| 2 | **Domen, email, telefon, ijtimoiy tarmoqlar** | `src/lib/site.ts` |
| 3 | **Hero'dagi raqamlar** (4.9 / 200+ / 10 000+) — hozir o'ylab topilgan | `src/lib/site.ts` + `src/i18n/dictionaries/*.json` → `hero.stats` |
| 4 | **Rasmiy store badge'lari** — hozirgilar o'rinbosar, tovar belgisi talabiga javob bermaydi | `src/components/ui/StoreBadges.tsx` |
| 5 | **QR kod** — hozirgi naqsh skanerlanmaydi | `src/components/FinalCta.tsx` |
| 6 | **Maxfiylik siyosati / shartlar / oferta** — yuristdan olinishi shart | `src/app/[locale]/{privacy,terms,offer}/page.tsx` |
| 7 | **Sharhlar** — hozirgilari to'qima | `src/i18n/dictionaries/*.json` → `testimonials.items` |
| 8 | **Hamkor bog'chalar nomlari** | `src/components/TrustStrip.tsx` |
| 9 | **OG rasm** `1200×630` → `public/og.png` | `src/app/[locale]/layout.tsx` |
| 10 | **Rasmiy logotip SVG** — hozirgisi qayta chizilgan nusxa | `src/components/ui/Logo.tsx`, `public/favicon.svg` |
| 11 | **FAQ javoblari** — narx, yosh, to'lov, qamrov bo'yicha | `src/i18n/dictionaries/*.json` → `faq.items` |
| 12 | **Bog'cha surati** — Safety bo'limidagi illustratsiya o'rniga | `src/components/Safety.tsx` |

> ⚠️ 3, 5, 6 va 7-punktlar **huquqiy/ishonch masalasi**. To'qima reyting yoki sharh bilan chiqish —
> ota-onalar ishonchini yo'qotishning eng tez yo'li, `aggregateRating` esa Google'ning
> structured data qoidasini buzadi (`src/app/[locale]/page.tsx` ichida izoh bor).

### Store badge'larini almashtirish

Rasmiy SVG'larni yuklab oling va `public/badges/` ichiga qo'ying:

- App Store — https://developer.apple.com/app-store/marketing/guidelines/
- Google Play — https://play.google.com/intl/en_us/badges/

So'ng `src/components/ui/StoreBadges.tsx` ichidagi ikkita `<svg>` blokini `<Image>` bilan almashtiring.
Badge'larni **hech qachon** rangini o'zgartirmang, cho'zmang yoki qayta chizmang.

---

## Loyiha tuzilishi

```
src/
  app/
    tokens.css              ← 🎨 butun brend shu yerda. Boshqa joyda hex yo'q.
    globals.css             ← type scale, shell, reduced-motion
    sitemap.ts / robots.ts
    [locale]/
      layout.tsx            ← shriftlar, metadata, hreflang, OG
      page.tsx              ← 11 ta bo'lim + JSON-LD
      contact|privacy|terms|offer/
  components/
    Header · Hero · TrustStrip · Features · HowItWorks · AppShowcase
    Safety · Testimonials · ForKindergartens · Faq · FinalCta · Footer
    ui/  Logo · Phone · AppScreen · StoreBadges · Reveal · Counter
         LangSwitcher · Icons
  i18n/
    config.ts
    dictionaries/uz.json · ru.json · en.json   ← 📝 butun matn shu yerda
  lib/
    site.ts                 ← 🔧 havolalar, kontaktlar, raqamlar
    usePlatform.ts          ← iOS/Android aniqlash → to'g'ri store
```

**Matnni o'zgartirish uchun kodga tegish shart emas** — `src/i18n/dictionaries/*.json` yetarli.
`uz.json` — shakl namunasi; `ru.json` va `en.json` unga to'liq mos bo'lishi kerak (TypeScript tekshiradi).

---

## Dizayn tizimi

`src/app/tokens.css` — mustaqil fayl, boshqa loyihalarga ham ko'chirsa bo'ladi.

- **Yashil 70/20/10 qoidasi** — 70% oq, 20% ink, 10% yashil. Yashil butun ekranni egallamaydi.
- **`--brand-500` kichik matn uchun ishlatilmaydi** — oq fonda WCAG AA dan o'tmaydi.
  Faqat katta sarlavha, ikonka yoki oq matn ortidagi fon sifatida.
- **Radiuslar** logotipdagi doiradan keladi: karta 24px, tugma to'liq pill.
- **Soyalar** yashil rangga bo'yalgan (`rgba(46,90,20,…)`), neytral kulrang emas.
- **Amber** butun sahifada 3 martadan ko'p uchramaydi.

### Animatsiya

Bitta kirish animatsiyasi: `opacity 0→1` + `translateY(24px→0)`, 600ms,
`cubic-bezier(0.16,1,0.3,1)`, siblinglar orasida 80ms stagger — `<Reveal>` komponenti.

`prefers-reduced-motion: reduce` da barcha transform va takrorlanuvchi harakat o'chadi.
Bu shart — sozlanadigan narsa emas.

---

## Ilova ekranlari

Telefon ichidagi UI — **haqiqiy skrinshot emas**, DOM'da chizilgan mock
(`src/components/ui/AppScreen.tsx`). Sababi: har qanday ekranda tiniq, 0 KB va
ilova hali chiqmagan bo'lsa ham sayt to'liq ko'rinadi.

Haqiqiy skrinshotlar tayyor bo'lganda: `1170×2532` da eksport qiling, `.webp` ga o'giring,
`public/screens/` ga qo'ying va `AppScreen` o'rniga `<Image>` qo'ying. Telefon ramkasi,
sticky scroll va butun animatsiya o'zgarishsiz qoladi.

---

## Rasmlar karuseli

`src/components/Gallery.tsx` — 6 ta surat o'ngdan chapga uzluksiz suriladi
(`public/gallery/01–06.jpg`). Sichqoncha ustiga kelganda to'xtaydi.

Surat almashtirish: `public/gallery/` ichidagi faylni almashtiring va
`src/i18n/dictionaries/*.json` dagi `gallery.alts` matnini yangilang (uchala tilda).

> ⚠️ **Litsenziya — ishga tushirishdan oldin hal qiling.** Bu 6 ta surat stock/internetdan
> olingan, Baby Time bog'chalarining surati emas. `01.jpg` fayli `stock_GettyImages-473032112`
> nomi bilan kelgan — bu Getty Images mulki, litsenziyasiz tijoriy saytda chop etish
> mualliflik huquqini buzish hisoblanadi.
>
> Yo oltitasiga ham litsenziya sotib oling, yo (afzali) haqiqiy hamkor bog'chalarda
> suratga oling — ota-onalar va markazning yozma roziligi bilan.

Sarlavha ataylab "bizning bog'chalarimiz" emas, "bolangiz kunini shunday o'tkazadi"
deb yozilgan: bu suratlar kayfiyat uchun, aniq bir bog'cha haqidagi da'vo emas.

---

## Qamrov xaritasi

`src/components/CoverageMap.tsx` — Leaflet + CARTO Positron plitalari. API kaliti
kerak emas, to'lov yo'q; attribution (OpenStreetMap © CARTO) huquqiy talab, o'chirmang.

Bog'chalar ro'yxati `src/lib/site.ts` ichidagi `mapPins` massivida.

> ⚠️ **Hozir bu namuna ma'lumot.** Koordinatalar haqiqiy Toshkent tumanlari, lekin
> nomlar — saytning boshqa joyidagi kabi o'rnini bosuvchi nomlar. Hech bir bog'cha
> hali ro'yxatga kirishga rozilik bermagan. Ishga tushirishdan oldin `mapPins` ni
> haqiqiy hamkorlar bilan almashtiring yoki bo'limni butunlay olib tashlang.
> Ota-onaga band qila olmaydigan bog'chani ko'rsatish — ishonchni yo'qotishning
> eng tez yo'li.

Belgini bosganda faqat animatsiya ishlaydi — hech narsa tanlanmaydi va o'zgarmaydi.
Bu ataylab: xarita bu yerda qamrovni ko'rsatadi, band qilish ilovada bo'ladi.

---

## Deploy

Vercel eng oson yo'l (Next.js muallifi):

```bash
npx vercel
```

Deploy'dan oldin `src/lib/site.ts` ichidagi `url` ni haqiqiy domenga o'zgartiring — `sitemap.xml`,
`robots.txt`, canonical va OG teglar hammasi shundan oladi.

---

## Tekshirish ro'yxati (launch checklist)

- [ ] Yuqoridagi 12 ta TODO bajarildi
- [ ] `npm run build` xatosiz o'tadi
- [ ] Lighthouse ≥ 95 (Performance / A11y / Best practices / SEO)
- [ ] 360px kenglikda gorizontal scroll yo'q
- [ ] Klaviatura bilan butun sayt bo'ylab yurish mumkin, focus ring ko'rinadi
- [ ] Uch tilda ham sarlavhalar buzilmaydi
- [ ] Store havolalari iOS va Android'da to'g'ri ochiladi
- [ ] `prefers-reduced-motion` yoqilganda animatsiya to'xtaydi
