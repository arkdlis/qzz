import { assign, createMachine } from 'xstate';
import { Player } from '../../core/game.model';
import { TriviaQuestion } from '../domain/trivia';
import { TriviaService } from '../domain/trivia.service';
import { timerMachine } from './timer.xstate';

type GameEvent =
  | { type: 'PLAYER_IS_READY', player: Player }
  | { type: 'LETS_START' }
  | { type: 'USER_ANSWERED', answer: number, playerId: string }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'NEXT_QUESTION' }

type GameTypestate = 
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
  players: { [key: Player['id']]: Player }
  totalTime: number
  questionNumber: number
  numberOfQuestions: number
  currentQuestion?: TriviaQuestion
  answers: { [key: Player['id']]: number }
  ranking: { [key: Player['id']]: number }
  correctAnswer?: number
  elapsed?: number
}

const service = new TriviaService();

export const gameMachine = createMachine<GameContext, GameEvent, GameTypestate>({
  id: 'game',
  initial: 'waiting_room',
  context: {
    players: {},
    answers: {},
    ranking: {},
    questionNumber: 0,
    numberOfQuestions: 10,
    totalTime: 10
  },
  states: {
    waiting_room: { on: {
      PLAYER_IS_READY: {
        target: 'waiting_room',
        cond: ({players}, {player}) => !players[player.id],
        actions: assign({ players: (context, {player}) => ({...context.players, [player.id]: player}) })
      },
      LETS_START: 'question', // this should be called only by host
    } },
    question: {
      entry: assign({
        answers: (context) => ({}),
        elapsed: (context) => 0,
        currentQuestion: (context) => service.getQuestion(context.questionNumber)
      }),
      invoke: {
        id: 'timer',
        src: 'timer',
        data: (context, event) => ({ duration: context.totalTime }),
        onDone: 'feedback'
      },
      on: {
      USER_ANSWERED: {
        cond: ({players}, {playerId}) => !!players[playerId],
        actions: assign({ answers: (context, {playerId, answer}) => ({...context.answers, [playerId]: answer}) })
      }
    } },
    feedback: {
      entry: assign({
        correctAnswer: (context) => service.getAnswer(context.questionNumber)
      }),
      invoke: {
        src: 'timer',
        data: (context, event) => ({ duration: 2 }),
        onDone: 'ranking'
      },
      exit: assign({
        ranking: (context) => {
          const rankingChanges = Object.entries(context.answers).reduce<{ [key: Player['id']]: number }>((acc, [userId, answer]) => {
            const totalPoints = context.ranking[userId] || 0
            const assignedPoints = answer == context.correctAnswer ? 10 : 0
            return { ...acc, [userId]: totalPoints + assignedPoints }
          }, {})
          return {...context.ranking, ...rankingChanges}
        }
      }),
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
