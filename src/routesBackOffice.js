import AddCommunity from "views/AddCommunity.js";
import AssignCommunity from "views/AssignCommunity.js"
import DashboardBackOffice from "views/DashboardBackOffice.js";
import AddRoles from "views/AddRoles.js"

var routesBackOffice = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: "tim-icons icon-chart-pie-36",
        component: <DashboardBackOffice />,
        layout: "/back-office"
    },
    {
        path: "/add-community",
        name: "Add Community",
        rtlName: "لوحة القيادة",
        icon: "tim-icons icon-chart-pie-36",
        component: <AddCommunity />,
        layout: "/back-office",
    },
    {
        path: "/assign-community",
        name: "Assign Community",
        rtlName: "الرموز",
        icon: "tim-icons icon-atom",
        component: <AssignCommunity />,
        layout: "/back-office",
    },
    {
        path: "/add-roles",
        name: "Add Roles",
        rtlName: "الرموز",
        icon: "tim-icons icon-atom",
        component: <AddRoles />,
        layout: "/back-office",
    }
];

export default routesBackOffice;
