
import { AnswerButton } from "../components/AnswerButton"
import { TriviaQuestion } from "../domain/trivia"
import css from "./Feedback.module.scss"

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
    <div className={css.container}>
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
            icon={isSelected(answer.order, selected, correctAnswer)}
          />
        ))}
      </div>
    </div>
  )
}