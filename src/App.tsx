import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import { Welcome } from './components/Commands/Welcome';
import { useUiStore } from './store';
import { cn } from '@sglara/cn';
import { Help } from './components/Commands/Help';
import { User } from './components/Terminal/User';
import { Education } from './components/Commands/Education';
import { Experience } from './components/Commands/Experience';
import { Stack } from './components/Commands/Stack';
import { About } from './components/Commands/About';
import { Socials } from './components/Commands/Socials';
import { Email } from './components/Commands/Email';
import { Projects } from './components/Commands/Projects';
import { ThemesCommand } from './components/Commands/Themes';
import { History } from './components/Commands/History';
import { Gui } from './components/Commands/Gui';
import { NotFound } from './components/Commands/NotFound';
import { commands } from './constants/commands';
import { getThemeColors, getCaretColor } from './utils/theme';
import type { Themes as ThemeType } from './types';

type HistoryEntry = {
  id: number;
  command: string;
  element: React.ReactNode;
};

const availableCommands = commands.map((c) => c.cmd);
const availableThemes: ThemeType[] = [
  'dark',
  'light',
  'green-goblin',
  'blue-matrix',
  'espresso',
  'ubuntu',
];

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const idCounterRef = useRef(0);

  const { changeTheme, theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  const getCommandElement = useCallback(
    (cmd: string, fullHistory: string[]): React.ReactNode => {
      const trimmedCmd = cmd.trim().toLowerCase();
      const parts = trimmedCmd.split(' ');

      switch (parts[0]) {
        case 'welcome':
          return <Welcome />;
        case 'help':
          return <Help />;
        case 'about':
          return <About />;
        case 'education':
          return <Education />;
        case 'experience':
          return <Experience />;
        case 'stack':
          return <Stack />;
        case 'socials':
          return <Socials />;
        case 'email':
          return <Email />;
        case 'projects':
          return <Projects />;
        case 'gui':
          return <Gui />;
        case 'history':
          return <History commands={fullHistory} />;
        case 'themes':
          if (parts[1] === 'set' && parts[2]) {
            const themeName = parts[2] as ThemeType;
            if (availableThemes.includes(themeName)) {
              changeTheme(themeName);
              return (
                <div className='flex flex-col gap-y-1'>
                  <div>
                    <User />
                    <span className={colors.text100}>{cmd}</span>
                  </div>
                  <span>Theme changed to {themeName}</span>
                </div>
              );
            } else {
              return (
                <div className='flex flex-col gap-y-1'>
                  <div>
                    <User />
                    <span className={colors.text100}>{cmd}</span>
                  </div>
                  <span>Invalid theme: {parts[2]}</span>
                  <span>Available themes: {availableThemes.join(', ')}</span>
                </div>
              );
            }
          }
          return <ThemesCommand />;
        case 'clear':
          return null;
        default:
          return <NotFound command={cmd} />;
      }
    },
    [changeTheme, colors.text100]
  );

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

    const newCommandHistory = [...commandHistory, trimmedInput];
    setCommandHistory(newCommandHistory);

    if (trimmedInput.toLowerCase() === 'clear') {
      setHistoryEntries([]);
      setInputValue('');
      setHistoryIndex(-1);
      return;
    }

    const element = getCommandElement(trimmedInput, newCommandHistory);
    if (element !== null) {
      const newEntry: HistoryEntry = {
        id: idCounterRef.current++,
        command: trimmedInput,
        element,
      };
      setHistoryEntries((prev) => [...prev, newEntry]);
    }

    setInputValue('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+L to clear
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setHistoryEntries([]);
      return;
    }

    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();

      if (!currentInput) return;

      // Check if typing "themes set <theme>"
      if (currentInput.startsWith('themes set ')) {
        const themePrefix = currentInput.replace('themes set ', '');
        const matchingThemes = availableThemes.filter((t) => t.startsWith(themePrefix));
        if (matchingThemes.length === 1) {
          setInputValue(`themes set ${matchingThemes[0]}`);
        } else if (matchingThemes.length > 1) {
          const commonPrefix = matchingThemes.reduce<string>((acc, curr) => {
            let i = 0;
            while (i < acc.length && i < curr.length && acc[i] === curr[i]) i++;
            return acc.slice(0, i);
          }, matchingThemes[0]);
          if (commonPrefix.length > themePrefix.length) {
            setInputValue(`themes set ${commonPrefix}`);
          }
        }
        return;
      }

      // Autocomplete commands
      const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(currentInput));
      if (matchingCommands.length === 1) {
        setInputValue(matchingCommands[0]);
      } else if (matchingCommands.length > 1) {
        const commonPrefix = matchingCommands.reduce((acc, curr) => {
          let i = 0;
          while (i < acc.length && i < curr.length && acc[i] === curr[i]) i++;
          return acc.slice(0, i);
        });
        if (commonPrefix.length > currentInput.length) {
          setInputValue(commonPrefix);
        }
      }
      return;
    }

    // Ctrl+I also for autocomplete
    if (e.ctrlKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();
      if (!currentInput) return;

      const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(currentInput));
      if (matchingCommands.length === 1) {
        setInputValue(matchingCommands[0]);
      } else if (matchingCommands.length > 1) {
        const commonPrefix = matchingCommands.reduce((acc, curr) => {
          let i = 0;
          while (i < acc.length && i < curr.length && acc[i] === curr[i]) i++;
          return acc.slice(0, i);
        });
        if (commonPrefix.length > currentInput.length) {
          setInputValue(commonPrefix);
        }
      }
      return;
    }

    // Arrow Up - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      if (historyIndex === -1) {
        setTempInput(inputValue);
      }

      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
      return;
    }

    // Arrow Down - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue(tempInput);
        return;
      }

      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      return;
    }
  };

  // Focus input on click anywhere
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

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

  // Move cursor to end of input after value change from history
  useEffect(() => {
    if (inputRef.current) {
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [inputValue]);

  // Scroll to bottom to keep input in view
  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    inputRef.current?.focus();
  }, []);

  // Scroll to input when history changes
  useEffect(() => {
    // Use setTimeout to ensure DOM has updated after render
    setTimeout(scrollToBottom, 0);
  }, [historyEntries, scrollToBottom]);

  // Use IntersectionObserver to detect when input goes out of view
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Input is out of view, scroll to it
            scrollToBottom();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(input);
    return () => observer.disconnect();
  }, [scrollToBottom]);

  // Show welcome on mount
  useEffect(() => {
    const welcomeEntry: HistoryEntry = {
      id: idCounterRef.current++,
      command: 'welcome',
      element: <Welcome />,
    };
    setHistoryEntries([welcomeEntry]);
  }, []);

  // Keep input visible on resize
  useEffect(() => {
    const handleResize = () => {
      scrollToBottom();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollToBottom]);

  return (
    <main
      className={cn(
        'font-ibm px-4 py-2 min-h-screen transition duration-150',
        colors.text300,
        colors.body
      )}
      ref={containerRef}
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
