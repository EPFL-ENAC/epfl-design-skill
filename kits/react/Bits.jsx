// ATOM/MOLECULE/ORGANISM — Button, KeyNumber, Footer.
export function Button({ variant = 'primary', size, disabled, children, onClick }) {
  const cls = `epfl-btn epfl-btn-${variant}${size ? ' epfl-btn-' + size : ''}`;
  return (
    <button className={cls} disabled={disabled} onClick={onClick}>{children}</button>
  );
}

export function KeyNumber({ pre, value, label }) {
  return (
    <div className="epfl-keynumber">
      <div className="epfl-keynumber-num">
        {pre && <span className="pre">{pre}</span>}{value}
      </div>
      <div className="epfl-keynumber-bar" />
      <div className="epfl-keynumber-label">{label}</div>
    </div>
  );
}

export function Footer({ logo = '/assets/svg/epfl-logo-negative.svg' }) {
  return (
    <footer className="epfl-footer">
      <div className="epfl-footer-top">
        <img src={logo} alt="EPFL" className="epfl-footer-logo" />
        <div className="epfl-footer-cols">
          <div>
            <h6>About</h6>
            <a>Education</a><a>Research</a><a>Innovation</a><a>Campus</a>
          </div>
          <div>
            <h6>For students</h6>
            <a>Bachelor</a><a>Master</a><a>PhD</a><a>Continuing</a>
          </div>
          <div>
            <h6>Contact</h6>
            <a>Directory</a><a>Library</a><a>Press</a><a>Jobs</a>
          </div>
          <div>
            <h6>Follow</h6>
            <a>LinkedIn</a><a>YouTube</a><a>Bluesky</a><a>Newsletter</a>
          </div>
        </div>
      </div>
      <div className="epfl-footer-bottom">
        <div>© 2026 EPFL — All rights reserved</div>
        <div><a>Legal</a> · <a>Privacy</a> · <a>Accessibility</a></div>
      </div>
    </footer>
  );
}
