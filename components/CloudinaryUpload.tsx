"use client";
import { useRef } from "react";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  children?: React.ReactNode;
}

export default function CloudinaryUpload({ onUpload, folder = "phoenix", children }: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    if (folder) formData.append("folder", folder);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) onUpload(data.secure_url);
  }

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-glass border border-glassBorder text-indigo-400 hover:text-white hover:bg-indigo-600/60 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-glassBorder"
        onClick={() => inputRef.current?.click()}
        aria-label="Upload Image"
      >
        {children || "Upload Image"}
      </button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        aria-label="Image file input"
      />
    </>
  );
}
