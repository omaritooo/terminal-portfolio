import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';
import type { Themes as ThemeType } from '../../types';

const themes: { name: ThemeType; description: string }[] = [
  { name: 'dark', description: 'Dark theme with teal accents' },
  { name: 'light', description: 'Light theme for bright environments' },
  { name: 'blue-matrix', description: 'Matrix-inspired blue/green theme' },
  { name: 'espresso', description: 'Warm coffee-inspired theme' },
  { name: 'green-goblin', description: 'Classic green terminal theme' },
  { name: 'ubuntu', description: 'Ubuntu-inspired purple theme' },
];

export const ThemesCommand = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>themes</span>
      </div>
      <div className='flex flex-col gap-y-2 mb-2'>
        <span>Available themes:</span>
        <span className={colors.text200}>Usage: themes set {'<theme-name>'}</span>
        <div className='mt-2 grid gap-1'>
          {themes.map((t) => (
            <div className='grid grid-cols-[120px_1fr] gap-4' key={t.name}>
              <span className={t.name === theme ? `${colors.primary} font-bold` : colors.text100}>
                {t.name}
                {t.name === theme ? ' *' : null}
              </span>
              <span className={colors.text300}>{t.description}</span>
            </div>
          ))}
        </div>
        <span className={`${colors.text300} mt-2`}>* indicates current theme</span>
      </div>
    </div>
  );
};
