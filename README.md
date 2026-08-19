# Supreme Digital Point — Online Store

Customer-facing storefront for Supreme Digital Point (Mirpur, Dhaka). Reads live
product stock/prices from Firebase Firestore (shared with the SDP Online admin
app), lets customers browse, wishlist, and check out with Cash on Delivery or
bKash/Nagad/Upay "Send Money".

This is a static site — no build step, no backend server. Everything runs in
the browser and talks directly to Firestore.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire site — HTML, CSS, and JS in one file |
| `manifest.json` | PWA config (lets customers "Add to Home Screen") |
| `sw.js` | Service worker — caches the app shell for offline/slow-connection loading |
| `icon-192.png`, `icon-512.png` | App icons used by the PWA manifest |
| `robots.txt` | Search engine crawling rules |
| `sitemap.xml` | Sitemap for search engines |

## Deploying

### Option A — Netlify via GitHub (recommended)
1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub** → select this repo.
3. Build command: leave blank. Publish directory: `/` (repo root).
4. Deploy. Netlify will auto-redeploy on every push to this repo from now on.

### Option B — Netlify drag-and-drop
Drag this whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### Option C — GitHub Pages
Enable Pages in repo Settings → Pages → Deploy from branch → `main` → `/ (root)`.
Note: GitHub Pages doesn't support custom redirect rules, but this site doesn't need any.

## After deploying — things to check

- **Domain**: `robots.txt`, `sitemap.xml`, and the `<link rel="canonical">` /
  `og:url` tags near the top of `index.html` currently point to
  `https://shopsdp.netlify.app/`. Update these if the domain changes.
- **Payment number**: search `index.html` for `PAYMENT_NUMBERS` to change the
  bKash/Nagad/Upay number customers send money to.
- **WhatsApp number**: search for `8801614501860` to update the WhatsApp
  contact links (floating chat button, order tracking, policy page).

## Firebase setup (one-time, done already)

This site reads from `publicProducts`, `storeBanners`, and writes to
`onlineOrders` / `storeCustomers` in the shared Firestore project
(`supreme-digital-point`). The Firestore Security Rules controlling access to
these collections are managed separately (see `firestore.rules` in the SDP
Online admin app project) — no changes needed here unless the data model
changes.

## Related project

The admin/POS app (`SDP-Online-App.html`) that manages products, orders, and
banners for this storefront lives in a separate deploy — it's not part of this
repo since it's a different site with staff login.
