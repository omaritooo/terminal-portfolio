import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

type Project = {
  title: string;
  description: string;
  url: string;
};

const projects: Project[] = [
  {
    title: 'Terminal Portfolio',
    description: 'A terminal-style portfolio website built with React and TypeScript',
    url: 'https://github.com/omaritooo/terminal-portfolio',
  },
  {
    title: 'Bayn',
    description: 'Landing page done for an aspiring tech startup in KSA',
    url: 'https://bayn-landing.netlify.app/',
  },
  {
    title: 'Al Oula',
    description: 'Worked on the development of both the website and tv application for Al-Oula',
    url: 'https://aloula.sba.sa/en/',
  },
  {
    title: 'Stayinformed',
    description: 'Worked on the development and maintanence of the web application',
    url: 'https://www.stayinformed.de/en/',
  },
];

export const Projects = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>projects</span>
      </div>
      <div className='flex flex-col gap-y-4 mb-2'>
        <span>Here are some of my projects: (Links are clickable)</span>
        {projects.map((project, index) => (
          <div className='flex flex-col gap-y-1' key={index}>
            <span className={`${colors.primary} font-bold`}>{project.title}</span>
            <span className={colors.text200}>{project.description}</span>
            <a
              className={`${colors.secondary} hover:underline`}
              href={project.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              {project.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
