import React, { FC } from "react";

export interface SubHeaderProps {
  open: boolean;
  toggleOpen: () => void;
}

export const SubHeader: FC<SubHeaderProps> = () => (
  <div className="subheader-bar-box"></div>
);
