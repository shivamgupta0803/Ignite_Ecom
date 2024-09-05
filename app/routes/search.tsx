import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { db } from "~/utils/db.server";

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

export default function Search() {
  const { products, query } = useLoaderData<any>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {/* Styled Search Form */}
      <div className="flex items-center h-screen justify-center bg-white">
        <Form
          method="get"
          className="flex w-72 mx-7 lg:max-w-[500px] rounded-full border-gray-400 border-opacity-65 border bg-gray-100 px-2"
        >
          <input
            type="text"
            name="q"
            className="flex w-full bg-transparent px-3 text-gray-700 rtl:text-right outline-0"
            placeholder="Search your products"
            value={query}
            onChange={(e) => setSearchParams({ q: e.target.value })}
          />

          <div className="border-gray-400 border-opacity-70 my-1 border-l "></div>

          <button
            type="submit"
            className="relative rounded-full bg-transparent px-2 py-3"
          >
            <svg
              className="fill-none size-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </Form>
      </div>

      {/* Display search results */}
      <div className="mt-5 text-center">
        {products && products.length > 0 ? (
          products.map((product:any) => <div key={product.id}>{product.name}</div>)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}
