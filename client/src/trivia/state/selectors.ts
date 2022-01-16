import { TriviaSliceState } from "./slice";

// Other code such as selectors can use the imported `RootState` type
export const selectElapsedTime = (state: TriviaSliceState) => state.trivia.time.elapsedTime
