import React from 'react';
import algorithmDescription from '../../../docs/algorithm.json';
function InsertionSortDescription(): JSX.Element {
  return (
    <div className="description-section">
      <h1>About Insertion Sort</h1>
      <p className="description">
        {algorithmDescription.insertionSort.generalDescription}
      </p>
      <h2 className="sub-title">Algorithm Analysis</h2>
      <p className="description">
        {algorithmDescription.insertionSort.algorithmAnalysis}
      </p>
      <h2 className="sub-title">
        Runtime Complexity <mark>O(N ^ 2)</mark>
      </h2>
      <p className="description">
        {algorithmDescription.insertionSort.runtimeComplexity}
      </p>
      <h2 className="sub-title">
        Space Complexity <mark>O(1)</mark>
      </h2>
      <p className="description">
        {algorithmDescription.insertionSort.SpaceComplexity}
      </p>
    </div>
  );
}

export default InsertionSortDescription;
