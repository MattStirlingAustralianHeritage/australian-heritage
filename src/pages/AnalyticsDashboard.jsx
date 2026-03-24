import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AnalyticsDashboard({ articles }) {
  const [stats, setStats] = useState(null)
  const [topArticles, setTopArticles] = useState([])
  const [monthly, setMonthly] = useState([])

  useEffect(() => {
    async function load() {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      const [{ count: total }, { count: views30d }, { data: viewData }] = await Promise.all([
        supabase.from('page_views').select('*', { count: 'exact', head: true }),
        supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('viewed_at', thirtyDaysAgo),
        supabase.from('page_views').select('article_id, viewed_at').gte('viewed_at', thirtyDaysAgo),
      ])
      setStats({ total: total || 0, views30d: views30d || 0 })
      if (viewData?.length) {
        const counts = {}
        viewData.forEach(v => { if (v.article_id) counts[v.article_id] = (counts[v.article_id] || 0) + 1 })
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8)
        setTopArticles(sorted.map(([id, views]) => {
          const a = articles.find(x => x.id === id)
          return { id, views, title: a?.title || 'Unknown', category: a?.category?.name || '' }
        }))
        const byMonth = {}
        viewData.forEach(v => { const m = v.viewed_at.slice(0, 7); byMonth[m] = (byMonth[m] || 0) + 1 })
        setMonthly(Object.entries(byMonth).sort().slice(-6))
      }
    }
    load()
  }, [articles])

  const maxV = topArticles[0]?.views || 1
  const maxM = Math.max(...monthly.map(([, v]) => v), 1)
  const card = { background: 'rgba(139,115,85,0.08)', borderRadius: 6, padding: '16px 20px' }
  const lbl = { fontSize: 11, color: '#8a7d6b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 6 }
  const val = { fontSize: 28, fontWeight: 400, fontFamily: "'Source Serif 4', serif", color: '#2C1810' }

  if (!stats) return <div style={{ color: '#8a7d6b', fontSize: 14, padding: '40px 0' }}>Loading analytics...</div>

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
        <div style={card}><div style={lbl}>Total views</div><div style={val}>{stats.total.toLocaleString()}</div></div>
        <div style={card}><div style={lbl}>Views — 30 days</div><div style={val}>{stats.views30d.toLocaleString()}</div></div>
        <div style={card}><div style={lbl}>Published articles</div><div style={val}>{articles.filter(a => a.status === 'published').length}</div></div>
      </div>
      {monthly.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a7d6b', marginBottom: 14 }}>Views by month</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {monthly.map(([month, count]) => (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: '#C4956A', borderRadius: '2px 2px 0 0', height: Math.round((count / maxM) * 64) + 'px', minHeight: '2px' }} />
                <div style={{ fontSize: 10, color: '#8a7d6b' }}>{month.slice(5)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {topArticles.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a7d6b', marginBottom: 14 }}>Top articles — last 30 days</div>
          <div style={{ border: '1px solid rgba(139,115,85,0.15)', borderRadius: 6, overflow: 'hidden' }}>
            {topArticles.map((a, i) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 16px', borderBottom: i < topArticles.length - 1 ? '1px solid rgba(139,115,85,0.1)' : 'none' }}>
                <span style={{ fontSize: 12, color: '#8a7d6b', width: 18, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: '#2C1810', fontFamily: "'Source Serif 4', serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                  {a.category && <div style={{ fontSize: 11, color: '#8a7d6b', marginTop: 2 }}>{a.category}</div>}
                </div>
                <div style={{ width: 80, flexShrink: 0 }}>
                  <div style={{ height: 4, background: 'rgba(139,115,85,0.15)', borderRadius: 2 }}>
                    <div style={{ height: 4, width: Math.round((a.views / maxV) * 100) + '%', background: '#C4956A', borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#2C1810', minWidth: 36, textAlign: 'right' }}>{a.views}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {topArticles.length === 0 && <div style={{ color: '#8a7d6b', fontSize: 14, padding: '40px 0' }}>No view data yet — analytics will appear once articles are visited.</div>}
    </div>
  )
}
