'use strict';

var logger   = require('winston');
var util     = require('util');
var async    = require('async');


function Application(config) {
    this.config = config;
    this.server = null;
    this.database = null;
}



// Run the initialize method of each lib
Application.prototype.initialize = function(done) {

    var Server   = require('../lib/Server');
    var Database = require('../lib/Database');

    this.database = new Database();
    this.server = new Server();

    var initializeList = [
        this.database.initialize.bind(this.database),
        this.server.initialize.bind(this.server)
    ];

    async.series(initializeList, function(err) {
        if (err) throw logger.error('Failed to initialize Application, error: [%s]\nMessage: %s', err, err.toString());
        done();
    });
};



// Run the start method of each lib
Application.prototype.start = function(done) {

    var startList = [
        this.database.start.bind(this.database),
        this.server.start.bind(this.server)
    ];

    async.series(startList, function(err) {
        if (err) throw logger.error('Failed to start Application, error: [%s]\nMessage: %s', err, err.toString());
        done();
    });
};

module.exports = Application;