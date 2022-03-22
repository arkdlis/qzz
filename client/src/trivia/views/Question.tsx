import { ReactElement } from "react"

import { AnswerButton } from "../components/AnswerButton"

import { Stack } from "@mui/material"
import { TriviaQuestion } from "../../core/trivia.state"

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
    <div >
      <div>{timer}</div>
      <div dangerouslySetInnerHTML={{ __html: triviaQuestion.question }}/>
      <Stack spacing={2}>
        {triviaQuestion.answers.map((answer, idx) => (
          <AnswerButton
            key={idx}
            text={answer.text}
            selected={answer.order === selected}
            onClick={() => onSelected(answer.order)}
          />
        ))}
      </Stack>
    </div>
  )
}