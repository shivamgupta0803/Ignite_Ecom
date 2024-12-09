import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { db } from "~/utils/db.server";

export async function loader() {
  const videos = await db.video.findMany({});
  return json({ videos });
}

export default function VideoGallery() {
  const { videos } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Video Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <video
              className="w-full rounded-t-lg"
              src={video.url}
              controls
              alt={video.title}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700 truncate">
                {video.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
