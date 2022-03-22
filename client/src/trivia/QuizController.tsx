import { Question } from "./views/Question"
import { Feedback } from "./views/Feedback";
import { Ranking } from "./views/Ranking";
import { FinalRanking } from "./views/FinalRanking";
import { Player } from "../core/game.model";
import { WaitingRoom } from "./views/WaitingRoom";
import { Timer } from "./components/Timer";
import { EventData } from "xstate";
import { GameEvent } from "../core/trivia.state";

type QuizControllerProps = {
  state: any
  user: Player
  isHost: boolean
  send: (event: GameEvent['type'], value?: EventData) => void
}

export const QuizController = ({
  state, user, isHost, send
}: QuizControllerProps) => {
  return (
    <>
      {state.value === 'waiting_room' &&
        <WaitingRoom
          isHost={isHost}
          players={state.context.players}
          isReady={!!state.context.players[user.id]}
          onReady={() => send('PLAYER_IS_READY', { player: user })}
          onStart={() => send('LETS_START')}
        />
      }
      {state.value === 'question' &&
        <Question
          timer={
            <Timer
              elapsedTime={state.context.elapsed}
              totalTime={state.context.totalTime}
            />
          }
          triviaQuestion={state.context.currentQuestion}
          onSelected={(id) => send('USER_ANSWERED', { answer: id, playerId: user.id })}
          selected={state.context.answers[user.id]}
        />
      }
      {state.value === 'feedback' &&
        <Feedback
          triviaQuestion={state.context.currentQuestion}
          selected={state.context.answers[user.id]}
          correctAnswer={state.context.correctAnswer}
        />
      }
      {state.value === 'ranking' &&
        <Ranking
          user={user}
          players={state.context.players}
          ranking={state.context.ranking}
          onClick={() => send('NEXT_QUESTION')}
        />
      }
      {state.value === 'final_ranking' &&
        <FinalRanking />
      }
    </>
  )
}
