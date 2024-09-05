import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { authenticator } from "~/utils/auth.server";
import { json } from "stream/consumers";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  return user;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const content = formData.get("content") as string;

  await db.product.create({
    data: {
      name,
      price,
      imageUrl,
      content,
    },
  });

  return { success: true };
};

export default function Product() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const actionData = useActionData();

  // Effect to show success message when action is successful
  useEffect(() => {
    if (actionData && actionData.success) {
      setSuccessMessage("Product submitted successfully!");
      setName(""); // Clear input states
      setPrice(""); // Clear input states
      setImage(""); // Clear input states
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
        {successMessage && (
          <div className="mb-4 p-2 text-green-700 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )}
        <Form
          method="post"
          className="space-y-4"
          action="/admin/addproduct"
          ref={formRef}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product price"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
              <input
                type="text"
                name="imageUrl"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter image URL"
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
                onChange={(e) => {
                  setContent(e.target.value);
                }}
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
