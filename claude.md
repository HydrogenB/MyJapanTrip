# Claude Project Brief — Japan Trip 2026

> Last updated: May 2026  
> Language: คุยภาษาไทย · Code/files in English

---

## 👥 Travelers

| ชื่อ | Role |
|------|------|
| **Bird (Jirad Srirattanaarporn)** | Project owner · comscipg@gmail.com |
| **Nannapat Mongkollertsirisuk** | Traveler · nannapat.bonapatt@gmail.com |
| **+ 1 (male)** | Third traveler |

**4 คน** ที่ DisneySea — เพื่อนอีก 1 คนเจอกันที่ Maihama Station เช้า 4 มิถุนายน

---

## 📅 Trip At A Glance

| วัน | วันที่ | ที่ | Notes |
|-----|--------|-----|-------|
| 0 | 29 May | ✈ BKK → NRT | VZ830 · Ref: **RQ59YA** |
| 1 | 30 May | Kamakura / Enoshima | Kinokuniya Ryokan · #1989555199 |
| 2 | 31 May | Kawaguchiko / Fuji | Toyoko Inn · **รับรถเช่าที่ Fujisawa** |
| 3 | 1 Jun | Matsumoto | IROHA GRAND · Breakfast buffet 06:30 ⭐ |
| 4 | 2 Jun | Kamikochi ⛰ | Tokusawa Lodge · **A0031722304 / A0031722301** |
| 5 | 3 Jun | → Tokyo | คืนรถ Higashi-Ginza · Quintessa check-in |
| 6 | 4 Jun | **DisneySea Day 1** | Crowd: 65% (Thu) |
| 7 | 5 Jun | **DisneySea Day 2** | Crowd: 71% (Fri) |
| 8 | 6 Jun | ✈ NRT → DMK | XJ607 · 21:00 JST · ถึง Narita 18:00 |

---

## 🏨 Bookings Reference

| ที่ | Ref | บาท/เยน |
|-----|-----|---------|
| Kinokuniya Ryokan (N1) | Agoda **#1989555199** | JPY 27,476 |
| Toyoko Inn Kawaguchiko (N2) | — | JPY 20,224 |
| IROHA GRAND Matsumoto (N3) | — | JPY 19,074 |
| Tokusawa Lodge (N4) | **A0031722304** (Jirad) · **A0031722301** (Nannapat) | JPY 45,600 |
| Quintessa Hotel Tokyo Ginza (N5–7) | Agoda | THB 17,388.45 |

### 🚗 Car Rental
- **Provider:** Nippon Rent-A-Car (Rakuten) · Reservation: **RC32461165089796008** · Key: **ubzP0JwJ**
- **Pick-up:** Fujisawa Station — 31 May 09:00 · Tel: 050-1712-2717
- **Return:** Higashi-Ginza Station — 3 Jun 21:00 · Tel: 050-1712-2636
- **Emergency:** 0120-220-865
- **Payment:** ¥38,390 at counter (CDW + ECO included)

---

## 🎡 DisneySea Guide — Files

The main coding deliverable of this project. Files live at `/mnt/user-data/outputs/disneysea/` and are packaged as `disneysea.zip`.

### Structure
```
disneysea.zip
├── index.html       — Execution Plan (timeline, DPA strategy, crowd data)
├── rides.html       — All 14 rides + real reviews + 2025 annual avg waits (static)
├── food.html        — Restaurant guide (tagged for beef 🥩)
└── styles.css       — Shared CSS, mobile-first dark navy/gold theme
```

> **Live queue API removed (May 2026)** — queue-times.com fetch + corsproxy were dropped to avoid proxy/bandwidth cost. All wait times are now static 2025 annual averages baked into the HTML. Do **not** re-introduce live fetches without explicit approval.

### Key Data Points in the Guide
- **Crowd:** Jun 4 (Thu) = 65% · Jun 5 (Fri) = 71% · "June is normally quieter" — queue-times.com (historical)
- **2025 Annual Avg** (queue-times.com/parks/275/stats/2025 — referenced once, not fetched live):
  - Soaring 131 min avg (highest) → DPA #2
  - Frozen 116 min avg → DPA #1
  - Journey to Earth 101 min avg → Priority Pass
  - Sindbad 7 min avg (lowest — no DPA needed)
- **⚠️ Indiana Jones:** Closed since 18 Aug 2025 — TBD
- **🏁 Aquatopia:** Closing permanently 14 Sep 2026 — open during Jun 4–5 trip!
- **Food guide:** Tags 🥩 BEEF on beef-containing items. User only avoids beef — seafood, chicken, pork all fine.

### Key Ride IDs (queue-times.com — kept for reference only)
```
Frozen:        13559   Peter Pan:    13561   Rapunzel:     13560
Tinker Bell:   13562   Soaring:       8024   Toy Story:     8023
Tower:          8047   Indiana:       8027   Journey:       8028
20K Leagues:    8029   Raging:        8046   Aquatopia:     8038
Sindbad:        8039   Nemo:          8051
```
*IDs preserved in case the user later wants a one-off manual lookup; no code calls these any more.*

---

## 🎨 Code / Design Conventions

### General
- **Language in UI:** ภาษาไทย for labels/text · English for technical terms
- **Multi-file over single monolith** — user prefers separate files linked by `<a href>` (not tabs in one file)
- **Deliver as .zip** when multiple files are involved
- **Mobile-first CSS** — single column on small screens, grid expands on ≥520px

### Visual Style (DisneySea guide)
- Dark navy theme: `#060d24` bg · `#e8b84b` gold accent
- Fonts: `Cinzel` (headers) · `Sarabun` (body) · `DM Mono` (data/codes)
- Ride card layout: image left (155×135px) + meta right on desktop, stacked on mobile
- Stars bg via `radial-gradient` fixed overlay

### Scraping Pattern (tokyodisneyresort.jp)
- Attraction images: `https://media1.tokyodisneyresort.jp/images/adventure/attraction/{ID}_main_visual_name_1.jpg?mod={timestamp}`
- Show images: same pattern with `/show/` instead of `/attraction/`
- Restaurant images: same pattern with `/restaurant/`
- OG image ID found in `meta-og:image` when fetching detail pages via `web_fetch`
- Some pages load images dynamically — use the show/restaurant listing pages to get thumbnail IDs

---

## ⚠️ Critical Trip Reminders

1. **Tokusawa Lodge** — email `tokusawalodge@m-kamikouchi.jp` immediately upon arriving at Kamikochi Bus Terminal · Check-in before 16:00 · 2hr walk from terminal
2. **Sawando Parking** — ¥700/day · ¥1,000 notes ONLY · Cash only machine
3. **DisneySea DPA Strategy** — คน A buys Frozen DPA · คน B buys Soaring DPA · simultaneously the moment gates open · before walking anywhere
4. **Narita departure** — arrive 18:00 JST for XJ607 at 21:00 JST

---

## 📁 Project Files

| File | Description |
|------|-------------|
| `japan-trip-2026-knowledge.md` | Master trip document (flights, hotels, bookings, contacts) |
| `japan-trip-muji.html` | Visual trip planner web app (sidebar + day-by-day timeline) |
| `*.ics` | Google Calendar export (all trip events) |
| `disneysea.zip` | DisneySea guide web app (3 pages + API) |
