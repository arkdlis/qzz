import { useEffect, useState } from "react"
import { Question } from "./Question"
import { useTriviaApi } from "./domain/useTriviaApi"


// ile sekund
const totalTime = 20;


export const QuizController = () => {
  const [index] = useState(Math.floor(Math.random()*10))
  const [selected, setSelected] = useState<number>()
  const [questions] = useTriviaApi()
  const [elapsedTime, setElapsedTime] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
    }, 1000)
  }, [])
  return (
    questions?.length
    ? <Question
        triviaQuestion={questions[index]}
        onSelected={(id) => setSelected(id)}
        elapsedTime={elapsedTime}
        totalTime={totalTime}
        selected={selected}
      ></Question>
    : <div>Loading...</div>
  )
}