import { ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
  const cart = await db.cart.findMany({
    orderBy: { createdAt: "desc" },
  });
  return json({ cart });
}



export async function action({ request }: ActionFunctionArgs) {
  // const formData = await request.formData();

  // // Parse FormData into an array of structured objects
  // const entries = Array.from(formData.entries());
  // const groupedCart: any[] = [];

  // // Group data into structured array of objects
  // for (const [key, value] of entries) {
  //   const match = key.match(/^products\[(\d+)\]\[(\w+)\]$/);
  //   if (match) {
  //     const [, index, field] = match;
  //     groupedCart[parseInt(index, 10)] = {
  //       ...groupedCart[parseInt(index, 10)],
  //       [field]: value,
  //     };
  //   }
  // }

  // console.log("Parsed Cart Data:", groupedCart);

  // try {
  //   // Iterate over the grouped cart items and process them
  //   for (const item of groupedCart) {
  //     // Create the product in the database (this won't update existing products)
  //     const product = await db.product.create({
  //       data: {
  //         id: item.id, // Assuming you are manually passing the id
  //         name: item.name,
  //         totalPrice: parseFloat(item.totalPrice), // Assuming totalPrice is needed
  //         quantity: parseInt(item.quantity, 10),
  //       },
  //     });

  //     // Create a cart entry for the product
  //     await db.cart.create({
  //       data: {
  //         productId: product.id, // Linking the newly created product
  //         quantity: parseInt(item.quantity, 10), // Quantity in the cart
  //       },
  //     });
  //   }

  //   console.log("Cart and products saved successfully!");
  //   return redirect("/");
  // } catch (error) {
  //   console.error("Error saving cart data:", error);
  //   return json(
  //     { success: false, message: "Error saving cart and products." },
  //     { status: 500 }
  //   );
  // }
  const formData = await request.formData();

  // Convert the FormData into a usable object
  const products: { id: string; name: string; quantity: string; totalPrice: string }[] = [];
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^products\[(\d+)]\[(\w+)]$/); // Regex to match the product keys
    if (match) {
      const index = parseInt(match[1], 10); // Parse the index as a number
      const field = match[2];
      if (!products[index]) {
        products[index] = { id: "", name: "", quantity: "", totalPrice: "" }; // Initialize the product object for the index
      }
      products[index][field as keyof typeof products[number]] = value.toString();
    }
  }

  // Save products to the Cart model
  try {
    await Promise.all(
      products.map((product) => {
        return db.cart.create({
          data: {
            productId: product.id,
            name: product.name,
            quantity: parseInt(product.quantity, 10), 
            totalPrice: Number(product.totalPrice),
          },
        });
      })
    );

    return json({ success: true });
  } catch (error) {
    console.error("Error saving cart data:", error);
    return json({ success: false, error: "Failed to save cart data" }, { status: 500 });
  }
}


export default function Checkout() {
  const { cart } = useLoaderData<typeof loader>();

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Stored Products</h2>
      <table className="w-full text-sm border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product: any) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ₹{(product.totalPrice || 0).toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(product.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

