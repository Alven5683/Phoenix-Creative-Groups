import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "phoenix/media", resource_type: "image" },
        (error, result) => {
          if (error || !result) return reject(error || new Error("Upload failed"));
          resolve({ secure_url: result.secure_url });
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: uploaded.secure_url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
