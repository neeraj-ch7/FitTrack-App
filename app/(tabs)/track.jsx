// app/(tabs)/track.jsx  ←  Live Tracking Screen
import { useState, useEffect } from "react";
import { useTracking } from '../../hooks/useTracking';
import { useApp } from '../../hooks';

export default function TrackingScreen({ onNav }) {
  const { dark } = useApp();
  const { steps, running, time, xpEarned, distance, pace, formatTime, toggle } = useTracking();
  const [showBanner, setShowBanner] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShowBanner(false), 4000); return () => clearTimeout(t); }, []);

  return (
    <div className="screen slide-in" style={{ background: '#141416', minHeight: '100%' }}>
      <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn" style={{ width: 38, height: 38, borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 20, padding: 0 }} onClick={() => onNav('home')}>←</button>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Live Tracking</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.15)', padding: '5px 10px', borderRadius: 'var(--r-full)' }}>
          <div className="live-dot" /><span style={{ fontSize: 11, fontWeight: 700, color: '#EF4444' }}>LIVE</span>
        </div>
      </div>

      <div style={{ margin: '0 20px', borderRadius: 16, overflow: 'hidden', height: 175, position: 'relative', background: '#1a2535' }}>
        <div className="map-grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <svg width="100%" height="175" style={{ position: 'absolute', inset: 0 }}>
          <defs><style>{`@keyframes dash{to{stroke-dashoffset:0}}`}</style></defs>
          <path d="M 20 140 Q 80 100 140 120 Q 200 140 260 110 Q 310 90 340 120" fill="none" stroke="#F4621F" strokeWidth="2.5" strokeDasharray="8 5" style={{ animation: 'dash 1s linear infinite' }} />
          <circle cx="140" cy="120" r="6" fill="#F4621F" />
          <circle cx="140" cy="120" r="10" fill="none" stroke="#F4621F" strokeWidth="1.5" opacity="0.4">
            <animate attributeName="r" values="6;14;6" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(20,20,22,0.8)', borderRadius: 'var(--r-full)', padding: '4px 10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600 }}>📍 Sector 12</span>
        </div>
      </div>

      {showBanner && (
        <div style={{ margin: '12px 20px', background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(244,98,31,0.2))', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)' }}>🎉 Territory Expanding!</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>2 new zones claimed • 30 coins earned • 47 XP</div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 64, fontWeight: 800, color: '#fff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{steps.toLocaleString()}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 4 }}>STEPS</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '8px 20px' }}>
        {[
          { label:'Distance', val:`${distance} km`, color:'#F4621F' },
          { label:'Time',     val:formatTime(time), color:'#fff'    },
          { label:'Pace',     val:`${pace} min/km`, color:'#F59E0B' },
          { label:'XP Earned',val:`+${xpEarned}`,  color:'#7C3AED' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '16px 20px 8px' }}>
        <button className="btn" style={{ width: 52, height: 52, borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 20, padding: 0 }}>🗺️</button>
        <button className="btn" style={{ width: 72, height: 72, borderRadius: 'var(--r-full)', background: 'var(--orange)', color: '#fff', fontSize: 28, padding: 0, boxShadow: 'var(--sh-orange)' }} onClick={toggle}>{running ? '⏸' : '▶'}</button>
        <button className="btn" style={{ width: 52, height: 52, borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 20, padding: 0 }}>⏸</button>
      </div>

      <div style={{ padding: '8px 20px 100px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>MILESTONES</div>
        {[
          { label:'1k Steps',       icon:'✅', color:'var(--green)',  pct:100                           },
          { label:'2 Zones',        icon:'🔥', color:'var(--orange)', pct:50,  xp:150                   },
          { label:'30 coins/zone',  icon:'🪙', color:'var(--coin)',   pct:100                           },
          { label:'8k Goal',        icon:'⭐', color:'var(--purple)', pct:Math.round(steps/8000*100), xp:500 },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 18, width: 24 }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{m.label}</span>
                {m.xp && <span style={{ fontSize: 11, color: m.color, fontWeight: 700 }}>+{m.xp} XP</span>}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--r-full)', height: 5, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 'var(--r-full)', background: m.color, width: `${Math.min(100, m.pct)}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
