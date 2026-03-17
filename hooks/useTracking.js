// ─────────────────────────────────────────────
// FITTRACK — Live Tracking Hook
// ─────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { useApp } from './useAppContext';

export function useTracking(initialSteps = 6240, initialTime = 14 * 60 + 23) {
  const { addXp, addCoins } = useApp();
  const [steps, setSteps]     = useState(initialSteps);
  const [running, setRunning] = useState(true);
  const [time, setTime]       = useState(initialTime);
  const [xpEarned, setXpEarned] = useState(47);
  const intervalRef = useRef();

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setSteps(s => s + 1);
      setTime(t => t + 1);
      if (Math.random() < 0.02) {
        setXpEarned(x => x + 30);
        addXp(30);
        addCoins(30);
      }
    }, 800);
    return () => clearInterval(intervalRef.current);
  }, [running, addXp, addCoins]);

  const pause  = () => setRunning(false);
  const resume = () => setRunning(true);
  const toggle = () => setRunning(r => !r);

  const distance = (steps * 0.0008).toFixed(2);
  const pace     = time > 0 && parseFloat(distance) > 0
    ? (time / 60 / parseFloat(distance)).toFixed(1)
    : '0.0';
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return { steps, running, time, xpEarned, distance, pace, formatTime, pause, resume, toggle };
}
