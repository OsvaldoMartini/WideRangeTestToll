import React, { FC} from "react";
import { Typography } from "../typography/Typography";
import classNames from "classnames";

type ModalFirstSelectorVariant = "Active";

type ModalFirstSelectorState = "default";

const ModalFirstSelectorVariantClasses: Record<
  ModalFirstSelectorVariant,
  Record<ModalFirstSelectorState, string>
> = {
  Active: {
    default: "modal-first-selector",
  },
};

export interface ModalFirstSelectorProps {
  children?: string | React.ReactElement;
  variant: ModalFirstSelectorVariant;
  disabled?: boolean;
  title?: string;
}

export const ModalFirstSelector: FC<ModalFirstSelectorProps> = ({
  children,
  variant = "Active",
  disabled,
  title="Demographic",
  ...modalFirstSelectorProps
}) => {
  const ModalFirstSelectorVariantClassName = ModalFirstSelectorVariantClasses[variant];
 
  return (
    <div
      {...modalFirstSelectorProps}>
        <div
          className={classNames("", {
            [classNames(ModalFirstSelectorVariantClassName.default)]: !disabled,
          })}
        >
          <Typography
            variant="md"
            customWeight="bold"
            className={`place-holder-modal-first`}
          >
            {title}
          </Typography>
          </div>
          <div>
            svg Butttons
            {children}
          </div>
          <div>
            <footer>cancel  etc</footer>
          </div>
      </div>
  );
};
