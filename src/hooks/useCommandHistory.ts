import { useState, useEffect } from 'react';

export const useCommandHistory = (inputRef: React.RefObject<HTMLInputElement | null>) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState('');
  const [inputValue, setInputValue] = useState('');

  const addToHistory = (command: string) => {
    setCommandHistory((prev) => [...prev, command]);
  };

  const resetHistoryNavigation = () => {
    setHistoryIndex(-1);
  };

  const navigateUp = () => {
    if (commandHistory.length === 0) return;

    if (historyIndex === -1) {
      setTempInput(inputValue);
    }

    const newIndex = historyIndex + 1;
    if (newIndex < commandHistory.length) {
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
    }
  };

  const navigateDown = () => {
    if (historyIndex <= 0) {
      setHistoryIndex(-1);
      setInputValue(tempInput);
      return;
    }

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
  };

  // Move cursor to end of input after value change
  useEffect(() => {
    if (inputRef.current) {
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [inputValue, inputRef]);

  // Prevent default arrow key behavior globally
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return {
    commandHistory,
    inputValue,
    setInputValue,
    addToHistory,
    resetHistoryNavigation,
    navigateUp,
    navigateDown,
  };
};
