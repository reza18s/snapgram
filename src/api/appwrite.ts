import { Client, Account, Avatars, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  savesCollectionsId: import.meta.env.VITE_APPWRITE_SAVES_ID,
  dataBaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionsId: import.meta.env.VITE_APPWRITE_USERS_ID,
  postCollectionsId: import.meta.env.VITE_APPWRITE_POSTS_ID,
  mediaBucketsId: import.meta.env.VITE_APPWRITE_MEDIA_ID,
};

const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);
export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
