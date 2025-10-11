import { useImperativeHandle, useRef, forwardRef } from "react"

const ResultModal = forwardRef(function Modal({result, targetTime}, ref) {
    
        const dialog = useRef()
    
        useImperativeHandle(ref, () => {
            return {
                open() {
                    dialog.current.showModal()
                }
            }
        })
    
        return <dialog ref={dialog} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime}</strong></p>
            <p>You stopped the timer with X seconds left.</p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    }) 

export default ResultModal