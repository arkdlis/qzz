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
    </div>
  )
}