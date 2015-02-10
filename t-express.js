/*global require*/
var path = require("path");
var request = require("request");
var lodash = require("lodash");
var express = require("express");
var ejs = require("ejs");
var app = express();

var adgeardomain = "api.admin.adgear.com";
var campaignlist = "/reports/campaign/agency_campaigns";
var campaignbase = "/reports/campaigns";

function campaignid(ele) {
  "use strict";
  return "/" + ele.id + "-" + ele.name.toLowerCase().replace(/\s-\s|\s/g, "-") + "/delivery";
}

// var campaignsschema = { "overall_ctr": "number", "items": "object", "_urls": "object", "total_clicks": "number", "total_impressions": "number" };

var options = {
  "auth": {
    "user": "mauricio",
    "pass": "0cbdfcd7cc2c5b099022adcd78cd7c90da210f46d20b09809d485d0cc1cf21b1",
    "sendImmediately": false
  }
};
var ejshelpers = {
  gettype: function (ele) {
    return typeof ele;
  },
  campaignid: campaignid
};

// console.log(ejs);
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
// get all campaigns
app.get("/", function (req, res) {
  "use strict";
  lodash.assign(options, {
    "uri": "http://" + adgeardomain + campaignlist + ".json"
  });
  request(options, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      res.render("home", {
        data: JSON.parse(b),
        help: ejshelpers
      });
    }
  });
});
// get specific campaign
app.get(/.*delivery$/, function (req, res) {
  "use strict";
  lodash.assign(options, {
    "uri": "http://" + adgeardomain + campaignbase + req.url + ".json"
  });
  request(options, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      console.log(JSON.parse(b));
      res.render("campaign", {
        data: JSON.parse(b),
        help: ejshelpers
      });
    }
  });
});

app.listen(3000);
