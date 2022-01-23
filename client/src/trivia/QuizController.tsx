import { Question } from "./views/Question"
import { gameMachine } from "./xstate/quiz.xstate";
import { useMachine } from '@xstate/react';
import { Onboarding } from "./views/Onboarding";
import { Feedback } from "./views/Feedback";
import { Ranking } from "./views/Ranking";
import { FinalRanking } from "./views/FinalRanking";

export const QuizController = () => {
  const [state, send] = useMachine(gameMachine)

  return (
    <>
      {state.matches('idle') &&
        <Onboarding
          onClick={() => send('PLAYERS_READY')}
        />
      }
      {state.matches('question') &&
        <Question
          triviaQuestion={state.context.currentQuestion}
          onSelected={(id) => send('USER_ANSWERED', { answer: id })}
          elapsedTime={Math.floor(state.context.elapsed || 0)}
          totalTime={state.context.totalTime}
          selected={state.context.answer}
        />
      }
      {state.matches('feedback') &&
        <Feedback
          triviaQuestion={state.context.currentQuestion}
          selected={state.context.answer}
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