import classNames from "classnames"
import css from "./AnswerButton.module.scss"

export type AnswerButtonProps = {
  text: string
  selected: boolean
  onClick?: () => void
  icon?: string
}

export const AnswerButton = ({text, selected, icon, onClick = () => {}}: AnswerButtonProps) => {
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
      { icon && <div className={css.icon}>{icon}</div> }
    </div>
  )
}