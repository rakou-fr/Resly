import { useEffect, useState } from "react";

export default function AnimatedStat({ value, label, duration = 800, pause = 10000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;
    let stepTime = 30; // intervalle de mise à jour en ms
    let current = 0;

    const startCounting = () => {
      const steps = Math.ceil(duration / stepTime);
      let stepCount = 0;

      interval = setInterval(() => {
        stepCount++;
        const progress = Math.min(stepCount / steps, 1);
        setCount(Math.floor(progress * value));

        if (progress >= 1) {
          clearInterval(interval);
          setTimeout(() => {
            current = 0;
            startCounting(); // recommence après la pause
          }, pause);
        }
      }, stepTime);
    };

    startCounting();

    return () => clearInterval(interval);
  }, [value, duration, pause]);

  return (
    <div>
      <div className="text-2xl font-bold text-blue-500">{count}</div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}
