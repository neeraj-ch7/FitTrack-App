import { useState, useEffect } from "react";

export default function StatusBar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const upd = () => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`);
    };
    upd();
    const i = setInterval(upd, 10000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <span>📶</span><span>🛜</span><span>🔋</span>
      </div>
    </div>
  );
}
