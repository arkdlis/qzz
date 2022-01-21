import { omit } from "lodash";
import { Answer, TriviaQuestion, TriviaResult } from "./trivia";

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getAnswers(triviaQuestion: TriviaResult) {
  const all = [
    triviaQuestion.correct_answer,
    ...triviaQuestion.incorrect_answers
  ]
  return shuffle(all).reduce<Answer[]>((acc, cur, index) => {
    acc.push({
      order: index,
      text: cur
    })
    return acc
  }, [])
}

export function createDto(triviaQuestion: TriviaResult): TriviaQuestion {
  const answers = getAnswers(triviaQuestion)
  return {
    ...omit(triviaQuestion, 'correct_answer', 'incorrect_answers'),
    answers: answers
  }
}