import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { Store, TaskState, TaskType } from './types';

const useStore = create<Store>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      addTask: (title: TaskType['title'], state: TaskType['state']) =>
        set((store) => ({
          tasks: [...store.tasks, { title, state, id: uuidv4() }],
        })),

      moveTask: (
        id: TaskType['id'],
        state: TaskType['state'],
        originalIndex: number,
        newIndex: number
      ) =>
        set((store) => {
          const updatedTasksWithState = store.tasks.map((task) =>
            task.id === id ? { ...task, state } : task
          );
          const taskCopy = [...updatedTasksWithState];

          // Remove the item from its current index
          const removedItem = taskCopy.splice(originalIndex, 1)[0];
          // Insert the item at the new index
          taskCopy.splice(newIndex, 0, removedItem);

          return {
            tasks: taskCopy,
          };
        }),

      removeTask: (id: TaskType['id']) =>
        set((store) => ({
          tasks: store.tasks.filter((task) => task.id !== id),
        })),

      setDraggedTask: (id: TaskType['id'] | null) =>
        set((store) => {
          if (!id) {
            return { draggedTask: null };
          }

          return { draggedTask: store.tasks.find((task) => task.id === id) };
        }),
    }),
    {
      name: 'tasks-storage',
    }
  )
);

// Facade layer - selectors - 
export const useFilteredTasksByState = ( state: TaskState ) => useStore(
  useShallow((store) => store.tasks.filter((task) => task.state === state))
);

export const  useGetTask = (id: TaskType['id']) => useStore(useShallow((store) =>
store.tasks.find((storeTask) => storeTask.id === id))
);

export const useAllTasks = () => useStore(useShallow((store) => store.tasks));

export const useAddTask = () => useStore((store) => store.addTask);

export const useDraggedTask = () => useStore((store) => store.draggedTask);

export const useMoveTask = () => useStore((store) => store.moveTask);

export const useRemoveTask = () => useStore((store) => store.removeTask);

export const useSetDraggedTask = () => useStore((store) => store.setDraggedTask);