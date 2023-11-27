import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import styled from 'styled-components';
import { FaBeer } from "react-icons/fa";

const SpeechToText = () => {
const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
} = useSpeechRecognition();

if (!browserSupportsSpeechRecognition) {
    return <span>This Browser doesn't support speech recognition.</span>;
}

return (
    <div>
    <p style={{color : 'white'}}>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p style={{color : 'white'}}>{transcript}</p>

        <h3 style={{color: 'white'}}>
            Lets go for a <FaBeer color='white'/>?
        </h3>

        <BaseRectangle>
            <RecordButton style={{ top: 20, left: 20, width: 100, height: 80 }}>Record</RecordButton>
            <PlayButton style={{ top: 20, right: 310, width: 100, height: 80 }}>Play</PlayButton>
            <TextArea style={{ height: 300, width: 510, fontSize: 20 }} spellCheck="false" value={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}/>
        </BaseRectangle>

    </div>
);
};

const Button = styled.button`
    position: absolute;
    width: 50px;
    height: 30px;
    background-color: #007bff;
    border-radius: 10px;
    color: #fff;
    border: none;
    cursor: pointer;
`;

const RecordButton = styled(Button)`
    background-color: red
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

const BaseRectangle = styled.div`
    display: flex;
    justify-content: center;
    width: 550px;
    height: 450px;
    background-color: #2e2e2e;
    border-radius: 20px;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
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