import { StatusCodes } from "http-status-codes";
import { Journal, JournalStudentTag } from "../model/index.js";

class FeedController {
  constructor() {
    this.journal = new Journal();
    this.journalStudentTag = new JournalStudentTag();
  }

  StudentFeed = async (req, res) => {
    try {
      console.log("Heyy");
      const studentId = req.params.id;
      console.log(studentId, req.user_id);
      if (studentId != req.user_id) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "You do not have permission to access this data",
          data: {},
          success: false,
        });
      }
      const data = await this.journalStudentTag.studentFeed(studentId);
      res.status(StatusCodes.OK).json({
        success: true,
        data: data,
        message: "Feed Fetched Succesfully",
      });
    } catch (error) {
      console.error("Error in Feed:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        success: false,
        err: error,
      });
    }
  };

  TeacherFeed = async (req, res) => {
    try {
      const teacherId = req.params.id;
      if (teacherId != req.user_id) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "You do not have permission to access this data",
          data: {},
          success: false,
        });
      }
      const data = await this.journal.teacherFeed(teacherId);
      res.status(StatusCodes.OK).json({
        success: true,
        data: data,
        message: "Feed Fetched Succesfully",
      });
    } catch (error) {
      console.error("Error in Feed:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        success: false,
        err: error,
      });
    }
  };
}

export default FeedController;
