import React from 'react';
import algorithmDescription from '../../docs/algorithm.json';
function DijkstrasAlgorithmDescription(): JSX.Element {
  return (
    <div className="description-section">
      <h1>About Dijkstra's Algorithm</h1>
      <p className="description">
        {algorithmDescription.dijkstrasAlgorithm.generalDescription}
      </p>
      <h2 className="sub-title">Algorithm Analysis</h2>
      <p className="description">
        {algorithmDescription.dijkstrasAlgorithm.algorithmAnalysis}
      </p>
      <h2 className="sub-title">
        Runtime Complexity <mark>O((E + V) log V)</mark>
      </h2>
      <p className="description">
        {algorithmDescription.dijkstrasAlgorithm.runtimeComplexity}
      </p>
      <h2 className="sub-title">
        Space Complexity <mark>O(V)</mark>
      </h2>
      <p className="description">
        {algorithmDescription.dijkstrasAlgorithm.SpaceComplexity}
      </p>
    </div>
  );
}

export default DijkstrasAlgorithmDescription;
