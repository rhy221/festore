"use client";
import React, { useEffect } from "react";
import { useAuctionTimer } from "../hooks/useAuctionTimer";

interface TimerProps {
  endTime: string;
  onTimeUp?: () => void;
}

export default function AuctionTimer({ endTime, onTimeUp }: TimerProps) {
  const timeRemaining = useAuctionTimer(endTime);

  useEffect(() => {
    if (timeRemaining.isExpired && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining.isExpired, onTimeUp]);

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
