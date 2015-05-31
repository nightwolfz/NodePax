'use strict';

var logger              = require('bunyan').createLogger({name: "paxEvents"});
var Database            = require('./someDatabase');
var config              = nodepax.config;


function Database() {
    this.db = null;
}


// Declare all the database instances here
Database.prototype.initialize = function(done) {
    this.db = new Database(config.mongodb.url, {maxLimit: 100});
    done();
};



Database.prototype.start = function(done) {
    done();
};

module.exports = Database;
