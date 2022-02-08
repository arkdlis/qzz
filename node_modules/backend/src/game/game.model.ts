import { TriviaConfig, TriviaQuestion, Answer } from "./trivia/trivia.model"

export type Timer = {
  totalTime: number
  elapsedTime: number
}

export type Palette = [string, string]

export type Player = {
  id: string
  username: string
}

export type GameState = {
  roomId: string
  gameType: 'trivia'
  player: Player
  palette: Palette
}

// state

type TriviaConfigState = {
  quizConfig: TriviaConfig
}

export type QuestionState = GameState & TriviaConfigState & {
  type: "question"
  currentQuestionNumber: number
  currentQuestion: TriviaQuestion
  time: Timer
  selectedAnswer: Answer["order"] | null
}

export type FeedbackState = GameState & TriviaConfigState & {
  type: "feedback"
  currentQuestionNumber: number
  currentQuestion: TriviaQuestion
  selectedAnswer: Answer["order"] | null
  correctAnswer: Answer["order"]
}

export type RankingState = GameState & TriviaConfigState & {
  type: "ranking"
  ranks: {
    id: string
    username: string
    score: number
  }[]
  prevRanks: {
    id: string
    username: string
    score: number
  }[]
}