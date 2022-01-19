import { useEffect, useState } from "react"
import { Question } from "./Question"
import { useTriviaApi } from "./domain/useTriviaApi"
import { gameMachine } from "./xstate/quiz.xstate";
import { useMachine } from '@xstate/react';

// ile sekund
const totalTime = 20;

export const QuizController = () => {
  const [index] = useState(Math.floor(Math.random() * 10))
  const [selected, setSelected] = useState<number>()
  const [questions] = useTriviaApi()
  const [elapsedTime, setElapsedTime] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
    }, 1000)
  }, [])
  const [state, send] = useMachine(gameMachine)
  
  return (
    <>
      <div>state:{state.value}</div>
      <div>state:{JSON.stringify(state.context)}</div>
      {state.matches('idle') &&
        <>
          <div>Are you ready?</div>
          <button onClick={() => send('PLAYERS_READY')}>I'm ready</button>
        </>
      }
      {state.matches('question') &&
        <>
          <button onClick={() => send('QUESTION_TIMEOUT')}>Whoops! Time is up!</button>
          <Question
            triviaQuestion={questions[index]}
            onSelected={(id) => send('USER_ANSWERED', { answer: id })}
            elapsedTime={elapsedTime}
            totalTime={totalTime}
            selected={state.context.answer}
          ></Question>
        </>
      }
      {state.matches('feedback') &&
        <>
          <div>Your answer is... CORRECT!</div>
          <button onClick={() => send('FEEDBACK_TIMEOUT')}>Ok... Let's see who is winning</button>
        </>
      }
      {state.matches('ranking') &&
        <>
          <div>...is leading the competition!</div>
          <button onClick={() => send('NEXT_QUESTION')}>Let's go to another round</button>
          <button onClick={() => send('FINISH')}>That was the last question</button>
        </>
      }
      {state.matches('final_ranking') &&
        <>
          <div>And... the winner is...!</div>
        </>
      }
    </>
  )
}