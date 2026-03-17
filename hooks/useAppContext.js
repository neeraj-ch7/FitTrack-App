// ─────────────────────────────────────────────
// FITTRACK — App Context + Provider
// ─────────────────────────────────────────────
import { useState, useRef, useCallback, createContext, useContext } from "react";
import { LS, STORAGE_KEYS, DEFAULT_USER, DEFAULT_CHALLENGES, XP_PER_LEVEL } from '../constants';
import { initTerritory } from '../utils/territory';

export const AppCtx = createContext();
export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }) {
  const [dark, setDark]           = useState(() => LS.get(STORAGE_KEYS.DARK, false));
  const [user, setUserRaw]        = useState(() => LS.get(STORAGE_KEYS.USER, DEFAULT_USER));
  const [territory, setTerritoryRaw] = useState(() => LS.get(STORAGE_KEYS.TERRITORY, initTerritory()));
  const [challenges, setChallengesRaw] = useState(() => LS.get(STORAGE_KEYS.CHALLENGES, DEFAULT_CHALLENGES));
  const [toast, setToast]         = useState(null);
  const [achievement, setAchievement] = useState(null);
  const [xpFloats, setXpFloats]   = useState([]);
  const toastRef = useRef();

  const setUser      = useCallback((u) => { setUserRaw(u);      LS.set(STORAGE_KEYS.USER, u);       }, []);
  const setTerritory = useCallback((t) => { setTerritoryRaw(t); LS.set(STORAGE_KEYS.TERRITORY, t);  }, []);
  const setChallenges= useCallback((c) => { setChallengesRaw(c);LS.set(STORAGE_KEYS.CHALLENGES, c); }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const addXpFloat = useCallback((x, y, val) => {
    const id = Date.now();
    setXpFloats(f => [...f, { id, x, y, val }]);
    setTimeout(() => setXpFloats(f => f.filter(i => i.id !== id)), 1600);
  }, []);

  const addCoins = useCallback((amt) => {
    setUser(u => ({ ...u, coins: u.coins + amt }));
  }, [setUser]);

  const addXp = useCallback((amt) => {
    setUser(u => {
      let nx = u.xp + amt, nl = u.level, leveled = false;
      while (nx >= XP_PER_LEVEL) { nx -= XP_PER_LEVEL; nl++; leveled = true; }
      if (leveled) setAchievement({ icon:'⭐', title:`Level Up! You're Level ${nl}!`, sub:'Keep conquering territory!', xp:0 });
      return { ...u, xp: nx, level: nl };
    });
  }, [setUser]);

  const toggleDark = () => setDark(d => { LS.set(STORAGE_KEYS.DARK, !d); return !d; });

  return (
    <AppCtx.Provider value={{
      dark, toggleDark,
      user, setUser,
      territory, setTerritory,
      challenges, setChallenges,
      toast, showToast,
      achievement, setAchievement,
      xpFloats, addXpFloat,
      addCoins, addXp,
    }}>
      {children}
    </AppCtx.Provider>
  );
}
