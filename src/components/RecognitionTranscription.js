import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { animated } from "@react-spring/web";
import { useSpring } from "@react-spring/web";
import { color, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from 'react-tooltip'


const SpeechToText = () => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const recorderControls = useVoiceVisualizer();
  const {
      // ... (Extracted controls and states, if necessary)
      startRecording,
      stopRecording,
      recordedBlob,
      error,
      audioRef,
  } = recorderControls;

  useEffect(() => {
    if (!recordedBlob) return;

    console.log(recordedBlob);
}, [recordedBlob, error]);

useEffect(() => {
  if (!error) return;

  console.error(error);
}, [error]);
  
  const [icon, setIcon] = useState("RecordStop");
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fireListening = () => {
      SpeechRecognition.startListening();
      recorderControls.startRecording();
  }

  const stopFireListening = () => {
      SpeechRecognition.stopListening();
      recorderControls.stopRecording();
      recorderControls.clearCanvas();
  }

  if (!browserSupportsSpeechRecognition) {
    alert("This Browser doesn't support speech recognition.");
    return (
      <span style={{ color: "red" }}>
        This Browser doesn't support speech recognition.
      </span>
    );
  } 

  const continuesListening = () => {
        if (browserSupportsContinuousListening) {
          SpeechRecognition.startListening({ continuous: true });
        } else {
          alert("This Browser doesn't support continues listening.");
        }
  };

  

    // if (browserSupportsContinuousListening) {
  //   SpeechRecognition.startListening({ continuous: true })
  // } else {
  //   alert("This Browser doesn't support continues listening.")
  //   return <span style={{color: 'red'}}>This Browser doesn't support continues listeing.</span>;
  // }



  return (
    <React.Fragment>
    <div>
      <p style={{ color: "white" }}> Microphone: {listening ? "on" : "off"} </p>
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

            <div className="expand">
            <div className="graphs">
            <VoiceVisualizer 
            ref={audioRef} 
            controls={recorderControls}
            isControlPanelShown={false}
            height={200}
            width={600}
             />
            </div>

              {[SpeechRecognition.startListening]}

              <div className="button-area">
                <PlayButton
                  data-tooltip-id="play-tooltip"
                  onClick={() => {
                  fireListening();
                }}
                  style={{ "width": 60, "height": 60, "marginLeft": 430, "marginTop": 135 }}
                  data-tooltip-content="Start"
                >
                <Tooltip id="play-tooltip" delayShow={1500} opacity={1} style={{ "backgroundColor": "grey", "color": "white" }} />
                  {" "}
                  <i class="animated-icon-start fa-solid fa-play fa-2xl"></i>
                </PlayButton>
                <StopButton
                  data-tooltip-id="record-tooltip"
                  onClick={() => {
                  stopFireListening();
                }}
                  style={{ "width": 60, "height": 60, "marginLeft": 500, "marginTop": 135 }}
                  data-tooltip-content="Stop"
                >
                  {" "}
                  <i class="animated-icon-stop fa-solid fa-stop fa-2xl"></i>{" "}
                </StopButton>
                <Tooltip id="record-tooltip" delayShow={1500} opacity={1} style={{ "backgroundColor": "grey", "color": "white" }} />
                <ResetButton
                  data-tooltip-id="reset-tooltip"
                  onClick={resetTranscript}
                  style={{ "width": 60, "height": 60, "marginLeft": 430, "marginTop": 205 }}
                  data-tooltip-content="Reset"
                >
                <Tooltip id="reset-tooltip" place="left" delayShow={1500} opacity={1} style={{ "backgroundColor": "grey", "color": "white" }} />
                  {" "}
                  <i class="animated-icon-reset fa-solid fa-arrow-rotate-left fa-2xl"></i>{" "}
                </ResetButton>
                <ContinuesButton
                  data-tooltip-id="continues-tooltip"
                  style={{ "width": 60, "height": 60, "marginLeft": 500, "marginTop": 205 }}
                  data-tooltip-content="Continues Recording"
                  onClick={continuesListening}
                >
                <Tooltip id="continues-tooltip" place="right" delayShow={1500} opacity={1} style={{ "backgroundColor": "grey", "color": "white" }} /> {""}
                <i class="fa-solid fa-infinity fa-2xl"></i>{" "}
                </ContinuesButton>
                <RetractButton
                  data-tooltip-id="retract-tooltip"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(false);
                  }}
                  style={{ "width": 40, "height": 40, "margin-left": 430, marginTop: 280 }}
                  data-tooltip-content="Minimize"
                >
                <Tooltip id="retract-tooltip" delayShow={1500} opacity={1} style={{ "backgroundColor": "grey", "color": "white" }} /> {""}
                  {" "}
                  <i class="fa-solid fa-minimize fa-xl"></i>{" "}
                </RetractButton>
              </div>

              <motion.div className="expand">
                <TextArea
                  className="textarea"
                  style={{ "fontSize": 15, "color": 'f3f3f3', "padding": '5px', "background": '#1d1d1b', "marginLeft": 50}}
                  spellCheck="false"
                  // value={transcript}
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
    </React.Fragment>
  );
};

const Button = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  border-radius: 30px;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const StopButton = styled(Button)`
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
  border-radius: 80px;
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
  border-radius: 20px;
  color: white;
  background-color: white;
  font-weight: 400;
  border-color: grey;
  border-width: 2px;
`;

export default SpeechToText;

// Extend the Styles and optimize
