import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Welcome } from './components/Commands/Welcome';
import { User } from './components/Terminal/User';
import { useUiStore } from './store';
import { cn } from '@sglara/cn';
import { getThemeColors, getCaretColor } from './utils/theme';
import { getCommandElement } from './utils/commandRouter';
import { useAutoScroll } from './hooks/useAutoScroll';
import { useCommandHistory } from './hooks/useCommandHistory';
import { useAutocomplete } from './hooks/useAutocomplete';

type HistoryEntry = {
  id: number;
  command: string;
  element: React.ReactNode;
};

const App = () => {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const idCounterRef = useRef(0);

  const { changeTheme, theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  const { inputRef } = useAutoScroll(historyEntries);
  const {
    commandHistory,
    inputValue,
    setInputValue,
    addToHistory,
    resetHistoryNavigation,
    navigateUp,
    navigateDown,
  } = useCommandHistory(inputRef);
  const { autocomplete } = useAutocomplete(inputValue, setInputValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      const newEntry: HistoryEntry = {
        id: idCounterRef.current++,
        command: '',
        element: (
          <div>
            <User />
          </div>
        ),
      };
      setHistoryEntries((prev) => [...prev, newEntry]);
      return;
    }

    addToHistory(trimmedInput);

    if (trimmedInput.toLowerCase() === 'clear') {
      setHistoryEntries([]);
      setInputValue('');
      resetHistoryNavigation();
      return;
    }

    const element = getCommandElement(trimmedInput, {
      fullHistory: [...commandHistory, trimmedInput],
      changeTheme,
      textColor: colors.text100,
    });

    if (element !== null) {
      const newEntry: HistoryEntry = {
        id: idCounterRef.current++,
        command: trimmedInput,
        element,
      };
      setHistoryEntries((prev) => [...prev, newEntry]);
    }

    setInputValue('');
    resetHistoryNavigation();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setHistoryEntries([]);
      return;
    }

    if (e.key === 'Tab' || (e.ctrlKey && e.key.toLowerCase() === 'i')) {
      e.preventDefault();
      autocomplete();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateUp();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateDown();
      return;
    }
  };

  // Show welcome on mount
  useEffect(() => {
    const welcomeEntry: HistoryEntry = {
      id: idCounterRef.current++,
      command: 'welcome',
      element: <Welcome />,
    };
    setHistoryEntries([welcomeEntry]);
  }, []);

  return (
    <main
      className={cn(
        'font-ibm px-4 py-2 min-h-screen transition duration-150',
        colors.text300,
        colors.body
      )}
    >
      <div className='bg-transparent'>
        <div className='flex flex-col gap-y-4'>
          {historyEntries.map((entry) => (
            <div key={entry.id}>{entry.element}</div>
          ))}
        </div>
      </div>
      <form className='flex mt-4' onSubmit={handleSubmit}>
        <User />
        <input
          autoCapitalize='off'
          autoComplete='off'
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className={cn(
            'bg-transparent focus:border-0 w-full focus:ring-0 active:ring-0 outline-none',
            colors.text100,
            getCaretColor(theme)
          )}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=''
          ref={inputRef}
          spellCheck='false'
          title='command'
          type='text'
          value={inputValue}
        />
      </form>
    </main>
  );
};

export default App;
