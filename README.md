# bakun.net — Personal Website

Personal business card website for Dmitrii Bakun, Senior .NET Developer based in Rotterdam.

**Live:** https://bakun.net

## Stack

Vanilla HTML / CSS / JavaScript — no frameworks, no build step.

## Structure

```
index.htm               # Main page
style.css               # All styles
status.txt              # Availability flag (true = show "Open to opportunities")
favicon.svg             # SVG favicon
robots.txt              # SEO
sitemap.xml             # SEO
assets/
  Main_photo.png        # Profile photo
  gb.png                # UK flag icon
  Dmitrii_Bakun_CV.pdf  # CV (replace with actual file)
  badges/               # Credly certification images
  svg/                  # Icons: linkedin, github, download, email, party-hat, santa-hat
  js/
    main.js             # All JavaScript
```

## Features

- **Dynamic experience counter** — years calculated from career start (2012), updates automatically
- **Certifications carousel** — drag to scroll, click opens Credly badge; extra certs hidden behind "See More"
- **Collapsible work history** — 2 recent jobs visible, older ones expandable
- **Availability status** — controlled via `status.txt` (set first line to `true` to show badge)
- **Seasonal easter eggs** — Santa hat + snow in December; party hat + confetti on Sep 8; SVG assets are lazy-loaded (only fetched when the condition is met)
- **Scroll animations** — sections fade in on scroll via Intersection Observer
- **Print styles** — `@media print` reveals all hidden content, removes interactive elements
- **JSON-LD structured data** — `Person` schema in `<head>` for Google rich results (name, job title, location, sameAs links, knowsAbout)

## Controlling availability status

Edit `status.txt` in the root:

```
true     → badge "Open to opportunities" is visible
false    → hidden
# true   → hidden (commented out)
```

## Local development

Requires a local web server (fetch API is used for `status.txt`):

```bash
python -m http.server 8080
# or
npx serve .
```

Then open http://localhost:8080
