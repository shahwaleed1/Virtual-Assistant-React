import React, { createContext, use, useState, } from 'react'
import run from '../gemini'
export const DataContext = createContext()

const UserContext = ({ children }) => {
    const [speaking, setSpeaking] = useState(false)
    const [recognitionText, setRecognitionText] = useState("listening...")
    const [response, setResponse] = useState(false)

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.valume = '1'
        text_speak.rate = '1'
        text_speak.pitch = '1'
        text_speak.lang = 'hi-GB'
        window.speechSynthesis.speak(text_speak)
    }

    async function aiResponse(prompt) {
        let text = await run(prompt)
        speak(text)
        // console.log(text);
        setRecognitionText(text)
        setResponse(true)

        setTimeout(() => {
            setSpeaking(false)
        }, 6000)

    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition()
    recognition.onresult = (e) => {
        let currenIndex = e.resultIndex
        let transcript = e.results[currenIndex][0].transcript
        // aiResponse(transcript)
        // setRecognitionText(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command) {
        if ((command.includes("open")) && (command.includes("youtube"))) {
            window.open('https://www.youtube.com/', '_blank')
            speak("opening Youtube...")
            setRecognitionText("opening Youtube...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if ((command.includes("open")) && (command.includes("google"))) {
            window.open('https://www.google.com/', '_blank')
            speak("opening google...")
            setRecognitionText("opening Google...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if ((command.includes("open")) && (command.includes("tiktok"))) {
            window.open('https://www.tiktok.com/', '_blank')
            speak("opening tiktok...")
            setRecognitionText("opening Tiktok...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if ((command.includes("open")) && (command.includes("instagram"))) {
            window.open('https://www.instagram.com/', '_blank')
            speak("opening instagram...")
            setRecognitionText("opening Instgram...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if((command.includes("open")) && (command.includes("calculator")) ){
            window.open("calculator://")
            speak("opening calulator...")
            setRecognitionText("opening calculator...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if(command.includes("time")){
            let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"})
            speak(time)
            setRecognitionText(time)
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if(command.includes("date")){
            let date = new Date().toLocaleString(undefined,{day:"numeric", month:'long', year:"numeric"})
            speak(date)
            setRecognitionText("Today Date " + date)
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else {
            aiResponse(command)
        }
    }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        recognitionText,
        setRecognitionText,
        response,
    }


    return (
        <div>
            <DataContext.Provider value={value}>
                {children}
            </DataContext.Provider>
        </div >
    )
}

export default UserContext