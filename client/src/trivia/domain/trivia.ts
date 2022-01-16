import { GameState, Timer } from "../../core/game.model"

// used as DTO: Backend -> Client
export interface TriviaQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  answers: Answer[]
}

export type Answer = {
  order: number // 0,1,2,3
  text: string
}

export type TriviaConfig = {
  mode: 'classic'
  numberOfQuestions: number // max 50
  totalTime: number // default 20
  allowChangingAnswer: boolean // default true
  category?: string
  difficulty?: string
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