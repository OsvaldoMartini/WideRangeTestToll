import React from "react";

interface IStoryArgs {
  children?: React.ReactNode;
}

const StoryLayout = (args: IStoryArgs) => {
  return <div>{args.children}</div>;
};

export default StoryLayout;
