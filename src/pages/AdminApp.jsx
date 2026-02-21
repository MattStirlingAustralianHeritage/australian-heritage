import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import LoginPage from './LoginPage'
import AdminDashboard from './AdminDashboard'
import ArticleEditor from './ArticleEditor'

export default function AdminApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('dashboard')
  const [editingArticleId, setEditingArticleId] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setView('dashboard')
  }

  function handleEdit(article) {
    setEditingArticleId(article.id)
    setView('editor')
  }

  function handleNew() {
    setEditingArticleId(null)
    setView('editor')
  }

  function handleBackToDashboard() {
    setView('dashboard')
    setEditingArticleId(null)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FCF9F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#8B7355' }}>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  if (view === 'editor') {
    return (
      <ArticleEditor
        articleId={editingArticleId}
        onBack={handleBackToDashboard}
      />
    )
  }

  return (
    <AdminDashboard
      onEdit={handleEdit}
      onNew={handleNew}
      onLogout={handleLogout}
    />
  )
}
