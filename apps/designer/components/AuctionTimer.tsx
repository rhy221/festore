"use client";
import React, { useState, useEffect } from "react";

interface TimerProps {
  endTime: string; // ISO string or date string
  onTimeUp?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function AuctionTimer({ endTime, onTimeUp }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const calculateTimeRemaining = (targetDate: string): TimeRemaining => {
    try {
      const now = new Date().getTime();

      // Handle different date formats from API
      let target: number;
      if (targetDate.includes("/")) {
        // Handle DD/MM/YYYY HH:MM format like "00:00 19/01/2024"
        const [time, date] = targetDate.split(" ");
        const [hours, minutes] = time.split(":");
        const [day, month, year] = date.split("/");
        target = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes)
        ).getTime();
      } else {
        // Handle ISO format
        target = new Date(targetDate).getTime();
      }

      const difference = target - now;

      if (difference <= 0 || isNaN(difference)) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days: isNaN(days) ? 0 : days,
        hours: isNaN(hours) ? 0 : hours,
        minutes: isNaN(minutes) ? 0 : minutes,
        seconds: isNaN(seconds) ? 0 : seconds,
        isExpired: false,
      };
    } catch (error) {
      console.error("Error calculating time remaining:", error);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(endTime);
      setTimeRemaining(remaining);

      if (remaining.isExpired && onTimeUp) {
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onTimeUp]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">⏰</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Thời Gian Còn Lại</p>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
        </div>

        {timeRemaining.isExpired ? (
          <div className="text-center">
            <div className="text-sm text-red-600 mb-2">Đã kết thúc</div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["00", "00", "00", "00"].map((value, index) => (
                <div
                  key={index}
                  className="bg-gray-400 text-white p-3 rounded-lg flex flex-col items-center justify-center"
                >
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs">
                    {["Ngày", "Giờ", "Phút", "Giây"][index]}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span>Phiên đấu giá đã kết thúc</span>
            </div>
          </div>
        ) : (
          <div>
            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-black text-white p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xl font-bold">
                  {formatNumber(timeRemaining.days)}
                </div>
                <div className="text-xs">Ngày</div>
              </div>
              <div className="bg-black text-white p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xl font-bold">
                  {formatNumber(timeRemaining.hours)}
                </div>
                <div className="text-xs">Giờ</div>
              </div>
              <div className="bg-black text-white p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xl font-bold">
                  {formatNumber(timeRemaining.minutes)}
                </div>
                <div className="text-xs">Phút</div>
              </div>
              <div className="bg-black text-white p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xl font-bold">
                  {formatNumber(timeRemaining.seconds)}
                </div>
                <div className="text-xs">Giây</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>
                {timeRemaining.days < 1 && timeRemaining.hours < 3
                  ? "Phiên đấu giá sắp kết thúc"
                  : "Phiên đấu giá đang diễn ra"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
