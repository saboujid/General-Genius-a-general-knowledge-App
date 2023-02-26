import './App.css'
import Quiz from './components/Quiz'
import Home from './components/Home'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from "nanoid"
import he from 'he';
import gen from './assets/gen2.png'


function App() {
  const [start, setStart] = React.useState(true)
  const [allQuiz, setAllQuiz] = React.useState([{}])
  const [quiz, setQuiz] = React.useState([{}])
  const [score, setScore] = React.useState(0)
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);
  let tru, fals;



  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=boolean')
      .then(response => response.json())
      .then(data => {
        const decodedData = data.results.map(result => ({
          ...result,
          question: he.decode(result.question),
        }));
        setAllQuiz(decodedData);
      })
      .catch(error => console.error(error));
  }, []);

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

  function handleCheckAnswers() {
    setIsCheckingAnswers(true);
  }

  function handlePlayAgain() {
    window.location.reload();
  }

  return (
    <div className="App">
      <div className='Container'>
        {start ? <Home setStart={setStart} /> :
          <>
            <div id="fav">
              <img src={gen} />
            </div>
            {render}
            <div className="check">
              {isCheckingAnswers ? <p className='score'>you scored {score}/5 correct answers</p> : ""}
              <button onClick={isCheckingAnswers ? handlePlayAgain : handleCheckAnswers}>{isCheckingAnswers ? 'Play Again' : 'Check Answers'}</button>
            </div>
          </>
        }
        <span className="credits">Made by <a href="https://github.com/saboujid" target="_blank">Saboujid</a></span>

      </div>
    </div>
  )
}

export default App
