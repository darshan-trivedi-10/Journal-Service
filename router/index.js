import express from "express";

import { authMiddleware, Validator } from "../middleware/index.js";

import { AuthController, JournalController, FeedController } from "../controller/index.js";

const router = express.Router();

const authController = new AuthController();
const journalController = new JournalController();
const feedController = new FeedController();

var validator = new Validator();

// Auth Routes
router.post("/auth", validator.authValidator, authController.Auth);

// Journal Routes
router.post("/journal/create", authMiddleware, journalController.create);
router.put("/journal/update/:id", authMiddleware, journalController.update);
router.delete("/journal/delete", authMiddleware, journalController.delete);

router.get("/feed/student/:id", authMiddleware, feedController.StudentFeed);
router.get("/feed/teacher/:id", authMiddleware, feedController.TeacherFeed);

export default router;
