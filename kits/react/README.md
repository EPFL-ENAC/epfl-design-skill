# React kit

Plain React function components (ES modules) wrapping the `epfl-*` classes from `css/epfl.css`. No CSS-in-JS — load the stylesheet once and the components render branded markup.

## Setup

```jsx
import 'epfl-design/css/epfl.css';
import { Header, Hero, Card, CardDeck, Button, KeyNumber, Footer } from 'epfl-design/kits/react';

export default function App() {
  return (
    <>
      <Header active="Research" />
      <Hero title="Pioneering research, made in Switzerland" image={heroImg}>
        <p>EPFL is one of the most vibrant science and technology institutions in Europe.</p>
        <Button variant="primary">Discover our research</Button>
      </Hero>
      <CardDeck>
        <Card image={img} category="News" date="12 Mar 2026" title="…" distinction>Summary…</Card>
      </CardDeck>
      <Footer />
    </>
  );
}
```

## Components

`Header`, `Hero`, `Card`, `CardDeck`, `Button` (variant primary/secondary/tertiary, size sm, disabled), `KeyNumber`, `Footer`.

`logo` props on `Header`/`Footer` default to `/assets/svg/…` — repoint them at your served asset path.
