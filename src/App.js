import './App.css';
import MergeSortVisualization from './components/MergeSort/MergeSortVisualization.tsx';
import InsertionSortVisualization from './components/InsertionSort/InsertionSortVisualization.tsx';
import { useState } from 'react';
function App() {
  let [selection, setSelection] = useState('mergeSort');

  function renderSelection(selection) {
    if (selection === 'insertionSort') {
      return <InsertionSortVisualization />;
    } else {
      return <MergeSortVisualization />;
    }
  }
  return (
    <div className="App">
      <div className="header">
        <h1>Data Strucutres and Algorithms Visualizer</h1>
        <div class="dropdown">
          <div>
            <label> Select an algorithm: </label>
            <button class="dropbtn">Merge Sort</button>
          </div>
          <div class="dropdown-content">
            <a onClick={() => setSelection('mergeSort')}>Merge Sort</a>
            <a onClick={() => setSelection('quickSort')}>Quick Sort</a>
            <a onClick={() => setSelection('insertionSort')}>Insertion Sort</a>
          </div>
        </div>
      </div>
      {renderSelection(selection)}
    </div>
  );
}

export default App;
