import { Job } from "../models/jobModel";
import { getDocuments, createDocument, getDocumentById, deleteDocument, updateDocument } from "../repositories/firestoreRepository";

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
 * @description Get a single job by ID.
 * @param {string} id - The ID of the job to retrieve.
 * @returns {Promise<Job>}
 * @throws {Error} If the job with the given ID is not found.
 */
export const getJobById = async (id: string): Promise<Job> => {
  const doc: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
    COLLECTION,
    id
  );
  if (!doc.exists) {
    throw new Error(`Job with ID ${id} not found`);
  }
  const data: FirebaseFirestore.DocumentData | undefined = doc.data();
  return { id: doc.id, ...data } as Job;
};

/**
 * @description Create a new job.
 * @param {Partial<Job>} job - The job data.
 * @returns {Promise<Job>}
 */
export const createJob = async (
  job: Partial<Job>
): Promise<Job> => {
  const id: string = await createDocument(COLLECTION, job);
  return { id, ...job } as Job;
};

/**
 * @description Update an existing job.
 * @param {string} id - The ID of the job to update.
 * @param {Partial<Job>} job - The updated job data.
 * @returns {Promise<Job>}
 * @throws {Error} If the job with the given ID is not found.
 */
export const updateJob = async (
  id: string,
  job: Partial<Job>
): Promise<Job> => {
    await updateDocument(COLLECTION, id, job);
    return { id, ...job } as Job;
};


/**
 * @description Delete a job.
 * @param {string} id - The ID of the job to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the job with the given ID is not found.
 */
export const deleteJob = async (id: string): Promise<void> => {
  await deleteDocument(COLLECTION, id);
};
