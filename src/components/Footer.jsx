import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Features', to: '/category/features' },
  { label: 'Places', to: '/category/places' },
  { label: 'Archives', to: '/category/archives' },
  { label: 'About', to: '/about' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '40px 32px',
      background: 'var(--color-dark)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--color-bg)',
          }}>
            Australian Heritage
          </span>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            color: 'rgba(252, 249, 244, 0.4)',
            marginTop: 8,
          }}>
            © {new Date().getFullYear()} Australian Heritage. All rights reserved.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {FOOTER_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'rgba(252, 249, 244, 0.5)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseOver={e => e.target.style.color = 'var(--color-bg)'}
              onMouseOut={e => e.target.style.color = 'rgba(252, 249, 244, 0.5)'}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
