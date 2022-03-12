
import { Player } from "../../core/game.model"
import { AnswerButton } from "../components/AnswerButton"
import css from "./WaitingRoom.module.scss"

export type WaitingRoomProps = {
  players: { [key: string]: Player }
  isReady: boolean
  isHost: boolean
  onStart: () => void
  onReady: () => void
}

export const WaitingRoom = ({
  onStart, onReady, isReady, isHost, players
}: WaitingRoomProps) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        Waiting on other players...
      </div>
      <div>
        { Object.values(players).map((player, index) => (
          <span className={css.playerTag} key={index}>{player.name}</span>
        )) }
      </div>
      <div className={css.answersContainer}>
        {!isReady && 
          <AnswerButton
            text="I'm ready"
            selected={false}
            onClick={onReady}
          />
        }
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