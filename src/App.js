import './App.css';
import ParticlesComponent from './components/Particles';
import SpeechToText from './components/RecognitionTranscription';

function App() {
  return (
    <div className="App">
      
      <ParticlesComponent  />
      <SpeechToText />
    </div>
  );
}

export default App;