import { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'

export function FeaturedArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/article/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block', marginBottom: 64 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        background: 'var(--color-dark)',
        borderRadius: 4,
        overflow: 'hidden',
        minHeight: 480,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? '0 20px 60px rgba(44, 24, 16, 0.2)'
          : '0 4px 20px rgba(44, 24, 16, 0.08)',
      }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {article.hero_image_url ? (
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${article.hero_image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.6s ease',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
            }} />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #3d2419, #5a3a28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 48,
              color: 'rgba(252, 249, 244, 0.1)',
            }}>AH</div>
          )}
        </div>
        <div style={{
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {article.category && (
            <div style={{ marginBottom: 20 }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}>
                {article.category.name}
              </span>
            </div>
          )}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.25,
            color: 'var(--color-bg)',
            margin: '0 0 20px 0',
            letterSpacing: '-0.01em',
          }}>
            {article.title}
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'rgba(252, 249, 244, 0.7)',
            margin: '0 0 28px 0',
          }}>
            {article.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'rgba(252, 249, 244, 0.5)',
            }}>
              {article.author?.name || 'Matt Stirling'}
            </span>
            <span style={{ color: 'rgba(252, 249, 244, 0.25)' }}>·</span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'rgba(252, 249, 244, 0.5)',
            }}>
              {formatDate(article.published_at)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/article/${article.slug}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          aspectRatio: '16/10',
          marginBottom: 18,
          background: '#e8e0d6',
        }}>
          {article.hero_image_url ? (
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${article.hero_image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }} />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #e8e0d6, #d4cac0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              color: 'rgba(44, 24, 16, 0.1)',
            }}>AH</div>
          )}
        </div>
        {article.category && (
          <div style={{ marginBottom: 10 }}>
            <CategoryBadge name={article.category.name} slug={article.category.slug} />
          </div>
        )}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.3,
          color: hovered ? '#8B4513' : 'var(--color-text)',
          margin: '0 0 10px 0',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s',
        }}>
          {article.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.65,
          color: 'var(--color-text-secondary)',
          margin: '0 0 14px 0',
          flex: 1,
        }}>
          {article.excerpt?.slice(0, 140)}{article.excerpt?.length > 140 ? '...' : ''}
        </p>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: 'var(--color-text-faint)',
        }}>
          {formatDate(article.published_at)}
        </span>
      </article>
    </Link>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}
