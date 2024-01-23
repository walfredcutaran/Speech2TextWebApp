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
import { fa } from "@fortawesome/free-solid-svg-icons";

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

  const RecorderControls = useVoiceVisualizer();
  const {
    // ... (Extracted controls and states, if necessary)
    startRecording,
    stopRecording,
    recordedBlob,
    error,
    audioRef,
  } = RecorderControls;

  const [icon, setIcon] = useState("RecordStop");
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const fireListening = () => {
    SpeechRecognition.startListening();
    RecorderControls.startRecording();
  };

  const fireListeningContinues = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: true });
      RecorderControls.startRecording();
    } else {
      alert("This Browser doesn't support continues listening.");
    }
  };

  const stopFireListening = () => {
    SpeechRecognition.stopListening();
    RecorderControls.stopRecording();
    RecorderControls.clearCanvas();
  };

  const copyClipboard = () => {
    const text = transcript;
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Text copied to clipboard!"))
      .catch((error) => alert("Error copying text: " + error));
  };

  const handleTextChange = (hoveredText) => {
    setVisualizerText(hoveredText);
  };
  const [visualizerText, setVisualizerText] = useState("Visualizer"); // Initialize state  

  if (!browserSupportsSpeechRecognition) {
    alert("This Browser doesn't support speech recognition.");
    return (
      <span style={{ color: "red" }}>
        This Browser doesn't support speech recognition.
      </span>
    );
  }

  return (
    <React.Fragment>
      <div>
        <p style={{ color: "white" }}>
          {" "}
          Microphone: {listening ? "on" : "off"}{" "}
        </p>
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
              <div className="text-area">
              
                <div
                  id="paragraph"
                  style={{ position: "absolute", marginTop: "-10px" }}
                  onMouseEnter={() => handleTextChange("Visualizer Area")}
                  onMouseLeave={() => handleTextChange("")}
                ></div>


                {isVisible && (
                  <div style={{ position: "absolute", marginTop: "15px" }}>
                    {" "}
                    <h1> {visualizerText} </h1>{" "}
                  </div>
                )}  

                {!isVisible && (
                  <div className="graphs">
                    <VoiceVisualizer
                      ref={audioRef}
                      controls={RecorderControls}
                      isControlPanelShown={false}
                      isDefaultUIShown={false}
                      height={180}
                      width={550}
                      mainBarColor={"white"}
                      secondaryBarColor={"white"}
                      speed={4}
                      barWidth={2}
                      gap={1}


                    />
                  </div>
                )}
                {[SpeechRecognition.startListening]}
                <div className="button-area">
                  <PlayButton
                    onMouseEnter={() => handleTextChange("Record Button")}
                    onMouseLeave={() => handleTextChange("")} 
                    data-tooltip-id="play-tooltip"
                    onClick={() => {
                      fireListening();
                      toggleVisibility();
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      position: 'absolute',
                      right: 70,
                      top: 10,
                    }}
                    data-tooltip-content="Start"
                  >
                    <i style={{color: '#393E46'}} class="animated-icon-start fa-solid fa-play fa-2xl"></i>
                  </PlayButton>
                  <StopButton
                    onMouseEnter={() => handleTextChange("Stop Recording Button")}
                    onMouseLeave={() => handleTextChange("")}
                    data-tooltip-id="record-tooltip"
                    onClick={() => {
                      stopFireListening();
                      toggleVisibility();
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      position: 'absolute',
                      right: 5,
                      top: 10,
                    }}
                    data-tooltip-content="Stop"
                  >
                    {" "}
                    <i style={{color: '#393E46'}} class="animated-icon-stop fa-solid fa-stop fa-2xl"></i>{" "}
                  </StopButton>
                  <ResetButton
                    onMouseEnter={() => handleTextChange("Reset Button")}
                    onMouseLeave={() => handleTextChange("")}
                    data-tooltip-id="reset-tooltip"
                    onClick={resetTranscript}
                    style={{
                      width: 60,
                      height: 60,
                      position: 'absolute',
                      right: 70,
                      top: 80,
                    }}
                    data-tooltip-content="Reset"
                  >
                    <i style={{color: '#393E46'}} class="animated-icon-reset fa-solid fa-arrow-rotate-left fa-2xl"></i>{" "}
                  </ResetButton>
                  <ContinuesButton
                    onMouseEnter={() => handleTextChange("Continues Recording Button")}
                    onMouseLeave={() => handleTextChange("")}
                    data-tooltip-id="continues-tooltip"
                    style={{
                      width: 60,
                      height: 60,
                      position: 'absolute',
                      right: 5,
                      top: 80,
                    }}
                    data-tooltip-content="Continues Recording"
                    onClick={() => {
                      fireListeningContinues();
                      toggleVisibility();
                    }}
                  >
                    {""}
                    <i style={{color: '#393E46'}} class="fa-solid fa-infinity fa-2xl"></i>{" "}
                  </ContinuesButton>
                </div>
                
                <div className="tools-button">
                <RetractButton
                    onMouseEnter={() => handleTextChange("Minimize Button")}
                    onMouseLeave={() => handleTextChange("")}
                    data-tooltip-id="retract-tooltip"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsOpen(false);
                      handleTextChange("Visualizer");
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      right: 6,
                      top: 10,
                    }}
                    data-tooltip-content="Minimize"
                  >
                    {""} <i style={{color: '#393E46'}} class="fa-solid fa-minimize fa-xl"></i>{" "}
                  </RetractButton>

                  <ClipboardButton
                    onMouseEnter={() => handleTextChange("Copy Transcript Button")}
                    onMouseLeave={() => handleTextChange("")}
                    data-tooltip-id="retract-tooltip" 
                    onClick={(event) => {
                      copyClipboard();
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      right: 50,
                      top: 10,
                    }}
                    data-tooltip-content="Copy to Clipboard"
                  >
                    {""} <i style={{color: '#393E46'}} class="fa-solid fa-clipboard fa-xl"></i>{" "}
                  </ClipboardButton>
                </div>

                <div className="text-area">
                  <TextArea
                    onMouseEnter={() => handleTextChange("Transcript Area")}
                    onMouseLeave={() => handleTextChange("")}
                    className="textarea"
                    style={{
                      fontSize: 15,
                      color: "f3f3f3",
                      padding: "5px",
                      background: "#222831",
                      marginLeft: 50,
                    }}
                    spellCheck="false"
                    // value={transcript}
                    value={transcript}
                  />
                </div>
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
  background-color: #EEEEEE;
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: #00ADB5;
    animation: fa-beat 0.5s;
    i {
      animation: fa-bounce 1s;
    }
  }
`;

const PlayButton = styled(Button)`
  background-color: #EEEEEE;
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: #00ADB5;
    animation: fa-beat 0.5s;
    i {
      animation: fa-bounce 1s;
    }
  }
`;

const ResetButton = styled(Button)`
  background-color: #EEEEEE;
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: #00ADB5;
    animation: fa-spin reverse 0.4s;
    i {
      animation: fa-spin reverse 0.4s;
    }
  }
`;
const RetractButton = styled(Button)`
  background-color: #EEEEEE;
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: #00ADB5;
    animation: fa-beat 0.5s;
    i {
      animation: fa-bounce 1s;
    }
  }
`;

const ClipboardButton = styled(Button)`
  background-color: #EEEEEE;
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: #00ADB5;
    animation: fa-beat 0.5s;
    i {
      animation: fa-bounce 1s;
    }
  }
`;

const ContinuesButton = styled(Button)`
  background-color: #EEEEEE;
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    background-position: 0 0;
    background-color: #00ADB5;
    animation: fa-beat 0.5s;
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
  font-weight: 400;
  border-color: #222831;
  border-width: 2px;
`;

export default SpeechToText;

// Extend the Styles and optimize
