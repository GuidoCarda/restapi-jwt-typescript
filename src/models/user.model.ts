//Types
import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";

// Encrypt & auth
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Config
import config from "../config/config";

export interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

export function createToken(user: User) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);
}

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

export async function comparePasswords(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
