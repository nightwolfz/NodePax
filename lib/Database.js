'use strict';

var logger              = require('winston');
var Database            = require('./someDatabase');
var config              = nodepax.config;


function Database() {
    this.db = null;
}


// Declare all the database instances here
Database.prototype.initialize = function(done) {
    this.db = new Database(config.mongodb.url, {maxLimit:config.mongodb.maxLimit || 100});
    done();
};



Database.prototype.start = function(done) {
    done();
};

module.exports = Database;