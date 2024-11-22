import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect as redirect$1, json, writeAsyncIterableToWritable, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts, redirect, useLoaderData, Form, useSearchParams, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { X, PanelLeft, Home, ListPlus, Calendar, Search as Search$1, Settings, ChevronDown } from "lucide-react";
import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { v2 } from "cloudinary";
import * as LabelPrimitive from "@radix-ui/react-label";
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
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
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
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-primary/10", className),
      ...props
    }
  );
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = React.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = React.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsx(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        }
      ) });
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: "group peer hidden md:block text-sidebar-foreground",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeft, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
});
SidebarRail.displayName = "SidebarRail";
const SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "main",
    {
      ref,
      className: cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      ),
      ...props
    }
  );
});
SidebarInset.displayName = "SidebarInset";
const SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
});
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
});
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    Separator,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
});
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
});
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-sidebar": "group-content",
    className: cn("w-full text-sm", className),
    ...props
  }
));
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    "data-sidebar": "menu",
    className: cn("flex w-full min-w-0 flex-col gap-1", className),
    ...props
  }
));
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "li",
  {
    ref,
    "data-sidebar": "menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  }
));
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = React.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsx(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-sidebar": "menu-badge",
    className: cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx(
          Skeleton,
          {
            className: "h-4 flex-1 max-w-[--skeleton-width]",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    "data-sidebar": "menu-sub",
    className: cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, ...props }));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "AddProduct",
    url: "addproduct",
    icon: ListPlus
  },
  {
    title: "Calendar",
    url: "#",
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
];
function AppSidebar() {
  return /* @__PURE__ */ jsx(SidebarProvider, { children: /* @__PURE__ */ jsx(Sidebar, { children: /* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsxs(SidebarGroup, { children: [
    /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Application" }),
    /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: item.url, children: [
      /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) }) }, item.title)) }) })
  ] }) }) }) });
}
const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  NavigationMenuPrimitive.Root,
  {
    ref,
    className: cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(NavigationMenuViewport, {})
    ]
  }
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;
const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.List,
  {
    ref,
    className: cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    ),
    ...props
  }
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);
const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  NavigationMenuPrimitive.Trigger,
  {
    ref,
    className: cn(navigationMenuTriggerStyle(), "group", className),
    ...props,
    children: [
      children,
      " ",
      /* @__PURE__ */ jsx(
        ChevronDown,
        {
          className: "relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180",
          "aria-hidden": "true"
        }
      )
    ]
  }
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    ),
    ...props
  }
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
const NavigationMenuLink = NavigationMenuPrimitive.Link;
const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: cn("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.Viewport,
  {
    className: cn(
      "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
      className
    ),
    ref,
    ...props
  }
) }));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;
const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.Indicator,
  {
    ref,
    className: cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
  }
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;
const components = [
  {
    title: "Create User",
    href: "/createuser",
    description: "A modal dialog that interrupts the user with important content and expects a response."
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link."
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content."
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time."
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
  }
];
function NavigationMenuDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(NavigationMenu, { children: /* @__PURE__ */ jsxs(NavigationMenuList, { children: [
    /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [
      /* @__PURE__ */ jsx(NavigationMenuTrigger, { children: "Gallery" }),
      /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsxs("ul", { className: "grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]", children: [
        /* @__PURE__ */ jsx("li", { className: "row-span-3", children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, children: /* @__PURE__ */ jsxs(
          "a",
          {
            className: "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md",
            href: "/",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2 mt-4 text-lg font-medium", children: "shadcn/ui" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm leading-tight text-muted-foreground", children: "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source." })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx(ListItem, { href: "/photogallery", title: "Photo Gallery ", children: "Re-usable components built using Radix UI and Tailwind CSS." }),
        /* @__PURE__ */ jsx(ListItem, { href: "/docs/installation", title: "Video Gallery", children: "How to install dependencies and structure your app." }),
        /* @__PURE__ */ jsx(ListItem, { href: "/docs/primitives/typography", title: "Typography", children: "Styles for headings, paragraphs, lists...etc" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [
      /* @__PURE__ */ jsx(NavigationMenuTrigger, { children: "Components" }),
      /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", { className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ", children: components.map((component) => /* @__PURE__ */ jsx(Link, { to: component.href, children: /* @__PURE__ */ jsx(ListItem, { title: component.title, children: component.description }, component.title) })) }) })
    ] }),
    /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(Link, { to: "/docs", children: /* @__PURE__ */ jsx(NavigationMenuLink, { className: navigationMenuTriggerStyle(), children: "Documentation" }) }) })
  ] }) }) });
}
const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, children: /* @__PURE__ */ jsxs(
    "a",
    {
      ref,
      className: cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-none", children: title }),
        /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground", children })
      ]
    }
  ) }) });
});
ListItem.displayName = "ListItem";
let loader$4 = async ({ request }) => {
  const url = new URL(request.url);
  if (!url.pathname.endsWith("/") && url.pathname !== "/") {
    return redirect(url.pathname + "/");
  }
  return null;
};
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
          /* @__PURE__ */ jsx(NavigationMenuDemo, {}),
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
  loader: loader$4
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
async function action$2({ request }) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect$1("/login");
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
  return redirect$1("/payment/success");
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
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
async function loader$3() {
  const products = await db.product.findMany({});
  return json({ products });
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
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PhotoGallery,
  loader: loader$3
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
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CartProvider,
  useCart
}, Symbol.toStringTag, { value: "Module" }));
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
const action$1 = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(async ({ name, data }) => {
    if (name !== "image") {
      return void 0;
    }
    try {
      const uploadedImage = await uploadImage(data);
      console.log("Uploaded Image:", uploadedImage);
      return uploadedImage.secure_url;
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      throw new Error("Image upload failed");
    }
  }, unstable_createMemoryUploadHandler());
  try {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const name = formData.get("name");
    const actual_price = formData.get("actual_price");
    const discount_price = formData.get("discount_price");
    const content = formData.get("content");
    const imageUrl = formData.get("image");
    await db.product.create({
      data: {
        name,
        actual_price: parseInt(actual_price),
        discount_price: parseInt(discount_price),
        content,
        imageUrl
      }
    });
    return json({ success: true });
  } catch (error) {
    console.error("Action processing error:", error);
    return json(
      { success: false, error: error.message || "Failed to create product." },
      { status: 500 }
    );
  }
};
function Product() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Add New Product" }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        method: "post",
        className: "space-y-4",
        action: "addproduct",
        encType: "multipart/form-data",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "text",
                name: "name",
                placeholder: "Enter product name..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsx(Label, { children: "Actual Price" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "text",
                name: "actual_price",
                placeholder: "Enter Actual Price..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsx(Label, { children: "Discount Price" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "text",
                name: "discount_price",
                placeholder: "Enter Discount Price..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Content" }),
            /* @__PURE__ */ jsx(Textarea, { name: "content", placeholder: "Type your message here." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Photo" }),
            /* @__PURE__ */ jsx(Input, { type: "file", name: "image", placeholder: "Add Image..." })
          ] }),
          /* @__PURE__ */ jsx(Button, { children: "Submit" })
        ]
      }
    )
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Product
}, Symbol.toStringTag, { value: "Module" }));
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Invoice
}, Symbol.toStringTag, { value: "Module" }));
const HomePage = () => {
  const { t, i18n: i18n2 } = useTranslation();
  const changeLanguage = (lng) => {
    i18n2.changeLanguage(lng);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: t("home") }),
    /* @__PURE__ */ jsxs("select", { onChange: (e) => changeLanguage(e.target.value), defaultValue: i18n2.language, children: [
      /* @__PURE__ */ jsx("option", { value: "en", children: "English" }),
      /* @__PURE__ */ jsx("option", { value: "hi", children: "हिन्दी" })
    ] })
  ] });
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  const [quantities, setQuantities] = useState("");
  const [amounts, setAmounts] = useState(products.map(() => 0));
  const [imagePopup, setImagePopup] = useState(false);
  const handleQuantityChange = (index, newQuantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
    const newAmounts = [...amounts];
    newAmounts[index] = newQuantity * products[index].discount_price;
    setAmounts(newAmounts);
  };
  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
  const handleImagePopup = () => {
    setImagePopup(true);
  };
  const productsQuantity = [...quantities];
  const totalQuantity = productsQuantity.reduce((acc, curr) => acc + curr, 0);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto bg-white shadow-md rounded-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-yellow-200 p-4 mb-4 flex justify-between rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-semibold text-xl text-gray-800", children: [
        "Total Products:",
        " ",
        /* @__PURE__ */ jsx("span", { className: "bg-white px-4 py-2 rounded-lg", children: totalQuantity })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "font-semibold text-xl text-gray-800", children: [
        "Overall Total:",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "bg-white px-4 py-2 rounded-lg", children: [
          "₹",
          totalAmount
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { className: "w-full text-sm text-left", children: [
      /* @__PURE__ */ jsx(TableCaption, { className: "text-lg font-semibold pb-4", children: "A list of your fireworks products" }),
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-red-500", children: [
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-white hover:text-red-400", children: "Photo" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-white ", children: "Name" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-white ", children: "Content" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-white ", children: "Actual Price" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-white ", children: "Discount Price" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3 text-white ", children: "Fill Quantity" }),
        /* @__PURE__ */ jsx(TableHead, { className: "px-4 py-3  text-white text-right", children: "Amount" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: products.map((product, index) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-yellow-50", children: [
        /* @__PURE__ */ jsx(TableCell, { className: "px-6", onClick: handleImagePopup, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            className: "w-32 h-28 object-cover rounded-md border"
          }
        ) }),
        imagePopup && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border-b bg-indigo-500 text-white", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: product.name }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "text-2xl font-semibold cursor-pointer",
                onClick: () => setImagePopup(false),
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-auto object-cover rounded-md"
            }
          ) }) })
        ] }) }),
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3 font-medium text-gray-900 text-xl", children: product.name }),
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3 text-xl  text-gray-700", children: "1 Box" }),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-gray-700 text-xl text-red-500 line-through", children: [
          "₹",
          product.actual_price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-gray-700 text-xl", children: [
          "₹",
          product.discount_price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-3 text-xl", children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            className: "w-20 border border-gray-300 rounded-md px-2 py-2 text-2xl",
            name: "fill_quantity",
            value: quantities[index],
            onChange: (e) => {
              const newQuantity = Number(e.target.value);
              handleQuantityChange(index, newQuantity);
            }
          }
        ) }),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-right font-semibold text-gray-800 text-xl", children: [
          "₹",
          amounts[index].toFixed(2)
        ] })
      ] }, product.id)) }),
      /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100", children: [
        /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 6,
            className: "px-4 py-3 font-semibold text-gray-800 text-2xl",
            children: "Total"
          }
        ),
        /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-3 text-right font-semibold text-green-600 text-3xl", children: [
          "₹",
          totalAmount.toFixed(2)
        ] })
      ] }) })
    ] })
  ] });
}
async function loader$2() {
  const product = await db.product.findMany({});
  return json({ product });
}
const Index = () => {
  const { product } = useLoaderData();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "mb-4 mt-4", children: /* @__PURE__ */ jsx(ProductTable, { products: product }) }) });
};
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$2
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
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Charts
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
  return { status: 302, headers: { Location: "/login" } };
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader({ request }) {
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
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Search,
  loader
}, Symbol.toStringTag, { value: "Module" }));
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
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  action,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DyvCN7z7.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/components-BnCezf8x.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CMG2yp4N.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/components-BnCezf8x.js", "/assets/input-CVRlI3pB.js", "/assets/index-CxdynXiC.js"], "css": ["/assets/root-toe-23Dc.css"] }, "routes/productdetails.$productId": { "id": "routes/productdetails.$productId", "parentId": "root", "path": "productdetails/:productId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/productdetails._productId-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/payment.success": { "id": "routes/payment.success", "parentId": "root", "path": "payment/success", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/payment.success-mrOVZQ1T.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/sweetalert2.esm.all-D3pEHXw3.js", "/assets/components-BnCezf8x.js"], "css": [] }, "routes/navigationbar": { "id": "routes/navigationbar", "parentId": "root", "path": "navigationbar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/navigationbar-BCjwcOlH.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js"], "css": [] }, "routes/photogallery": { "id": "routes/photogallery", "parentId": "root", "path": "photogallery", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/photogallery-CEONkGOU.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/components-BnCezf8x.js"], "css": [] }, "routes/cartcontext": { "id": "routes/cartcontext", "parentId": "root", "path": "cartcontext", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/cartcontext-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/addproduct": { "id": "routes/addproduct", "parentId": "root", "path": "addproduct", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/addproduct-Dc95y2fB.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/input-CVRlI3pB.js", "/assets/components-BnCezf8x.js", "/assets/index-CxdynXiC.js"], "css": [] }, "routes/createuser": { "id": "routes/createuser", "parentId": "root", "path": "createuser", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/createuser-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/taxinvoice": { "id": "routes/taxinvoice", "parentId": "root", "path": "taxinvoice", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/taxinvoice-nOKpb_f0.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js"], "css": [] }, "routes/homepage": { "id": "routes/homepage", "parentId": "root", "path": "homepage", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/homepage-BEOtFPAL.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js"], "css": [] }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/services": { "id": "routes/services", "parentId": "root", "path": "services", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/services-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/userlist": { "id": "routes/userlist", "parentId": "root", "path": "userlist", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/userlist-BPvy8in4.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/sweetalert2.esm.all-D3pEHXw3.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BuTNzxtd.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/input-CVRlI3pB.js", "/assets/components-BnCezf8x.js"], "css": [] }, "routes/charts": { "id": "routes/charts", "parentId": "root", "path": "charts", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/charts-CrKos1OE.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js"], "css": [] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-XRiMMqbL.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/components-BnCezf8x.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/login-DdAUqlgJ.js", "imports": ["/assets/jsx-runtime-BWtM72Fx.js", "/assets/components-BnCezf8x.js"], "css": [] } }, "url": "/assets/manifest-320f12a6.js", "version": "320f12a6" };
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
  "routes/photogallery": {
    id: "routes/photogallery",
    parentId: "root",
    path: "photogallery",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/cartcontext": {
    id: "routes/cartcontext",
    parentId: "root",
    path: "cartcontext",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/addproduct": {
    id: "routes/addproduct",
    parentId: "root",
    path: "addproduct",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/createuser": {
    id: "routes/createuser",
    parentId: "root",
    path: "createuser",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/taxinvoice": {
    id: "routes/taxinvoice",
    parentId: "root",
    path: "taxinvoice",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/homepage": {
    id: "routes/homepage",
    parentId: "root",
    path: "homepage",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/services": {
    id: "routes/services",
    parentId: "root",
    path: "services",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/userlist": {
    id: "routes/userlist",
    parentId: "root",
    path: "userlist",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route13
  },
  "routes/charts": {
    id: "routes/charts",
    parentId: "root",
    path: "charts",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route17
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
