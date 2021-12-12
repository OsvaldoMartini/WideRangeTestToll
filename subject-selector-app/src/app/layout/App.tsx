import React from "react";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import DraggableSamples from "../controls/DraggableSamples";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path={"/(.+)"} />
      <Route
              exact
              path="/draggable"
              component={DraggableSamples}
            />
    </div>
  );
};

export default withRouter(observer(App));
