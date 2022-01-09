import classNames from "classnames"
import css from "./Answer.module.scss"

export type AnswerProps = {
  text: string
  selected: boolean
}

export const Answer = ({text, selected}: AnswerProps) => {
  return (
    <div className={classNames({
      [css.button]: true,
      [css.selected]: selected
    })}>
      <div className={css.text}>
        {text}
      </div>
    </div>
  )
}