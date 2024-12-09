import { useState } from "react";
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
  const [quantities, setQuantities] = useState<number[]>(products.map(() => 0));
  const [amounts, setAmounts] = useState<number[]>(products.map(() => 0));
  const [imagePopup, setImagePopup] = useState<{
    show: boolean;
    product?: any;
  }>({ show: false });

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);

    const newAmounts = [...amounts];
    newAmounts[index] = newQuantity * products[index].discount_price;
    setAmounts(newAmounts);
  };

  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
  const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      <div className="bg-gradient-to-r bg-black p-4 mb-4 flex justify-between rounded-lg">
        <div className="font-semibold  text-white">
          Total Products:{" "}
          <span className="px-2 py-2 rounded-lg">{totalQuantity}</span>
        </div>
        <div className="font-semibold  text-white">
          Overall Total:{" "}
          <span className="px-4 py-2 rounded-lg">₹{totalAmount}</span>
        </div>
      </div>

      <Table className="w-full text-sm">
        <TableCaption className="text-lg font-bold text-gray-800">
          A list of your products
        </TableCaption>
        <TableHeader className="text-white">
          <TableRow className="bg-gray-50 text-white">
            <TableHead className="px-4 py-3">Photo</TableHead>
            <TableHead className="px-4 py-3">Name</TableHead>
            <TableHead className="px-4 py-3">Content</TableHead>
            <TableHead className="px-4 py-3">Actual Price</TableHead>
            <TableHead className="px-4 py-3">Discount Price</TableHead>
            <TableHead className="px-4 py-3">Quantity</TableHead>
            <TableHead className="px-4 py-3 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id} className="hover:bg-slate-50">
              <TableCell className="px-4 py-3 cursor-pointer">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                  onClick={() =>
                    setImagePopup({ show: true, product: product })
                  }
                />
              </TableCell>
              <TableCell className="px-4 py-3 font-medium text-gray-800">
                {product.name}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-700">1 Box</TableCell>
              <TableCell className="px-4 py-3 text-red-500 line-through">
                ₹{product.actual_price.toFixed(2)}
              </TableCell>
              <TableCell className="px-4 py-3 text-green-500">
                ₹{product.discount_price.toFixed(2)}
              </TableCell>
              <TableCell className="px-4 py-3">
                <Input
                  type="number"
                  className="w-20 border border-gray-300 rounded-md px-2 py-2"
                  value={quantities[index]}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value || 0);
                    handleQuantityChange(index, newQuantity);
                  }}
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-right font-semibold text-gray-800">
                ₹{amounts[index].toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-100">
            <TableCell
              colSpan={6}
              className="px-4 py-3 font-bold text-gray-800"
            >
              Total
            </TableCell>
            <TableCell className="px-4 py-3 text-right font-bold text-green-600">
              ₹{totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Image Popup Modal */}
      {imagePopup.show && imagePopup.product && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center p-4 bg-indigo-500 text-white">
              <h2 className="text-lg font-semibold">
                {imagePopup.product.name}
              </h2>
              <button
                className="text-2xl font-bold"
                onClick={() => setImagePopup({ show: false })}
              >
                &times;
              </button>
            </div>
            <img
              src={imagePopup.product.imageUrl}
              alt={imagePopup.product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
