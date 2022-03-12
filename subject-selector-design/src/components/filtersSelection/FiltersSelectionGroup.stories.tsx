import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "../StoryLayout";
import { FilterSelectionGroup, FilterSelectionGroupProps } from "./FiltersSelectionGroup";
import { cardsData } from "../../data";

const meta: Meta = {
  title: "BCSS-Design/Filters Selection/OptionsSelectorGroup",
  component: FilterSelectionGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryFilterSelectionGroup: Story<FilterSelectionGroupProps> = (args) => {

  // const returnTheCall = () => {
  //   return { valued: "One" };
  // }


  return (
    <StoryLayout {...args}>
      <FilterSelectionGroup
        variant={args.variant}
        filters={args.filters}
        // parentCallback={() => returnTheCall()}
        initialPosition={args.initialPosition}
        addLeftPos={args.addLeftPos}
        bootstrap={true}
      />
    </StoryLayout>
  );
};

export const Default = StoryFilterSelectionGroup.bind({});

Default.args = {
  variant: "InitialState",
  filters: cardsData[0].filtersSelection,
  initialPosition: 10,
  addLeftPos: 10
};

Default.parameters = {
  controls: { exclude: [] },
};

Default.parameters = {
  controls: {
    exclude: [
      "variant",
      "filters",
    ],
  },
};
