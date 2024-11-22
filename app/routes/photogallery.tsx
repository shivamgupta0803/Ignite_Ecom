import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/utils/db.server";

export async function loader() {
  const products = await db.product.findMany({});
  return json({ products });
}

const PhotoGallery = () => {
  const { products } = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePopup = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set the clicked image for the popup
  };

  const closeImagePopup = () => {
    setSelectedImage(null); // Close the popup
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Photo Gallery</h1>

      {/* Responsive Grid for Images */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="relative group">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImagePopup(product.imageUrl)}
            />
            <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-md">
              {product.name}
            </p>
          </li>
        ))}
      </ul>

      {/* Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b bg-indigo-500 text-white">
              <h2 className="text-lg font-semibold">Image Preview</h2>
              <button
                className="text-2xl font-semibold cursor-pointer"
                onClick={closeImagePopup}
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
