import { Answer } from "../components/Answer"
import css from "./FinalRanking.module.scss"

export type FinalRankingProps = {
  onClick: () => void
}

export const FinalRanking = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        And... the winner is...!
      </div>
      {/* <div className={css.answersContainer}>
        <Answer
          text="Coolio!"
          selected={false}
          onClick={onClick}
        />
      </div> */}
    </div>
  )
}