
import { Player } from "../../core/game.model"
import { AnswerButton } from "../components/AnswerButton"

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
    <div>
      <div>
        Waiting on other players...
      </div>
      <div>
        { Object.values(players).map((player, index) => (
          <span key={index}>{player.name}</span>
        )) }
      </div>
      <div>
        {!isReady && 
          <AnswerButton
            text="I'm ready"
            selected={false}
            onClick={onReady}
          />
        }
      </div>
      {isHost && <div>
        <AnswerButton
          text="That's everyone. Let's start!"
          selected={false}
          onClick={onStart}
        />
      </div>}
    </div>
  )
}