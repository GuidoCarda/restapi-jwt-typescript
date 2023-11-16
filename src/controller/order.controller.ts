import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export async function getAll(req: Request, res: Response) {
  const { id } = req.user as User;

  const [results] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM `order` WHERE user_id = ?",
    [id]
  );

  return res.json(results);
}

export async function getAllFromUser(req: Request, res: Response) {
  const { userId } = req.params;

  const [results] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM `order` WHERE user_id = ?",
    [userId]
  );

  return res.json(results);
}

export async function getOne(req: Request, res: Response) {
  const { id } = req.user as User;
  const { orderId } = req.params;

  const [results] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM `order` WHERE id = ? AND user_id = ?",
    [orderId, id]
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(results[0]);
}

export async function create(req: Request, res: Response) {
  console.log(req.user);
  const { id: userId } = req.user as User;
  const { description } = req.body;

  const result = await pool.query<ResultSetHeader>(
    "INSERT INTO `order` (description, user_id) VALUES (?,?)",
    [description, userId]
  );

  console.log(result);

  return res.json({
    message: "Order created",
    id: result[0].insertId,
  });
}

export async function update(req: Request, res: Response) {
  const { id } = req.user as User;
  const { description } = req.body;
  const { orderId } = req.params;

  const [results] = await pool.query<RowDataPacket[]>(
    "UPDATE `order` SET description = ? WHERE id = ? AND user_id = ?",
    [description, orderId, id]
  );

  if ((results as any).affectedRows === 0) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ message: "Order updated" });
}
