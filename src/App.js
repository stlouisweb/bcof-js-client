import React, { Component } from "react";

import steem from "steem/lib/browser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const self = this;
    //steem.api.setOptions({ url: "wss://40.121.220.248:9876" });
    console.log("Getting post content...");
    const resultP = steem.api.getContentAsync(
      "yamadapc",
      "test-1-2-3-4-5-6-7-9"
    );
    resultP.then(result => console.log(result));
    steem.api.getAccounts(["ned", "dan"], function(err, response) {
      console.log(err, response);
      let users = response.map(user => {
        return { name: user.name, id: user.id, balance: user.balance };
      });
      self.setUsers(users);
    });
  }
  setUsers(users) {
    this.setState({ users: users });
  }

  render() {
    let userList = this.state.users.map(user => {
      return (
        <tr>
          <td>
            {user.id}
          </td>
          <td>
            {user.name}
          </td>
          <td>
            {user.balance}
          </td>
        </tr>
      );
    });
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          {userList}
        </table>
      </div>
    );
  }
}

export default App;
