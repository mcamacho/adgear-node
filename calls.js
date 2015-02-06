/*global require*/

var http = require("http");

var options = {
  host: "api.admin.adgear.com",
  path: "/.json",
  auth: {
    user: "mauricio",
    pass: "0cbdfcd7cc2c5b099022adcd78cd7c90da210f46d20b09809d485d0cc1cf21b1"
  }
};

var callback = function(response) {
  "use strict";
  // var str = "";
  // response.on("data", function (chunk) {
  //   str += chunk;
  // });
  // response.on("end", function (chunk) {
  //   console.log(str);
  // });
};

http.request(options, callback).end();
