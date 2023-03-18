import React, { useEffect, useState } from 'react';
import './PathFindingAlgorithm.css';
import Node from './Node.tsx';
import { dijkstra, getNodesInShortestPathOrder } from './dijkstra.ts';

const START_NODE_ROW = 2;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 45;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export function PathFindingAlgorithm(): JSX.Element {
  const [grid, setGrid] = useState([]);
  const [isMouseHeld, setIsMouseHeld] = useState(false);

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  function handleMouseDown(row, col) {
    console.log('Mouse is down');
    setIsMouseHeld(true);
    document.body.classList.add('no-select');
    // const newGrid = getNewGridWithWallToggled(grid, row, col);
    // setGrid(newGrid);
  }

  function handleMouseEnter(row, col) {
    console.log('Mouse is entered');
    if (!isMouseHeld) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  function handleMouseUp() {
    console.log('Mouse is up');
    document.body.classList.remove('no-select');
    setIsMouseHeld(false);
  }

  async function animateDijkstra(
    visitedNodesInOrder,
    nodesInShortestPathOrder
  ) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        await new Promise((resolve) =>
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
            resolve('done');
          }, 10)
        );
        return;
      }
      await new Promise((resolve) =>
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
          resolve('done');
        }, 10)
      );
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  return (
    <div className="controls-animation">
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isMouseHeld={isMouseHeld}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="controls">
        <button className="btn" onClick={() => visualizeDijkstra()}>
          Run Visualization
        </button>
        <div className="map-legend">
          <div className="map-legend-row">
            <div className="node-no-pointer-cursor node-start"> S </div>
            <div> Start Cell </div>
          </div>
          <div className="map-legend-row">
            <div className="node-no-pointer-cursor node-finish"> E </div>
            <div> End Cell </div>
          </div>
          <div className="map-legend-row">
            <div className="node-no-pointer-cursor node-wall"> W </div>
            <div> Wall Cell </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathFindingAlgorithm;
