# Future Energies proposal builder

Fill in the form, then save a branded 6-page A4 solar proposal as PDF (layout follows the Future Energies sample proposal).
Installable as an app (PWA) and works offline once loaded.

- **Download PDF** builds the file in the browser, so it is the same on iPhone, Android and computers. For each page the browser draws the artwork layer (`svg.art`) itself, and `assets/vendor/html2canvas.min.js` draws the text and boxes on top; the result goes onto an exact A4 page. Keep one `svg.art` per page, under everything else (html2canvas misplaced SVG artwork on iPhones). On phones it opens the share menu. **Print** is still there for paper on computers; it is hidden in Safari, which adds its own margins and the URL/date.
- **Packages (kW):** choosing a package in the System section fills the system, bill of materials and price. The built-in ones (3, 5 and 10 kW for Hybrid and On-grid) are demo data in `DEMO_SIZES` / `demoPackages()` in `index.html`; replace them with the client's real figures. Packages saved, added or deleted in the app stay on that device (`fe-packages-v1`), and a packages file moves them between devices.
- The on-screen preview is shrunk with `transform: scale()` (see `fit()`), never CSS `zoom`: with zoom, iOS 15 (iPhone 7) enlarges all small text to its minimum size and the pages fall apart. Brand logos are PNG, because old Safari clips SVG logos.
- Open `index.html` locally, or deploy this folder to Vercel (no build step).
- Everything except the customer details is remembered in the browser on each device. **New proposal** clears only the customer details and raises the project ID by one.
- Artwork in `assets/art/` was exported from the sample PDF; `assets/photo.jpg` and `assets/brands/` too.
- **Releasing an update:** raise the version in three places together: `APP_VERSION` in `index.html`, `VERSION` in `sw.js` and `version.json` (format `YYYY.MM.DD-n`). Installed apps check `version.json` when they are reopened and every 30 minutes. When the app comes back from the background they switch to the new version by themselves; while someone is typing they show an "Update" bar instead. Details are saved on the device, so the reload loses nothing.
