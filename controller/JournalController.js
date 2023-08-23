import { StatusCodes } from "http-status-codes";

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

      let attachment_data,
        attachment_type = req.body.type;
      if (attachment_type == "url") {
        attachment_data = req.body.url;
      } else {
        attachment_data = req.file.filename;
      }

      let response = this.attachment.create(attachment_type, attachment_data);
      console.log(response);
      return res.send("Check Terminal");
      let attachmentId = 10;

      const journalData = {
        description: req.body.description,
        published_at: req.body.published_at,
        user_id: req.body.id,
        attachment_id: attachmentId,
      };

      const fileName = req.file.filename;
      const user = await userService.updateUser(req.body.id, {
        profile: fileName,
      });

      return res.status(StatusCodes.OK).json({
        message: "Profile Images Uploaded Successfully",
        data: { user },
        success: true,
      });
    });
  };

  update = async (req, res) => {};

  delete = async (req, res) => {};
}

export default JournalController;
