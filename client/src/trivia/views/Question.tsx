import { ReactElement } from "react"
import { TriviaQuestion } from "../domain/trivia"

import { AnswerButton } from "../components/AnswerButton"

import css from "./Question.module.scss"

export type QuestionProps = {
  timer: ReactElement
  triviaQuestion: TriviaQuestion
  selected: number | undefined
  onSelected: (index: number) => void
}

export const Question = ({
  timer,
  triviaQuestion,
  selected,
  onSelected
}: QuestionProps) => {
  return (
    <div className={css.container}>
      {timer}
      <div className={css.questionContainer}>
        <div
          className={css.question}
          dangerouslySetInnerHTML={{ __html: triviaQuestion.question }}
        ></div>
        <div className={css.answersContainer}>
          {triviaQuestion.answers.map((answer, idx) => (
            <AnswerButton
              key={idx}
              text={answer.text}
              selected={answer.order === selected}
              onClick={() => onSelected(answer.order)}
            />
          ))}
        </div>
      </div>
      {timer}
    </div>
  )
}