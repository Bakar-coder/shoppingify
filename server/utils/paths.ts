import { FileUpload } from "../context";
import { randStr } from "./randomStringGenerator";

export const filePaths = ["media/images", "media/videos", "media/docs"];
export const paths = async (file: FileUpload): Promise<string | null> => {
  const { mimetype, filename } = await file;
  const [fileType] = mimetype.split("/");

  const mediaPath =
    fileType === "image"
      ? `media/images/${randStr}_${filename}`
      : fileType === "video"
      ? `media/videos/${randStr}_${filename}`
      : fileType === "application"
      ? `media/${randStr}_${filename}`
      : null;

  return new Promise((resolve) =>
    mediaPath ? resolve(mediaPath) : resolve(null)
  );
};
