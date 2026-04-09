'use client';

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPackageById } from '../../data/packages';
import RouteTimeline from './RouteTimeline';
import SriLankaMap from './SriLankaMap';
import FaqSection from './FaqSection';
import styles from './page.module.css';

const dark = '#1A1714';
const gold = '#C9A96E';
const cream = '#F8F5F0';
const muted = '#8A8074';

/* ── icons ── */
const Check = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const ArrowLeft = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

/* ── useReveal ── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.06 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, vis };
}

/* ── useWindowWidth ── */
function useWindowWidth() {
    const [w, setW] = useState(0);
    useEffect(() => {
        const update = () => setW(window.innerWidth);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return w;
}

/* ═══════════════════════════════════════════════════════════════ */
export default function TourDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const pkg = getPackageById(id);

    const ww = useWindowWidth();
    const isMobile = ww > 0 && ww <= 768;
    const isTablet = ww > 0 && ww <= 1024;

    const [coverOpacity, setCoverOpacity] = useState(1);
    const [exiting, setExiting] = useState(false);
    const exitTarget = useRef('');
    const heroBgRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);
    const mouseRaf = useRef<number | null>(null);
    const lastScrollY = useRef(0);
    const mouseX = useRef(0.5);
    const mouseY = useRef(0.5);
    const { ref: overviewRef, vis: overviewVis } = useReveal();
    const { ref: highlightRef, vis: highlightVis } = useReveal();
    const { ref: mapRef, vis: mapVis } = useReveal();
    const { ref: inclRef, vis: inclVis } = useReveal();

    const [selectedHeroImg, setSelectedHeroImg] = useState<string | null>(null);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        history.scrollRestoration = 'manual';
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    useEffect(() => {
        document.body.style.overflow = (coverOpacity > 0 || exiting) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [coverOpacity, exiting]);

    useEffect(() => {
        const t = setTimeout(() => setCoverOpacity(0), 60);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!exiting) return;
        const t = setTimeout(() => { history.scrollRestoration = 'auto'; router.push(exitTarget.current); }, 350);
        return () => clearTimeout(t);
    }, [exiting, router]);

    const navigate = useCallback((href: string) => { exitTarget.current = href; setExiting(true); }, []);

    useEffect(() => {
        const update = () => {
            const sy = window.scrollY;
            if (heroBgRef.current) {
                const tx = (mouseX.current - 0.5) * -16;
                const ty = (mouseY.current - 0.5) * -8;
                heroBgRef.current.style.transform = `translateY(${sy * 0.28}px) translate(${tx}px,${ty}px)`;
            }
            lastScrollY.current = sy;
            rafId.current = null;
        };
        const onScroll = () => { if (rafId.current === null) rafId.current = requestAnimationFrame(update); };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); if (rafId.current !== null) cancelAnimationFrame(rafId.current); };
    }, []);

    const onHeroMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect(); if (!rect) return;
        mouseX.current = (e.clientX - rect.left) / rect.width;
        mouseY.current = (e.clientY - rect.top) / rect.height;
        if (mouseRaf.current === null) {
            mouseRaf.current = requestAnimationFrame(() => {
                if (heroBgRef.current) {
                    heroBgRef.current.style.transform = `translateY(${lastScrollY.current * 0.28}px) translate(${(mouseX.current - 0.5) * -16}px,${(mouseY.current - 0.5) * -8}px)`;
                }
                mouseRaf.current = null;
            });
        }
    }, []);

    /* ── responsive values ── */
    const px = isMobile ? 20 : 56;
    const bodyPaddingT = isMobile ? 36 : 72;
    const bodyPaddingB = isMobile ? 108 : 120;
    const heroH = isMobile ? '72vh' : '88vh';
    const heroMinH = isMobile ? '440px' : '520px';
    const inclCols = (ww > 0 && ww <= 560) ? '1fr' : '1fr 1fr';
    const hlCols = (ww > 0 && ww <= 768) ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))';
    const titleSize = isMobile ? 'clamp(1.65rem,7.5vw,2.5rem)' : 'clamp(2rem,6vw,5.5rem)';

    if (!pkg) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: cream, padding: 24 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, color: dark, marginBottom: 16 }}>404</div>
                    <p style={{ fontFamily: 'var(--font-body)', color: muted, marginBottom: 24 }}>Tour package not found.</p>
                    <button onClick={() => navigate('/')} style={{ background: dark, color: 'white', padding: '12px 28px', borderRadius: 50, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontSize: '0.84rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>← Back</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={{ width: '100%', maxWidth: '100vw', position: 'relative', boxSizing: 'border-box' }}>

                {/* cover */}
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: dark, opacity: exiting ? 1 : coverOpacity, pointerEvents: (coverOpacity > 0 || exiting) ? 'all' : 'none', transition: exiting ? 'opacity .32s ease' : 'opacity .5s ease' }} />

                {/* ══ HERO ══ */}
                <div ref={heroRef} onMouseMove={onHeroMouse} style={{ position: 'relative', height: heroH, minHeight: heroMinH, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
                    <div ref={heroBgRef} style={{ position: 'absolute', top: '-18%', bottom: '-18%', left: 0, right: 0, willChange: 'transform' }}>
                        {Array.from(new Set([pkg.heroImage, ...pkg.galleryImages])).map((img: string, i: number) => (
                            <div key={i} style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover', backgroundPosition: 'center',
                                opacity: (selectedHeroImg || pkg.heroImage) === img ? 1 : 0,
                                transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                                willChange: 'opacity'
                            }} />
                        ))}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,8,6,.12) 0%,rgba(10,8,6,.35) 58%,rgba(10,8,6,.88) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${pkg.accent}12 0%,transparent 55%)` }} />

                    <div style={{ position: 'absolute', top: isMobile ? '24%' : '35%', left: 0, right: 0, maxWidth: 1440, margin: '0 auto', paddingLeft: isMobile ? 20 : 56, paddingRight: isMobile ? 20 : 56, boxSizing: 'border-box', zIndex: 3 }}>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: 'clamp(.58rem,1.5vw,.72rem)', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: gold, marginBottom: 10, animation: 'tdFadeUp .7s ease .1s both' }}>{pkg.subtitle}</div>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'white', fontSize: titleSize, margin: '0 0 14px', lineHeight: 1.05, letterSpacing: '-.03em', maxWidth: isMobile ? '100%' : 700, animation: 'tdFadeUp .8s ease .15s both' }}>
                            {pkg.title}
                        </h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, animation: 'tdFadeUp .8s ease .22s both' }}>
                            {[{ icon: '🕐', text: pkg.duration }, { icon: '⚡', text: pkg.difficulty }].map(m => (
                                <div key={m.text} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 50, padding: '6px 13px', fontFamily: 'var(--font-body)', fontSize: 'clamp(.68rem,2vw,.8rem)', color: 'rgba(255,255,255,.9)' }}>
                                    <span>{m.icon}</span>{m.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ GALLERY STRIP ══ */}
                <div style={{ width: '100%', background: dark, boxSizing: 'border-box' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px 16px' : '0', boxSizing: 'border-box' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : (
                                (pkg.galleryImages.slice(0, 3).findIndex(img => (selectedHeroImg || pkg.heroImage) === img) === 1) ? '1fr 2fr 1fr' :
                                (pkg.galleryImages.slice(0, 3).findIndex(img => (selectedHeroImg || pkg.heroImage) === img) === 2) ? '1fr 1fr 2fr' :
                                '2fr 1fr 1fr'
                            ),
                            gap: 3,
                            height: isMobile ? '190px' : '340px',
                            transition: 'grid-template-columns 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                            ...(isMobile ? { borderRadius: 12, overflow: 'hidden' } : {})
                        }}>
                            {pkg.galleryImages.slice(0, 3).map((img: string, i: number) => {
                                const isActive = (selectedHeroImg || pkg.heroImage) === img || (!selectedHeroImg && i === 0 && pkg.heroImage === img);
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedHeroImg(img)}
                                        style={{
                                            position: 'relative', overflow: 'hidden', cursor: 'pointer',
                                            outline: isActive ? `2px solid ${pkg.accent}` : '2px solid transparent',
                                            outlineOffset: '-2px',
                                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            ...(isMobile && i > 0 ? { display: 'none' } : {})
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute', inset: 0,
                                                backgroundImage: `url(${img})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                transition: 'transform 0.8s cubic-bezier(.23,1,.32,1)'
                                            }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.07)')}
                                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
                                        />
                                        {isActive && (
                                            <div style={{
                                                position: 'absolute', bottom: 12, right: 12,
                                                padding: '6px 12px', background: 'rgba(0,0,0,0.5)',
                                                backdropFilter: 'blur(4px)', color: 'white',
                                                fontSize: '0.7rem', fontFamily: 'var(--font-accent)',
                                                letterSpacing: '0.1em', borderRadius: 4,
                                                textTransform: 'uppercase', pointerEvents: 'none',
                                                animation: 'tdFadeUp 0.4s ease'
                                            }}>
                                                Viewing
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ══ BODY (cream background) — full width layout ══ */}
                {(() => {
                    return <BodySection pkg={pkg} isMobile={isMobile}
                        px={px} bodyPaddingT={bodyPaddingT} bodyPaddingB={bodyPaddingB}
                        hlCols={hlCols} inclCols={inclCols}
                        overviewRef={overviewRef} overviewVis={overviewVis}
                        highlightRef={highlightRef} highlightVis={highlightVis}
                        mapRef={mapRef} mapVis={mapVis}
                        inclRef={inclRef} inclVis={inclVis}
                        accent={pkg.accent} cream={cream} dark={dark}
                        navigate={navigate}
                    />;
                })()}
            </div>
        </>
    );
}

