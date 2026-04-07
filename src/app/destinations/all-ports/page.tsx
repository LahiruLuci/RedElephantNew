'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const gold = '#C9A96E';

export default function AllPortsPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const tiles = [
        {
            title: "Aviation\nHubs",
            tagline: "The Sky Portals of Sri Lanka",
            stat: "3 International Airports",
            href: "/destinations/airports",
            image: "/assets/airport-new.webp",
            imagePos: "center center",
        },
        {
            title: "Maritime\nGates",
            tagline: "Coastal Hubs on the Global Map",
            stat: "3 Strategic Seaports",
            href: "/destinations/seaports",
            image: "/assets/ports/sl-harbors.webp",
            imagePos: "center center",
        }
    ];

    const isSmall = isMobile || isTablet;

    return (
        <div style={{
            background: '#050505',
            minHeight: '100dvh',
            color: 'white',
            overflowX: 'hidden',
            position: 'relative',
            fontFamily: 'var(--font-body)'
        }}>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes lineGrow {
                    from { width: 0; }
                    to { width: 48px; }
                }
                .portal-tile {
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    transition: flex 0.9s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .portal-tile .tile-bg {
                    transition: transform 1.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .portal-tile:hover .tile-bg {
                    transform: scale(1.06);
                }
                .portal-tile .btn-pill {
                    transition: all 0.35s ease;
                    background: transparent;
                    border: 1.5px solid ${gold};
                    color: ${gold};
                }
                .portal-tile:hover .btn-pill {
                    background: ${gold};
                    color: #050505;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(201,169,110,0.35);
                }
                .portal-tile .tile-content {
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                .portal-tile .divider-line {
                    transition: width 0.7s ease;
                    width: 0;
                }
                .portal-tile:hover .divider-line {
                    width: 48px;
                }
                .portal-tile .tagline-text {
                    transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
                    opacity: 0.8;
                }
                .portal-tile:hover .tagline-text {
                    opacity: 1;
                }
            `}</style>

            {/* DESKTOP & TABLET: Side-by-side split */}
            {!isMobile && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100dvh',
                        width: '100%',
                    }}
                    onMouseLeave={() => setHoveredIdx(null)}
                >
                    {tiles.map((tile, idx) => {
                        const isActive = hoveredIdx === idx;
                        const isInactive = hoveredIdx !== null && hoveredIdx !== idx;
                        const flexVal = hoveredIdx === null ? 1 : isActive ? 1.65 : 0.45;

                        return (
                            <div
                                key={idx}
                                className="portal-tile"
                                style={{ flex: flexVal, height: '100dvh' }}
                                onMouseEnter={() => setHoveredIdx(idx)}
                            >
                                {/* Background Image */}
                                <div
                                    className="tile-bg"
                                    style={{
                                        position: 'absolute',
                                        inset: -10,
                                        backgroundImage: `url(${tile.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: tile.imagePos,
                                        zIndex: 1,
                                    }}
                                />

                                {/* Gradient Overlay — light bottom fade only for text legibility */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.2) 40%, transparent 100%)',
                                    transition: 'background 0.7s ease',
                                    zIndex: 2
                                }} />

                                {/* Thin gold vertical line divider (right side only) */}
                                {idx === 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: 1,
                                        height: '100%',
                                        background: `linear-gradient(to bottom, transparent, ${gold}55, transparent)`,
                                        zIndex: 5
                                    }} />
                                )}

                                {/* Content */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    padding: isTablet ? '48px 40px' : '72px 72px',
                                    zIndex: 10,
                                }}>
                                    {/* Eyebrow */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 14,
                                        marginBottom: 24,
                                    }}>
                                        <div style={{
                                            height: 1,
                                            background: gold,
                                            width: isActive ? 48 : 24,
                                            transition: 'width 0.7s ease'
                                        }} />
                                        <span style={{
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.7rem',
                                            letterSpacing: '0.35em',
                                            textTransform: 'uppercase',
                                            color: gold,
                                        }}>Explore Hubs</span>
                                    </div>

                                    {/* Title */}
                                    <h2 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: isActive
                                            ? (isTablet ? '4rem' : '6.5rem')
                                            : (isTablet ? '3rem' : '5rem'),
                                        fontWeight: 900,
                                        lineHeight: 0.9,
                                        letterSpacing: '-0.03em',
                                        color: 'white',
                                        marginBottom: 28,
                                        whiteSpace: 'pre-line',
                                        transition: 'font-size 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}>{tile.title}</h2>

                                    {/* Tagline */}
                                    <p className="tagline-text" style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: isTablet ? '0.95rem' : '1.1rem',
                                        color: 'rgba(255,255,255,0.75)',
                                        marginBottom: 40,
                                        letterSpacing: '0.01em',
                                        lineHeight: 1.5,
                                    }}>{tile.tagline}</p>

                                    {/* Stat pill */}
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '6px 14px',
                                        borderRadius: 100,
                                        background: 'rgba(201,169,110,0.08)',
                                        border: `1px solid ${gold}44`,
                                        color: gold,
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.65rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        marginBottom: 32,
                                    }}>{tile.stat}</div>

                                    {/* CTA Button — always visible */}
                                    <div>
                                        <Link href={tile.href} style={{ textDecoration: 'none' }}>
                                            <button className="btn-pill" style={{
                                                padding: isTablet ? '14px 32px' : '18px 48px',
                                                borderRadius: 100,
                                                fontFamily: 'var(--font-accent)',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                letterSpacing: '0.2em',
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 12,
                                            }}>
                                                View Full Overview
                                                <span style={{ fontSize: '1rem', marginTop: -1 }}>→</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MOBILE: Vertical Stack Cards */}
            {isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
                    {tiles.map((tile, idx) => (
                        <div key={idx} style={{
                            position: 'relative',
                            height: '50dvh',
                            minHeight: 340,
                            overflow: 'hidden',
                        }}>
                            {/* Image */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${tile.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: tile.imagePos,
                                zIndex: 1,
                            }} />

                            {/* Gradient — raw image, only light fade at bottom */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.2) 45%, transparent 100%)',
                                zIndex: 2,
                            }} />

                            {/* Content */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0,
                                padding: '32px 24px',
                                zIndex: 10,
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 12,
                                }}>
                                    <div style={{ height: 1, width: 28, background: gold }} />
                                    <span style={{
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.62rem',
                                        letterSpacing: '0.3em',
                                        textTransform: 'uppercase',
                                        color: gold,
                                    }}>Explore Hubs</span>
                                </div>

                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '2.8rem',
                                    fontWeight: 900,
                                    lineHeight: 0.92,
                                    letterSpacing: '-0.02em',
                                    color: 'white',
                                    marginBottom: 12,
                                    whiteSpace: 'pre-line',
                                }}>{tile.title}</h2>

                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.88rem',
                                    color: 'rgba(255,255,255,0.7)',
                                    marginBottom: 20,
                                    lineHeight: 1.5,
                                }}>{tile.tagline}</p>

                                <Link href={tile.href} style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        padding: '12px 28px',
                                        borderRadius: 100,
                                        border: `1.5px solid ${gold}`,
                                        background: 'rgba(0,0,0,0.45)',
                                        color: gold,
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        backdropFilter: 'blur(10px)',
                                    }}>
                                        View Full Overview
                                        <span style={{ fontSize: '0.9rem' }}>→</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Top-left branding badge */}
            <div style={{
                position: 'fixed',
                top: isMobile ? 'auto' : 32,
                bottom: isMobile ? 24 : 'auto',
                left: isMobile ? '50%' : 48,
                transform: isMobile ? 'translateX(-50%)' : 'none',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                pointerEvents: 'none',
            }}>
                <div style={{ height: 1, width: isMobile ? 28 : 40, background: gold, opacity: 0.6 }} />
                <span style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: gold,
                    opacity: 0.8,
                }}>Global Access Points</span>
                <div style={{ height: 1, width: isMobile ? 28 : 40, background: gold, opacity: 0.6 }} />
            </div>
        </div>
    );
}
