import { MetadataRoute } from 'next'
import { packages } from './data/packages'
import { destinations } from './data/destinations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redelephanttravels.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const tourPages: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/tours/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const destPages: MetadataRoute.Sitemap = Object.keys(destinations).map((id) => ({
    url: `${baseUrl}/destinations/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...tourPages, ...destPages]
}
