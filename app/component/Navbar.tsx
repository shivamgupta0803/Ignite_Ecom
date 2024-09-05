import { Form, Link, useNavigate } from "@remix-run/react";

export default function Navbar({ user }: { user: any }) {
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue === "logout") {
      navigate("/logout");
    } else if (selectedValue === "profile") {
      navigate("/profile");
    }
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCFghbAxvuhjDtas7kAnKWvO4QPDR83gWeyPLU-1jeubzPk8PK"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="items-center rounded-full justify-center bg-white">
                  <Form
                    method="get"
                    className="flex w-96 lg:max-w-[500px] rounded-full  px-2"
                  >
                    <input
                      type="text"
                      name="q"
                      className="flex w-full rounded-full bg-white px-3 outline-0"
                      placeholder="Search your products . . ."
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
                {user.role === "admin" ? (
                  <div className="relative group">
                    <div className="bg-gray-500 text-white  rounded-full p-2 hover:bg-pink-700">
                      Admin Features
                    </div>
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link> */}
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Userlist
                      </Link>
                      <Link
                        to="admin/createuser"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        CreateUser
                      </Link>
                      <Link
                        to="admin/addproduct"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        AddProduct
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold">
                    Welcome{" "}
                    <u className="text-blue-300 font-semibold">{user.name}</u>!
                  </span>
                  <select
                    id="userDropdown"
                    className="bg-white text-gray-700 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                    onChange={handleChange}
                  >
                    <option value="profile">
                      {user.name} {String.fromCodePoint(0x1f464)}
                    </option>
                    <option value="logout">
                      Logout {String.fromCodePoint(0x1f6aa)}
                    </option>
                  </select>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white bg-green-500 px-3 py-2 rounded-lg shadow-md hover:bg-green-600"
                >
                  Login
                </Link>
                <span className="text-white mx-2">|</span>
                <Link
                  to="/register"
                  className="text-white bg-blue-500 px-3 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
