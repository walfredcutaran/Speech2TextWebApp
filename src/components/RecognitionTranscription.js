import React , { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import styled from 'styled-components';
import { animated } from '@react-spring/web'
import { useSpring } from '@react-spring/web'
import { FaBeer, FaStopCircle } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";

const SpeechToText = () => {
const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
} = useSpeechRecognition();

const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  const [icon, setIcon] = useState('RecordStop');
  const [show, setShow] = useState(false)

  const handleClickButton = () => {
    setIcon(icon === 'RecordStop' ? 'eye-off' : 'RecordStop'); // Toggle icon state
  };

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    })
  }

if (!browserSupportsSpeechRecognition) {
    return <span>This Browser doesn't support speech recognition.</span>;
}

return (
    <div>
    <p style={{color : 'white'}}> Microphone: {listening ? 'on' : 'off'} </p>
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p style={{color : 'white'}}>{transcript}</p>

        <h3 style={{color: 'white'}}>
            Lets go for a <FaBeer color='white'/>?
        </h3>



        <BaseRectangle onClick={() => setShow(!show)}>  
            {/* {[SpeechRecognition.startListening, handleClickButton]} */}
            {show && <Popup />}
            
            <RecordButton onClick={handleClickButton} style={{top: 20, left: 20, width: 100, height: 80 }} hidden="true"> {icon === 'RecordStop' ? <FaCircleDot style={{fontSize: 50}} /> : <FaStopCircle style={{fontSize: 50}} />} </RecordButton>
            <PlayButton style={{ top: 20, right: 310, width: 100, height: 80 }} hidden="true">Play</PlayButton>
            <TextArea style={{ height: 300, width: 510, fontSize: 20 }} hidden="true" spellCheck="false" value={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}/>
        </BaseRectangle>

        <animated.div
        onClick={handleClick}
        style={{
        width: 80,
        height: 80,
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs,
        }}
    />

    </div>
);
};

const Popup = () => {
  return (
    <div>
      <h1 style={{fontSize: 45, color: "white"}} > Start Recording </h1>
    </div>
  );
};

const Button = styled.button`
    position: absolute;
    width: 50px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    border: none;
    cursor: pointer;
`;

const RecordButton = styled(Button)`
    background-color: #4d1c1c
`;

const PlayButton = styled(Button)`
    background-color: green
`;

// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react
// const AudioVisualizer = styled.button`
//     position: absolute;
//     width: 50px;
//     height: 30px;
//     background-color: #007bff;
//     border-radius: 10px;
//     color: #fff;
//     border: none;
//     cursor: pointer;
// `;

// width: 450px
// top: 60%
const BaseRectangle = styled.button`
    display: flex;
    justify-content: center;
    width: 550px;
    height: 120px;
    background-color: #2b2b2b;
    border-radius: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    border-color: white;
`;

const TextArea = styled.textarea`
    position: absolute;
    resize: none;
    top: 60%;
    transform: translateY(-50%);
    flex: 0.7;
    border-radius: 10px;
    color: white;
    background-color: black;
    font-weight: 600;
    border-color: black;
`;

export default SpeechToText;

// Extend the Styles and optimize