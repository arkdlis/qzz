import { assign, createMachine } from 'xstate';
import { TriviaQuestion } from '../domain/trivia';
import { TriviaService } from '../domain/trivia.service';
import { timerMachine } from './timer.xstate';

type GameEvent =
  | { type: 'PLAYERS_READY' }
  | { type: 'USER_ANSWERED', answer: number }
  | { type: 'TIMER_UPDATED', elapsed: number }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'NEXT_QUESTION' }

type GameTypestate = 
  | { value: 'idle', context: GameContext }
  | { value: 'question', context: GameContext & {
    currentQuestion: TriviaQuestion
    answer: number
    elapsed: number
  } }
  | { value: 'feedback', context: GameContext & {
    currentQuestion: TriviaQuestion
    answer: number
    correctAnswer: number
  } }
  | { value: 'ranking', context: GameContext }
  | { value: 'final_ranking', context: GameContext }

type GameContext = {
  totalTime: number
  questionNumber: number
  numberOfQuestions: number
  currentQuestion?: TriviaQuestion
  answer?: number
  correctAnswer?: number
  elapsed?: number
}

const service = new TriviaService();

export const gameMachine = createMachine<GameContext, GameEvent, GameTypestate>({
  id: 'game',
  initial: 'idle',
  context: {
    questionNumber: 0,
    numberOfQuestions: 10,
    totalTime: 10
  },
  states: {
    idle: { on: {
      PLAYERS_READY: 'question'
    } },
    question: {
      entry: assign({
        answer: (context) => undefined,
        elapsed: (context) => 0,
        currentQuestion: (context) => service.getQuestion(context.questionNumber)
      }),
      invoke: {
        src: timerMachine,
        data: (context, event) => ({ duration: context.totalTime }),
        onDone: 'feedback'
      },
      on: {
      USER_ANSWERED: {
        actions: assign({ answer: (context, event) => event.answer })
      },
      TIMER_UPDATED: {
        actions: assign({ elapsed: (context, event) => event.elapsed })
      },
    } },
    feedback: {
      entry: assign({
        correctAnswer: (context) => service.getAnswer(context.questionNumber)
      }),
      invoke: {
        src: timerMachine,
        data: (context, event) => ({ duration: 3 }),
        onDone: 'ranking'
      }
    },
    ranking: { on: { 
      NEXT_QUESTION: [{
        cond: ({questionNumber, numberOfQuestions}) => questionNumber + 1 !== numberOfQuestions,
        target: 'question',
        actions: assign({ questionNumber: context => context.questionNumber + 1 }),
      }, {
        cond: ({questionNumber, numberOfQuestions}) => questionNumber + 1 === numberOfQuestions,
        target: 'final_ranking',
      }],
    } },
    final_ranking: { type: 'final' },
  }
});
