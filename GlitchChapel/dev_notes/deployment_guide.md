# Deployment Guide

## Quick start (cPanel / shared hosting)
1. Open **File Manager** → `public_html/`
2. Create folder: `GlitchChapel/`
3. Upload `index.html` (from this kit) into that folder.
4. Visit `https://YOURDOMAIN/GlitchChapel/`

### WordPress redirect fix (if needed)
Add this line **above** the WordPress rules in `.htaccess`:
```
RewriteEngine On
RewriteRule ^GlitchChapel/ - [L]
```

## SFTP
Upload `index.html` to `/public_html/GlitchChapel/`

## Local preview
Double‑click `index.html` — it runs entirely client‑side (no build required).

## Next
- Wire **Enter the Chapel** to a deeper scene or route when ready.
- Add analytics if you must (avoid blocking main thread).
