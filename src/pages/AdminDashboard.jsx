import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard({ onEdit, onNew, onLogout }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    setLoading(true)
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, status, featured, published_at, created_at, category:categories!articles_category_id_fkey(name, slug)')
      .order('created_at', { ascending: false })

    if (error) console.error('Error:', error)
    else setArticles(data || [])
    setLoading(false)
  }

  async function handleDelete(article) {
    if (!confirm(`Delete "${article.title}"? This cannot be undone.`)) return
    const { error } = await supabase.from('articles').delete().eq('id', article.id)
    if (error) alert('Error deleting: ' + error.message)
    else fetchArticles()
  }

  async function handleToggleStatus(article) {
    const newStatus = article.status === 'published' ? 'draft' : 'published'
    const updates = { status: newStatus }
    if (newStatus === 'published' && !article.published_at) {
      updates.published_at = new Date().toISOString()
    }
    const { error } = await supabase.from('articles').update(updates).eq('id', article.id)
    if (error) alert('Error: ' + error.message)
    else fetchArticles()
  }

  const filtered = filter === 'all' ? articles : articles.filter(a => a.status === filter)
  const counts = {
    all: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FCF9F4' }}>
      {/* Header */}
      <header style={{
        background: '#2C1810',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          fontWeight: 700,
          color: '#FCF9F4',
        }}>
          Australian Heritage
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: '#C4956A',
            marginLeft: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>Editor</span>
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a
            href="/"
            target="_blank"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'rgba(252, 249, 244, 0.6)',
              textDecoration: 'none',
            }}
          >
            View site →
          </a>
          <button
            onClick={onLogout}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'rgba(252, 249, 244, 0.6)',
              background: 'none',
              border: '1px solid rgba(252, 249, 244, 0.2)',
              padding: '6px 14px',
              borderRadius: 3,
              cursor: 'pointer',
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px' }}>
        {/* Title bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 700,
            color: '#2C1810',
            margin: 0,
          }}>
            Articles
          </h1>
          <button
            onClick={onNew}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#FCF9F4',
              background: '#2C1810',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 4,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            + New article
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex',
          gap: 4,
          marginBottom: 24,
          borderBottom: '1px solid rgba(139, 115, 85, 0.12)',
        }}>
          {['all', 'published', 'draft'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: filter === f ? 600 : 400,
                color: filter === f ? '#2C1810' : '#8B7355',
                background: 'none',
                border: 'none',
                borderBottom: filter === f ? '2px solid #2C1810' : '2px solid transparent',
                padding: '10px 16px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Article list */}
        {loading ? (
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#8B7355', padding: 40, textAlign: 'center' }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ fontFamily: "'Source Serif 4', serif", color: '#8B7355', padding: 40, textAlign: 'center', fontStyle: 'italic' }}>
            No articles found.
          </p>
        ) : (
          <div>
            {filtered.map(article => (
              <div
                key={article.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(139, 115, 85, 0.08)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3
                      onClick={() => onEdit(article)}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 17,
                        fontWeight: 600,
                        color: '#2C1810',
                        margin: 0,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {article.title}
                    </h3>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: 2,
                      background: article.status === 'published' ? 'rgba(34, 87, 60, 0.1)' : 'rgba(139, 115, 85, 0.1)',
                      color: article.status === 'published' ? '#22573C' : '#8B7355',
                      flexShrink: 0,
                    }}>
                      {article.status}
                    </span>
                    {article.featured && (
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: 2,
                        background: 'rgba(196, 149, 106, 0.15)',
                        color: '#8B4513',
                        flexShrink: 0,
                      }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: '#9B8B7A',
                    display: 'flex',
                    gap: 12,
                  }}>
                    {article.category && <span>{article.category.name}</span>}
                    <span>{formatDate(article.published_at || article.created_at)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
                  <button
                    onClick={() => onEdit(article)}
                    style={actionBtnStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(article)}
                    style={actionBtnStyle}
                  >
                    {article.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(article)}
                    style={{ ...actionBtnStyle, color: '#c0392b' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const actionBtnStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 12,
  fontWeight: 500,
  color: '#6B5744',
  background: 'none',
  border: '1px solid rgba(139, 115, 85, 0.2)',
  padding: '6px 12px',
  borderRadius: 3,
  cursor: 'pointer',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}
