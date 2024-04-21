import React, { useState } from "react";

const DoubleSlit = ({
  wavelength,
  distance,
  slitSeparation,
  showParticles,
  slitWidth
}) => {
  const localSlitWidth = slitWidth/50;



  const visualScalingFactor = .05
  const personalSeperation = slitSeparation * visualScalingFactor
  const personalDistance = distance * visualScalingFactor
  console.log(wavelength, distance, slitSeparation, showParticles)
  console.log(personalDistance)

  

  const drawCanvas = (ctx) => {
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const drawLine = (info, style = {}) => {
      const { x, y, x1, y1,thickness = 1 } = info;
      const { color = "black", width=thickness } = style;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    // Draw slits
    ctx.fillStyle = "green";



    // left slit
    drawLine({
      x: canvasWidth / 2 - personalSeperation / 2 - localSlitWidth / 2,
      y: canvasHeight - 10,
      x1: canvasWidth / 2 - personalSeperation / 2 - localSlitWidth / 2,
      y1: canvasHeight + personalDistance - 10,
      thickness: 2,
    });
    drawLine({
      x: canvasWidth / 2 - personalSeperation / 2 + localSlitWidth / 2,
      y: canvasHeight - 10,
      x1: canvasWidth / 2 - personalSeperation / 2 + localSlitWidth / 2,
      y1: canvasHeight + personalDistance - 10,
      thickness: 2,
    });


    // right slit
    drawLine({
      x: canvasWidth / 2 + personalSeperation / 2 - localSlitWidth / 2,
      y: canvasHeight - 10,
      x1: canvasWidth / 2 + personalSeperation / 2 - localSlitWidth / 2,
      y1: canvasHeight + personalDistance - 10,
      thickness: 2,
    });
    drawLine({
      x: canvasWidth / 2 + personalSeperation / 2 + localSlitWidth / 2,
      y: canvasHeight - 10,
      x1: canvasWidth / 2 + personalSeperation / 2 + localSlitWidth / 2,
      y1: canvasHeight + personalDistance - 10,
      thickness: 2,
    });

    const midHeight = canvasHeight - 10 +5;

    // connecting bar
    drawLine({
      x: canvasWidth / 2 - personalSeperation / 2 + localSlitWidth / 2,
      x1: canvasWidth / 2 + personalSeperation / 2 - localSlitWidth / 2,
      y: midHeight,
      y1: midHeight,
    });

    // outer bars
    drawLine({
      x: 0,
      x1: canvasWidth / 2 - personalSeperation / 2 - localSlitWidth / 2,
      y: midHeight,
      y1: midHeight,
    });
    drawLine({
      x: canvasWidth / 2 + personalSeperation / 2 + localSlitWidth / 2,
      x1: canvasWidth,
      y: midHeight,
      y1: midHeight,
    });
    // then we draw a horizontal line between the two slits


    // draw border around canvas
    // make them thicker

    drawLine({
      x: 0,
      x1: canvasWidth,
      y: 0,
      y1: 0,
      thickness: 10
    });
    drawLine({
      x: 0,
      x1: 0,
      y: 0,
      y1: canvasHeight,
      thickness: 10
    });
    drawLine({
      x: canvasWidth,
      x1: canvasWidth,
      y: 0,
      y1: canvasHeight,
      thickness: 10
    });
 
    



    // Draw wave pattern

  };
  return (
    <div>
      <canvas
        width={500}
        height={distance/30}
        ref={(canvas) => canvas && drawCanvas(canvas.getContext("2d"))}
      />
    </div>
  );
};

export default DoubleSlit;
