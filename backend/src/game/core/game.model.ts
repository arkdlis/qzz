export type Timer = {
  totalTime: number
  elapsedTime: number
}

export type Palette = [string, string]

export type Player = {
  id: number
  name: string
}

export type GameState = {
  roomId: string
  gameType: 'trivia'
  player: Player
  palette: Palette
}