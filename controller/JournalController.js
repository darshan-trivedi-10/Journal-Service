import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import upload from "../config/multerConfig.js";
import {
  Journal,
  Attachment,
  JournalStudentTag,
  User,
} from "../model/index.js";

class JournalController {
  constructor() {
    this.journal = new Journal();
    this.attachment = new Attachment();
    this.journalStudentTag = new JournalStudentTag();
    this.user = new User();
  }

  create = async (req, res) => {
    try {
      upload.single("file")(req, res, async (err) => {
        if (err) {
          console.log("Error in uploading Journal files - Controller");
          console.log(err);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error in uploading Attachments",
            data: {},
            success: false,
            error: err.message,
          });
        }

        let teacherData = await this.user.findById(req.user_id);
        if (teacherData.role == "0") {
          return res.status(StatusCodes.FORBIDDEN).json({
            message: "You do not have permission to create the journal",
            data: {},
            success: false,
          });
        }

        let attachment_data,
          attachment_type = req.body.type;
        if (attachment_type == "url") {
          attachment_data = req.body.url;
        } else {
          attachment_data = req.file.filename;
        }

        let attachment_id = uuidv4();
        let response = await this.attachment.create(
          attachment_id,
          attachment_type,
          attachment_data
        );

        let journal_id = uuidv4();
        const journalData = {
          journal_id: journal_id,
          description: req.body.description,
          published_at: req.body.published_at,
          user_id: req.user_id,
          attachment_id: attachment_id,
        };

        let taggedStudent = req.body.taggedStudent;

        const newJournal = await this.journal.create(journalData);
        const data = await this.journalStudentTag.create(
          journal_id,
          taggedStudent
        );

        return res.status(StatusCodes.OK).json({
          message: "Journal Created Successfully",
          data: newJournal,
          success: true,
        });
      });
    } catch (error) {
      console.error("Error in Journal Controller:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        success: false,
        err: error,
      });
    }
  };

  update = async (req, res) => {
    try {
      upload.single("file")(req, res, async (err) => {
        if (err) {
          console.log("Error in uploading Journal files - Controller");
          console.log(err);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error in uploading Attachments",
            data: {},
            success: false,
            error: err.message,
          });
        }
        const journal_id = req.params.id;
        const existingJournal = await this.journal.findById(journal_id);

        if (!existingJournal) {
          return res.status(StatusCodes.NOT_FOUND).json({
            message: "Journal not Found",
            data: {},
            success: false,
          });
        }

        if (existingJournal[0].user_id !== req.user_id) {
          return res.status(StatusCodes.FORBIDDEN).json({
            message: "You do not have permission to update this journal",
            data: {},
            success: false,
          });
        }

        let updatedJournalData = {};
        if (req.body.description) {
          updatedJournalData.description = req.body.description;
        }

        if (req.body.published_at) {
          updatedJournalData.published_at = req.body.published_at;
        }

        if (req.body.taggedStudent) {
          await this.journalStudentTag.updateTaggedStudents(
            journal_id,
            req.body.taggedStudent
          );
        }

        if (req.body.type) {
          let type = req.body.type;
          let attachment_data;
          if (type == "url") {
            attachment_data = req.body.url;
          } else if (type == "file") {
            attachment_data = req.file.filename;
          }
          if (attachment_data) {
            const updateAttachment = await this.attachment.update(
              existingJournal[0].attachment_id,
              attachment_data,
              type
            );
          }
        }

        if (Object.keys(updatedJournalData).length != 0) {
          const updatedJournal = await this.journal.update(
            journal_id,
            updatedJournalData
          );
        }

        return res.status(StatusCodes.OK).json({
          message: "Journal updated Successfully",
          success: true,
        });
      });
    } catch (error) {
      console.error("Error in Journal Controller:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        success: false,
        err: error,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const journal_id = req.body.id,
        user_id = req.user_id;

      const deleteJournal = await this.journal.delete(journal_id, user_id);

      if (deleteJournal == true) {
        return res.status(StatusCodes.OK).json({
          message: "Journal Deleted Successfully",
          data: deleteJournal,
          success: true,
        });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Journal not found with this User",
          data: deleteJournal,
          success: false,
        });
      }
    } catch (error) {
      console.error("Error in Journal Controller:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        success: false,
        err: error,
      });
    }
  };
}

export default JournalController;
