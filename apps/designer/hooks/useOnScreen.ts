// hooks/useOnScreen.ts
import { useState, useEffect } from 'react';

export function useOnScreen(element: HTMLElement | null, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // Nếu chưa có element (do đang loading), không làm gì
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry?.isIntersecting ?? false);
      },
      {
        rootMargin,
        threshold: 0.1 // Kích hoạt khi thấy 10% nút
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, rootMargin]); // Quan trọng: Chạy lại khi "element" thay đổi (từ null -> div thật)

  return isIntersecting;
}