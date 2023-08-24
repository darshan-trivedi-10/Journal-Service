import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import upload from "../config/multerConfig.js";
import { Journal, Attachment, JournalStudentTag } from "../model/index.js";

class JournalController {
  constructor() {
    this.journal = new Journal();
    this.attachment = new Attachment();
    this.journalStudentTag = new JournalStudentTag();
  }

  print = async () => {
    console.log(this.journal);
  };

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
        console.log("IDDD - ", req.user_id);

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
        console.log(response);

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

  update = async (req, res) => {};

  delete = async (req, res) => {
    try {
      const journal_id = req.body.id,user_id = req.user_id;
      
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
