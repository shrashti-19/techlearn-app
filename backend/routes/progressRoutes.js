
import express from "express";
import { updateCourseProgress, updateExerciseProgress, updateCalendarActivity } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/update-course", protect, updateCourseProgress);
router.post("/update-exercise", protect, updateExerciseProgress);
router.post("/update-calender", protect, updateCalendarActivity);
export default router;
