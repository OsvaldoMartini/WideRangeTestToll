import React from "react";
import "../src/components/styles/styles.css";

interface IStoryArgs {
  children?: React.ReactNode;
}

const StoryLayout = (args: IStoryArgs) => {
  return <div>{args.children}</div>;
};

export default StoryLayout;
