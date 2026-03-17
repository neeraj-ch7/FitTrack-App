import { useApp } from '../../hooks';

const CONF_COLORS = ['#F4621F','#F59E0B','#7C3AED','#16A34A','#06B6D4','#EF4444','#F472B6'];

export default function AchievementPopup() {
  const { achievement, setAchievement, dark } = useApp();
  if (!achievement) return null;

  const confetti = Array.from({ length: 45 }, (_, i) => ({
    id: i, color: CONF_COLORS[i % CONF_COLORS.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    dur: `${0.8 + Math.random() * 0.8}s`,
    rot: Math.random() * 360,
  }));

  return (
    <div className="achievement-popup" onClick={() => setAchievement(null)}>
      <div className="bottom-sheet-overlay" style={{ position: 'fixed' }} />
      <div className="achievement-content" style={{ background: dark ? '#1A1A20' : '#fff' }}>
        {confetti.map(c => (
          <div key={c.id} className="confetti-piece" style={{ left: c.left, background: c.color, animationDuration: c.dur, animationDelay: c.delay, transform: `rotate(${c.rot}deg)` }} />
        ))}
        <span className="achievement-icon">{achievement.icon}</span>
        <div style={{ marginTop: 16, fontSize: 24, fontWeight: 800, color: dark ? '#F0F0F5' : '#141416', fontFamily: 'var(--font)' }}>{achievement.title}</div>
        <div style={{ marginTop: 8, fontSize: 15, color: 'var(--gray)', fontWeight: 500 }}>{achievement.sub}</div>
        {achievement.xp > 0 && <div style={{ marginTop: 12, fontSize: 17, fontWeight: 700, color: 'var(--purple)' }}>+{achievement.xp} XP earned!</div>}
        <button className="btn btn-primary" style={{ marginTop: 24, width: '100%', fontSize: 16 }} onClick={() => setAchievement(null)}>Awesome! 🎉</button>
      </div>
    </div>
  );
}
