import { Player } from "./game.model"

export type Answer = {
  order: number // 0,1,2,3
  text: string
}

export type TriviaQuestion = {
  category: string
  type: string
  difficulty: string
  question: string
  answers: Answer[]
}

export type GameEvent =
  | { type: 'PLAYER_IS_READY', player: Player }
  | { type: 'LETS_START' }
  | { type: 'USER_ANSWERED', answer: number, playerId: string }
  | { type: 'TIMER_UPDATED', elapsed: number }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'NEXT_QUESTION' }

export type GameTypestate = 
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

export type GameContext = {
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

export type GameState = GameTypestate & {
  id: number
  name: string
  gameId: number
}