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


/**
 * @description Get a single job by ID.
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getJobById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const job: Job = await jobService.getJobById(req.params.id);
        res.status(HTTP_STATUS.OK).json(successResponse(job, "Job Retrieved"));
    } catch (error) {
        next(error);
    }
};


/**
 * @description Create a new job.
 * @route POST /
 * @returns {Promise<void>}
 */
export const createJob = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newJob: Job = await jobService.createJob(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newJob, "Job Created")
        );
    } catch (error) {
        next(error);
    }
};


/**
 * @description Delete a job.
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await jobService.deleteJob(req.params.id);

        res.status(HTTP_STATUS.OK).json(successResponse("Job Deleted"));
    } catch (error) {
        next(error);
    }
};