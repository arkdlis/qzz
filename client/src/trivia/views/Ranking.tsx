import { Player } from "../../core/game.model"
import { AnswerButton } from "../components/AnswerButton"
import css from "./Ranking.module.scss"

export type RankingProps = {
  user: Player
  players: { [key: Player['id']]: Player }
  ranking: { [key: Player['id']]: number }
  onClick: () => void
}

export const Ranking = ({
  user,
  players,
  ranking,
  onClick
}: RankingProps) => {
  return (
    <div>
      <div>
        {Object.entries(ranking).map(([playerId, points]) => (
          <div key={playerId}>
            {
              +playerId === user.id
              ? <b>{players[+playerId].name}: {points}</b>
              : <span>{players[+playerId].name}: {points}</span>
            }
          </div>
        ))}
      </div>
      <div>
        <AnswerButton
          text="OK"
          selected={false}
          onClick={onClick}
        />
      </div>
    </div>
  )
}