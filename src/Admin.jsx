import { useState, useEffect, useRef } from "react";
import { getImages } from "../helper/utils";
import { storage, config } from "../lib/config";

export const Admin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);
  // const intervalRef = useRef(null);

  useEffect(() => {
    fetchAndSetImages();
    // intervalRef.current = setInterval(fetchAndSetImages, 2000);
    // return () => clearInterval(intervalRef.current);
  }, []);

  const fetchAndSetImages = async () => {
    try {
      const newImages = await getImages();
      console.log(newImages)

      setImages(prev => {
        const prevIds = prev.map(i => i.$id).sort().join(",");
        const newIds = newImages.map(i => i.$id).sort().join(",");
        if (prevIds !== newIds) return newImages;
        return prev;
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };

  const handleDelete = async (imageId) => {
    const confirmed = window.confirm("Delete this image?");
    if (!confirmed) return;

    setDeleting(imageId);
    try {
      await storage.deleteFile(config.bucketId, imageId);
      setImages(prev => prev.filter(img => img.$id !== imageId));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete image.");
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm("Delete all images?");
    if (!confirmed) return;
  
    try {
      setBulkDeleting(true);
      setDeleteProgress(0);
      const all = await getImages();
      const total = all.length;
  
      for (let i = 0; i < total; i++) {
        const img = all[i];
        await storage.deleteFile(config.bucketId, img.$id);
        await new Promise(res => setTimeout(res, 50));
        const progress = Math.round(((i + 1) / total) * 100);
        setDeleteProgress(progress);
      }
  
      setImages([]);
    } catch (err) {
      console.error("Bulk delete failed", err);
      alert("Could not delete all images.");
    } finally {
      setBulkDeleting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 text-gray-800 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-500">Manage uploaded images</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center flex-1 text-lg">
          Loading images...
        </div>
      ) : images.length === 0 ? (
        <div className="flex justify-center items-center flex-1 text-gray-500 text-lg">
          No images found.
        </div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
            {images.map((img) => (
              <div
                key={img.$id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative group"
              >
                <img
                  src={img.previewUrl || ""}
                  alt={img.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{img.name}</p>
                </div>

                <button
                  onClick={() => handleDelete(img.$id)}
                  disabled={deleting === img.$id || bulkDeleting}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100 transition-opacity z-10"
                >
                  {deleting === img.$id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleDeleteAll}
              disabled={bulkDeleting}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors"
            >
              {bulkDeleting
                ? `Deleting... (${deleteProgress}%)`
                : "Delete All Images"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};