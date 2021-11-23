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
      className="Animation-Place-Hold"
    >
      Animation
      <br />
      Place Holder
    </Typography>
  </div>
);
