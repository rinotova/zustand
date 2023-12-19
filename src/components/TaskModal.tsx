import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { TaskState } from '../types';
import { useStore } from '../store';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
  },
};

function TaskModal({
  open,
  state,
  onClose,
}: {
  open: boolean;
  state: TaskState;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const addTask = useStore((store) => store.addTask);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(open);

  const closeModal = () => {
    setIsOpen(false);
    onClose(false);
  };

  const onAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (text) {
      addTask(text, state);
      closeModal();
    }
  };
  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isOpen}
      contentLabel='Task modal'
      style={customStyles}
    >
      <form className='flex flex-col gap-4' onSubmit={onAddTask}>
        <h2>Task title</h2>
        <input
          className='h-7 border border-black p-4'
          placeholder='Write something...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type='submit'
          className='cursor-pointer border border-blue-50 bg-green-200'
        >
          Add
        </button>
      </form>
    </Modal>
  );
}

export default TaskModal;
