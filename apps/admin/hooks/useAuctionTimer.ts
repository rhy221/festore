"use client";
import { useState, useEffect } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useAuctionTimer(endTime: string) {
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

      let target: number;
      if (targetDate.includes("/")) {
        const parts = targetDate.split(" ");
        const time = parts[0];
        const date = parts[1];

        if (!time || !date) {
          throw new Error("Invalid date format");
        }

        const timeParts = time.split(":");
        const dateParts = date.split("/");

        if (timeParts.length !== 2 || dateParts.length !== 3) {
          throw new Error("Invalid date format");
        }

        const hours = timeParts[0];
        const minutes = timeParts[1];
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];

        if (!hours || !minutes || !day || !month || !year) {
          throw new Error("Invalid date format");
        }

        target = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes)
        ).getTime();
      } else {
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
    const remaining = calculateTimeRemaining(endTime);
    setTimeRemaining(remaining);

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(endTime);
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return timeRemaining;
}
