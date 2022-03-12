import React, { FC } from "react";
import { ICardMainData } from "../@interfaces";
import classNames from "classnames";
import { ButtonComp } from "../buttons/ButtonComp";

type ModalContainerVariant = "Default" | "AgeCriteriaVar";

type ModalContainerState =
  | "position"
  | "default"
  | "titleHeaderPosition"
  | "titleHeaderCss"
  | "buttonCancelPosition"
  | "buttonAddCriterionPosition"
  | "buttonCancelVariant"
  | "buttonOKVariant"
  | "colMdDiv1"
  | "colMdDiv2";

const ModalContainerVariantClasses: Record<
  ModalContainerVariant,
  Record<ModalContainerState, string>
> = {
  Default: {
    position: "modal-criteria-selector-position",
    default: "modal-criteria-selector",
    titleHeaderPosition: "modal-header-title-position",
    titleHeaderCss: "modal-header-title",
    buttonCancelPosition: "button-cancel-criteria-position",
    buttonAddCriterionPosition: "button-add-criterion-position",
    buttonCancelVariant: "ButtonCancelCriteria",
    buttonOKVariant: "ButtonAddCriterion",
    colMdDiv1: "col-md-7",
    colMdDiv2: "col-md-5",
  },
  AgeCriteriaVar: {
    position: "modal-age-criteria-selector-position",
    default: "modal-age-criteria-selector",
    titleHeaderPosition: "modal-header-title-position",
    titleHeaderCss: "modal-header-title",
    buttonCancelPosition: "button-age-cancel-position",
    buttonAddCriterionPosition: "button-age-okay-position",
    buttonCancelVariant: "ButtonCancelAge",
    buttonOKVariant: "ButtonOkayAge",
    colMdDiv1: "col-md-4",
    colMdDiv2: "col-md-6",
  },
};

export interface ModalContainerProps {
  children?: string | React.ReactElement;
  card?: ICardMainData;
  className?: string;
  variant: ModalContainerVariant;
  title?: string;
  titleOK?: string;
  addClassNames?: string;
  show: boolean;
  onHide?: (id: any) => void;
  onOkay?: () => void;
  disabled: boolean;
  okayDisabled?: boolean;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  title,
  titleOK,
  card,
  onHide,
  onOkay,
  variant = "Default",
  disabled,
  okayDisabled = true,
}) => {
  //    const {modal: {open, body}, closeModal} = rootStore.modalStore;
  const ModalContainerVariantClassName = ModalContainerVariantClasses[variant];

  return (
    <div
      className={classNames("", {
        [classNames(ModalContainerVariantClassName.position)]: !disabled,
      })}
    >
      <div
        className={classNames("modal-box", {
          [classNames(ModalContainerVariantClassName.default)]: !disabled,
        })}
      >
        <div
          className={classNames("", {
            [classNames(
              ModalContainerVariantClassName.titleHeaderPosition,
            )]: !disabled,
          })}
        >
          <div
            className={classNames("", {
              [classNames(
                ModalContainerVariantClassName.titleHeaderCss,
              )]: !disabled,
            })}
          >
            {card && <div>{card.title}</div>}
            {title && <div>{title}</div>}
          </div>
        </div>
      </div>
      <div>{children}</div>
      <div className="modal-bottom">
        <div style={{ position: "relative" }}>
          <div
            onClick={() => {
              onHide!(false);
            }}
            className={classNames("", {
              [classNames(
                ModalContainerVariantClassName.buttonCancelPosition,
              )]: !disabled,
            })}
          >
            <ButtonComp
              title={"Cancel"}
              variant={
                ModalContainerVariantClassName.buttonCancelVariant ===
                  "ButtonCancelAge"
                  ? "ButtonCancelAge"
                  : "ButtonCancelCriteria"
              }
            />
          </div>

          <div
            onClick={() => {
              onHide!(false);
            }}
            className={classNames("", {
              [classNames(
                ModalContainerVariantClassName.buttonAddCriterionPosition,
              )]: !disabled,
            })}
          >
            <ButtonComp
              title={titleOK!}
              disabled={okayDisabled}
              variant={
                ModalContainerVariantClassName.buttonOKVariant ===
                  "ButtonOkayAge"
                  ? "ButtonOkayAge"
                  : "ButtonAddCriterion"
              }
              onClick={() => {
                onOkay!();
              }}
            />

            {/* {variant === "Default" ? (
              <ButtonComp variant={"ButtonAddCriterion"}
                title={"Add criterion"}
                disabled={false} />
            ) : (
              <ButtonComp
                disabled={okayDisabled}
                onClick={() => {
                  onOkay!();
                }}

                title={"Okay"}
                variant={"ButtonOkayAge"} />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
