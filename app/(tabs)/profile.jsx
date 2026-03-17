// app/(tabs)/profile.jsx  ←  Profile Screen
import { useState } from "react";
import { useApp } from '../../hooks';
import { AVATAR_CONFIGS, BADGES, LEADERBOARD, XP_PER_LEVEL } from '../../constants';
import { MAP_ROWS, MAP_COLS } from '../../constants/data';

export default function ProfileScreen({ onLogout }) {
  const { user, setUser, dark, toggleDark, showToast } = useApp();
  const [tab, setTab] = useState('overview');
  const cfg        = AVATAR_CONFIGS[user.selectedAvatar] || AVATAR_CONFIGS.blaze;
  const xpPct      = (user.xp / XP_PER_LEVEL) * 100;
  const totalCells = MAP_ROWS * MAP_COLS;

  const toggleSetting = (key) => {
    setUser(u => ({ ...u, settings: { ...u.settings, [key]: !u.settings[key] } }));
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} ${!user.settings[key] ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="screen slide-in" style={{ background: dark ? '#0F0F13' : 'var(--bg)' }}>
      {/* Hero header */}
      <div style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange-hover))', padding: '20px 20px 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '3px solid rgba(255,255,255,0.5)' }}>{cfg.emoji}</div>
            <div style={{ position: 'absolute', bottom: 0, right: -2, width: 22, height: 22, background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, border: '2px solid white' }}>✓</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{user.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>@{user.username}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--r-full)', padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>⭐ Level {user.level}</div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--r-full)', padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>🔥 {user.streak}d streak</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>XP Progress</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{user.xp}/{XP_PER_LEVEL}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--r-full)', height: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#fff', borderRadius: 'var(--r-full)', width: `${xpPct}%`, transition: 'width 1s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px', marginTop: -24, position: 'relative', zIndex: 2 }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label:'Steps',     val:`${((user.totalSteps||0)/1000).toFixed(1)}k`, icon:'👟', color:'var(--orange)' },
            { label:'Distance',  val:`${user.distance||0}km`,                      icon:'📏', color:'var(--purple)' },
            { label:'Zones',     val:user.zones||0,                                icon:'🗺️', color:'var(--gold)'   },
            { label:'Territory', val:`${Math.round((user.zones||0)/totalCells*100)}%`, icon:'📊', color:'var(--green)' },
            { label:'Badges',    val:(user.badges||[]).length,                     icon:'🏅', color:'var(--cyan)'   },
            { label:'Coins',     val:user.coins||0,                                icon:'🪙', color:'var(--coin)'   },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '12px 10px', borderRadius: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: s.color, marginTop: 2 }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'var(--gray)', fontWeight: 600, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="tab-bar" style={{ marginBottom: 16 }}>
          {['overview', 'leaderboard'].map(t => (
            <div key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </div>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            <div className="card" style={{ borderRadius: 16, padding: '16px', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)', marginBottom: 12 }}>🏅 Badge Showcase</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {BADGES.map(b => {
                  const earned = (user.badges || []).includes(b.id);
                  return (
                    <div key={b.id} style={{ textAlign: 'center', opacity: earned ? 1 : 0.35 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: earned ? (dark ? 'rgba(244,98,31,0.15)' : 'var(--orange-light)') : (dark ? '#22222A' : 'var(--gray5)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto' }}>{b.emoji}</div>
                      <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--gray)', marginTop: 4, lineHeight: 1.2 }}>{b.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card" style={{ borderRadius: 16, padding: '16px', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)', marginBottom: 12 }}>⚙️ Settings</div>
              {[
                { key: 'notifications', label: 'Notifications', icon: '🔔' },
                { key: 'gps',           label: 'GPS Tracking',  icon: '📍' },
                { key: 'privacy',       label: 'Privacy Mode',  icon: '🔒' },
              ].map(s => (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${dark ? '#2A2A35' : '#E5E7EB'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>{s.label}</span>
                  </div>
                  <button className={`toggle ${(user.settings || {})[s.key] ? 'on' : 'off'}`} onClick={() => toggleSetting(s.key)} />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{dark ? '☀️' : '🌙'}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>Dark Mode</span>
                </div>
                <button className={`toggle ${dark ? 'on' : 'off'}`} onClick={toggleDark} />
              </div>
            </div>

            <button className="btn" style={{ width: '100%', padding: '14px', borderRadius: 'var(--r-full)', background: dark ? 'rgba(239,68,68,0.15)' : 'var(--red-light)', color: 'var(--red)', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font)', marginBottom: 100 }} onClick={onLogout}>🚪 Log Out</button>
          </>
        )}

        {tab === 'leaderboard' && (
          <div style={{ marginBottom: 100 }}>
            <div className="card" style={{ borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', borderBottom: `1px solid ${dark ? '#2A2A35' : '#E5E7EB'}` }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>🏆 Global Territory Rankings</div>
              </div>
              {LEADERBOARD.map((p, i) => {
                const pcfg = AVATAR_CONFIGS[p.avatar];
                return (
                  <div key={i} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, background: p.isUser ? (dark ? 'rgba(244,98,31,0.1)' : 'rgba(244,98,31,0.05)') : undefined, borderLeft: p.isUser ? '3px solid #F4621F' : undefined, borderBottom: i < 3 ? `1px solid ${dark ? '#2A2A35' : '#E5E7EB'}` : undefined }}>
                    <span style={{ fontSize: 22, width: 32 }}>{['🥇','🥈','🥉','4️⃣'][i]}</span>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg,${pcfg.color},${pcfg.grad})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{pcfg.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>{p.name}</span>
                        {p.isUser && <span style={{ fontSize: 10, background: 'var(--orange)', color: '#fff', borderRadius: 'var(--r-full)', padding: '1px 6px' }}>YOU</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 1 }}>{pcfg.name} • {p.zones} zones • {(p.steps / 1000).toFixed(1)}k steps</div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: p.isUser ? 'var(--orange)' : 'var(--gray)' }}>{p.pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
