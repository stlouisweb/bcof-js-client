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
    steem.config.set("address_prefix", "TST");

    const username = "chris";
    const password = "bcof";
    const privActiveWif = steem.auth.toWif(username, password, "active");

    /** Add posting key auth */
    steem.broadcast.addKeyAuth(
      {
        signingKey: privActiveWif,
        username,
        authorizedKey: "TST8EFtW1mscEsH2QWcYpqjFmETPUTDEWgbSRnRCrkJbNxj68bcmh",
        role: "posting"
      },
      (err, result) => {
        console.log(err, result);
      }
    );
    console.log("get accounts");

    steem.api.getAccounts(["chris"], function(err, result) {
      console.log(err, result);
    });

    steem.api.login("chris", "bcof", function(err, result) {
      console.log("logged in");
      console.log(err, result);
    });

    steem.broadcast.customJson(
      privActiveWif,
      [],
      ["chris"],
      "tracker",
      '["create_profile", { "name": "Farmer Jones", "account_options": "", "location": "", "crop_assertion": ""}]',
      function(err, result) {
        console.log("got profile");
        console.log(err, result);
      }
    );
  }

  render() {
    return <div />;
  }
}

export default SteemData;
