import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

export const About = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>about</span>
      </div>
      <div className='flex flex-col gap-y-4 mb-2'>
        <p className={`max-w-[800px] leading-7 ${colors.text200}`}>
          I'm a Senior Front End Software Engineer with extensive experience of ~5 years in building
          and optimizing high-performance web applications. I specialize in modern JavaScript
          frameworks like Vue, Nuxt, React and Next, and have a proven track record of leading
          migrations, improving performance by up to 50%, and implementing robust development
          practices such as CI pipelines and Test-Driven Development (TDD).
        </p>
        <p className={`max-w-[800px] leading-7 ${colors.text200}`}>
          I have successfully delivered time-sensitive features, reduced user errors, and enhanced
          code quality across various industries, including AI products and smart TV applications. I
          am skilled in TypeScript, JavaScript, and a range of front-end technologies, and am fluent
          in English and Arabic.
        </p>
      </div>
    </div>
  );
};
