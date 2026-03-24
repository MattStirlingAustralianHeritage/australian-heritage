import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CategoryBadge from '../components/CategoryBadge'
import Loading from '../components/Loading'

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*, category:categories!articles_category_id_fkey(id, name, slug), author:authors(name, bio, avatar_url)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) {
        console.error('Error fetching article:', error)
      } else {
        setArticle(data)
      }
      setLoading(false)
    }
    fetchArticle()
  }, [slug])

  if (loading) return <Loading />

  if (!article) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '120px 32px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          color: 'var(--color-text)',
          marginBottom: 16,
        }}>
          Article not found
        </h1>
        <Link to="/" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: '#8B4513',
          textDecoration: 'underline',
        }}>
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div className="page-enter">
      {/* Hero image */}
      {article.hero_image_url && (
        <div style={{
          width: '100%',
          maxHeight: 520,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={article.hero_image_url}
            alt={article.hero_image_alt || article.title}
            style={{
              width: '100%',
              height: 520,
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(252, 249, 244, 0.8), transparent)',
          }} />
        </div>
      )}

      {/* Article header */}
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: article.hero_image_url ? '0 32px' : '64px 32px 0',
        marginTop: article.hero_image_url ? -60 : 0,
        position: 'relative',
      }}>
        {article.category && (
          <div style={{ marginBottom: 16 }}>
            <Link to={`/category/${article.category.slug}`}>
              <CategoryBadge name={article.category.name} slug={article.category.slug} />
            </Link>
          </div>
        )}

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.2,
          color: 'var(--color-text)',
          margin: '0 0 20px 0',
          letterSpacing: '-0.02em',
        }}>
          {article.title}
        </h1>

        {article.excerpt && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 19,
            lineHeight: 1.65,
            color: 'var(--color-text-secondary)',
            margin: '0 0 28px 0',
            fontStyle: 'italic',
          }}>
            {article.excerpt}
          </p>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingBottom: 32,
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 40,
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--color-text)',
          }}>
            {article.author?.name || 'Matt Stirling'}
          </span>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: 'var(--color-text-faint)',
          }}>
            {formatDate(article.published_at)}
          </span>
        </div>

        {/* Article body */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Back link */}
        <div style={{
          marginTop: 64,
          paddingTop: 32,
          borderTop: '1px solid var(--color-border)',
          paddingBottom: 80,
        }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 500,
            color: '#8B4513',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'opacity 0.2s',
          }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            ← Back to all stories
          </Link>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}
