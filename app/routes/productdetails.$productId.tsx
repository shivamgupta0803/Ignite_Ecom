import { json, Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useState } from "react";
import { db } from "~/utils/db.server";
import { authenticator } from "~/utils/auth.server";

export const loader = async ({ params, request }: { params: LoaderFunctionArgs }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return json({ product });
};

export default function ProductDetails() {
  const { product } = useLoaderData<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="container mx-auto py-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Back To Shop
        </Link>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-4xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-800 mb-4">{product.content}</p>
          <p className="text-2xl font-semibold text-blue-700 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={openModal}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-2xl font-semibold mb-4">Confirm Add To Cart</h2>
            <div className="flex">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-36 h-24 object-cover mb-4 rounded-lg"
              />
              {"  "} {product.name}   {"  "} ₹ {product.price}
            </div> 
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => {
                  // Handle Add to Cart logic here
                  closeModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
