// App.js

import React, { useState } from 'react';
import './App.css';
import WaveInterference from './WaveInterference';

function App() {
  const [wavelength, setWavelength] = useState(700); // in nanometers
  const [distance, setDistance] = useState(2000); // distance to screen in mm
  const [slitSeparation, setSlitSeparation] = useState(250); // slit separation in micrometers
  const [showParticles, setShowParticles] = useState(false);
  const [observerEffect, setObserverEffect] = useState(false);
  const [numPhotons, setNumPhotons] = useState(10000); // default number of photons

  return (
    <div className="App">
      <header className="App-header">
        <h1>Double Slit Experiment Simulation</h1>
      </header>
      <div className="controls">
        <label>
          Wavelength (nm):
          <input
            type="range"
            min="380"
            max="750"
            value={wavelength}
            onChange={e => setWavelength(Number(e.target.value))}
          />
          {wavelength} nm
        </label>
        <label>
          Distance to Screen (mm):
          <input
            type="range"
            min="1000"
            max="5000"
            value={distance}
            onChange={e => setDistance(Number(e.target.value))}
          />
          {distance} mm
        </label>
        <label>
          Slit Separation (μm):
          <input
            type="range"
            min="50"
            max="1000"
            value={slitSeparation}
            onChange={e => setSlitSeparation(Number(e.target.value))}
          />
          {slitSeparation} μm
        </label>
        <label>
          Show Particles:
          <input
            type="checkbox"
            checked={showParticles}
            onChange={e => setShowParticles(e.target.checked)}
          />
        </label>
        <label>
          Observer Effect:
          <input
            type="checkbox"
            checked={observerEffect}
            onChange={e => setObserverEffect(e.target.checked)}
          />
        </label>
        <label>
          Number of Photons:
          <input
            type="range"
            min="100"
            max="20000"
            step="100"
            value={numPhotons}
            onChange={e => setNumPhotons(Number(e.target.value))}
          />
          {numPhotons}
        </label>
      </div>
      <WaveInterference
        wavelength={wavelength}
        distance={distance}
        slitSeparation={slitSeparation}
        showParticles={showParticles}
        observerEffect={observerEffect}
        numPhotons={numPhotons} // Pass the number of photons to the WaveInterference component
      />
    </div>
  );
}

export default App;
