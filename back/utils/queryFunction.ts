import { db } from "../global/db";

import { Response, Request } from "express";

export default function QueryFunction(
  query: string,
  props: string[],
  res: Response,
  req: Request
) {
  db.query(query, props, (err: Error, data: any) => {
    if (err) throw err;
    res.json(data).status(200);
  });
}
