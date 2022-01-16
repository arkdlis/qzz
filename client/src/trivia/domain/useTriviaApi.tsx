// import axios, { AxiosResponse } from "axios"
import { omit } from "lodash"
import { useEffect, useState } from "react"
import data from "../exampleTriviaResponse.json"
import { TriviaQuestion, Answer } from "./trivia"

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


export const useTriviaApi = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([])
  useEffect(() => {
    // axios('https://opentdb.com/api.php?amount=10').then((result: AxiosResponse<TriviaRoot>) => {
    //   console.log(result)
    //   setQuestions(result.data.results)
    // })
    setQuestions(data.results.map(createDto))
  }, [])
  return [questions]
}

// ** UTILS **

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

function createDto(triviaQuestion: TriviaResult): TriviaQuestion {
  const answers = getAnswers(triviaQuestion)
  return {
    ...omit(triviaQuestion, 'correct_answer', 'incorrect_answers'),
    answers: answers
  }
}