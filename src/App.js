import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import {
  faStar,
  faStarHalf,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faStar, faStarHalf, faSpinner);

class App extends Component {
  state = { data: null };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="main">
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </>
        </Router>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
