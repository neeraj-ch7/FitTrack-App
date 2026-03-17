// app/splash.js  ←  Splash / loading screen (shown briefly on app start)
export default function SplashScreen() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#F4621F,#FF8A50)', minHeight: '100%' }}>
      <div style={{ fontSize: 72, marginBottom: 16, animation: 'iconPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>🏃</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', fontFamily: 'var(--font)' }}>FitTrack</div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontFamily: 'var(--font)' }}>Conquer your city</div>
      <div style={{ marginTop: 48, width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#fff', borderRadius: 2, animation: 'splashProgress 1.5s ease forwards' }} />
      </div>
      <style>{`
        @keyframes splashProgress { from{width:0%} to{width:100%} }
      `}</style>
    </div>
  );
}
