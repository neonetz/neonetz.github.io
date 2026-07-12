import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="hw-btn hw-btn-outline"
      style={{
        position: 'fixed',
        bottom: 'calc(40 * var(--u))',
        right: 'calc(40 * var(--u))',
        zIndex: 50,
        padding: 'calc(16 * var(--u)) calc(20 * var(--u))',
        fontSize: 'calc(16 * var(--u))',
      }}
    >
      ↑
    </button>
  );
}
