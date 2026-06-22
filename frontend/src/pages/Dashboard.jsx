import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

import { jwtDecode } from 'jwt-decode';


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

<h2 className="text-3xl font-bold mb-2">
    DASHBOARD, {user?.full_name}
</h2>

<p className="text-gray-600 mb-6">
    KCCA Infant Immunization Records Management System
</p>

<div className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-blue-600">

    <h3 className="text-2xl font-bold text-gray-800">

        Welcome, {user?.full_name}

    </h3>


    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">

    <h3 className="font-bold text-yellow-800 mb-3">

        Notifications

    </h3>


    <div className="space-y-2">

        <p>

            ⚠ Low Stock Vaccines:
            <strong>
                {' '}
                {notifications.low_stock}
                {' '}
            </strong>

        </p>


        <p>

            ⚠ Defaulters:
            <strong>
                {' '}
                {notifications.defaulters}
                {' '}
            </strong>

        </p>

    </div>

</div>

    <div className="mt-2">

        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded mr-2">

            Role:
            {
                user?.role_id === 1
                    ? ' Super Admin'
                    : user?.role_id === 5
                    ? ' Facility Admin'
                    : user?.role_id === 2
                    ? ' Nurse'
                    : user?.role_id === 3
                    ? ' Clinical Officer'
                    : ' Data Clerk'
            }

        </span>

        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded">

            {
                user?.role_id === 1
                    ? 'Monitoring All KCCA Facilities'
                    : `Facility: ${user?.facility_name}`
            }

        </span>

    </div>

</div>

<p className="font-bold text-gray-600 mb-6">
    MANAGE INFANT IMMUNIZATION RECORDS ACROSS KCCA HEALTH FACILITIES.
</p>

<div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">

    <h3 className="font-bold text-blue-800">

        Quick Actions

    </h3>

    <p className="text-blue-700">

        Register children, record immunizations,
        manage stock and monitor defaulters.

    </p>

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

                    {/* Statistics */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h3 className="text-gray-500">
                                👶 Total Children
                            </h3>

                            <p className="text-3xl font-bold text-blue-600">

                                {stats.total_children}

                            </p>

                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h3 className="text-gray-500">
                                💉 Immunizations
                            </h3>

                            <p className="text-3xl font-bold text-green-600">

                                {stats.total_immunizations}

                            </p>

                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h3 className="text-gray-500">
                                🧪 Vaccines
                            </h3>

                            <p className="text-3xl font-bold text-purple-600">

                                {stats.total_vaccines}

                            </p>

                        </div>

                        <Link to="/defaulters">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-red-50 cursor-pointer">

        <h3 className="text-gray-500">
            ⚠️ Defaulters
        </h3>

        <p className="text-3xl font-bold text-red-600">

            {stats.total_defaulters}

        </p>

    </div>

</Link>

<Link to="/low-stock-alerts">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-orange-50 cursor-pointer">

        <h3 className="text-gray-500">
            📦 Low Stock Alerts
        </h3>

        <p className="text-3xl font-bold text-orange-600">

            {stats.low_stock}

        </p>

    </div>

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