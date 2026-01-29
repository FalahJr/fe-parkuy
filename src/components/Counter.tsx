import React, { useState } from "react";
interface CounterProps{
    defaultValue?: number
} 

export const xxx: number = 10;

const Counter: React.FC<CounterProps> = (props) => {
    const [currentValue, setCurrentValue] = useState<number>(props.defaultValue || 0);

    const increase = () => setCurrentValue(currentValue + 1);
    const decrease = () => setCurrentValue(currentValue - 1);
    const reset = () => setCurrentValue(props.defaultValue || 0);

    return (
        <div>
           <p> {currentValue} </p>
           <button onClick={increase}>Increase</button>
           <button onClick={decrease}>Decrease</button>
           <button onClick={reset}>Reset</button>
        </div>
    );
} 

export default Counter;