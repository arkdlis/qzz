import { Question } from "./views/Question"
import { Feedback } from "./views/Feedback";
import { Ranking } from "./views/Ranking";
import { FinalRanking } from "./views/FinalRanking";
import { useCallback, useEffect, useState } from "react";
import { Player } from "../core/game.model";
import { WaitingRoom } from "./views/WaitingRoom";
import { Timer } from "./components/Timer";
import { useSocket } from "../core/useSocket";

export const QuizController = () => {
  const [user, setUser] = useState<Player>({
    id: 0,
    name: 'PlayerOne'
  })
  const [isHost] = useState(true)
  
  const [state, setState] = useState<any>();
  const callback = useCallback((message: any) => {
    console.log(message)
    // TODO: call it only once and save userId to localStorage
    if (!user.id) {
      setUser({
        id: message.id,
        name: message.name
      })
    }
    setState(message);
  }, [])
  const [socket, send] = useSocket(callback)

  // this is ugly :/
  useEffect(() => {
    console.log('subscribe')
    send('sub')
  }, [send])

  return (
    socket && state ? (<>
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
              elapsedTime={0}
              totalTime={1}
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
          ranking={state.context.ranking}
          onClick={() => send('NEXT_QUESTION')}
        />
      }
      {state.value === 'final_ranking' &&
        <FinalRanking />
      }

      <div>state:{state.value}</div>
      <div>context:{JSON.stringify(state.context)}</div>
    </>) : <div>Loading</div>
  )
}
