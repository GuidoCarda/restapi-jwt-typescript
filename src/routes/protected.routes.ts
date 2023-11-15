import { Request, Response, Router } from "express";
import passport from "passport";
import * as orderController from "../controller/order.controller";
import { User } from "../models/user.model";

const router = Router();

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.json("success");
  }
);

router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderController.getAll
);

export default router;
