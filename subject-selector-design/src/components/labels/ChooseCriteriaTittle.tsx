import React, { FC } from "react";
import { Typography } from "../typography/Typography";

export interface ChooseCriteriaTittleProps {
  open: boolean;
  toggleOpen: () => void;
}

export const ChooseCriteriaTittle: FC<ChooseCriteriaTittleProps> = () => (
  <div className="choose-criteria-label">
    <Typography
      variant="h6"
      customWeight="medium"
      className="select-none text-black_231_f_20 font-FrutigerLTW01"
    >
      Choose 1 or more criteria to start your search
    </Typography>
  </div>
);
