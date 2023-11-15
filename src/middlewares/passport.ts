import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import pool from "../db";
import { User } from "../models/user.model";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const [user] = await pool.execute<User[]>(
      "SELECT * FROM `user` WHERE id = ?",
      [payload.id]
    );
    if (user) {
      return done(false, user[0]);
    }
    return done(null, false, { message: "Unauthorized user" });
  } catch (error) {
    console.log(error);
  }
});
