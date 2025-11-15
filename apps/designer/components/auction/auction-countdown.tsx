'use client';

import { useEffect, useState } from 'react';

interface AuctionCountdownProps {
  endTime: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function AuctionCountdown({ endTime }: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTimeMs = endTime.getTime();
      const difference = endTimeMs - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          ),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsEnded(false);
      } else {
        setIsEnded(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-zinc-900 text-white font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-zinc-600 text-xs font-medium mt-2 uppercase">
        {label}
      </span>
    </div>
  );

  if (isEnded) {
    return (
      <div className="text-center py-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-semibold">Auction Ended</p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-end">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
