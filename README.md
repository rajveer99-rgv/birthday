# Our Little Universe — Birthday Website 💜

A responsive romantic birthday website made for June 11. It includes your seven-meet timeline, the Lal Bagh pasta picnic, the April 14 cuddle memory, favourites, messages, a birthday letter, a live countdown, a photo gallery, a surprise reveal and a saved-on-this-device someday list.

## Add your photos (easy method)

1. Open the `images` folder.
2. You will see `photo-01.svg` through `photo-12.svg`. These are sample placeholders.
3. Copy your own photos into this folder.
4. Either rename your photos to `photo-01.jpg`, `photo-02.jpg`, etc. and change the matching `.svg` extension in `index.html`, OR simply keep the existing names and replace each SVG file with your photo converted to SVG (not recommended). The easiest option is to edit the image filename in `index.html` to match your photo, e.g. `images/photo-01.jpg`.
5. You can change the captions directly below each `<img>` in `index.html`.

Tip: use 8–12 photos, preferably portrait or square images. Keep the photos inside the `images` folder so they load when hosted.

## Preview

Open `index.html` in a browser. For best results, preview it using a local web server or upload it to hosting.

## Publish online

This is a static website and is ready for GitHub Pages, Netlify or Cloudflare Pages. Upload the complete project folder (including `index.html`, `style.css`, `script.js`, `images/` and `music/`). Do not upload only the HTML file. A public URL is created only after you complete deployment on a hosting service.

## Music

The music button starts playback only after it is tapped, because mobile browsers block autoplay. You can replace `music/laila.mpeg` with your own audio file and update the source path in `index.html`.

## Notes

- Birthday countdown automatically targets the next June 11.
- The someday-list checkmarks are saved in the current browser on the current device. They do not sync between devices.
- All photographs in this package are placeholders; add your own before sharing the website.
