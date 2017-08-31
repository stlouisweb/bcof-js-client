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
      console.log(response);
      let users = response.map(user => {
        return { name: user.name, id: user.id, balance: user.balance };
      });
      self.setUsers(users);
    });

    // var wif = steem.auth.toWif(username, password, "posting");
    // steem.broadcast.vote(wif, voter, author, permlink, weight, function(
    //   err,
    //   result
    // ) {
    //   console.log(err, result);
    // });

    steem.api.getApiByName("tracker_api", function(err, result) {
      console.log(err, result);
    });

    const WIF = steem.auth.toWif("jeremy", "", "posting");
    console.log(WIF);

    steem.broadcast.profileCreate(WIF, "", "", "", "Farmer White", function(
      err,
      result
    ) {
      console.log(err, result);
    });

    // var json = JSON.stringify([
    //   {
    //     account_options: "",
    //     crop_assertion: "",
    //     id: "",
    //     location: "",
    //     name: "Farmer White"
    //   }
    // ]);
    // steem.broadcast.customJson(
    //   WIF,
    //   [], // Required_auths
    //   [], // Required Posting Auths
    //   "create_profile", // Id
    //   json, //
    //   function(err, result) {
    //     console.log(err, result);
    //   }
    // );

    // ------------------------------------------------------------------------

    // steem.broadcast.accountCreate(
    //   WIF,
    //   "0.000 TESTS",
    //   4,
    //   "TestAcc",
    //   "",
    //   true,
    //   true,
    //   "",
    //   {},
    //   function(err, result) {
    //     console.log(err, result);
    //   }
    // );

    // steem.api.createProfile(
    //   {
    //     required_auths: [],
    //     required_posting_auths: [],
    //     name: "Farmer White",
    //     account_options: "",
    //     location: "",
    //     crop_assertion: ""
    //   },
    //   function(err, result) {
    //     console.log(err, result);
    //   }
    // );

    steem.api.getProfile(
      {
        name: "Farmer Brown"
      },
      function(err, result) {
        console.log(err, result);
      }
    );
    steem.api.getProfile(
      {
        name: "Farmer White"
      },
      function(err, result) {
        console.log(err, result);
      }
    );
    steem.api.getProfile(
      {
        name: "Farmer Green"
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

//
// steem.broadcast.send(
//   {
//     extensions: [],
//     operations: [
//       [
//         "vote",
//         {
//           voter: "sisilafamille",
//           author: "siol",
//           permlink: "test",
//           weight: 1000
//         }
//       ]
//     ]
//   },
//   [privWif1, privWif2],
//   (err, result) => {
//     console.log(err, result);
//   }
// );

//   console.log("getting profile");
//   steem.api.getProfile(
//     {
//       required_auths: [],
//       required_posting_auths: [],
//       name: "Farmer Brown",
//       account_options: "",
//       location: "",
//       crop_assertion: ""
//     },
//     function(err, result) {
//       console.log("got profile");
//       console.log(err, result);
//     }
//   );
//   steem.api.createProfile(
//     {
//       required_auths: [],
//       required_posting_auths: [],
//       name: "Farmer White",
//       account_options: "",
//       location: "",
//       crop_assertion: ""
//     },
//     function(err, result) {
//       console.log(err, result);
//     }
//   );
// }

// const privWif1 = "5K2LA2ucS8b1GuFvVgZK6itKNE6fFMbDMX4GDtNHiczJESLGRd8";
// const privWif2 = "5JRaypasxMx1L97ZUX7YuC5Psb5EAbF821kkAGtBj7xCJFQcbLg";
//
// steem.broadcast.customJson(
//   privWif1,
//   [],
//   ["jeremy"],
//   "tracker",
//   {
//     create_evaluation: {
//       evaluated_by: "Trucker Joe",
//       assertion: 0,
//       verdict: true,
//       evidence: [0],
//       data: {}
//     }
//   },
//   function(err, result) {
//     console.log(err, result);
//   }
// );
