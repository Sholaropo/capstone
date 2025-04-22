import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Register a new user with email and password
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userRecord = await auth.createUser({ email, password });
    res.status(HTTP_STATUS.CREATED).json(successResponse(userRecord, "User registered"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Login a user using email and password (custom token)
 */
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    // NOTE: Firebase Admin SDK does NOT verify passwords.
    // Login should be handled on the client via Firebase SDK,
    // or implement custom verification logic.

    const user = await auth.getUserByEmail(email);
    const customToken = await auth.createCustomToken(user.uid);
    res.status(HTTP_STATUS.OK).json(successResponse({ token: customToken }, "User logged in"));
  } catch (error) {
    next(error);
  }
};
