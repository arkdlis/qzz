import { useState } from "react"
import { Question } from "./Question"
import { useTriviaApi } from "./useTriviaApi"

// export type QuizControllerProps = {
  
// }

export const QuizController = () => {
  const [index] = useState(Math.floor(Math.random()*10))
  const [selected, setSelected] = useState<number>()
  const [questions] = useTriviaApi()
  return (
    questions?.length
    ? <Question
        triviaQuestion={questions[index]}
        onSelected={(id) => setSelected(id)}
        selected={selected}
      ></Question>
    : <div>Loading...</div>
  )
}