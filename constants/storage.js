// ─────────────────────────────────────────────
// FITTRACK — LocalStorage Utility
// ─────────────────────────────────────────────

export const LS = {
  get:    (key, fallback = null) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set:    (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key); } catch {}
  },
};

export const STORAGE_KEYS = {
  USER:       'ft_user',
  DARK:       'ft_dark',
  TERRITORY:  'ft_territory',
  CHALLENGES: 'ft_challenges',
};
