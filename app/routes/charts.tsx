import { LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  return user;
}

const Charts = () => {
  return (
    <div className="p-5">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-48 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://m.media-amazon.com/images/I/61l906x+fZL._AC_SL1500_.jpg"
              alt="product_image"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Product Code: HP67358</p>
              <p className="flex items-center space-x-1">
                4.5
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/?size=100&amp;id=19417&amp;format=png&amp;color=000000"
                  alt="rating"
                />
              </p>
            </div>
            <p className="text-lg font-semibold mb-2">
            </p>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-green-400">$248</p>
              <p className="text-sm line-through text-gray-500">$320</p>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleAddtoCart(
                'JBL Quantum 100 Wired Over-Ear Gaming Headset with a Detachable Voice-Focus Boom Mic, QuantumSOUND Signature, Lightweight Headband, Memory Foam Ear Cushion, PC and Gaming Console Compatible - Black',
                'HP67358'
              )}
            >
              <img
                className="w-4 h-4"
                src="https://img.icons8.com/?size=100&amp;id=9720&amp;format=png&amp;color=000000"
                alt="add to cart"
              />
              Add to cart
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => handleAddtoWishlist(
                'JBL Quantum 100 Wired Over-Ear Gaming Headset with a Detachable Voice-Focus Boom Mic, QuantumSOUND Signature, Lightweight Headband, Memory Foam Ear Cushion, PC and Gaming Console Compatible - Black',
                'HP67358'
              )}
            >
              <img
                className="w-4 h-4"
                src="https://img.icons8.com/?size=100&amp;id=19411&amp;format=png&amp;color=000000"
                alt="wishlist"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;


