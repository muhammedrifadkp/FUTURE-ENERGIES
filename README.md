# Future Energies proposal builder

Fill in the form, then save a branded 6-page A4 solar proposal as PDF (layout follows the Future Energies sample proposal).
Installable as an app (PWA) and works offline once loaded.

- **Download PDF** builds the file in the browser, so it is the same on iPhone, Android and computers. For each page the browser draws the artwork layer (`svg.art`) itself, and `assets/vendor/html2canvas.min.js` draws the text and boxes on top; the result goes onto an exact A4 page. Keep one `svg.art` per page, under everything else (html2canvas misplaced SVG artwork on iPhones). On phones it opens the share menu. **Print** is still there for paper on computers; it is hidden in Safari, which adds its own margins and the URL/date.
- Open `index.html` locally, or deploy this folder to Vercel (no build step).
- Everything except the customer details is remembered in the browser on each device. **New proposal** clears only the customer details and raises the project ID by one.
- Artwork in `assets/art/` was exported from the sample PDF; `assets/photo.jpg` and `assets/brands/` too.
- After changing files, raise the cache version in `sw.js` so installed apps update.
