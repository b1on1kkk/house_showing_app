import express, { Express, Request, Response } from "express";

// multer multi-uploading
import { multi_upload } from "./multer_config/multer.config";
//

import path from "path";

// database
import { db } from "./global/db";
//

// utils
import getStaticticsData from "./utils/getStatisticsData";
import QueryFunction from "./utils/queryFunction";
//

const app: Express = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////////////////////////////////////////////GET////////////////////////////////////////////////

app.get("/avg_price_by_rooms", (_, res: Response) =>
  getStaticticsData(
    "SELECT number_of_rooms, AVG(price) AS avg_price FROM houses GROUP BY number_of_rooms",
    res
  )
);

app.get("/avg_all", (_, res: Response) =>
  getStaticticsData("SELECT AVG(price) AS avg_price FROM houses", res)
);

app.get("/houses", (req: Request, res: Response) => {
  const { location, price_range } = req.query;

  const buffArray: any[] = [];

  if (location && price_range) {
    const data = JSON.parse(`${price_range}`);

    location
      .toString()
      .split(",")
      .map((loc) => {
        db.query(
          "SELECT * from houses WHERE location LIKE ? AND price BETWEEN ? AND ?",
          [`%${loc}%`, data.from, data.to],
          (err: Error, data: any) => {
            if (err) return err;

            buffArray.push(...JSON.parse(JSON.stringify(data)));
          }
        );
      });

    setTimeout(() => {
      res.json(buffArray).end();
    }, 200);
  } else if (location) {
    location
      .toString()
      .split(",")
      .map((loc) => {
        db.query(
          `SELECT * FROM houses WHERE location LIKE ?`,
          [`%${loc}%`],
          (err: Error, data: any) => {
            if (err) return err;

            buffArray.push(...JSON.parse(JSON.stringify(data)));
          }
        );
      });

    setTimeout(() => {
      res.json(buffArray).end();
    }, 200);
  } else if (price_range) {
    const data = JSON.parse(`${price_range}`);

    db.query(
      "SELECT * from houses WHERE price BETWEEN ? AND ?",
      [data.from, data.to],
      (err: Error, data: any) => {
        if (err) return err;

        buffArray.push(...JSON.parse(JSON.stringify(data)));

        res.json(buffArray).end();
      }
    );
  } else {
    db.query("SELECT * from houses", (err: Error, data: any) => {
      if (err) return err;

      res.json(data).end();
    });
  }
});

app.get("/photos", (req: Request, res: Response) => {
  const arrayOfQueryValues = req.query;

  if ("picture" in arrayOfQueryValues) {
    res.sendFile(
      path.join(__dirname, "../", "uploads", `${arrayOfQueryValues.picture}`)
    );
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////POST////////////////////////////////////////////////

app.post("/changed_data", (req: Request, res: Response) => {
  console.log(req.body);
  // console.log(JSON.parse(req.body));

  for (const [key, value] of Object.entries(req.body)) {
    // skip id because id is a primary key
    if (key !== "id") {
      db.query(
        `UPDATE houses SET ${key}=? WHERE id=?`,
        [
          typeof value === "object" ? JSON.stringify(value) : value,
          req.body.id
        ],
        (error: Error, results: any, fields: any) => {
          if (error) throw error;
          res.end("Fields updated successfully");
        }
      );
    }
  }
});

app.post("/files", (req: Request, res: Response) => {
  multi_upload(req, res, function (err: any) {
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

  const {
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
    photos
  } = req.body;

  const query = `INSERT INTO houses (title, price, number_of_rooms, total_area, living_area, location,type,floor, floors, house_extensions, photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  QueryFunction(
    query,
    [
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
    ],
    res,
    req
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////DELETE////////////////////////////////////////////////

app.delete("/houses/:id", (req: Request, res: Response) => {
  QueryFunction("DELETE FROM houses WHERE id = ?", [req.params.id], res, req);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(2005, () => {
  console.log(`Server is running at http://localhost:2005`);
});
