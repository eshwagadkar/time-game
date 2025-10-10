export default function ResultModal({ref, result, targetTime}) {
    
    return <dialog ref={ref} className="result-modal">
        <h2>Your {result}</h2>
        <p>The target time was <strong>{targetTime}</strong></p>
        <p>You stopped the timer with X seconds left.</p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
}