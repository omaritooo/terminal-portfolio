import { useEffect } from 'react';
import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

const GUI_URL = 'https://omar-ashraf.vercel.app/';

export const Gui = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(GUI_URL, '_blank');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>gui</span>
      </div>
      <div className='flex flex-col gap-y-2 mb-2'>
        <span>Opening GUI portfolio in a new tab...</span>
        <span className={colors.text200}>
          If it doesn&apos;t open automatically, click here:{' '}
          <a
            className={`${colors.secondary} hover:underline`}
            href={GUI_URL}
            rel='noopener noreferrer'
            target='_blank'
          >
            {GUI_URL}
          </a>
        </span>
      </div>
    </div>
  );
};
