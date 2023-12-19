import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Store, TaskType } from './types';

export const useStore = create<Store>()((set) => ({
  tasks: [{ title: 'TestTask', state: 'ONGOING', id: uuidv4() }],
  addTask: (title: TaskType['title'], state: TaskType['state']) =>
    set((store) => ({
      tasks: [...store.tasks, { title, state, id: uuidv4() }],
    })),
}));
