// WaveCanvas.js

import React, { useRef, useEffect } from 'react';
export function wavelengthToColor(wavelength,brightness) {
    var R, G, B, alpha;

    if (wavelength >= 380 && wavelength < 440) {
        R = -(wavelength - 440) / (440 - 380);
        G = 0.0;
        B = 1.0;
    } else if (wavelength >= 440 && wavelength < 490) {
        R = 0.0;
        G = (wavelength - 440) / (490 - 440);
        B = 1.0;
    } else if (wavelength >= 490 && wavelength < 510) {
        R = 0.0;
        G = 1.0;
        B = -(wavelength - 510) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
        R = (wavelength - 510) / (580 - 510);
        G = 1.0;
        B = 0.0;
    } else if (wavelength >= 580 && wavelength < 645) {
        R = 1.0;
        G = -(wavelength - 645) / (645 - 580);
        B = 0.0;
    } else if (wavelength >= 645 && wavelength <= 750) {
        R = 1.0;
        G = 0.0;
        B = 0.0;
    } else {
        R = 0.0;
        G = 0.0;
        B = 0.0; // outside the visible spectrum
    }

    // Increase intensity closer to the vision limits
    if (wavelength > 700) {
        alpha = 0.3 + 0.7 * (750 - wavelength) / (750 - 700);
    } else if (wavelength < 420) {
        alpha = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
    } else {
        alpha = 1.0;
    }

    R = Math.round(R * alpha * 255);
    G = Math.round(G * alpha * 255);
    B = Math.round(B * alpha * 255);

    return `rgb(${brightness*R}, ${brightness*G}, ${brightness*B})`;
}


// Example usage:
var color = wavelengthToColor(500); // A wavelength of 500nm
console.log(color); // Outputs: rgb(0, 255, 0)

const WaveCanvas = ({ points, intensity,wavelength }) => {
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
      const brightness = intensity[index];  // Scale brightness to 0-255
      // then given some brightness, we take some RGB
      const RGB = wavelengthToColor(wavelength, brightness)
      // const color = `rgb(${brightness*RGB[0]},${brightness*RGB[1]},${brightness*RGB[2]})`;
      ctx.strokeStyle = RGB;
      ctx.beginPath();
      ctx.moveTo(x, 0);  // Start at the top of the canvas
      ctx.lineTo(x, height);  // Draw to the bottom of the canvas
      ctx.stroke();  // Execute the drawing command
    });
  }, [points, intensity]);  // Redraw when points or intensity arrays change

  return <canvas ref={canvasRef} width={500} height={200} style={{ backgroundColor: '#fff' }} />;
};

export default WaveCanvas;
