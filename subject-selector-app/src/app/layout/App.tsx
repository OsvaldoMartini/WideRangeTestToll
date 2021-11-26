import React from "react";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path={"/(.+)"} />
    </div>
  );
};

export default withRouter(observer(App));
