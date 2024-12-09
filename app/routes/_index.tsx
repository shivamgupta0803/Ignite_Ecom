import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SearchForm from "~/component/Search";
import ProductsList from "~/component/ProductsList";
import { db } from "~/utils/db.server";
import { Button } from "~/components/ui/button";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const products = await db.product.findMany();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  return json({ products: filteredProducts, query });
}

const Index = () => {
  const { products, query } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex items-center justify-center bg-white">
        {/* <SearchForm query={query} placeholder="Search your products" /> */}
      </div>
      <div className="mb-4 mt-4">
        <ProductsList products={products} />
      </div>
      <div className="check_out-btn flex justify-end">
        <Button>Procced To Checkout</Button>
      </div>
    </>
  );
};

export default Index;
