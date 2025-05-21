import React, { ChangeEvent, memo } from "react";
import * as cls from "./Select.module.scss";

export interface Option {
    value: number;
    text: number;
}

interface SelectProps {
    options: Option[];
    onChange: (args: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = memo(({ options, onChange }: SelectProps) => {
  return (
    <select onChange={onChange} className={cls.Select}>
      {options.map(({ value, text }: Option) => <option value={value}>{text}</option>)}
    </select>
  )
});

