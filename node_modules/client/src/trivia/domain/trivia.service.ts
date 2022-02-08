import { createDto } from "./trivia.utils";
import data from "./exampleTriviaResponse.json";
import { TriviaQuestion, TriviaQuestionWithAnswer, TriviaRoot } from "./trivia";
import { omit } from "lodash";

export class TriviaService {
  private questions: TriviaQuestionWithAnswer[]

  constructor() {
    this.questions = this.getTriviaQuestions()
  }

  private getTriviaQuestions() {
    // axios('https://opentdb.com/api.php?amount=10').then((result: AxiosResponse<TriviaRoot>) => {
    //   return result.results.map(createDto);
    // })
    return (data as TriviaRoot).results.map(createDto)
  }

  getQuestion(index: number): TriviaQuestion {
    return omit(this.questions[index], 'correctAnswer')
  }

  getAnswer(index: number) {
    return this.questions[index].correctAnswer
  }
}