/* ── Section label ── */
function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2.5, background: accent, borderRadius: 2, flexShrink: 0 }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem,3vw,1.8rem)', fontWeight: 800, color: dark, margin: 0, letterSpacing: '-.01em' }}>{children}</h2>
        </div>
    );
}

function IncludedItem({ text, isIncluded, accent, isMobile, index, vis }: { text: string; isIncluded: boolean; accent: string; isMobile: boolean; index: number; vis: boolean }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                padding: isMobile ? '12px 14px' : '15px 18px',
                background: hover ? (isIncluded ? `${accent}08` : '#E0525208') : 'transparent',
                borderRadius: 14,
                opacity: vis ? 1 : 0,
                transform: vis ? (hover ? 'translateX(6px)' : 'translateX(0)') : 'translateX(-20px)',
                transition: `all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${vis ? index * 0.05 : 0}s`,
                border: hover ? `1px solid ${isIncluded ? accent + '40' : '#E0525240'}` : '1px solid transparent',
            }}
        >
            <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: isIncluded ? (hover ? accent : `${accent}1A`) : (hover ? '#E05252' : '#E052521A'),
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: hover ? 'white' : (isIncluded ? accent : '#E05252'),
                transition: 'all 0.35s ease',
            }}>
                {isIncluded ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
            </div>
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: isMobile ? '.88rem' : '.95rem',
                color: hover ? '#1A1714' : (isIncluded ? '#4A4038' : '#8A8074'),
                lineHeight: 1.4,
                transition: 'color 0.3s ease',
            }}>
                {text}
            </span>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   BodySection — full width layout
   ══════════════════════════════════════════════════════════════════ */
