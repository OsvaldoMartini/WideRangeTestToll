import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


import "./components/styles/styles.scss";

export * from "./components/cards/CardMain";
export * from "./components/cards/CardButton";
export * from "./components/cards/CardTotal";
export * from "./components/buttons/ButtonComp";
export * from "./components/buttons/ButtonSearch";
export * from "./components/buttons/ButtonSecondary";
export * from "./components/typography/Typography";
export * from "./components/modals/ModalContainer";
export * from "./components/pages/HomePage";
export * from "./components/pages/HomePageBoot";

export * from "./components/navigation/HeaderComp";
export * from "./components/navigation/SubHeader";
export * from "./components/navigation/SubHeaderAgeCriteria";
export * from "./components/labels/ChooseCriteriaTittle";
export * from "./components/placeholders/AnimationPlaceHolder";
export * from "./components/textinput/TextInput3DigActiveError";
export * from "./components/textinput/TextInput3DigActive";
export * from "./components/slider/SliderAnimated";
export * from "./components/slider/SliderNotAnimated";
export * from "./components/slider/MultiRangeSlider/MultiRangeSlider";
export * from "./components/options/OptionSelector";
export * from "./components/options/OptionSelectorGroup";
export * from "./components/options/OvalOption";
export * from "./components/filtersSelection/FiltersSelectionGroup";
export * from "./components/navigation/CustomPagination";
export * from "./components/navigation/CustomData";



export * from "./components/Button/TimedButton/TimedButton";

export * from "./components/@interfaces";
export * from "./data";



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
