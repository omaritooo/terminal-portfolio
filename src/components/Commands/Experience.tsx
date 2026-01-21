import { useUiStore } from '../../store';
import { getThemeColors } from '../../utils/theme';
import { User } from '../Terminal/User';

type Job = {
  company: string;
  title: string;
  location: string;
  period: string;
  description: string[];
};

const jobs: Job[] = [
  {
    company: 'Upshifters',
    title: 'Senior Front End Engineer',
    location: 'Giza (Hybrid)',
    period: 'November 2024 - Present',
    description: [
      'Led the end-to-end development of an AI-powered Marketing Analytics platform, transforming complex datasets into actionable visual insights while maintaining a 37% performance improvement over legacy systems.',
      'Established a high-performance engineering culture by providing deep-dive PR feedback and technical mentorship, which directly reduced integration friction by 50% and reduced issues in planned releases.',
      'Hardened the CI/CD pipeline through custom ESLint rules and Husky hooks, ensuring that 100% of code merged into production met strict architectural and formatting standards.',
    ],
  },
  {
    company: 'pyraCode GmbH',
    title: 'Mid Senior/Senior Front End Engineer',
    location: 'Germany (Remote)',
    period: 'January 2024 - January 2025',
    description: [
      'Led a high-stakes migration of a legacy Nuxt.js 2 monolith to a modern Nuxt.js 3/TypeScript stack, enhancing system scalability and driving a 25% performance increase.',
      'Conducted a comprehensive security audit and dependency overhaul, replacing deprecated packages to reduce maintenance overhead by 30%.',
      'Established rigorous code review protocols focused on architectural consistency and best practices, leading to a 20% drop in post-release bug incidents.',
      'Refined the development environment by introducing automated linting and commit templating, ensuring 100% adherence to global team standards.',
      'Contributed to the accelerated delivery of key milestones, providing the technical front-end expertise needed to finish the project two weeks ahead of schedule.',
    ],
  },
  {
    company: 'Whitepeaks',
    title: 'Mid Senior Front End Engineer',
    location: 'Lebanon (Remote)',
    period: 'Feb 2023 - August 2023',
    description: [
      'Revitalized the flagship streaming web application by implementing cutting-edge features and resolving critical bugs, resulting in a 40% increase in user satisfaction and a 30% boost in overall application performance.',
      'Spearheaded the cross-functional optimization of the flagship web application, transforming it into a high-performance TV application for WebOS. Delivered a 50% performance enhancement, driving increased user engagement and satisfaction metrics by 25%.',
    ],
  },
  {
    company: 'HMAServ',
    title: 'Front End Engineer',
    location: 'Alexandria, Egypt',
    period: 'April 2022 - Jan 2023',
    description: [
      'Maintained a critical dashboard, achieving a 50% reduction in user errors and providing a safer, smoother user experience. Implemented new cutting-edge features and scaled the system to accommodate a larger, more diverse user base.',
      'Revitalized legacy WebOS/Tizen projects as a Front End Developer, integrating new functionality and migrating applications to modern technologies. Reduced the potential for user error by 50% while optimizing performance metrics.',
    ],
  },
  {
    company: 'AdGroup',
    title: 'Front End Developer',
    location: 'Cairo, Egypt',
    period: 'August 2021 - May 2022',
    description: [
      'Collaborated closely with UI/UX designers to create seamless, responsive web applications, achieving a 30% increase in performance across all display devices. This partnership enhanced user experience and promoted more engaging interactions.',
      'Led the front-end development cycle in parallel with backend developers to deliver websites that prioritize performance, accessibility, and SEO best practices.',
    ],
  },
];

export const Experience = () => {
  const { theme } = useUiStore((state) => state);
  const colors = getThemeColors(theme);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className={colors.text100}>experience</span>
      </div>
      <div className='flex flex-col gap-y-4 mb-2'>
        {jobs.map((job, index) => (
          <div className='flex flex-col gap-y-1' key={index}>
            <div className='flex justify-between flex-wrap gap-x-8'>
              <span className={`${colors.primary} font-bold`}>{job.company}</span>
              <span className={colors.text300}>{job.location}</span>
            </div>
            <div className='flex justify-between flex-wrap gap-x-8'>
              <span className={colors.text200}>{job.title}</span>
              <span className={colors.text300}>{job.period}</span>
            </div>
            <ul className={`${colors.text300} mt-1 list-disc list-inside`}>
              {job.description.map((item, i) => (
                <li className='mb-1' key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
