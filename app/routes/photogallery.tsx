import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/utils/db.server";

export async function loader() {
  const product = await db.product.findMany({});
  console.log(product);
  return json({ product });
}

const photogallery = () => {
  const { product } = useLoaderData<typeof loader>();
  const [imagePopup, setImagePopup] = useState(false);

  const handleImagePopup = () => {
    setImagePopup(true);
  };

  return (
    <>
      <div className="">
        <ul className="">
          {product.map((productImage: any) => (
            <li key={productImage.id} className="p-2">
              <img
                src={productImage.imageUrl}
                alt={productImage.name}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 h-auto rounded-lg object-cover"
                onClick={handleImagePopup}
              />
              {imagePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                    <div className="flex justify-between items-center p-4 border-b bg-indigo-500 text-white">
                      <h2 className="text-lg font-semibold">
                        {productImage.name}
                      </h2>
                      <button
                        className="text-2xl font-semibold cursor-pointer"
                        onClick={() => setImagePopup(false)} // Close the popup on click
                      >
                        &times;
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-center mb-4">
                        <img
                          src={productImage.imageUrl}
                          alt={productImage.name}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default photogallery;
