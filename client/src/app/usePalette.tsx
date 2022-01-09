
import { useState } from 'react';
import { colors } from './colors';

function eitherWithChance<T>(chance: number, a: T, b: T) {
  return Math.random() < chance ? a : b
}

function pickRandomPalette() {
  const randomIndex = Math.floor(Math.random()*colors.length)
  const [a, b] = colors[randomIndex]
  return eitherWithChance<[string, string]>(0.5, [a, b], [b, a])
}

export const usePalette = () => {
  const [palette, setPalette] = useState(pickRandomPalette())
  const randomizePalette = () => {
    setPalette(pickRandomPalette())
  }
  return [palette, randomizePalette] as const
}