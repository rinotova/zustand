export type TaskState = 'PLANNED' | 'ONGOING' | 'DONE';

export interface TaskType {
  id: string;
  title: string;
  state: TaskState;
}

export interface Store {
  tasks: TaskType[];
  draggedTask: TaskType | null;
  addTask: (title: TaskType['title'], state: TaskType['state']) => void;
  moveTask: (title: TaskType['title'], state: TaskType['state']) => void;
  removeTask: (id: TaskType['id']) => void;
  setDraggedTask: (id: TaskType['id'] | null) => void;
}

export interface LocalStorageStore {
  state: {
    tasks: TaskType[];
  };
}
