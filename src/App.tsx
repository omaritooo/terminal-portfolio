import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Welcome } from './components/Commands/Welcome';
import { useUiStore } from './store';
import { cn } from '@sglara/cn';
import { Help } from './components/Commands/Help';
import { User } from './components/Terminal/User';
import { Education } from './components/Commands/Education';
import { About } from './components/Commands/About';
import { Socials } from './components/Commands/Socials';
import { Email } from './components/Commands/Email';

const commandMap = {
  welcome: <Welcome />,
  help: <Help />,
  education: <Education />,
  about: <About />,
  socials: <Socials />,
  email: <Email />,
};
const App = () => {
  const [text] = useState('');
  const [usedCommand, setUsedCommand] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [memoryPointer, setMemoryPointer] = useState(-1);
  const [history, setHistory] = useState(['welcome']);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  console.log(text);
  const { changeTheme, theme } = useUiStore((state) => state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (usedCommand === 'clear') {
      setHistory([]);
      setUsedCommand('');
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setHistory([...history, usedCommand]);
    const themeName = usedCommand.split(' ');
    if (
      themeName[2] &&
      (themeName[2] === 'dark' ||
        themeName[2] === 'light' ||
        themeName[2] === 'green-goblin' ||
        themeName[2] === 'blue-matrix' ||
        themeName[2] === 'espresso' ||
        themeName[2] === 'ubuntu')
    ) {
      changeTheme(themeName[2]);
    }
    setUsedCommand('');
    setMemoryPointer(-1);
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleDivClick);
    return () => {
      document.removeEventListener('click', handleDivClick);
    };
  }, [containerRef]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === 'l';
    if (e.key === 'Tab') {
      e.preventDefault();
    }

    if (ctrlL) {
      setHistory([]);
    }
    if (e.key === 'ArrowUp') {
      if (memoryPointer >= history.length) return;
      if (memoryPointer + 1 === history.length) return;
      console.log(history[memoryPointer - 1]);
      setUsedCommand(history[memoryPointer + 1]);
      setMemoryPointer((prevState) => prevState + 1);
      inputRef?.current?.blur();
    }
    if (e.key === 'ArrowDown') {
      if (memoryPointer < 0) return;
      if (memoryPointer === 0) {
        setUsedCommand('');
        setMemoryPointer(-1);
        return;
      }
      setUsedCommand(history[memoryPointer - 1]);
      setMemoryPointer((prevState) => prevState - 1);
      inputRef?.current?.blur();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, usedCommand, memoryPointer]);
  return (
    <main
      className={cn(
        `font-ibm px-4 py-2 min-h-screen transition duration-150 text-${theme}-text-300`,
        `bg-${theme}-body`
      )}
      ref={containerRef}
    >
      <div className='bg-transparent text-ubuntu-text-300'>
        <div className='flex flex-col'>
          {history.map((el) => {
            return (
              <span key={el}>
                {commandMap[el as keyof typeof commandMap] ?? (
                  <div>
                    <User />
                    {history[history.length - 1]}
                  </div>
                )}
              </span>
            );
          })}
        </div>
      </div>
      <form className='flex' onSubmit={handleSubmit}>
        <span className={cn(`text-${theme}-secondary mr-4 select-none`)}>
          visitor<span className={cn(`text-${theme}-primary`)}>@omar.portfolio:~</span>
        </span>
        <input
          autoCapitalize='off'
          autoComplete='off'
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className={cn(
            `bg-transparent focus:border-0 w-full text-${theme}-text-100 focus:ring-0 active:ring-0 outline-none caret-${theme}-primary`
          )}
          onChange={(e) => setUsedCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=''
          ref={inputRef}
          spellCheck='false'
          title='command'
          type='text'
          value={usedCommand}
        />
      </form>
    </main>
  );
};

export default App;
