import { Form } from "@remix-run/react";
import React, { useState } from "react";

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
    <div className="add-video-form">
      <h2>Add Video</h2>
      <Form method="post" encType="multipart/form-data" action="/add_video">
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea name="description" id="description" rows={4} required></textarea>
        </div>
        <div>
          <label htmlFor="videoFile">Upload Video:</label>
          <input
            type="file"
            name="videoFile"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </div>
        {videoPreview && (
          <div className="video-preview">
            <h4>Video Preview:</h4>
            <video controls width="300" src={videoPreview}></video>
          </div>
        )}
        <button type="submit">Upload Video</button>
      </Form>
    </div>
  );
}
