# Company logos

Drop one file per organisation here, then point at it from
`assets/js/data/halloffame.js`:

```js
{ org: "Acme Corp", logo: "/assets/img/logos/acme.svg", ... }
```

- SVG is best. PNG with a transparent background also works.
- Roughly square crops look right; the card pads them automatically.
- If `logo` is left out or set to `null`, the card falls back to the
  organisation's initials, so the wall never shows a broken image.
