import { Welcome } from '../components/Commands/Welcome';
import { Help } from '../components/Commands/Help';
import { Education } from '../components/Commands/Education';
import { Experience } from '../components/Commands/Experience';
import { Stack } from '../components/Commands/Stack';
import { About } from '../components/Commands/About';
import { Socials } from '../components/Commands/Socials';
import { Email } from '../components/Commands/Email';
import { Projects } from '../components/Commands/Projects';
import { ThemesCommand } from '../components/Commands/Themes';
import { History } from '../components/Commands/History';
import { Gui } from '../components/Commands/Gui';
import { NotFound } from '../components/Commands/NotFound';
import { User } from '../components/Terminal/User';
import type { Themes } from '../types';

const availableThemes: Themes[] = [
  'dark',
  'light',
  'green-goblin',
  'blue-matrix',
  'espresso',
  'ubuntu',
];

type CommandContext = {
  fullHistory: string[];
  changeTheme: (theme: Themes) => void;
  textColor: string;
};

export const getCommandElement = (cmd: string, context: CommandContext): React.ReactNode => {
  const { fullHistory, changeTheme, textColor } = context;
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
      return handleThemesCommand(parts, cmd, changeTheme, textColor);
    case 'clear':
      return null;
    default:
      return <NotFound command={cmd} />;
  }
};

const handleThemesCommand = (
  parts: string[],
  cmd: string,
  changeTheme: (theme: Themes) => void,
  textColor: string
): React.ReactNode => {
  if (parts[1] === 'set' && parts[2]) {
    const themeName = parts[2] as Themes;
    if (availableThemes.includes(themeName)) {
      changeTheme(themeName);
      return (
        <div className='flex flex-col gap-y-1'>
          <div>
            <User />
            <span className={textColor}>{cmd}</span>
          </div>
          <span>Theme changed to {themeName}</span>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col gap-y-1'>
          <div>
            <User />
            <span className={textColor}>{cmd}</span>
          </div>
          <span>Invalid theme: {parts[2]}</span>
          <span>Available themes: {availableThemes.join(', ')}</span>
        </div>
      );
    }
  }
  return <ThemesCommand />;
};

export { availableThemes };
