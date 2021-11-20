import classNames from "classnames";
import React, { FC } from "react";
import { Typography } from "../typography/Typography";
import { images } from "../../data/images";

export interface NavbarProps {
  open: boolean;
  toggleOpen: () => void;
}

export const Navbar: FC<NavbarProps> = () => (
<div className="z-40 flex items-center justify-center h-20 py-6 shadow-md bg-blue_core_005_eb_8 dark:bg-gray-900 px-9">
<div className="relative md:right-40">

{/* <div className="flex justify-center pt-2"> */}
          <img
          src={images.nhsLogo}
          alt="avatar"
          className="z-50 text-gray-500 transition-all duration-100 ease-out cursor-pointer stroke-current hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
        />
        </div>
<div className="left-10">
    <Typography variant="h6" customWeight="medium" className="select-none text-white_core_ffffff font-FrutigerLTW01">
      BCSS - Test Subject Finder
    </Typography>
  </div>
  </div>
);
