import React, { memo } from "react";
import * as cls from "./Button.module.scss";

export enum ButtonTheme {
    PRIMARY = 'primary',
    SECONDARY ='secondary',
    CLEAR = 'clear',
}

interface ButtonProps {
    theme?: ButtonTheme;  
    text: string;
    selected?: boolean;
}

export const Button = memo(({ theme=ButtonTheme.PRIMARY, text, selected=false }: ButtonProps) => {
  return (
    <button type="button" className={`${cls.Button} ${cls[theme]} ${selected ? cls.selected : ''}`}>
      {text}
    </button>
  )
});

