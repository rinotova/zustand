import { useShallow } from 'zustand/react/shallow';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from '../store';
import { TaskState } from '../types';
import './Column.css';
import Task from './Task';
import TaskModal from './TaskModal';
import { MouseEvent, useState } from 'react';
import classNames from 'classnames';

function Column({ state }: { state: TaskState }) {
  const [drop, setDrop] = useState(false);
  const [parent] = useAutoAnimate(/* optional config */);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const tasks = useStore(
    useShallow((store) => store.tasks.filter((task) => task.state === state))
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const openModal = () => {
    setIsTaskModalOpen((state) => !state);
  };

  const onDragOverHandler = (e: MouseEvent) => {
    e.preventDefault();
    setDrop(true);
  };

  const onDragLeaveHandler = (e: MouseEvent) => {
    e.preventDefault();
    setDrop(false);
  };

  const onDropHandler = () => {
    if (!draggedTask) {
      return;
    }
    setDrop(false);
    moveTask(draggedTask.id, state);
    setDraggedTask(null);
  };

  return (
    <>
      <div
        className={classNames('column min-w-[20rem] md:min-w-max', {
          'border border-dashed border-white': drop,
        })}
        onDragOver={onDragOverHandler}
        onDrop={onDropHandler}
        onDragLeave={onDragLeaveHandler}
      >
        <div className='titleWrapper'>
          <p>{state}</p>
          <button onClick={openModal}>Add</button>
        </div>

        <ul ref={parent}>
          {tasks.map((task) => (
            <Task key={task.id} taskId={task.id} />
          ))}
        </ul>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          onClose={setIsTaskModalOpen}
          open={isTaskModalOpen}
          state={state}
        />
      )}
    </>
  );
}

export default Column;
