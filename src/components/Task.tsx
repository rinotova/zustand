import classNames from 'classnames';
import './Task.css';
import { useStore } from '../store';

function Task({ taskId }: { taskId: string }) {
  const task = useStore((store) =>
    store.tasks.find((storeTask) => storeTask.id === taskId)
  );

  if (!task) {
    return null;
  }

  return (
    <div className='task'>
      <div>{task.title}</div>
      <div className='bottomWrapper'>
        <div></div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  );
}

export default Task;
