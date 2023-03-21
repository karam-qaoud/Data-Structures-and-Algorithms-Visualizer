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
    ctx.lineWidth = 2;
    circles.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
      ctx.stroke();
    });
    for (let i = 0; i < circles.length - 1; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const dx = circles[j].x - circles[i].x;
        const dy = circles[j].y - circles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 200) {
          ctx.beginPath();
          ctx.moveTo(circles[i].x, circles[i].y);
          ctx.lineTo(circles[j].x, circles[j].y);
          ctx.stroke();
        }
      }
    }
  }, [circles]);

  function handleMouseDown(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    for (let i = 0; i < circles.length; i++) {
      const dx = circles[i].x - mouseX;
      const dy = circles[i].y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= circles[i].r) {
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
        x: mouseX + offsetX,
        y: mouseY + offsetY,
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
        x: Math.random() * canvasRef.current.width,
        y: Math.random() * canvasRef.current.height,
        r: 20,
        label: input1,
      },
      {
        x: Math.random() * canvasRef.current.width,
        y: Math.random() * canvasRef.current.height,
        r: 20,
        label: input2,
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
