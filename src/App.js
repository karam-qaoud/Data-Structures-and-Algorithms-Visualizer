import './App.css';
import MergeSortVisualization from './components/MergeSort/MergeSortVisualization.tsx';
import InsertionSortVisualization from './components/InsertionSort/InsertionSortVisualization.tsx';
import BubbleSortVisualization from './components/BubbleSort/BubbleSortVisualization.tsx';
import { useState } from 'react';
function App() {
  let [selection, setSelection] = useState('Merge Sort');

  function renderSelection(selection) {
    if (selection === 'Insertion Sort') {
      return <InsertionSortVisualization />;
    } else if (selection === 'Bubble Sort') {
      return <BubbleSortVisualization />;
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
            <button class="dropbtn">{selection}</button>
          </div>
          <div class="dropdown-content">
            <a onClick={() => setSelection('Merge Sort')}>Merge Sort</a>
            <a onClick={() => setSelection('Bubble Sort')}>Bubble Sort</a>
            <a onClick={() => setSelection('Insertion Sort')}>Insertion Sort</a>
          </div>
        </div>
      </div>
      {renderSelection(selection)}
    </div>
  );
}

export default App;
