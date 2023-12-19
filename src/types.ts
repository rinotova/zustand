export type TaskState = 'PLANNED' | 'ONGOING' | 'DONE';

export type TaskType = {
  id: string;
  title: string;
  state: TaskState;
};

export type Store = {
  tasks: TaskType[];
  addTask: (title: TaskType['title'], state: TaskType['state']) => void;
};
