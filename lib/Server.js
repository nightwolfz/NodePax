'use strict';

var bunyan        = require('bunyan');
var logger        = bunyan.createLogger({name: "paxEvents"});
var express       = require('express');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var http          = require('http');
var path          = require('path');
var config        = nodepax.config;

function Server() {
    this.app = null;
    this.server = null;
    this.cache = null;
}


// Declare dependencies
Server.prototype.initialize = function(done) {

    this.app = new express();
    this._configuration(this.app);
    this.server = http.createServer(this.app);
    done();
};


// Express configuration
Server.prototype._configuration = function(app) {

    app.set('port', config.web.port);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // Routes
    app.use(require('../routes/router'));
};


// Start the web server
Server.prototype.start = function(done) {
    this.server.listen(config.web.port, function () {
        logger.info('Webserver listening on port %s', config.web.port);
        done();
    });
};

module.exports = Server;
