'use client';

import React, { useState } from 'react';
import SuccessModal from '../components/SuccessModal';

// ── Design tokens (unchanged) ──
const C = {
    dark: '#0A0705',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF',
};

export default function ContactClient() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // ── Email / loading / success / error states ──
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ── Client-side validation ──
        if (!formState.name.trim()) {
            setErrorMsg('Please enter your full name.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formState.email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }
        if (!formState.subject.trim()) {
            setErrorMsg('Please enter a subject.');
            return;
        }
        if (!formState.message.trim()) {
            setErrorMsg('Please enter your message.');
            return;
        }

        setErrorMsg('');
        setSuccessMsg('');
        setLoading(true);

        try {
            // ── Send to our secure API route ──
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'contact',     // identifies which form in the API
                    name: formState.name,
                    email: formState.email,
                    subject: formState.subject,
                    message: formState.message,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // API returned an error
                setErrorMsg(data.error || 'Something went wrong. Please try again.');
            } else {
                // ── Success ──
                setIsModalOpen(true);
                setFormState({ name: '', email: '', subject: '', message: '' });
                setSuccessMsg('Thank you for reaching out! Our travel experts will contact you within 24 hours.');
            }
        } catch {
            setErrorMsg('A network error occurred. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ background: C.cream, minHeight: '100vh', color: C.dark }}>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-up  { animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
                .delay-1     { animation-delay: 0.1s; }
                .delay-2     { animation-delay: 0.2s; }
                .delay-3     { animation-delay: 0.3s; }

                .contact-card {
                    background: ${C.white};
                    padding: clamp(24px, 5vw, 40px);
                    border-radius: 24px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .contact-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.06);
                }

                .input-group { margin-bottom: 24px; }
                .input-group label {
                    display: block;
                    font-family: var(--font-accent);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                    color: ${C.muted};
                    font-weight: 700;
                }
                .input-group input,
                .input-group textarea {
                    width: 100%;
                    padding: 16px 20px;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.08);
                    background: ${C.cream}05;
                    font-family: var(--font-body);
                    font-size: 1rem;
                    transition: border-color 0.3s, background 0.3s;
                    outline: none;
                    box-sizing: border-box;
                }
                .input-group input:focus,
                .input-group textarea:focus {
                    border-color: ${C.gold};
                    background: ${C.white};
                }

                /* Disabled state while sending */
                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                    box-shadow: none !important;
                }

                .submit-btn {
                    background: linear-gradient(135deg, ${C.crimson}, #8B0000);
                    color: ${C.white};
                    border: none;
                    padding: 18px 40px;
                    border-radius: 50px;
                    font-family: var(--font-accent);
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.4s;
                    box-shadow: 0 10px 30px rgba(196, 30, 58, 0.3);
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                .submit-btn:not(:disabled):hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 40px rgba(196, 30, 58, 0.45);
                }

                @keyframes contactSpin { to { transform: rotate(360deg); } }
            `}</style>

            {/* ── HERO ── */}
            <section style={{
                position: 'relative', height: '50vh', minHeight: 400,
                background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/assets/header_bg.webp)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.4, filter: 'grayscale(0.2)',
                }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
                    <div className="animate-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                        <span style={{
                            fontFamily: 'var(--font-accent)', fontSize: '0.85rem', color: C.gold,
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
                        }}>Get In Touch</span>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                    </div>
                    <h1 className="animate-up delay-1" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        color: C.white, margin: 0, fontWeight: 900, letterSpacing: '-0.02em',
                    }}>Contact Our Experts</h1>
                </div>
            </section>

            {/* ── CONTENT ── */}
            <section style={{
                maxWidth: 1200, margin: '-80px auto 0', padding: '0 24px 120px',
                position: 'relative', zIndex: 10,
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                    gap: 32,
                }}>
                    {/* ── INFO COLUMN ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div className="contact-card animate-up delay-2">
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 24, fontWeight: 800 }}>
                                Office Headquarters
                            </h3>
                            <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 0 }}>
                                Red Elephant Travels & Tours<br />
                                50/5 Rajamahavihara Road,<br />
                                Mirihana, Kotte.
                            </p>
                        </div>

                        <div className="contact-card animate-up delay-3">
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 24, fontWeight: 800 }}>
                                Connect Directly
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>Phone</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>+94 77 315 71 71</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>Email</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>redelephant.trv@gmail.com</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>WhatsApp</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>+94 77 315 71 71</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── FORM COLUMN ── */}
                    <div className="contact-card animate-up delay-3" style={{ background: C.white }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 32, fontWeight: 800 }}>
                            Send Us a Message
                        </h3>

                        {/* ── Success message ── */}
                        {successMsg && (
                            <div style={{
                                background: 'rgba(91,111,93,0.08)',
                                border: '1px solid rgba(91,111,93,0.3)',
                                borderRadius: 12, padding: '16px 20px',
                                marginBottom: 24,
                                display: 'flex', alignItems: 'flex-start', gap: 12,
                            }}>
                                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>✔</span>
                                <p style={{ margin: 0, color: '#3d5c40', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {successMsg}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="input-group">
                                <label htmlFor="contact-name">Full Name *</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    placeholder="John Doe"
                                    disabled={loading}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="contact-email">Email Address *</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    placeholder="john@example.com"
                                    disabled={loading}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="contact-subject">Subject *</label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    required
                                    value={formState.subject}
                                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                                    placeholder="Tour Inquiry"
                                    disabled={loading}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="contact-message">Your Message *</label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    required
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    placeholder="How can we help you plan your perfect journey?"
                                    disabled={loading}
                                />
                            </div>

                            {/* Error message */}
                            {errorMsg && (
                                <div style={{
                                    color: C.crimson, fontSize: '0.9rem', marginBottom: '20px',
                                    fontFamily: 'var(--font-body)', background: 'rgba(196,30,58,0.06)',
                                    padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(196,30,58,0.15)',
                                }}>
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="submit-btn text-bold"
                                disabled={loading}
                                aria-label="Send your message"
                            >
                                {loading ? (
                                    <>
                                        <span style={{
                                            width: 16, height: 16, borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white', display: 'inline-block',
                                            animation: 'contactSpin 0.8s linear infinite',
                                        }} />
                                        Sending…
                                    </>
                                ) : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={successMsg}
            />
        </main>
    );
}
