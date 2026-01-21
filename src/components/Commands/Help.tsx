import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { commands, type Command } from '../../constants/commands';
import { User } from '../Terminal/User';

export const Help = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>help</span>
      </div>
      <div className='grid w-fit gap-1'>
        {commands.map((el: Command) => (
          <div className='grid grid-cols-[120px_1fr] gap-4' key={el.cmd}>
            <span className={colors.primary}>{el.cmd}</span>
            <span className={colors.text200}>{el.desc}</span>
          </div>
        ))}
      </div>
      <div className={`${colors.text300} mt-2`}>
        <p>Use Tab or Ctrl+i for autocomplete.</p>
        <p>Use ↑ and ↓ arrows to navigate command history.</p>
        <p>Use Ctrl+l to clear the terminal.</p>
      </div>
    </div>
  );
};
