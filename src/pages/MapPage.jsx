import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const STATE_COLORS = {
  VIC: '#4A7B5E',
  NSW: '#b8862b',
  SA:  '#7B5E4A',
  QLD: '#8B6914',
  WA:  '#4A6E7B',
  TAS: '#6B4A7B',
  NT:  '#7B4A4A',
}

const STATE_LABELS = {
  VIC: 'Victoria',
  NSW: 'New South Wales',
  SA:  'South Australia',
  QLD: 'Queensland',
  WA:  'Western Australia',
  TAS: 'Tasmania',
  NT:  'Northern Territory',
}

export default function MapPage() {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const mbRef = useRef(null)
  const [towns, setTowns] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [activeState, setActiveState] = useState('ALL')
  const [mapLoaded, setMapLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTowns() {
      const { data, error } = await supabase
        .from('towns')
        .select('id, slug, name, state, region, latitude, longitude, description, established, population')
        .eq('published', true)
        .order('name')
      if (error) console.error('Error fetching towns:', error)
      else {
        setTowns(data || [])
        setFiltered(data || [])
      }
      setLoading(false)
    }
    fetchTowns()
  }, [])

  useEffect(() => {
    let result = towns
    if (activeState !== 'ALL') result = result.filter(t => t.state === activeState)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.region?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
      )
    }
    setFiltered(result)
  }, [search, activeState, towns])

  useEffect(() => {
    if (!mapContainer.current) return
    if (mapRef.current) return

    mbRef.current = mapboxgl
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [134.0, -27.0],
      zoom: 3.8,
      minZoom: 2,
      maxZoom: 14,
      projection: 'mercator',
    })
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')
    map.on('load', () => {
      mapRef.current = map
      setMapLoaded(true)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !mbRef.current || towns.length === 0) return
    const mb = mbRef.current
    const map = mapRef.current
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    filtered.forEach(town => {
      if (!town.latitude || !town.longitude) return
      const color = STATE_COLORS[town.state] || '#b8862b'
      const isSelected = selected?.id === town.id

      const el = document.createElement('div')
      el.style.cssText = [
        'width: 9px',
        'height: 9px',
        'border-radius: 50%',
        'background: ' + color,
        'border: 1.5px solid rgba(255,255,255,0.9)',
        'box-shadow: 0 1px 3px rgba(0,0,0,0.35)',
        'cursor: pointer',
        'transition: width 0.15s ease, height 0.15s ease, box-shadow 0.15s ease',
        'transform-origin: center center',
        'position: relative',
      ].join(';')

      el.addEventListener('mouseenter', () => {
        el.style.width = '14px'
        el.style.height = '14px'
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.45)'
      })
      el.addEventListener('mouseleave', () => {
        el.style.width = isSelected ? '13px' : '9px'
        el.style.height = isSelected ? '13px' : '9px'
        el.style.boxShadow = isSelected ? '0 2px 6px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.35)'
      })

      const marker = new mb.Marker({ element: el, anchor: 'center' })
        .setLngLat([town.longitude, town.latitude])
        .addTo(map)

      el.addEventListener('click', () => {
        setSelected(town)
        map.flyTo({
          center: [town.longitude, town.latitude],
          zoom: Math.max(map.getZoom(), 7),
          duration: 800,
          essential: true,
        })
      })

      markersRef.current.push(marker)
    })
  }, [mapLoaded, filtered])

  useEffect(() => {
    if (!selected || !mapRef.current) return
    mapRef.current.flyTo({
      center: [selected.longitude, selected.latitude],
      zoom: Math.max(mapRef.current.getZoom(), 7),
      duration: 800,
    })
  }, [selected])

  const states = ['ALL', ...Object.keys(STATE_COLORS)]

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      background: '#FAF7F2',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 280,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(139,115,85,0.12)',
        background: '#FAF7F2',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '18px 18px 0' }}>
          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", serif)',
            fontSize: 17,
            fontWeight: 700,
            color: '#2C1810',
            margin: '0 0 3px 0',
            letterSpacing: '-0.01em',
          }}>Heritage Map</h1>
          <p style={{ fontSize: 11, color: '#9B8B7A', margin: '0 0 12px 0', lineHeight: 1.5 }}>
            {loading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'place' : 'places'} across Australia`}
          </p>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#9B8B7A', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search towns, regions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 9px 7px 28px',
                fontSize: 12,
                border: '1px solid rgba(139,115,85,0.2)',
                borderRadius: 3,
                background: 'white',
                color: '#2C1810',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* State filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            paddingBottom: 12,
            borderBottom: '1px solid rgba(139,115,85,0.1)',
          }}>
            {states.map(s => (
              <button
                key={s}
                onClick={() => setActiveState(s)}
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  padding: '3px 7px',
                  borderRadius: 2,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                  fontFamily: 'inherit',
                  borderColor: activeState === s ? (STATE_COLORS[s] || '#2C1810') : 'rgba(139,115,85,0.18)',
                  background: activeState === s ? (STATE_COLORS[s] || '#2C1810') : 'transparent',
                  color: activeState === s ? 'white' : '#8B7355',
                }}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Town list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {loading ? (
            <p style={{ padding: '20px 18px', fontSize: 12, color: '#9B8B7A', textAlign: 'center' }}>Loading places…</p>
          ) : filtered.length === 0 ? (
            <p style={{ padding: '20px 18px', fontSize: 12, color: '#9B8B7A', textAlign: 'center', fontStyle: 'italic' }}>No places found.</p>
          ) : filtered.map(town => (
            <button
              key={town.id}
              onClick={() => setSelected(town)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '9px 18px',
                background: selected?.id === town.id ? 'rgba(44,24,16,0.05)' : 'transparent',
                border: 'none',
                borderLeft: `2.5px solid ${selected?.id === town.id ? (STATE_COLORS[town.state] || '#b8862b') : 'transparent'}`,
                cursor: 'pointer',
                transition: 'background 0.12s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (selected?.id !== town.id) e.currentTarget.style.background = 'rgba(44,24,16,0.03)' }}
              onMouseLeave={e => { if (selected?.id !== town.id) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#2C1810',
                  fontFamily: 'var(--font-display, "Playfair Display", serif)',
                }}>{town.name}</span>
                <span style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: STATE_COLORS[town.state] || '#8B7355',
                  background: (STATE_COLORS[town.state] || '#8B7355') + '18',
                  padding: '2px 4px',
                  borderRadius: 2,
                  flexShrink: 0,
                  marginLeft: 6,
                }}>{town.state}</span>
              </div>
              <span style={{ fontSize: 11, color: '#9B8B7A' }}>{town.region}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: 32,
          right: 16,
          background: 'rgba(250,247,242,0.95)',
          borderRadius: 4,
          padding: '10px 12px',
          boxShadow: '0 2px 8px rgba(44,24,16,0.12)',
          border: '1px solid rgba(139,115,85,0.12)',
          fontSize: 10,
          color: '#6B5744',
          lineHeight: 1.8,
          backdropFilter: 'blur(4px)',
        }}>
          {Object.entries(STATE_LABELS).map(([code, name]) => (
            <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: STATE_COLORS[code],
                flexShrink: 0,
              }} />
              <span style={{ fontWeight: 500 }}>{name}</span>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            width: 300,
            background: 'white',
            borderRadius: 5,
            boxShadow: '0 8px 32px rgba(44,24,16,0.16)',
            border: '1px solid rgba(139,115,85,0.12)',
            overflow: 'hidden',
          }}>
            <div style={{ height: 3, background: STATE_COLORS[selected.state] || '#b8862b' }} />
            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display, "Playfair Display", serif)',
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#2C1810',
                    margin: '0 0 2px 0',
                    letterSpacing: '-0.01em',
                  }}>{selected.name}</h2>
                  <span style={{ fontSize: 11, color: '#9B8B7A' }}>
                    {selected.region}{selected.region && ' · '}{STATE_LABELS[selected.state] || selected.state}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', color: '#9B8B7A', fontSize: 20, lineHeight: 1, marginTop: -2, flexShrink: 0 }}
                >×</button>
              </div>

              {selected.description && (
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#6B5744', margin: '0 0 10px 0' }}>
                  {selected.description.slice(0, 220)}{selected.description.length > 220 ? '…' : ''}
                </p>
              )}

              <div style={{ display: 'flex', gap: 14, paddingTop: 9, borderTop: '1px solid rgba(139,115,85,0.1)' }}>
                {selected.established && (
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#9B8B7A', textTransform: 'uppercase', marginBottom: 2 }}>Est.</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2C1810' }}>{selected.established}</div>
                  </div>
                )}
                {selected.population > 0 && (
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#9B8B7A', textTransform: 'uppercase', marginBottom: 2 }}>Population</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2C1810' }}>{selected.population.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
