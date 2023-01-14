import './App.css'
import Quiz from './components/Quiz'
import Home from './components/Home'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from "nanoid"

function App() {
  // State variables for starting the quiz, all questions, current question, score and checking the answers
  const [start, setStart] = React.useState(true)
  const [allQuiz, setAllQuiz] = React.useState([{}])
  const [quiz, setQuiz] = React.useState([{}])
  const [score, setScore] = React.useState(0)
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);
  let tru, fals;


  // State variables for starting the quiz, all questions, current question, score and checking the answers
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=boolean")
      .then(res => res.json())
      .then(data => setAllQuiz(data.results))

  }, [])

  // useEffect hook that maps the data received from the API and sets the state of the quiz variable
  useEffect(() => {
    let elem = allQuiz.map(mcq => {
      return (
        {
          question: mcq.question,
          answer: mcq.correct_answer,
          true: false,
          false: false,
          id: nanoid(),
          isChanged: false
        }
      )
    })
    setQuiz(elem)
  }, [allQuiz])

  //handles the click event when the user selects an answer
  function handleClick(answer, key, option, state, isChanged) {
    if (option == 1) {
      setQuiz(quiz => quiz.map(element => {
        return element.id == key ? { ...element, true: !element.true, false: false, isChanged: true } : element
      }))
      if (answer == 'True' && !state) {
        setScore(s => s + 1)
      }
      if (answer == 'True' && state && score != 0) {
        setScore(s => s - 1)
      }
      if (answer == 'False' && state && score != 0) {
        setScore(s => s + 1)
      }
      if (answer == 'False' && !state && score != 0 && isChanged) {
        setScore(s => s - 1)
      }
    }
    if (option == 0) {
      setQuiz(quiz => quiz.map(element => {
        return element.id == key ? { ...element, false: !element.false, true: false, isChanged: true } : element
      }))
      if (answer == 'False' && !state) {
        setScore(s => s + 1)
      }
      if (answer == 'False' && state && score != 0) {
        setScore(s => s - 1)
      }
      if (answer == 'True' && state && score != 0) {
        setScore(s => s + 1)
      }
      if (answer == 'True' && !state && score != 0 && isChanged) {
        setScore(s => s - 1)
      }
    }

  }

  // maps the quiz data and renders it to the UI
  const render = quiz.map(quiz => {
    tru = quiz.true ? "clicked" : "normal"
    fals = quiz.false ? "clicked" : "normal"

    return (
      <>
        <Quiz key={quiz.id} question={quiz.question} />
        <div className="options">
          <button onClick={() => handleClick(quiz.answer, quiz.id, 1, quiz.true, quiz.isChanged)} className={tru}>True</button>
          <button onClick={() => handleClick(quiz.answer, quiz.id, 0, quiz.false, quiz.isChanged)} className={fals}>False</button>
        </div>
      </>
    )
  })

  // function to handle the event of checking answers
  function handleCheckAnswers() {
    setIsCheckingAnswers(true);
  }

  // function to handle the event of playing again
  function handlePlayAgain() {
    window.location.reload();
  }

  return (
    <div className="App">
      <div className='Container'>
        {start ? <Home setStart={setStart} /> :
          <>
            {render}
            {/* Showing the score and the Check or Play Again button */}
            <div className="check">
              {/* Handling scoring*/}
              {isCheckingAnswers ? <p className='score'>you scored {score}/5 correct answers</p> : ""}
              {/* Handles the check answer or play again button, and when to display each one */}
              <button onClick={isCheckingAnswers ? handlePlayAgain : handleCheckAnswers}>{isCheckingAnswers ? 'Play Again' : 'Check Answers'}</button>
            </div>
          </>
        }
        <span className="credits">Made by <a href="https://github.com/saboujid">Saboujid</a></span>

      </div>
    </div>
  )
}

export default App
