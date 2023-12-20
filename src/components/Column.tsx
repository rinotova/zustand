import { useShallow } from 'zustand/react/shallow';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from '../store';
import { TaskState } from '../types';
import './Column.css';
import Task from './Task';
import TaskModal from './TaskModal';
import { useState } from 'react';
import classNames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

function Column({ state }: { state: TaskState }) {
  const [parent] = useAutoAnimate(/* optional config */);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const tasks = useStore(
    useShallow((store) => store.tasks.filter((task) => task.state === state))
  );

  const allTasks = useStore(useShallow((store) => store.tasks));

  const openModal = () => {
    setIsTaskModalOpen((state) => !state);
  };

  return (
    <>
      <Droppable droppableId={state}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('column min-w-[20rem] md:min-w-max', {
              'border border-dashed border-white': snapshot.isDraggingOver,
            })}
          >
            <div className='titleWrapper'>
              <p>{state}</p>
              <button onClick={openModal}>Add</button>
            </div>

            <ul ref={parent}>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  taskId={task.id}
                  index={allTasks.findIndex(
                    (storeTask) => storeTask.id === task.id
                  )}
                />
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
