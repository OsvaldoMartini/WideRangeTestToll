import React, { FC } from "react";

export interface SubHeaderProps {
  open: boolean;
  toggleOpen: () => void;
}

export const SubHeader: FC<SubHeaderProps> = () => (
  <div className="subheader-bar-box bg-blue_core_005_eb_8"></div>
);
