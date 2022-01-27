import { IOptionSelectorData } from "../components";

const optSelec0: IOptionSelectorData = {
  id: 1,
  title: "Specific age",
  operation: "==="
};
const optSelec1: IOptionSelectorData = {
  id: 2,
  title: "Greater than a given age",
  operation: ">"
};

const optSelec2: IOptionSelectorData = {
  id: 3,
  title: "Greater than or equal to a given age",
  operation: ">="
};

const optSelec3: IOptionSelectorData = {
  id: 4,
  title: "Less than a given age",
  operation: "<"
};

const optSelec4: IOptionSelectorData = {
  id: 5,
  title: "Less than or equal to a given age",
  operation: "<="
};
const optSelec5: IOptionSelectorData = {
  id: 6,
  title: "Between two given ages",
  operation: "between"
};

export const optionSelecData: IOptionSelectorData[] = [
  optSelec0,
  optSelec1,
  optSelec2,
  optSelec3,
  optSelec4,
  optSelec5,
];
