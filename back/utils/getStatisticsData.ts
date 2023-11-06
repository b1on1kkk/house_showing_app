import { Response } from "express";

import { db } from "../global/db";

export default function getStaticticsData(sql: string, res: Response) {
  db.query(sql, (error: Error, results: any) => {
    if (error) {
      throw error;
    }
    res.json(results);
  });
}
