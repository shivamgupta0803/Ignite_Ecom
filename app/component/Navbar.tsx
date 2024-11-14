"use client";
import Menubar from "~/component/Menubar";
import NavbarMenu from "~/component/NavbarMenu";

export default function NavigationMenuDemo() {
  return (
    <>
      <div className="">
        <header className="bg-red-300">
          <div className="ml-10 p-12 ">
            <div className=" flex mb-4 gap-10">
              <div className="phone flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <p>
                  +91 <span>9967667099</span>
                </p>
              </div>
              <div className="email flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <p>
                  <span>shivamgupta@08032001gmail.com</span>
                </p>
              </div>
            </div>
            <div className="logo flex ">
              <img
                src="/images/logo.png"
                className="w-20 h-20 rounded-lg"
                alt=""
              />
              <h1 className="text-4xl mt-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-600">
                <span className="ml-4 ">"GUPTA FATAKA MART"</span>
              </h1>
            </div>
          </div>
        </header>

        {/* End OF Header Section */}

        <nav className="border-b-4 border-indigo-600 p-4 flex flex-wrap items-center justify-between md:justify-start">
          <div className="text-2xl font-bold text-indigo-600 ml-2 mb-2 md:mb-0">
            BrandName
          </div>

          <button
            className="text-indigo-600 md:hidden focus:outline-none"
            aria-label="Toggle menu"
            data-collapse-toggle="menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <div
            className="hidden w-full md:flex md:flex-1 md:items-center md:justify-between mt-4 md:mt-0"
            id="menu"
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <NavbarMenu />
            </div>
            <div className="flex justify-end mt-4 md:mt-0">
              <Menubar />
            </div>
          </div>
        </nav>
        <section>
          <div className="page-banner-inner">
            {/* <div style={{ paddingTop: "66.750%", position: "relative" }}> */}
              <iframe
                src="https://gifer.com/embed/4A5"
                className="w-[100%] h-[50%]"
                allowFullScreen
              ></iframe>
            {/* </div> */}
          </div>
        </section>
      </div>
    </>
  );
}
