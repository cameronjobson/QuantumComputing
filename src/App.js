// App.js

import React, { useState, useEffect } from "react";
import './App.css';
import WaveInterference from './WaveInterference';
import DoubleSlit from "./diagramComponent";
import { MathJaxContext } from 'better-react-mathjax'; // Assuming 'better-react-mathjax' package is used
function App() {
   const [htmlContent, setHtmlContent] = useState("");  
  const [wavelength, setWavelength] = useState(700); // in nanometers
  const [distance, setDistance] = useState(2000); // distance to screen in mm
  const [slitSeparation, setSlitSeparation] = useState(800); // slit separation in micrometers
  const [slitWidth, setSlitWidth] = useState(300);
  const [showParticles, setShowParticles] = useState(false);
    
  const [observerEffect, setObserverEffect] = useState(false);
  const [numPhotons, setNumPhotons] = useState(10000); // default number of photons
  useEffect(() => {
    fetch("converted_html.html")
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
        if (window.MathJax) {
          window.MathJax.typesetPromise();
        } else {
          // If MathJax isn't loaded yet, wait a bit and then try again
          const timeout = setTimeout(() => {
            if (window.MathJax) {
              window.MathJax.typesetPromise();
            }
          }, 3000); // Wait for 3 seconds
          // Clear the timeout if the component unmounts
          return () => clearTimeout(timeout);
        }
      });
  }, []);
  const createMarkup = (html) => {
    return { __html: html };
  };
  console.log(createMarkup(htmlContent));
  

  return (
    <MathJaxContext>
      <div className="App">
        <header className="App-header">
          <h1>Double Slit Experiment Simulation</h1>
        </header>
        <div style={{ display: "flex", flexGrow: 1 }}>
          <div style={{ display: "flex" }}>
            <div
              className="controls"
              style={{ marginRight: "1rem", width: "500px" }}
            >
              <label>
                Wavelength (nm):
                <input
                  type="range"
                  min="380"
                  max="750"
                  value={wavelength}
                  onChange={(e) => setWavelength(Number(e.target.value))}
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
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
                {distance} mm
              </label>
              <label>
                Slit Seperation (μm):
                <input
                  type="range"
                  min="400"
                  max="1500"
                  value={slitSeparation}
                  onChange={(e) => setSlitSeparation(Number(e.target.value))}
                />
                {slitSeparation} μm
              </label>
              <label>
                Slit width(μm):
                <input
                  type="range"
                  min="300"
                  max="2000"
                  value={slitWidth}
                  onChange={(e) => setSlitWidth(Number(e.target.value))}
                />
                {slitWidth} μm
              </label>
              <label>
                Show Particles:
                <input
                  type="checkbox"
                  checked={showParticles}
                  onChange={(e) => setShowParticles(e.target.checked)}
                />
              </label>
              <label>
                Insensity Graph:
                <input
                  type="checkbox"
                  checked={observerEffect}
                  onChange={(e) => setObserverEffect(e.target.checked)}
                />
              </label>

              {showParticles && ( // Conditionally render "Number of Photons" if showParticles is true
                <label htmlFor="numPhotons">
                  Number of Photons:
                  <input
                    id="numPhotons"
                    type="range"
                    min="100"
                    max="20000"
                    step="100"
                    value={numPhotons}
                    onChange={(e) => setNumPhotons(Number(e.target.value))}
                  />
                  {numPhotons}
                </label>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="WaveInterferenceContainer">
                <WaveInterference
                  wavelength={wavelength}
                  distance={distance}
                  slitSeparation={slitSeparation}
                  showParticles={showParticles}
                  observerEffect={observerEffect}
                  numPhotons={numPhotons}
                  slitWidth={slitWidth} // Pass the number of photons to the WaveInterference component
                />
                <div>
                  <DoubleSlit
                    wavelength={wavelength}
                    distance={distance}
                    slitSeparation={slitSeparation}
                    showParticles={showParticles}
                    slitWidth={slitWidth}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }} className="html-content-column">
                <div dangerouslySetInnerHTML={createMarkup(htmlContent)} />
              </div>

              {/* HTML content column */}
            </div>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
