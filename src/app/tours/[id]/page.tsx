import { Metadata, ResolvingMetadata } from 'next'
import { getPackageById } from '../../data/packages'
import TourDetailClient from './TourDetailClient'

interface Props {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const pkg = getPackageById(id)

  if (!pkg) {
    return {
      title: 'Tour Not Found | Red Elephant Travels',
    }
  }

  return {
    title: `${pkg.title} | ${pkg.duration} Sri Lanka Tour | Red Elephant`,
    description: pkg.tagline || pkg.overview.substring(0, 160) + '...',
    keywords: `${pkg.title}, Sri Lanka tour, ${pkg.duration} trip, Red Elephant Travels, ${pkg.category} adventure`,
    openGraph: {
      title: `${pkg.title} Tour`,
      description: pkg.tagline,
      images: [pkg.heroImage],
    },
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { id } = await params
  const pkg = getPackageById(id)

  if (!pkg) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F5F0', padding: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, color: '#1A1714', marginBottom: 16 }}>404</div>
          <p style={{ fontFamily: 'var(--font-body)', color: '#8A8074', marginBottom: 24 }}>Tour package not found.</p>
          <a href="/" style={{ background: '#1A1714', color: 'white', padding: '12px 28px', borderRadius: 50, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontSize: '0.84rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>← Back</a>
        </div>
      </div>
    )
  }

  return <TourDetailClient pkg={pkg} />
}
