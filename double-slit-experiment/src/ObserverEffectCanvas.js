// ObserverEffectCanvas.js

import React, { useRef, useEffect } from 'react';

const ObserverEffectCanvas = ({ points, intensity, measure }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (measure) {
      // If measurement is true, collapse the wave function (no interference pattern)
      drawPeaks(ctx, width, height, 'red');
    } else {
      // Draw the standard interference pattern
      points.forEach((point, index) => {
        const x = (index / points.length) * width;
        const brightness = intensity[index] * 255;
        ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
        ctx.fillRect(x, 0, 1, height);
      });
    }
  }, [points, intensity, measure]);

  function drawPeaks(ctx, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(width * 0.25 - 5, 0, 10, height); // left peak
    ctx.fillRect(width * 0.75 - 5, 0, 10, height); // right peak
  }

  return <canvas ref={canvasRef} width={500} height={200} style={{ backgroundColor: '#fff' }} />;
};

export default ObserverEffectCanvas;
