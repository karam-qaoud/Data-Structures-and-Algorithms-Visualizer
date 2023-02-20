import './App.css';
import MergeSort from './components/MergeSortVisualization.tsx';
function App() {
  return (
    <div className="App">
      {/* TODO: change which component is rendered based on the selected algorithm from the top options bar */}
      <MergeSort />
    </div>
  );
}

export default App;
