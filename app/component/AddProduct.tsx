import { Form } from "@remix-run/react";
import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  async function clearForm() {
    setName("");
    setPrice("");
    setImage("");
    setContent("");
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <Form
        method="post"
        className="space-y-4"
        action="/admin/addproduct"
        onSubmit={clearForm}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
            <input
              type="text"
              name="name"
              defaultValue={name ? name : ""}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product name"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
            <input
              type="number"
              name="price"
              defaultValue={price ? price : ""}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product price"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
            <input
              type="text"
              name="imageUrl"
              defaultValue={image ? image : ""}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter image URL"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
            <textarea
              name="content"
              defaultValue={content ? content : ""}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product description"
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
  );
}
