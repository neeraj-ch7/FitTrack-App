import { AVATAR_CONFIGS } from '../../constants';

export default function WalkingAvatar({ type = 'blaze', size = 1, showRing = false, showName = false, onClick }) {
  const cfg = AVATAR_CONFIGS[type] || AVATAR_CONFIGS.blaze;
  const s = {
    head: Math.round(30 * size), body: Math.round(18 * size),
    legH: Math.round(12 * size), legW: Math.round(7 * size),
  };
  return (
    <div className="walker-wrap no-select" onClick={onClick} style={{ position: 'relative' }}>
      <div className="walker" style={{ gap: `${Math.round(2 * size)}px` }}>
        {showRing && <div className="walker-ring" style={{ inset: `${-5 * size}px`, borderColor: cfg.color }} />}
        <div style={{ position: 'relative' }}>
          <span className="walker-effect" style={{ top: `${-18 * size}px`, fontSize: `${13 * size}px` }}>{cfg.effect}</span>
          <div className="walker-head" style={{ width: s.head, height: s.head, background: `linear-gradient(135deg,${cfg.color},${cfg.grad})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: `${16 * size}px` }}>{cfg.emoji}</div>
        </div>
        <div className="walker-body" style={{ width: `${18 * size}px`, height: `${14 * size}px`, background: `linear-gradient(135deg,${cfg.color},${cfg.grad})`, borderRadius: `${4 * size}px` }} />
        <div className="walker-legs" style={{ gap: `${Math.round(4 * size)}px` }}>
          <div className="walker-leg-l" style={{ width: s.legW, height: s.legH, background: cfg.color, borderRadius: `${2 * size}px ${2 * size}px ${4 * size}px ${4 * size}px` }} />
          <div className="walker-leg-r" style={{ width: s.legW, height: s.legH, background: cfg.color, borderRadius: `${2 * size}px ${2 * size}px ${4 * size}px ${4 * size}px` }} />
        </div>
        <div className="walker-shadow" />
        {type === 'legend' && <span style={{ position: 'absolute', bottom: `${-16 * size}px`, fontSize: `${10 * size}px`, animation: 'effectFloat 1.5s ease-in-out infinite' }}>✨</span>}
      </div>
      {showName && <span style={{ fontSize: `${10 * size}px`, fontWeight: 700, color: cfg.color, marginTop: 4, fontFamily: 'var(--font)' }}>{cfg.name}</span>}
    </div>
  );
}
