import { destinations } from '../../data/destinations';
import { packages } from '../../data/packages';

export async function generateTourMetadata(id: string) {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return { title: 'Tour Not Found | Red Elephant Travels' };

    return {
        title: `${pkg.title} | ${pkg.duration} Luxury Tour Sri Lanka`,
        description: pkg.tagline + ' ' + pkg.overview.slice(0, 150) + '...',
        openGraph: {
            title: pkg.title,
            description: pkg.tagline,
            images: [pkg.heroImage],
        }
    };
}

export async function generateDestinationMetadata(id: string) {
    const dest = destinations[id];
    if (!dest) return { title: 'Destination Not Found | Red Elephant Travels' };

    return {
        title: `${dest.name} Travel Guide | ${dest.type} Sri Lanka`,
        description: dest.tagline + ' ' + dest.description.slice(0, 150) + '...',
        openGraph: {
            title: dest.name,
            description: dest.tagline,
            images: [dest.heroImage],
        }
    };
}
