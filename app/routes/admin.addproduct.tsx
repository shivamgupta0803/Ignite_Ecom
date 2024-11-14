import {
  LoaderFunction,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  json,
  ActionFunctionArgs,
} from "@remix-run/node";
import { db } from "~/utils/db.server";
import { authenticator } from "~/utils/auth.server";
import { uploadImage } from "~/utils/cloudinary.server";
import { useActionData, Form } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";

// export const loader: LoaderFunction = async ({ request }) => {
//   const user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     return redirect("/login");
//   }
//   return user;
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  // Start parsing the form data asynchronously, handling the upload in parallel
  const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
    if (name !== "image") {
      return undefined;
    }
    try {
      const uploadedImage = await uploadImage(data);
      console.log("Uploaded Image:", uploadedImage);
      return uploadedImage.secure_url;
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      throw new Error("Image upload failed");
    }
  }, createMemoryUploadHandler());

  try {
    const formData = await parseMultipartFormData(request, uploadHandler);

    // Extract and validate form data
    const name = formData.get("name");
    const price = parseFloat(formData.get("price")); // Ensure price is a number
    const content = formData.get("content");
    const imageUrl = formData.get("image"); // Cloudinary URL

    if (!name || isNaN(price) || !content || !imageUrl) {
      return json(
        { success: false, error: "Missing required fields or invalid data." },
        { status: 400 }
      );
    }

    // Log received data for debugging
    console.log("FormData received:", { name, price, content, imageUrl });

    // Create product in database
    await db.product.create({
      data: {
        name: name as string,
        price,
        imageUrl: imageUrl as string,
        content: content as string,
      },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Action processing error:", error);
    return json(
      { success: false, error: error.message || "Failed to create product." },
      { status: 500 }
    );
  }
};


export default function Product() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null); // Updated to use File
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const actionData = useActionData();

  // Effect to show success message when action is successful
  useEffect(() => {
    if (actionData && actionData.success) {
      setSuccessMessage("Product submitted successfully!");
      setName("");
      setPrice("");
      setImage(null); // Clear image state
      setContent("");
      formRef.current?.reset(); // Reset the form
    }
  }, [actionData]);

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h2>
        
          <div className="mb-4 p-2 text-green-700 bg-green-100 rounded-md">
            {successMessage}
          </div>
        
        <Form
          method="post"
          className="space-y-4"
          action="/admin/addproduct"
          ref={formRef}
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product name"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
              <input
                type="number"
                step="0.01"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product price"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
              <input
                type="file"
                name="image" // Updated to match action
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImage(file); // Set the File directly
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product description"
                required
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </Form>
      </div>
    </>
  );
}
