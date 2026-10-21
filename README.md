# Future Energies proposal builder

Fill in the form, then save a branded 6-page A4 solar proposal as PDF (layout follows the Future Energies sample proposal).
Installable as an app (PWA) and works offline once loaded.

- Open `index.html` locally, or deploy this folder to Vercel (no build step).
- Everything except the customer details is remembered in the browser on each device. **New proposal** clears only the customer details and raises the project ID by one.
- Artwork in `assets/art/` was exported from the sample PDF; `assets/photo.jpg` and `assets/brands/` too.
- After changing files, raise the cache version in `sw.js` so installed apps update.
