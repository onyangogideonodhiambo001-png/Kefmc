
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  // Set kickoff to 45 days from now
  const [targetDate] = useState(new Date(Date.now() + 45 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
      const weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ months, weeks, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-1 md:mx-4">
      <div className="text-2xl md:text-5xl font-gaming font-black text-white bg-white/5 border border-white/10 rounded-lg p-2 md:p-4 w-16 md:w-32 text-center shadow-xl">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-[10px] md:text-sm uppercase tracking-widest text-emerald-500 font-bold mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="py-8 md:py-12 bg-navy-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">
      <h3 className="text-center font-gaming text-lg md:text-2xl mb-6 text-amber-400 animate-pulse">
        Tournament Kick-Off In
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-y-4">
        <TimeUnit value={timeLeft.months} label="Months" />
        <TimeUnit value={timeLeft.weeks} label="Weeks" />
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="hidden md:block h-12 w-[1px] bg-white/10 mx-2"></div>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default CountdownTimer;
