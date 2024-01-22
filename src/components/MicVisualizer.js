import React, { useState, useEffect, useRef } from "react";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize"
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"


const MicVisualizer = () => {

    const [blob, setBlob] = useState();
    const recorder = useAudioRecorder();

    return(
        <div>
        <AudioRecorder
        onRecordingComplete={setBlob}
        recorderControls={recorder}
    />

    {recorder.mediaRecorder && (
        <LiveAudioVisualizer
        mediaRecorder={recorder.mediaRecorder}
        width={200}
        height={75}
        />
    )}

    {blob && (
        <AudioVisualizer
        blob={blob}
        width={500}
        height={75}
        barWidth={1}
        gap={0}
        barColor={"#f76565"}
        />
    )}

    {blob && (
        <AudioVisualizer
        blob={blob}
        width={500}
        height={75}
        barWidth={3}
        gap={2}
        barColor={"lightblue"}
        />
    )}
    </div>
    )

}

export default MicVisualizer;