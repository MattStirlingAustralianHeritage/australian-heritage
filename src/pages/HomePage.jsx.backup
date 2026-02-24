import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CategoryBadge from '../components/CategoryBadge'
import Loading from '../components/Loading'

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, hero_image_url, featured, published_at, category:categories!articles_category_id_fkey(id, name, slug), author:authors(name)')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (articlesError) console.error('Error fetching articles:', articlesError)
      else setArticles(articlesData || [])

      const { data: catsData } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order')

      setCategories(catsData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Loading />

  const featured = articles.find(a => a.featured) || articles[0]
  const rest = articles.filter(a => a.id !== featured?.id)
  const leftCol = rest.slice(0, 2)
  const rightCol = rest.slice(2, 6)
  const remaining = rest.slice(6)
  const filtered = activeCategory === 'all'
    ? remaining
    : remaining.filter(a => a.category?.slug === activeCategory)

  return (
    <div className="page-enter">
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 280px 1fr 300px;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 32px 48px;
          min-height: 520px;
        }
        .hero-left {
          border-right: 1px solid rgba(139, 115, 85, 0.12);
          padding-right: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hero-centre {
          padding: 0 32px;
          display: flex;
          flex-direction: column;
        }
        .hero-right {
          border-left: 1px solid rgba(139, 115, 85, 0.12);
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .below-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }
        .filter-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 32px;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            min-height: auto;
          }
          .hero-left { display: none; }
          .hero-right {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(139, 115, 85, 0.12);
            padding-top: 24px;
            margin-top: 24px;
            grid-column: 1 / -1;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 16px;
          }
          .hero-right > * { flex: 1; min-width: 200px; }
          .below-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 680px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 20px 16px 32px;
          }
          .hero-centre { padding: 0; }
          .hero-right > * { min-width: 100%; }
          .below-grid {
            grid-template-columns: 1fr;
            padding: 0 16px 60px;
          }
          .filter-row {
            padding: 0 16px 24px;
          }
          .section-divider {
            padding: 0 16px;
          }
        }
      `}</style>

      {/* Tagline */}
      <section style={{
        textAlign: 'center',
        padding: '36px 20px 32px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontStyle: 'italic',
          color: 'var(--color-text-muted)',
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 580,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Deep, rigorously researched storytelling about the people, places, and moments that shaped Australia.
        </p>
      </section>

      {/* Three-column hero grid */}
      <div className="hero-grid">
        {/* Left column — 2 smaller stories */}
        <div className="hero-left">
          {leftCol.map(article => (
            <LeftColCard key={article.id} article={article} />
          ))}
        </div>

        {/* Centre — featured story */}
        <div className="hero-centre">
          {featured && <CentreCard article={featured} />}
        </div>

        {/* Right column — compact list */}
        <div className="hero-right">
          {rightCol.map((article, i) => (
            <RightColCard key={article.id} article={article} isLast={i === rightCol.length - 1} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 32px 24px',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          whiteSpace: 'nowrap',
        }}>More Stories</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(139, 115, 85, 0.15)' }} />
      </div>

      {/* Category filter */}
      <div className="filter-row">
        <FilterButton active={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>All</FilterButton>
        {categories.map(cat => (
          <FilterButton key={cat.id} active={activeCategory === cat.slug} onClick={() => setActiveCategory(cat.slug)}>
            {cat.name}
          </FilterButton>
        ))}
      </div>

      {/* 4-column grid */}
      <div className="below-grid">
        {filtered.map(article => (
          <GridCard key={article.id} article={article} />
        ))}
      </div>

      {filtered.length === 0 && remaining.length === 0 && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--color-text-muted)',
          textAlign: 'center', padding: '40px 0 80px', fontStyle: 'italic',
        }}>
          No more stories yet.
        </p>
      )}
    </div>
  )
}

/* ── Centre featured card ── */
function CentreCard({ article }) {
  return (
    <Link to={`/article/${article.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}>
      {article.hero_image_url ? (
        <div style={{
          width: '100%',
          flex: 1,
          minHeight: 280,
          borderRadius: 3,
          overflow: 'hidden',
          marginBottom: 20,
          position: 'relative',
        }}>
          <img src={article.hero_image_url} alt={article.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0,
          }} />
        </div>
      ) : (
        <div style={{
          width: '100%', flex: 1, minHeight: 280, borderRadius: 3, marginBottom: 20,
          background: 'linear-gradient(135deg, #e8e0d6, #d4cac0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 48, color: 'rgba(44, 24, 16, 0.08)',
        }}>AH</div>
      )}
      {article.category && (
        <div style={{ marginBottom: 10 }}>
          <CategoryBadge name={article.category.name} slug={article.category.slug} />
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700,
        lineHeight: 1.2, color: 'var(--color-text)', margin: '0 0 10px 0',
        letterSpacing: '-0.01em',
      }}>
        {article.title}
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
        color: 'var(--color-text-secondary)', margin: '0 0 12px 0',
      }}>
        {article.excerpt?.slice(0, 180)}{article.excerpt?.length > 180 ? '...' : ''}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {article.author?.name || 'Matt Stirling'}
        </span>
      </div>
    </Link>
  )
}

