import React, { FC } from "react";
import { Typography } from "../typography/Typography";

export interface AnimationPlaceHolderProps {
  open: boolean;
  toggleOpen: () => void;
}

export const AnimationPlaceHolder: FC<AnimationPlaceHolderProps> = () => (
  <div className="main-place-holder">
    <Typography
      variant="h6"
      customWeight="medium"
      className="select-none text-black_231_f_20  text-center font-FrutigerLTW01"
    >
      Animation
      <br />
      Place Holder
    </Typography>
  </div>
);
