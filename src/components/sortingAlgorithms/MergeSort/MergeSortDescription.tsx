import React from 'react';
import algorithmDescription from './../../../docs/algorithm.json';
function MergeSortDescription(): JSX.Element {
  return (
    <div className="description-section">
      <h1>About Merge Sort</h1>
      {/* Got from Wikipedia */}
      {/* Put text in a seperate file and import contnet here */}
      <p className="description">
        {algorithmDescription.mergeSort.generalDescription}
      </p>
      {/* Got from Wikipedia */}
      <h2 className="sub-title">Algorithm Analysis</h2>
      <p className="description">
        {algorithmDescription.mergeSort.algorithmAnalysis}
      </p>
      <h2 className="sub-title">
        Runtime Complexity <mark>O(N LOG N) average and worst case</mark>
      </h2>
      <p className="description">
        {algorithmDescription.mergeSort.runtimeComplexity}
      </p>
      <h2 className="sub-title">
        Space Complexity <mark>Depends</mark>
      </h2>
      <p className="description">
        {algorithmDescription.mergeSort.SpaceComplexity}
      </p>
    </div>
  );
}

export default MergeSortDescription;
