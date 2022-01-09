import { Question } from "./Question"
import { useTriviaApi } from "./useTriviaApi"

// export type QuizControllerProps = {
  
// }

export const QuizController = () => {
  const [questions] = useTriviaApi()
  return (
    questions?.length
    ? <Question triviaQuestion={questions[0]}></Question>
    : <div>Loading...</div>
  )
}