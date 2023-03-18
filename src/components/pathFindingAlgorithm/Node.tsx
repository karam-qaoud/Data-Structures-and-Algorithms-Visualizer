import React, { MouseEvent } from 'react';

export default function Node({
  col,
  row,
  isStart,
  isFinish,
  isWall,
  isMouseHeld,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isMouseHeld: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}) {
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

  function renderIntitals() {
    if (isStart) return 'S';
    if (isFinish) return 'E';
    if (extraClassName === 'node-wall') return 'W';
    return ' ';
  }
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={(event: MouseEvent<HTMLDivElement>) => onMouseDown(row, col)}
      onMouseEnter={(event: MouseEvent<HTMLDivElement>) =>
        onMouseEnter(row, col)
      }
      onMouseUp={(event: MouseEvent<HTMLDivElement>) => onMouseUp()}
    >
      {renderIntitals()}
    </div>
  );
}
