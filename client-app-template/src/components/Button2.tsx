import React, { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;

  /**
   * Simple click handler
   */
  onClick?: () => void;
};

/**
 * The world's most _basic_ button
 */
const Button2: FC<ButtonProps> = ({ children, onClick }: ButtonProps) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
export default Button2