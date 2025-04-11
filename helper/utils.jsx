import { storage, config } from "../lib/config";

export const uploadImageToAppwrite = async (imageDataUrl) => {
  try {
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    const file = new File([blob], `snapshot-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    const upload = await storage.createFile(
      "67f93ea3002e68a51140", // or config.bucketId if you prefer
      "unique()",
      file
    );

    // console.log("✅ Image uploaded:", upload);
    return upload;
  } catch (error) {
    // console.error("❌ Upload failed:", error);
    throw error;
  }
};
