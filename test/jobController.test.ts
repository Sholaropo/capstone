jest.mock("../src/api/v1/services/jobService", () => ({
  getPaginatedJobs: jest.fn(),
  createJob: jest.fn(),
  getJobById: jest.fn(),
  deleteJob: jest.fn(),
  updateJob: jest.fn(),
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
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("getPaginatedJobs", () => {
     it("should handle successful pagination operation", async () => {
    const paginatedReq = {
      ...mockReq,
      query: {
        page: "2",
        limit: "10"
      }
    };
    
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

    const mockPaginationResult = {
      jobs: mockJobs,
      total: 15
    };
    
    (jobService.getPaginatedJobs as jest.Mock).mockResolvedValue(mockPaginationResult);

    await jobController.getAllJobs(
      paginatedReq as unknown as Request,
      mockRes as Response,
      mockNext
    );

    const expectedPaginationMeta = {
      total: 15,
      page: 2,
      limit: 10,
      totalPages: 2
    };

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "success",
      message: "Jobs Retrieved",
      data: mockJobs,
      metadata: expectedPaginationMeta
    });
    
    expect(jobService.getPaginatedJobs).toHaveBeenCalledWith(2, 10);
  });
  });

  describe("getJobById", () => {
    it("should handle successful operation", async () => {
      const mockJob = {
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
      };
      mockReq.params = { id: "1" };

      (jobService.getJobById as jest.Mock).mockResolvedValue(mockJob);

      await jobController.getJobById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Job Retrieved",
        data: mockJob,
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

  describe("deleteJob", () => {
    it("should handle successful job deletion", async () => {
      const jobId = "1";
      mockReq.params = { id: jobId };

      (jobService.deleteJob as jest.Mock).mockResolvedValue(undefined);

      await jobController.deleteJob(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(jobService.deleteJob).toHaveBeenCalledWith(jobId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe("updateJob", () => {
    it("should handle successful job update", async () => {
      const jobId = "1";
      const updateData = {
        title: "fullstack developer",
        company: "abc",
        location: "canada",
        url: "http://www.abc.com",
        description:
          "Entry level fullstack developer with 1 year experience needed",
        level: "ENTRY LEVEL",
        mode: "FULL TIME",
        stage: "NOT APPLIED",
        date_posted: "2025-03-28T00:00:00.000Z",
        active: true,
      };

      const updatedJob = {
        id: jobId,
        ...updateData,
      };

      mockReq.params = { id: jobId };
      mockReq.body = updateData;

      (jobService.updateJob as jest.Mock).mockResolvedValue(updatedJob);

      await jobController.updateJob(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(jobService.updateJob).toHaveBeenCalledWith(jobId, updateData);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Job Updated",
        data: updatedJob,
        status: "success",
      });
    });
  });
});
