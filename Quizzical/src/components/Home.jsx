import React from "react"
import gen from '../assets/gen1.png'

export default function Home(props) {
    return (
        <div className="Home">
            <img src={gen} id='logo' />
            <p>Welcome to General Genius, We're here to help you improve your knowledge on a variety of topics,
                test and reinforce what you know!
                <br /><br /> Let's boost that brainpower together! Start your Quiz now</p>
            <button onClick={() => props.setStart(false)}>Start Quiz</button>
        </div>
    )
}