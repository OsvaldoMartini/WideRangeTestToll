// let cs_styles = "./styles/styles.sass";
// if (process.env.STYLES_FOR === "storybook") {
//     cs_styles = "./styles/styles.css";
// }

//console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", cs_styles);

import "./styles/styles.scss";

export * from "./cards/CardMain";
export * from "./cards/CardButton";
export * from "./cards/CardTotal";

export * from "./buttons/ButtonComp";
export * from "./buttons/ButtonSearch";
export * from "./buttons/ButtonSecondary";

export * from "./typography/Typography";

export * from "./modals/ModalContainer";

export * from "./pages/HomePage";

export * from "./navigation/HeaderComp";
export * from "./navigation/SubHeader";
export * from "./navigation/SubHeaderAgeCriteria";

export * from "./labels/ChooseCriteriaTittle";
export * from "./placeholders/AnimationPlaceHolder";

export * from "./textinput/TextInput3DigActiveError";
export * from "./textinput/TextInput3DigActive";

export * from "./slider/SliderAnimated";
export * from "./slider/SliderNotAnimated";
export * from "./slider/MultiRangeSlider/MultiRangeSlider";


export * from "./options/OptionSelector";
export * from "./options/OptionSelectorGroup";
export * from "./options/OvalOption";

export * from "./filtersSelection/FiltersSelectionGroup";
export * from "./navigation/CustomPagination";
export * from "./navigation/CustomData";

export * from "./@interfaces";
export * from "../data";
