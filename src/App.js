import './App.css';
import ParticlesComponent from './components/Particles';
import SpeechToText from './components/RecognitionTranscription';
import * as React from 'react'
// import MicVisualizer from './components/MicVisualizer';


function App() {
  return (
    <div className="App">
        <ParticlesComponent  />
        <SpeechToText />
        
    </div>
  );

  
}

export default App;