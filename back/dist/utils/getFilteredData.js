"use strict";
// import { db } from "../global/db";
// import { Request } from "express";
// import { Response } from "express";
// interface House {
//   id: number;
//   title: string;
//   price: string;
//   number_of_rooms: number;
//   total_area: number;
//   living_area: number;
//   location: string;
//   type: string;
//   floor: number;
//   floors: number;
//   house_extensions: string;
//   photos: string;
// }
// export default function getFilteredData(
//   query: string,
//   props: string[],
//   res: Response,
//   location: any,
//   price_range: any
// ) {
//   const buffArray: any[] = [];
//   const data = JSON.parse(`${price_range}`);
//   location
//     .toString()
//     .split(",")
//     .map((loc) => {
//       db.query(
//         "SELECT * from houses WHERE location LIKE ? AND price BETWEEN ? AND ?",
//         [`%${loc}%`, data.from, data.to],
//         (err: Error, data: any) => {
//           if (err) return err;
//           buffArray.push(...JSON.parse(JSON.stringify(data)));
//         }
//       );
//     });
//   setTimeout(() => {
//     console.log(buffArray);
//     res.json(buffArray).end();
//   }, 200);
// }
