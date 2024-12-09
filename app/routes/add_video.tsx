import { cloudinary } from "~/utils/cloudinary";
import { db } from "~/utils/db.server";
import { Readable } from "node:stream";
import { Form } from "@remix-run/react";
import { useState } from "react";


export async function action({ request }: any) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoFile = formData.get("videoFile") as File;

  if (!videoFile) {
    return { error: "Video file is required" };
  }

  try {
    // Convert File to Readable Stream
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    const videoStream = Readable.from(videoBuffer);

    // Upload video to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "videos", // Optional: Folder in Cloudinary
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      videoStream.pipe(uploadStream);
    });

    const videoUrl = (uploadResult as any).secure_url;

    // Save video metadata in the database
    await db.video.create({
      data: {
        title,
        description,
        url: videoUrl,
      },
    });

    return { success: "Video uploaded successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to upload video" };
  }
}


export default function VideoForm() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }
  };

  return (
<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
  <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
      Upload Video
    </h2>
    <Form method="post" encType="multipart/form-data" action="/add_video">
      {/* Title Input */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter video title"
          required
        />
      </div>
      {/* Description Input */}
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter video description"
          required
        ></textarea>
      </div>
      {/* File Upload */}
      <div className="mb-6">
        <label
          htmlFor="videoFile"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Upload Video
        </label>
        <input
          type="file"
          name="videoFile"
          id="videoFile"
          accept="video/*"
          className="w-full text-sm border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 file:font-medium file:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleVideoChange}
          required
        />
      </div>
      {/* Video Preview */}
      {videoPreview && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
          <video
            controls
            className="w-full rounded-md border border-gray-300 shadow-sm"
            src={videoPreview}
          ></video>
        </div>
      )}
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Upload Video
      </button>
    </Form>
  </div>
</div>

  );
}
