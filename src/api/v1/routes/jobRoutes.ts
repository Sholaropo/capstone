import express, { Router } from "express";
import * as jobController from "../controllers/jobController";
import { validateRequest } from "../middleware/validate";
import { jobSchema, deleteJobSchema } from "../validation/jobValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  jobController.getAllJobs
);

/**
 * @openapi
 * /jobs/{id}:
 *   get:
 *     summary: Retrieve a job by its ID
 *     description: Fetch a specific job by its unique identifier.
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the job
 *         example: "job_123abc"
 *     responses:
 *       200:
 *         description: The job details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  jobController.getJobById
);

/**
 * @openapi
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  validateRequest(jobSchema),
  jobController.createJob
);

export default router;
