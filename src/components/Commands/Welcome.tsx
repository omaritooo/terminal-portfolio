import { Ascii } from '../common/Ascii';
import { User } from '../Terminal/User';

export const Welcome = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <User />
        <span className='text-ubuntu-text-100'>welcome</span>
      </div>
      <span>Welcome to my portoflio</span>
      <Ascii />
      <span>type help for more commands to use</span>
    </div>
  );
};
