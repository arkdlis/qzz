import { createMachine, interpret } from 'xstate';

const gameMachine = createMachine({
  id: 'game',
  initial: 'idle',
  states: {
    idle: { on: { PLAYERS_READY: 'question' } },
    question: { on: { QUESTION_TIMEOUT: 'feedback' } },
    feedback: { on: {
      FEEDBACK_READY: 'ranking',
      LAST_QUESTION: 'final_ranking',
    } },
    ranking: { on: { PLAYERS_READY: 'question' } },
    final_ranking: { on: { PLAYERS_READY: 'question' } },
  }
});

// Machine instance with internal state
// const gameStateService = interpret(gameMachine)
//   .onTransition((state) => console.log(state.value))
//   .start();

// gameStateService.send('TOGGLE');
// gameStateService.send('TOGGLE');
