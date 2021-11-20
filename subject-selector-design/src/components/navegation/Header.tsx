// import classNames from "classnames";
import React, { FC } from "react";
import { Typography } from "../typography/Typography";
import { images } from "../../data/images";

export interface HeaderProps {
  open: boolean;
  toggleOpen: () => void;
}

export const Header: FC<HeaderProps> = () => (
  <div className="header-bar-box bg-blue_core_005_eb_8">
    <div className="header-bar-logo">
      <img
        src={images.nhsLogo}
        alt="avatar"
        className="z-50 text-gray-500 transition-all duration-100 ease-out cursor-pointer stroke-current hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
      />
    </div>
    <div className="header-bar-title ">
      <Typography
        variant="h6"
        customWeight="medium"
        className="select-none text-white_core_ffffff font-FrutigerLTW01"
      >
        BCSS - Test Subject Finder
      </Typography>
    </div>
  </div>
);
