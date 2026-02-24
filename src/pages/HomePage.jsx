import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CategoryBadge from '../components/CategoryBadge'
import Loading from '../components/Loading'

// ─── SVG Map Teaser Component ──────────────────────────────────────
function MapTeaser() {
  const [activePin, setActivePin] = useState(0)
  
  const featuredLocations = [
    { name: 'Port Arthur', state: 'TAS', x: 485, y: 395, desc: 'Australia\'s most significant convict site' },
    { name: 'Ballarat', state: 'VIC', x: 455, y: 340, desc: 'Heart of the Victorian gold rush' },
    { name: 'Fremantle', state: 'WA', x: 115, y: 310, desc: 'Western Australia\'s historic port city' },
    { name: 'Cooktown', state: 'QLD', x: 470, y: 135, desc: 'Where Cook first set foot on Australian soil' },
    { name: 'Hahndorf', state: 'SA', x: 380, y: 310, desc: 'Australia\'s oldest surviving German settlement' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePin(prev => (prev + 1) % featuredLocations.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="map-teaser">
      <div className="map-teaser-inner">
        <div className="map-teaser-content">
          <span className="section-label">Interactive Heritage Map</span>
          <h2 className="map-teaser-heading">Explore Australia's Heritage</h2>
          <p className="map-teaser-body">
            Discover over 100 historic towns and places of outstanding natural beauty across Australia. 
            Follow curated trails through gold rush country, convict heritage sites, and ancient landscapes.
          </p>
          <div className="map-teaser-location-preview">
            <div className="location-indicator" />
            <div>
              <span className="preview-name">{featuredLocations[activePin].name}</span>
              <span className="preview-state">{featuredLocations[activePin].state}</span>
            </div>
            <span className="preview-desc">{featuredLocations[activePin].desc}</span>
          </div>
          <Link to="/map" className="map-cta-button">
            Explore the Map
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className="map-teaser-visual">
          <svg viewBox="0 0 600 450" className="australia-outline">
            {/* Simplified Australia outline */}
            <path 
              d="M130,280 C125,265 120,250 118,235 C115,215 125,200 130,185 C138,165 150,155 165,150 C175,142 190,138 200,130 C215,120 225,108 240,100 C255,92 270,88 285,82 C300,78 320,75 340,72 C360,70 375,68 390,72 C410,78 425,85 440,95 C452,102 460,112 468,125 C475,138 480,150 488,162 C495,175 505,185 510,198 C515,212 518,225 520,240 C522,255 520,268 515,280 C510,295 502,308 495,318 C488,328 478,335 470,342 C458,352 445,358 432,365 C418,372 405,378 392,382 C378,388 365,392 350,395 C335,398 320,400 305,398 C290,396 275,390 262,385 C250,380 238,372 228,365 C215,355 205,342 195,332 C185,320 175,310 165,300 C155,292 142,285 130,280Z"
              className="aus-landmass"
            />
            {/* Tasmania */}
            <path 
              d="M470,382 C478,378 488,380 492,388 C495,395 492,405 485,408 C478,412 468,408 465,400 C462,392 465,385 470,382Z"
              className="aus-landmass"
            />
            
            {/* Location pins */}
            {featuredLocations.map((loc, i) => (
              <g key={loc.name} className={`map-pin ${i === activePin ? 'active' : ''}`}>
                <circle cx={loc.x} cy={loc.y} r={i === activePin ? 8 : 5} className="pin-outer" />
                <circle cx={loc.x} cy={loc.y} r={3} className="pin-inner" />
                {i === activePin && (
                  <circle cx={loc.x} cy={loc.y} r={16} className="pin-pulse" />
                )}
              </g>
            ))}
            
            {/* Decorative compass */}
            <g transform="translate(540, 60)" className="compass">
              <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="-22" x2="0" y2="-14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="-22" y1="0" x2="-14" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <text x="0" y="-26" textAnchor="middle" className="compass-label">N</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}


// ─── Homepage ──────────────────────────────────────────────────────
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
  
  const filteredRest = activeCategory === 'all'
    ? rest
    : rest.filter(a => a.category?.slug === activeCategory)

  const leftCol = filteredRest.slice(0, 2)
  const rightCol = filteredRest.slice(2, 6)
  const gridArticles = filteredRest.slice(6)

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-AU', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  return (
    <div className="homepage">
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tagline-group">
            <div className="hero-rule" />
            <h1 className="hero-tagline">
              Understanding Australia<br />
              through the stories<br />
              that shaped it
            </h1>
            <p className="hero-subtitle">
              Long-form journalism exploring the social, political, and cultural 
              history of a nation still coming to terms with its past.
            </p>
          </div>
        </div>
        <div className="hero-texture" />
      </section>

      {/* ─── Featured Article ─── */}
      {featured && (
        <section className="featured-section">
          <div className="container">
            <Link to={`/article/${featured.slug}`} className="featured-card">
              {featured.hero_image_url && (
                <div className="featured-image-wrap">
                  <img 
                    src={featured.hero_image_url} 
                    alt={featured.title}
                    className="featured-image"
                  />
                </div>
              )}
              <div className="featured-content">
                {featured.category && (
                  <span className="featured-category">{featured.category.name}</span>
                )}
                <h2 className="featured-title">{featured.title}</h2>
                {featured.excerpt && (
                  <p className="featured-excerpt">{featured.excerpt}</p>
                )}
                <div className="featured-meta">
                  {featured.author?.name && <span>{featured.author.name}</span>}
                  {featured.published_at && (
                    <>
                      <span className="meta-dot">·</span>
                      <span>{formatDate(featured.published_at)}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── Category Filter ─── */}
      <section className="articles-section">
        <div className="container">
          <div className="category-filter">
            <button
              className={`cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`cat-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* ─── Three-Column Layout ─── */}
          <div className="articles-grid-layout">
            {/* Left Column */}
            <div className="col-left">
              {leftCol.map(article => (
                <Link to={`/article/${article.slug}`} key={article.id} className="article-card">
                  {article.hero_image_url && (
                    <div className="card-image-wrap">
                      <img src={article.hero_image_url} alt={article.title} className="card-image" />
                    </div>
                  )}
                  <div className="card-body">
                    {article.category && (
                      <span className="card-category">{article.category.name}</span>
                    )}
                    <h3 className="card-title">{article.title}</h3>
                    {article.excerpt && (
                      <p className="card-excerpt">{article.excerpt}</p>
                    )}
                    <div className="card-meta">
                      {article.author?.name && <span>{article.author.name}</span>}
                      {article.published_at && (
                        <>
                          <span className="meta-dot">·</span>
                          <span>{formatDate(article.published_at)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Column — Compact List */}
            <div className="col-right">
              <h4 className="col-right-heading">Recent</h4>
              {rightCol.map((article, i) => (
                <Link to={`/article/${article.slug}`} key={article.id} className="compact-item">
                  <span className="compact-number">{String(i + 1).padStart(2, '0')}</span>
                  <div className="compact-body">
                    {article.category && (
                      <span className="compact-category">{article.category.name}</span>
                    )}
                    <h4 className="compact-title">{article.title}</h4>
                    <span className="compact-meta">{formatDate(article.published_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ─── More Articles Grid ─── */}
          {gridArticles.length > 0 && (
            <>
              <div className="section-divider" />
              <div className="more-grid">
                {gridArticles.map(article => (
                  <Link to={`/article/${article.slug}`} key={article.id} className="grid-card">
                    {article.hero_image_url && (
                      <div className="grid-image-wrap">
                        <img src={article.hero_image_url} alt={article.title} className="grid-image" />
                      </div>
                    )}
                    <div className="grid-body">
                      {article.category && (
                        <span className="card-category">{article.category.name}</span>
                      )}
                      <h3 className="grid-title">{article.title}</h3>
                      <div className="card-meta">
                        {article.author?.name && <span>{article.author.name}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── Map Teaser ─── */}
      <MapTeaser />
    </div>
  )
}
