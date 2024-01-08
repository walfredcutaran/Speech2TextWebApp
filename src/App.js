import './App.css';
import ParticlesComponent from './components/Particles';
import SpeechToText from './components/RecognitionTranscription';
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