import React from "react";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { HomePageBoot } from "features/home/HomePageBoot";

import "components/subject-selector-design.cjs.development.css"


const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <div>

      <Route exact path="/" component={HomePage} />
      <Route path={"/(.+)"} />
      <Route exact path="/boot" component={HomePageBoot} />
    </div>
  );
};

export default withRouter(observer(App));
