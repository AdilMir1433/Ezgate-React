import Dashboard from "views/Dashboard.js";
import Blocks from "views/Blocks.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import StreetForm from "views/StreetForm.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Residents from "views/Residents";
import LocationComponent from "views/Location";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: <Map />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/blocks",
    name: "Blocks",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-square-pin",
    component: <Blocks />,
    layout: "/admin",
  },
  {
    path: "/streets",
    name: "Streets",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-double-left",
    component: <StreetForm />,
    layout: "/admin",
  },
  {
    path: "/locations",
    name: "Locations",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-bank",
    component: <LocationComponent />,
    layout: "/admin",
  },
  {
    path: "/residents",
    name: "Residents",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-puzzle-10",
    component: <Residents />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/admin",
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: <Rtl />,
    layout: "/rtl",
  },
];
export default routes;
