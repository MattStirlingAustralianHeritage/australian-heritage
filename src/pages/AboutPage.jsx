export default function AboutPage() {
  return (
    <div className="page-enter" style={{ maxWidth: 720, margin: '0 auto', padding: '64px 32px 80px' }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 42,
        fontWeight: 700,
        color: 'var(--color-text)',
        margin: '0 0 32px 0',
        letterSpacing: '-0.02em',
        textAlign: 'center',
      }}>
        About
      </h1>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 17,
        lineHeight: 1.85,
        color: '#4A3728',
      }}>
        <p style={{ marginBottom: '1.5em' }}>
          Built on the legacy of the original <em>Australian Heritage</em> magazine, Australian
          Heritage exists to carry forward the tradition of Australian historical journalism into a
          modern, digital space.
        </p>
        <p style={{ marginBottom: '1.5em' }}>
          The publication is committed to deep, rigorously researched storytelling. Each month,
          Australian Heritage publishes long-form historical features alongside shorter pieces that
          explore the people, places, and moments that shaped the nation.
        </p>
        <p style={{ marginBottom: '1.5em' }}>
          Our work challenges and informs, providing an enduring space for Australians to engage with
          their shared history, free from sensationalism and historical amnesia.
        </p>
      </div>
      <div style={{
        marginTop: 48,
        padding: '32px 36px',
        background: 'rgba(44, 24, 16, 0.03)',
        borderLeft: '3px solid var(--color-accent)',
        borderRadius: '0 3px 3px 0',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 12px 0',
        }}>
          Subscribe
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          margin: 0,
        }}>
          Get access to the full archive and new stories delivered to your inbox each month. Join
          a community of readers passionate about Australian history.
        </p>
      </div>
    </div>
  )
}
