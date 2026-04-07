import { packages } from '../../data/packages';
import { destinations } from '../../data/destinations';

export async function GET() {
    const baseUrl = 'https://redelephanttravels.com';
    
    const staticPages = [
        '',
        '/#packages',
        '/#contact',
    ];

    const tourPages = packages.map(pkg => `/tours/${pkg.id}`);
    const destPages = Object.keys(destinations).map(id => `/destinations/${id}`);

    const allPages = [...staticPages, ...tourPages, ...destPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages.map(page => `
    <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
