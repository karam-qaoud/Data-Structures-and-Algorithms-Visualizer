import React from 'react';

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);

  let sortedLeft = mergeSort(arr.slice(0, mid));
  let sortedRight = MergeSort(arr.slice(mid));

  let merged = mergeTwoSortedArrays(sortedLeft, sortedRight);

  return merged;
}

function mergeTwoSortedArrays(arr1: number[], arr2: number[]): number[] {
  const merged: number[] = [];
  let i = 0,
    j = 0;

  while (i < arr1.length || j < arr2.length) {
    if (j >= arr2.length || arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  return merged;
}

function MergeSortVisualization(): JSX.Element {
  const arrToSort: number[] = [4, 5, 2, 6, 2, 6, 3, 6];
  return (
    <div>
      <h1>Merge Sort Algorithm</h1>
    </div>
  );
}

export default MergeSortVisualization;
