import { User } from '../Terminal/User';

export const Email = () => {
  window.location.href = 'mailto:omarash227@gmail.com';
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className='text-ubuntu-text-100'>email</span>
      </div>
      <div className='flex flex-col gap-y-6 mb-2'>
        <span>omarash227@gmail.com</span>
      </div>
    </div>
  );
};
