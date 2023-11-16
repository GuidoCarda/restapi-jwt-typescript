import { Request, Response, Router } from "express";
import passport from "passport";
import * as orderController from "../controller/order.controller";
import { User } from "../models/user.model";
import isStaff from "../middlewares/auth";

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
  isStaff,
  orderController.getAll
);

router.get(
  "/orders/:orderId",
  passport.authenticate("jwt", { session: false }),
  isStaff,
  orderController.getOne
);

router.post(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  isStaff,
  orderController.create
);

router.put(
  "/orders/:orderId",
  passport.authenticate("jwt", { session: false }),
  isStaff,
  orderController.update
);

router.get(
  "/users/:userId/orders",
  passport.authenticate("jwt", { session: false }),
  isStaff,
  orderController.getAllFromUser
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user as User;

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "staff")
      return res.status(403).json({ message: "Special permitions needed" });
    res.json(req.user as User);
  }
);

export default router;
