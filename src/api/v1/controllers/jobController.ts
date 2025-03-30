import { Request, Response, NextFunction } from "express";
import * as jobService from "../services/jobService";
import type { Job } from "../models/jobModel";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Get all jobs.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const jobs: Job[] = await jobService.getAllJobs();

        res.status(HTTP_STATUS.OK).json(
            successResponse(jobs, "Jobs Retrieved")
        );
    } catch (error) {
        next(error);
    }
};