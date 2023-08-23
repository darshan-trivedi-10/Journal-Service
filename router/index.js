import express from "express";

import { authMiddleware, Validator } from "../middleware/index.js";

import { AuthController, JournalController } from "../controller/index.js";

const router = express.Router();

const authController = new AuthController();
const journalController = new JournalController();

var validator = new Validator();

// Auth Routes
router.get("/auth", validator.authValidator, authController.Auth);

// Journal Routes
router.post("/journal/create", authMiddleware, journalController.create);
router.put("/journal/update", authMiddleware, journalController.update);
router.delete("/journal/delete", authMiddleware, journalController.delete);

export default router;