function BodySection({ pkg, isMobile, px, bodyPaddingT, bodyPaddingB,
    hlCols, inclCols,
    overviewRef, overviewVis, highlightRef, highlightVis,
    mapRef, mapVis, inclRef, inclVis,
    accent, cream, navigate }: any) {

    return (
        <div style={{ background: cream, width: '100%', boxSizing: 'border-box' }}>

            {/* ROW 1: Overview and Highlights */}
            <div style={{ maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
                <div style={{ padding: `${bodyPaddingT}px ${px}px ${isMobile ? 36 : 60}px`, boxSizing: 'border-box' }}>
                    {/* Overview */}
                    <div ref={overviewRef} style={{ marginBottom: isMobile ? 36 : 80, opacity: overviewVis ? 1 : 0, transform: overviewVis ? 'none' : 'translateY(28px)', transition: 'all .65s ease' }}>
                        <SectionLabel accent={accent}>Overview</SectionLabel>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '1rem' : '1.15rem', color: '#5A5248', lineHeight: 1.85, margin: 0, wordBreak: 'break-word', maxWidth: 1000 }}>{pkg.overview}</p>
                    </div>
                    {/* Highlights */}
                    <div ref={highlightRef} style={{ marginBottom: isMobile ? 36 : 60, opacity: highlightVis ? 1 : 0, transform: highlightVis ? 'none' : 'translateY(28px)', transition: 'all .65s ease .08s' }}>
                        <SectionLabel accent={accent}>Tour Highlights</SectionLabel>
                        <div style={{ display: 'grid', gridTemplateColumns: hlCols, gap: 18 }}>
                            {pkg.highlights.map((h: string, i: number) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 12px rgba(0,0,0,.03)', borderLeft: `6px solid ${accent}`, minWidth: 0 }}>
                                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${accent}18`, border: `1.5px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0, marginTop: 1 }}><Check /></div>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.9rem' : '1.05rem', color: '#4A4038', lineHeight: 1.5, wordBreak: 'break-word' }}>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 2: Timeline + Map */}
            <div style={{ maxWidth: 1440, margin: '0 auto', paddingLeft: px, paddingRight: px, boxSizing: 'border-box' }}>
                <div style={{ position: 'relative', zIndex: 20 }}>
                    <RouteTimeline itinerary={pkg.itinerary} accent={accent} isMobile={isMobile} px={px} />
                </div>

                {pkg.mapPoints && pkg.mapPoints.length > 0 && (
                    <div ref={mapRef} style={{
                        position: 'relative',
                        zIndex: 20,
                        marginBottom: isMobile ? 36 : 60,
                        opacity: mapVis ? 1 : 0,
                        transform: mapVis ? 'none' : 'translateY(28px)',
                        transition: 'all .65s ease .1s',
                    }}>
                        <SriLankaMap mapPoints={pkg.mapPoints} mapRoutePoints={pkg.mapRoutePoints || ''} accent={accent} isMobile={isMobile} />
                    </div>
                )}
            </div>

            {/* ROW 3: What's Included + FAQ */}
            <div style={{ maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
                <div style={{ padding: `0 ${px}px ${bodyPaddingB}px`, boxSizing: 'border-box' }}>
                    <div ref={inclRef} style={{ marginBottom: isMobile ? 36 : 60, opacity: inclVis ? 1 : 0, transform: inclVis ? 'none' : 'translateY(28px)', transition: 'all .65s ease .08s' }}>
                        <SectionLabel accent={accent}>What&apos;s Included</SectionLabel>
                        <div style={{ display: 'grid', gridTemplateColumns: inclCols, gap: isMobile ? 24 : 32, marginTop: 24 }}>
                            {/* Included */}
                            <div style={{ background: '#FFFFFF', borderRadius: 24, padding: isMobile ? 20 : 32, border: `1px solid ${accent}25`, boxShadow: '0 12px 40px rgba(0,0,0,.04)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: `linear-gradient(90deg, ${accent}, ${accent}40)` }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}15`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#1A1714' }}>Included</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {pkg.included.map((item: string, i: number) => (
                                        <IncludedItem key={i} text={item} isIncluded={true} accent={accent} isMobile={isMobile} index={i} vis={inclVis} />
                                    ))}
                                </div>
                            </div>
                            {/* Not Included */}
                            <div style={{ background: '#FFFFFF', borderRadius: 24, padding: isMobile ? 20 : 32, border: `1px solid #E0525225`, boxShadow: '0 12px 40px rgba(0,0,0,.04)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: `linear-gradient(90deg, #E05252, #E0525240)` }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `#E0525215`, color: '#E05252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#1A1714' }}>Not Included</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {pkg.excluded.map((item: string, i: number) => (
                                        <IncludedItem key={i} text={item} isIncluded={false} accent={accent} isMobile={isMobile} index={i} vis={inclVis} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {pkg.faq && pkg.faq.length > 0 && (
                        <FaqSection faq={pkg.faq} accent={accent} isMobile={isMobile} contactHref={`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}#contact`} />
                    )}
                </div>
            </div>
            <div style={{ paddingBottom: bodyPaddingB }} />
        </div>
    );
}