/* ── Left column card (image + title) ── */
function LeftColCard({ article }) {
  return (
    <Link to={`/article/${article.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
      {article.hero_image_url && (
        <div style={{
          width: '100%', aspectRatio: '4/3', borderRadius: 3, overflow: 'hidden', marginBottom: 12,
        }}>
          <img src={article.hero_image_url} alt={article.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
        </div>
      )}
      {article.category && (
        <div style={{ marginBottom: 6 }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)',
          }}>
            {article.category.name}
          </span>
        </div>
      )}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
        lineHeight: 1.3, color: 'var(--color-text)', margin: '0 0 6px 0',
      }}>
        {article.title}
      </h3>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
        color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {article.author?.name || 'Matt Stirling'}
      </span>
    </Link>
  )
}

/* ── Right column compact card (small thumbnail + title) ── */
function RightColCard({ article, isLast }) {
  return (
    <Link to={`/article/${article.slug}`} style={{
      textDecoration: 'none', display: 'flex', gap: 14, alignItems: 'flex-start',
      padding: '16px 0',
      borderBottom: isLast ? 'none' : '1px solid rgba(139, 115, 85, 0.08)',
    }}>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
          lineHeight: 1.35, color: 'var(--color-text)', margin: '0 0 6px 0',
        }}>
          {article.title}
        </h4>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
          color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {article.author?.name || 'Matt Stirling'}
        </span>
      </div>
      {article.hero_image_url && (
        <div style={{
          width: 72, height: 72, borderRadius: 3, overflow: 'hidden', flexShrink: 0,
        }}>
          <img src={article.hero_image_url} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
        </div>
      )}
    </Link>
  )
}

/* ── Grid card for "More Stories" section ── */
function GridCard({ article }) {
  return (
    <Link to={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
      {article.hero_image_url && (
        <div style={{
          width: '100%', aspectRatio: '16/10', borderRadius: 3,
          overflow: 'hidden', marginBottom: 14,
        }}>
          <img src={article.hero_image_url} alt={article.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
        </div>
      )}
      {article.category && (
        <div style={{ marginBottom: 8 }}>
          <CategoryBadge name={article.category.name} slug={article.category.slug} />
        </div>
      )}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
        lineHeight: 1.3, color: 'var(--color-text)', margin: '0 0 8px 0',
      }}>
        {article.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6,
        color: 'var(--color-text-secondary)', margin: '0 0 8px 0',
      }}>
        {article.excerpt?.slice(0, 100)}{article.excerpt?.length > 100 ? '...' : ''}
      </p>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--color-text-faint)',
      }}>
        {formatDate(article.published_at)}
      </span>
    </Link>
  )
}

function FilterButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-sans)', fontSize: 12,
      fontWeight: active ? 600 : 500, padding: '7px 16px',
      border: '1px solid',
      borderColor: active ? 'var(--color-dark)' : 'rgba(139, 115, 85, 0.2)',
      borderRadius: 2,
      background: active ? 'var(--color-dark)' : 'transparent',
      color: active ? 'var(--color-bg)' : 'var(--color-text-secondary)',
      cursor: 'pointer', letterSpacing: '0.03em', transition: 'all 0.2s',
    }}>
      {children}
    </button>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}
