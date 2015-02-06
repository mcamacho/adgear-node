/*global require*/
var request = require("request");
var _ = require("lodash");
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
  "uri": "http://api.admin.adgear.com/reports/campaigns/11238-worldauto-specials/delivery.json?end_date=Feb+06%2C+2015&start_date=Feb+02%2C+2015",
  "auth": {
    "user": "mauricio",
    "pass": "0cbdfcd7cc2c5b099022adcd78cd7c90da210f46d20b09809d485d0cc1cf21b1",
    "sendImmediately": false
  }
};

app.get("/", function (req, res) {
  "use strict";
  request(options, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      res.send(JSON.parse(b));
    }
  });
});

app.listen(3000);
