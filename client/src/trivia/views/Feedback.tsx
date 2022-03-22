import { TriviaQuestion } from "../../core/trivia.state"
import { AnswerButton } from "../components/AnswerButton"

export type FeedbackProps = {
  triviaQuestion: TriviaQuestion
  selected: number | undefined
  correctAnswer: number
}

export const Feedback = ({
  triviaQuestion,
  selected,
  correctAnswer,
}: FeedbackProps) => {
  const isSelected = (answerOrder: number, selected: number | undefined, correctAnswer: number) => {
    if (answerOrder === correctAnswer) return '✓'
    if (answerOrder === selected) return '🗴'
    return undefined
  }
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: triviaQuestion.question }}/>
      <div>
        {triviaQuestion.answers.map((answer, idx) => (
          <AnswerButton
            key={idx}
            text={answer.text}
            selected={answer.order === selected}
            icon={isSelected(answer.order, selected, correctAnswer)}
          />
        ))}
      </div>
    </div>
  )
}