import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough, Readable } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect, json as json$1, writeAsyncIterableToWritable, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { RemixServer, Link, useSearchParams, Form, Meta, Links, Outlet, ScrollRestoration, Scripts, json, useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Home, LayoutDashboard, Calendar, Search as Search$1, Settings, ListPlus, Facebook, Instagram } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import nodemailer from "nodemailer";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { v2 } from "cloudinary";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive from "@radix-ui/react-label";
import toast, { Toaster } from "react-hot-toast";
const welcome$1 = "Welcome to our application!";
const home$1 = "Home";
const about$1 = "About Us";
const contact$1 = "Contact Us";
const enTranslation = {
  welcome: welcome$1,
  home: home$1,
  about: about$1,
  contact: contact$1
};
const welcome = "हमारे एप्लिकेशन में आपका स्वागत है!";
const home = "मुखपृष्ठ";
const about = "हमारे बारे में";
const contact = "संपर्क करें";
const hiTranslation = {
  welcome,
  home,
  about,
  contact
};
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    hi: { translation: hiTranslation }
  },
  fallbackLng: "en",
  // Default language
  detection: {
    order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
    caches: ["cookie"]
  },
  interpolation: {
    escapeValue: false
    // React already does escaping
  }
});
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  i18n.changeLanguage(getPreferredLanguage());
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function getPreferredLanguage(request) {
  return "en";
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const items = [
  {
    header: "Main Menu",
    submenu: [
      {
        title: "Home",
        url: "/",
        icon: Home
      },
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Calendar",
        url: "",
        icon: Calendar
      },
      {
        title: "Search",
        url: "/search",
        icon: Search$1
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings
      }
    ]
  },
  {
    header: "Add Lists",
    submenu: [
      {
        title: "Add Product",
        url: "/add_product",
        icon: ListPlus
      },
      {
        title: "Add Video",
        url: "/add_video",
        icon: ListPlus
      }
    ]
  }
];
const AppSidebar = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 text-gray-900 w-64 h-screen fixed left-0 top-0 z-10 flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-16 bg-white shadow-md", children: /* @__PURE__ */ jsx("img", { src: "HeadingLogo.png", alt: "Logo", className: "w-48 h-12" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: items.map((group, groupIndex) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-md font-semibold bg-gray-900 text-white py-2 px-4 border-b border-gray-300", children: group.header }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: group.submenu.map((item, itemIndex) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.url,
          className: "flex items-center space-x-3 py-2 px-4 text-gray-700 hover:bg-gray-300 hover:text-gray-900 rounded-md transition",
          children: [
            /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: item.title })
          ]
        }
      ) }, itemIndex)) })
    ] }, groupIndex)) })
  ] });
};
function Navbar({ query, placeholder = "Search..." }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("header", { className: "bg-gradient-to-r bg-gray-100 p-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: "ml-4 text-black text-lg font-bold", children: "Gupta Fireworks" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        method: "get",
        className: "flex  lg:max-w-[500px] rounded-lg border-gray-400 border-opacity-65 border bg-gray-100 px-2",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "q",
              className: "flex w-full bg-transparent px-3 text-gray-700 rtl:text-right outline-0",
              placeholder,
              value: query,
              onChange: (e) => setSearchParams({ q: e.target.value })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "border-gray-400 border-opacity-70 my-1 border-l" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "relative rounded-full bg-transparent px-2 py-3",
              children: "🔍"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-6 text-black", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 2,
            stroke: "currentColor",
            className: "w-5 h-5",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "+91 9967667099" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 2,
            stroke: "currentColor",
            className: "w-5 h-5",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "shivamgupta08032001@gmail.com" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex gap-4", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "https://www.facebook.com",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Facebook",
          children: /* @__PURE__ */ jsx(Facebook, { size: 30, className: "text-blue-600" })
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "https://www.instagram.com",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Instagram",
          children: /* @__PURE__ */ jsx(Instagram, { size: 30, className: "text-red-300" })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://www.whatsapp.com",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "WhatsApp",
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              className: "w-8 h-8 text-green-500",
              viewBox: "0 0 16 16",
              children: /* @__PURE__ */ jsx("path", { d: "M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" })
            }
          )
        }
      )
    ] })
  ] }) }) });
}
let db;
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
  db.$connect();
} else {
  if (!global._db) {
    global._db = new PrismaClient();
    global._db.$connect();
  }
  db = global._db;
}
async function loader$6({ request }) {
  var _a;
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const query = ((_a = searchParams.get("q")) == null ? void 0 : _a.toLowerCase()) || "";
  const products = await db.product.findMany();
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(query)
  );
  return json({ products: filteredProducts, query });
}
function Layout() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "h-full bg-gray-100", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:block w-64", children: /* @__PURE__ */ jsx(AppSidebar, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx(Navbar, {}),
          /* @__PURE__ */ jsx("main", { className: "flex-1 p-1 bg-gray-50", children: /* @__PURE__ */ jsx(Outlet, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bloggieapp@gmail.com",
    pass: "fthqtorropvylczy"
  }
});
const sendEmailService = async (to, subject, text) => {
  const mailOptions = {
    subject,
    html: text
  };
  const sendToRecipient = async (email) => {
    await transporter.sendMail({ ...mailOptions, to: email });
  };
  await Promise.all(to.map(sendToRecipient));
};
let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["dfgsrtg"],
    secure: process.env.NODE_ENV === "production"
  }
});
const authenticator = new Authenticator(sessionStorage);
const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email");
  const password = form.get("password");
  const user = await db.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    throw new AuthorizationError("User doesn't exist");
  }
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );
  if (!passwordMatch) throw new AuthorizationError("invalid credentials");
  return user;
});
authenticator.use(formStrategy, "form");
const PaymentSuccess = () => {
  useLoaderData();
  useEffect(() => {
    setTimeout(() => {
      Swal.fire({
        title: "Your Order Was Placed!",
        text: "Thank you for order!",
        icon: "success"
      });
    }, 2e3);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "h-[90vh] flex flex-col items-center justify-center overflow-hidden w-full", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-6 mg:mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h3", { className: "md:text-2xl text-base text-gray-900 font-semibold", children: "Your order was successful" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 my-2", children: "Thank you for your order." }),
    /* @__PURE__ */ jsx("p", { className: "text-center", children: "Have a good day!" }),
    /* @__PURE__ */ jsx("div", { className: "py-10 text-center", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "px-12 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold py-3",
        children: "Go to homepage"
      }
    ) })
  ] }) }) });
};
async function action$3({ request }) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const userData = await db.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true }
  });
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const items2 = values.cartData;
  const itemsArray = JSON.parse(items2);
  const totalPrice = values.totalPrice;
  console.log("this is totalPrice::", totalPrice);
  const itemListText = `
<div style="width: 100%; height: 100%; padding-top: 12px; background-color: #e5e7eb;">
  <div style="position: relative; overflow: hidden; background-size: cover; background-repeat: no-repeat; background-position: center; background-attachment: fixed; width: 100%; height: 350px; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); background-image: url('http://michaeltruong.ca/images/invoicebg.jpg');"></div>
  <div style="position: relative; margin: auto; margin-top: -290px; width: 700px; background-color: #ffffff; box-shadow: 0 0 15px rgba(0,0,0,0.1);">
    <!-- Invoice Top Section -->
    <div style="display: flex; justify-content: space-between; padding: 32px; border-bottom: 1px solid #d1d5db;">
      <div style="display: flex; align-items: center;">
        <div style="width: 60px; height: 60px; background-image: url('http://michaeltruong.ca/images/logo1.png'); background-size: cover;"></div>
        <div style="margin-left: 16px;">
          <h2 style="font-size: 20px; font-weight: bold;">Shivam Gupta</h2>
          <p style="font-size: 14px; color: #6b7280;">
            shivamgupta08032001@gmail.com <br />
           9967667099
          </p>
        </div>
      </div>
      <div style="text-align: right;">
        <h1 style="font-size: 24px; font-weight: 600;">Invoice #1069</h1>
        <p style="font-size: 14px; color: #6b7280;">
          Issued: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}<br />
          Payment Due: Within 30 Days, 2024
        </p>
      </div>
    </div>

    <!-- Invoice Middle Section -->
    <div style="display: flex; justify-content: space-between; padding: 32px; border-bottom: 1px solid #d1d5db;">
      <div style="display: flex; align-items: center;">
        <div style="width: 60px; height: 60px; background-image: url('http://michaeltruong.ca/images/client.jpg'); background-size: cover; border-radius: 50%;"></div>
        <div style="margin-left: 16px;">
            <tr style="border: 1px solid #d1d5db;">
           <h2 style="font-size: 20px; font-weight: bold;">${userData == null ? void 0 : userData.name}</h2>
          <p style="font-size: 14px; color: #6b7280;">${userData == null ? void 0 : userData.email}</p>
            <p style="font-size: 14px; color: #6b7280;">555-555-5555</p>
          </tr>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; width: 50%; margin-left: auto;">
        <h2 style="font-size: 18px; font-weight: 600;">Project Description</h2>
        <p style="font-size: 14px; color: #6b7280;">
          Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim, at elementum enim quam vel purus. Curabitur semper malesuada urna ut suscipit.
        </p>
      </div>
    </div>

    <!-- Invoice Bottom Section -->
    <div style="padding: 32px; border-bottom: 1px solid #d1d5db;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">Item</th>
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">price</th>
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">Quantity</th>
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">Amount</th>
          </tr>
        </thead>
        <tbody>
        ${itemsArray.map(
    (item) => `
            <tr style="border: 1px solid #d1d5db;">
            <td style="padding: 8px;">${item.name}</td>
            <td style="padding: 8px;">₹${item.price}</td>
            <td style="padding: 8px;">₹${item.quantity}</td>
            <td style="padding: 8px;">₹${item.amount}</td>
          </tr>`
  ).join("")}
          <tr style="border: 1px solid #d1d5db;">
            <td style="padding: 8px;">Tax</td>
            <td style="padding: 8px;">GST</td>
            <td style="padding: 8px;">18%</td>
            <td style="padding: 8px;">$419.25</td>
          </tr>
          <tr style="border: 1px solid #d1d5db; background-color: #f3f4f6;">
            <td></td>
            <td></td>
            <td style="padding: 8px; font-weight: 600; text-align: right;">Total</td>
            <td style="padding: 8px; font-weight: 600;">${totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PayPal Button and Legal Notice -->
    <div style="display: flex; justify-content: space-between; padding: 32px;">
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="QRZ7QTM9XRPJ6" />
        <input type="image" src="http://michaeltruong.ca/images/paypal.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
      </form>

      <div style="margin-top: 32px;">
        <p style="font-size: 12px; color: #6b7280;">
          <strong>Thank you for your business!</strong> Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
        </p>
      </div>
    </div>
  </div>
</div>
`;
  const recipients = ["bloggieapp@gmail.com", "sundaram6060@gmail.com"];
  setTimeout(async () => {
    await sendEmailService(
      recipients,
      "Diwali Fire Product List",
      itemListText
    );
  }, 2e3);
  return redirect("/payment/success");
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: PaymentSuccess
}, Symbol.toStringTag, { value: "Module" }));
const navigationbar = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative z-40 lg:hidden",
        role: "dialog",
        "aria-modal": "true",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "fixed inset-0 bg-black bg-opacity-25",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40 flex", children: /* @__PURE__ */ jsxs("div", { className: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl", children: [
            /* @__PURE__ */ jsx("div", { className: "flex px-4 pb-2 pt-5", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute -inset-0.5" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close menu" }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "h-6 w-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "-mb-px flex space-x-8 px-4",
                  "aria-orientation": "horizontal",
                  role: "tablist",
                  children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        id: "tabs-1-tab-1",
                        className: "flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900",
                        "aria-controls": "tabs-1-panel-1",
                        role: "tab",
                        type: "button",
                        children: "Women"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        id: "tabs-1-tab-2",
                        className: "flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900",
                        "aria-controls": "tabs-1-panel-2",
                        role: "tab",
                        type: "button",
                        children: "Men"
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  id: "tabs-1-panel-1",
                  className: "space-y-10 px-4 pb-8 pt-10",
                  "aria-labelledby": "tabs-1-tab-1",
                  role: "tabpanel",
                  tabIndex: "0",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "group relative text-sm", children: [
                        /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                            alt: "Models sitting back to back, wearing Basic Tee in black and bone.",
                            className: "object-cover object-center"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs(
                          "a",
                          {
                            href: "#",
                            className: "mt-6 block font-medium text-gray-900",
                            children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "absolute inset-0 z-10",
                                  "aria-hidden": "true"
                                }
                              ),
                              "New Arrivals"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "group relative text-sm", children: [
                        /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                            alt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
                            className: "object-cover object-center"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs(
                          "a",
                          {
                            href: "#",
                            className: "mt-6 block font-medium text-gray-900",
                            children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "absolute inset-0 z-10",
                                  "aria-hidden": "true"
                                }
                              ),
                              "Basic Tees"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "women-clothing-heading-mobile",
                          className: "font-medium text-gray-900",
                          children: "Clothing"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "women-clothing-heading-mobile",
                          className: "mt-6 flex flex-col space-y-6",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Tops" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Dresses" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Pants" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Denim" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Sweaters" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "T-Shirts" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Jackets" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Activewear" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Browse All" }) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "women-accessories-heading-mobile",
                          className: "font-medium text-gray-900",
                          children: "Accessories"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "women-accessories-heading-mobile",
                          className: "mt-6 flex flex-col space-y-6",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Watches" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Wallets" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Bags" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Sunglasses" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Hats" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Belts" }) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "women-brands-heading-mobile",
                          className: "font-medium text-gray-900",
                          children: "Brands"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "women-brands-heading-mobile",
                          className: "mt-6 flex flex-col space-y-6",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Full Nelson" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "My Way" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Re-Arranged" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Counterfeit" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Significant Other" }) })
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  id: "tabs-1-panel-2",
                  className: "space-y-10 px-4 pb-8 pt-10",
                  "aria-labelledby": "tabs-1-tab-2",
                  role: "tabpanel",
                  tabIndex: "0",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "group relative text-sm", children: [
                        /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                            alt: "Drawstring top with elastic loop closure and textured interior padding.",
                            className: "object-cover object-center"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs(
                          "a",
                          {
                            href: "#",
                            className: "mt-6 block font-medium text-gray-900",
                            children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "absolute inset-0 z-10",
                                  "aria-hidden": "true"
                                }
                              ),
                              "New Arrivals"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "group relative text-sm", children: [
                        /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                            alt: "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
                            className: "object-cover object-center"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs(
                          "a",
                          {
                            href: "#",
                            className: "mt-6 block font-medium text-gray-900",
                            children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "absolute inset-0 z-10",
                                  "aria-hidden": "true"
                                }
                              ),
                              "Artwork Tees"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "men-clothing-heading-mobile",
                          className: "font-medium text-gray-900",
                          children: "Clothing"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "men-clothing-heading-mobile",
                          className: "mt-6 flex flex-col space-y-6",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Tops" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Pants" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Sweaters" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "T-Shirts" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Jackets" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Activewear" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Browse All" }) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "men-accessories-heading-mobile",
                          className: "font-medium text-gray-900",
                          children: "Accessories"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "men-accessories-heading-mobile",
                          className: "mt-6 flex flex-col space-y-6",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Watches" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Wallets" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Bags" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Sunglasses" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Hats" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Belts" }) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "men-brands-heading-mobile",
                          className: "font-medium text-gray-900",
                          children: "Brands"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "men-brands-heading-mobile",
                          className: "mt-6 flex flex-col space-y-6",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Re-Arranged" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Counterfeit" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "Full Nelson" }) }),
                            /* @__PURE__ */ jsx("li", { className: "flow-root", children: /* @__PURE__ */ jsx("a", { href: "#", className: "-m-2 block p-2 text-gray-500", children: "My Way" }) })
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 border-t border-gray-200 px-4 py-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flow-root", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "-m-2 block p-2 font-medium text-gray-900",
                  children: "Company"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flow-root", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "-m-2 block p-2 font-medium text-gray-900",
                  children: "Stores"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 border-t border-gray-200 px-4 py-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flow-root", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "-m-2 block p-2 font-medium text-gray-900",
                  children: "Sign in"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flow-root", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "-m-2 block p-2 font-medium text-gray-900",
                  children: "Create account"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 px-4 py-6", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "-m-2 flex items-center p-2", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://tailwindui.com/img/flags/flag-canada.svg",
                  alt: "",
                  className: "block h-auto w-5 flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-3 block text-base font-medium text-gray-900", children: "CAD" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: ", change currency" })
            ] }) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("header", { className: "relative bg-white", children: /* @__PURE__ */ jsx(
      "nav",
      {
        "aria-label": "Top",
        className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "relative rounded-md bg-white p-2 text-gray-400 lg:hidden",
              children: [
                /* @__PURE__ */ jsx("span", { className: "absolute -inset-0.5" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open menu" }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "ml-4 flex lg:ml-0", children: /* @__PURE__ */ jsxs("a", { href: "#", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Your Company" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-8 w-auto",
                src: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
                alt: ""
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:ml-8 lg:block lg:self-stretch", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full space-x-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "relative flex", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800",
                  "aria-expanded": "false",
                  children: "Women"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 top-full text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 top-1/2 bg-white shadow",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "relative bg-white", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-8 gap-y-10 py-16", children: [
                  /* @__PURE__ */ jsxs("div", { className: "col-start-2 grid grid-cols-2 gap-x-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "group relative text-base sm:text-sm", children: [
                      /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                          alt: "Models sitting back to back, wearing Basic Tee in black and bone.",
                          className: "object-cover object-center"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs(
                        "a",
                        {
                          href: "#",
                          className: "mt-6 block font-medium text-gray-900",
                          children: [
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: "absolute inset-0 z-10",
                                "aria-hidden": "true"
                              }
                            ),
                            "New Arrivals"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "group relative text-base sm:text-sm", children: [
                      /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                          alt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
                          className: "object-cover object-center"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs(
                        "a",
                        {
                          href: "#",
                          className: "mt-6 block font-medium text-gray-900",
                          children: [
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: "absolute inset-0 z-10",
                                "aria-hidden": "true"
                              }
                            ),
                            "Basic Tees"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "Clothing-heading",
                          className: "font-medium text-gray-900",
                          children: "Clothing"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "Clothing-heading",
                          className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Tops"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Dresses"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Pants"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Denim"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Sweaters"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "T-Shirts"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Jackets"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Activewear"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Browse All"
                              }
                            ) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "Accessories-heading",
                          className: "font-medium text-gray-900",
                          children: "Accessories"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "Accessories-heading",
                          className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Watches"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Wallets"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Bags"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Sunglasses"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Hats"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Belts"
                              }
                            ) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "Brands-heading",
                          className: "font-medium text-gray-900",
                          children: "Brands"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "Brands-heading",
                          className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Full Nelson"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "My Way"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Re-Arranged"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Counterfeit"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Significant Other"
                              }
                            ) })
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }) }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "relative flex", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800",
                  "aria-expanded": "false",
                  children: "Men"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 top-full text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 top-1/2 bg-white shadow",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "relative bg-white", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-8 gap-y-10 py-16", children: [
                  /* @__PURE__ */ jsxs("div", { className: "col-start-2 grid grid-cols-2 gap-x-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "group relative text-base sm:text-sm", children: [
                      /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                          alt: "Drawstring top with elastic loop closure and textured interior padding.",
                          className: "object-cover object-center"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs(
                        "a",
                        {
                          href: "#",
                          className: "mt-6 block font-medium text-gray-900",
                          children: [
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: "absolute inset-0 z-10",
                                "aria-hidden": "true"
                              }
                            ),
                            "New Arrivals"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "group relative text-base sm:text-sm", children: [
                      /* @__PURE__ */ jsx("div", { className: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75", children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                          alt: "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
                          className: "object-cover object-center"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs(
                        "a",
                        {
                          href: "#",
                          className: "mt-6 block font-medium text-gray-900",
                          children: [
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: "absolute inset-0 z-10",
                                "aria-hidden": "true"
                              }
                            ),
                            "Artwork Tees"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { "aria-hidden": "true", className: "mt-1", children: "Shop now" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "Clothing-heading",
                          className: "font-medium text-gray-900",
                          children: "Clothing"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "Clothing-heading",
                          className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Tops"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Pants"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Sweaters"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "T-Shirts"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Jackets"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Activewear"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Browse All"
                              }
                            ) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "Accessories-heading",
                          className: "font-medium text-gray-900",
                          children: "Accessories"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "Accessories-heading",
                          className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Watches"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Wallets"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Bags"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Sunglasses"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Hats"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Belts"
                              }
                            ) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: "Brands-heading",
                          className: "font-medium text-gray-900",
                          children: "Brands"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "ul",
                        {
                          role: "list",
                          "aria-labelledby": "Brands-heading",
                          className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4",
                          children: [
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Re-Arranged"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Counterfeit"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "Full Nelson"
                              }
                            ) }),
                            /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "#",
                                className: "hover:text-gray-800",
                                children: "My Way"
                              }
                            ) })
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }) }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "flex items-center text-sm font-medium text-gray-700 hover:text-gray-800",
                children: "Company"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "flex items-center text-sm font-medium text-gray-700 hover:text-gray-800",
                children: "Stores"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "text-sm font-medium text-gray-700 hover:text-gray-800",
                  children: "Sign in"
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "h-6 w-px bg-gray-200",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "text-sm font-medium text-gray-700 hover:text-gray-800",
                  children: "Create account"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden lg:ml-8 lg:flex", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#",
                className: "flex items-center text-gray-700 hover:text-gray-800",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "https://tailwindui.com/img/flags/flag-canada.svg",
                      alt: "",
                      className: "block h-auto w-5 flex-shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "ml-3 block text-sm font-medium", children: "CAD" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: ", change currency" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "flex lg:ml-6", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#",
                className: "p-2 text-gray-400 hover:text-gray-500",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search" }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "h-6 w-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        }
                      )
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "ml-4 flow-root lg:ml-6", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "group -m-2 flex items-center p-2", children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800", children: "0" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "items in cart, view bag" })
            ] }) })
          ] })
        ] }) })
      }
    ) })
  ] }) });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: navigationbar
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5() {
  const videos = await db.video.findMany({});
  return json$1({ videos });
}
function VideoGallery() {
  const { videos } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center mb-6 text-gray-800", children: "Video Gallery" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: videos.map((video) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
        children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              className: "w-full rounded-t-lg",
              src: video.url,
              controls: true,
              alt: video.title
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-700 truncate", children: video.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2 line-clamp-2", children: video.description })
          ] })
        ]
      },
      video.id
    )) })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VideoGallery,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
