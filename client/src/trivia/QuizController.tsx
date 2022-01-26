import { Question } from "./views/Question"
import { gameMachine } from "./xstate/quiz.xstate";
import { useMachine } from '@xstate/react';
import { Onboarding } from "./views/Onboarding";
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
  const [state, send] = useMachine(gameMachine)

  return (
    <>
      {state.matches('onboarding') &&
        <Onboarding
          onReady={() => send('PLAYER_IS_READY', { player: user })}
        />
      }
      {state.matches('waiting_room') &&
        <WaitingRoom
          isHost={isHost}
          players={state.context.players}
          onStart={() => send('LETS_START')}
        />
      }
      {state.matches('question') &&
        <Question
          triviaQuestion={state.context.currentQuestion}
          onSelected={(id) => send('USER_ANSWERED', { answer: id, playerId: user.id })}
          elapsedTime={Math.floor(state.context.elapsed || 0)}
          totalTime={state.context.totalTime}
          selected={state.context.answers[user.id]}
        />
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