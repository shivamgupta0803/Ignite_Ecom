// CartModal.tsx
import { useCart } from "~/routes/cartcontext";

export default function CartModal() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="mb-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
        Clear Cart
      </button>
    </div>
  );
}
