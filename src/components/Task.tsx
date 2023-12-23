import classNames from 'classnames';
import './Task.css';
import { useGetTask, useRemoveTask } from '../store';
import { DeleteIcon } from 'lucide-react';
import { Draggable } from 'react-beautiful-dnd';

function Task({ taskId, index }: { taskId: string; index: number }) {
  const task = useGetTask(taskId);
  const removeTask = useRemoveTask();

  if (!task) {
    return null;
  }

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          className='task hover:cursor-pointer active:cursor-grabbing'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
      )}
    </Draggable>
  );
}

export default Task;
