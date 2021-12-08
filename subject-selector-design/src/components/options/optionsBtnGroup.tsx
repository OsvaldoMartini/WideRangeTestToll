import React from "react";
import { Typography } from "../..";
import { OptionSelector } from "../options/OptionSelector";



export const options1 = [
  {
    value: "Default unchecked",
    content: (
      <>
        <OptionSelector className="eclipse-empty" variant={"Default"} checked={false} focus={false} /> 
        <Typography
            variant="md"
            customWeight="regular"
            className={`label-options `}
          >
            {"Between two given ages"}
          </Typography> 
      </>
    ),
  },
 
  // {
  //   value: "Default checked",
  //   content: (
  //     <>
  //       <OptionSelector className="eclipse-empty" variant={"Default checked"} /> 
  //       <Typography
  //           variant="md"
  //           customWeight="regular"
  //           className={`label-options `}
  //         >
  //           {"Between two given ages"}
  //         </Typography> 
  //     </>
  //   ),
  // },
];
