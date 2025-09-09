
# TLC Ministry – Website

A lightweight static site you can unzip into your repo and commit immediately.

## Files
- `index.html` – Home/overview
- `donate.html` – PayPal/Stripe donation buttons (edit links in `script.js`)
- `memberships.html` – Three-tier monthly memberships (edit in `script.js`)
- `store.html` – Simple store grid; hook buttons to Stripe product links (edit in `script.js`)
- `contact.html` – Static contact form (easy to wire up)
- `style.css` – Dark modern UI
- `script.js` – Configuration for donation links, tiers, and products
- `assets/logo.jpg` – Your logo

## Quick Start
1. Unzip into your repo folder (e.g., `tacosloveandcreation.org/`).
2. Edit links inside **`script.js`**:
   - `donate_links.paypal`
   - `donate_links.stripe`
   - `tiers` array (names, prices, perks, links)
   - `products` array (title, price, image, link)
3. Optional: Add product images into `assets/` and update the paths.
4. Commit & push:
   ```bash
   git add .
   git commit -m "TLC website redesign with donations, memberships, and store"
   git push
   ```

## Next Steps
- Hook contact form to your email or a serverless function.
- Replace Stripe test links with live ones.
- Add analytics or newsletter signup if desired.
