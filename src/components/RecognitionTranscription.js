import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { useSpring } from "@react-spring/web";
import { color, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AudioMotionAnalyzer from "https://cdn.skypack.dev/audiomotion-analyzer?min";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  const [icon, setIcon] = useState("RecordStop");
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickButton = () => {
    setIcon(icon === "RecordStop" ? "eye-off" : "RecordStop"); // Toggle icon state
  };

  if (!browserSupportsSpeechRecognition) {
    alert("This Browser doesn't support speech recognition.");
    return (
      <span style={{ color: "red" }}>
        This Browser doesn't support speech recognition.
      </span>
    );
  }

  // if (browserSupportsContinuousListening) {
  //   SpeechRecognition.startListening({ continuous: true })
  // } else {
  //   alert("This Browser doesn't support continues listening.")
  //   return <span style={{color: 'red'}}>This Browser doesn't support continues listeing.</span>;
  // }

  return (
    <div>
      <p style={{ color: "white" }}> Microphone: {listening ? "on" : "off"} </p>

      <h3 style={{ color: "white" }}>
        {/* Lets go for a <FaBeer color='white'/>? */}
      </h3>

      <div className="framer-box">
        <motion.div
          layout
          transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(true);
          }}
          className="card"
        >
          {isOpen ? (
            // <motion.div className='expand'>
            <div className="expand">
              {[SpeechRecognition.startListening, handleClickButton]}
              <div className="button-area">
                <PlayButton
                  onClick={SpeechRecognition.startListening}
                  style={{ width: 60, height: 60 }}
                  id="startButton"
                >
                  {" "}
                  <i class="animated-icon-start fa-solid fa-play fa-2xl"></i>
                </PlayButton>
                <RecordButton
                  onClick={SpeechRecognition.stopListening}
                  style={{ width: 60, height: 60, "margin-left": 70 }}
                >
                  {" "}
                  <i class="animated-icon-stop fa-solid fa-stop fa-2xl"></i>{" "}
                </RecordButton>
                <ResetButton
                  onClick={resetTranscript}
                  style={{ width: 60, height: 60, "margin-top": 70 }}
                >
                  {" "}
                  <i class="animated-icon-reset fa-solid fa-arrow-rotate-left fa-2xl"></i>{" "}
                </ResetButton>
                <ContinuesButton
                  style={{ width: 60, height: 60, "margin-left": 400 }}
                >
                <i class="fa-solid fa-infinity fa-2xl"></i>{" "}
                </ContinuesButton>
                <RetractButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(false);
                  }}
                  style={{ width: 60, height: 60, "margin-left": 490 }}
                >
                  {" "}
                  <i class="fa-solid fa-minimize fa-2xl"></i>{" "}
                </RetractButton>
              </div>

              <motion.div className="expand">
                <TextArea
                  className="textarea"
                  style={{ fontSize: 20 }}
                  spellCheck="false"
                  value={transcript}
                />
              </motion.div>
            </div>
          ) : (
            <motion.h2>
              <h2>Click Here!</h2>
            </motion.h2>
          )}
        </motion.div>
      </div>
    </div>
  );
};
tippy('#startButton', {
  content: 'Start Recording',
});

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
    background-color: grey;
    transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: rebeccapurple;
    animation: fa-beat .5s; 
   i {
      animation: fa-bounce 1s; 
    }
  }
`;

const PlayButton = styled(Button)`
    background-color: grey;
    transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: rebeccapurple;
    animation: fa-beat .5s; 
   i {
      animation: fa-bounce 1s; 
    }
  }
`;

const ResetButton = styled(Button)`
    background-color: grey;
    transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: rebeccapurple;
    animation: fa-beat .5s; 
   i {
      animation: fa-spin reverse .4s;
    }
  }
`;
const RetractButton = styled(Button)`
    background-color: grey;
    transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: rebeccapurple;
    animation: fa-beat .5s; 
   i {
      animation: fa-bounce 1s; 
    }
  }
`;

const ContinuesButton = styled(Button)`
    background-color: grey;
    transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: rebeccapurple;
    animation: fa-beat .5s; 
   i {
      animation: fa-bounce 1s; 
    }
  }
`;

// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react

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
