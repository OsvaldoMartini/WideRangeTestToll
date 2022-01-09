import React, { FC, useCallback, useRef } from "react";
import classNames from "classnames";
import { BootstrapModalContainer, ButtonSVG, Typography,  } from "../..";

export interface FirstBootstrapModalContainerProps {
    title?: string;
    modalVariant: FirstModalVariant;
    sectionVariant: FirstModalVariant;
}

type FirstModalVariant = "Display" | "Hide";
type FirstModalSelectorState = "default";

const DemographicSectionDisplayVariantClasses: Record<
FirstModalVariant,
    Record<FirstModalSelectorState, string> 
  > = {
    "Display": {
        default: "row display-element firstmodal-content white",
    },
    "Hide": {
        default: "row hide-element",
    }
};

export const FirstBootstrapModalContainer:FC<FirstBootstrapModalContainerProps> = (
    {
        modalVariant,
        sectionVariant,
    ...modalFirstProps}) => {
    var demographicSectionClassName = DemographicSectionDisplayVariantClasses[sectionVariant];
    
    const sectionref = useRef<HTMLDivElement>(null)
    const buttonState = useCallback((state:any) => {
        const section = sectionref.current
        const {title} = state;
        console.log("in the callback: "+title)
        if (title === "Age")
            section?.setAttribute("class","row display-element firstmodal-content white")
        else 
            section?.setAttribute("class","row hide-element")
    }, []);

    return (
        <div {...modalFirstProps}>
            <BootstrapModalContainer modalVariant={modalVariant}>
                <div className="row firstmodal-content grey">
                    <div className="col-md-12 padding-left-1_5">
                        <ButtonSVG 
                            title={"NHS Number"} 
                            width={100} circlePosn="38" 
                            parentCallback={buttonState}>
                        </ButtonSVG>

                        <ButtonSVG title={"Age"} 
                            width={44} 
                            circlePosn="10" 
                            parentCallback={buttonState}>
                        </ButtonSVG>

                        <ButtonSVG title={"Hub"} 
                            width={44} 
                            circlePosn="10" 
                            parentCallback={buttonState}>
                        </ButtonSVG>

                        <ButtonSVG 
                            title={"Screening Centre"} 
                            width={128} 
                            circlePosn="52" 
                            parentCallback={buttonState}>
                        </ButtonSVG>

                        <ButtonSVG 
                            title={"GP Practice"} 
                            width={85}
                            circlePosn="31"  
                            parentCallback={buttonState}>
                        </ButtonSVG>    
                    </div>
                </div>
                
                <div ref={sectionref} id="selecetd-option-panel" className={classNames(demographicSectionClassName.default)}>
                    <div className="col-md-4">
                        <Typography
                            variant="md"
                            customWeight="regular"
                            className={`Place-Holder `}
                            font="FrutigerLTStdRoman">
                            Subject age
                        </Typography>
                    </div>
                    <div className="col-md-8"><a href="#">
                        <Typography
                            variant="md"
                            customWeight="regular"
                            className={`Place-Holder `}
                            font="FrutigerLTStdRoman">
                            Select age criteria
                        </Typography></a></div>
                </div>
            </BootstrapModalContainer>
        </div>
  )
}