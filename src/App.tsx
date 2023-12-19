import './App.css';
import Column from './components/Column';

function App() {
  return (
    <div className='App flex flex-col items-center md:flex-row md:items-start justify-start gap-2 py-2'>
      <Column state='PLANNED' />
      <Column state='ONGOING' />
      <Column state='DONE' />
    </div>
  );
}

export default App;
