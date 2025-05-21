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
    disabled?: boolean;
    onClick: (args?: any) => void;
}

export const Button = memo(({ theme=ButtonTheme.PRIMARY, text, disabled, selected=false, onClick }: ButtonProps) => {
  return (
    <button 
        type="button" 
        disabled={disabled}
        onClick={onClick} 
        className={`${cls.Button} ${cls[theme]} ${selected ? cls.selected : ''}`}>
      {text}
    </button>
  )
});

