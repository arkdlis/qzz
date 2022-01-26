import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionState } from '../domain/trivia'

export const triviaSliceKey = 'trivia'

// Define a type for the slice state
export type TriviaGameState = QuestionState

// Define the initial state using that type
const initialState: TriviaGameState = {
  // GameState
  roomId: '1',
  gameType: 'trivia',
  player: {
    id: '1',
    name: 'PlayerOne'
  },
  palette: ['#00203F', '#ADEFD1'],

  // Config
  quizConfig: {
    mode: 'classic',
    numberOfQuestions: 10,
    totalTime: 20,
    allowChangingAnswer: true,
  },

  // QuestionState
  type: "question",
  currentQuestionNumber: 1,
  currentQuestion: {
    category: 'Entertainment: Television',
    type: "multiple",
    difficulty: "easy",
    question: "Who is the star of the AMC series Breaking Bad?",
    answers: [
      { order: 0, text: "Walter White" },
      { order: 1, text: "Walt Whitman" },
      { order: 2, text: "Willie Wonka" },
      { order: 3, text: "Wonder Woman" },
    ]
  },
  time: {
    elapsedTime: 0,
    totalTime: 20,
  },
  selectedAnswer: null,

}

export const triviaSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    selectAnswer: (state, action: PayloadAction<number>) => {
      state.selectedAnswer = action.payload
    },
    setElapsedTime: (state, action: PayloadAction<number>) => {
      state.time.elapsedTime = action.payload
    },
  },
})

export const { selectAnswer, setElapsedTime } = triviaSlice.actions

export const triviaReducer = triviaSlice.reducer

export type TriviaSliceState = { [triviaSliceKey]: TriviaGameState }