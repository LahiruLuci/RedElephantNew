'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const baseDark = '#080808';
const gold = '#C9A96E';
const subtleBorder = 'rgba(255, 255, 255, 0.04)';
const glassBg = 'rgba(255, 255, 255, 0.015)';

export default function SeaportsPage() {
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

    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const ports = [
        {
            name: "Port of Colombo",
            status: "The Strategic Hub",
            desc: "The largest and busiest port in Sri Lanka, a major hub for maritime trade in South Asia. Colombo's port is a cornerstone of the regional Silk Road, integrating ancient routes with cutting-edge global logistics.",
            image: "/assets/ports/colombo-port.webp",
            metrics: ["Top 25 Global Port", "7M+ TEU Capacity"]
        },
        {
            name: "Hambantota International",
            status: "The Southern Milestone",
            desc: "Located on the crossroads of the East-West shipping line, Hambantota is a deep-water port designed for the giants of the sea. It represents the future of the Indian Ocean's blue economy.",
            image: "/assets/ports/hambanthota-harbor.webp",
            metrics: ["Strategic Location", "Transshipment Hub"]
        },
        {
            name: "Trincomalee Harbour",
            status: "The Natural Marvel",
            desc: "The world's second-deepest natural harbour. Known for its historical significance and breathtaking geography, Trincomalee is a hidden pearl of the maritime world.",
            image: "/assets/ports/trincomalee.webp",
            metrics: ["Natural Deep Water", "Historic Gateway"]
        }
    ];

    return (
        <div style={{ background: baseDark, minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative' }}>
            <style>{`
                @keyframes shimmer { 0% { left: -100%; } 100% { left: 100%; } }
                .shimmer-bg::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); animation: shimmer 3s infinite; }
                .port-item { overflow: hidden; position: relative; cursor: pointer; transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1); }
                .port-item:hover .details { transform: translateY(0); opacity: 1; }
                .details { transform: translateY(40px); opacity: 0; transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s; }
            `}</style>

            <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    height: isMobile ? 'auto' : '100dvh', 
                    width: '100%',
                    paddingTop: isMobile ? '72px' : '0px'
                }}
                onMouseLeave={() => !isMobile && setHoveredIdx(null)}
            >
                {ports.map((port, idx) => (
                    <div 
                        key={idx} 
                        className="port-item shimmer-bg" 
                        onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                        style={{ 
                            flex: isMobile 
                                ? 'none' 
                                : hoveredIdx === null 
                                    ? 1 
                                    : hoveredIdx === idx 
                                        ? 2.5 
                                        : 0.6, 
                            minHeight: isMobile ? '70vh' : '80vh',
                            paddingBottom: isMobile ? 80 : 0,
                            borderBottom: 'none',
                            position: 'relative'
                        }}
                    >
                        {/* Raw background image */}
                        <img 
                            src={port.image} 
                            className="port-img" 
                            style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                transition: 'all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)', 
                                filter: 'none'
                            }} 
                            alt={port.name} 
                        />

                        {/* Mobile: natural gradient for text readability. Desktop: dark text-area backdrop only */}
                        <div style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: isMobile 
                                ? 'linear-gradient(to bottom, transparent 0%, rgba(9,10,9,0.4) 40%, rgba(9,10,9,0.95) 90%)' 
                                : 'transparent',
                            zIndex: 2 
                        }} />
                        {/* Desktop-only: dark backdrop behind bottom text area */}
                        {!isMobile && (
                            <div style={{ 
                                position: 'absolute', 
                                bottom: 0, left: 0, right: 0, 
                                height: '60%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                                zIndex: 3
                            }} />
                        )}

                        {/* Content Container */}
                        <div style={{ 
                            position: 'absolute', 
                            bottom: 0, left: 0, right: 0, 
                            padding: isMobile ? '40px 24px' : 60, 
                            zIndex: 10, 
                            textAlign: 'left'
                        }}>
                            <div style={{ 
                                fontFamily: 'var(--font-accent)', 
                                color: gold, 
                                fontSize: '0.7rem', 
                                letterSpacing: '0.25em', 
                                textTransform: 'uppercase', 
                                marginBottom: 12, 
                                textShadow: '0 2px 10px rgba(0,0,0,0.8)' 
                            }}>{port.status}</div>
                            
                            <h2 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                fontSize: isMobile ? '2.4rem' : (hoveredIdx === idx ? '3.8rem' : '2.4rem'), 
                                fontWeight: 900, 
                                marginBottom: isMobile ? 16 : (hoveredIdx === idx ? 40 : 20), 
                                lineHeight: 1.1, 
                                letterSpacing: '-0.02em',
                                color: 'white',
                                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}>{port.name}</h2>
                            
                            <div className={isMobile ? "" : "details"} style={{ 
                                opacity: (isMobile || hoveredIdx === idx) ? 1 : 0, 
                                transform: (isMobile || hoveredIdx === idx) ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                position: 'relative'
                            }}>
                                <p style={{ 
                                    fontFamily: 'var(--font-body)', 
                                    fontSize: isMobile ? '0.96rem' : '1.05rem', 
                                    color: 'rgba(255,255,255,0.85)', 
                                    lineHeight: 1.6, 
                                    marginBottom: 28, 
                                    maxWidth: hoveredIdx === idx || isMobile ? 600 : 300, 
                                    textShadow: '0 2px 10px rgba(0,0,0,0.8)' 
                                }}>{port.desc}</p>
                                
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    {port.metrics.map((m, mIdx) => (
                                        <div key={mIdx} style={{ 
                                            padding: '8px 16px', 
                                            borderRadius: 40, 
                                            border: `1px solid ${gold}`, 
                                            background: 'rgba(0,0,0,0.5)', 
                                            color: gold, 
                                            fontFamily: 'var(--font-accent)', 
                                            fontSize: '0.65rem', 
                                            fontWeight: 700, 
                                            letterSpacing: '0.1em',
                                            backdropFilter: 'blur(10px)'
                                        }}>{m}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 1000, mixBlendMode: 'difference' }}>
                <Link href="/" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-accent)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>SCROLL TO EXPLORE</Link>
            </div>
        </div>
    );
}
