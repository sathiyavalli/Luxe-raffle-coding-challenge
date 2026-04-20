'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [time, setTime] = useState({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const eventEnd = new Date();
      eventEnd.setDate(eventEnd.getDate() + 5); // 5 days from now

      const timer = setInterval(() => {
        const now = new Date();
        const diff = eventEnd.getTime() - now.getTime();

        if (diff <= 0) {
          setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTime({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(timer);
    };

    return calculateCountdown();
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-1">
      {/* Time Value Box */}
      <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-lg px-4 py-3 md:px-6 md:py-4 border-2 border-[#8B7500] shadow-lg">
        <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      {/* Label */}
      <span className="text-xs md:text-sm font-bold text-[#8B7500] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full py-8 px-4 mb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-[#8B7500] uppercase tracking-widest">
            ⏳ Event Ends In
          </h2>
        </div>

        {/* Timer Boxes */}
        <div className="flex justify-center gap-4 md:gap-8">
          <TimeBox value={time.days} label="Days" />
          <TimeBox value={time.hours} label="Hours" />
          <TimeBox value={time.minutes} label="Minutes" />
          <TimeBox value={time.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}
