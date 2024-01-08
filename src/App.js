import './App.css';
import ParticlesComponent from './components/Particles';
import SpeechToText from './components/RecognitionTranscription';
import * as React from 'react'
// import AudioVisualizer from './components/AudioVisualizer';


function App() {
  return (
    <div className="App">
        {/* <AudioVisualizer /> */}
        <ParticlesComponent  />
        <SpeechToText />
    </div>
  );

  
}

export default App;