# Kopal Tare — Personal Portfolio

Complete static website source, including photos, silent video highlights, research PDFs, and the ThyraPatch preview.

## Preview locally

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000. Use a local server because the photo gallery loads `media.json` with fetch.

## Publish on GitHub Pages

1. Create a public repository named `tare2009kopal.github.io` for the address https://tare2009kopal.github.io/ (or another repository name for a project address).
2. Upload this folder’s **contents** to the root of its `main` branch. Keep the `photos` and `videos` folders intact.
3. Open Settings → Pages. Select **Deploy from a branch**, **main**, and **/(root)**, then Save.
4. Wait for GitHub’s Pages build to finish and use the URL shown in Settings → Pages.

## Edit

- `index.html`: page content and layout
- `style.css`: lavender styling, responsive layouts, and animation
- `script.js`: navigation, entry screen, galleries, video playback, and interactions
- `media.json`: photo captions and lightbox groupings
- `photos/` and `videos/`: local media assets

No build step, paid domain, API key, or ChatGPT sign-in is required. Third-party content such as fonts and the GATI YouTube embed still loads from its original service.

This export reflects source commit 7a713f7b071054ccea3383c0ee7aa751be30da15 of the original website. It does not include hosting credentials or private source-control metadata.
