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
    function mapIntensity(intensity,maxIntensity){
      // we're just going to make it modify the tolerance on the data
      const ceilingCover = .05*maxIntensity;
      let newIntensities = intensity.map((intensity) =>
        intensity/ceilingCover
      );
      // if a value is greater than 1, make it 1
      // if a value is less than 0, make it 0
      // newIntensities = newIntensities.map((intensity) =>
      //   intensity > 1 ? 1 : intensity
      // );

         
      return newIntensities;
    }
    points.forEach((point, index) => {
      const x = (index / points.length) * width;
      // get the maximum value of the intensity array
      const maxIntensity = Math.max(...intensity);
      // divide all in the intensity array by the max intensity
      
      intensity =  mapIntensity(intensity,maxIntensity);

      // scale the intensity array to 0-255
      const brightness = intensity[index] *255;  // Scale brightness to 0-255
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
