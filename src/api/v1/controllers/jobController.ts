import { Request, Response, NextFunction } from "express";
import * as jobService from "../services/jobService";
import type { Job } from "../models/jobModel";
import { PaginationMeta, successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Get paginated jobs.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllJobs = async (
    req: Request,
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Extract pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        // Get paginated jobs
        const result = await jobService.getPaginatedJobs(page, limit);
        
        // Calculate pagination metadata
        const paginationMeta: PaginationMeta = {
            total: result.total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(result.total / limit)
        };
        
        res.status(HTTP_STATUS.OK).json(
            successResponse(
                result.jobs,
                "Jobs Retrieved", 
                paginationMeta
            )
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

    res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse(newJob, "Job Created"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a job by ID.
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedJob: Job = await jobService.updateJob(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json(successResponse(updatedJob, "Job Updated"));
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
