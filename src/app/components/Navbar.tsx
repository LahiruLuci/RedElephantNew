'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/* ─── Data ─── */
const megaCols = [
    {
        title: 'Cultural Triangle',
        links: [
            { label: 'All Cultural Sites', href: '/destinations/cultural' },
            { label: 'Anuradhapura', href: '/destinations/anuradhapura' },
            { label: 'Polonnaruwa', href: '/destinations/polonnaruwa' },
            { label: 'Dambulla', href: '/destinations/dambulla' },
            { label: 'Sigiriya', href: '/destinations/sigiriya' },
            { label: 'Kandy', href: '/destinations/kandy' }
        ],
        subTitle: 'Hill Country',
        subLinks: [
            { label: 'All Hill Country', href: '/destinations/hillcountry' },
            { label: 'Nuwara Eliya', href: '/destinations/nuwaraeliya' },
            { label: 'Ella', href: '/destinations/ella' },
            { label: 'Hatton', href: '/destinations/hatton' },
            { label: 'Badulla', href: '/destinations/badulla' }
        ],
    },
    {
        title: 'Sun and Sand',
        links: [
            { label: 'All Beaches', href: '/destinations/beaches' },
            { label: 'Arugam Bay', href: '/destinations/arugambay' },
            { label: 'Galle & Unawatuna', href: '/destinations/galle' },
            { label: 'Negombo', href: '/destinations/negombo' },
            { label: 'Mirissa/Weligama', href: '/destinations/mirissa' },
            { label: 'Pasikuda/Trinco', href: '/destinations/trincomalee' },
            { label: 'Hikkaduwa', href: '/destinations/hikkaduwa' }
        ],
    },
    {
        title: 'Wildlife',
        links: [
            { label: 'All Parks', href: '/destinations/wildlife' },
            { label: 'Yala National Park', href: '/destinations/yala' },
            { label: 'Udawalawe National Park', href: '/destinations/udawalawe' },
            { label: 'Minneriya National Park', href: '/destinations/minneriya' },
            { label: 'Kumana National Park', href: '/destinations/kumana' },
            { label: 'Kaudulla National Park', href: '/destinations/kaudulla' },
            { label: 'Galoya National Park', href: '/destinations/galoya' },
            { label: 'Wilpattu National Park', href: '/destinations/wilpattu' }
        ],
    },
    {
        title: 'Air/Sea Ports',
        links: [
            { label: 'Global Access Overview', href: '/destinations/all-ports' },
            { label: 'Sky Portals (Airports)', href: '/destinations/airports' },
            { label: 'Maritime Gates (Ports)', href: '/destinations/seaports' }
        ],
    },
];

const leftLinks = ['Home', 'Wellness', 'Weddings & Events'];
const rightLinks = ['About Us', 'Contact'];

