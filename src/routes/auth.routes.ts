import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/restart", userController.restartDB);

export default router;
