import { useState } from "react"

export const useCounter = (init = 10) => {
    
    const [counter, setCounter] = useState(init);

    const increment = ( value = 1 ) => {
        setCounter(counter + value);
    }

    const decrement = (value = 1) => {
        setCounter(counter - value);
    }

    const reset = () => {
        setCounter(init)
    }

    return {
        counter,
        increment,
        decrement,
        reset
    }
}