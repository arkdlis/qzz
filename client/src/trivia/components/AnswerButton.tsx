import { Button } from "@mui/material"
import css from "./AnswerButton.module.scss"

export type AnswerButtonProps = {
  text: string
  selected: boolean
  onClick?: () => void
  icon?: string
}

export const AnswerButton = ({text, selected, icon, onClick = () => {}}: AnswerButtonProps) => {
  return (
    <div style={{ display: "flex" }}>
      <Button onClick={onClick}>
        <span dangerouslySetInnerHTML={{__html: text}}></span>
      </Button>
      {selected ? '<--' : ''}
      { icon && <div className={css.icon}>{icon}</div> }
    </div>
  )
}