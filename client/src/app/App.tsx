import { gameMachine } from '../core/xstate/connection.xstate';
import { QuizController } from '../trivia/QuizController';
import { useMachine } from '@xstate/react';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { GameEvent } from '../core/trivia.state';
import { EventData } from 'xstate';

function App() {
  const [state, send] = useMachine(gameMachine, { devTools: true })

  const sendToServer = useCallback((event: GameEvent['type'], value?: EventData) => {
    send({
      type: 'SEND_MESSAGE',
      message: event,
      value: value
    })
  }, [send])
  
  return (
    <>
      {!state.context?.gameState && <div>
        <Button onClick={() => send({type: 'JOIN', id: null, gameId: 1})}>Join</Button>
        <Button onClick={() => send('HOST')}>Host</Button>
      </div>}
      {state.context.gameState && <div>
        <QuizController
          state={state.context.gameState}
          user={{ // TODO: fixup
            id: state.context.gameState.id,
            name: state.context.gameState.name
          }}
          isHost={state.context.isHost!}
          send={sendToServer}
        ></QuizController>
      </div>}
      <div>state:{state.value}</div>
      <div><pre>{JSON.stringify(state.context, null, 2)}</pre></div>
    </>
  );
}

export default App;
