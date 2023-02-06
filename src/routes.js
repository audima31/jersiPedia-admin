import Dashboard from "views/Dashboard.js";
// import Icons from "views/Icons.js";
import EditJersey from "views/Jersey/EditJersey";
import ListJersey from "views/Jersey/ListJersey";
import TambahJersey from "views/Jersey/TambahJersey";
import EditLiga from "views/Liga/EditLiga";
import ListLiga from "views/Liga/ListLiga";
import TambahLiga from "views/Liga/TambahLiga";
import Pesanan from "views/Pesanan/Pesanan";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/liga",
    name: "Master Liga",
    icon: "nc-icon nc-world-2",
    component: ListLiga,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/liga/tambah",
    name: "Tambah Liga",
    component: TambahLiga,
    layout: "/admin",
    sidebar: false,
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  {
    path: "/liga/edit/:id",
    name: "Edit Liga",
    component: EditLiga,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jersey",
    name: "Master jersey",
    icon: "nc-icon nc-cart-simple",
    component: ListJersey,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/jersey/tambah",
    name: "Tambah Jersey",
    component: TambahJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jersey/edit/:id",
    name: "Edit Jersey",
    component: EditJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pesanan",
    name: "Master Pesanan",
    icon: "nc-icon nc-app",
    component: Pesanan,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
