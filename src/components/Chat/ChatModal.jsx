import "regenerator-runtime";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../store/slices/chatInteraction";
import { BsFillMicFill } from "react-icons/bs";
import styles from "./chatmodal.module.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const ChatModal = () => {
  const dispatch = useDispatch();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-red-400 text-center">
        Browser doesn't support speech recognition.
      </p>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0000006c] ">
      <div className="bg-white p-6 rounded-lg shadow-lg grid gap-3 place-items-center">
        {/* <!-- Modal content goes here --> */}
        <h2 className="text-lg font-semibold mb-4">Voice Command</h2>
        <div className={listening ? styles.animatedMic : styles.roundedDiv}>
          <BsFillMicFill
            fontSize={100}
            className="cursor-pointer"
            onClick={
              !listening
                ? SpeechRecognition.startListening
                : SpeechRecognition.stopListening
            }
          />
        </div>

        {/* <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button> */}
        <p>{transcript}</p>

        {/* <p className="text-gray-600">Modal content goes here...</p> */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={() => dispatch(toggleModal())}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
