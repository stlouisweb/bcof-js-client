import React, { Component } from "react";

import steem from "steem/lib/browser";
import SteemData from "./SteemData";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <SteemData />
      </div>
    );
  }
}

export default App;
