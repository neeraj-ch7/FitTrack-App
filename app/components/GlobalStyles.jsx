// Global CSS injected once at app root
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    :root {
      --orange:#F4621F; --orange-hover:#FF8A50; --orange-light:#FFF1EB;
      --orange-dark:#D44D0F; --orange-mid:rgba(244,98,31,0.12);
      --charcoal:#141416; --charcoal2:#2C2C30; --gray:#6B7280;
      --gray2:#9CA3AF; --gray3:#D1D5DB; --gray4:#E5E7EB; --gray5:#F3F4F6;
      --bg:#F7F7FA; --card:#FFFFFF;
      --gold:#F5A623; --gold-light:#FEF3C7; --purple:#7C3AED; --purple-light:#EDE9FE;
      --green:#16A34A; --green-light:#DCFCE7; --coin:#F59E0B;
      --red:#EF4444; --red-light:#FEE2E2; --cyan:#06B6D4; --cyan-light:#CFFAFE;
      --font:'Plus Jakarta Sans',sans-serif;
      --sh-sm:0 1px 3px rgba(0,0,0,0.07),0 1px 2px rgba(0,0,0,0.04);
      --sh-md:0 4px 12px rgba(0,0,0,0.08),0 2px 4px rgba(0,0,0,0.04);
      --sh-lg:0 10px 30px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.04);
      --sh-orange:0 8px 24px rgba(244,98,31,0.35);
      --r-sm:6px; --r-md:10px; --r-lg:16px; --r-xl:24px; --r-full:9999px;
    }
    body { font-family:var(--font); background:#1a1a2e; display:flex; justify-content:center; align-items:center; min-height:100vh; overflow:hidden; }
    .app-shell { width:390px; height:844px; background:var(--bg); border-radius:44px; overflow:hidden; position:relative; box-shadow:0 40px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.05); display:flex; flex-direction:column; }
    .dark .app-shell { background:#0F0F13; }
    .status-bar { height:50px; background:transparent; display:flex; align-items:center; justify-content:space-between; padding:0 28px; flex-shrink:0; position:relative; z-index:10; }
    .status-time { font-size:15px; font-weight:700; color:var(--charcoal); }
    .dark .status-time { color:#F0F0F5; }
    .status-icons { display:flex; gap:6px; align-items:center; }
    .status-icons span { font-size:14px; }
    .bottom-nav { height:80px; background:var(--card); border-top:1px solid var(--gray4); display:flex; align-items:center; justify-content:space-around; padding:0 8px 8px; flex-shrink:0; position:relative; z-index:20; }
    .dark .bottom-nav { background:#1A1A20; border-top-color:#2A2A35; }
    .nav-item { display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; transition:all 0.2s; padding:6px 12px; border-radius:12px; flex:1; position:relative; }
    .nav-item:active { transform:scale(0.9); }
    .nav-icon { font-size:20px; transition:all 0.2s; }
    .nav-label { font-size:10px; font-weight:600; color:var(--gray2); transition:all 0.2s; }
    .nav-item.active .nav-label { color:var(--orange); }
    .nav-item.active .nav-icon { transform:scale(1.1); }
    .nav-dot { width:4px; height:4px; background:var(--orange); border-radius:50%; position:absolute; bottom:2px; }
    .nav-fab { width:56px; height:56px; background:var(--orange); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow:var(--sh-orange); cursor:pointer; transition:all 0.2s; flex-shrink:0; margin-top:-16px; }
    .nav-fab:active { transform:scale(0.92); }
    .screen { flex:1; overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch; position:relative; }
    .screen::-webkit-scrollbar { display:none; }
    .slide-in { animation:slideIn 0.3s cubic-bezier(0.4,0,0.2,1); }
    @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
    .card { background:var(--card); border-radius:var(--r-lg); box-shadow:var(--sh-sm); }
    .dark .card { background:#1A1A20; }
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; border:none; cursor:pointer; font-family:var(--font); font-weight:700; transition:all 0.2s cubic-bezier(0.4,0,0.2,1); user-select:none; -webkit-tap-highlight-color:transparent; }
    .btn:active { transform:scale(0.96); }
    .btn-primary { background:var(--orange); color:#fff; border-radius:var(--r-full); padding:14px 28px; font-size:15px; box-shadow:var(--sh-orange); }
    .btn-primary:hover { background:var(--orange-hover); }
    .btn-secondary { background:var(--orange-light); color:var(--orange); border-radius:var(--r-full); padding:10px 20px; font-size:14px; }
    .dark .btn-secondary { background:var(--orange-mid); }
    .progress-track { background:var(--gray5); border-radius:var(--r-full); overflow:hidden; }
    .dark .progress-track { background:#22222A; }
    .progress-fill { height:100%; border-radius:var(--r-full); transition:width 1s ease; }
    .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:var(--r-full); font-size:11px; font-weight:700; }
    .badge-orange { background:var(--orange-light); color:var(--orange); }
    .dark .badge-orange { background:rgba(244,98,31,0.15); }
    .badge-purple { background:var(--purple-light); color:var(--purple); }
    .dark .badge-purple { background:rgba(124,58,237,0.15); }
    .badge-gold { background:var(--gold-light); color:var(--gold); }
    .badge-green { background:var(--green-light); color:var(--green); }
    .badge-gray { background:var(--gray5); color:var(--gray); }
    .dark .badge-gray { background:#22222A; color:var(--gray2); }
    .live-dot { width:8px; height:8px; background:#EF4444; border-radius:50%; animation:pulse-red 0.9s infinite; }
    @keyframes pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)} 50%{box-shadow:0 0 0 5px rgba(239,68,68,0)} }
    .toast { position:absolute; top:60px; left:50%; transform:translateX(-50%); background:var(--charcoal); color:#fff; padding:10px 18px; border-radius:var(--r-full); font-size:13px; font-weight:600; white-space:nowrap; z-index:1000; animation:toastIn 0.3s ease forwards; box-shadow:var(--sh-lg); }
    @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    .walker-wrap { display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; }
    .walker { position:relative; display:flex; flex-direction:column; align-items:center; }
    .walker-head { border-radius:50%; animation:headBob 1.1s ease-in-out infinite; }
    .walker-body { border-radius:4px; animation:bodyBob 0.55s ease-in-out infinite; }
    .walker-legs { display:flex; gap:4px; }
    .walker-leg-l { border-radius:2px 2px 4px 4px; animation:legL 0.55s ease-in-out infinite; transform-origin:top center; }
    .walker-leg-r { border-radius:2px 2px 4px 4px; animation:legR 0.55s ease-in-out infinite; transform-origin:top center; }
    .walker-shadow { width:24px; height:5px; background:rgba(0,0,0,0.15); border-radius:50%; animation:shadowPulse 0.55s ease-in-out infinite; }
    .walker-ring { position:absolute; inset:-5px; border-radius:50%; border:2px solid var(--orange); animation:ringRotate 2s linear infinite; }
    .walker-effect { position:absolute; top:-18px; left:50%; transform:translateX(-50%); font-size:13px; animation:effectFloat 2s ease-in-out infinite; }
    @keyframes headBob { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-6deg)} }
    @keyframes bodyBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes legL { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(18deg)} }
    @keyframes legR { 0%,100%{transform:rotate(18deg)} 50%{transform:rotate(-18deg)} }
    @keyframes shadowPulse { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0.7)} }
    @keyframes ringRotate { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes effectFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-5px)} }
    @keyframes cellFlash { 0%{opacity:0.8;transform:scale(0.5)} 100%{opacity:0;transform:scale(2)} }
    .cell-flash { position:absolute; border-radius:50%; pointer-events:none; animation:cellFlash 0.6s ease forwards; }
    .achievement-popup { position:absolute; inset:0; display:flex; align-items:flex-end; z-index:200; }
    .achievement-content { background:var(--card); border-radius:24px 24px 0 0; padding:32px 24px 40px; width:100%; text-align:center; animation:sheetUp 0.35s cubic-bezier(0.34,1.56,0.64,1); position:relative; overflow:hidden; }
    .dark .achievement-content { background:#1A1A20; }
    .achievement-icon { font-size:60px; display:block; animation:iconPop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both; }
    @keyframes iconPop { from{transform:scale(0)} to{transform:scale(1)} }
    @keyframes sheetUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .bottom-sheet-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.45); z-index:50; animation:fadeIn 0.2s ease; }
    .confetti-piece { position:absolute; width:8px; height:8px; top:-10px; animation:confettiFall linear forwards; border-radius:2px; }
    @keyframes confettiFall { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(500px) rotate(720deg); opacity:0} }
    .tab-bar { display:flex; background:var(--gray5); border-radius:var(--r-full); padding:3px; }
    .dark .tab-bar { background:#22222A; }
    .tab-item { flex:1; padding:8px; text-align:center; font-size:13px; font-weight:600; border-radius:var(--r-full); cursor:pointer; transition:all 0.2s; color:var(--gray); }
    .tab-item.active { background:var(--card); color:var(--charcoal); box-shadow:var(--sh-sm); }
    .dark .tab-item.active { background:#2A2A35; color:#F0F0F5; }
    .toggle { width:48px; height:26px; border-radius:var(--r-full); position:relative; cursor:pointer; transition:all 0.2s; border:none; }
    .toggle::after { content:''; position:absolute; top:3px; width:20px; height:20px; background:#fff; border-radius:50%; transition:all 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.2); }
    .toggle.on { background:var(--orange); }
    .toggle.on::after { left:25px; }
    .toggle.off { background:var(--gray3); }
    .toggle.off::after { left:3px; }
    .input { width:100%; padding:13px 16px; border:1.5px solid var(--gray4); border-radius:var(--r-md); font-family:var(--font); font-size:15px; font-weight:500; outline:none; transition:all 0.2s; background:var(--card); color:var(--charcoal); }
    .dark .input { background:#1E1E26; border-color:#2E2E3A; color:#F0F0F5; }
    .input:focus { border-color:var(--orange); box-shadow:0 0 0 3px rgba(244,98,31,0.15); }
    .input::placeholder { color:var(--gray2); }
    .no-select { user-select:none; -webkit-user-select:none; }
    .map-grid-bg { background-image:linear-gradient(rgba(244,98,31,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(244,98,31,0.05) 1px,transparent 1px); background-size:20px 20px; }
    .dark .map-grid-bg { background-image:linear-gradient(rgba(244,98,31,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(244,98,31,0.08) 1px,transparent 1px); }
  `}</style>
);
export default GlobalStyles;
