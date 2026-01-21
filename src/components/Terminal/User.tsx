import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';

export const User = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <span className={`${colors.secondary} mr-4`}>
      visitor<span className={colors.primary}>@omar.portfolio:~$</span>
    </span>
  );
};
