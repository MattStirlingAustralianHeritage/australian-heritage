import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // TODO: Connect to Supabase subscribers table
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h3 className="footer-newsletter-heading">Stay informed</h3>
          <p className="footer-newsletter-desc">
            Receive new articles and heritage stories directly to your inbox.
          </p>
          {subscribed ? (
            <p className="footer-subscribed">Thanks for subscribing.</p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          )}
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-heading">Explore</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/category/features" className="footer-link">Features</Link>
            <Link to="/category/places" className="footer-link">Places</Link>
            <Link to="/documentaries" className="footer-link">Documentaries</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-heading">Discover</h4>
            <Link to="/map" className="footer-link">Heritage Map</Link>
            <Link to="/about" className="footer-link">About</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-masthead">Australian Heritage</span>
          <span className="footer-copyright">
            © {new Date().getFullYear()} Australian Heritage. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
