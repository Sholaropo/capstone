import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import {
  createJob,
  getAllJobs,
  getJobById,
} from "../src/api/v1/controllers/jobController";
import { Job } from "../src/api/v1/models/jobModel";

jest.mock("../src/api/v1/controllers/jobController", () => ({
  getAllJobs: jest.fn((req, res) => res.status(200).send()),
  createJob: jest.fn((req, res) => res.status(201).send()),
  getJobById: jest.fn((req, res) => res.status(200).send()),
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((req: Request, res: Response, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(
    (options) => (req: Request, res: Response, next: NextFunction) => next()
  );
});

describe("Job Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/jobs", () => {
    it("should call getAllJobs controller", async () => {
      await request(app).get("/api/v1/jobs");
      expect(getAllJobs).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/jobs/:id", () => {
    it("should call getJobById controller", async () => {
      const mockId = "1";
      await request(app).get(`/api/v1/jobs/${mockId}`);
      expect(getJobById).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/jobs", () => {
    it("should call createJob controller", async () => {
      const mockDate: Date = new Date();
      const mockJob: Partial<Job> = {
        title: "backend developer",
        company: "abc",
        location: "canada",
        url: "http://www.abc.com",
        description:
          "Entry level backend developer with 1 year experience needed",
        level: "ENTRY LEVEL",
        mode: "FULL TIME",
        stage: "NOT APPLIED",
        date_posted: mockDate,
        active: true,
      };

      await request(app).post("/api/v1/jobs").send(mockJob);
      expect(createJob).toHaveBeenCalled();
    });
  });
});
