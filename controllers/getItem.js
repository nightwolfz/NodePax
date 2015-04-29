"use strict";


var _            = require('lodash');
var config       = nodepax.config;
var db           = nodepax.database.db;


/**
 * Returns the detail for an item.
 * @method GET /api/1.0/item/:id
 */
function getItem(req, res) {

    var id = req.params.id;

    db.findOne(id, function(err, item) {
        if (err) {
            logger.error('Error while loading item [%s] from db: %s', id, err);
            return res.json(err);
        }
        if (!item) {
            logger.error('No item for this id [%s]', id);
            return res.json('No item for this id [' + id + ']');
        }

        return res.json(item);
    });
}

module.exports =  getItem;
