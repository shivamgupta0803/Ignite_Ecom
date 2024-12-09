import { Link } from "@remix-run/react";
import items from "~/component/commons/constant";

const AppSidebar = () => {
  return (
    <div className="bg-gray-100 text-gray-900 w-64 h-screen fixed left-0 top-0 z-10 flex flex-col">
      {/* Sidebar Header */}
      <div className="flex justify-center items-center h-16 bg-white shadow-md">
        <img src="HeadingLogo.png" alt="Logo" className="w-48 h-12" />
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {items.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {/* Group Header */}
            <h3 className="text-md font-semibold bg-gray-900 text-white py-2 px-4 border-b border-gray-300">
              {group.header}
            </h3>

            {/* Group Menu */}
            <ul className="space-y-1">
              {group.submenu.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={item.url}
                    className="flex items-center space-x-3 py-2 px-4 text-gray-700 hover:bg-gray-300 hover:text-gray-900 rounded-md transition"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSidebar;
