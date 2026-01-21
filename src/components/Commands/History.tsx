import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

type HistoryProps = {
  commands: string[];
};

export const History = ({ commands }: HistoryProps) => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>history</span>
      </div>
      <div className='flex flex-col gap-y-1 mb-2'>
        {commands.length === 0 ? (
          <span className={colors.text300}>No commands in history</span>
        ) : (
          commands.map((cmd, index) => (
            <div className='flex gap-4' key={index}>
              <span className={`${colors.text300} w-8 text-right`}>{index + 1}</span>
              <span className={colors.text100}>{cmd}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
