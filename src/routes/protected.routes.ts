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

router.get(
  "/orders/:orderId",
  passport.authenticate("jwt", { session: false }),
  orderController.getOne
);

router.post(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderController.create
);

router.put(
  "/orders/:orderId",
  passport.authenticate("jwt", { session: false }),
  orderController.update
);

router.get(
  "/user/:userId/orders",
  passport.authenticate("jwt", { session: false }),
  orderController.getAllFromUser
);

export default router;
