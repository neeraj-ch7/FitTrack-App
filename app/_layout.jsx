// app/_layout.jsx  ←  Root layout — wraps entire app in providers
import { useState } from "react";
import GlobalStyles    from './components/GlobalStyles';
import StatusBar       from './components/StatusBar';
import BottomNav       from './components/BottomNav';
import AchievementPopup from './components/AchievementPopup';
import AuthScreen      from './index';
import HomeScreen      from './(tabs)/index';
import TerritoryScreen from './(tabs)/territory';
import TrackingScreen  from './(tabs)/track';
import ShopScreen      from './(tabs)/shop';
import ProfileScreen   from './(tabs)/profile';
import { AppProvider, useApp } from '../hooks';
import { LS, STORAGE_KEYS } from '../constants';

function AppShell() {
  const { dark, user, setUser, toast, achievement } = useApp();
  const [loggedIn, setLoggedIn] = useState(() => !!LS.get(STORAGE_KEYS.USER, null));
  const [screen, setScreen]     = useState('home');
  const [key, setKey]           = useState(0);

  const nav    = (s) => { setScreen(s); setKey(k => k + 1); };
  const login  = (u) => { setUser(u); setLoggedIn(true); };
  const logout = ()  => { LS.remove(STORAGE_KEYS.USER); setLoggedIn(false); setScreen('home'); };

  const hideBottomNav = ['track'];
  const showNav = loggedIn && !hideBottomNav.includes(screen);

  return (
    <div className={dark ? 'dark' : ''} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#1a1a2e' }}>
      <div className="app-shell">
        <StatusBar />
        {!loggedIn ? (
          <AuthScreen onLogin={login} />
        ) : (
          <>
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {screen === 'home'      && <HomeScreen      key={key} onNav={nav} />}
              {screen === 'territory' && <TerritoryScreen key={key} onNav={nav} />}
              {screen === 'track'     && <TrackingScreen  key={key} onNav={nav} />}
              {screen === 'shop'      && <ShopScreen      key={key} onNav={nav} />}
              {screen === 'profile'   && <ProfileScreen   key={key} onNav={nav} onLogout={logout} />}
              {toast && <div className="toast">{toast}</div>}
              {achievement && <AchievementPopup />}
            </div>
            {showNav && <BottomNav active={screen} onNav={nav} />}
          </>
        )}
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <>
      <GlobalStyles />
      <AppProvider>
        <AppShell />
      </AppProvider>
    </>
  );
}
