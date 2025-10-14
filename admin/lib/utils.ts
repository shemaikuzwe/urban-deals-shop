import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { appWrite } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createFileUrl = (bucketFileId: string) => {
  return `${appWrite.API_ENDPOINT}/storage/buckets/${appWrite.BUCKET_ID}/files/${bucketFileId}/view?project=${appWrite.PROJECT_ID}`;
};

export const getFileId = (url: string) => {
  return url.split("/files/")[1].split("/")[0];
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
