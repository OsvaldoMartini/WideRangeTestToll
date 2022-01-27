import React, { FC } from "react";

export interface OvalOptionProps {
  className?: string;
  disabled?: boolean;
  key: string;
}

export const OvalOption: FC<OvalOptionProps> = ({
  className,
  disabled,
  //     key,
  ...ovalOptionProps
}) => {
  const { key } = ovalOptionProps;

  return (
    <div {...ovalOptionProps}>
      <div key={key} className={"oval-option"}></div>
    </div>
  );
};
