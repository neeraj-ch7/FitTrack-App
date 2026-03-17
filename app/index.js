// app/index.js  ←  Auth / Splash gate screen
import { useState } from "react";
import { useApp } from '../hooks';

export default function AuthScreen({ onLogin }) {
  const [mode, setMode]     = useState('login');
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [err, setErr]       = useState('');
  const [loading, setLoading] = useState(false);

  const DEMO = {
    email:'demo@fittrack.app', password:'demo123', name:'Alex Chen', username:'alexfit',
    level:3, xp:2200, coins:340, totalSteps:124000, distance:87.4, streak:14, zones:18,
    ownedAvatars:['blaze','cyber'], selectedAvatar:'blaze',
    badges:['first_steps','zone_hunter','streak_7','coins_500'],
    settings:{ notifications:true, gps:true, privacy:false },
  };

  const submit = () => {
    setLoading(true); setErr('');
    setTimeout(() => {
      if (mode === 'login') {
        if (form.email === DEMO.email && form.password === DEMO.password) onLogin(DEMO);
        else if (form.email && form.password) onLogin({ ...DEMO, email: form.email, name: 'New User', username: 'new_user', level: 1, xp: 0, coins: 100, ownedAvatars: ['blaze'], selectedAvatar: 'blaze' });
        else setErr('Enter email and password');
      } else {
        if (!form.name || !form.email || !form.password) setErr('Fill all fields');
        else onLogin({ ...DEMO, name: form.name, email: form.email, username: form.email.split('@')[0], level: 1, xp: 0, coins: 100, ownedAvatars: ['blaze'], selectedAvatar: 'blaze' });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange-hover))', height: 260, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 40, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', top: 20, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🏃</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: 'var(--font)' }}>FitTrack</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontFamily: 'var(--font)' }}>Conquer your city, one step at a time</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '28px 24px', background: '#fff', borderRadius: '28px 28px 0 0', marginTop: -24, position: 'relative', zIndex: 1, boxShadow: '0 -10px 40px rgba(0,0,0,0.08)' }}>
        <div className="tab-bar" style={{ marginBottom: 24 }}>
          {['login', 'signup'].map(m => (
            <div key={m} className={`tab-item ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)} style={{ textTransform: 'capitalize' }}>
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </div>
          ))}
        </div>
        {mode === 'signup' && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input className="input" placeholder="Alex Chen" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
        )}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', display: 'block', marginBottom: 6 }}>Email</label>
          <input className="input" type="email" placeholder="demo@fittrack.app" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', display: 'block', marginBottom: 6 }}>Password</label>
          <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </div>
        {err && <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12, fontWeight: 600, textAlign: 'center' }}>{err}</div>}
        <button className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '16px' }} onClick={submit} disabled={loading}>
          {loading ? 'Loading...' : mode === 'login' ? 'Sign In 🚀' : 'Create Account 🎉'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--gray)' }}>
            {mode === 'login' ? 'New to FitTrack? ' : 'Already have an account? '}
            <span style={{ color: 'var(--orange)', fontWeight: 700, cursor: 'pointer' }} onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </span>
          </span>
        </div>
        <div style={{ marginTop: 12, padding: '10px', background: 'var(--orange-light)', borderRadius: 10, textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600 }}>Demo: demo@fittrack.app / demo123</span>
        </div>
      </div>
    </div>
  );
}
