import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

type Social = {
  name: string;
  url: string;
};

const socials: Social[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/omarashraf27/' },
  { name: 'GitHub', url: 'https://github.com/omaritooo' },
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01e4f6196e439cb374' },
];

export const Socials = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>socials</span>
      </div>
      <div className='flex flex-col gap-y-2 mb-2'>
        <span className={colors.text200}>You can find me on: (Links are clickable)</span>
        {socials.map((social) => (
          <div className='flex gap-2' key={social.name}>
            <span className={`${colors.primary} w-20`}>{social.name}:</span>
            <a
              className={`${colors.secondary} hover:underline`}
              href={social.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              {social.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
