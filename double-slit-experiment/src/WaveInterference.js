// WaveInterference.js

import React from 'react';
import * as math from 'mathjs';
import WaveCanvas from './WaveCanvas';
import ParticleCanvas from './ParticleCanvas';
import ObserverEffectCanvas from './ObserverEffectCanvas';

const WaveInterference = ({ wavelength, distance, slitSeparation, showParticles, observerEffect, numPhotons }) => {
  // wave interference defines the 
  const points = math.range(-10, 10, 0.02).toArray();
  const intensity = points.map(x => {
    const theta = Math.atan(x / distance);
    const pathDifference = slitSeparation * 1e-6 * Math.sin(theta);
    const phaseDifference = (2 * Math.PI / (wavelength * 1e-9)) * pathDifference;
    const dropoffTerm = 3.14*slitSeparation*x/(wavelength*1e-9)*distance;
    // we need to define slit width
    const slitWidth = 1e-3;
    const beta = Math.PI*slitWidth*Math.sin(theta)/(wavelength*1e-9);
    const alpha = Math.PI*slitSeparation*Math.sin(theta)/(wavelength*1e-9);
    return Math.cos(alpha)**2*Math.pow(Math.sin(beta)/beta,2);

  });

  if (observerEffect) {
    return <ObserverEffectCanvas points={points} intensity={intensity} measure={true} />;
  } else if (showParticles) {
    return <ParticleCanvas points={points} probabilityDensity={intensity} numPhotons={numPhotons} />;
  } else {
    return <WaveCanvas points={points} intensity={intensity} />;
  }
};

export default WaveInterference;
