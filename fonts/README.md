# fonts/

**Suisse Int'l is a commercial typeface licensed to EPFL. Its files are not in this
repository** (this repo and its catalog are public; the licence does not allow
redistributing the font files).

`tokens/colors_and_type.css` still declares the faces with paths relative to `tokens/`,
so a project that holds the licence puts the files here, next to `tokens/`:

| File | Weight / style |
|---|---|
| `SuisseIntl-Light.ttf` | 300 |
| `SuisseIntl-LightItalic.ttf` | 300 italic |
| `SuisseIntl-Regular.ttf` | 400 |
| `SuisseIntl-Medium.ttf` | 500 |
| `SuisseIntl-MediumItalic.ttf` | 500 italic |
| `SuisseIntl-SemiBold.ttf` | 600 |
| `SuisseIntl-Bold.ttf` | 700 |

Without them, text falls back to Arial (built into `--font-sans`).

Font files dropped here are git-ignored, and the catalog build never copies them.
Ask ENAC IT4R where the licensed files are kept.
