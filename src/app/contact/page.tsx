import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us | Red Elephant Travels & Tours Sri Lanka',
    description: 'Connect with our luxury travel specialists to plan your bespoke Sri Lanka journey. Award-winning service and personalized itineraries.',
    keywords: 'contact Red Elephant, Sri Lanka travel inquiry, plan Sri Lanka trip, luxury travel agent Sri Lanka',
    openGraph: {
        title: 'Contact Red Elephant Travels',
        description: 'Plan your perfect Sri Lanka experience with our experts.',
        type: 'website',
    }
};

export default function ContactPage() {
    return <ContactClient />;
}
