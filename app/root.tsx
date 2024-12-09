import {
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import AppSidebar from "~/component/main/Sidebar";
import Navbar from "~/component/Navbar";
import { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "./utils/db.server";

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



export default function Layout() {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="hidden md:block w-64">
            <AppSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar />
            {/* Page Content */}
            <main className="flex-1 p-1 bg-gray-50">
              <Outlet />
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
