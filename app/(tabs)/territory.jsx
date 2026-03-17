// app/(tabs)/territory.jsx  ←  Territory Map Screen
import { useRef, useEffect } from "react";
import { useApp } from '../../hooks';
import { useTerritory } from '../../hooks/useTerritory';
import { CELL_SIZE, MAP_ROWS, MAP_COLS, PlayerColors, PlayerNames } from '../../constants';

export default function TerritoryScreen({ onNav }) {
  const { dark } = useApp();
  const { territory, zoom, pan, flashes, userPos, capture, zoomIn, zoomOut, youPct, totalCells } = useTerritory();
  const canvasRef = useRef();
  const frameRef  = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const draw = () => {
      frameRef.current = requestAnimationFrame(draw); t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(pan.x * zoom, pan.y * zoom);
      ctx.scale(zoom, zoom);
      const cz = CELL_SIZE;
      for (let r = 0; r < MAP_ROWS; r++) for (let c = 0; c < MAP_COLS; c++) {
        const owner = territory[r][c], x = c * cz, y = r * cz;
        if (owner) { ctx.fillStyle = PlayerColors[owner] + (owner === 'you' ? '55' : '33'); ctx.fillRect(x, y, cz, cz); }
        ctx.strokeStyle = owner ? (PlayerColors[owner] + '99') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)');
        ctx.lineWidth = owner ? 1.2 : 0.5; ctx.strokeRect(x + 0.5, y + 0.5, cz - 1, cz - 1);
      }
      for (let r = 0; r < MAP_ROWS; r++) for (let c = 0; c < MAP_COLS; c++) {
        const o = territory[r][c]; if (!o) continue;
        [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([nr, nc]) => {
          if (nr < 0 || nr >= MAP_ROWS || nc < 0 || nc >= MAP_COLS || territory[nr][nc] === o) return;
          ctx.strokeStyle = PlayerColors[o]; ctx.lineWidth = 2; ctx.beginPath();
          if (nr === r-1) { ctx.moveTo(c*cz,r*cz); ctx.lineTo((c+1)*cz,r*cz); }
          else if (nr === r+1) { ctx.moveTo(c*cz,(r+1)*cz); ctx.lineTo((c+1)*cz,(r+1)*cz); }
          else if (nc === c-1) { ctx.moveTo(c*cz,r*cz); ctx.lineTo(c*cz,(r+1)*cz); }
          else { ctx.moveTo((c+1)*cz,r*cz); ctx.lineTo((c+1)*cz,(r+1)*cz); }
          ctx.stroke();
        });
      }
      const uc = userPos.current, ux = uc.col*cz+cz/2, uy = uc.row*cz+cz/2;
      const pulse = (Math.sin(t*4)+1)*0.5;
      ctx.beginPath(); ctx.arc(ux,uy,9+pulse*5,0,Math.PI*2);
      ctx.fillStyle = `rgba(244,98,31,${0.15+pulse*0.12})`; ctx.fill();
      ctx.beginPath(); ctx.arc(ux,uy,5,0,Math.PI*2);
      ctx.fillStyle = '#F4621F'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      [['marcus',8,9],['priya',16,4],['jake',14,11]].forEach(([pl,br,bc]) => {
        const ox = bc*cz+cz/2+Math.sin(t+pl.length)*4, oy = br*cz+cz/2+Math.cos(t+pl.length)*3;
        ctx.beginPath(); ctx.arc(ox,oy,4,0,Math.PI*2);
        ctx.fillStyle = PlayerColors[pl]; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      });
      ctx.restore();
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [territory, pan, zoom, dark]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX, cy = (e.clientY - rect.top) * scaleY;
    const col = Math.floor((cx / zoom - pan.x) / CELL_SIZE);
    const row = Math.floor((cy / zoom - pan.y) / CELL_SIZE);
    if (row >= 0 && row < MAP_ROWS && col >= 0 && col < MAP_COLS) capture(row, col);
  };

  const countCellsLocal = (owner) => territory.flat().filter(c => c === owner).length;

  return (
    <div className="screen slide-in" style={{ background: dark ? '#0F0F13' : 'var(--bg)', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '4px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(239,68,68,0.1)', borderRadius: 'var(--r-full)', padding: '5px 10px' }}>
            <div className="live-dot" /><span style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)' }}>GPS LIVE</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray)' }}>📍 Sector 12, Lucknow</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" style={{ width: 32, height: 32, borderRadius: 'var(--r-full)', background: dark ? '#22222A' : 'var(--gray5)', fontSize: 16, padding: 0 }} onClick={zoomIn}>+</button>
          <button className="btn" style={{ width: 32, height: 32, borderRadius: 'var(--r-full)', background: dark ? '#22222A' : 'var(--gray5)', fontSize: 16, padding: 0 }} onClick={zoomOut}>−</button>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', margin: '0 12px', borderRadius: 20, boxShadow: 'var(--sh-lg)' }}>
        <canvas ref={canvasRef} width={366} height={420} style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair', background: dark ? '#131320' : '#e8f0dc' }} onClick={handleClick} />
        {flashes.map(f => (
          <div key={f.id} className="cell-flash" style={{ width: CELL_SIZE*zoom*1.5, height: CELL_SIZE*zoom*1.5, left: (f.col*CELL_SIZE+pan.x)*zoom+366/2, top: (f.row*CELL_SIZE+pan.y)*zoom+420/2, background: f.color }} />
        ))}
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(20,20,22,0.85)', borderRadius: 10, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {Object.entries(PlayerColors).map(([p, c]) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{PlayerNames[p]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ margin: '12px 12px 8px', borderRadius: 20, padding: '14px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: 13, color: 'var(--gray)', fontWeight: 600 }}>Your Territory</span>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--orange)' }}>{youPct}%</div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {Object.entries(PlayerColors).slice(1).map(([p, c]) => (
              <div key={p} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--gray)', fontWeight: 600 }}>{PlayerNames[p]}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: c }}>{Math.round(countCellsLocal(p)/totalCells*100)}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="progress-track" style={{ height: 8, marginBottom: 10 }}>
          <div className="progress-fill" style={{ width: `${youPct}%`, background: 'linear-gradient(90deg,var(--orange),var(--orange-hover))' }} />
        </div>
        <button className="btn btn-primary" style={{ width: '100%', fontSize: 14, padding: '12px' }} onClick={() => onNav('track')}>🚶 Walk to Claim Territory</button>
      </div>
    </div>
  );
}
