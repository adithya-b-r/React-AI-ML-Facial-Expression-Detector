import { storage, config } from "../lib/config";

const uploadImage = async (imageDataUrl) => {
  try {
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    const file = new File([blob], `snapshot-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    const upload = await storage.createFile(
      config.bucketId,
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

const getImages = async () => {
  try {
    const filesList = await storage.listFiles(config.bucketId);

    const images = filesList.files.map(file => ({
      ...file,
      previewUrl: storage.getFileView(config.bucketId, file.$id).href,
    }));

    return images;
  } catch (error) {
    console.error("❌ Failed to fetch images:", error);
    throw error;
  }
};

const deleteAllFiles = async () => {
  try {
    const filesList = await storage.listFiles(config.bucketId);

    for (const file of filesList.files) {
      await storage.deleteFile(config.bucketId, file.$id);
      console.log(`🗑️ Deleted: ${file.name}`);
      await new Promise(res => setTimeout(res, 100));
    }

    console.log("✅ All files deleted safely.");
  } catch (error) {
    console.error("❌ Deletion failed:", error);
    throw error;
  }
};

export {uploadImage, getImages, deleteAllFiles}