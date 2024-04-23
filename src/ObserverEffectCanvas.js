// ObserverEffectCanvas.js

import React, { useRef, useEffect } from 'react';
import { wavelengthToColor } from './WaveCanvas';
const ObserverEffectCanvas = ({
  points,
  intensity,
  measure,
  wavelength,
}) => {
  const canvasRef = useRef(null);
  const dotRadius = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (measure) {
      // If measurement is true, collapse the wave function (no interference pattern)
      drawPhotons(ctx, width, height, points, intensity);
    }
  }, [points, intensity, measure]);

  // function drawPhotons(ctx, width, height, points, intensity) {
    
  //   const scale = height / Math.max(...intensity);
  //   const maxIntensity = Math.max(...intensity);
  //   ctx.fillStyle = wavelengthToColor(wavelength, 1);
  //   points.forEach((point, index) => {
  //     const x = (index / points.length) * width;
  //     const y = height - intensity[index] * scale; // Invert y-axis for canvas
  //     const brightness = intensity[index] / maxIntensity; // Normalize brightness
  //     const dotSize = dotRadius;
  //     ctx.beginPath();
  //     ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
  //     ctx.fill();
  //   });
  // }
  function drawPhotons(ctx, width, height, points, intensity) {
    const scale = height / Math.max(...intensity);
    const maxIntensity = Math.max(...intensity);
    ctx.strokeStyle = wavelengthToColor(wavelength, 1);
    ctx.lineWidth = 2; // Adjust line width as needed
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = (index / points.length) * width;
      const y = height - intensity[index] * scale; // Invert y-axis for canvas
      const brightness = intensity[index] / maxIntensity; // Normalize brightness
      if (index === 0) {
        ctx.moveTo(x, y); // Move to the first point
      } else {
        ctx.lineTo(x, y); // Draw line to the current point from the previous one
      }
    });
    ctx.stroke(); // Stroke the path to draw the lines
  }

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={200}
      style={{ backgroundColor: "#fff" }}
    />
  );
};

export default ObserverEffectCanvas;
