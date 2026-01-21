import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

type NotFoundProps = {
  command: string;
};

export const NotFound = ({ command }: NotFoundProps) => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-1'>
      <div>
        <User />
        <span className={colors.text100}>{command}</span>
      </div>
      <span className={colors.text300}>
        Command not found: <span className={colors.primary}>{command}</span>
      </span>
      <span className={colors.text300}>
        Type <span className={colors.primary}>'help'</span> to see available commands.
      </span>
    </div>
  );
};
