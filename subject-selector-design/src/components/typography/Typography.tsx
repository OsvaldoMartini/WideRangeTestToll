import React, { FC } from "react";
import classNames from "classnames";

type TypographyVariant =
  // Text
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  // Display
  | "h6"
  | "h5"
  | "h4"
  | "h3"
  | "h2"
  | "h1";

type TypographyFontVariant = "FrutigerLTStd" | "FrutigerLTStdRoman"
type TypographyWeightOption = "regular" | "medium" | "semibold" | "bold";

type TypographyPointerEventVariant = "Default";
type TypographyPointerEventSate = "unset" | "none";


const TypographyPointerEventClasses: Record<
  TypographyPointerEventVariant,
  Record<TypographyPointerEventSate, string>
> = {
  Default: {
    unset: "",
    none: "",
  },
}
// type TypographyWeightValue =
//   | "font-normal"
//   | "font-medium"
//   | "font-semibold"
//   | "font-bold";

export interface TypographyProps {
  font?: TypographyFontVariant;
  variant: TypographyVariant;
  pointerEvent?: TypographyPointerEventVariant;
  customColor?: string;
  customWeight?: TypographyWeightOption;
  className?: string;
  children: string | React.ReactNode;
}

// const TypographyVariantClasses: Record<TypographyVariant, string> = {
//   xs: "text-xs",
//   sm: "text-sm",
//   md: "text-md",
//   lg: "text-lg",
//   xl: "text-xl",
//   h6: "text-h6",
//   h5: "text-h5",
//   h4: "text-h4",
//   h3: "text-h3",
//   h2: "text-h2",
//   h1: "text-h1",
// };

// const TypographyFontVariantClasses: Record<TypographyFontVariant, string> = {
//   FrutigerLTStd: "FrutigerLTStd",
//   FrutigerLTStdRoman: "FrutigerLTStd-Roman",
// };

// const TypographyWeightClasses: Record<
//   TypographyWeightOption,
//   TypographyWeightValue
// > = {
//   regular: "font-normal",
//   medium: "font-medium",
//   semibold: "font-semibold",
//   bold: "font-bold",
// };

export const Typography: FC<TypographyProps> = ({
  // font = "FrutigerLTStd",
  variant = "md",
  // customWeight = "regular",
  className,
  children,
}) => {
  // const TypographyVariantClassName = TypographyVariantClasses[variant];
  // const TypographyWeightClassName = TypographyWeightClasses[customWeight];
  // const TypographyFontVariantClassName = TypographyFontVariantClasses[font];

  // h1-h6 should have corresponding component
  // others should be p
  const isHeading = variant.startsWith("h");
  const Component = (isHeading ? variant : "p") as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        // TypographyVariantClassName,
        // TypographyWeightClassName,
        // TypographyFontVariantClassName,
        className,
        {
          // ["tracking-tight"]: ["h1", "h2", "h3"].includes(variant),
          // ["text-black dark:text-white"]: !customColor,
        },
        // customColor,
      )}
    >
      {children}
    </Component>
  );
};
