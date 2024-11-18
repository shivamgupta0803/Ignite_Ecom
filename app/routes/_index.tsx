import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DataTables from "~/component/DataTables";
import ProductsList from "~/component/ProductsList";
import { db } from "~/utils/db.server";

export async function loader() {
  const product = await db.product.findMany({});
  return json({ product });
}
  
const Index = () => {
  const { product } = useLoaderData<typeof loader>();
  return (
    <>
    <div className="mb-4 mt-4"> 
      <ProductsList products={product} />
    </div>
    </>
  );
};

export default Index;
