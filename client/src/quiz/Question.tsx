import { Answer } from "./Answer"
import { TriviaQuestion } from "./useTriviaApi"

import css from "./Question.module.scss"

export type QuestionProps = {
  triviaQuestion: TriviaQuestion
}

export const Question = ({ triviaQuestion }: QuestionProps) => {
  return (
    <div className={css.questionContainer}>
      <div className={css.question}>
        {triviaQuestion.question}
      </div>
      <div className={css.answersContainer}>
        {triviaQuestion.answers.map(answer => (
          <Answer text={answer.text} selected={answer.order === 1}></Answer>
        ))}
      </div>
    </div>
  )
}