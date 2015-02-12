/**
 * Created by terry on 2/10/2015.
 */
var express = require('express');
var app = express();
app.get('/*', function(req, res) {
    res.send('Hello Shiny');
});

module.exports = app;