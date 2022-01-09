// import axios, { AxiosResponse } from "axios"
import { omit } from "lodash"
import { useEffect, useState } from "react"
import data from "./exampleTriviaResponse.json"

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

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

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