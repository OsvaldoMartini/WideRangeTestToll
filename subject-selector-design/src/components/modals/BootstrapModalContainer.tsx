import React, { FC } from "react";
import classNames from "classnames";
import { ButtonSecondary } from "../..";
import { Typography } from "../typography/Typography";

export interface BootstrapModalContainerProps {
    title?: string;
    modalVariant: FirstModalVariant;
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

export const BootstrapModalContainer:FC<BootstrapModalContainerProps> = (
    {
        children,
        modalVariant,
        title = "Demographics",
    ...bootstrapModalContainerProps}) => {
    const firstModalClassName = FirstModalSelectorVariantClasses[modalVariant];
    
    return (
        <div {...bootstrapModalContainerProps}>
            <div className={classNames(firstModalClassName.default)}>
                <div className="modal-dialog first-modal-header">
                    <div className="modal-content">
                        <div className="container-fluid modal-box modal-criteria-selector">
                            <div className="row">
                                <h5 className="modal-title">
                                    <Typography
                                        variant="md"
                                        customWeight="regular"
                                        className={`Place-Holder `}
                                        font="FrutigerLTStdRoman">
                                        {title}
                                    </Typography>
                                </h5>
                            </div>
                        </div>
                        <div id="option-select" className="modal-body padding-bottom-reset padding-top-reset">
                            {children}
                        </div>
                        
                        <div className="modal-footer modal-bottom">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7"></div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-6"><a href="#" className="button-text" data-bs-dismiss="modal">Cancel</a></div>
                                            <div className="col-md-6"><ButtonSecondary variant={"Disabled"} title={"Add criterion"} /></div>
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