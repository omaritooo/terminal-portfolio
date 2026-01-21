import { User } from '../Terminal/User';

export const About = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className='text-ubuntu-text-100'>about</span>
      </div>
      <div className='flex flex-col gap-y-6 mb-2'>
        <p className='max-w-1/2 leading-8'>
          I'm a Senior Front End Software Engineer with extensive experience of ~5 years in building
          and optimizing high-performance web applications. He specializes in modern JavaScript
          frameworks like Vue, Nuxt, React and Next, and has a proven track record of leading
          migrations, improving performance by up to 50%, and implementing robust development
          practices such as CI pipelines and Test-Driven Development (TDD). Omar has successfully
          delivered time-sensitive features, reduced user errors, and enhanced code quality across
          various industries, including AI products and smart TV applications. He is skilled in
          TypeScript, JavaScript, and a range of front-end technologies, and is fluent in English
          and Arabic.
        </p>
      </div>
    </div>
  );
};
