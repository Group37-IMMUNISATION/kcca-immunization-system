import { Bell, CalendarDays, MapPin } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

function Topbar() {

    const today = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (

        <header className="bg-white rounded-3xl shadow-lg px-8 py-5 flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Welcome back 👋

                </h1>

                <p className="text-gray-500 mt-1">

                    {today}

                </p>

            </div>

            <div className="flex items-center gap-6">

                <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">

                    <MapPin size={18} />

                    <span className="text-sm">

                        {user?.facility_name}

                    </span>

                </div>

                <button className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200">

                    <Bell size={20} />

                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>

                </button>

                <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">

                        {user?.full_name?.charAt(0)}

                    </div>

                    <div>

                        <p className="font-semibold">

                            {user?.full_name}

                        </p>

                        <p className="text-sm text-gray-500">

                            {user?.role_id === 1
                                ? "Super Admin"
                                : user?.role_id === 5
                                ? "Facility Admin"
                                : user?.role_id === 2
                                ? "Data Clerk"
                                : user?.role_id === 3
                                ? "Nurse"
                                : "Clinical Officer"}

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Topbar;