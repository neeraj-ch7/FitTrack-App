// app/(tabs)/shop.jsx  ←  Avatar Shop Screen
import { useState } from "react";
import { useApp } from '../../hooks';
import { AVATAR_CONFIGS } from '../../constants';
import WalkingAvatar from '../components/WalkingAvatar';

export default function ShopScreen() {
  const { user, setUser, dark, showToast, setAchievement } = useApp();
  const [flash, setFlash] = useState(null);

  const buy = (key) => {
    const cfg = AVATAR_CONFIGS[key];
    if (user.coins < cfg.price) { showToast('Not enough coins! 💔'); return; }
    setUser(u => ({ ...u, coins: u.coins - cfg.price, ownedAvatars: [...u.ownedAvatars, key] }));
    setAchievement({ icon: cfg.emoji, title: 'New Avatar Unlocked!', sub: `${cfg.name} — ${cfg.desc}`, xp: 0 });
  };

  const equip = (key) => {
    setUser(u => ({ ...u, selectedAvatar: key }));
    showToast(`${AVATAR_CONFIGS[key].name} equipped! ✅`);
    setFlash(key); setTimeout(() => setFlash(null), 600);
  };

  return (
    <div className="screen slide-in" style={{ background: dark ? '#0F0F13' : 'var(--bg)' }}>
      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)' }}>Avatar Shop 🛍️</div>
            <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 2 }}>Customize your walker</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: dark ? 'rgba(245,158,11,0.15)' : 'var(--gold-light)', padding: '8px 14px', borderRadius: 'var(--r-full)' }}>
            <span style={{ fontSize: 18 }}>🪙</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--coin)' }}>{user.coins.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ background: dark ? 'rgba(244,98,31,0.1)' : 'var(--orange-light)', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--orange)' }}>Walk more, earn more! You earn 30 coins per territory zone captured.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {Object.entries(AVATAR_CONFIGS).map(([key, cfg]) => {
            const owned   = user.ownedAvatars?.includes(key);
            const equipped = user.selectedAvatar === key;
            const canBuy  = user.coins >= cfg.price;
            return (
              <div key={key} className="card" style={{ borderRadius: 20, padding: '16px 12px', textAlign: 'center', border: equipped ? '2px solid var(--orange)' : '2px solid transparent', transition: 'all 0.2s', transform: flash === key ? 'scale(0.95)' : 'scale(1)' }}>
                <div style={{ marginBottom: 12 }}>
                  <WalkingAvatar type={key} size={1.1} showRing={equipped} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: dark ? '#F0F0F5' : 'var(--charcoal)', marginBottom: 2 }}>{cfg.name}</div>
                <div style={{ fontSize: 11, color: 'var(--gray)', marginBottom: 10, minHeight: 28 }}>{cfg.desc}</div>
                {equipped
                  ? <div className="badge badge-orange" style={{ justifyContent: 'center', width: '100%', padding: '6px' }}>✅ Equipped</div>
                  : owned
                  ? <button className="btn btn-secondary" style={{ width: '100%', fontSize: 12, padding: '8px' }} onClick={() => equip(key)}>Equip</button>
                  : cfg.price === 0
                  ? <div className="badge badge-gray" style={{ justifyContent: 'center', width: '100%', padding: '6px' }}>Default</div>
                  : <button className="btn" style={{ width: '100%', fontSize: 12, padding: '8px', borderRadius: 'var(--r-full)', background: canBuy ? 'var(--coin)' : 'var(--gray4)', color: canBuy ? '#fff' : 'var(--gray)', fontWeight: 700, fontFamily: 'var(--font)' }} onClick={() => buy(key)} disabled={!canBuy}>🪙 {cfg.price.toLocaleString()}</button>
                }
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
}
