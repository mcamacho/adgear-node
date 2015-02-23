/*global require*/
(function () {
"use strict";

// require ext modules
var path = require("path");
var request = require("request");
var lodash = require("lodash");
var express = require("express");
var ejs = require("ejs");

// constant properties
var adgeardomain = "api.admin.adgear.com";
var campaignlist = "/reports/campaign/agency_campaigns";
var campaignbase = "/reports/campaigns";

// get campaign path
function campaignid(ele) {
  return "/" + ele.id + "-" + ele.name.toLowerCase().replace(/\s-\s|\s/g, "-") + "/delivery";
}

// http digest settings
var reqoptions = {
  "auth": {
    "user": "mauricio",
    "pass": "0cbdfcd7cc2c5b099022adcd78cd7c90da210f46d20b09809d485d0cc1cf21b1",
    "sendImmediately": false
  }
};

// methods to include on the data sent to the render view
var ejshelpers = {
  gettype: function (ele) {
    return typeof ele;
  },
  campaignid: campaignid
};


// instance an express server
var app = express();
// configure server
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// set route for all campaigns
app.get("/", function (req, res) {
  lodash.assign(reqoptions, {
    "uri": "http://" + adgeardomain + campaignlist + ".json"
  });
  request(reqoptions, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      res.render("home", {
        data: JSON.parse(b),
        help: ejshelpers
      });
    }
  });
});
// set route for specific campaign
app.get(/.*delivery$/, function (req, res) {
  lodash.assign(reqoptions, {
    "uri": "http://" + adgeardomain + campaignbase + req.url + ".json"
  });
  request(reqoptions, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      // console.log(JSON.parse(b));
      res.render("campaign", {
        data: JSON.parse(b),
        help: ejshelpers
      });
    }
  });
});

app.listen(3000);
}());
