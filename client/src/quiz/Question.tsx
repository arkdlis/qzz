import { Answer } from "./Answer"
import { TriviaQuestion } from "./useTriviaApi"

import css from "./Question.module.scss"
import { Timer } from "./Timer"
import { useState, useEffect } from "react";

// ile sekund
const totalTime = 20;

export type QuestionProps = {
  triviaQuestion: TriviaQuestion
  selected: number | undefined
  onSelected: (index: number) => void
}

export const Question = ({ triviaQuestion, selected, onSelected }: QuestionProps) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
    }, 1000)
  }, [])
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