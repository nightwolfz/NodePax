"use strict";

/**
 * Specifies the routes used in this application.
 */
var config        = nodepax.config;
var express       = require('express');
var router        = new express.Router();

function setupRoutes() {

    // Verify app_id
    //router.use(someMiddleware());

    // API
    router.get('/item/:id', require('../controllers/getItem'));

    return router;
}

module.exports = setupRoutes();