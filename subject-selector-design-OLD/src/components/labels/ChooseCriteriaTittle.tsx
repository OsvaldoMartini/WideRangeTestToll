import React, { FC } from "react";
import { Typography } from "../typography/Typography";

export interface ChooseCriteriaTittleProps {
  open: boolean;
  toggleOpen: () => void;
}

export const ChooseCriteriaTittle: FC<ChooseCriteriaTittleProps> = () => (
  <div className="choose-criteria-label">
    <Typography variant="h6" className="choose-criteria-label">
      Choose 1 or more criteria to start your search
    </Typography>
  </div>
);
