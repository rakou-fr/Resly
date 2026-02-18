import { useEffect, useState } from "react";

export default function AnimatedStat({
  value,
  label,
  duration = 800,
  pause = 10000,
}) {
  const isNumber = typeof value === "number";
  const [count, setCount] = useState(isNumber ? 0 : value);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isNumber) {
      setCount(value);
      return;
    }

    let interval;
    let stepTime = isMobile ? 20 : 30;

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
            startCounting();
          }, pause);
        }
      }, stepTime);
    };

    startCounting();
    return () => clearInterval(interval);
  }, [value, duration, pause, isMobile, isNumber]);

  const glass =
    "backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08]";

  // MOBILE
  if (isMobile) {
    return (
      <div className={`rounded-2xl px-5 py-4 text-center ${glass}`}>
        <div className="text-2xl font-semibold tracking-tight">
          {count}
        </div>
        <div className="text-white/60 text-xs mt-2 tracking-wide">
          {label}
        </div>
      </div>
    );
  }

  // DESKTOP
  return (
    <div
      className={`rounded-3xl px-10 py-8 text-center transition-transform duration-300 hover:scale-[1.02] ${glass}`}
    >
      <div className="text-5xl font-semibold tracking-tight">
        {count}
      </div>
      <div className="text-white/60 text-base mt-3 tracking-wide">
        {label}
      </div>
    </div>
  );
}
