import { Client, Account, Databases, Storage } from "appwrite";

export const config = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  userDetailsId: import.meta.env.VITE_APPWRITE_USER_DETAILS_ID,
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId);

const storage = new Storage(client);

export { client, storage };