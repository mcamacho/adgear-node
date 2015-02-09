/*global require*/
var request = require("request");
var lodash = require("lodash");
var express = require("express");
var app = express();

var adgeardomain = "api.admin.adgear.com";
var campaignlist = "/reports/campaign/agency_campaigns";
var campaignbase = "/reports/campaigns";

function campaignid(id, name) {
  "use strict";
  return "/" + id + name.toLowerCase().replace(" ", "-") + "/delivery";
}

var options = {
  "auth": {
    "user": "mauricio",
    "pass": "0cbdfcd7cc2c5b099022adcd78cd7c90da210f46d20b09809d485d0cc1cf21b1",
    "sendImmediately": false
  }
};
// get all campaigns
app.get("/", function (req, res) {
  "use strict";
  lodash.assign(options, {
    "uri": "http://" + adgeardomain + campaignlist + ".json"
  });
  request(options, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      res.send(JSON.parse(b));
    }
  });
});

app.listen(3000);
