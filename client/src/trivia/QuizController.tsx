import { Question } from "./views/Question"
import { gameMachine } from "./xstate/quiz.xstate";
import { useActor, useMachine } from '@xstate/react';
import { Feedback } from "./views/Feedback";
import { Ranking } from "./views/Ranking";
import { FinalRanking } from "./views/FinalRanking";
import { useState } from "react";
import { Player } from "../core/game.model";
import { WaitingRoom } from "./views/WaitingRoom";

export const QuizController = () => {
  const [user] = useState<Player>({
    id: 'X',
    name: 'PlayerOne'
  })
  const [isHost] = useState(true)
  const [state, send] = useMachine(gameMachine, { devTools: true })

  return (
    <>
      {state.matches('waiting_room') &&
        <WaitingRoom
          isHost={isHost}
          players={state.context.players}
          onReady={() => send('PLAYER_IS_READY', { player: user })}
          onStart={() => send('LETS_START')}
        />
      }
      {state.matches('question') &&
        <WithActorState actor={state.children.timer}>
          {(childState: any) => (
            <Question
              triviaQuestion={state.context.currentQuestion}
              onSelected={(id) => send('USER_ANSWERED', { answer: id, playerId: user.id })}
              elapsedTime={Math.floor(childState.context.elapsed || 0)}
              totalTime={childState.context.duration}
              selected={state.context.answers[user.id]}
            />
          )}
        </WithActorState>
      }
      {state.matches('feedback') &&
        <Feedback
          triviaQuestion={state.context.currentQuestion}
          selected={state.context.answers[user.id]}
          correctAnswer={state.context.correctAnswer}
        />
      }
      {state.matches('ranking') &&
        <Ranking
          onClick={() => send('NEXT_QUESTION')}
        />
      }
      {state.matches('final_ranking') &&
        <FinalRanking />
      }

      <div>state:{state.value}</div>
      <div>context:{JSON.stringify(state.context)}</div>
    </>
  )
}

const WithActorState = ({actor, children}: any) => {
  const [childState] = useActor(actor);
  return (
    children(childState)
  )
}