import { getAllJobs } from "../src/api/v1/services/jobService";
import { getDocuments } from "../src/api/v1/repositories/firestoreRepository";
import { Job } from "src/api/v1/models/jobModel";
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase-admin/firestore";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  getDocuments: jest.fn(),
  createDocument: jest.fn(),
}));

describe("Job Service", () => {
  describe("getAllJobs", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all jobs when the request is successful", async () => {
      const mockDate: Date = new Date();
      const mockDocs: QueryDocumentSnapshot[] = [
        {
          id: "job1",
          data: () =>
            ({
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
              createdAt: mockDate,
              updatedAt: mockDate,
            } as DocumentData),
        } as QueryDocumentSnapshot,
        {
          id: "job2",
          data: () =>
            ({
              title: "frontend developer",
              company: "abc",
              location: "canada",
              url: "http://www.abc.com",
              description:
                "Entry level frontend developer with 1 year experience needed",
              level: "ENTRY LEVEL",
              mode: "FULL TIME",
              stage: "NOT APPLIED",
              date_posted: mockDate,
              active: true,
              createdAt: mockDate,
              updatedAt: mockDate,
            } as DocumentData),
        } as QueryDocumentSnapshot,
      ];

      const mockSnapshot: QuerySnapshot = {
        docs: mockDocs,
      } as QuerySnapshot;

      (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

      const result: Job[] = await getAllJobs();

      expect(getDocuments).toHaveBeenCalledWith("jobs");
      expect(getDocuments).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        id: "job1",
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
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      expect(result[1]).toEqual({
        id: "job2",
        title: "frontend developer",
        company: "abc",
        location: "canada",
        url: "http://www.abc.com",
        description:
          "Entry level frontend developer with 1 year experience needed",
        level: "ENTRY LEVEL",
        mode: "FULL TIME",
        stage: "NOT APPLIED",
        date_posted: mockDate,
        active: true,
        createdAt: mockDate,
        updatedAt: mockDate,
      });
    });
  });
});
