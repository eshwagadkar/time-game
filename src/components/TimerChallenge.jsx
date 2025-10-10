import { useState, useRef } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge({ title, targetTime }) {
    // Note: Like state the value in timer below is not lost when 
    // this component function re-evaluates by the state updating function (like setTimerStarted)
    const timer = useRef()
    const dialog = useRef()

    const [timerStarted, setTimerStarted] = useState(false)
    const [timerExpired, setTimerExpired] = useState(false)

    function handleStart() {
        // Unlike state (useState) setting the timer state using useRef (timer.current)
        // doesnot cause this component function to re-evaluate.     
        timer.current = setTimeout(() => {
            setTimerExpired(true)
            dialog.current.showModal()
        }, targetTime * 1000)

        setTimerStarted(true)
    }

    function handleStop() { clearTimeout(timer.current) }

    return <>
    <ResultModal ref={dialog} targetTime={targetTime} result='lost' />
    <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
            <button onClick={timerStarted ? handleStop : handleStart}>
               {timerStarted ? 'Stop' : 'Start'} 
            </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
            {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
    </section>
    </> 
}