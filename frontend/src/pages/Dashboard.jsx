import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

import { jwtDecode } from 'jwt-decode';

import dashboardBg from "../assets/images/dashboard-bg.jpg";

import StatCard from "../components/ui/StatCard";

import Card from "../components/ui/Card";

import HeroBanner from "../components/dashboard/HeroBanner";

import ModuleCard from "../components/dashboard/ModuleCard";

import {
    Baby,
    Search,
    Syringe,
    Package,
    FileText,
    ShieldAlert,
    TriangleAlert,
    Users,
    ClipboardList
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


<HeroBanner
    user={user}
    background={dashboardBg}
/>

                
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

<div className="mt-10">

    <h2 className="text-3xl font-bold text-slate-800 mb-2">

        System Modules

    </h2>

    <p className="text-gray-500 mb-8">

        Access all KCCA Infant Immunization management modules.

    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        <ModuleCard
            title="Register Child"
            description="Register new infants into the immunization management system."
            icon={<Baby size={34} />}
            color="blue"
            link="/register-child"
        />

        <ModuleCard
            title="Child Management"
            description="Search, edit and manage registered children."
            icon={<Search size={34} />}
            color="green"
            link="/search-child"
        />

        <ModuleCard
            title="Record Immunization"
            description="Capture vaccines administered during clinic visits."
            icon={<Syringe size={34} />}
            color="purple"
            link="/search-child"
        />

        <ModuleCard
            title="Vaccine Stock"
            description="Monitor vaccine inventory and stock movements."
            icon={<Package size={34} />}
            color="orange"
            link="/stock"
        />

        <ModuleCard
            title="Reports & Analytics"
            description="Generate immunization, coverage and stock reports."
            icon={<FileText size={34} />}
            color="indigo"
            link="/reports"
        />

        <ModuleCard
            title="Defaulters"
            description="View children who missed scheduled vaccinations."
            icon={<TriangleAlert size={34} />}
            color="red"
            link="/defaulters"
        />

    </div>

</div>

                </div>

            </div>

        </MainLayout>
    );
}

export default Dashboard;