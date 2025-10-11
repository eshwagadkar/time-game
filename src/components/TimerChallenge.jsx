import { useState, useRef } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge({ title, targetTime }) {
    
    const timer = useRef()
    const dialog = useRef()

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000 

    // Clear the timer manually after the target time ran out 
    if(timeRemaining <= 0) {
        dialog.current.open()  // Open the modal because we did not press the handleStop in time (We Lost case)
        clearInterval(timer.current)  // Clean up timer manually if handleStop is not invoked. 
    }
    
    function handleReset(){
        setTimeRemaining(targetTime * 1000)
    }

    function handleStart() {    
        timer.current = setInterval(() => { // This body will run every 10ms
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10)

    }

    // Manually stop the timer 
    function handleStop() { 
        dialog.current.open()
        clearInterval(timer.current)
    }

    return <>
    <ResultModal
      ref={dialog}  
      targetTime={targetTime}
      remainingTime={timeRemaining}
      onReset={handleReset}
    />
    <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
               {timerIsActive ? 'Stop' : 'Start'} Challenge
            </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
            {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
    </section>
    </> 
}