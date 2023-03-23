import React, { useEffect, useRef, useState } from 'react';

function Graphs() {
  const [circles, setCircles] = useState(new Map());
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const canvasRef = useRef(null);
  const graph = useRef(new Map());
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;

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

      // TODO: make Circle factory class
      const newSelectedCircleObject = {
        x: mouseX + offsetX,
        y: mouseY + offsetY,
        r: 20,
      };
      newCircles.set(selectedCircle, newSelectedCircleObject);
      setCircles(newCircles);
    }
  }

  function handleMouseUp() {
    setSelectedCircle(null);
  }

  function handleInput1Change(e) {
    setInput1(e.target.value);
  }

  function handleInput2Change(e) {
    setInput2(e.target.value);
  }

  function handleInput3Change(e) {
    setInput3(e.target.value);
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
    if (input1.trim() === '' && input2.trim() === '') return;

    if (input1.trim() !== '' || input2.trim() !== '') {
      if (input1.trim() !== '') {
        addNodeToGraph(input1, input2.trim() === '' ? null : input2);
      }
      if (input2.trim() !== '') {
        addNodeToGraph(input2, input1.trim() === '' ? null : input1);
      }
      const newCircles = new Map();
      // Copy over old circles
      for (let [key, value] of circles) {
        newCircles.set(key, value);
      }

      if (input1.trim() !== '' && !newCircles.has(input1)) {
        // TODO: make Circle factory class
        const circle1 = {
          x: Math.random() * canvasRef.current.width,
          y: Math.random() * canvasRef.current.height,
          r: 20,
        };
        newCircles.set(input1, circle1);
      }

      if (input2.trim() !== '' && !newCircles.has(input2)) {
        // TODO: make Circle factory class
        const circle2 = {
          x: Math.random() * canvasRef.current.width,
          y: Math.random() * canvasRef.current.height,
          r: 20,
        };
        newCircles.set(input2, circle2);
      }
      setCircles(newCircles);
      setInput1('');
      setInput2('');
    }
  }

  function handleDeleteNode() {
    let nodeValue = input3.trim();
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
    setInput3('');
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
          <h3 className="tag" htmlFor="input1">
            First Node{' '}
          </h3>
          <input
            id="input1"
            type="text"
            value={input1}
            onChange={handleInput1Change}
          />
        </div>
        <div className="label-and-input">
          <h3 className="tag" htmlFor="input2">
            Second Node
          </h3>
          <input
            id="input2"
            type="text"
            value={input2}
            onChange={handleInput2Change}
          />
        </div>
        <button className="btn" onClick={handleAddNodes}>
          Add Edge
        </button>
        <hr style={{ width: '100%', borderTop: '1px solid black' }} />
        <div className="label-and-input">
          <h3 className="tag" htmlFor="input3">
            Node
          </h3>
          <input
            id="input3"
            type="text"
            value={input3}
            onChange={handleInput3Change}
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
