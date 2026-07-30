import { useCallback, useEffect, useRef } from 'react';

const BOTTOM_THRESHOLD_PX = 48;

const isNearBottom = () => {
  const { scrollHeight, clientHeight } = document.documentElement;
  return window.scrollY + clientHeight >= scrollHeight - BOTTOM_THRESHOLD_PX;
};

export const useAutoScroll = <T>(dependency: T) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pinnedToBottomRef = useRef(true);

  const scrollToBottom = useCallback((focusInput = true) => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    if (focusInput) inputRef.current?.focus();
  }, []);

  // Track whether the user is following the bottom of the output, so new
  // content doesn't yank them back down while they're reading history
  useEffect(() => {
    const handleScroll = () => {
      pinnedToBottomRef.current = isNearBottom();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll when dependency changes, but only if the user hasn't scrolled away
  useEffect(() => {
    if (!pinnedToBottomRef.current) return;
    const id = setTimeout(() => scrollToBottom(), 0);
    return () => clearTimeout(id);
  }, [dependency, scrollToBottom]);

  // Keep input visible on resize, unless the user scrolled up intentionally
  useEffect(() => {
    const handleResize = () => {
      if (pinnedToBottomRef.current) scrollToBottom(false);
    };
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
