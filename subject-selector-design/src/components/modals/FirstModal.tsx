import React, { FC } from "react";
import classNames from "classnames";
import { ButtonSecondary } from "../..";
import { Typography } from "../typography/Typography";

export interface ModalFirstProps {
    title?: string;
    modalVariant: FirstModalVariant;
    sectionVariant: FirstModalVariant;

}

type FirstModalVariant = "Display" | "Hide";
type FirstModalSelectorState = "default";

const FirstModalSelectorVariantClasses: Record<
FirstModalVariant,
    Record<FirstModalSelectorState, string> 
  > = {
    "Display": {
        default: "modal fade show modal-block",
    },
    "Hide": {
        default: "modal",
    }
};

export const FirstModal:FC<ModalFirstProps> = (
    {
        children,
        sectionVariant = "Hide",
        modalVariant,
        title = "Demographics",
    ...modalFirstProps}) => {
    const firstModalClassName = FirstModalSelectorVariantClasses[modalVariant];
    
    return (
        <div {...modalFirstProps}>
            <div className={classNames(firstModalClassName.default)}>
                <div className="modal-dialog first-modal-header">
                    <div className="modal-content">
                        <div className="container-fluid modal-box modal-criteria-selector">
                            <div className="row">
                                <h5 className="modal-title">
                                    
                                <Typography
                                    variant="md"
                                    customWeight="bold"
                                    className={`Place-Holder `}>
                                    {title}
                                </Typography>
                                </h5>
                            </div>
                        </div>
                        <div id="option-select" className="modal-body">
                                {children}
                        </div>
                        <div className="modal-footer modal-section-blue">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7"></div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-4"><a href="#" data-bs-dismiss="modal">cancel</a></div>
                                            <div className="col-md-8"><ButtonSecondary variant={"Disabled"} title={"Add criterion"} /></div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
  )
}