import React, { ChangeEvent, memo } from "react";
import * as cls from "./SelectOffset.module.scss";
import { Select } from "@shared/ui/Select/Select";
import { OFFSET_OPTIONS } from "./const/offsetSelectOptions";

interface SelectOffsetProps {
    onChange: (args: ChangeEvent<HTMLSelectElement>) => void;
}

const TITLE = 'Offset';

export const SelectOffset = memo(({ onChange }: SelectOffsetProps) => {
  return (
    <div className={cls.SelectOffset}>
        <span className={cls.title}>{TITLE}</span>
        <Select onChange={onChange} options={OFFSET_OPTIONS} />
    </div>
  )
});

