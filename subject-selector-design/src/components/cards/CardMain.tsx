import React from "react";
import { Typography } from "../typography/Typography";
import { ICardMain } from "../../@interfaces";
import { images } from "../../data/images";

export const CardMain = (card: ICardMain) => {
  const onClickCard = (item: ICardMain) => {
    console.log(item.title);
  };

  return (
    <div
      className={`${card.addClassNames}`}
      style={{ left: `${card.addLeftPos}` }}
    >
      <div
        className={`rounded-lg shadow-md bg-blue_core_tint_20_c_7_daec w-154 h-120 dark:bg-gray-800 `}
      >
        <div className={`pt-6 text-center `}>
          <Typography
            variant="md"
            customWeight="bold"
            // customColor="text-primary-600 dark:text-primary-300"
            className={`leading-8 tracking-normal to-gray-700 text-2x1 font-FrutigerLTW01`}
          >
            {card.title}
          </Typography>
          <div className="flex justify-center pt-2">
            <img
              src={images.nhsPlus}
              onClick={() => onClickCard(card)}
              alt="avatar"
              className="z-50 text-gray-500 transition-all duration-100 ease-out cursor-pointer stroke-current hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
