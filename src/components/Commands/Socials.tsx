import { User } from '../Terminal/User';

export const Socials = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className='text-ubuntu-text-100'>socials</span>
      </div>
      <div className='flex flex-col gap-y-6 mb-2'>
        <span>You can find me on: (Links are clickable)</span>
        <span>
          Linkedin:{' '}
          <a
            href='https://www.linkedin.com/in/omarashraf27/'
            rel='noopener noreferrer'
            target='_blank'
          >
            https://www.linkedin.com/in/omarashraf27/
          </a>
        </span>
        <span>
          Upwork:{' '}
          <a
            href='https://www.upwork.com/freelancers/~01e4f6196e439cb374?mp_source=share'
            rel='noopener noreferrer'
            target='_blank'
          >
            https://www.upwork.com/freelancers/~01e4f6196e439cb374?mp_source=share
          </a>
        </span>
        <span>
          Github:{' '}
          <a href='https://github.com/omaritooo' rel='noopener noreferrer' target='_blank'>
            https://github.com/omaritooo{' '}
          </a>
        </span>
      </div>
    </div>
  );
};
