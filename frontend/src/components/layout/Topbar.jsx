import { Bell, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../../services/api";
import { getRoleName } from "../../utils/roles";


const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

function Topbar() {

    const [notifications, setNotifications] = useState({
        low_stock: 0,
        defaulters: 0,
        today_registrations: 0,
        today_vaccinations: 0
    });

    const [showNotifications, setShowNotifications] = useState(false);

    const [time, setTime] = useState(new Date());

    const today = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const res = await API.get("/dashboard/notifications");

                setNotifications(res.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchNotifications();

    }, []);

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const totalNotifications =
        notifications.low_stock +
        notifications.defaulters +
        notifications.today_registrations +
        notifications.today_vaccinations;

    return (

        <header className="bg-white rounded-3xl shadow-lg px-8 py-5 flex items-center justify-between">

            {/* Left */}

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Welcome back 👋

                </h1>

                <p className="text-gray-500 mt-1">

                    {today}

                </p>

                <div className="flex items-center gap-2 text-blue-600 text-sm mt-1">

                    <Clock size={16} />

                    {time.toLocaleTimeString()}

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">

                    <MapPin size={18} />

                    <span className="text-sm">

                        {user?.facility_name}

                    </span>

                </div>

                {/* Notifications */}

                <div className="relative">

                    <button

                        onClick={() => setShowNotifications(!showNotifications)}

                        className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200"

                    >

                        <Bell size={20} />

                        {totalNotifications > 0 && (

                            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 text-xs flex items-center justify-center font-bold">

                                {totalNotifications}

                            </span>

                        )}

                    </button>

                    {showNotifications && (

                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">

                            <h3 className="font-bold text-lg mb-4">

                                Notifications

                            </h3>

                            <div className="space-y-3">

                                <div className="flex justify-between">

                                    <span>🟢 New Registrations</span>

                                    <strong>{notifications.today_registrations}</strong>

                                </div>

                                <div className="flex justify-between">

                                    <span>💉 Vaccinations Today</span>

                                    <strong>{notifications.today_vaccinations}</strong>

                                </div>

                                <div className="flex justify-between">

                                    <span>🟠 Low Stock</span>

                                    <strong>{notifications.low_stock}</strong>

                                </div>

                                <div className="flex justify-between">

                                    <span>🔴 Defaulters</span>

                                    <strong>{notifications.defaulters}</strong>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

                {/* User */}

                <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">

                        {user?.full_name?.charAt(0)}

                    </div>

                    <div>

                        <p className="font-semibold">

                            {user?.full_name}

                        </p>

                        <p className="text-sm text-gray-500">

                           {getRoleName(user?.role_id)}

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Topbar;