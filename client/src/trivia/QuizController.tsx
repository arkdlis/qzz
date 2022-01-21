import { Question } from "./Question"
import { gameMachine } from "./xstate/quiz.xstate";
import { useMachine } from '@xstate/react';

export const QuizController = () => {
  const [state, send] = useMachine(gameMachine)
  
  return (
    <>
      <div>state:{state.value}</div>
      <div>state:{JSON.stringify(state.context)}</div>
      
      {state.matches('idle') &&
        <>
          <div>Are you ready?</div>
          <button onClick={() => send('PLAYERS_READY')}>I'm ready</button>
        </>
      }
      {state.matches('question') &&
        <Question
          triviaQuestion={state.context.currentQuestion}
          onSelected={(id) => send('USER_ANSWERED', { answer: id })}
          elapsedTime={Math.floor(state.context.elapsed || 0)}
          totalTime={state.context.totalTime}
          selected={state.context.answer}
        ></Question>
      }
      {state.matches('feedback') &&
        <>
          <div>Your answer is... CORRECT!</div>
          <button onClick={() => send('FEEDBACK_TIMEOUT')}>Ok... Let's see who is winning</button>
        </>
      }
      {state.matches('ranking') &&
        <>
          <div>...is leading the competition!</div>
          <button onClick={() => send('NEXT_QUESTION')}>Let's go to another round</button>
        </>
      }
      {state.matches('final_ranking') &&
        <>
          <div>And... the winner is...!</div>
        </>
      }
    </>
  )
}