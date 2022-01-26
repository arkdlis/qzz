
import { Player } from "../../core/game.model"
import { AnswerButton } from "../components/AnswerButton"
import css from "./WaitingRoom.module.scss"

export type WaitingRoomProps = {
  players: Player[]
  isHost: boolean
  onStart: () => void
}

export const WaitingRoom = ({
  onStart, isHost, players
}: WaitingRoomProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        Waiting on other players...
      </div>
      <div>
        { players.map((player, index) => (
          <span className={css.playerTag} key={index}>{player.name}</span>
        )) }
      </div>
      {isHost && <div className={css.answersContainer}>
        <AnswerButton
          text="That's everyone. Let's start!"
          selected={false}
          onClick={onStart}
        />
      </div>}
    </div>
  )
}