
import { Answer } from "../components/Answer"
import css from "./Feedback.module.scss"

export type FeedbackProps = {
  onClick: () => void
}

export const Feedback = ({
  onClick
}: FeedbackProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        Your answer is... CORRECT!
      </div>
      <div className={css.answersContainer}>
        <Answer
          text="Coolio!"
          selected={false}
          onClick={onClick}
        />
      </div>
    </div>
  )
}