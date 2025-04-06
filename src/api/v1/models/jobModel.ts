/**
 * @openapi
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the job
 *           example: "abcde12345" 
 *         title:
 *           type: string
 *           description: The title of the job position
 *           example: "Software Engineer"
 *         company:
 *           type: string
 *           description: The name of the company offering the job
 *           example: "TechCorp Inc."
 *         location:
 *           type: string
 *           description: The location of the job
 *           example: "New York, USA"
 *         url:
 *           type: string
 *           format: uri
 *           description: The URL to the job posting
 *           example: "https://techcorp.com/jobs/12345"
 *         description:
 *           type: string
 *           description: A detailed description of the job
 *           example: "We are looking for a skilled software engineer..."
 *         level:
 *           type: string
 *           enum: [INTERNSHIP, ENTRY LEVEL, MID LEVEL, SENIOR LEVEL]
 *           description: The experience level required for the job
 *           example: "MID LEVEL"
 *         mode:
 *           type: string
 *           enum: [FULL TIME, PART TIME, CONTRACT]
 *           description: The employment mode of the job
 *           example: "FULL TIME"
 *         stage:
 *           type: string
 *           enum: [NOT APPLIED, APPLIED, FIRST INTERVIEW, FOLLOW UP INTERVIEWS, OFFER]
 *           description: The current stage of application process
 *           example: "APPLIED"
 *         date_posted:
 *           type: string
 *           format: date
 *           description: The date the job was posted
 *           example: "2025-03-30"
 *         active:
 *           type: boolean
 *           description: Whether the job posting is still active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the job posting was created
 *           example: "2024-03-23T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the job posting was last updated
 *           example: "2024-03-23T12:30:00Z"
 */

export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    url: string;
    description: string;
    level: "INTERNSHIP" | "ENTRY LEVEL" | "MID LEVEL" | "SENIOR LEVEL";
    mode: "FULL TIME" | "PART TIME" | "CONTRACT";
    stage: "NOT APPLIED" | "APPLIED" | "FIRST INTERVIEW" | "FOLLOW UP INTERVIEWS" | "OFFER";
    date_posted: Date;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
};
