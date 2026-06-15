import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

function Dashboard() {

   const [stats, setStats] = useState({

    total_children: 0,
    total_immunizations: 0,
    total_vaccines: 0,
    total_defaulters: 0,
    low_stock: 0
});
    const fetchStats = async () => {

        try {

            const response = await API.get(
                '/dashboard/stats'
            );

            setStats(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchStats();

    }, []);

    return (

        <MainLayout>

            <div className="min-h-screen bg-gray-100">

                <div className="p-8">

                    <h2 className="text-3xl font-bold mb-6">
                        Dashboard
                    </h2>

                    {/* Statistics */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h3 className="text-gray-500">
                                Total Children
                            </h3>

                            <p className="text-3xl font-bold text-blue-600">

                                {stats.total_children}

                            </p>

                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h3 className="text-gray-500">
                                Immunizations
                            </h3>

                            <p className="text-3xl font-bold text-green-600">

                                {stats.total_immunizations}

                            </p>

                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h3 className="text-gray-500">
                                Vaccines
                            </h3>

                            <p className="text-3xl font-bold text-purple-600">

                                {stats.total_vaccines}

                            </p>

                        </div>

                        <Link to="/defaulters">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-red-50 cursor-pointer">

        <h3 className="text-gray-500">
            Defaulters
        </h3>

        <p className="text-3xl font-bold text-red-600">

            {stats.total_defaulters}

        </p>

    </div>

</Link>

<Link to="/vaccine-stock">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-orange-50 cursor-pointer">

        <h3 className="text-gray-500">
            Low Stock Alerts
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
                                    Register Child
                                </h3>

                                <p className="text-gray-600">
                                    Register new infant records.
                                </p>

                            </div>

                        </Link>

                        <Link to="/search-child">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    Search Child
                                </h3>

                                <p className="text-gray-600">
                                    Retrieve child immunization history.
                                </p>

                            </div>

                        </Link>

                        <Link to="/immunization">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    Record Immunization
                                </h3>

                                <p className="text-gray-600">
                                    Record vaccines administered.
                                </p>

                            </div>

                        </Link>

                        <Link to="/due-vaccines">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-green-50">

                                <h3 className="text-xl font-bold mb-2">
                                    Due Vaccines
                                </h3>

                                <p className="text-gray-600">
                                    View pending vaccines.
                                </p>

                            </div>

                        </Link>

                        <Link to="/defaulters">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-red-50">

                                <h3 className="text-xl font-bold mb-2">
                                    Defaulters
                                </h3>

                                <p className="text-gray-600">
                                    Track overdue children.
                                </p>

                            </div>

                        </Link>

                        <Link to="/vaccination-card">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            Vaccination Card
        </h3>

        <p className="text-gray-600">
            View child vaccination card.
        </p>

    </div>

</Link>

                        <Link to="/immunization-history">

                            <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

                                <h3 className="text-xl font-bold mb-2">
                                    Immunization History
                                </h3>

                                <p className="text-gray-600">
                                    View vaccination records.
                                </p>

                            </div>

                        </Link>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default Dashboard;