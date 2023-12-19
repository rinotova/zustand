import classNames from 'classnames';
import './Task.css';
import { useStore } from '../store';
import { DeleteIcon } from 'lucide-react';

function Task({ taskId }: { taskId: string }) {
  const task = useStore((store) =>
    store.tasks.find((storeTask) => storeTask.id === taskId)
  );

  const removeTask = useStore((store) => store.removeTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  if (!task) {
    return null;
  }

  return (
    <li
      className='task hover:cursor-pointer active:cursor-grabbing'
      draggable
      onDragStart={() => {
        setDraggedTask(taskId);
      }}
    >
      <div>{task.title}</div>
      <div className='bottomWrapper'>
        <DeleteIcon
          onClick={() => removeTask(taskId)}
          className='cursor-pointer'
          color='red'
        />
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </li>
  );
}

export default Task;
