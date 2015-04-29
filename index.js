"use strict";


var config      = require('./config/config');
var logger      = require('winston');
var Application = require('./lib/Application.js');



// The only global we'll ever need
global.nodepax= new Application(config);
nodepax.initialize(function(){
    nodepax.start(function(){
        logger.debug('Application started');
    });
});


process.on('uncaughtException', function(err) {
    logger.error('Uncaught Exception Error:' + (err.stack ? '\nStacktrace: %s' : ''), err, err.stack);
    process.exit();
});
