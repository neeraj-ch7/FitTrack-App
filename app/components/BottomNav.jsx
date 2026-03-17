const TABS = [
  { id: 'home',      icon: '🏠', label: 'Home'      },
  { id: 'territory', icon: '🗺️', label: 'Territory' },
  { id: 'track',     icon: '⏺️', label: '',  fab: true },
  { id: 'shop',      icon: '🛍️', label: 'Shop'      },
  { id: 'profile',   icon: '👤', label: 'Profile'   },
];

export default function BottomNav({ active, onNav }) {
  return (
    <div className="bottom-nav">
      {TABS.map(t => (
        t.fab
          ? <div key={t.id} className="nav-fab" onClick={() => onNav(t.id)} style={{ fontSize: 28 }}>⏺️</div>
          : <div key={t.id} className={`nav-item ${active === t.id ? 'active' : ''}`} onClick={() => onNav(t.id)}>
              <span className="nav-icon">{t.icon}</span>
              <span className="nav-label" style={{ color: active === t.id ? 'var(--orange)' : 'var(--gray2)' }}>{t.label}</span>
              {active === t.id && <div className="nav-dot" />}
            </div>
      ))}
    </div>
  );
}
