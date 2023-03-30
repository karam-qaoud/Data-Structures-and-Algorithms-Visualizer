import React, { useEffect, useRef, useState } from 'react';
import { Circle } from './Circle.tsx';

function Graphs() {
  const [circles, setCircles] = useState(new Map());
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [inputOfNode1, setinputOfNode1] = useState('');
  const [inputOfNode2, setinputOfNode2] = useState('');
  const [inputOfDeleteNode, setinputOfDeleteNode] = useState('');
  const canvasRef = useRef(null);
  const graph = useRef(new Map());
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    // Draw circles
    circles.forEach((circle, label) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.font = '14px Arial';
      const label1Width = ctx.measureText(label).width;
      ctx.fillText(label, circle.x - label1Width / 2, circle.y + 5);
    });

    // Draw lines between circles
    ctx.beginPath();

    graph.current.forEach((neighbours, node) => {
      let nodeCircle = circles.get(node);
      neighbours.forEach((neighbour) => {
        let neighbourCircle = circles.get(neighbour);
        const x1 = neighbourCircle.x;
        const y1 = neighbourCircle.y;
        const x2 = nodeCircle.x;
        const y2 = nodeCircle.y;
        const r1 = neighbourCircle.r;
        const r2 = nodeCircle.r;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        const offsetX1 = r1 * Math.cos(angle);
        const offsetY1 = r1 * Math.sin(angle);
        const offsetX2 = r2 * Math.cos(angle + Math.PI);
        const offsetY2 = r2 * Math.sin(angle + Math.PI);
        const startX = x1 + offsetX1;
        const startY = y1 + offsetY1;
        const endX = x2 + offsetX2;
        const endY = y2 + offsetY2;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
      });
    });
    ctx.stroke();
  }, [circles]);

  function handleMouseDown(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    for (let [circleLabel, circleObject] of circles) {
      const dx = circleObject.x - mouseX;
      const dy = circleObject.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= circleObject.r) {
        setSelectedCircle(circleLabel);
        setOffsetX(dx);
        setOffsetY(dy);
        break;
      }
    }
  }

  function handleMouseMove(e) {
    if (selectedCircle !== null) {
      const mouseX = e.nativeEvent.offsetX;
      const mouseY = e.nativeEvent.offsetY;
      const newCircles = new Map();
      // Copy over old circles
      for (let [key, value] of circles) {
        newCircles.set(key, value);
      }

      const newSelectedCircleObject = new Circle(
        mouseX + offsetX,
        mouseY + offsetY,
        20
      );
      newCircles.set(selectedCircle, newSelectedCircleObject);
      setCircles(newCircles);
    }
  }

  function handleMouseUp() {
    setSelectedCircle(null);
  }

  function handleinputOfNode1Change(e) {
    setinputOfNode1(e.target.value);
  }

  function handleinputOfNode2Change(e) {
    setinputOfNode2(e.target.value);
  }

  function handleinputOfDeleteNodeChange(e) {
    setinputOfDeleteNode(e.target.value);
  }

  function addNodeToGraph(node1, node2) {
    if (!graph.current.has(node1)) {
      graph.current.set(node1, []);
    }

    if (node2 !== null) {
      graph.current.get(node1).push(node2);
    }
  }

  function handleAddNodes() {
    let inputOfNode1Value = inputOfNode1.trim();
    let inputOfNode2Value = inputOfNode2.trim();
    if (inputOfNode1Value === '' && inputOfNode2Value === '') return;
    if (inputOfNode1Value === inputOfNode2Value) inputOfNode2Value = '';
    if (inputOfNode1Value !== '' || inputOfNode2Value !== '') {
      if (inputOfNode1Value !== '') {
        addNodeToGraph(
          inputOfNode1,
          inputOfNode2Value === '' ? null : inputOfNode2
        );
      }
      if (inputOfNode2Value !== '') {
        addNodeToGraph(
          inputOfNode2,
          inputOfNode1Value === '' ? null : inputOfNode1
        );
      }
      const newCircles = new Map();
      // Copy over old circles
      for (let [key, value] of circles) {
        newCircles.set(key, value);
      }

      if (inputOfNode1Value !== '' && !newCircles.has(inputOfNode1)) {
        const circle1 = new Circle(
          Math.random() * canvasRef.current.width,
          Math.random() * canvasRef.current.height,
          20
        );
        newCircles.set(inputOfNode1, circle1);
      }

      if (inputOfNode2Value !== '' && !newCircles.has(inputOfNode2)) {
        const circle2 = new Circle(
          Math.random() * canvasRef.current.width,
          Math.random() * canvasRef.current.height,
          20
        );
        newCircles.set(inputOfNode2, circle2);
      }
      setCircles(newCircles);
      setinputOfNode1('');
      setinputOfNode2('');
    }
  }

  function handleDeleteNode() {
    let nodeValue = inputOfDeleteNode.trim();
    if (graph.current.has(nodeValue)) {
      graph.current.delete(nodeValue);
      for (let [node, neighbours] of graph.current) {
        let newNeighbours = neighbours.reduce((res, curr) => {
          if (curr !== nodeValue) {
            res.push(curr);
          }
          return res;
        }, []);
        console.log(nodeValue, newNeighbours);
        graph.current.set(node, newNeighbours);
      }
      console.log(graph);
    }
    if (circles.has(nodeValue)) {
      let newCircles = new Map();
      for (let [key, value] of circles) {
        if (key !== nodeValue) newCircles.set(key, value);
      }
      setCircles(newCircles);
    }
    setinputOfDeleteNode('');
  }

  return (
    <div className="controls-animation">
      <div>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={{ border: '1px solid black' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className="controls">
        <h1>Graphs</h1>
        <div className="label-and-input">
          <h3 className="tag" htmlFor="inputOfNode1">
            First Node{' '}
          </h3>
          <input
            id="inputOfNode1"
            type="text"
            value={inputOfNode1}
            onChange={handleinputOfNode1Change}
          />
        </div>
        <div className="label-and-input">
          <h3 className="tag" htmlFor="inputOfNode2">
            Second Node
          </h3>
          <input
            id="inputOfNode2"
            type="text"
            value={inputOfNode2}
            onChange={handleinputOfNode2Change}
          />
        </div>
        <button className="btn" onClick={handleAddNodes}>
          Add Edge
        </button>
        <hr style={{ width: '100%', borderTop: '1px solid black' }} />
        <div className="label-and-input">
          <h3 className="tag" htmlFor="inputOfDeleteNode">
            Node
          </h3>
          <input
            id="inputOfDeleteNode"
            type="text"
            value={inputOfDeleteNode}
            onChange={handleinputOfDeleteNodeChange}
          />
        </div>
        <button className="btn" onClick={handleDeleteNode}>
          Delete Node
        </button>
      </div>
    </div>
  );
}

export default Graphs;
