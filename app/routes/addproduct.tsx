import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  json,
  ActionFunctionArgs,
} from "@remix-run/node";
import { db } from "~/utils/db.server";
import { uploadImage } from "~/utils/cloudinary.server";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

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
    const actual_price = formData.get("actual_price");
    const discount_price = formData.get("discount_price");
    const content = formData.get("content");
    const imageUrl = formData.get("image"); // Cloudinary URL

    // Log received data for debugging
    // console.log("FormData received:", {
    //   name,
    //   actual_price,
    //   discount_price,
    //   content,
    //   imageUrl,
    // });

    // Create product in database
    await db.product.create({
      data: {
        name: name as string,
        actual_price: parseInt(actual_price),
        discount_price: parseInt(discount_price),
        content: content as string,
        imageUrl: imageUrl as string,
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
  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h2>
        <Form
          method="post"
          className="space-y-4"
          action="addproduct"
          encType="multipart/form-data"
        >
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter product name..."
            />
          </div>
          <div className="">
            <Label>Actual Price</Label>
            <Input
              type="text"
              name="actual_price"
              placeholder="Enter Actual Price..."
            />
          </div>
          <div className="">
            <Label>Discount Price</Label>
            <Input
              type="text"
              name="discount_price"
              placeholder="Enter Discount Price..."
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea name="content" placeholder="Type your message here." />
          </div>

          <div>
            <Label>Photo</Label>
            <Input type="file" name="image" placeholder="Add Image..." />
          </div>
          <Button>Submit</Button>
        </Form>
      </div>
    </>
  );
}
