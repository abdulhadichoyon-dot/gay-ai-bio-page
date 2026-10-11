# Gay AI Brand / Bio Page

A single-page, premium brand introduction for **Gay AI**, built with plain HTML, CSS, and JavaScript. It uses the crimson, gold, and black identity and the custom Gay AI logo created for this project.

## Files

- `index.html` — page structure and metadata
- `style.css` — responsive design, animations, and visual system
- `script.js` — mobile menu, scroll reveals, gallery lightbox, active navigation, and the future main-app link slot
- `assets/` — local logo, favicon, and visual gallery assets

## Preview locally

No build tools or dependencies are required. Open `index.html` in a browser, or run a small local web server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Add the main Gay AI application link later

The app URL is intentionally blank, as requested. After the main app is deployed, open `script.js` and find:

```js
const MAIN_APP_URL = "";
```

Set it to the deployed public URL, for example:

```js
const MAIN_APP_URL = "https://your-real-app-domain.example";
```

Replace the example with your actual URL. All **Start Creating / Enter Gay AI / Step Into Gay AI** buttons will then open that URL in a new tab. Until then, they show a small note that the link has not been connected yet.

## Deploy

This is a static website and can be served by Vercel, GitHub Pages, Netlify, or any static web host. Upload the contents of this folder to your repository and configure the host to serve `index.html` from the project root.

## Notes

- No JavaScript framework or external library is required.
- The website does not call an AI API and does not pretend to generate images. It is a brand/bio page for the separate main application.
- Gallery images are illustrative visual studies for the brand introduction.
- Gay AI is presented as an independent project and not as an official Google product.

# Visit Site

 https://abdulhadichoyon-dot.github.io/gay-ai-bio-page/
