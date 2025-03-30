import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import { getAllJobs } from "../src/api/v1/controllers/jobController";
import { Job } from "../src/api/v1/models/jobModel";

jest.mock("../src/api/v1/controllers/jobController", () => ({
  getAllJobs: jest.fn((req, res) => res.status(200).send()),
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
});
