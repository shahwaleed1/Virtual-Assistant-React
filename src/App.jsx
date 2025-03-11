import React, { useContext } from 'react';
import './App.css';
import aiPic from './assets/ai.png';
import speak from './assets/speak.gif';
import aispeak from './assets/aiVoice.gif'
import { FaMicrophone } from "react-icons/fa";
import { DataContext } from './context/UserContext';


const App = () => {

  let { recognition, speaking, setSpeaking, recognitionText, setRecognitionText, response } = useContext(DataContext)

  const handleMicClick = () => {
    setSpeaking(true);
    recognition.start();
    setRecognitionText("listening...")
  };

  return (
    <div className='main'>
      <img src={aiPic} alt="" id='aiPic' />
      <h3>I'm Shahni, Your Virtual Assistant</h3>
      {!speaking ? (<button onClick={handleMicClick}><FaMicrophone /> </button>)
        :
        (
          <div className='speak-container'>
            {!response ? <img src={speak} className='speak-img' />
              :
              <img src={aispeak} className='aispeak-img' />}
            <p className='para'>{recognitionText}</p>
          </div>
        )
      }

    </div>
  )
}

export default App