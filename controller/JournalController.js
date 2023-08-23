import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import upload from "../config/multerConfig.js";
import { Journal, Attachment } from "../model/index.js";

class JournalController {
  constructor() {
    this.journal = new Journal();
    this.attachment = new Attachment();
  }

  print = async () => {
    console.log(this.journal);
  };

  create = async (req, res) => {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.log("Error in uploading profile image - Controller");
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Error in uploading Attachments",
          data: {},
          success: false,
          error: err.message,
        });
      }
      console.log("IDDD - ",req.user_id);

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

      const journalData = {
        description: req.body.description,
        published_at: req.body.published_at,
        user_id: req.user_id,
        attachment_id: attachment_id,
      };

      const newJournal = await this.journal.create(journalData);

      return res.status(StatusCodes.OK).json({
        message: "Profile Images Uploaded Successfully",
        data: newJournal,
        success: true,
      });
    });
  };

  update = async (req, res) => {};

  delete = async (req, res) => {};
}

export default JournalController;
