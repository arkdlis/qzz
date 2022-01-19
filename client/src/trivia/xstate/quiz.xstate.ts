import { assign, createMachine } from 'xstate';

type GameEvent =
  | { type: 'PLAYERS_READY' }
  | { type: 'QUESTION_TIMEOUT' }
  | { type: 'USER_ANSWERED', answer: number }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH' }

type GameTypestate = 
  | { value: 'idle', context: {} }
  | { value: 'question', context: { answer: number } }
  | { value: 'feedback', context: {} }
  | { value: 'ranking', context: {} }
  | { value: 'final_ranking', context: {} }

type GameContext = {
  answer?: number
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
    question: { on: {
      QUESTION_TIMEOUT: 'feedback',
      USER_ANSWERED: {
        target: 'question',
        actions: assign({ answer: (context, event) => event.answer })
      },
    } },
    feedback: { on: {
      FEEDBACK_TIMEOUT: 'ranking',
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
