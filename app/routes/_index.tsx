import { useEffect, useState } from "react";
import {
  Form,
  json,
  Link,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { db } from "~/utils/db.server";
import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import Swal from "sweetalert2";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const products = await db.product.findMany();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  if (filteredProducts.length == 0) {
    return products;
  }
  return json({ products: filteredProducts, query, user });
};

export default function Index() {
  const { products, query } = useLoaderData<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [sidebarRightCollapsed, setSidebarRightCollapsed] = useState(false);
  const [cartValue, setCartValue] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    Swal.fire("Ignite is working!");
  }, []);

  const toggleRightSidebar = () => {
    setSidebarRightCollapsed(!sidebarRightCollapsed);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  function createCart(product: any) {
    if (!cartArray.includes(product)) {
      const updatedCartArray = [...cartArray, product];
      setCartArray(updatedCartArray);
      const cartItem = JSON.stringify(updatedCartArray);
      localStorage.setItem("Cart", cartItem);
      const newCart = localStorage.getItem("Cart");
      const parsedCart = newCart ? JSON.parse(newCart) : [];
      const prices = parsedCart.map((item: any) => item.price);

      setTotalPrice(prices);
      setCartValue(parsedCart);
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name} Added To Your Cart`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const cartTotal = totalPrice.reduce((acc, curr) => acc + curr, 0);

  const removeFromCart = (id: string) => {
    const updatedCart = cartValue.filter((item: any) => item.id !== id);
    setCartValue(updatedCart);

    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      {" "}
      <div className="flex min-h-screen text-black bg-gray-100">
        <aside
          className={`fixed top-0 left-0 h-full bg-blue-900 text-white p-4 transition-transform duration-300 ${
            sidebarCollapsed ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute -right-6 top-14 bg-blue-500 text-white p-2 rounded-full transition-transform duration-300"
          >
            {sidebarCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            )}
          </button>

          <div className="bg-red-300 rounded-full">
            <div className="flex items-center text-white hover:bg-red-400 rounded p-2 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span>Hello </span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <Link
              to="#"
              className="flex items-center text-white hover:bg-gray-400 px-4 py-2 rounded w-full text-center"
              data-tooltip="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
              Home
            </Link>
            <Link
              to="#"
              className="flex items-center text-white hover:bg-gray-400 px-4 py-2 rounded w-full text-center"
              data-tooltip="About"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" />
              </svg>
              About
            </Link>
            <Link
              to="#"
              className="flex items-center text-white hover:bg-gray-400 px-4 py-2 rounded w-full text-center"
              data-tooltip="Services"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-wrench-adjustable"
                viewBox="0 0 16 16"
              >
                <path d="M16 4.5a4.5 4.5 0 0 1-1.703 3.526L13 5l2.959-1.11q.04.3.041.61" />
                <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.5 4.5 0 0 0 11.5 9m-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376M3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
              </svg>
              Services
            </Link>
            <Link
              to="#"
              className="flex items-center text-white hover:bg-gray-400 px-4 py-2 rounded w-full text-center"
              data-tooltip="Portfolio"
            >
              <span className="fa-solid fa-gear mr-2"></span>Portfolio
            </Link>
            <Link
              to="#"
              className="flex items-center text-white hover:bg-gray-400 px-4 py-2 rounded w-full text-center"
              data-tooltip="Contact"
            >
              <span className="fa-solid fa-gear mr-2"></span>Contact
            </Link>
          </div>
        </aside>

        {/* right  sidebar */}

        <aside
          className={`fixed top-0 right-0 w-96 h-full bg-gray-300 text-black p-4 transition-transform duration-300 ${
            sidebarRightCollapsed ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleRightSidebar}
            className="absolute -left-6 top-14 bg-blue-500 text-white p-2 rounded-full transition-transform duration-300"
          >
            {sidebarRightCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            )}
          </button>

          {/* <div className="bg-red-300 rounded-full"></div> */}

          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto ">
            <h2 className="text-xl font-semibold border-b pb-4 mb-4">
              Shopping Cart
            </h2>
            <Form method="post" action="/payment/success">
              <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {cartValue.length > 0 ? (
                  cartValue.map((item: any, index: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4 mb-4"
                    >
                      <input
                        type="hidden"
                        name="cartData"
                        value={JSON.stringify(cartValue)}
                      />
                      <input
                        type="hidden"
                        name="totalPrice"
                        value={JSON.stringify(cartTotal)}
                      />
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {index + 1}. {item.name}
                          </p>
                          <button
                            className="text-sm text-blue-500 hover:underline mt-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-gray-800">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Your cart is empty.</p>
                )}
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md p-3 mt-6 transition-colors duration-300 ease-in-out">
                Place Order
              </button>
            </Form>
          </div>
        </aside>

        <section className="flex-1 transition-all duration-300">
          <main className="bg-white p-8 rounded-lg shadow-lg">
            <section className="hero-banner bg-blue-800 text-white p-8 rounded-lg shadow-md">
              <h1 className="text-5xl font-bold">Welcome to Our Store!</h1>
              <p className="mt-4 text-lg">
                Discover amazing products at great prices.
              </p>
              <Link
                to={"#shop"}
                className="mt-6 inline-block bg-white text-blue-800 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300"
              >
                Shop Now
              </Link>
            </section>

            <div className="container mx-auto py-4 " id="shop">
              <h2 className="text-3xl font-bold mb-8">Our Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    {/* <p className="text-gray-700 mb-2">{product.content}</p> */}
                    <div className="flex justify-between">
                      <p className="text-lg font-bold text-blue-800">
                        ₹{product.price.toFixed(2)}{" "}
                      </p>
                      <Link to={`/productdetails/${product.id}`}>
                        <svg
                          className="svg-icon w-5 h-5"
                          // style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M80.65686 1024c-44.460923 0-80.629135-36.068299-80.629134-80.42931v-862.24217C0.027726 36.967509 36.195937 0.89921 80.65686 0.89921h787.108206C912.225989 0.89921 948.3942 36.967509 948.3942 81.32852v416.533906c0 16.085862-13.188409 29.274271-29.374182 29.27427s-29.374183-13.088496-29.374183-29.27427V81.32852c0-12.189287-9.891306-22.080593-22.080594-22.080593H80.65686c-12.189287 0-22.080593 9.891306-22.080593 22.080593v862.24217c0 12.189287 9.891306 22.080593 22.080593 22.080593l364.17992-1.099034c16.185774 0 29.374183 13.088496 29.374183 29.274271 0 16.085862-13.188409 29.174358-29.374183 29.174358l-364.17992 0.999122z"
                            fill="#FFC64B"
                          />
                          <path
                            d="M156.889859 774.819007c-16.185774 0-29.374183-13.088496-29.374183-29.274271 0-16.085862 13.188409-29.274271 29.374183-29.274271h270.162552c16.185774 0 29.374183 13.088496 29.374183 29.274271 0 16.085862-13.188409 29.274271-29.374183 29.274271H156.889859zM156.889859 541.723876c-16.185774 0-29.374183-13.088496-29.374183-29.274271 0-16.085862 13.188409-29.274271 29.374183-29.274271h458.197287c16.185774 0 29.374183 13.088496 29.374183 29.274271 0 16.085862-13.188409 29.274271-29.374183 29.274271H156.889859zM156.889859 308.628744c-16.185774 0-29.374183-13.088496-29.374183-29.27427 0-16.085862 13.188409-29.274271 29.374183-29.274271h586.28471c16.185774 0 29.374183 13.088496 29.374183 29.274271 0 16.085862-13.188409 29.274271-29.374183 29.27427H156.889859zM582.016212 977.740658l72.036687-71.836863c-4.496048-17.584545-10.191043-50.455654-5.095522-89.521319 6.694116-51.055127 29.574007-96.315348 67.940287-134.581715C818.708182 580.389892 993.054948 568.500341 1000.44845 568.100693l1.39877-0.099912c11.989462-0.799297 21.980681 9.191921 21.181384 21.181383l-0.099912 1.298859c-0.499561 7.393502-12.489023 181.340619-114.099717 282.651575-57.649332 57.449507-122.392429 69.538882-166.653528 69.538882-24.578398 0-44.76066-3.596839-58.148892-6.893941l-72.136599 71.936775c-8.292711 8.292711-21.680944 8.292711-29.973656 0-8.192799-8.292711-8.192799-21.680944 0.099912-29.973656zM720.794239 899.209679c7.193677 0.699385 14.287443 1.099034 21.481121 1.099034 36.168212 0 89.221583-9.891306 136.579959-57.149771 63.144502-62.944678 87.622988-161.458093 96.814908-216.509708 1.099034-6.794029-4.695873-12.588936-11.489901-11.489901-55.251439 9.191921-154.264416 33.670407-217.209094 96.515172-55.651088 55.451264-60.047224 119.195239-56.150649 157.561518l107.105864-106.806127c8.292711-8.292711 21.680944-8.292711 29.973656 0s8.292711 21.680944 0 29.973656L720.794239 899.209679z"
                            fill="#212121"
                          />
                        </svg>
                      </Link>
                    </div>
                    <button
                      className="bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all duration-300 w-full"
                      onClick={(e) => {
                        createCart(product);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
}
