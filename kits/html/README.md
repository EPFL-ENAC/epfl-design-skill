# HTML kit — copy-paste snippets

No framework, no build. Link `css/epfl.css` once, then paste any block below. These are the canonical class names every other kit wraps.

```html
<link rel="stylesheet" href="css/epfl.css">
```

## Atoms

**Button**
```html
<button class="epfl-btn epfl-btn-primary">Discover our research</button>
<button class="epfl-btn epfl-btn-secondary">Browse labs</button>
<button class="epfl-btn epfl-btn-tertiary">Contact</button>
<button class="epfl-btn epfl-btn-primary epfl-btn-sm">Small</button>
<button class="epfl-btn epfl-btn-primary" disabled>Disabled</button>
```

**Badge & tag**
```html
<span class="epfl-badge epfl-badge-primary">PRIMARY</span>
<span class="epfl-badge epfl-badge-success">SUCCESS</span>
<span class="epfl-badge epfl-badge-pill epfl-badge-tertiary">CANARD</span>
<a class="epfl-tag" href="#">Research</a>
```

**Form field**
```html
<label class="epfl-label" for="email">Email</label>
<input class="epfl-input" id="email" type="email" placeholder="name@epfl.ch">

<label class="epfl-label" for="faculty">Faculty</label>
<select class="epfl-select" id="faculty"><option>School of Engineering</option></select>

<label class="epfl-check"><input type="checkbox" checked> I agree to terms</label>
```

## Molecules

**Card (with distinction flag)**
```html
<article class="epfl-card epfl-card-distinction">
  <div class="epfl-card-img" style="background-image:url(photo.jpg)"></div>
  <span class="epfl-card-flag"></span>
  <div class="epfl-card-body">
    <div class="epfl-card-info">News · 12 Mar 2026</div>
    <h3 class="epfl-card-title">Standardizing perovskite aging measurements</h3>
    <p class="epfl-card-text">A new protocol that accelerates solar-cell development worldwide.</p>
  </div>
</article>
```

**Alert**
```html
<div class="epfl-alert epfl-alert-info"><b>Info.</b> The application deadline is approaching.</div>
<div class="epfl-alert epfl-alert-danger"><b>Error.</b> Submission failed — please check the form.</div>
```

**Key number**
```html
<div class="epfl-keynumber">
  <div class="epfl-keynumber-num"><span class="pre">+</span>13 000</div>
  <div class="epfl-keynumber-bar"></div>
  <div class="epfl-keynumber-label">Students from over 120 countries</div>
</div>
```

## Organisms

**Card deck** — wrap three cards
```html
<div class="epfl-card-deck"> <!-- …three .epfl-card… --> </div>
```

**Hero (the signature panel-over-photo)**
```html
<section class="epfl-hero">
  <div class="epfl-hero-text">
    <h1 class="epfl-hero-title">Pioneering research, made in Switzerland</h1>
    <div class="epfl-hero-content"><p>EPFL is one of the most vibrant science and technology institutions in Europe.</p></div>
  </div>
  <div class="epfl-hero-img" style="background-image:url(hero.jpg)"></div>
</section>
```

**Header** and **Footer**: see the rendered markup in `examples/research-landing.html`.

## Templates

```html
<nav class="epfl-breadcrumb"><a>EPFL</a><span class="sep">›</span><span>Research</span></nav>

<section class="epfl-section">
  <div class="epfl-eyebrow">Latest news</div>
  <h2>Highlights from our laboratories</h2>
  <!-- content -->
</section>

<section class="epfl-section epfl-section-muted"> … </section>
```
