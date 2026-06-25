import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

import { jwtDecode } from 'jwt-decode';

import dashboardBg from "../assets/images/dashboard-bg.jpg";

import StatCard from "../components/ui/StatCard";

import Card from "../components/ui/Card";


import {
    Baby,
    Search,
    Syringe,
    FileText,
    Package,
    ShieldAlert
} from "lucide-react";

function Dashboard() {

    const [stats, setStats] = useState({

        total_children: 0,
        total_immunizations: 0,
        total_vaccines: 0,
        total_defaulters: 0,
        low_stock: 0

    });

    const token =
        localStorage.getItem('token');

    const user =
        token
            ? jwtDecode(token)
            : null;

    const fetchStats = async () => {

        try {

            const response =
                await API.get(
                    '/dashboard/stats'
                );

            setStats(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
};

    useEffect(() => {

        fetchStats();
        fetchNotifications();

    }, []);

const [notifications, setNotifications] = useState({

    low_stock: 0,
    defaulters: 0
});

const fetchNotifications = async () => {

    try {

        const response =
            await API.get(
                '/dashboard/notifications'
            );

        setNotifications(
            response.data
        );

    } catch (error) {

        console.error(error);
    }
};

    return (

        <MainLayout>

            <div className="min-h-screen bg-gray-100">

                <div className="p-8">

<div
    className="relative rounded-3xl overflow-hidden shadow-2xl mb-8"
    style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }}
>

    <div className="absolute inset-0 bg-blue-900/70"></div>

    <div className="relative z-10 p-10 text-white">

        <h1 className="text-4xl font-bold">

            Welcome Back,

            <span className="text-cyan-300">

                {" "} {user?.full_name}

            </span>

        </h1>

        <p className="mt-3 text-blue-100 text-lg">

            KCCA Infant Immunization Record Management System

        </p>

        <div className="flex flex-wrap gap-4 mt-8">

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl">

                🏥

                {user?.role_id === 1

                    ? " Monitoring All Facilities"

                    : user?.facility_name}

            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl">

                👤

                {

                    user?.role_id === 1

                        ? " Super Admin"

                        : user?.role_id === 5

                        ? " Facility Admin"

                        : user?.role_id === 2

                        ? " Data Clerk"

                        : user?.role_id === 3

                        ? " Nurse"

                        : " Clinical Officer"

                }

            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl">

                📅

                {new Date().toLocaleDateString()}

            </div>

        </div>

    </div>

</div>



<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

    <Link to="/register-child">
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 text-center">
            <div className="text-3xl mb-2">➕</div>
            <div className="font-semibold">
                Register Child
            </div>
        </div>
    </Link>

    <Link to="/immunization">
        <div className="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 text-center">
            <div className="text-3xl mb-2">💉</div>
            <div className="font-semibold">
                Record Immunization
            </div>
        </div>
    </Link>

    <Link to="/search-child">
        <div className="bg-purple-600 text-white p-4 rounded-lg shadow hover:bg-purple-700 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <div className="font-semibold">
                Search Child
            </div>
        </div>
    </Link>

    <Link to="/vaccination-card">
        <div className="bg-orange-600 text-white p-4 rounded-lg shadow hover:bg-orange-700 text-center">
            <div className="text-3xl mb-2">📄</div>
            <div className="font-semibold">
                Vaccination Card
            </div>
        </div>
    </Link>

</div>


<Card className="mb-8">

    <div className="flex items-center justify-between mb-6">

        <div>

            <h2 className="text-2xl font-bold">

                ⚡ Quick Actions

            </h2>

            <p className="text-gray-500">

                Frequently used system functions

            </p>

        </div>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

        <Link to="/register-child">

            <div className="rounded-2xl bg-blue-50 hover:bg-blue-600 hover:text-white transition p-6 text-center">

                <Baby size={38} className="mx-auto mb-3"/>

                <p className="font-semibold">

                    Register Child

                </p>

            </div>

        </Link>

        <Link to="/search-child">

            <div className="rounded-2xl bg-green-50 hover:bg-green-600 hover:text-white transition p-6 text-center">

                <Search size={38} className="mx-auto mb-3"/>

                <p className="font-semibold">

                    Search Child

                </p>

            </div>

        </Link>

        <Link to="/stock">

            <div className="rounded-2xl bg-orange-50 hover:bg-orange-600 hover:text-white transition p-6 text-center">

                <Package size={38} className="mx-auto mb-3"/>

                <p className="font-semibold">

                    Vaccine Stock

                </p>

            </div>

        </Link>

        <Link to="/reports">

            <div className="rounded-2xl bg-purple-50 hover:bg-purple-600 hover:text-white transition p-6 text-center">

                <FileText size={38} className="mx-auto mb-3"/>

                <p className="font-semibold">

                    Reports

                </p>

            </div>

        </Link>

        <Link to="/defaulters">

            <div className="rounded-2xl bg-red-50 hover:bg-red-600 hover:text-white transition p-6 text-center">

                <ShieldAlert size={38} className="mx-auto mb-3"/>

                <p className="font-semibold">

                    Defaulters

                </p>

            </div>

        </Link>

        <Link to="/search-child">

            <div className="rounded-2xl bg-cyan-50 hover:bg-cyan-600 hover:text-white transition p-6 text-center">

                <Syringe size={38} className="mx-auto mb-3"/>

                <p className="font-semibold">

                    Record Vaccine

                </p>

            </div>

        </Link>

    </div>

</Card>

                    {/* Statistics */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

    <StatCard
        title="Registered Children"
        value={stats.total_children}
        icon={<Baby className="text-blue-600" />}
        color="text-blue-600"
    />

    <StatCard
        title="Immunizations"
        value={stats.total_immunizations}
        icon={<Syringe className="text-green-600" />}
        color="text-green-600"
    />

    <Link to="/defaulters">

        <StatCard
            title="Defaulters"
            value={stats.total_defaulters}
            icon={<ShieldAlert className="text-red-600" />}
            color="text-red-600"
        />

    </Link>

    <Link to="/low-stock-alerts">

        <StatCard
            title="Low Stock"
            value={stats.low_stock}
            icon={<Package className="text-orange-600" />}
            color="text-orange-600"
        />

    </Link>

</div>
                    {/* Modules */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <Link to="/register-child">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    👶 Register Child
                                </h3>

                                <p className="text-gray-600">
                                    Register new infant records.
                                </p>

                            </div>

                        </Link>

                        <Link to="/search-child">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    🔍 Search Child
                                </h3>

                                <p className="text-gray-600">
                                    Retrieve child immunization history.
                                </p>

                            </div>

                        </Link>

                        <Link to="/immunization">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    💉 Record Immunization
                                </h3>

                                <p className="text-gray-600">
                                    Record vaccines administered.
                                </p>

                            </div>

                        </Link>

{user?.role_id === 1 && (
<Link to="/facility-coverage">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-green-50">

        <h3 className="text-xl font-bold mb-2">

            Facility Coverage

        </h3>

        <p className="text-gray-600">

            View vaccination coverage by facility.

        </p>

    </div>

</Link>
)}

                        <Link to="/due-vaccines">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-green-50">

                                <h3 className="text-xl font-bold mb-2">
                                    📅 Due Vaccines
                                </h3>

                                <p className="text-gray-600">
                                    View pending vaccines.
                                </p>

                            </div>

                        </Link>

                        <Link to="/defaulters">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-red-50">

                                <h3 className="text-xl font-bold mb-2">
                                    ⚠️ Defaulters
                                </h3>

                                <p className="text-gray-600">
                                    Track overdue children.
                                </p>

                            </div>

                        </Link>

        <Link to="/vaccination-card">

        <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            🪪 Vaccination Card
        </h3>

        <p className="text-gray-600">
            View child vaccination card.
        </p>

    </div>

</Link>

                        <Link to="/immunization-history">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    📖 Immunization History
                                </h3>

                                <p className="text-gray-600">
                                    View vaccination records.
                                </p>

                            </div>

                        </Link>

                {user?.role_id === 1 && (
                <Link to="/facility-performance">
        <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">

            📊 Facility Analytics

        </h3>

        <p className="text-gray-600">

            Compare facility performance.

        </p>

    </div>

</Link>
                )}


{(user?.role_id === 1 ||
  user?.role_id === 5) && (

<Link to="/users">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            👥 User Management
        </h3>

        <p className="text-gray-600">
            Manage system users.
        </p>

    </div>

</Link>

)}


{user?.role_id === 1 && (
<Link to="/immunization-trends">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-green-50">

        <h3 className="text-xl font-bold mb-2">

            📈 Immunization Trends

        </h3>

        <p className="text-gray-600">

            View monthly vaccination trends.

        </p>

    </div>

</Link>
)}


{user?.role_id === 1 && (
<Link to="/vaccine-coverage">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-green-50">

        <h3 className="text-xl font-bold mb-2">

            💉 Vaccine Coverage

        </h3>

        <p className="text-gray-600">

            View vaccine administration reports.

        </p>

    </div>

</Link>
)}


{user?.role_id === 1 && (

<Link to="/audit-logs">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">

            📜 Audit Logs

        </h3>

        <p className="text-gray-600">

            View system activity.

        </p>

    </div>

</Link>
)}

{(user?.role_id === 1 ||
  user?.role_id === 5) && (
    
<Link to="/recent-activity">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">

            🕒 Recent Activity

        </h3>

        <p className="text-gray-600">

            View latest system activities.

        </p>

    </div>

</Link>



)}

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default Dashboard;