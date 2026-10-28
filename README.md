# Bensal Pre & Primary School website

The website for **Bensal Pre & Primary English Medium School**, Tungi, Morogoro, Tanzania.

It's a plain static site: HTML, one CSS file and one small JavaScript file. No build step, no database, no frameworks. Open `index.html` in a browser and it works.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: photo slideshow, key numbers, results summary, video tour, news |
| `about.html` | Founders, the "Ben + Sal = Bensal" name story, school facts |
| `academics.html` | Day care, pre-primary, primary, subjects |
| `results.html` | NECTA PSLE and SFNA results, charts and tables |
| `admissions.html` | How to apply, contacts, common questions |
| `school-life.html` | Sport, trips, video, photo gallery |
| `contact.html` | Phone, WhatsApp, email, office hours, map |

```
css/style.css          all styling (colours are set at the top)
js/main.js             mobile menu, slideshow, chart animations
images/                logo and tab icons
images/photos/         all website photos
videos/                video clips and their preview images
favicon.ico            browser tab icon
```

## Previewing locally

Double-click `index.html`, or run a small local server from this folder (videos behave better this way):

```bash
npx serve .
```

## Common edits

**Add or replace a photo.** Resize it to about 1600px wide, save it in `images/photos/`, and point the `<img src="...">` at it. See `images/PHOTOS-NEEDED.txt` for the photos still missing (day care and a school trip).

**Add a slide to the home page slideshow.** In `index.html`, copy one `<figure class="slide">` line inside `<div class="slideshow">` and change the file name, `alt` text and caption. It changes every 5 seconds (`data-interval="5000"`).

**Add new exam results.** Update the tables and bars in `results.html` and the summary on `index.html`. Bar heights are the school average divided by 300, as a percentage (`data-h`).

**Change contact details.** The top bar, header and footer are repeated on every page, so search the whole folder for the old number or email and replace it everywhere.

**Change colours.** Edit the variables at the top of `css/style.css`. The school red is `--brand: #991e20`, matched to the official logo.

## Working together

1. **Pull** before you start, to get the other person's latest changes.
2. Make your changes and check them in a browser, on a phone-sized window too.
3. **Commit** with a short note that says what changed, for example "Add day care photos".
4. **Push**.

Say in WhatsApp which page you're working on, so two people don't edit the same lines at once. Use GitHub Issues as the shared to-do list.

## Facts to keep accurate

All figures come from the school or from official NECTA results (centre number **PS1104081**). Don't add numbers or claims that the school hasn't confirmed. School fees and the application fee are deliberately **not** published, at the owner's request.
