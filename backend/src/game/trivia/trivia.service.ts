import { Injectable } from '@nestjs/common';
import { TriviaRoot } from './trivia.model';
import { createDto } from './trivia.utils';
import data from "./exampleTriviaResponse.json";

interface GetTriviaOptions {
  amount: number // max 50
  category?: string
  difficulty?: string
}

const defaultOptions: GetTriviaOptions = {
  amount: 10
};

@Injectable()
export class TriviaService {
  getTriviaQuestion() {
    // axios('https://opentdb.com/api.php?amount=10').then((result: AxiosResponse<TriviaRoot>) => {
    //   return result.results.map(createDto);
    // })
    return (data as TriviaRoot).results.map(createDto);
  }
}
