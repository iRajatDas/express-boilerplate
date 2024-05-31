"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var env_1 = require("./config/env");
var port = env_1.env.PORT || 3000;
app_1.default.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
