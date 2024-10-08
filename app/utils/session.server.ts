import { createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax", 
    path: "/", 
    httpOnly: true, 
    secrets: ["dfgsrtg"], 
    secure: process.env.NODE_ENV === "production", 
  },
});


export let { getSession, commitSession, destroySession } = sessionStorage;