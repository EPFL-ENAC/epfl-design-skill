// MOLECULE — Card / CardDeck. `distinction` adds the signature red flag + top border.
export function Card({ image, category, date, title, children, distinction }) {
  return (
    <article className={`epfl-card${distinction ? ' epfl-card-distinction' : ''}`}>
      {image && <div className="epfl-card-img" style={{ backgroundImage: `url(${image})` }} />}
      {distinction && <span className="epfl-card-flag" />}
      <div className="epfl-card-body">
        <div className="epfl-card-info">
          {category}{date ? ` · ${date}` : ''}
        </div>
        <h3 className="epfl-card-title">{title}</h3>
        <p className="epfl-card-text">{children}</p>
      </div>
    </article>
  );
}

export function CardDeck({ children }) {
  return <div className="epfl-card-deck">{children}</div>;
}
