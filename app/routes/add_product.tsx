import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  json,
  redirect,
  ActionFunctionArgs,
} from "@remix-run/node";
import { db } from "~/utils/db.server";
import { uploadImage } from "~/utils/cloudinary.server";
import { useSearchParams } from "@remix-run/react";
import AddProduct from "~/component/Form/AddProduct";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
    if (name === "image") {
      try {
        const uploadedImage = await uploadImage(data);
        return uploadedImage.secure_url;
      } catch (error) {
        console.error("Image upload error:", error);
        throw new Error("Image upload failed");
      }
    }
    return undefined;
  }, createMemoryUploadHandler());

  try {
    const formData = await parseMultipartFormData(request, uploadHandler);

    // Extract form data
    const name = formData.get("name");
    const actual_price = formData.get("actual_price");
    const discount_price = formData.get("discount_price");
    const content = formData.get("content");
    const imageUrl = formData.get("image");

    // Validation
    if (!name || !actual_price || !discount_price || !content || !imageUrl) {
      throw new Error("All fields are required.");
    }

    // Save to database
    await db.product.create({
      data: {
        name: name as string,
        actual_price: parseInt(actual_price as string),
        discount_price: parseInt(discount_price as string),
        content: content as string,
        imageUrl: imageUrl as string,
      },
    });

    return redirect("/"); // Redirect with a success query parameter
  } catch (error) {
    console.error("Error processing action:", error);
    return json(
      { success: false, message: error.message || "Failed to create product." },
      { status: 500 }
    );
  }
};

export default function Product() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "true") {
      toast.success("Product added successfully!");
    }
  }, [success]);

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h2>
        <Toaster position="top-right" reverseOrder={false} />
        <AddProduct />
      </div>
    </>
  );
}
