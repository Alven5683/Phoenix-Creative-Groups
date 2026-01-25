"use client";
import React, { useRef, useState } from "react";

export default function MediaManager() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    // Example: upload to /api/admin/media (should be replaced with your actual upload logic)
    const formData = new FormData();
    formData.append("file", files[0]);
    const res = await fetch("/api/admin/media", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setImages((prev) => [...prev, data.url]);
    setUploading(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Media Library</h2>
      <div className="mb-4">
        <input
          type="file"
          ref={fileInput}
          onChange={handleUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInput.current?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, idx) => (
          <img key={idx} src={url} alt="media" className="w-full h-32 object-cover rounded border" />
        ))}
      </div>
    </div>
  );
}
