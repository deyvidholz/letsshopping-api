import express, { Request, Response } from "express";

import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/all", AuthMiddleware, UserController.getAll);
router.get("/", AuthMiddleware, UserController.get);
router.post("/", UserController.create);
router.put("/", AuthMiddleware, UserController.update);
router.delete("/", UserController.delete);

export default router;
