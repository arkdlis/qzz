import { Player } from "../../core/game.model"
import { AnswerButton } from "../components/AnswerButton"
import css from "./Ranking.module.scss"

export type RankingProps = {
  user: Player
  ranking: { [key: string]: number }
  onClick: () => void
}

export const Ranking = ({
  user,
  ranking,
  onClick
}: RankingProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        PlayerOne is leading the competition with {ranking[user.id]} points!
      </div>
      <div className={css.answersContainer}>
        <AnswerButton
          text="OK"
          selected={false}
          onClick={onClick}
        />
      </div>
    </div>
  )
}