import { assign, createMachine } from 'xstate';
import { Player } from '../../core/game.model';
import { TriviaQuestion } from '../domain/trivia';
import { TriviaService } from '../domain/trivia.service';
import { timerMachine } from './timer.xstate';

type GameEvent =
  | { type: 'PLAYER_IS_READY', player: Player }
  | { type: 'LETS_START' }
  | { type: 'USER_ANSWERED', answer: number, playerId: string }
  | { type: 'TIMER_UPDATED', elapsed: number }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'NEXT_QUESTION' }

type GameTypestate = 
  | { value: 'onboarding', context: GameContext }
  | { value: 'waiting_room', context: GameContext }
  | { value: 'question', context: GameContext & {
    currentQuestion: TriviaQuestion
    elapsed: number
  } }
  | { value: 'feedback', context: GameContext & {
    currentQuestion: TriviaQuestion
    correctAnswer: number
  } }
  | { value: 'ranking', context: GameContext }
  | { value: 'final_ranking', context: GameContext }

type GameContext = {
  players: Player[]
  totalTime: number
  questionNumber: number
  numberOfQuestions: number
  currentQuestion?: TriviaQuestion
  answers: { [key: string]: number }
  correctAnswer?: number
  elapsed?: number
}

const service = new TriviaService();

export const gameMachine = createMachine<GameContext, GameEvent, GameTypestate>({
  id: 'game',
  initial: 'onboarding',
  context: {
    players: [
      // {id: '0', name: 'FakePlayer0'},
      // {id: '1', name: 'FakePlayer1'},
      // {id: '2', name: 'FakePlayer2'},
      // {id: '3', name: 'FakePlayer3'},
      // {id: '4', name: 'FakePlayer4'},
    ],
    answers: {},
    questionNumber: 0,
    numberOfQuestions: 10,
    totalTime: 10
  },
  states: {
    onboarding: { on: {
      PLAYER_IS_READY: {
        target: 'waiting_room',
        actions: assign({ players: (context, event) => [...context.players, event.player] })
      },
    } },
    waiting_room: { on: {
      LETS_START: 'question', // this will be called only by host
    } },
    question: {
      entry: assign({
        answers: (context) => ({}),
        elapsed: (context) => 0,
        currentQuestion: (context) => service.getQuestion(context.questionNumber)
      }),
      invoke: {
        src: 'timer',
        data: (context, event) => ({ duration: context.totalTime }),
        onDone: 'feedback'
      },
      on: {
      USER_ANSWERED: {
        actions: assign({ answers: (context, {playerId, answer}) => ({...context.answers, [playerId]: answer}) })
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
        src: 'timer',
        data: (context, event) => ({ duration: 2 }),
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
}, {
  services: {
    timer: timerMachine
  }
});
