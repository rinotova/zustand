import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageStore, Store, TaskType } from './types';
import { persist } from 'zustand/middleware';

const getTasksFromLocalStorage = () => {
  const localStorageTasksStore = localStorage.getItem('tasks-storage');
  const parsedStore: LocalStorageStore = localStorageTasksStore
    ? JSON.parse(localStorageTasksStore)
    : null;

  return parsedStore?.state.tasks || [];
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      tasks: [...getTasksFromLocalStorage()],
      draggedTask: null,
      addTask: (title: TaskType['title'], state: TaskType['state']) =>
        set((store) => ({
          tasks: [...store.tasks, { title, state, id: uuidv4() }],
        })),
      moveTask: (id: TaskType['id'], state: TaskType['state']) =>
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.id === id ? { ...task, state } : task
          ),
        })),
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
