import type { Metadata } from 'next';
import CollectionPage from '../_collection/CollectionPage';

export const metadata: Metadata = {
    title: 'Sri Lanka Wildlife Safaris | Yala, Udawalawe & Minneriya',
    description: "Experience the ultimate safari in Sri Lanka. From leopards in Yala to swimming elephants in Gal Oya. Expert-guided wildlife tours with Red Elephant Travels.",
    keywords: 'Sri Lanka wildlife, leopard safari Yala, elephant gathering Minneriya, Wilpattu national park, Gal Oya boat safari',
};

const wildlifeData = {
    id: 'wildlife',
    title: 'Wild Sri Lanka',
    subtitle: 'National Parks & Reserves',
    headline: 'Where Giants Roam Free',
    description: 'Sri Lanka is a wildlife paradise—one of Asia\'s premier biodiversity hotspots. With the world\'s highest leopard density, the largest Asian elephant gathering on Earth, swimming elephants, and extraordinary birdlife, the island\'s national parks deliver jaw-dropping wilderness encounters.',
    heroImage: '/assets/destination-new-images/wildlife-page-hero-image.jpg',
    accentColor: '#4CAF50',
    accentGradient: 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
    stats: [
        { value: '26', label: 'Protected Areas' },
        { value: '407', label: 'Bird Species' },
        { value: '127', label: 'Mammal Species' },
        { value: '5', label: 'Major Safaris' },
    ],
    destinations: [
        {
            id: 'yala',
            name: 'Yala National Park',
            type: 'National Park',
            tagline: 'The Realm of the Leopard',
            image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
            description: 'Covering 979 sq km, Yala holds the world\'s highest density of leopards. Alongside apex predators, it hosts vast elephant herds, sloth bears, and endemic species.',
            bestTime: 'Feb – Jul',
            famousFor: 'Leopard Safaris & Wildlife',
            highlights: ['Leopard Spotting', 'Elephant Herds', 'Rock Temples'],
        },
        {
            id: 'udawalawe',
            name: 'Udawalawe',
            type: 'National Park',
            tagline: 'Elephant Paradise',
            image: '/assets/wild-life/udawalawe-national-park-1.webp',
            description: 'With open savannah-like landscapes, Udawalawe guarantees incredible elephant sightings year-round alongside the world-famous Elephant Transit Home.',
            bestTime: 'Year Round',
            famousFor: 'Elephant Transit Home',
            highlights: ['Elephant Herds', 'Transit Home', 'Bird Watching'],
        },
        {
            id: 'minneriya',
            name: 'Minneriya',
            type: 'National Park',
            tagline: 'The Great Elephant Gathering',
            image: '/assets/wild-life/minneriya-national-park-1.webp',
            description: 'Each dry season, hundreds of elephants gather around the ancient Minneriya Tank—the largest gathering of Asian elephants on the planet.',
            bestTime: 'Jul – Oct',
            famousFor: 'The Elephant Gathering',
            highlights: ['The Great Gathering', 'Ancient Reservoir', 'Rich Birdlife'],
        },
        {
            id: 'wilpattu',
            name: 'Wilpattu',
            type: 'National Park',
            tagline: 'The Land of Lakes',
            image: '/assets/wild-life/wilpattu-national-park-sri-lanka-1.webp',
            description: 'Sri Lanka\'s largest park, uniquely dotted with natural sand-rimmed lake basins called \'Villus\'. It offers one of the island\'s most authentic, uncrowded safari experiences.',
            bestTime: 'Feb – Oct',
            famousFor: 'Leopards & Natural Lakes',
            highlights: ['Villu Lakes', 'Leopards & Bears', 'Historical Sites'],
        },
        {
            id: 'galoya',
            name: 'Gal Oya National Park',
            type: 'National Park',
            tagline: 'The Untouched Wilderness',
            image: '/assets/wild-life/gal-oya-national-park-sri-lanka-1.webp',
            description: 'The country\'s most secluded park, famous for Sri Lanka\'s only boat safari. Witness elephants swimming between jungle islands in the enormous Senanayake Samudraya reservoir.',
            bestTime: 'Mar – Dec',
            famousFor: 'Swimming Elephants & Boat Safari',
            highlights: ['Boat Safari', 'Swimming Elephants', 'Vedda Village'],
        },
        {
            id: 'kaudulla',
            name: 'Kaudulla',
            type: 'National Park',
            tagline: 'The Elephant Corridor',
            image: '/assets/wild-life/kaudulla-national-park.webp',
            description: 'A vital link in the ancient elephant corridor, Kaudulla offers spectacular sightings of large herds gathering around its historic tank amidst lush evergreen forests.',
            bestTime: 'Aug – Dec',
            famousFor: 'Elephant Herds & Ancient Tanks',
            highlights: ['Elephant Gatherings', 'Scenic Tank Views', 'Diverse Birdlife'],
        },
        {
            id: 'kumana',
            name: 'Kumana',
            type: 'National Park',
            tagline: 'The Bird Sanctuary',
            image: '/assets/wild-life/kumana-national-park-sri-lanka.webp',
            description: 'Sri Lanka\'s premier bird sanctuary, famous for the Kumana Villu where thousands of migratory and endemic birds nest in a pristine mangrove wetland.',
            bestTime: 'Feb – Jun',
            famousFor: 'Rare Birds & Coastal Wilderness',
            highlights: ['Kumana Villu', 'Migratory Birds', 'Untouched Beaches'],
        },
    ],
    relatedTour: { label: 'Wildlife Safari Package', href: '/tours/wildlife-safari' },
};

export default function WildlifePage() {
    return <CollectionPage data={wildlifeData} />;
}
