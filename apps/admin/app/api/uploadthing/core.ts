import { getSession } from "@urban-deals-shop/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: (error) => {
    throw new UploadThingError(error.message);
  },
});
const auth = (req: Request) => {
  const user = getSession();
  return user;
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 3,
    },
    text: {
      maxFileSize: "2MB",
      maxFileCount: 3,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth(req);
      const userId = session?.user?.id;
      if (!userId)
        throw new UploadThingError("Please login to upload attachments.");
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
