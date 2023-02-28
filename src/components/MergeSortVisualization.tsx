import React, { useState } from 'react';
import './MergeSortVisualization.css';

let animationSpeed = 1000;

// ============================= Helper Functions =============================
export function visualizeMergeSort(array) {
  const sortingSteps = [];
  if (array.length <= 1) return array;
  const arrCopy = array.slice();
  mergeSort(array, 0, array.length - 1, arrCopy, sortingSteps);
  return sortingSteps;
}

function mergeSort(arr, left, right, arrCopy, sortingSteps) {
  if (left === right) return;
  const mid = Math.floor((left + right) / 2);
  mergeSort(arrCopy, left, mid, arr, sortingSteps);
  mergeSort(arrCopy, mid + 1, right, arr, sortingSteps);
  mergeTwoSortedIntervals(arr, left, mid, right, arrCopy, sortingSteps);
}

function mergeTwoSortedIntervals(arr, left, mid, right, arrCopy, sortingSteps) {
  let k = left;
  let i = left;
  let j = mid + 1;
  while (i <= mid && j <= right) {
    sortingSteps.push([i, j]);
    sortingSteps.push([i, j]);
    if (arrCopy[i] <= arrCopy[j]) {
      sortingSteps.push([k, arrCopy[i]]);
      arr[k++] = arrCopy[i++];
    } else {
      sortingSteps.push([k, arrCopy[j]]);
      arr[k++] = arrCopy[j++];
    }
  }
  while (i <= mid) {
    sortingSteps.push([i, i]);
    sortingSteps.push([i, i]);
    sortingSteps.push([k, arrCopy[i]]);
    arr[k++] = arrCopy[i++];
  }
  while (j <= right) {
    sortingSteps.push([j, j]);
    sortingSteps.push([j, j]);
    sortingSteps.push([k, arrCopy[j]]);
    arr[k++] = arrCopy[j++];
  }
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
function MergeSortVisualization(): JSX.Element {
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [hasANewArrayBeenGenerated, setHasANewArrayBeenGenerated] =
    useState(true);
  const [arrToSort, setArrToSort] = useState(generateRandomArray());

  async function runSortingVisualization() {
    setIsAnimationDone(false);
    const sortingSteps = visualizeMergeSort([...arrToSort]);
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

export default MergeSortVisualization;
