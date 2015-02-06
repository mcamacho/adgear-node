var request = require("request");

var options = {
  "uri": "http://api.admin.adgear.com/.json",
  "auth": {
    "user": "mauricio",
    "pass": "0cbdfcd7cc2c5b099022adcd78cd7c90da210f46d20b09809d485d0cc1cf21b1",
    "sendImmediately": false
  }
};

request(options, function (e, r, b) {
  "use strict";
  if (!e && r.statusCode === 200) {
    console.log(b);
  }
});
