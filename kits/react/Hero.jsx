// ORGANISM — Hero. The signature white text panel overlapping a full-bleed photo.
export function Hero({ title, children, image }) {
  return (
    <section className="epfl-hero">
      <div className="epfl-hero-text">
        <h1 className="epfl-hero-title">{title}</h1>
        <div className="epfl-hero-content">{children}</div>
      </div>
      <div
        className="epfl-hero-img"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={title}
      />
    </section>
  );
}
