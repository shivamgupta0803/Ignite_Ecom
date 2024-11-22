import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function ProductTable({ products }: { products: any[] }) {
  const [quantities, setQuantities] = useState("");
  const [amounts, setAmounts] = useState<number[]>(products.map(() => 0));
  const [imagePopup, setImagePopup] = useState(false);
  // Update the amount for a specific product
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);

    const newAmounts = [...amounts];
    newAmounts[index] = newQuantity * products[index].discount_price;
    setAmounts(newAmounts);
  };

  // Calculate the total amount
  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);

  const handleImagePopup = () => {
    setImagePopup(true);
  };

  const productsQuantity = [...quantities];
  const totalQuantity = productsQuantity.reduce((acc, curr) => acc + curr, 0);
  // console.log("totalQuantity ::", totalQuantity);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <div className="bg-yellow-200 p-4 mb-4 flex justify-between rounded-lg">
        <div className="font-semibold text-xl text-gray-800">
          Total Products:{" "}
          <span className="bg-white px-4 py-2 rounded-lg">{totalQuantity}</span>
        </div>
        <div className="font-semibold text-xl text-gray-800">
          Overall Total:{" "}
          <span className="bg-white px-4 py-2 rounded-lg">₹{totalAmount}</span>
        </div>
      </div>
      <Table className="w-full text-sm text-left">
        <TableCaption className="text-lg font-semibold pb-4">
          A list of your fireworks products
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-red-500">
            <TableHead className="px-4 py-3 text-white hover:text-red-400">
              Photo
            </TableHead>
            <TableHead className="px-4 py-3 text-white ">Name</TableHead>
            <TableHead className="px-4 py-3 text-white ">Content</TableHead>
            <TableHead className="px-4 py-3 text-white ">
              Actual Price
            </TableHead>
            <TableHead className="px-4 py-3 text-white ">
              Discount Price
            </TableHead>
            <TableHead className="px-4 py-3 text-white ">
              Fill Quantity
            </TableHead>
            <TableHead className="px-4 py-3  text-white text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id} className="hover:bg-yellow-50">
              <TableCell className="px-6" onClick={handleImagePopup}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-28 object-cover rounded-md border"
                />
              </TableCell>
              {imagePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                    <div className="flex justify-between items-center p-4 border-b bg-indigo-500 text-white">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
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
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <TableCell className="px-4 py-3 font-medium text-gray-900 text-xl">
                {product.name}
              </TableCell>
              <TableCell className="px-4 py-3 text-xl  text-gray-700">
                1 Box
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-700 text-xl text-red-500 line-through">
                ₹{product.actual_price.toFixed(2)}
              </TableCell>

              <TableCell className="px-4 py-3 text-gray-700 text-xl">
                ₹{product.discount_price.toFixed(2)}
              </TableCell>
              <TableCell className="px-4 py-3 text-xl">
                <Input
                  type="number"
                  className="w-20 border border-gray-300 rounded-md px-2 py-2 text-2xl"
                  name="fill_quantity"
                  value={quantities[index]}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    handleQuantityChange(index, newQuantity);
                  }}
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-right font-semibold text-gray-800 text-xl">
                ₹{amounts[index].toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-100">
            <TableCell
              colSpan={6}
              className="px-4 py-3 font-semibold text-gray-800 text-2xl"
            >
              Total
            </TableCell>
            <TableCell className="px-4 py-3 text-right font-semibold text-green-600 text-3xl">
              ₹{totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

// import { useState } from "react";
// import { Input } from "~/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~/components/ui/table";

// export default function ProductTable({ products }: { products: any[] }) {
//   const [quantities, setQuantities] = useState<number[]>(products.map(() => 0));
//   const [amounts, setAmounts] = useState<number[]>(products.map(() => 0));
//   const [imagePopup, setImagePopup] = useState<{
//     show: boolean;
//     product?: any;
//   }>({ show: false });

//   const handleQuantityChange = (index: number, newQuantity: number) => {
//     const newQuantities = [...quantities];
//     newQuantities[index] = newQuantity;
//     setQuantities(newQuantities);

//     const newAmounts = [...amounts];
//     newAmounts[index] = newQuantity * products[index].discount_price;
//     setAmounts(newAmounts);
//   };

//   const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
//   const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);

//   return (
//     <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
//       <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 p-4 mb-4 flex justify-between rounded-lg">
//         <div className="font-semibold text-xl text-gray-800">
//           Total Products:{" "}
//           <span className="bg-white px-4 py-2 rounded-lg">{totalQuantity}</span>
//         </div>
//         <div className="font-semibold text-xl text-gray-800">
//           Overall Total:{" "}
//           <span className="bg-white px-4 py-2 rounded-lg">₹{totalAmount}</span>
//         </div>
//       </div>
//       <Table className="w-full text-sm">
//         <TableCaption className="text-lg font-bold text-gray-800">
//           A list of your fireworks products
//         </TableCaption>
//         <TableHeader className="text-white">
//           <TableRow className="bg-red-500 text-white">
//             <TableHead className="px-4 py-3">Photo</TableHead>
//             <TableHead className="px-4 py-3">Name</TableHead>
//             <TableHead className="px-4 py-3">Content</TableHead>
//             <TableHead className="px-4 py-3">Actual Price</TableHead>
//             <TableHead className="px-4 py-3">Discount Price</TableHead>
//             <TableHead className="px-4 py-3">Quantity</TableHead>
//             <TableHead className="px-4 py-3 text-right">Amount</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {products.map((product, index) => (
//             <TableRow key={product.id} className="hover:bg-yellow-200">
//               <TableCell className="px-4 py-3 cursor-pointer">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
//                   onClick={() =>
//                     setImagePopup({ show: true, product: product })
//                   }
//                 />
//               </TableCell>
//               <TableCell className="px-4 py-3 font-medium text-gray-800">
//                 {product.name}
//               </TableCell>
//               <TableCell className="px-4 py-3 text-gray-700">1 Box</TableCell>
//               <TableCell className="px-4 py-3 text-red-500 line-through">
//                 ₹{product.actual_price.toFixed(2)}
//               </TableCell>
//               <TableCell className="px-4 py-3 text-green-500">
//                 ₹{product.discount_price.toFixed(2)}
//               </TableCell>
//               <TableCell className="px-4 py-3">
//                 <Input
//                   type="number"
//                   className="w-20 border border-gray-300 rounded-md px-2 py-2"
//                   value={quantities[index]}
//                   onChange={(e) => {
//                     const newQuantity = Number(e.target.value || 0);
//                     handleQuantityChange(index, newQuantity);
//                   }}
//                 />
//               </TableCell>
//               <TableCell className="px-4 py-3 text-right font-semibold text-gray-800">
//                 ₹{amounts[index].toFixed(2)}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow className="bg-gray-100">
//             <TableCell colSpan={6} className="px-4 py-3 font-bold text-gray-800">
//               Total
//             </TableCell>
//             <TableCell className="px-4 py-3 text-right font-bold text-green-600">
//               ₹{totalAmount.toFixed(2)}
//             </TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//       {imagePopup.show && imagePopup.product && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
//             <div className="flex justify-between items-center p-4 bg-indigo-500 text-white">
//               <h2 className="text-lg font-semibold">
//                 {imagePopup.product.name}
//               </h2>
//               <button
//                 className="text-2xl font-bold"
//                 onClick={() => setImagePopup({ show: false })}
//               >
//                 &times;
//               </button>
//             </div>
//             <img
//               src={imagePopup.product.imageUrl}
//               alt={imagePopup.product.name}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
