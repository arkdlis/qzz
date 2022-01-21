import { createDto } from "./trivia.utils";
import data from "../exampleTriviaResponse.json";
import { TriviaRoot } from "./trivia";

export class TriviaService {
  getTriviaQuestion() {
    // axios('https://opentdb.com/api.php?amount=10').then((result: AxiosResponse<TriviaRoot>) => {
    //   return result.results.map(createDto);
    // })
    return (data as TriviaRoot).results.map(createDto);
  }
}