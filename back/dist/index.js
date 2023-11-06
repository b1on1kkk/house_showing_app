"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// multer multi-uploading
const multer_config_1 = require("./multer_config/multer.config");
//
const path_1 = __importDefault(require("path"));
// database
const db_1 = require("./global/db");
//
// utils
const getStatisticsData_1 = __importDefault(require("./utils/getStatisticsData"));
const queryFunction_1 = __importDefault(require("./utils/queryFunction"));
//
const app = (0, express_1.default)();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//////////////////////////////////////////////////////GET////////////////////////////////////////////////
app.get("/avg_price_by_rooms", (_, res) => (0, getStatisticsData_1.default)("SELECT number_of_rooms, AVG(price) AS avg_price FROM houses GROUP BY number_of_rooms", res));
app.get("/avg_all", (_, res) => (0, getStatisticsData_1.default)("SELECT AVG(price) AS avg_price FROM houses", res));
app.get("/houses", (req, res) => {
    const { location, price_range } = req.query;
    const buffArray = [];
    if (location && price_range) {
        const data = JSON.parse(`${price_range}`);
        location
            .toString()
            .split(",")
            .map((loc) => {
            db_1.db.query("SELECT * from houses WHERE location LIKE ? AND price BETWEEN ? AND ?", [`%${loc}%`, data.from, data.to], (err, data) => {
                if (err)
                    return err;
                buffArray.push(...JSON.parse(JSON.stringify(data)));
            });
        });
        setTimeout(() => {
            res.json(buffArray).end();
        }, 200);
    }
    else if (location) {
        location
            .toString()
            .split(",")
            .map((loc) => {
            db_1.db.query(`SELECT * FROM houses WHERE location LIKE ?`, [`%${loc}%`], (err, data) => {
                if (err)
                    return err;
                buffArray.push(...JSON.parse(JSON.stringify(data)));
            });
        });
        setTimeout(() => {
            res.json(buffArray).end();
        }, 200);
    }
    else if (price_range) {
        const data = JSON.parse(`${price_range}`);
        db_1.db.query("SELECT * from houses WHERE price BETWEEN ? AND ?", [data.from, data.to], (err, data) => {
            if (err)
                return err;
            buffArray.push(...JSON.parse(JSON.stringify(data)));
            res.json(buffArray).end();
        });
    }
    else {
        db_1.db.query("SELECT * from houses", (err, data) => {
            if (err)
                return err;
            res.json(data).end();
        });
    }
});
app.get("/photos", (req, res) => {
    const arrayOfQueryValues = req.query;
    if ("picture" in arrayOfQueryValues) {
        res.sendFile(path_1.default.join(__dirname, "../", "uploads", `${arrayOfQueryValues.picture}`));
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////POST////////////////////////////////////////////////
app.post("/changed_data", (req, res) => {
    console.log(req.body);
    // console.log(JSON.parse(req.body));
    for (const [key, value] of Object.entries(req.body)) {
        // skip id because id is a primary key
        if (key !== "id") {
            db_1.db.query(`UPDATE houses SET ${key}=? WHERE id=?`, [
                typeof value === "object" ? JSON.stringify(value) : value,
                req.body.id
            ], (error, results, fields) => {
                if (error)
                    throw error;
                res.end("Fields updated successfully");
            });
        }
    }
});
app.post("/files", (req, res) => {
    (0, multer_config_1.multi_upload)(req, res, function (err) {
        if (err) {
            res
                .status(500)
                .send({ error: { message: `Multer uploading error: ${err.message}` } })
                .end();
        }
        res.status(200).end("Your files uploaded.");
    });
});
app.post("/add_new_post", (req, res) => {
    console.log(req.body);
    const { title, price, number_of_rooms, total_area, living_area, location, type, floor, floors, house_extensions, photos } = req.body;
    const query = `INSERT INTO houses (title, price, number_of_rooms, total_area, living_area, location,type,floor, floors, house_extensions, photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    (0, queryFunction_1.default)(query, [
        title,
        price,
        number_of_rooms,
        total_area,
        living_area,
        location,
        type,
        floor,
        floors,
        house_extensions,
        photos.toString()
    ], res, req);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////DELETE////////////////////////////////////////////////
app.delete("/houses/:id", (req, res) => {
    (0, queryFunction_1.default)("DELETE FROM houses WHERE id = ?", [req.params.id], res, req);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(2005, () => {
    console.log(`Server is running at http://localhost:2005`);
});
