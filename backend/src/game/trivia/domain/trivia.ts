import { GameState, Timer } from "../../core/game.model"

// Code 0: Success Returned results successfully.
// Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
// Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
// Code 3: Token Not Found Session Token does not exist.
// Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
export interface TriviaRoot {
  response_code: number
  results: TriviaResult[]
}

export interface TriviaResult {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

// used as DTO: Backend -> Client
export type TriviaQuestionWithAnswer = {
  category: string
  type: string
  difficulty: string
  question: string
  answers: Answer[]
  correctAnswer: number
}
export type TriviaQuestion = Omit<TriviaQuestionWithAnswer, 'correctAnswer'>

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