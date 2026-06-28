import { Link, useLocation } from "react-router-dom";

import {

    LayoutDashboard,

    Baby,

    Search,

    Syringe,

    Package,

    FileText,

    Users,

    Bell,

    History,

    Activity,

    LogOut,

    Shield

} from "lucide-react";

import { jwtDecode } from "jwt-decode";

import logo from "../../assets/logos/kcca-logo.png";

const token = localStorage.getItem("token");

const user = token ? jwtDecode(token) : null;

function Sidebar() {

    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };

    const menu = [

    {
        section: "MAIN",
        items: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: LayoutDashboard
            }
        ]
    },

    {
        section: "CHILD MANAGEMENT",
        items: [
            {
                name: "Register Child",
                path: "/register-child",
                icon: Baby,
                roles: [2,3,4]
            },
            {
                name: "Child Management",
                path: "/search-child",
                icon: Search
            },
            {
                name: "Defaulters",
                path: "/defaulters",
                icon: Bell
            }
        ]
    },

    {
        section: "IMMUNIZATION",
        items: [
            {
                name: "Vaccine Stock",
                path: "/stock",
                icon: Package
            },
            {
                name: "Stock History",
                path: "/stock-history",
                icon: History
            }
        ]
    },

    {
        section: "ANALYTICS",
        items: [
            {
                name: "Reports",
                path: "/reports",
                icon: FileText
            },
            {
                name: "Activity Log",
                path: "/activity",
                icon: Activity
            }
        ]
    },

    {
        section: "ADMINISTRATION",
        items: [
            {
                name: "User Management",
                path: "/users",
                icon: Users,
                roles: [1,5]
            }
        ]
    }

];

    return (

        <aside className="w-72 bg-gradient-to-b from-green-900 to-green-700 text-white flex flex-col shadow-2xl">

            <div className="p-8 border-b border-green-600">

                <img

                    src={logo}

                    className="w-20 mb-4"

                    alt="KCCA"

                />

                <h1 className="font-bold text-2xl">

                    KCCA

                </h1>

                <p className="text-green-200 text-sm">

                    Infant Immunization

                    Management System

                </p>

            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">

                {
menu.map((group) => (

    <div
        key={group.section}
        className="mb-8"
    >

        <p className="text-xs uppercase tracking-widest text-green-200 px-4 mb-3 font-semibold">

            {group.section}

        </p>

        <div className="space-y-2">

            {group.items.map((item) => {

                if (
                    item.roles &&
                    !item.roles.includes(user?.role_id)
                )
                    return null;

                const Icon = item.icon;

                const active =
                    location.pathname === item.path;

                return (

                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
                            flex items-center gap-4
                            p-4 rounded-2xl
                            transition-all duration-300
                            ${
                                active
                                    ? "bg-white text-green-700 shadow-lg scale-[1.02]"
                                    : "hover:bg-green-600 hover:translate-x-1"
                            }
                        `}
                    >

                        <Icon size={22} />

                        <span className="font-medium">

                            {item.name}

                        </span>

                    </Link>

                );

            })}

        </div>

    </div>

))
}

            </nav>

            <div className="border-t border-green-600 p-6">

                <div className="bg-white/10 rounded-2xl p-4">

                    <div className="flex items-center gap-3">

                        <Shield/>

                        <div>

                            <p className="font-semibold">

                                {user?.full_name}

                            </p>

                            <p className="text-sm text-green-200">

                                {user?.facility_name}

                            </p>

                        </div>

                    </div>

                </div>

                <button

                    onClick={logout}

                    className="w-full mt-5 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-2xl py-3"

                >

                    <LogOut size={20}/>

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;