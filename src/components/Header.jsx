import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Features', to: '/category/features' },
  { label: 'Places', to: '/category/places' },
  { label: 'Archives', to: '/category/archives' },
  { label: 'Short Reads', to: '/category/shortreads' },
  { label: 'Documentaries', to: '/documentaries' },
  { label: 'About', to: '/about' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(252, 249, 244, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-border);
        }
        .header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .header-logo {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: -0.01em;
          text-decoration: none;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .desktop-nav a {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .desktop-nav a:hover { color: var(--color-text); }
        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(139, 115, 85, 0.2);
        }
        .subscribe-btn {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-bg);
          background: var(--color-dark);
          padding: 8px 18px;
          border-radius: 3px;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: background 0.2s;
        }
        .subscribe-btn:hover { background: var(--color-dark-hover); }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-direction: column;
          gap: 5px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--color-text);
          transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        .mobile-nav {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-bg);
          z-index: 99;
          padding: 24px 32px;
          flex-direction: column;
          gap: 0;
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav a {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 600;
          color: var(--color-text);
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid rgba(139, 115, 85, 0.08);
        }

        @media (max-width: 768px) {
          .header-inner { padding: 0 16px; height: 56px; }
          .header-logo { font-size: 18px; }
          .desktop-nav { display: none; }
          .hamburger { display: flex; }
          .mobile-nav { top: 56px; padding: 16px 16px; }
          .mobile-nav a { font-size: 20px; padding: 14px 0; }
        }
      `}</style>

      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            Australian Heritage
          </Link>

          <nav className="desktop-nav">
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
            <div className="nav-divider" />
            <Link to="/about" className="subscribe-btn">Subscribe</Link>
          </nav>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        {NAV_LINKS.map(link => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))}
      </nav>
    </>
  )
}
