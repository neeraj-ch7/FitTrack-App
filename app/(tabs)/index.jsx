// app/(tabs)/index.jsx  ←  Home Screen
import { AVATAR_CONFIGS, LEADERBOARD, XP_PER_LEVEL } from '../../constants';
import { useApp } from '../../hooks';
import MapPreview from '../components/MapPreview';

export default function HomeScreen({ onNav }) {
  const { user, dark, challenges, addXp, addCoins, showToast, setAchievement, setChallenges } = useApp();
  const cfg  = AVATAR_CONFIGS[user.selectedAvatar] || AVATAR_CONFIGS.blaze;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const xpPct    = (user.xp / XP_PER_LEVEL) * 100;

  const completeChallenge = (ch) => {
    if (ch.current < ch.target && ch.id !== 'streak_7') return;
    addXp(ch.xp); addCoins(ch.coins);
    setChallenges(prev => prev.map(c => c.id === ch.id ? { ...c, done: true } : c));
    setAchievement({ icon: ch.icon, title: 'Challenge Complete!', sub: ch.label, xp: ch.xp });
  };

  return (
    <div className="screen slide-in" style={{ background: dark ? '#0F0F13' : 'var(--bg)' }}>
      {/* Header */}
      <div style={{ padding: '0 20px 16px', paddingTop: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => onNav('profile')}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg,${cfg.color},${cfg.grad})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2.5px solid var(--orange)' }}>{cfg.emoji}</div>
              <div style={{ position: 'absolute', bottom: 0, right: -2, width: 14, height: 14, background: 'var(--green)', borderRadius: '50%', border: '2px solid white' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--gray)', fontWeight: 500 }}>{greeting} 👋</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>{user.name}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: dark ? 'rgba(245,158,11,0.15)' : 'var(--gold-light)', padding: '6px 12px', borderRadius: 'var(--r-full)' }}>
              <span style={{ fontSize: 16 }}>🪙</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--coin)' }}>{user.coins.toLocaleString()}</span>
            </div>
            <div style={{ background: 'var(--orange)', color: '#fff', borderRadius: 'var(--r-full)', padding: '5px 10px', fontSize: 11, fontWeight: 700 }}>Lv.{user.level}</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="progress-track" style={{ flex: 1, height: 7 }}>
            <div className="progress-fill" style={{ width: `${xpPct}%`, background: 'linear-gradient(90deg,var(--orange),var(--orange-hover))' }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', whiteSpace: 'nowrap' }}>{user.xp}/{XP_PER_LEVEL} XP</span>
        </div>
      </div>

      {/* Map Canvas */}
      <div style={{ margin: '0 20px', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 210, boxShadow: 'var(--sh-md)' }}>
        <MapPreview dark={dark} />
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(20,20,22,0.8)', borderRadius: 'var(--r-full)', padding: '4px 10px' }}>
            <div className="live-dot" /><span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>TRACKING</span>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(20,20,22,0.7)', borderRadius: 10, padding: '6px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>{((user.totalSteps || 0) / 1000).toFixed(1)}k</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 600 }}>STEPS</span>
          <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', margin: '1px 0' }} />
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>{(user.distance || 0).toFixed(1)}</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 600 }}>KM</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(20,20,22,0.7)', borderRadius: 'var(--r-full)', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10 }}>📍</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600 }}>GPS ±5m • Sector 12</span>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ margin: '14px 20px', display: 'flex', gap: 8 }}>
        {[
          { label:'Calories', val:'482',                                              icon:'🔥', color:'var(--orange)' },
          { label:'Active',   val:'48m',                                              icon:'⏱️', color:'var(--purple)' },
          { label:'Streak',   val:`${user.streak}d`,                                 icon:'🔥', color:'var(--gold)'   },
          { label:'Territory',val:`${Math.round((user.zones||0)/150*100)}%`,          icon:'🗺️', color:'var(--green)'  },
        ].map((s, i) => (
          <div key={i} className="card" style={{ flex: 1, padding: '10px 6px', textAlign: 'center', borderRadius: 12 }}>
            <div style={{ fontSize: 16 }}>{s.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: s.color, marginTop: 2 }}>{s.val}</div>
            <div style={{ fontSize: 9, color: 'var(--gray)', fontWeight: 600, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px' }}>
        <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16 }} onClick={() => onNav('track')}>
          🚶 Start Walking
        </button>
      </div>

      {/* Daily Challenges */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>Daily Challenges</span>
          <span style={{ fontSize: 13, color: 'var(--orange)', fontWeight: 600 }}>Reset in 8h</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {challenges.map(ch => {
            const pct  = Math.min(100, Math.round((ch.current / ch.target) * 100));
            const done = ch.done || ch.current >= ch.target;
            return (
              <div key={ch.id} className="card" style={{ padding: '14px 16px', borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{ch.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>{ch.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 1 }}>{ch.current.toLocaleString()} / {ch.target.toLocaleString()}</div>
                    </div>
                  </div>
                  {done
                    ? <span style={{ fontSize: 18 }}>✅</span>
                    : <button className="btn" style={{ background: ch.color, color: '#fff', borderRadius: 'var(--r-full)', padding: '5px 12px', fontSize: 11, opacity: pct < 100 ? 0.6 : 1 }} onClick={() => completeChallenge(ch)}>+{ch.xp} XP</button>
                  }
                </div>
                <div className="progress-track" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: ch.color }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 6, textAlign: 'right' }}>{pct}% complete</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Territory War */}
      <div style={{ padding: '16px 20px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>Territory War ⚔️</span>
          <span style={{ fontSize: 13, color: 'var(--orange)', fontWeight: 600, cursor: 'pointer' }} onClick={() => onNav('profile')}>See all</span>
        </div>
        <div className="card" style={{ borderRadius: 16, overflow: 'hidden' }}>
          {LEADERBOARD.slice(0, 4).map((p, i) => {
            const pcfg = AVATAR_CONFIGS[p.avatar];
            return (
              <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, background: p.isUser ? (dark ? 'rgba(244,98,31,0.12)' : 'rgba(244,98,31,0.06)') : undefined, borderLeft: p.isUser ? '3px solid #F4621F' : undefined, borderBottom: i < 3 ? `1px solid ${dark ? '#2A2A35' : '#E5E7EB'}` : undefined }}>
                <span style={{ fontSize: 18, width: 28 }}>{['🥇','🥈','🥉','4️⃣'][i]}</span>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg,${pcfg.color},${pcfg.grad})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{pcfg.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>{p.name} {p.isUser && <span style={{ fontSize: 10, background: 'var(--orange)', color: '#fff', borderRadius: 'var(--r-full)', padding: '1px 5px' }}>YOU</span>}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray)' }}>{p.zones} zones • {(p.steps / 1000).toFixed(1)}k steps</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: p.isUser ? 'var(--orange)' : 'var(--gray)' }}>{p.pct}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
