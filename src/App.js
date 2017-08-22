import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import steem from "steem/lib/browser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steem: ""
    };
  }

  componentDidMount() {
    //steem.api.setOptions({ url: "wss://40.121.220.248:9876" });
    console.log("Getting post content...");
    const resultP = steem.api.getContentAsync(
      "yamadapc",
      "test-1-2-3-4-5-6-7-9"
    );
    resultP.then(result => console.log(result));
    steem.api.getAccounts(["ned", "dan"], function(err, response) {
      console.log(err, response);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.steem}
      </div>
    );
  }
}

export default App;
