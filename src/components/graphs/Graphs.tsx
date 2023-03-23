import React, { useEffect, useRef, useState } from 'react';
function Graphs() {
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;

    // Draw circles
    circles.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x1, circle.y1, circle.r1, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.font = '14px Arial';
      const label1Width = ctx.measureText(circle.label1).width;
      ctx.fillText(circle.label1, circle.x1 - label1Width / 2, circle.y1 + 5);
      ctx.beginPath();
      ctx.arc(circle.x2, circle.y2, circle.r2, 0, 2 * Math.PI);
      ctx.stroke();
      const label2Width = ctx.measureText(circle.label2).width;
      ctx.fillText(circle.label2, circle.x2 - label2Width / 2, circle.y2 + 5);
    });

    // Draw lines between circles
    ctx.beginPath();
    circles.forEach((circle) => {
      const x1 = circle.x1;
      const y1 = circle.y1;
      const x2 = circle.x2;
      const y2 = circle.y2;
      const r1 = circle.r1;
      const r2 = circle.r2;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
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
    ctx.stroke();
  }, [circles]);

  function handleMouseDown(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    for (let i = 0; i < circles.length; i++) {
      const dx = circles[i].x1 - mouseX;
      const dy = circles[i].y1 - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= circles[i].r1) {
        setSelectedCircle(i);
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
      const newCircles = [...circles];
      newCircles[selectedCircle] = {
        ...newCircles[selectedCircle],
        x1: mouseX + offsetX,
        y1: mouseY + offsetY,
      };
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

  function handleAddNodes() {
    if (input1.trim() === '' || input2.trim() === '') {
      return;
    }
    const newCircles = [
      ...circles,
      {
        x1: Math.random() * canvasRef.current.width,
        y1: Math.random() * canvasRef.current.height,
        r1: 20,
        label1: input1,
        x2: Math.random() * canvasRef.current.width,
        y2: Math.random() * canvasRef.current.height,
        r2: 20,
        label2: input2,
      },
    ];
    setCircles(newCircles);
    setInput1('');
    setInput2('');
  }

  return (
    <div>
      <div>
        <label htmlFor="input1">Input 1:</label>
        <input
          id="input1"
          type="text"
          value={input1}
          onChange={handleInput1Change}
        />
      </div>
      <div>
        <label htmlFor="input2">Input 2:</label>
        <input
          id="input2"
          type="text"
          value={input2}
          onChange={handleInput2Change}
        />
      </div>
      <button onClick={handleAddNodes}>Add Nodes</button>
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
  );
}

export default Graphs;
