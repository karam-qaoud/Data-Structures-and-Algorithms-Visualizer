import './App.css';
import MergeSortVisualization from './components/sortingAlgorithms/MergeSort/MergeSortVisualization.tsx';
import MergeSortDescription from './components/sortingAlgorithms/MergeSort/MergeSortDescription.tsx';
import QuickSortDescription from './components/sortingAlgorithms/QuickSort/QuickSortDescription.tsx';
import InsertionSortVisualization from './components/sortingAlgorithms/InsertionSort/InsertionSortVisualization.tsx';
import BubbleSortVisualization from './components/sortingAlgorithms/BubbleSort/BubbleSortVisualization.tsx';
import QuickSortVisualization from './components/sortingAlgorithms/QuickSort/QuickSortVisualization.tsx';
import ExcalidrawEmbed from './components/excalidraw/ExcalidrawEmbed.tsx';
import { useState } from 'react';
import BubbleSortDescription from './components/sortingAlgorithms/BubbleSort/BubbleSortDescription.tsx';
import InsertionSortDescription from './components/sortingAlgorithms/InsertionSort/InsertionSortDescription.tsx';
import PathFindingAlgorithm from './components/pathFindingAlgorithm/PathFindingAlgorithm.tsx';
function App() {
  let [selection, setSelection] = useState('Merge Sort');

  function renderSelection(selection) {
    if (selection === 'Insertion Sort') {
      return <InsertionSortVisualization />;
    } else if (selection === 'Quick Sort') {
      return <QuickSortVisualization />;
    } else if (selection === 'Bubble Sort') {
      return <BubbleSortVisualization />;
    } else if (selection === 'Path Finder') {
      return <PathFindingAlgorithm />;
    } else {
      return <MergeSortVisualization />;
    }
  }
  function renderAlgorithmDescription(selection) {
    if (selection === 'Insertion Sort') {
      return <InsertionSortDescription />;
    } else if (selection === 'Quick Sort') {
      return <QuickSortDescription />;
    } else if (selection === 'Bubble Sort') {
      return <BubbleSortDescription />;
    } else {
      return <MergeSortDescription />;
    }
  }
  return (
    <div className="App">
      <div className="visualiztion">
        <div className="header">
          <h1>Data Strucutres and Algorithms Visualizer</h1>
          <div class="dropdown">
            <div>
              <label> Select an algorithm: </label>
              <button class="dropbtn">{selection}</button>
            </div>
            <div class="dropdown-content">
              <a onClick={() => setSelection('Merge Sort')}>Merge Sort</a>
              <a onClick={() => setSelection('Quick Sort')}>Quick Sort</a>
              <a onClick={() => setSelection('Insertion Sort')}>
                Insertion Sort
              </a>
              <a onClick={() => setSelection('Bubble Sort')}>Bubble Sort</a>
              <a onClick={() => setSelection('Path Finder')}>Path Finder</a>
            </div>
          </div>
        </div>
      </div>

      <div>{renderSelection(selection)}</div>
      {/* Break line  */}
      <div>{renderAlgorithmDescription(selection)}</div>
      <div style={{ padding: '20px' }}></div>
      <ExcalidrawEmbed />
    </div>
  );
}

export default App;
