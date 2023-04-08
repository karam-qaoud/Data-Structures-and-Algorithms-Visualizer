import React from 'react';
import algorithmDescription from '../../../docs/algorithm.json';
function BubbleSortDescription(): JSX.Element {
  return (
    <div className="description-section">
      <h1>About Bubble Sort</h1>
      <p className="description">
        {algorithmDescription.bubbleSort.generalDescription}
      </p>
      <h2 className="sub-title">Algorithm Analysis</h2>
      <p className="description">
        {algorithmDescription.bubbleSort.algorithmAnalysis}
      </p>
      <h2 className="sub-title">
        Runtime Complexity <mark>O(N ^ 2) average and worst case</mark>
      </h2>
      <p className="description">
        {algorithmDescription.bubbleSort.runtimeComplexity}
      </p>
      <h2 className="sub-title">
        Space Complexity <mark>O(1)</mark>
      </h2>
      <p className="description">
        {algorithmDescription.bubbleSort.SpaceComplexity}
      </p>
    </div>
  );
}

export default BubbleSortDescription;
