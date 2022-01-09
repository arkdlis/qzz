import { Answer } from "./Answer"
import { TriviaQuestion } from "./useTriviaApi"

import css from "./Question.module.scss"

export type QuestionProps = {
  triviaQuestion: TriviaQuestion
  selected: number | undefined
  onSelected: (index: number) => void
}

export const Question = ({ triviaQuestion, selected, onSelected }: QuestionProps) => {
  return (
    <div className={css.questionContainer}>
      <div
        className={css.question}
        dangerouslySetInnerHTML={{__html: triviaQuestion.question}}
      ></div>
      <div className={css.answersContainer}>
        {triviaQuestion.answers.map((answer, idx) => (
          <Answer
            key={idx}
            text={answer.text}
            selected={answer.order === selected}
            onClick={() => onSelected(answer.order)}
          ></Answer>
        ))}
      </div>
    </div>
  )
}