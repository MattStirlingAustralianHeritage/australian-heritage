import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      onLogin(data.user)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FCF9F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 400,
        padding: '48px 40px',
        background: 'white',
        borderRadius: 6,
        boxShadow: '0 4px 24px rgba(44, 24, 16, 0.08)',
        border: '1px solid rgba(139, 115, 85, 0.1)',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24,
          fontWeight: 700,
          color: '#2C1810',
          margin: '0 0 8px 0',
          textAlign: 'center',
        }}>
          Australian Heritage
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: '#8B7355',
          textAlign: 'center',
          margin: '0 0 32px 0',
        }}>
          Sign in to the editor
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: '#6B5744',
              marginBottom: 6,
              letterSpacing: '0.03em',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                border: '1px solid rgba(139, 115, 85, 0.2)',
                borderRadius: 4,
                background: '#FCF9F4',
                color: '#2C1810',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: '#6B5744',
              marginBottom: 6,
              letterSpacing: '0.03em',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                border: '1px solid rgba(139, 115, 85, 0.2)',
                borderRadius: 4,
                background: '#FCF9F4',
                color: '#2C1810',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: '#c0392b',
              marginBottom: 16,
              padding: '8px 12px',
              background: 'rgba(192, 57, 43, 0.06)',
              borderRadius: 4,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: '#FCF9F4',
              background: loading ? '#8B7355' : '#2C1810',
              border: 'none',
              borderRadius: 4,
              cursor: loading ? 'wait' : 'pointer',
              transition: 'background 0.2s',
              letterSpacing: '0.02em',
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
