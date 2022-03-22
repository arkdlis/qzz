
import { AnswerButton } from "../components/AnswerButton"

export type OnboardingProps = {
  onReady: () => void
}

export const Onboarding = ({
  onReady
}: OnboardingProps) => {
  return (
    <div>
      <div>
        Are you ready?
      </div>
      <div>
        <AnswerButton
          text="I'm ready"
          selected={false}
          onClick={onReady}
        />
      </div>
    </div>
  )
}