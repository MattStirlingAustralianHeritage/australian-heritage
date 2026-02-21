const CATEGORY_COLORS = {
  features: { bg: 'rgba(139, 69, 19, 0.1)', color: '#8B4513' },
  places: { bg: 'rgba(34, 87, 60, 0.1)', color: '#22573C' },
  archives: { bg: 'rgba(120, 80, 50, 0.1)', color: '#785032' },
  shortreads: { bg: 'rgba(70, 70, 100, 0.1)', color: '#464664' },
  people: { bg: 'rgba(140, 60, 60, 0.1)', color: '#8C3C3C' },
  frameworks: { bg: 'rgba(60, 90, 110, 0.1)', color: '#3C5A6E' },
  news: { bg: 'rgba(80, 80, 80, 0.1)', color: '#505050' },
  'industry-infrastructure': { bg: 'rgba(100, 80, 60, 0.1)', color: '#64503C' },
  'lives-legacies': { bg: 'rgba(120, 70, 90, 0.1)', color: '#78465A' },
}

export default function CategoryBadge({ name, slug }) {
  const style = CATEGORY_COLORS[slug] || { bg: 'rgba(0,0,0,0.05)', color: '#555' }

  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: 11,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: style.bg,
      color: style.color,
      borderRadius: 2,
    }}>
      {name}
    </span>
  )
}
