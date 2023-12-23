import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import './App.css';
import Column from './components/Column';
import { useDraggedTask, useMoveTask, useSetDraggedTask } from './store';
import { TaskState } from './types';

function App() {
  const setDraggedTask = useSetDraggedTask();
  const draggedTask = useDraggedTask();
  const moveTask = useMoveTask();

  const onDragEnd = (result: DropResult) => {
    if (!draggedTask) {
      return;
    }
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    moveTask(
      draggedTask.id,
      destination.droppableId as TaskState,
      source.index,
      destination.index
    );
    setDraggedTask(null);
  };

  const onDragStart = (result: DragStart) => {
    const { draggableId } = result;
    setDraggedTask(draggableId);
  };

  return (
    <div className='App flex flex-col items-center md:flex-row md:items-start justify-center gap-2 py-2'>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Column state='PLANNED' />
        <Column state='ONGOING' />
        <Column state='DONE' />
      </DragDropContext>
    </div>
  );
}

export default App;
