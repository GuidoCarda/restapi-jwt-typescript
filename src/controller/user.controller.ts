import { Request, Response } from "express";
import pool from "../db";
import { User } from "../models/user.model";
import {
  FieldPacket,
  ProcedureCallPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

interface authRequest {
  email: string;
  password: string;
}

/*

interface User extends RowDataPacket{
  id: number;
  email: string;
  password: string;
}

const [rows, table] = await pool.execute<User[]>(
  "SELECT * FROM `user` WHERE email = ?",
  [req.body.email]
);

now rows has intellisense and auto-complete 
*/

export async function signUp(
  req: Request<{}, {}, authRequest, {}>,
  res: Response
): Promise<Response> {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please, send your email and password" });
  }

  const [rows, table] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM `user` WHERE email = ?",
    [req.body.email]
  );

  if (rows.length !== 0) {
    return res.status(400).json({ message: "The user already exists" });
  }

  const result = await pool.execute<ResultSetHeader>(
    "INSERT INTO `user` (email,password) VALUES (?, ?)",
    [req.body.email, req.body.password]
  );

  return res.status(200).json(result);
}

export async function signIn(
  req: Request<{}, {}, authRequest, {}>,
  res: Response
) {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please, send your email and password" });
  }

  const [users] = await pool.execute<User[]>(
    "SELECT * FROM `user` WHERE email = ? ",
    [req.body.email]
  );

  if (users.length === 0) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const user = users[0];
  return res.send(user);
}

export async function restartDB(_req: Request, res: Response) {
  const [results] = await pool.execute<ProcedureCallPacket<ResultSetHeader>>(
    "CALL restart_db;"
  );
  res.json(results);
}
