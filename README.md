# Wedding Invitation Website

## Files
- `index.html` — page structure and all editable wedding details
- `style.css` — complete responsive design
- `script.js` — countdown, animations, gallery, music, RSVP demo, calendar download
- `assets/` — add your photos and music here

## Photos to add
Place these exact filenames inside `assets/`:

hero.jpg
bride.jpg
groom.jpg
haldi.jpg
mehendi.jpg
wedding.jpg
reception.jpg
venue.jpg
countdown.jpg
rsvp.jpg
gallery1.jpg
gallery2.jpg
gallery3.jpg
gallery4.jpg
gallery5.jpg
gallery6.jpg

If you don't have every image yet, you can duplicate one image and rename it temporarily.

## Music
Add an MP3 named:
`assets/music.mp3`

Modern browsers may prevent automatic audio until the visitor interacts with the page. The invitation's "Open Invitation" button counts as interaction, so the site attempts to start music there.

## What to edit
Open `index.html` and replace:
- Aarohi / Arjun
- Wedding date
- Parents' names
- Event dates and times
- Venue and address
- Google Maps destination URL

Open `script.js` and update:
`const weddingDate = new Date("December 20, 2026 19:00:00");`

Also update the calendar event dates in the `.ics` section.

## RSVP
The included RSVP is frontend-only: it shows a confirmation on the visitor's device but does not send data to you.

For real RSVP collection, connect the form to Formspree, Google Apps Script, a Netlify Function, or your own backend.

## Hosting
This is a static website and can be hosted directly on Netlify, Vercel, GitHub Pages, or any normal web host.


## Personalized details
Bride: Sarbajoya Rakshit
Groom: Tapasundar Kar
Wedding: 25 November 2026
Reception: 26 November 2026
Venue: Ashirbaad Lodge
Maps: https://maps.app.goo.gl/aaVJSf9RQtGtyJkS7?g_st=ac


## Responsive optimization
This version has separate layout tuning for:
- Large desktop: 1400px+
- Desktop/laptop: 1001px+
- Tablet: 769px–1199px
- Large phones / narrow tablets: 481px–768px
- Mobile portrait: <=480px

The hero, navigation, story, couple, events, gallery, venue, countdown and RSVP sections all reflow rather than simply shrinking.

## Opening screen fix
The Tap to Open interaction now reveals the website immediately and then fades the opening cover out. This avoids the desktop issue where the invitation could remain stuck behind the opening layer.
