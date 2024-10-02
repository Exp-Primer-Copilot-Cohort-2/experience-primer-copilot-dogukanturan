// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Get all comments
app.get('/comments', function(req, res) {
    fs.readFile(commentsPath, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

// Add a new comment
app.post('/comments', function(req, res) {
    fs.readFile(commentsPath, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),