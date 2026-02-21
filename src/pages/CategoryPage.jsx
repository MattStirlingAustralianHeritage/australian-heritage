import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ArticleCard } from '../components/ArticleCard'
import Loading from '../components/Loading'

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      // Fetch category
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()

      setCategory(catData)

      if (catData) {
        // Fetch articles in this category
        const { data: articlesData } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, hero_image_url, featured, published_at, category:categories!articles_category_id_fkey(id, name, slug), author:authors(name)')
          .eq('status', 'published')
          .eq('category_id', catData.id)
          .order('published_at', { ascending: false })

        setArticles(articlesData || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [slug])

  if (loading) return <Loading />

  return (
    <div className="page-enter" style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 42,
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em',
        }}>
          {category?.name || slug}
        </h1>
        {category?.description && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            fontStyle: 'italic',
            color: 'var(--color-text-muted)',
            margin: 0,
            maxWidth: 560,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}>
            {category.description}
          </p>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 36,
      }}>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          padding: '60px 0',
          fontStyle: 'italic',
        }}>
          No stories in this category yet.
        </p>
      )}
    </div>
  )
}
