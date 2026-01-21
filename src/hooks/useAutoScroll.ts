import { useCallback, useEffect, useRef } from 'react';

export const useAutoScroll = <T>(dependency: T) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    inputRef.current?.focus();
  }, []);

  // Scroll when dependency changes
  useEffect(() => {
    setTimeout(scrollToBottom, 0);
  }, [dependency, scrollToBottom]);

  // IntersectionObserver to detect when input goes out of view
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            scrollToBottom();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    observer.observe(input);
    return () => observer.disconnect();
  }, [scrollToBottom]);

  // Keep input visible on resize
  useEffect(() => {
    const handleResize = () => scrollToBottom();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollToBottom]);

  // Focus input on click anywhere
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return { inputRef, scrollToBottom };
};
