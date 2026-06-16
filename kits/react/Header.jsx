// ORGANISM — Header. Main nav with the 7×6px red active dot + EN/FR/DE switch.
// `logo` defaults to /assets/svg/…; point it at your app's served asset path.
export function Header({
  active = 'Research',
  items = ['Education', 'Research', 'Innovation', 'Schools', 'Campus'],
  logo = '/assets/svg/epfl-logo.svg',
}) {
  return (
    <header className="epfl-header" role="banner">
      <a className="epfl-logo" href="#">
        <img src={logo} alt="EPFL" />
      </a>
      <nav className="epfl-nav" aria-label="Main">
        {items.map(label => (
          <a key={label} href="#" className={label === active ? 'active' : ''}>{label}</a>
        ))}
      </nav>
      <div className="epfl-search">
        <input type="search" placeholder="Search EPFL" aria-label="Search" />
      </div>
      <div className="epfl-lang">
        <a className="on">EN</a>
        <a>FR</a>
        <a>DE</a>
      </div>
    </header>
  );
}
