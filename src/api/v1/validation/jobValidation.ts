import Joi, { ObjectSchema } from "joi";

export const jobSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .optional()
        .messages({ "string.empty": "Job ID cannot be empty" }),
    title: Joi.string().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title cannot be empty",
    }),
    company: Joi.string().required().messages({
        "any.required": "Company is required",
        "string.empty": "Company cannot be empty",
    }),
    location: Joi.string().required().messages({
        "any.required": "Location is required",
        "string.empty": "Location cannot be empty",
    }),
    url: Joi.string().uri().required().messages({
        "any.required": "URL is required",
        "string.empty": "URL cannot be empty",
        "string.uri": "Invalid URL format",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
    }),
    level: Joi.string()
        .valid("INTERNSHIP", "ENTRY LEVEL", "MID LEVEL", "SENIOR LEVEL")
        .required()
        .messages({
            "any.required": "Level is required",
            "any.only": "Invalid level value",
        }),
    mode: Joi.string()
        .valid("FULL TIME", "PART TIME", "CONTRACT")
        .required()
        .messages({
            "any.required": "Mode is required",
            "any.only": "Invalid mode value",
        }),
    stage: Joi.string()
        .valid("NOT APPLIED", "APPLIED", "FIRST INTERVIEW", "FOLLOW UP INTERVIEWS", "OFFER")
        .required()
        .messages({
            "any.required": "Stage is required",
            "any.only": "Invalid stage value",
        }),
    date_posted: Joi.date().required().messages({
        "any.required": "Date posted is required",
    }),
    active: Joi.boolean().required().messages({
        "any.required": "Active status is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

export const deleteJobSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "Job ID cannot be empty",
    }),
});