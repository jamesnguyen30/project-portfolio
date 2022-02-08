const express = require("express");
const app = express();
const admin = require("firebase-admin");
admin.initializeApp();

module.exports = {admin, app};