async function loader$4() {
  const products = await db.product.findMany({});
  return json$1({ products });
}
const PhotoGallery = () => {
  const { products } = useLoaderData();
  const [selectedImage, setSelectedImage] = useState(null);
  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const closeImagePopup = () => {
    setSelectedImage(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center mb-6", children: "Photo Gallery" }),
    /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: products.map((product) => /* @__PURE__ */ jsxs("li", { className: "relative group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: product.imageUrl,
          alt: product.name,
          className: "w-full h-auto rounded-lg object-cover shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-105",
          onClick: () => openImagePopup(product.imageUrl)
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-md", children: product.name })
    ] }, product.id)) }),
    selectedImage && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg w-full bg-white rounded-lg shadow-lg relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border-b bg-indigo-500 text-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Image Preview" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-2xl font-semibold cursor-pointer",
            onClick: closeImagePopup,
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: selectedImage,
          alt: "Preview",
          className: "w-full h-auto object-cover rounded-md"
        }
      ) })
    ] }) })
  ] });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PhotoGallery,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
async function uploadImage(data) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = v2.uploader.upload_stream(
      {
        folder: "remix"
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });
  return uploadPromise;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const AddProduct = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    Form,
    {
      method: "post",
      className: "space-y-4",
      encType: "multipart/form-data",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              name: "name",
              placeholder: "Enter product name...",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Actual Price" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              name: "actual_price",
              placeholder: "Enter Actual Price...",
              min: "0",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Discount Price" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              name: "discount_price",
              placeholder: "Enter Discount Price...",
              min: "0",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Content" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              name: "content",
              placeholder: "Type your product description here.",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Photo" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "file",
              name: "image",
              accept: "image/*",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: "Submit" })
      ]
    }
  ) });
};
const action$2 = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(async ({ name, data }) => {
    if (name === "image") {
      try {
        const uploadedImage = await uploadImage(data);
        return uploadedImage.secure_url;
      } catch (error) {
        console.error("Image upload error:", error);
        throw new Error("Image upload failed");
      }
    }
    return void 0;
  }, unstable_createMemoryUploadHandler());
  try {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const name = formData.get("name");
    const actual_price = formData.get("actual_price");
    const discount_price = formData.get("discount_price");
    const content = formData.get("content");
    const imageUrl = formData.get("image");
    if (!name || !actual_price || !discount_price || !content || !imageUrl) {
      throw new Error("All fields are required.");
    }
    await db.product.create({
      data: {
        name,
        actual_price: parseInt(actual_price),
        discount_price: parseInt(discount_price),
        content,
        imageUrl
      }
    });
    return redirect("/products?success=true");
  } catch (error) {
    console.error("Error processing action:", error);
    return json$1(
      { success: false, message: error.message || "Failed to create product." },
      { status: 500 }
    );
  }
};
function Product() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  useEffect(() => {
    if (success === "true") {
      toast.success("Product added successfully!");
    }
  }, [success]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Add New Product" }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", reverseOrder: false }),
    /* @__PURE__ */ jsx(AddProduct, {})
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: Product
}, Symbol.toStringTag, { value: "Module" }));
const CartContext = createContext(void 0);
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map(
          (i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: { cartItems, addToCart, removeFromCart, clearCart }, children });
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CartProvider,
  useCart
}, Symbol.toStringTag, { value: "Module" }));
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const Invoice = () => {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full pt-12 bg-gray-200", children: [
    /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden bg-cover bg-no-repeat bg-center bg-fixed w-full h-[350px] shadow-inner bg-[url('http://michaeltruong.ca/images/invoicebg.jpg')]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-[-290px] w-[700px] bg-white shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-8 border-b border-gray-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] bg-[url('http://michaeltruong.ca/images/logo1.png')] bg-cover" }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Michael Truong" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              "hello@michaeltruong.ca ",
              /* @__PURE__ */ jsx("br", {}),
              "289-335-6503"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Invoice #1069" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
            "Issued: May 27, 2015 ",
            /* @__PURE__ */ jsx("br", {}),
            "Payment Due: June 27, 2015"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-8 border-b border-gray-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] bg-[url('http://michaeltruong.ca/images/client.jpg')] bg-cover rounded-full" }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Client Name" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "JohnDoe@gmail.com" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "555-555-5555" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-1/2 ml-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Project Description" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim, at elementum enim quam vel purus. Curabitur semper malesuada urna ut suscipit." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-8 border-b border-gray-300", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx("th", { className: "p-2 text-left border border-gray-300", children: "Item Description" }),
          /* @__PURE__ */ jsx("th", { className: "p-2 text-left border border-gray-300", children: "Hours" }),
          /* @__PURE__ */ jsx("th", { className: "p-2 text-left border border-gray-300", children: "Rate" }),
          /* @__PURE__ */ jsx("th", { className: "p-2 text-left border border-gray-300", children: "Sub-total" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          [
            { description: "Communication", hours: 5, rate: 75, subtotal: 375 },
            { description: "Asset Gathering", hours: 3, rate: 75, subtotal: 225 },
            { description: "Design Development", hours: 5, rate: 75, subtotal: 375 },
            { description: "Animation", hours: 20, rate: 75, subtotal: 1500 },
            { description: "Animation Revisions", hours: 10, rate: 75, subtotal: 750 }
          ].map((item, index) => /* @__PURE__ */ jsxs("tr", { className: "border border-gray-300", children: [
            /* @__PURE__ */ jsx("td", { className: "p-2", children: item.description }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: item.hours }),
            /* @__PURE__ */ jsxs("td", { className: "p-2", children: [
              "$",
              item.rate
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "p-2", children: [
              "$",
              item.subtotal.toFixed(2)
            ] })
          ] }, index)),
          /* @__PURE__ */ jsxs("tr", { className: "border border-gray-300", children: [
            /* @__PURE__ */ jsx("td", { className: "p-2" }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: "HST" }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: "13%" }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: "$419.25" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "border border-gray-300 bg-gray-100", children: [
            /* @__PURE__ */ jsx("td", {}),
            /* @__PURE__ */ jsx("td", {}),
            /* @__PURE__ */ jsx("td", { className: "p-2 font-semibold text-right", children: "Total" }),
            /* @__PURE__ */ jsx("td", { className: "p-2 font-semibold", children: "$3,644.25" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-8", children: [
        /* @__PURE__ */ jsxs(
          "form",
          {
            action: "https://www.paypal.com/cgi-bin/webscr",
            method: "post",
            target: "_top",
            children: [
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "cmd", value: "_s-xclick" }),
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "hosted_button_id", value: "QRZ7QTM9XRPJ6" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "image",
                  src: "http://michaeltruong.ca/images/paypal.png",
                  border: "0",
                  name: "submit",
                  alt: "PayPal - The safer, easier way to pay online!"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
          /* @__PURE__ */ jsx("strong", { children: "Thank you for your business!" }),
          " Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices."
        ] }) })
      ] })
    ] })
  ] });
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Invoice
}, Symbol.toStringTag, { value: "Module" }));
async function action$1({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const videoFile = formData.get("videoFile");
  if (!videoFile) {
    return { error: "Video file is required" };
  }
  try {
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    const videoStream = Readable.from(videoBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "videos"
          // Optional: Folder in Cloudinary
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      videoStream.pipe(uploadStream);
    });
    const videoUrl = uploadResult.secure_url;
    await db.video.create({
      data: {
        title,
        description,
        url: videoUrl
      }
    });
    return { success: "Video uploaded successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to upload video" };
  }
}
function VideoForm() {
  const [videoPreview, setVideoPreview] = useState(null);
  const handleVideoChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-lg rounded-xl p-8 max-w-md w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6 text-center", children: "Upload Video" }),
    /* @__PURE__ */ jsxs(Form, { method: "post", encType: "multipart/form-data", action: "/add_video", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "title",
            className: "block text-sm font-semibold text-gray-700 mb-2",
            children: "Title"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "title",
            id: "title",
            className: "w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none",
            placeholder: "Enter video title",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "description",
            className: "block text-sm font-semibold text-gray-700 mb-2",
            children: "Description"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "description",
            id: "description",
            rows: 4,
            className: "w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none",
            placeholder: "Enter video description",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "videoFile",
            className: "block text-sm font-semibold text-gray-700 mb-2",
            children: "Upload Video"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            name: "videoFile",
            id: "videoFile",
            accept: "video/*",
            className: "w-full text-sm border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 file:font-medium file:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none",
            onChange: handleVideoChange,
            required: true
          }
        )
      ] }),
      videoPreview && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Preview" }),
        /* @__PURE__ */ jsx(
          "video",
          {
            controls: true,
            className: "w-full rounded-md border border-gray-300 shadow-sm",
            src: videoPreview
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none",
          children: "Upload Video"
        }
      )
    ] })
  ] }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: VideoForm
}, Symbol.toStringTag, { value: "Module" }));
const dashboard = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "dashboard" }) });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
const HomePage = () => {
  const { t, i18n: i18n2 } = useTranslation();
  const changeLanguage = (lng) => {
    i18n2.changeLanguage(lng);
  };
  useEffect(() => {
    const isRTL = ["ar", "he"].includes(i18n2.language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [i18n2.language]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: t("home") }),
    /* @__PURE__ */ jsxs("select", { onChange: (e) => changeLanguage(e.target.value), defaultValue: i18n2.language, children: [
      /* @__PURE__ */ jsx("option", { value: "en", children: "English" }),
      /* @__PURE__ */ jsx("option", { value: "hi", children: "हिन्दी" })
    ] })
  ] });
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Users() {
  function handleAvatar() {
    Swal.fire({
      title: "Submit your Github username",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `
          https://api.github.com/users/${login}
        `;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            return Swal.showValidationMessage(`
            ${JSON.stringify(await response.json())}
          `);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
          Request failed: ${error}
        `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Users List" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "ID"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Role"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 bg-white shadow-lg rounded-md", children: [
      /* @__PURE__ */ jsx("h1", { className: "mr-4 text-lg font-semibold text-gray-700", children: "Check your Avatar by entering your name" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          onClick: handleAvatar,
          className: "px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300",
          children: "Check Here!"
        }
      )
    ] })
  ] });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users
}, Symbol.toStringTag, { value: "Module" }));
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function ProductTable({ products }) {
  const [quantities, setQuantities] = useState(products.map(() => 0));
  const [amounts, setAmounts] = useState(products.map(() => 0));
  const [imagePopup, setImagePopup] = useState({ show: false });
  const handleQuantityChange = (index, newQuantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
    const newAmounts = [...amounts];
    newAmounts[index] = newQuantity * products[index].discount_price;
    setAmounts(newAmounts);
  };
  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
  const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto bg-white shadow-lg rounded-lg p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r bg-black p-4 mb-4 flex justify-between rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-semibold  text-white", children: [
        "Total Products:",
        " ",
        /* @__PURE__ */ jsx("span", { className: "px-2 py-2 rounded-lg", children: totalQuantity })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "font-semibold  text-white", children: [
        "Overall Total:",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "px-4 py-2 rounded-lg", children: [
          "₹",
          totalAmount
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx(TableCaption, { className: "text-lg font-bold text-gray-800", children: "A list of your products" }),
      /* @__PURE__ */ jsx(TableHeader, { className: "text-white", children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-50 text-white", children: [
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3", children: "Photo" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3", children: "Name" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3", children: "Content" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3", children: "Actual Price" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3", children: "Discount Price" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3", children: "Quantity" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-right", children: "Amount" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: products.map((product, index) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-slate-50", children: [
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3 cursor-pointer", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            className: "w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200",
            onClick: () => setImagePopup({ show: true, product })
          }
        ) }),
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3 font-medium text-gray-800", children: product.name }),
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3 text-gray-700", children: "1 Box" }),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-red-500 line-through", children: [
          "₹",
          product.actual_price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-green-500", children: [
          "₹",
          product.discount_price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            className: "w-20 border border-gray-300 rounded-md px-2 py-2",
            value: quantities[index],
            onChange: (e) => {
              const newQuantity = Number(e.target.value || 0);
              handleQuantityChange(index, newQuantity);
            }
          }
        ) }),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-right font-semibold text-gray-800", children: [
          "₹",
          amounts[index].toFixed(2)
        ] })
      ] }, product.id)) }),
      /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100", children: [
        /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 6,
            className: "px-4 py-3 font-bold text-gray-800",
            children: "Total"
          }
        ),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-right font-bold text-green-600", children: [
          "₹",
          totalAmount.toFixed(2)
        ] })
      ] }) })
    ] }),
    imagePopup.show && imagePopup.product && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-lg w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-indigo-500 text-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: imagePopup.product.name }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-2xl font-bold",
            onClick: () => setImagePopup({ show: false }),
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imagePopup.product.imageUrl,
          alt: imagePopup.product.name,
          className: "w-full h-auto object-cover"
        }
      )
    ] }) })
  ] });
}
async function loader$3({ request }) {
  var _a;
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const query = ((_a = searchParams.get("q")) == null ? void 0 : _a.toLowerCase()) || "";
  const products = await db.product.findMany();
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(query)
  );
  return json$1({ products: filteredProducts, query });
}
const Index = () => {
  const { products, query } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-white" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 mt-4", children: /* @__PURE__ */ jsx(ProductTable, { products }) }),
    /* @__PURE__ */ jsx("div", { className: "check_out-btn flex justify-end", children: /* @__PURE__ */ jsx(Button, { children: "Procced To Checkout  " }) })
  ] });
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const Charts = () => {
  return /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-lg rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "w-full h-full object-cover",
        src: "https://m.media-amazon.com/images/I/61l906x+fZL._AC_SL1500_.jpg",
        alt: "product_image"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Product Code: HP67358" }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center space-x-1", children: [
          "4.5",
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-4 h-4",
              src: "https://img.icons8.com/?size=100&id=19417&format=png&color=000000",
              alt: "rating"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold mb-2" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-green-400", children: "$248" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm line-through text-gray-500", children: "$320" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700",
          onClick: () => handleAddtoCart(
            "JBL Quantum 100 Wired Over-Ear Gaming Headset with a Detachable Voice-Focus Boom Mic, QuantumSOUND Signature, Lightweight Headband, Memory Foam Ear Cushion, PC and Gaming Console Compatible - Black",
            "HP67358"
          ),
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "w-4 h-4",
                src: "https://img.icons8.com/?size=100&id=9720&format=png&color=000000",
                alt: "add to cart"
              }
            ),
            "Add to cart"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400",
          onClick: () => handleAddtoWishlist(
            "JBL Quantum 100 Wired Over-Ear Gaming Headset with a Detachable Voice-Focus Boom Mic, QuantumSOUND Signature, Lightweight Headband, Memory Foam Ear Cushion, PC and Gaming Console Compatible - Black",
            "HP67358"
          ),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-4 h-4",
              src: "https://img.icons8.com/?size=100&id=19411&format=png&color=000000",
              alt: "wishlist"
            }
          )
        }
      )
    ] })
  ] }) }) });
};
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Charts
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
  return { status: 302, headers: { Location: "/login" } };
};
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1({ request }) {
  var _a;
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const query = ((_a = searchParams.get("q")) == null ? void 0 : _a.toLowerCase()) || "";
  const products = await db.product.findMany();
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(query)
  );
  return json$1({ products: filteredProducts, query });
}
function Search() {
  const { products, query } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center h-screen justify-center bg-white", children: /* @__PURE__ */ jsxs(
      Form,
      {
        method: "get",
        className: "flex w-72 mx-7 lg:max-w-[500px] rounded-full border-gray-400 border-opacity-65 border bg-gray-100 px-2",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "q",
              className: "flex w-full bg-transparent px-3 text-gray-700 rtl:text-right outline-0",
              placeholder: "Search your products",
              value: query,
              onChange: (e) => setSearchParams({ q: e.target.value })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "border-gray-400 border-opacity-70 my-1 border-l " }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "relative rounded-full bg-transparent px-2 py-3",
              children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  className: "fill-none size-6",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsx("g", { id: "SVGRepo_bgCarrier", strokeWidth: "0" }),
                    /* @__PURE__ */ jsx(
                      "g",
                      {
                        id: "SVGRepo_tracerCarrier",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    ),
                    /* @__PURE__ */ jsx("g", { id: "SVGRepo_iconCarrier", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z",
                        stroke: "#999",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    ) })
                  ]
                }
              )
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-5 text-center", children: products && products.length > 0 ? products.map((product) => /* @__PURE__ */ jsx("div", { children: product.name }, product.id)) : /* @__PURE__ */ jsx("p", { children: "No results found." }) })
  ] });
}
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Search,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/"
  });
  return user;
};
const action = async ({ request }) => {
  const user = authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login"
  });
  return user;
};
const Login = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center font-semibold text-2xl mt-20 mb-5", children: "Login" }),
    /* @__PURE__ */ jsxs(Form, { method: "POST", className: "flex flex-col w-72 gap-2 m-auto", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "email",
          className: "bg-slate-100 p-2 rounded-xl",
          id: "",
          placeholder: "email",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          name: "password",
          className: "bg-slate-100 p-2 rounded-xl",
          id: "",
          placeholder: "password",
          required: true
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "bg-black w-32 rounded-xl p-2 text-white font-semibold m-auto", children: "Login" })
    ] }),
    /* @__PURE__ */ jsxs("h1", { className: "text-center text-zinc-300 mt-2", children: [
      "don't have an account?",
      /* @__PURE__ */ jsx(Link, { to: "/register", children: /* @__PURE__ */ jsx("span", { className: "font-semibold ml-2 cursor-pointer text-black text-center", children: "Register" }) })
    ] })
  ] });
};
function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", { className: "w-full h-screen flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: " font-bold text-5xl text-red-700", children: [
        error.status,
        " ",
        error.statusText
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-xl", children: error.data.message }),
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-semibold", children: "try again" })
    ] });
  } else if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Error" }),
      /* @__PURE__ */ jsx("p", { children: error.message }),
      /* @__PURE__ */ jsx("p", { children: "The stack trace is:" }),
      /* @__PURE__ */ jsx("pre", { children: error.stack })
    ] });
  } else {
    return /* @__PURE__ */ jsx("h1", { children: "Unknown Error" });
  }
}
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  action,
  default: Login,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CoM3wuoD.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DovIEpix.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": ["/assets/root-B2PUIxez.css"] }, "routes/productdetails.$productId": { "id": "routes/productdetails.$productId", "parentId": "root", "path": "productdetails/:productId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/productdetails._productId-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/payment.success": { "id": "routes/payment.success", "parentId": "root", "path": "payment/success", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/payment.success-B8pmM4pm.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/sweetalert2.esm.all-D3pEHXw3.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/navigationbar": { "id": "routes/navigationbar", "parentId": "root", "path": "navigationbar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/navigationbar-42Tf0Ly4.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/video_gallery": { "id": "routes/video_gallery", "parentId": "root", "path": "video_gallery", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/video_gallery-DW73K0lw.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/photogallery": { "id": "routes/photogallery", "parentId": "root", "path": "photogallery", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/photogallery-B1Ajb5h8.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/add_product": { "id": "routes/add_product", "parentId": "root", "path": "add_product", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/add_product-DY9e6o04.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/input-CCVfWDD9.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/cartcontext": { "id": "routes/cartcontext", "parentId": "root", "path": "cartcontext", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/cartcontext-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/createuser": { "id": "routes/createuser", "parentId": "root", "path": "createuser", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/createuser-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/taxinvoice": { "id": "routes/taxinvoice", "parentId": "root", "path": "taxinvoice", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/taxinvoice-BXhE_OBT.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/add_video": { "id": "routes/add_video", "parentId": "root", "path": "add_video", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/add_video-B9SR7a1G.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/dashboard-auD1MBo4.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/homepage": { "id": "routes/homepage", "parentId": "root", "path": "homepage", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/homepage-CbbrXtdn.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/services": { "id": "routes/services", "parentId": "root", "path": "services", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/services-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/userlist": { "id": "routes/userlist", "parentId": "root", "path": "userlist", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/userlist-ot44sFgR.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/sweetalert2.esm.all-D3pEHXw3.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CGdJ16Xg.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/input-CCVfWDD9.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/charts": { "id": "routes/charts", "parentId": "root", "path": "charts", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/charts-DTk623Xr.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-CAf5XKJG.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/login-CzcBmYY9.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CUoXoAHT.js"], "css": [] } }, "url": "/assets/manifest-b7430941.js", "version": "b7430941" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/productdetails.$productId": {
    id: "routes/productdetails.$productId",
    parentId: "root",
    path: "productdetails/:productId",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/payment.success": {
    id: "routes/payment.success",
    parentId: "root",
    path: "payment/success",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/navigationbar": {
    id: "routes/navigationbar",
    parentId: "root",
    path: "navigationbar",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/video_gallery": {
    id: "routes/video_gallery",
    parentId: "root",
    path: "video_gallery",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/photogallery": {
    id: "routes/photogallery",
    parentId: "root",
    path: "photogallery",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/add_product": {
    id: "routes/add_product",
    parentId: "root",
    path: "add_product",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/cartcontext": {
    id: "routes/cartcontext",
    parentId: "root",
    path: "cartcontext",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/createuser": {
    id: "routes/createuser",
    parentId: "root",
    path: "createuser",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/taxinvoice": {
    id: "routes/taxinvoice",
    parentId: "root",
    path: "taxinvoice",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/add_video": {
    id: "routes/add_video",
    parentId: "root",
    path: "add_video",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/homepage": {
    id: "routes/homepage",
    parentId: "root",
    path: "homepage",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/services": {
    id: "routes/services",
    parentId: "root",
    path: "services",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/userlist": {
    id: "routes/userlist",
    parentId: "root",
    path: "userlist",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route16
  },
  "routes/charts": {
    id: "routes/charts",
    parentId: "root",
    path: "charts",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
