
import { Answer } from "../components/Answer"
import css from "./Onboarding.module.scss"

export type OnboardingProps = {
  onClick: () => void
}

export const Onboarding = ({
  onClick
}: OnboardingProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        Are you ready?
      </div>
      <div className={css.answersContainer}>
        <Answer
          text="Bring it on!"
          selected={false}
          onClick={onClick}
        />
      </div>
    </div>
  )
}