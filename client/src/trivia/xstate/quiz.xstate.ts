import { assign, createMachine } from 'xstate';
import { timerMachine } from './timer.xstate';

type GameEvent =
  | { type: 'PLAYERS_READY' }
  | { type: 'QUESTION_TIMEOUT' }
  | { type: 'USER_ANSWERED', answer: number }
  | { type: 'TIMER_UPDATED', elapsed: number }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH' }

type GameTypestate = 
  | { value: 'idle', context: {} }
  | { value: 'question', context: { answer: number, elapsed?: number } }
  | { value: 'feedback', context: {} }
  | { value: 'ranking', context: {} }
  | { value: 'final_ranking', context: {} }

type GameContext = {
  answer?: number
  elapsed?: number
}
type GameContext2 = GameTypestate['context']

export const gameMachine = createMachine<GameContext, GameEvent, GameTypestate>({
  id: 'game',
  initial: 'idle',
  context: {},
  states: {
    idle: { on: {
      PLAYERS_READY: 'question'
    } },
    question: {
      entry: assign({
        answer: (context) => undefined,
        elapsed: (context) => 0,
      }),
      invoke: {
        src: timerMachine,
        onDone: 'feedback'
      },
      on: {
      QUESTION_TIMEOUT: 'feedback',
      USER_ANSWERED: {
        actions: assign({ answer: (context, event) => event.answer })
      },
      TIMER_UPDATED: {
        actions: assign({ elapsed: (context, event) => event.elapsed })
      },
    } },
    feedback: { on: {
      FEEDBACK_TIMEOUT: {
        target: 'ranking',
      },
    } },
    ranking: { on: { 
      NEXT_QUESTION: 'question',
      FINISH: 'final_ranking', // NEXT_QUESTION with guard?
    } },
    final_ranking: { type: 'final' },
  }
});

// Machine instance with internal state
// const gameStateService = interpret(gameMachine)
//   .onTransition((state) => console.log(state.value))
//   .start();

// gameStateService.send('TOGGLE');
// gameStateService.send('TOGGLE');
