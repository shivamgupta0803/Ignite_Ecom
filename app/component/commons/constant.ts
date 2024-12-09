import { Home, Calendar, Search, Settings, ListPlus, LayoutDashboard } from "lucide-react";


const items = [
  {
    header: "Main Menu",
    submenu: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Calendar",
        url: "",
        icon: Calendar,
      },
      {
        title: "Search",
        url: "/search",
        icon: Search,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  },
  {
    header: "Add Lists",
    submenu: [
      {
        title: "Add Product",
        url: "/add_product",
        icon: ListPlus,
      },
      {
        title: "Add Video",
        url: "/add_video",
        icon: ListPlus,
      },
    ],
  },
];


export default items