const MOBILE_BP = 1024; // px

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDestOpen, setMobileDestOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const megaRef = useRef<HTMLDivElement>(null);

    /* ── window width tracker + mount guard ── */
    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BP);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    /* ── scroll tracker ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── body lock ── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    /* close mobile menu on resize to desktop */
    useEffect(() => {
        if (!isMobile) setMobileOpen(false);
    }, [isMobile]);

    /* ── helpers ── */
    // Link colors adapt: white over hero, dark red over light sections when scrolled
    const linkColor = scrolled ? 'rgba(28,26,24,0.72)' : 'rgba(255,255,255,0.88)';
    const linkHoverC = scrolled ? '#C41E3A' : 'white';
    const linkHoverB = scrolled ? 'rgba(196,30,58,0.07)' : 'rgba(255,255,255,0.08)';

    const baseLinkStyle: React.CSSProperties = {
        fontFamily: 'var(--font-accent)',
        fontSize: '0.88rem',
        fontWeight: 600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: linkColor,
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'color 0.25s, background 0.25s',
    };

    const hoverIn = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.currentTarget.style.color = linkHoverC;
        e.currentTarget.style.background = linkHoverB;
    };
    const hoverOut = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.currentTarget.style.color = linkColor;
        e.currentTarget.style.background = 'none';
    };

    /* ── Pre-hydration skeleton (prevents SSR mismatch) ── */
    if (!mounted) return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 1000, height: '72px',
            background: 'transparent',
        }} />
    );

    /* ─────────────────────────────────────── RENDER ─────────────────────────────────────── */
    return (
        <>
            <header style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                height: '72px',
                /* Not scrolled: transparent over hero. Scrolled: clean white. */
                background: scrolled
                    ? 'rgba(255,253,249,0.97)'
                    : mobileOpen ? 'rgba(255,253,249,0.97)' : 'transparent',
                backdropFilter: (scrolled || mobileOpen) ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: (scrolled || mobileOpen) ? 'blur(20px)' : 'none',
                borderBottom: scrolled
                    ? '1px solid rgba(0,0,0,0.07)'
                    : '1px solid transparent',
                boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
                transition: 'background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
            }}>
                <div style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    height: '100%',
                    padding: '0 20px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    {/* ------------------ MOBILE LAYOUT ------------------ */}
                    {isMobile && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            position: 'relative',
                            height: '72px',
                        }}>
                            {/* Logo � centred initially, slides left on scroll */}
                            <a href="/" style={{
                                position: 'absolute',
                                left: scrolled ? '0px' : '50%',
                                transform: scrolled ? 'translateX(0)' : 'translateX(-50%)',
                                transition: 'left 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                zIndex: 2,
                            }}>
                                <div style={{
                                    position: 'relative',
                                    width: scrolled ? '54px' : '64px',
                                    height: scrolled ? '54px' : '64px',
                                    flexShrink: 0,
                                    transition: 'width 0.4s ease, height 0.4s ease',
                                }}>
                                    <Image src="/assets/headder-logo.png" alt="Red Elephant Travels" fill style={{ objectFit: 'contain' }} priority />
                                </div>
                                {/* Brand text � slides in on scroll */}
                                <div style={{
                                    overflow: 'hidden',
                                    maxWidth: scrolled ? '200px' : '0px',
                                    opacity: scrolled ? 1 : 0,
                                    transition: scrolled
                                        ? 'max-width 0.55s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.45s ease 0.25s'
                                        : 'max-width 0.3s ease, opacity 0.2s ease',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <div style={{ lineHeight: 1.2, paddingRight: '4px' }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            color: linkColor,
                                            letterSpacing: '0.01em',
                                        }}>
                                            <span style={{ color: '#C41E3A' }}>Red</span> Elephant Travels
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/* Invisible spacer so hamburger sits at far right */}
                            <div style={{ flex: 1 }} />

                            {/* Hamburger � anchored to the right */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    zIndex: 3,
                                    outline: 'none',
                                    flexShrink: 0,
                                }}
                            >
                                {[0, 1, 2].map(idx => (
                                    <span key={idx} style={{
                                        display: 'block',
                                        width: (idx === 1 && !mobileOpen) ? '18px' : '24px',
                                        height: '2px',
                                        borderRadius: '2px',
                                        background: scrolled ? '#1C1A18' : 'white',
                                        transition: 'all 0.3s ease',
                                        transform: mobileOpen
                                            ? idx === 0 ? 'translateY(7px) rotate(45deg)'
                                                : idx === 2 ? 'translateY(-7px) rotate(-45deg)'
                                                    : 'none'
                                            : 'none',
                                        opacity: (mobileOpen && idx === 1) ? 0 : 1,
                                    }} />
                                ))}
                            </button>
                        </div>
                    )}
                    {/* ══════════════════ DESKTOP LAYOUT ══════════════════ */}
                    {!isMobile && (
                        <>
                            {/* LEFT NAV — hides on scroll, items migrate to right */}
                            <nav style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                opacity: scrolled ? 0 : 1,
                                transform: scrolled ? 'translateX(50px)' : 'translateX(0)',
                                pointerEvents: scrolled ? 'none' : 'all',
                                transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                                flexShrink: 0,
                            }}>
                                {leftLinks.map(label => {
                                    const href = label === 'Home' ? '/' : label === 'Wellness' ? '/wellness' : label === 'Weddings & Events' ? '/weddings' : '#';
                                    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

                                    return (
                                        <Link key={label} href={href}
                                            style={{
                                                ...baseLinkStyle,
                                                color: isActive ? linkHoverC : linkColor,
                                                background: isActive ? linkHoverB : 'none',
                                                position: 'relative'
                                            }}
                                            onMouseEnter={hoverIn}
                                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                if (!isActive) hoverOut(e);
                                            }}
                                        >
                                            {label}
                                            {isActive && (
                                                <div style={{
                                                    position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
                                                    width: '4px', height: '4px', borderRadius: '50%', background: '#C41E3A',
                                                    animation: 'scale-in 0.3s ease forwards'
                                                }} />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* LOGO — centred at top, slides left on scroll */}
                            <Link
                                href="/"
                                style={{
                                    position: 'absolute',
                                    left: scrolled ? '20px' : '50%',
                                    transform: scrolled ? 'translateX(0)' : 'translateX(-50%)',
                                    transition: 'left 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    textDecoration: 'none',
                                    zIndex: 5,
                                    pointerEvents: 'all',
                                }}
                            >
                                {/* Logo image */}
                                <div style={{
                                    position: 'relative',
                                    width: scrolled ? '52px' : '72px',
                                    height: scrolled ? '52px' : '72px',
                                    flexShrink: 0,
                                    transition: 'width 0.4s ease, height 0.4s ease',
                                }}>
                                    <Image
                                        src="/assets/headder-logo.png"
                                        alt="Red Elephant Travels"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        priority
                                    />
                                </div>

                                {/* Brand text — slides in from left on scroll */}
                                <div style={{
                                    overflow: 'hidden',
                                    maxWidth: scrolled ? '240px' : '0px',
                                    opacity: scrolled ? 1 : 0,
                                    transition: scrolled
                                        ? 'max-width 0.55s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.45s ease 0.25s'
                                        : 'max-width 0.3s ease, opacity 0.2s ease',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <div style={{ lineHeight: 1.15, paddingRight: '6px' }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 700,
                                            fontSize: '1.15rem',
                                            color: linkColor,
                                            letterSpacing: '0.01em',
                                        }}>
                                            <span style={{ color: '#C41E3A' }}>Red</span> Elephant Travels
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* RIGHT NAV — always right, gains left items on scroll */}
                            <nav style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                flexShrink: 0,
                            }}>
                                {/* Left items that migrate here on scroll */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2px',
                                    overflow: 'hidden',
                                    maxWidth: scrolled ? '420px' : '0px',
                                    opacity: scrolled ? 1 : 0,
                                    transition: scrolled
                                        ? 'max-width 0.55s cubic-bezier(0.4,0,0.2,1) 0.1s, opacity 0.45s ease 0.2s'
                                        : 'max-width 0.3s ease, opacity 0.2s ease',
                                    pointerEvents: scrolled ? 'all' : 'none',
                                }}>
                                    {leftLinks.map(label => {
                                        const href = label === 'Home' ? '/' : label === 'Wellness' ? '/wellness' : label === 'Weddings & Events' ? '/weddings' : '#';
                                        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

                                        return (
                                            <Link key={`r-${label}`}
                                                href={href}
                                                style={{
                                                    ...baseLinkStyle,
                                                    paddingLeft: '10px', paddingRight: '10px',
                                                    color: isActive ? linkHoverC : linkColor,
                                                    background: isActive ? linkHoverB : 'none',
                                                    position: 'relative'
                                                }}
                                                onMouseEnter={hoverIn}
                                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                    if (!isActive) hoverOut(e);
                                                }}
                                            >
                                                {label}
                                                {isActive && (
                                                    <div style={{
                                                        position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
                                                        width: '4px', height: '4px', borderRadius: '50%', background: '#C41E3A',
                                                    }} />
                                                )}
                                            </Link>
                                        );
                                    })}
                                    <div style={{ width: '1px', height: '16px', background: scrolled ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)', margin: '0 4px', flexShrink: 0 }} />
                                </div>

                                {/* Destinations mega */}
                                <div
                                    ref={megaRef}
                                    onMouseEnter={() => setMegaOpen(true)}
                                    onMouseLeave={() => setMegaOpen(false)}
                                    style={{ position: 'relative', height: '72px', display: 'flex', alignItems: 'center' }}
                                >
                                    <button
                                        style={baseLinkStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                    >
                                        Destinations
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                            style={{ transition: 'transform 0.2s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}>
                                            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    {/* ─ Mega panel ─ */}
                                    <div style={{
                                        position: 'fixed',
                                        top: '72px',
                                        left: 0,
                                        right: 0,
                                        background: '#0F0F0D', // Match high-end dark background
                                        borderTop: '1.5px solid #C41E3A',
                                        padding: '48px 0 64px',
                                        opacity: megaOpen ? 1 : 0,
                                        pointerEvents: megaOpen ? 'all' : 'none',
                                        transform: megaOpen ? 'translateY(0)' : 'translateY(-10px)',
                                        transition: 'opacity 0.32s cubic-bezier(0.4,0,0.2,1), transform 0.32s cubic-bezier(0.4,0,0.2,1)',
                                        zIndex: 1100,
                                        boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
                                    }}>
                                        <div style={{
                                            maxWidth: '1440px',
                                            margin: '0 auto',
                                            padding: '0 56px',
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(4,1fr)',
                                            gap: '48px',
                                        }}>
                                            {megaCols.map((col, idx) => (
                                                <div key={col.title} style={{
                                                    borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                                    paddingRight: '24px'
                                                }}>
                                                    <h3 style={{
                                                        fontFamily: 'var(--font-accent)',
                                                        fontSize: '1.14rem',
                                                        fontWeight: 500,
                                                        color: '#C41E3A', // Match reference red text
                                                        marginBottom: '26px',
                                                        letterSpacing: '0.01em',
                                                    }}>{col.title}</h3>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                        {col.links.map(l => (
                                                            <li key={l.label}>
                                                                <Link href={l.href} style={{
                                                                    fontFamily: 'var(--font-accent)',
                                                                    fontSize: '0.94rem',
                                                                    fontWeight: 400,
                                                                    color: 'rgba(255,255,255,0.85)',
                                                                    textDecoration: 'none',
                                                                    display: 'block',
                                                                    transition: 'color 0.2s, transform 0.2s',
                                                                }}
                                                                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                                                >{l.label}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {col.subTitle && <>
                                                        <h3 style={{
                                                            fontFamily: 'var(--font-accent)',
                                                            fontSize: '1.14rem',
                                                            fontWeight: 500,
                                                            color: '#C41E3A',
                                                            marginBottom: '26px',
                                                            marginTop: '44px',
                                                            letterSpacing: '0.01em',
                                                        }}>{col.subTitle}</h3>
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                            {(col.subLinks ?? []).map(l => (
                                                                <li key={l.label}>
                                                                    <Link href={l.href} style={{
                                                                        fontFamily: 'var(--font-accent)',
                                                                        fontSize: '0.94rem',
                                                                        fontWeight: 400,
                                                                        color: 'rgba(255,255,255,0.85)',
                                                                        textDecoration: 'none',
                                                                        display: 'block',
                                                                        transition: 'color 0.2s, transform 0.2s',
                                                                    }}
                                                                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                                                    >{l.label}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Regular right links */}
                                {rightLinks.map(label => {
                                    const href = label === 'About Us' ? '/about' : label === 'Contact' ? '/contact' : '#';
                                    const isActive = pathname === (href as string) || ((href as string) !== '/' && pathname.startsWith(href as string));

                                    return (
                                        <Link key={label}
                                            href={href}
                                            style={{
                                                ...baseLinkStyle,
                                                color: isActive ? linkHoverC : linkColor,
                                                background: isActive ? linkHoverB : 'none',
                                                position: 'relative'
                                            }}
                                            onMouseEnter={hoverIn}
                                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                if (!isActive) hoverOut(e);
                                            }}
                                        >
                                            {label}
                                            {isActive && (
                                                <div style={{
                                                    position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
                                                    width: '4px', height: '4px', borderRadius: '50%', background: '#C41E3A',
                                                }} />
                                            )}
                                        </Link>
                                    );
                                })}

                            </nav>
                        </>
                    )}
                </div>
            </header>

            {/* ═══════════════ MOBILE FULL-SCREEN OVERLAY ═══════════════ */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1200,
                background: '#FFFDF9',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.08)',
                borderLeft: '1px solid rgba(0,0,0,0.06)',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
                overflowY: 'auto',
                paddingTop: '0',
                paddingLeft: '0',
                paddingRight: '0',
                paddingBottom: '48px',
                display: isMobile ? 'block' : 'none',
            }}>
                {/* -- Sticky close bar at top of overlay -- */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    background: '#FFFDF9',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                }}>
                    {/* Mini logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                            <Image src="/assets/headder-logo.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <div style={{ fontFamily: 'var(--font-heading)', color: '#1C1A18', fontWeight: 700, fontSize: '1.14rem' }}>
                            <span style={{ color: '#C41E3A' }}>Red</span> Elephant Travels
                        </div>
                    </div>
                    {/* ? Close button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(196,30,58,0.08)',
                            border: '1.5px solid rgba(196,30,58,0.25)',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,30,58,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(196,30,58,0.08)'; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="#C41E3A" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable nav items */}
                <div style={{ padding: '24px 24px 0' }}>
                    {/* Mobile nav items */}
                    {['Home', 'DESTINATIONS_SPECIAL', 'Wellness', 'Weddings & Events', 'About Us', 'Contact'].map((label) => {
                        /* ── Destinations accordion ── */
                        if (label === 'DESTINATIONS_SPECIAL') return (
                            <div key="dest" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                                <button
                                    onClick={() => setMobileDestOpen(v => !v)}
                                    style={{
                                        display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                                        background: 'none', border: 'none', color: '#1C1A18',
                                        fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 600,
                                        letterSpacing: '0.08em', textTransform: 'uppercase',
                                        padding: '18px 0', cursor: 'pointer', textAlign: 'left',
                                    }}
                                >
                                    Destinations
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'rgba(196,30,58,0.15)',
                                        border: '1px solid rgba(196,30,58,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'transform 0.25s',
                                        transform: mobileDestOpen ? 'rotate(180deg)' : 'none',
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="var(--color-primary-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Accordion body */}
                                <div style={{
                                    maxHeight: mobileDestOpen ? '1200px' : '0px',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
                                }}>
                                    <div style={{ paddingBottom: '20px' }}>
                                        {megaCols.map(col => (
                                            <div key={col.title} style={{ marginBottom: '20px' }}>
                                                <div style={{
                                                    fontFamily: 'var(--font-accent)', fontSize: '0.88rem', fontWeight: 700,
                                                    letterSpacing: '0.18em', textTransform: 'uppercase',
                                                    color: 'var(--color-primary-light)',
                                                    marginBottom: '8px', paddingBottom: '6px',
                                                    borderBottom: '1px solid rgba(196,30,58,0.2)',
                                                }}>
                                                    {col.title}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                                    {col.links.map(l => (
                                                        <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                                                            style={{
                                                                display: 'block', color: '#7A7060', textDecoration: 'none',
                                                                fontFamily: 'var(--font-body)', fontSize: '1.14rem',
                                                                padding: '8px 0 8px 14px',
                                                                borderLeft: '2px solid rgba(196,30,58,0.25)',
                                                                transition: 'color 0.2s, border-color 0.2s',
                                                            }}
                                                        >{l.label}</Link>
                                                    ))}
                                                </div>
                                                {col.subTitle && <>
                                                    <div style={{
                                                        fontFamily: 'var(--font-accent)', fontSize: '0.88rem', fontWeight: 700,
                                                        letterSpacing: '0.18em', textTransform: 'uppercase',
                                                        color: 'var(--color-primary-light)',
                                                        marginBottom: '8px', marginTop: '14px', paddingBottom: '6px',
                                                        borderBottom: '1px solid rgba(196,30,58,0.2)',
                                                    }}>
                                                        {col.subTitle}
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        {(col.subLinks ?? []).map(l => (
                                                            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                                                                style={{
                                                                    display: 'block', color: '#7A7060', textDecoration: 'none',
                                                                    fontFamily: 'var(--font-body)', fontSize: '1.14rem',
                                                                    padding: '8px 0 8px 14px',
                                                                    borderLeft: '2px solid rgba(196,30,58,0.25)',
                                                                    transition: 'color 0.2s',
                                                                }}
                                                            >{l.label}</Link>
                                                        ))}
                                                    </div>
                                                </>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                        const href = label === 'Home' ? '/' : label === 'About Us' ? '/about' : label === 'Weddings & Events' ? '/weddings' : label === 'Wellness' ? '/wellness' : label === 'Contact' ? '/contact' : '#';
                        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

                        return (
                            <div key={label} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                                <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        color: isActive ? '#C41E3A' : '#1C1A18', textDecoration: 'none',
                                        fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 600,
                                        letterSpacing: '0.08em', textTransform: 'uppercase',
                                        padding: '18px 0',
                                        background: isActive ? 'rgba(196,30,58,0.04)' : 'none',
                                        paddingLeft: isActive ? '12px' : '0',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {label}
                                    {isActive && (
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C41E3A', marginRight: '12px' }} />
                                    )}
                                </Link>
                            </div>
                        );
                    })}

                    {/* Contact CTA at bottom */}
                    <div style={{ marginTop: '36px' }}>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            background: 'var(--gradient-primary)',
                            color: 'white', textDecoration: 'none',
                            fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: '1rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '14px 28px', borderRadius: '50px',
                            boxShadow: 'var(--shadow-red)',
                        }}>
                            Plan Your Trip
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>  {/* end scrollable nav items */}
            </div>      {/* end mobile overlay panel */}
            {/* ══ GLOBAL KEYFRAMES ══ */}
            <style>{`
                @keyframes scale-in {
                    from { transform: translateX(-50%) scale(0); opacity: 0; }
                    to { transform: translateX(-50%) scale(1); opacity: 1; }
                }
            `}</style>
        </>
    );
}


