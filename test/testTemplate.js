"use strict";

// Libraries for test
var request = require('supertest');
var fs      = require('fs');
var path    = require('path');
var async   = require('async');
var should  = require('should');
var config  = require('../config/config');
var logger  = require('winston');

// The app under test
var Application = require('../lib/Application');

// Helper variables
var apiWithVersion = "/api/1.0";

config.web.port = 11109;

describe('Template REST API', function () {
    var data;
    var app;
    var db;

    // Insert a test item in the db
    before(function (done) {
        async.waterfall([
            function (callback) {

                global.nodepax = new Application(config);
                nodepax.initialize(function(){
                    nodepax.start(function(){
                        app = nodepax.server.app;
                        db = nodepax.database.db;

                        var samplesDir = path.join(__dirname, 'samples');
                        var sample = path.join(samplesDir, 'test-item.json');
                        fs.readFile(sample, 'utf8', callback);
                    });
                });

            },
            function (file, callback) {
                data = JSON.parse(file);
                db.save(data, callback);
            },
            function ready() {
                done();
            }
        ], function (error) {
            done(error);
        });
    });



    describe(apiWithVersion + '/item/:id', function () {
        it('should respond with an error', function (done) {
            request(app)
                .get(apiWithVersion + '/item/' + data._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });
    });

    // Remove test item from database when all tests ran
    after(function (done) {
        db.remove(data._id, function (err) {
            return done(err);
        });
    });
});