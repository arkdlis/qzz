import classNames from "classnames"
import css from "./Answer.module.scss"

export type AnswerProps = {
  text: string
  selected: boolean
  onClick: () => void
}

export const Answer = ({text, selected, onClick}: AnswerProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames({
        [css.button]: true,
        [css.selected]: selected
      })}
    >
      <div
        className={css.text} 
        dangerouslySetInnerHTML={{__html: text}}
      ></div>
    </div>
  )
}