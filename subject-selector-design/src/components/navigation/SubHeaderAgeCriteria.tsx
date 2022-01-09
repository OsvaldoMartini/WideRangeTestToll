import React, { FC } from "react";
import Lottie from "react-lottie";

/* tslint:disable-next-line:max-line-length */
import animationData from "../../lotties/SubHeaderError.json";

export interface SubHeaderAgeCriteriaProps {
  showErrorState: boolean;
}

export const SubHeaderAgeCriteria: FC<SubHeaderAgeCriteriaProps> = ({
  showErrorState,
}) => {
  return (
    <div className="subheader-age-criteria">
      <div className="subheader-age-text-position">
        <div className="subheader-age-text">Enter valid age between 0-120</div>
      </div>
      <div className="subheader-anima-position">
        {showErrorState && (
          <Lottie
            options={{
              animationData,
              autoplay: true,
            }}
            width={400}
            height={56}
            style={{ margin: "0 0 0" }}
          />
        )}
      </div>
    </div>
  );
};
