import css from './Timer.module.scss';

export type TimerProps = {
  totalTime: number;
  elapsedTime: number;
}

function clamp(x: number, max: number, min = 0) {
  return x > max ? max : (x < min ? min : x)
}

export const Timer = ({totalTime, elapsedTime}: TimerProps) => {
  const width = clamp(100 - 100*elapsedTime/(totalTime-1), 100)
  console.log(width)
  return (
    <div className={css.timer} style={{ width: `${width}%` }}></div>
  )
}