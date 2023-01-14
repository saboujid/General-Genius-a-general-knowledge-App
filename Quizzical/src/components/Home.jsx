import React from "react"

export default function Home(props) {
    return (
        <div className="Home">
            <h1>General Genius</h1>
            <p>Welcome to General Genius, We're here to help you improve your knowledge on a variety of topics,
                test and reinforce what you know!
                <br /><br /> Let's boost that brainpower together! Start your Quiz now</p>
            <button onClick={() => props.setStart(false)}>Start Quiz</button>
        </div>
    )
}