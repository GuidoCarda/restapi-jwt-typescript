import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export default function isStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.user as User;
  if (role === "staff") {
    return next();
  }
  return res.status(403).json({ message: "Special permitions needed" });
}
