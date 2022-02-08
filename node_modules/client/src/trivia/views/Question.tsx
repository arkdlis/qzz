import { TriviaQuestion } from "../domain/trivia"

import { AnswerButton } from "../components/AnswerButton"
import { Timer } from "../components/Timer"

import css from "./Question.module.scss"

export type QuestionProps = {
  triviaQuestion: TriviaQuestion
  elapsedTime: number
  totalTime: number
  selected: number | undefined
  onSelected: (index: number) => void
}

export const Question = ({
  triviaQuestion,
  elapsedTime,
  totalTime,
  selected,
  onSelected
}: QuestionProps) => {
  return (
    <div className={css.container}>
      <Timer totalTime={totalTime} elapsedTime={elapsedTime}/>
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
      <Timer totalTime={totalTime} elapsedTime={elapsedTime}/>
    </div>
  )
}