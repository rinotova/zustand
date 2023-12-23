import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useFilteredTasksByState, useAllTasks } from '../store';
import { TaskState } from '../types';
import './Column.css';
import Task from './Task';
import TaskModal from './TaskModal';
import { useState } from 'react';
import classNames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

function Column({ state }: { state: TaskState }) {
  const [parent] = useAutoAnimate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const filteredTasksByState = useFilteredTasksByState(state);
  const allTasks = useAllTasks();

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
              {filteredTasksByState.map((task) => (
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
