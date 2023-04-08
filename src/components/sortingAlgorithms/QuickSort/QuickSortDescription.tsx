import React from 'react';
import algorithmDescription from './../../../docs/algorithm.json';
function QuickSortDescription(): JSX.Element {
  return (
    <div className="description-section">
      <h1>About Quick Sort</h1>
      <p className="description">
        {algorithmDescription.quickSort.generalDescription}
      </p>
      <h2 className="sub-title">Algorithm Analysis</h2>
      <p className="description">
        {algorithmDescription.quickSort.algorithmAnalysis}
      </p>
      <h2 className="sub-title">
        Runtime Complexity <mark>O(N LOG(N)) average, O(N^2) worst case.</mark>
      </h2>
      <p className="description">
        {algorithmDescription.quickSort.runtimeComplexity}
      </p>
      <h2 className="sub-title">
        Space Complexity <mark>O(LOG (N))</mark>
      </h2>
      <p className="description">
        {algorithmDescription.quickSort.SpaceComplexity}
      </p>
    </div>
  );
}

export default QuickSortDescription;
