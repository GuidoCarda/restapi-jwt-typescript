import { RowDataPacket } from "mysql2";
import pool from "../db";
import { NextFunction, Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const [results] = await pool.query<RowDataPacket[]>("SELECT * FROM `order`");
  return res.json(results);
}
