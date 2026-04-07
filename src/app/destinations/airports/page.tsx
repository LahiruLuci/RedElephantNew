'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const baseDark = '#090A09';
const gold = '#C9A96E';
const subtleBorder = 'rgba(255, 255, 255, 0.04)';
const glassBg = 'rgba(255, 255, 255, 0.02)';

export default function AirportsPage() {
    const [scrolled, setScrolled] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        handleResize();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const airports = [
        {
            id: 'bia',
            name: "Bandaranaike International",
            code: "BIA / CMB",
            desc: "The primary international gateway to Sri Lanka. Strategically positioned as a major aviation hub in South Asia, BIA offers world-class facilities and seamless connectivity.",
            image: "/assets/airport/katunayake-air-port.webp", // Katunayake = BIA
            details: "Equipped with state-of-the-art silk-route lounges and executive services."
        },
        {
            id: 'mria',
            name: "Mattala Rajapaksa International",
            code: "MRIA / HRI",
            desc: "The world's second 'green' airport, serving the island's wildlife and southern exploration region with modern luxury and eco-conscious engineering.",
            image: "/assets/airport/mattala-air-port.webp", // Mattala Airport
            details: "Fastest access to Yala National Park and southern beach resorts."
        },
        {
            id: 'jaffna',
            name: "Jaffna International",
            code: "JIA / JAF",
            desc: "Connecting the vibrant northern peninsula to the regional neighbours, JIA stands as a symbol of rejuvenation and northern heritage.",
            image: "/assets/airport/jaffna-air-port.webp", // Jaffna Airport
            details: "A key gateway for cultural exploration in the northern province."
        }
    ];

    return (
        <div style={{ background: baseDark, minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative' }}>
            <style>{`
                @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(1deg); } 100% { transform: translateY(0px) rotate(0deg); } }
                @keyframes slideIn { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
                .airport-card { cursor: crosshair; }
                .airport-card:hover .img-container img { transform: scale(1.1); }
                .airport-card:hover .overlay { opacity: 0.2 !important; }
            `}</style>

            {/* Cinematic Hero */}
            <div style={{ position: 'relative', height: '100dvh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', background: '#090A09' }}>
                <div style={{ 
                    position: 'absolute', 
                    inset: -60, 
                    backgroundImage: 'url(/assets/airport-new.webp)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    transform: `translateY(${scrolled * 0.4}px)`, // Classic smooth parallax
                    transition: 'transform 0.1s linear',
                    zIndex: 1
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,10,9,0.1) 0%, rgba(9,10,9,0.3) 60%, rgba(9,10,9,0.9) 100%)', zIndex: 2 }} />
                <div style={{ position: 'relative', zIndex: 10, padding: isMobile ? '72px 24px 0' : '0 24px', maxWidth: 1200 }}>
                    <div style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, fontSize: isMobile ? '0.75rem' : '0.9rem', marginBottom: 20, animation: 'slideIn 1s ease both' }}>Aviation Excellence</div>
                    <h1 style={{ 
                        fontFamily: 'var(--font-heading)', 
                        fontSize: isMobile ? '3.8rem' : '10.5rem', 
                        fontWeight: 900, 
                        lineHeight: 0.9, 
                        margin: 0, 
                        letterSpacing: '-0.04em',
                        wordBreak: 'normal',
                        color: 'white'
                    }}>
                        SKY <br /><span style={{ color: 'white', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>PORTALS</span>
                    </h1>
                </div>
                <div style={{ position: 'absolute', bottom: 40, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 1, height: isMobile ? 40 : 60, background: `linear-gradient(to bottom, ${gold}, transparent)` }} />
                </div>
            </div>

            {/* Grid Section */}
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: isMobile ? '60px 20px' : '160px 80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 32 : 40 }}>
                    {airports.map((airport, idx) => (
                        <div key={idx} className="airport-card" style={{ 
                            position: 'relative', 
                            height: isMobile ? 'auto' : 750, 
                            overflow: 'hidden', 
                            borderRadius: isMobile ? 28 : 32, 
                            border: `1px solid ${subtleBorder}`, 
                            transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            background: isMobile ? 'rgba(255,255,255,0.01)' : 'transparent'
                        }}>
                            <div className="img-container" style={{ position: isMobile ? 'relative' : 'absolute', inset: 0, height: isMobile ? 320 : '100%', width: '100%' }}>
                                <img src={airport.image} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }} alt={airport.name} />
                                <div className="overlay" style={{ position: 'absolute', inset: 0, background: '#000', opacity: isMobile ? 0.35 : 0.45, transition: 'opacity 0.6s' }} />
                                {!isMobile && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,10,9,1) 0%, transparent 60%)' }} />}
                            </div>
                            <div style={{ 
                                position: isMobile ? 'relative' : 'absolute', 
                                bottom: 0, left: 0, right: 0, 
                                padding: isMobile ? '32px 24px' : 48, 
                                zIndex: 10,
                                background: isMobile ? 'linear-gradient(to top, rgba(9,10,9,1) 0%, rgba(9,10,9,0.9) 100%)' : 'transparent'
                            }}>
                                <div style={{ fontFamily: 'var(--font-accent)', color: gold, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>{airport.code}</div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2rem' : '2.8rem', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>{airport.name}</h2>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '0.92rem' : '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24 }}>{airport.desc}</p>
                                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 24 }} />
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: gold, fontStyle: 'italic', letterSpacing: '0.02em', lineHeight: 1.5 }}>"{airport.details}"</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
