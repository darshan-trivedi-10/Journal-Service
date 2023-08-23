import express from "express";

import Validator from "../middleware/Validator.js";
import { AuthController } from "../controller/index.js";

const router = express.Router();

const authController = new AuthController();

var validator = new Validator();

router.get("/auth", validator.authValidator, authController.Auth);

export default router;