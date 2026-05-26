'use client';

import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsMounted(false), 400);
            document.body.style.overflow = '';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isMounted && !isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            pointerEvents: isOpen ? 'all' : 'none',
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10, 7, 5, 0.6)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                }}
            />

            {/* Modal Card */}
            <div style={{
                position: 'relative',
                background: '#FFFFFF',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '32px',
                padding: '48px 32px',
                textAlign: 'center',
                boxShadow: '0 30px 100px rgba(0,0,0,0.2)',
                transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1.1)',
            }}>
                {/* Success Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(91, 111, 93, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 32px',
                    color: '#3d5c40',
                    fontSize: '2.5rem',
                    animation: isOpen ? 'popIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1.3) forwards' : 'none',
                }}>
                    ✓
                </div>

                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#0A0705',
                    marginBottom: '16px',
                    letterSpacing: '-0.02em',
                }}>
                    Message Sent
                </h3>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    color: '#8A8074',
                    marginBottom: '40px',
                }}>
                    {message || "Thank you for reaching out! Our travel experts will contact you within 24 hours."}
                </p>

                <button
                    onClick={onClose}
                    style={{
                        background: 'linear-gradient(135deg, #C41E3A, #8B0000)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '16px 40px',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.4s',
                        boxShadow: '0 10px 30px rgba(196, 30, 58, 0.3)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(196, 30, 58, 0.45)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(196, 30, 58, 0.3)';
                    }}
                >
                    Close
                </button>

                <style>{`
                    @keyframes popIn {
                        from { transform: scale(0); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default SuccessModal;
