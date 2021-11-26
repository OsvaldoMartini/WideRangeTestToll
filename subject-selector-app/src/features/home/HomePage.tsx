import React from "react";
import { Container, Segment } from "semantic-ui-react";

import { HeaderComp, SubHeader } from "subject-selector-design";

const HomePage = () => {
  return (
    <>
      <HeaderComp
        open={false}
        toggleOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <SubHeader
        open={false}
        toggleOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default HomePage;
