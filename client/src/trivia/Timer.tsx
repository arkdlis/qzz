import css from './Timer.module.scss';

export type TimerProps = {
  totalTime: number;
  elapsedTime: number;
}

function clamp(x: number) {
  return x > 0 ? x : 0
}

export const Timer = ({totalTime, elapsedTime}: TimerProps) => {
  const width = clamp(100 - 100*elapsedTime/(totalTime-1))
  return (
    <div className={css.timer} style={{ width: `${width}vw` }}></div>
  )
}