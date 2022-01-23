import { AnswerButton } from "../components/AnswerButton"
import css from "./Ranking.module.scss"

export type RankingProps = {
  onClick: () => void
}

export const Ranking = ({
  onClick
}: RankingProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        ...is leading the competition!
      </div>
      <div className={css.answersContainer}>
        <AnswerButton
          text="ACK"
          selected={false}
          onClick={onClick}
        />
      </div>
    </div>
  )
}