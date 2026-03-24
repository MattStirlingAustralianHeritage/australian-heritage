import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


const STATE_COLORS = {
  VIC: '#4A7B5E',
  NSW: '#7B5E4A',
  SA:  '#5E4A7B',
  QLD: '#7B6E4A',
  WA:  '#4A6E7B',
  TAS: '#7B4A5E',
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
  const [towns, setTowns] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [activeState, setActiveState] = useState('ALL')
  const [mapLoaded, setMapLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch towns from Supabase
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

  // Filter towns when search or state changes
  useEffect(() => {
    let result = towns
    if (activeState !== 'ALL') {
      result = result.filter(t => t.state === activeState)
    }
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

  // Initialise Mapbox
  useEffect(() => {
    if (!mapContainer.current) return
    if (mapRef.current) return

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

  // Render markers when map is loaded and towns are available
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || towns.length === 0) return
    const map = mapRef.current

    // Clear existing markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    filtered.forEach(town => {
      if (!town.latitude || !town.longitude) return

      const color = STATE_COLORS[town.state] || '#6B5744'

      // Custom marker element
      const el = document.createElement('div')
      el.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      `
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.6)'
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)'
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
      })

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([town.longitude, town.latitude])
        .addTo(map)

      el.addEventListener('click', () => {
        setSelected(town)
        map.flyTo({
          center: [town.longitude, town.latitude],
          zoom: Math.max(map.getZoom(), 7),
          duration: 600,
        })
      })

      markersRef.current.push(marker)
    })
  }, [mapLoaded, filtered])

  // Fly to selected town
  useEffect(() => {
    if (!selected || !mapRef.current) return
    mapRef.current.flyTo({
      center: [selected.longitude, selected.latitude],
      zoom: Math.max(mapRef.current.getZoom(), 7),
      duration: 600,
    })
  }, [selected])

  const states = ['ALL', ...Object.keys(STATE_COLORS)]

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      background: '#FAF7F2',
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 300,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(139, 115, 85, 0.12)',
        background: '#FAF7F2',
        overflow: 'hidden',
      }}>

        {/* Sidebar header */}
        <div style={{ padding: '20px 20px 0' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            color: '#2C1810',
            margin: '0 0 4px 0',
            letterSpacing: '-0.01em',
          }}>
            Heritage Map
          </h1>
          <p style={{
            fontSize: 12,
            color: '#9B8B7A',
            margin: '0 0 14px 0',
            lineHeight: 1.5,
          }}>
            {filtered.length} {filtered.length === 1 ? 'place' : 'places'} across Australia
          </p>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <svg style={{
              position: 'absolute', left: 10, top: '50%',
              transform: 'translateY(-50%)',
              width: 14, height: 14,
              color: '#9B8B7A', pointerEvents: 'none',
            }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search towns, regions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px 8px 30px',
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                border: '1px solid rgba(139, 115, 85, 0.2)',
                borderRadius: 4,
                background: 'white',
                color: '#2C1810',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* State filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            paddingBottom: 14,
            borderBottom: '1px solid rgba(139, 115, 85, 0.1)',
          }}>
            {states.map(s => (
              <button
                key={s}
                onClick={() => setActiveState(s)}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  padding: '4px 8px',
                  borderRadius: 2,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  borderColor: activeState === s
                    ? (STATE_COLORS[s] || '#2C1810')
                    : 'rgba(139, 115, 85, 0.2)',
                  background: activeState === s
                    ? (STATE_COLORS[s] || '#2C1810')
                    : 'transparent',
                  color: activeState === s ? 'white' : '#8B7355',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Town list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {loading ? (
            <p style={{ padding: '24px 20px', fontSize: 13, color: '#9B8B7A', textAlign: 'center' }}>
              Loading places…
            </p>
          ) : filtered.length === 0 ? (
            <p style={{ padding: '24px 20px', fontSize: 13, color: '#9B8B7A', textAlign: 'center', fontStyle: 'italic' }}>
              No places found.
            </p>
          ) : (
            filtered.map(town => (
              <button
                key={town.id}
                onClick={() => setSelected(town)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 20px',
                  background: selected?.id === town.id
                    ? 'rgba(44, 24, 16, 0.05)'
                    : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${selected?.id === town.id ? (STATE_COLORS[town.state] || '#2C1810') : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  if (selected?.id !== town.id) e.currentTarget.style.background = 'rgba(44,24,16,0.03)'
                }}
                onMouseLeave={e => {
                  if (selected?.id !== town.id) e.currentTarget.style.background = 'transparent'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#2C1810',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {town.name}
                  </span>
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: STATE_COLORS[town.state] || '#8B7355',
                    background: `${STATE_COLORS[town.state]}18` || 'rgba(139,115,85,0.1)',
                    padding: '2px 5px',
                    borderRadius: 2,
                  }}>
                    {town.state}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: '#9B8B7A' }}>
                  {town.region}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Map ── */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

        {/* Town detail panel */}
        {selected && (
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            width: 320,
            background: 'white',
            borderRadius: 6,
            boxShadow: '0 8px 32px rgba(44, 24, 16, 0.14)',
            border: '1px solid rgba(139, 115, 85, 0.12)',
            overflow: 'hidden',
            animation: 'slideUp 0.2s ease',
          }}>
            <style>{`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(8px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Coloured top bar */}
            <div style={{
              height: 4,
              background: STATE_COLORS[selected.state] || '#2C1810',
            }} />

            <div style={{ padding: '16px 18px 18px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8,
              }}>
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#2C1810',
                    margin: '0 0 3px 0',
                    letterSpacing: '-0.01em',
                  }}>
                    {selected.name}
                  </h2>
                  <span style={{ fontSize: 11, color: '#9B8B7A' }}>
                    {selected.region} · {STATE_LABELS[selected.state] || selected.state}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    color: '#9B8B7A',
                    fontSize: 18,
                    lineHeight: 1,
                    marginTop: -2,
                  }}
                >×</button>
              </div>

              <p style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: '#6B5744',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-body)',
              }}>
                {selected.description?.slice(0, 200)}
                {selected.description?.length > 200 ? '…' : ''}
              </p>

              <div style={{
                display: 'flex',
                gap: 16,
                paddingTop: 10,
                borderTop: '1px solid rgba(139, 115, 85, 0.1)',
              }}>
                {selected.established && (
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: '#9B8B7A', textTransform: 'uppercase', marginBottom: 2 }}>Est.</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#2C1810' }}>{selected.established}</div>
                  </div>
                )}
                {selected.population > 0 && (
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: '#9B8B7A', textTransform: 'uppercase', marginBottom: 2 }}>Population</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#2C1810' }}>{selected.population.toLocaleString()}</div>
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
