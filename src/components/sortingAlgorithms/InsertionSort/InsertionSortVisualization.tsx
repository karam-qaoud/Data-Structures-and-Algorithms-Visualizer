import React, { useState } from 'react';

let animationSpeed = 1000;
let arraySize = 200;

// ============================= Helper Functions =============================
export function visualizeInsertionSort(array) {
  const sortingSteps = [];
  if (array.length <= 1) return array;
  insertionSort(array, sortingSteps);
  return sortingSteps;
}

function insertionSort(arr, sortingSteps) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    const tmp = arr[i];
    while (j >= 0 && arr[j] > tmp) {
      arr[j + 1] = arr[j];
      sortingSteps.push([i, j + 1]);
      sortingSteps.push([i, j + 1]);
      sortingSteps.push([j + 1, arr[j + 1]]);
      j--;
    }
    arr[j + 1] = tmp;
    sortingSteps.push([i, j + 1]);
    sortingSteps.push([i, j + 1]);
    sortingSteps.push([j + 1, arr[j + 1]]);
  }
  return arr;
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
function InsertionSortVisualization(): JSX.Element {
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [hasANewArrayBeenGenerated, setHasANewArrayBeenGenerated] =
    useState(true);
  const [arraySizeState, setArraySizeState] = useState(arraySize);
  const [animationSpeedState, setAnimationSpeedState] =
    useState(animationSpeed);
  const [arrToSort, setArrToSort] = useState(generateRandomArray());

  async function runSortingVisualization() {
    setIsAnimationDone(false);
    const sortingSteps = visualizeInsertionSort([...arrToSort]);
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
        <h1>Insertion Sort</h1>
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

export default InsertionSortVisualization;
