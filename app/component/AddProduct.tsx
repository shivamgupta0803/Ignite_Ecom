import { Label } from "@radix-ui/react-dropdown-menu";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";

export default function AddProduct() {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <Form method="post" className="space-y-4" action="/admin/addproduct">
        <div>
          <Label >Accept terms and conditions</Label>
          <Input type="t" placeholder="Email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
            <input
              type="text"
              name="imageUrl"
              required
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product description"
            ></textarea>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Actual Price
            <input
              type="number"
              name="actual_price"
              required
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter actual price"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Price
            <input
              type="number"
              name="discount_price"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter discount price"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fill Quantity
            <input
              type="number"
              name="fill_quantity"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter fill quantity"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Quantity
            <input
              type="number"
              name="total"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter total quantity"
            />
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
