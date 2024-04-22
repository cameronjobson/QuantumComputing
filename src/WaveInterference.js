// WaveInterference.js

import React from 'react';
import * as math from 'mathjs';
import WaveCanvas from './WaveCanvas';
import ParticleCanvas from './ParticleCanvas';
import ObserverEffectCanvas from './ObserverEffectCanvas';

 const WaveInterference = ({ wavelength, distance, slitSeparation, showParticles, observerEffect, numPhotons,slitWidth }) => {
  // wave interference defines the 
  const points = math.range(-10, 10, 0.02).toArray();
  const intensity = points.map(x => {
    const theta = Math.atan(x / distance);
    const pathDifference = slitSeparation * 1e-6 * Math.sin(theta);

    // we need to define slit width
    const UnitslitWidth=slitWidth*1e-6;
    const beta =
      (Math.PI * UnitslitWidth * Math.sin(theta)) / (wavelength * 1e-9);
    const alpha = Math.PI*slitSeparation*Math.sin(theta)/(wavelength*1e-9);
    return Math.cos(alpha)**2*Math.pow(Math.sin(beta)/beta,2);
  });

  if (observerEffect) {
    return <ObserverEffectCanvas points={points} intensity={intensity} measure={true} wavelength = {wavelength} 
    distance = {distance} slitSeparation={slitSeparation} slitWidth = {slitWidth} />;

  } else if (showParticles) {
    return <ParticleCanvas points={points} probabilityDensity={intensity} numPhotons={numPhotons} wavelength={wavelength} />;
  } else {
    return <WaveCanvas points={points} intensity={intensity} wavelength={wavelength} />;
  }
};

export default WaveInterference;
