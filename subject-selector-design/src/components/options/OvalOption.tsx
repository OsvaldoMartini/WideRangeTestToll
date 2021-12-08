import React, {FC} from "react";

export interface OvalOptionProps {
    className?: string;
    disabled?: boolean;
  }

 export const OvalOption: FC<OvalOptionProps> = ({
        className,
        disabled,
        ...ovalOptionProps
      }) => {

    return (
        <div {...ovalOptionProps} >
            <div  className={"oval-option"}             
            >
            </div>
      
        </div>
    )
}
