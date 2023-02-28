import './App.css';
import MergeSort from './components/MergeSortVisualization.tsx';
import { useState } from 'react';
function App() {
  let [selection, setSelection] = useState('');

  function renderSelection(selection) {
    if (selection === '') {
      return <MergeSort />;
    }
  }
  return <div className="App">{renderSelection(selection)}</div>;
}

export default App;
