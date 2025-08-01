import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  image: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 8,
    },
  })
    .middleware(async () => {
      
      return { userId: "user.id" };
    })
    // Callback exécuté après l'upload
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete, file URL:", file.url);
        console.log("User ID:", metadata.userId);
      } catch (error) {
        console.error("Erreur dans onUploadComplete :", error);
        throw new Error("Erreur lors du traitement du callback");
      }
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;