"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../global/db");
function getStaticticsData(sql, res) {
    db_1.db.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        res.json(results);
    });
}
exports.default = getStaticticsData;
