'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const baseDark = '#090A09'; 
const muted = '#939A95';
const gold = '#C9A96E';
const subtleBorder = 'rgba(255, 255, 255, 0.04)';
const glassBg = 'rgba(255, 255, 255, 0.02)';

export default function AirSeaPortsPage() {
    const router = useRouter();
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

    const portData = [
        {
            name: "Bandaranaike International Airport (BIA)",
            code: "CMB",
            type: "Airport",
            desc: "The primary international gateway to Sri Lanka, located in Katunayake.",
            image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "Mattala Rajapaksa International Airport (MRIA)",
            code: "HRI",
            type: "Airport",
            desc: "Sri Lanka's second international airport, serving the southern region and wildlife enthusiasts.",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "Port of Colombo",
            code: "Seaport",
            type: "Port",
            desc: "The largest and busiest port in Sri Lanka, a major hub for maritime trade in South Asia.",
            image: "https://images.unsplash.com/photo-1577095973562-da5612c6a014?q=80&w=2069&auto=format&fit=crop"
        },
        {
            name: "Hambantota International Port",
            code: "Seaport",
            type: "Port",
            desc: "A deep-water port on the southern coast, strategically located on the East-West shipping route.",
            image: "https://images.unsplash.com/photo-1494412574743-019485178223?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <div style={{ background: baseDark, minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative' }}>
            <style>{`
                @keyframes fadeUpIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                .stagger-1 { animation: fadeUpIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both; }
                .stagger-2 { animation: fadeUpIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both; }
                .glass-card {
                    background: ${glassBg};
                    backdrop-filter: blur(24px);
                    border: 1px solid ${subtleBorder};
                    border-radius: 20px;
                    padding: 30px;
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .glass-card:hover { transform: translateY(-8px); border-color: ${gold}55; }
            `}</style>

            <div style={{ position: 'relative', height: '60vh', minHeight: 500, width: '100%', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: -60, backgroundImage: 'url(https://images.unsplash.com/photo-1464013708539-75d5ec000732?q=80&w=2070&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', transform: `translateY(${scrolled * 0.4}px)`, transition: 'transform 0.1s linear' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(9,10,9,1) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, maxWidth: 1440, margin: '0 auto', padding: '0 64px' }}>
                    <div className="stagger-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <div style={{ width: 40, height: 1, background: gold }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', color: gold }}>Travel Infrastructure</span>
                    </div>
                    <h1 className="stagger-2" style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '3rem' : '6rem', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-.03em' }}>Air & Sea <span style={{ color: gold }}>Ports</span></h1>
                </div>
            </div>

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '60px 24px' : '100px 64px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 32 }}>
                    {portData.map((port, idx) => (
                        <div key={idx} className="glass-card">
                            <div style={{ width: '100%', height: 250, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
                                <img src={port.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={port.name} />
                            </div>
                            <div style={{ fontFamily: 'var(--font-accent)', color: gold, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>{port.type} • {port.code}</div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>{port.name}</h2>
                            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{port.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
