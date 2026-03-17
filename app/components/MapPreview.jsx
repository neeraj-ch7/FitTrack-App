import { useRef, useEffect } from "react";

export default function MapPreview({ dark }) {
  const canvasRef = useRef();
  const frameRef  = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const buildings = [
      {x:20,y:20,w:50,h:40},{x:85,y:15,w:35,h:55},{x:140,y:25,w:45,h:35},
      {x:200,y:20,w:55,h:45},{x:270,y:15,w:40,h:60},{x:320,y:25,w:50,h:38},
      {x:20,y:130,w:45,h:50},{x:85,y:140,w:50,h:40},{x:200,y:135,w:45,h:45},
      {x:270,y:130,w:55,h:55},{x:145,y:140,w:35,h:45},{x:320,y:135,w:50,h:45},
    ];
    const routePoints = [[30,100],[80,90],[130,105],[185,95],[240,100],[290,90],[350,100]];
    let t = 0;

    const draw = () => {
      frameRef.current = requestAnimationFrame(draw);
      t += 0.01;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dark ? '#1a2535' : '#dde8d0';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = dark ? '#2a3545' : '#c8d4c0';
      [[0,120,W,12],[0,65,W,10],[0,180,W,10],[190,0,12,H],[120,0,10,H],[290,0,10,H]]
        .forEach(([x,y,w,h]) => ctx.fillRect(x,y,w,h));
      buildings.forEach(b => {
        ctx.fillStyle = dark ? '#1e2d3e' : '#b5c7a8';
        ctx.beginPath(); ctx.roundRect(b.x,b.y,b.w,b.h,3); ctx.fill();
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.3)';
        ctx.fillRect(b.x+4,b.y+4,8,6); ctx.fillRect(b.x+16,b.y+4,8,6);
      });
      ctx.save();
      ctx.setLineDash([6,4]);
      ctx.lineDashOffset = -t * 12;
      ctx.strokeStyle = '#F4621F'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      routePoints.forEach(([x,y],i) => i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y));
      ctx.stroke(); ctx.restore();
      const ox = 270 + Math.sin(t*0.8)*8, oy = 88 + Math.cos(t*0.6)*5;
      ctx.beginPath(); ctx.arc(ox,oy,8,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.2)'; ctx.fill();
      ctx.beginPath(); ctx.arc(ox,oy,5,0,Math.PI*2);
      ctx.fillStyle='#F59E0B'; ctx.fill();
      ctx.fillStyle='#fff'; ctx.font='bold 7px sans-serif'; ctx.textAlign='center';
      ctx.fillText('M',ox,oy+2.5);
      const px = 130+Math.sin(t*1.2)*3, py = 105+Math.cos(t)*2;
      const pulse = (Math.sin(t*4)+1)*0.5;
      ctx.beginPath(); ctx.arc(px,py,10+pulse*4,0,Math.PI*2);
      ctx.fillStyle=`rgba(244,98,31,${0.15+pulse*0.1})`; ctx.fill();
      ctx.beginPath(); ctx.arc(px,py,4,0,Math.PI*2);
      ctx.fillStyle='#F4621F'; ctx.fill();
      ctx.strokeStyle='#fff'; ctx.lineWidth=1.5; ctx.stroke();
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [dark]);

  return <canvas ref={canvasRef} width={390} height={210} style={{ display:'block', width:'100%', height:'100%' }} />;
}
