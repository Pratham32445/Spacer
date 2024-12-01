import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    const result = cloudinary.uploader.upload(filePath, {
      folder,
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    return false;
  }
};
