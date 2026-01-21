import { User } from '../Terminal/User';

export const Education = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className='text-ubuntu-text-100'>education</span>
      </div>
      <div className='flex flex-col gap-y-6 mb-2'>
        <span>Arab Academy of Science and Technology (2016-2021)</span>
        <span>B.Sc in Computer Engineering</span>
      </div>
    </div>
  );
};
