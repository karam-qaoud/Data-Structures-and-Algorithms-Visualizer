import React, { useState } from 'react';

let animationSpeed = 1000;
let arraySize = 200;

// ============================= Helper Functions =============================
export function visualizeQuickSort(array) {
  const sortingSteps = [];
  if (array.length <= 1) return array;
  quickSort(array, sortingSteps);
  return sortingSteps;
}

function quickSort(arr, sortingSteps) {
  let stack = [{ left: 0, right: arr.length - 1 }];

  while (stack.length > 0) {
    let { left, right } = stack.pop();

    if (left >= right) {
      continue;
    }

    let pivot = partition(arr, left, right, sortingSteps);

    stack.push({ left: left, right: pivot - 1 });
    stack.push({ left: pivot + 1, right: right });
  }

  return arr;
}

function partition(arr, left, right, sortingSteps) {
  let pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j, sortingSteps);
    }
  }

  swap(arr, i + 1, right, sortingSteps);

  return i + 1;
}

function swap(arr, i, j, sortingSteps) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  sortingSteps.push([j, j]);
  sortingSteps.push([j, j]);
  sortingSteps.push([i, arr[i]]);
  sortingSteps.push([j, j]);
  sortingSteps.push([j, j]);
  sortingSteps.push([j, arr[j]]);
}

function generateRandomArray() {
  const arr: number[] = [];
  for (let i = 0; i < arraySize; i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
}

function setAnimationSpeed(event) {
  animationSpeed = 1000 - event.target.value;
}

function setArraySize(event) {
  arraySize = event.target.value;
}

// ============================= Merge Sort Visualization Component =============================
function QuickSortVisualization(): JSX.Element {
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [hasANewArrayBeenGenerated, setHasANewArrayBeenGenerated] =
    useState(true);
  const [arraySizeState, setArraySizeState] = useState(arraySize);
  const [animationSpeedState, setAnimationSpeedState] =
    useState(animationSpeed);
  const [arrToSort, setArrToSort] = useState(generateRandomArray());

  async function runSortingVisualization() {
    setIsAnimationDone(false);
    const sortingSteps = visualizeQuickSort([...arrToSort]);
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
        <h1>Quick Sort</h1>
        <div className="speed-control">
          <h2> Speed  </h2>
          <input
            type="range"
            onChange={(event) => {
              setAnimationSpeed(event);
              setAnimationSpeedState(animationSpeed);
            }}
            min={0}
            max={1000}
            step={1}
            className="speed-slider"
          ></input>
          <p className="label"> {animationSpeedState} ms</p>
        </div>
        <div className="array-size-control">
          <h2> Array Size  </h2>
          <input
            type="range"
            onChange={(event) => {
              setArraySize(event);
              setArraySizeState(arraySize);
            }}
            min={1}
            max={200}
            step={1}
          ></input>
          <p className="label"> {arraySizeState} </p>
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

export default QuickSortVisualization;
