import { Client, Storage } from "node-appwrite";
import { appWrite } from "./config";

export default async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appWrite.API_ENDPOINT)
    .setKey(appWrite.API_KEY)
    .setProject(appWrite.PROJECT_ID);

  return {
    get storage() {
      return new Storage(client);
    },
  };
}
