import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import List from "./components/list/List";
import {
  faStar,
  faStarHalf,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faStar, faStarHalf, faSpinner);

class App extends Component {
  render() {
    return (
      <div className="main">
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/list" component={List} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
