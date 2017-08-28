import React, { Component } from "react";

import steem from "steem/lib/browser";

class SteemData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const self = this;
    steem.api.setOptions({ url: "ws://127.0.0.1:9876" });
    steem.config.set(
      "chain_id",
      "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
    );

    steem.api.getAccounts(["jeremy"], function(err, response) {
      console.log(err, response);
      let users = response.map(user => {
        return { name: user.name, id: user.id, balance: user.balance };
      });
      self.setUsers(users);
    });

    console.log("getting profile");
    steem.api.getProfile(
      {
        required_auths: [],
        required_posting_auths: [],
        name: "Farmer Brown",
        account_options: "",
        location: "",
        crop_assertion: ""
      },
      function(err, result) {
        console.log("got profile");
        console.log(err, result);
      }
    );
    steem.api.createProfile(
      {
        required_auths: [],
        required_posting_auths: [],
        name: "Farmer White",
        account_options: "",
        location: "",
        crop_assertion: ""
      },
      function(err, result) {
        console.log(err, result);
      }
    );
  }
  setUsers(users) {
    this.setState({ users: users });
  }

  render() {
    let userList = this.state.users.map(user => {
      return (
        <tr key={user.id}>
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
      <div>
        {this.state.users.length > 0
          ? <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {userList}
              </tbody>
            </table>
          : <p>Loading users...</p>}
      </div>
    );
  }
}

export default SteemData;
