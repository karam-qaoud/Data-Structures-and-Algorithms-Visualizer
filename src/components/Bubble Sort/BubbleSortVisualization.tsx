import React, { useState } from 'react';
import './BubbleSortVisualization.css';

let animationSpeed = 1000;

// ============================= Helper Functions =============================
export function visualizeBubbleSort(array) {
  const sortingSteps = [];
  if (array.length <= 1) return array;
  bubbleSort(array, sortingSteps);
  return sortingSteps;
}

function bubbleSort(arr, sortingSteps) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Show position of item at index j
        sortingSteps.push([j, j + 1]);
        sortingSteps.push([j, j + 1]);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        sortingSteps.push([j, arr[j]]);

        // Show position of item at index j + 1
        sortingSteps.push([j, j + 1]);
        sortingSteps.push([j, j + 1]);
        sortingSteps.push([j + 1, arr[j + 1]]);
      }
    }
  }
  return arr;
}

function generateRandomArray() {
  const arr: number[] = [];
  for (let i = 0; i < 200; i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
}

function setAnimationSpeed(event) {
  animationSpeed = 1000 - event.target.value;
}

// ============================= Merge Sort Visualization Component =============================
function BubbleSortVisualization(): JSX.Element {
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [hasANewArrayBeenGenerated, setHasANewArrayBeenGenerated] =
    useState(true);
  const [arrToSort, setArrToSort] = useState(generateRandomArray());

  async function runSortingVisualization() {
    setIsAnimationDone(false);
    const sortingSteps = visualizeBubbleSort([...arrToSort]);
    for (let i = 0; i < sortingSteps.length; i++) {
      const bars = document.getElementsByClassName('bar');
      const changedColor = i % 3 !== 2;
      if (changedColor) {
        const [firstBar, secondBar] = sortingSteps[i];
        const firstBarStyle = bars[firstBar].style;
        const secondBarStyle = bars[secondBar].style;
        const color = i % 3 === 0 ? 'blue' : 'green';
        // eslint-disable-next-line no-loop-func
        await new Promise((resolve) =>
          setTimeout(() => {
            firstBarStyle.backgroundColor = color;
            secondBarStyle.backgroundColor = color;
            resolve('Done');
          }, animationSpeed)
        );
      } else {
        // eslint-disable-next-line no-loop-func
        await new Promise((resolve) =>
          setTimeout(() => {
            const [firstBar, newHeight] = sortingSteps[i];
            const firstBarStyle = bars[firstBar].style;
            firstBarStyle.height = `${newHeight * 5}px`;
            resolve('Done');
          }, animationSpeed)
        );
      }
    }
    setHasANewArrayBeenGenerated(false);
    setIsAnimationDone(true);
  }

  return (
    <div className="controls-animation">
      <div className="barsList">
        {arrToSort.map((num, i) => (
          <div className="bar" style={{ height: `${num * 5}px` }} key={i}></div>
        ))}
      </div>
      <div className="controls">
        <h1>Bubble Sort</h1>
        <div className="speed-control">
          <h2> Speed  </h2>
          <input
            type="range"
            onChange={setAnimationSpeed}
            min={0}
            max={1000}
            step={1}
            className="speed-slider"
          ></input>
        </div>
        <button
          className="btn"
          onClick={() => {
            setArrToSort(generateRandomArray());
            setHasANewArrayBeenGenerated(true);
          }}
          disabled={!isAnimationDone}
        >
          Generate new random array
        </button>
        <button
          className="btn"
          onClick={() => {
            runSortingVisualization();
            setHasANewArrayBeenGenerated(false);
          }}
          disabled={!isAnimationDone || !hasANewArrayBeenGenerated}
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default BubbleSortVisualization;
