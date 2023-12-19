import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../store';
import { TaskState } from '../types';
import './Column.css';
import Task from './Task';
import TaskModal from './TaskModal';
import { useState } from 'react';

function Column({ state }: { state: TaskState }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const tasks = useStore(
    useShallow((store) => store.tasks.filter((task) => task.state === state))
  );

  const openModal = () => {
    setIsTaskModalOpen((state) => !state);
  };

  return (
    <>
      <div className='column'>
        <div className='titleWrapper'>
          <p>{state}</p>
          <button onClick={openModal}>Add</button>
        </div>

        {tasks.map((task) => (
          <Task key={task.id} taskId={task.id} />
        ))}
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
