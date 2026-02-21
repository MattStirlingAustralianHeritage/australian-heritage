import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Loading from '../components/Loading'

export default function DocumentariesPage() {
  const [documentaries, setDocumentaries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('documentaries')
        .select('*')
        .eq('published', true)
        .order('sort_order')

      setDocumentaries(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="page-enter" style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 42,
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 16px 0',
          letterSpacing: '-0.02em',
        }}>
          Documentaries
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 17,
          fontStyle: 'italic',
          color: 'var(--color-text-muted)',
          margin: 0,
          maxWidth: 520,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Long-form visual storytelling exploring Australia's past.
        </p>
      </div>

      {documentaries.length === 0 ? (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          padding: '60px 0',
          fontStyle: 'italic',
        }}>
          Documentaries coming soon.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {documentaries.map(doc => (
            <div key={doc.id} style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 40,
              background: 'var(--color-dark)',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(44, 24, 16, 0.12)',
            }}>
              <div style={{
                aspectRatio: '16/9',
                background: '#1a0f09',
              }}>
                {doc.embed_url ? (
                  <iframe
                    src={doc.embed_url}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(252, 249, 244, 0.3)',
                    fontFamily: 'var(--font-sans)',
                  }}>
                    Video coming soon
                  </div>
                )}
              </div>
              <div style={{
                padding: '40px 40px 40px 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  {doc.year && (
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                    }}>{doc.year}</span>
                  )}
                  {doc.year && doc.duration && (
                    <span style={{ color: 'rgba(252, 249, 244, 0.25)' }}>·</span>
                  )}
                  {doc.duration && (
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                    }}>{doc.duration}</span>
                  )}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--color-bg)',
                  margin: '0 0 14px 0',
                  lineHeight: 1.3,
                }}>
                  {doc.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'rgba(252, 249, 244, 0.65)',
                  margin: 0,
                }}>
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
