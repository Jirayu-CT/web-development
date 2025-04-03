'use client'
import { useState } from "react"
import Link from "next/link"

const Counter = () => {
    console.log("Hello from info page")
    const [count, setCount] = useState(0)
    return (
        <div className="text-7xl gap-4">
            <button onClick={ () => setCount(count-1) }>-</button>
            {count}
            <button onClick={ () => setCount(count+1) }>+</button>
        </div>
    )
}
export default Counter