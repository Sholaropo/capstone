jest.mock("../src/api/v1/services/jobService", () => ({
  getAllJobs: jest.fn(),
  createJob: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as jobController from "../src/api/v1/controllers/jobController";
import * as jobService from "../src/api/v1/services/jobService";
import { Job } from "src/api/v1/models/jobModel";

jest.mock("../src/api/v1/services/jobService");

describe("Job Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("getAllJobs", () => {
    it("should handle successful operation", async () => {
      const mockJobs: Partial<Job>[] = [
        {
          id: "1",
          title: "backend developer",
          company: "abc",
          location: "canada",
          url: "http://www.abc.com",
          description:
            "Entry level backend developer with 1 year experience needed",
          level: "ENTRY LEVEL",
          mode: "FULL TIME",
          stage: "NOT APPLIED",
          date_posted: new Date("2025-03-28"),
          active: true,
        },
      ];

      (jobService.getAllJobs as jest.Mock).mockResolvedValue(mockJobs);

      await jobController.getAllJobs(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Jobs Retrieved",
        data: mockJobs,
        status: "success",
      });
    });
  });

  describe("createJob", () => {
    it("should handle successful job creation", async () => {
      const mockDate: Date = new Date();
      const jobData = {
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

      const createdJob = {
        id: "1",
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

      mockReq.body = jobData;
      (jobService.createJob as jest.Mock).mockResolvedValue(createdJob);

      await jobController.createJob(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(jobService.createJob).toHaveBeenCalledWith(jobData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Job Created",
        data: createdJob,
        status: "success",
      });
    });
  });
});
