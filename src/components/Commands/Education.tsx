import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

export const Education = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>education</span>
      </div>
      <div className='flex flex-col gap-y-2 mb-2'>
        <span className={`${colors.primary} font-bold`}>
          Arab Academy of Science and Technology
        </span>
        <span className={colors.text200}>B.Sc in Computer Engineering</span>
        <span className={colors.text300}>2016 - 2021</span>
      </div>
    </div>
  );
};
