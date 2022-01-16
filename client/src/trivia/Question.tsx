import { Answer } from "./Answer"
import { TriviaQuestion } from "./domain/trivia"

import css from "./Question.module.scss"
import { Timer } from "./Timer"

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
            <Answer
              key={idx}
              text={answer.text}
              selected={answer.order === selected}
              onClick={() => onSelected(answer.order)}
            ></Answer>
          ))}
        </div>
      </div>
      <Timer totalTime={totalTime} elapsedTime={elapsedTime}/>
    </div>
  )
}