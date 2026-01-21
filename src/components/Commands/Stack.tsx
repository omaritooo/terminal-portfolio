import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

type StackCategory = {
  category: string;
  items: string[];
};

const stack: StackCategory[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Go', 'Java'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'Express.js'],
  },
  {
    category: 'Styling',
    items: ['Tailwind CSS', 'Sass', 'Styled Components', 'GSAP', 'Framer Motion'],
  },
  {
    category: 'State Management',
    items: ['Zustand', 'Redux', 'React Query', 'Pinia', 'Vuex'],
  },
  {
    category: 'Tools',
    items: [
      'Git',
      'Vite',
      'Webpack',
      'Docker',
      'Vitest',
      'Jest',
      'Playwright',
      'Husky',
      'Storybook',
    ],
  },
];

export const Stack = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>stack</span>
      </div>
      <div className='flex flex-col gap-y-3 mb-2'>
        {stack.map((category) => (
          <div className='flex flex-col gap-y-1' key={category.category}>
            <span className={`${colors.primary} font-bold`}>{category.category}</span>
            <span className={colors.text200}>{category.items.join(', ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
