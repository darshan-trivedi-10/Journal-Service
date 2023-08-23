import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import { User } from "../model/index.js";
import { verifyPassword, createToken } from "../utills/authUtills.js";

class AuthController {
  constructor() {
    this.user = new User();
  }

  Auth = async (req, res) => {
    try {
      const { username, password, role } = req.body;

      const existingUser = await this.user.findOne({ username });
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        const newUser = await this.user.create({
          username,
          password: newPassword,
          role,
        });

        return this.sendTokenResponse(
          res,
          newUser,
          "You are successfully registered and logged in"
        );
      }

      const passwordMatch = verifyPassword(password, existingUser.password);

      if (!passwordMatch) {
        // throw new Error("Incorrect credentials");
      }

      return this.sendTokenResponse(
        res,
        existingUser,
        "You are successfully logged in"
      );
    } catch (error) {
      console.error("Error in Auth:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        success: false,
        err: error,
      });
    }
  };

  sendTokenResponse = (res, user, message) => {
    const token = createToken(user);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: { token },
      message,
    });
  };
}

export default AuthController;
