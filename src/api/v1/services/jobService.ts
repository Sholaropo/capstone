import { Job } from "../models/jobModel";
import { getDocuments } from "../repositories/firestoreRepository";

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
