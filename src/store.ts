import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Store, TaskType } from './types';
import { persist } from 'zustand/middleware';

export const useStore = create<Store>()(
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
