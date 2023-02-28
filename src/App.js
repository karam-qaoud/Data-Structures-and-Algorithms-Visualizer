import './App.css';
import MergeSort from './components/MergeSort/MergeSortVisualization';
import { useState } from 'react';
function App() {
  let [selection, setSelection] = useState('mergeSort');

  function renderSelection(selection) {
    if (selection === 'mergeSort') {
      return <MergeSort />;
    } else {
      return <div> </div>;
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
