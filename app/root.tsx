import {
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
import Menubar from "./component/Menubar";
import NavbarMenu from "./component/NavbarMenu";

export let loader = async ({ request }: any) => {
  const url = new URL(request.url);

  // Ensure it doesn't create a loop
  if (!url.pathname.endsWith("/") && url.pathname !== "/") {
    return redirect(url.pathname + "/");
  }

  return null; // No redirection for paths already ending with "/"
};


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
            <NavbarMenu />
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
