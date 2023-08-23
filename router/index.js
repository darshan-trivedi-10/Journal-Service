import express from "express";

import Validator from "../middleware/Validator.js";
import { AuthController , JournalController} from "../controller/index.js";

const router = express.Router();

const authController = new AuthController();
const journalController = new JournalController();

var validator = new Validator();

// Auth Routes
router.get("/auth", validator.authValidator, authController.Auth);

// Journal Routes
router.post("/journal/create", journalController.create);
router.put("/journal/update", journalController.update);
router.delete("/journal/delete", journalController.delete);

export default router;