import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function ArticleEditor({ articleId, onBack }) {
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    hero_image_url: '',
    hero_image_alt: '',
    status: 'draft',
    featured: false,
    category_id: null,
    meta_title: '',
    meta_description: '',
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(!!articleId)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showMeta, setShowMeta] = useState(false)
  const contentRef = useRef(null)
  const [editorMode, setEditorMode] = useState('visual')

  useEffect(() => {
    fetchCategories()
    if (articleId) fetchArticle()
  }, [articleId])

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    setCategories(data || [])
  }

  async function fetchArticle() {
    setLoading(true)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single()

    if (error) {
      console.error('Error fetching article:', error)
    } else if (data) {
      setArticle({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        hero_image_url: data.hero_image_url || '',
        hero_image_alt: data.hero_image_alt || '',
        status: data.status || 'draft',
        featured: data.featured || false,
        category_id: data.category_id || null,
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
      })
    }
    setLoading(false)
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  function handleTitleChange(value) {
    const updates = { title: value }
    if (!articleId || article.slug === '' || article.slug === generateSlug(article.title)) {
      updates.slug = generateSlug(value)
    }
    setArticle(prev => ({ ...prev, ...updates }))
  }

  async function handleSave(publishNow = false) {
    setSaving(true)
    setSaved(false)

    const payload = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: editorMode === 'visual' && contentRef.current
        ? contentRef.current.innerHTML
        : article.content,
      content_format: 'html',
      hero_image_url: article.hero_image_url || null,
      hero_image_alt: article.hero_image_alt || null,
      status: publishNow ? 'published' : article.status,
      featured: article.featured,
      category_id: article.category_id || null,
      meta_title: article.meta_title || null,
      meta_description: article.meta_description || null,
    }

    if (publishNow && !article.published_at) {
      payload.published_at = new Date().toISOString()
    }

    // Get author ID
    const { data: authorData } = await supabase
      .from('authors')
      .select('id')
      .eq('slug', 'matt')
      .single()

    if (authorData) payload.author_id = authorData.id

    let error
    if (articleId) {
      const result = await supabase.from('articles').update(payload).eq('id', articleId)
      error = result.error
    } else {
      payload.published_at = publishNow ? new Date().toISOString() : null
      const result = await supabase.from('articles').insert(payload).select()
      error = result.error
    }

    if (error) {
      alert('Error saving: ' + error.message)
    } else {
      setSaved(true)
      if (publishNow) {
        setArticle(prev => ({ ...prev, status: 'published' }))
      }
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  function execCommand(command, value = null) {
    document.execCommand(command, false, value)
    contentRef.current?.focus()
  }

  function insertLink() {
    const url = prompt('Enter URL:')
    if (url) execCommand('createLink', url)
  }

  function insertImage() {
    const url = prompt('Enter image URL:')
    if (url) execCommand('insertImage', url)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#FCF9F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#8B7355' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FCF9F4' }}>
      {/* Editor header */}
      <header style={{
        background: '#2C1810',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: 'rgba(252, 249, 244, 0.6)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ← Back
          </button>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16,
            fontWeight: 700,
            color: '#FCF9F4',
          }}>
            {articleId ? 'Edit article' : 'New article'}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: 2,
            background: article.status === 'published' ? 'rgba(34, 87, 60, 0.3)' : 'rgba(196, 149, 106, 0.3)',
            color: article.status === 'published' ? '#8fbc8f' : '#C4956A',
          }}>
            {article.status}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {saved && (
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: '#8fbc8f',
              alignSelf: 'center',
              marginRight: 8,
            }}>
              Saved!
            </span>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: '#FCF9F4',
              background: 'none',
              border: '1px solid rgba(252, 249, 244, 0.3)',
              padding: '7px 16px',
              borderRadius: 3,
              cursor: 'pointer',
            }}
          >
            {saving ? 'Saving...' : 'Save draft'}
          </button>
          {article.status !== 'published' && (
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: '#2C1810',
                background: '#C4956A',
                border: 'none',
                padding: '7px 16px',
                borderRadius: 3,
                cursor: 'pointer',
              }}
            >
              Publish
            </button>
          )}
          {article.status === 'published' && (
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: '#2C1810',
                background: '#C4956A',
                border: 'none',
                padding: '7px 16px',
                borderRadius: 3,
                cursor: 'pointer',
              }}
            >
              Update
            </button>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto' }}>
        {/* Main editor */}
        <div style={{ flex: 1, padding: '32px 40px', maxWidth: 800 }}>
          {/* Title */}
          <input
            type="text"
            value={article.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Article title..."
            style={{
              width: '100%',
              fontFamily: "'Playfair Display', serif",
              fontSize: 36,
              fontWeight: 700,
              color: '#2C1810',
              background: 'none',
              border: 'none',
              outline: 'none',
              marginBottom: 8,
              padding: 0,
              lineHeight: 1.25,
              boxSizing: 'border-box',
            }}
          />

          {/* Slug */}
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: '#9B8B7A',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span>australianheritage.au/</span>
            <input
              type="text"
              value={article.slug}
              onChange={e => setArticle(prev => ({ ...prev, slug: e.target.value }))}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: '#6B5744',
                background: 'rgba(139, 115, 85, 0.06)',
                border: '1px solid rgba(139, 115, 85, 0.12)',
                borderRadius: 3,
                padding: '3px 8px',
                outline: 'none',
              }}
            />
          </div>

          {/* Excerpt */}
          <textarea
            value={article.excerpt}
            onChange={e => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Write a short excerpt..."
            rows={2}
            style={{
              width: '100%',
              fontFamily: "'Source Serif 4', serif",
              fontSize: 16,
              color: '#6B5744',
              fontStyle: 'italic',
              background: 'none',
              border: '1px solid rgba(139, 115, 85, 0.1)',
              borderRadius: 4,
              padding: '12px 16px',
              outline: 'none',
              resize: 'vertical',
              marginBottom: 24,
              lineHeight: 1.6,
              boxSizing: 'border-box',
            }}
          />

          {/* Editor toolbar */}
          <div style={{
            display: 'flex',
            gap: 2,
            padding: '8px 12px',
            background: 'white',
            border: '1px solid rgba(139, 115, 85, 0.15)',
            borderBottom: 'none',
            borderRadius: '4px 4px 0 0',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <ToolbarBtn onClick={() => execCommand('bold')} title="Bold"><b>B</b></ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('italic')} title="Italic"><i>I</i></ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('underline')} title="Underline"><u>U</u></ToolbarBtn>
            <ToolbarDivider />
            <ToolbarBtn onClick={() => execCommand('formatBlock', '<h2>')} title="Heading 2">H2</ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('formatBlock', '<h3>')} title="Heading 3">H3</ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('formatBlock', '<p>')} title="Paragraph">P</ToolbarBtn>
            <ToolbarDivider />
            <ToolbarBtn onClick={() => execCommand('formatBlock', '<blockquote>')} title="Blockquote">"</ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('insertUnorderedList')} title="Bullet list">•</ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('insertOrderedList')} title="Numbered list">1.</ToolbarBtn>
            <ToolbarDivider />
            <ToolbarBtn onClick={insertLink} title="Insert link">🔗</ToolbarBtn>
            <ToolbarBtn onClick={insertImage} title="Insert image">🖼</ToolbarBtn>
            <ToolbarBtn onClick={() => execCommand('insertHorizontalRule')} title="Horizontal rule">—</ToolbarBtn>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 2 }}>
              <button
                onClick={() => setEditorMode('visual')}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  padding: '3px 10px',
                  border: '1px solid rgba(139, 115, 85, 0.15)',
                  borderRadius: 3,
                  background: editorMode === 'visual' ? '#2C1810' : 'transparent',
                  color: editorMode === 'visual' ? '#FCF9F4' : '#8B7355',
                  cursor: 'pointer',
                }}
              >
                Visual
              </button>
              <button
                onClick={() => {
                  if (editorMode === 'visual' && contentRef.current) {
                    setArticle(prev => ({ ...prev, content: contentRef.current.innerHTML }))
                  }
                  setEditorMode('html')
                }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  padding: '3px 10px',
                  border: '1px solid rgba(139, 115, 85, 0.15)',
                  borderRadius: 3,
                  background: editorMode === 'html' ? '#2C1810' : 'transparent',
                  color: editorMode === 'html' ? '#FCF9F4' : '#8B7355',
                  cursor: 'pointer',
                }}
              >
                HTML
              </button>
            </div>
          </div>

          {/* Content editor */}
          {editorMode === 'visual' ? (
            <div
              ref={contentRef}
              contentEditable
              dangerouslySetInnerHTML={{ __html: article.content }}
              onBlur={() => {
                if (contentRef.current) {
                  setArticle(prev => ({ ...prev, content: contentRef.current.innerHTML }))
                }
              }}
              style={{
                minHeight: 500,
                fontFamily: "'Source Serif 4', serif",
                fontSize: '1.125rem',
                lineHeight: 1.85,
                color: '#4A3728',
                background: 'white',
                border: '1px solid rgba(139, 115, 85, 0.15)',
                borderRadius: '0 0 4px 4px',
                padding: '24px 28px',
                outline: 'none',
                overflowY: 'auto',
              }}
              className="article-content"
            />
          ) : (
            <textarea
              value={article.content}
              onChange={e => setArticle(prev => ({ ...prev, content: e.target.value }))}
              style={{
                width: '100%',
                minHeight: 500,
                fontFamily: 'monospace',
                fontSize: 13,
                lineHeight: 1.6,
                color: '#2C1810',
                background: '#1a1a1a',
                border: '1px solid rgba(139, 115, 85, 0.15)',
                borderRadius: '0 0 4px 4px',
                padding: '20px 24px',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
                color: '#e0d8c8',
              }}
            />
          )}
        </div>

        {/* Sidebar */}
        <div style={{
          width: 300,
          padding: '32px 24px',
          borderLeft: '1px solid rgba(139, 115, 85, 0.1)',
          background: 'rgba(44, 24, 16, 0.02)',
        }}>
          {/* Hero image */}
          <SidebarSection title="Hero Image">
            {article.hero_image_url && (
              <img
                src={article.hero_image_url}
                alt=""
                style={{
                  width: '100%',
                  height: 140,
                  objectFit: 'cover',
                  borderRadius: 4,
                  marginBottom: 8,
                }}
              />
            )}
            <input
              type="text"
              value={article.hero_image_url}
              onChange={e => setArticle(prev => ({ ...prev, hero_image_url: e.target.value }))}
              placeholder="Image URL..."
              style={sidebarInputStyle}
            />
            <input
              type="text"
              value={article.hero_image_alt}
              onChange={e => setArticle(prev => ({ ...prev, hero_image_alt: e.target.value }))}
              placeholder="Alt text..."
              style={{ ...sidebarInputStyle, marginTop: 6 }}
            />
          </SidebarSection>

          {/* Category */}
          <SidebarSection title="Category">
            <select
              value={article.category_id || ''}
              onChange={e => setArticle(prev => ({ ...prev, category_id: e.target.value || null }))}
              style={{
                ...sidebarInputStyle,
                cursor: 'pointer',
              }}
            >
              <option value="">No category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </SidebarSection>

          {/* Featured */}
          <SidebarSection title="Options">
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: '#6B5744',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={article.featured}
                onChange={e => setArticle(prev => ({ ...prev, featured: e.target.checked }))}
                style={{ accentColor: '#2C1810' }}
              />
              Featured article
            </label>
          </SidebarSection>

          {/* SEO / Meta */}
          <SidebarSection title="SEO">
            <button
              onClick={() => setShowMeta(!showMeta)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: '#8B7355',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {showMeta ? 'Hide meta fields' : 'Edit meta fields'}
            </button>
            {showMeta && (
              <div style={{ marginTop: 10 }}>
                <input
                  type="text"
                  value={article.meta_title}
                  onChange={e => setArticle(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="Meta title..."
                  style={sidebarInputStyle}
                />
                <textarea
                  value={article.meta_description}
                  onChange={e => setArticle(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Meta description..."
                  rows={3}
                  style={{ ...sidebarInputStyle, marginTop: 6, resize: 'vertical' }}
                />
              </div>
            )}
          </SidebarSection>
        </div>
      </div>
    </div>
  )
}

function SidebarSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#8B7355',
        margin: '0 0 10px 0',
      }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

function ToolbarBtn({ onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        width: 30,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: '1px solid transparent',
        borderRadius: 3,
        cursor: 'pointer',
        color: '#4A3728',
      }}
      onMouseOver={e => e.currentTarget.style.background = 'rgba(139, 115, 85, 0.08)'}
      onMouseOut={e => e.currentTarget.style.background = 'none'}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div style={{ width: 1, height: 20, background: 'rgba(139, 115, 85, 0.15)', margin: '0 4px' }} />
}

const sidebarInputStyle = {
  width: '100%',
  padding: '8px 12px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  border: '1px solid rgba(139, 115, 85, 0.15)',
  borderRadius: 4,
  background: 'white',
  color: '#2C1810',
  outline: 'none',
  boxSizing: 'border-box',
}
