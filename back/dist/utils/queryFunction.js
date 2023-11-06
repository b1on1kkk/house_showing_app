"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../global/db");
function QueryFunction(query, props, res, req) {
    db_1.db.query(query, props, (err, data) => {
        if (err)
            throw err;
        res.json(data).status(200);
    });
}
exports.default = QueryFunction;
