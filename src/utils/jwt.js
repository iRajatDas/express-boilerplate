"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../config/env");
var generateToken = function (userId) {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.env.JWT_SECRET, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
