
import { AnswerButton } from "../components/AnswerButton"
import css from "./Onboarding.module.scss"

export type OnboardingProps = {
  onReady: () => void
}

export const Onboarding = ({
  onReady
}: OnboardingProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        Are you ready?
      </div>
      <div className={css.answersContainer}>
        <AnswerButton
          text="I'm ready"
          selected={false}
          onClick={onReady}
        />
      </div>
    </div>
  )
}