// WaveCanvas.js

import React, { useRef, useEffect } from 'react';

const WaveCanvas = ({ points, intensity }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height); // Clear the canvas before drawing

    // Draw vertical lines based on the intensity array
    points.forEach((point, index) => {
      const x = (index / points.length) * width;
      const brightness = intensity[index] * 255;  // Scale brightness to 0-255
      const color = `rgb(${brightness},${brightness},${brightness})`;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, 0);  // Start at the top of the canvas
      ctx.lineTo(x, height);  // Draw to the bottom of the canvas
      ctx.stroke();  // Execute the drawing command
    });
  }, [points, intensity]);  // Redraw when points or intensity arrays change

  return <canvas ref={canvasRef} width={500} height={200} style={{ backgroundColor: '#fff' }} />;
};

export default WaveCanvas;
