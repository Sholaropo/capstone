import { Job } from "../models/jobModel";
import { getDocuments, createDocument } from "../repositories/firestoreRepository";

const COLLECTION: string = "jobs";

/**
 * @description Get all jobs.
 * @returns {Promise<Job[]>}
 */
export const getAllJobs = async (): Promise<Job[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
    COLLECTION
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Job;
  });
};


/**
 * @description Create a new job.
 * @param {Partial<Job>} branch - The job data.
 * @returns {Promise<Job>}
 */
export const createJob = async (
  job: Partial<Job>
): Promise<Job> => {
  const id: string = await createDocument(COLLECTION, job);
  return { id, ...job } as Job;
};