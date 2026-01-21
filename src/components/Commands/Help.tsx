import { commands, type Command } from '../../constants/commands';
import { User } from '../Terminal/User';

export const Help = () => {
  return (
    <div>
      <div>
        <User />
        <span className='text-ubuntu-text-100'>help</span>
      </div>
      <div>
        <div className='grid w-fit gap-1'>
          {commands.map((el: Command) => {
            return (
              <div className='grid grid-cols-2' key={el.tab}>
                <span>{el.cmd}</span>
                <span className='col-span-1'>{el.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
