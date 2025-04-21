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
 *     summary: Retrieve a paginated list of jobs
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: A paginated list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
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

/**
 * @openapi
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by its ID
 *     description: Updates the details of a specific job by its ID.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  validateRequest(jobSchema),
  jobController.updateJob
);

/**
 * @openapi
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job by its ID
 *     description: Remove a specific job using its unique identifier.
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
 *         description: Job successfully deleted
 *       404:
 *         description: Job not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  validateRequest(deleteJobSchema),
  jobController.deleteJob
);

export default router;
