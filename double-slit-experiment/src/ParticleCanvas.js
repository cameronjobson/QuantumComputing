// ParticleCanvas.js

import React, { useRef, useEffect } from 'react';
import { wavelengthToColor } from './WaveCanvas'; 
const ParticleCanvas = ({ points, probabilityDensity, numPhotons,wavelength }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height); // Clear the canvas
    
    // ctx.fillStyle = 'blue';
    // make the background black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    const color = wavelengthToColor(wavelength,1);
    ctx.fillStyle = color;
    console.log(color)

    for (let i = 0; i < numPhotons; i++) {
      const pointIndex = weightedRandom(probabilityDensity);
      const x = (pointIndex / points.length) * width;
      ctx.fillRect(x, Math.random() * height, 1, 1); // Simulate each photon as a small dot
    }
  }, [points, probabilityDensity, numPhotons]); // Re-run effect when numPhotons changes

  function weightedRandom(prob) {
    let sum = prob.reduce((a, b) => a + b, 0);
    let acc = 0;
    let chances = prob.map(p => (acc = p / sum + acc));
    let random = Math.random();
    let idx = chances.findIndex(chance => random < chance);
    return idx;
  }

  return <canvas ref={canvasRef} width={500} height={200} style={{ backgroundColor: '#fff' }} />;
};

export default ParticleCanvas;
