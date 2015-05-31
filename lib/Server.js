'use strict';

var bunyan        = require('bunyan');
var logger        = bunyan.createLogger({name: "paxEvents"});
var express       = require('express');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var errorhandler  = require('errorhandler');
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

    app.set('strict routing', true);
    app.set('case sensitive routing', true);
    app.set('json spaces', 0); // trim json (is default for NODE_ENV=production, see http://stackoverflow.com/a/19833534/1194584)
    app.set('port', config.web.port);
    app.disable('x-powered-by');


    if (config.web.proxyEnabled) {
        app.enable('trust proxy');
    }

    if (config.web.debug) {
        app.use(express.logger('dev'));
    }

    // development only
    if ('development' === app.get('env')) {
        app.use(errorhandler());
        app.set('json spaces', 1);
    }


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
