import { useEffect, useState } from 'react';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

function Reports() {

    const [stats, setStats] = useState(null);

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

    if (!stats) {

        return <p>Loading...</p>;
    }

    // Bar chart data

    const barData = [

        {
            name: 'Children',
            total: Number(stats.total_children)
        },

        {
            name: 'Immunizations',
            total: Number(stats.total_immunizations)
        },

        {
            name: 'Vaccines',
            total: Number(stats.total_vaccines)
        },

        {
            name: 'Defaulters',
            total: Number(stats.total_defaulters)
        }
    ];

    // Pie chart data

    const pieData = [

        {
            name: 'Completed',
            value:
                Number(stats.total_immunizations)
        },

        {
            name: 'Defaulters',
            value:
                Number(stats.total_defaulters)
        }
    ];

    return (

        <MainLayout>

            <div>

                <h2 className="text-3xl font-bold mb-8">
                    Reports & Analytics
                </h2>

                {/* Statistics Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

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

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h3 className="text-gray-500">
                            Defaulters
                        </h3>

                        <p className="text-3xl font-bold text-red-600">

                            {stats.total_defaulters}

                        </p>

                    </div>

                </div>

                {/* Charts */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Bar Chart */}

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h3 className="text-xl font-bold mb-4">
                            System Overview
                        </h3>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart data={barData}>

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="total"
                                    fill="#2563eb"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    {/* Pie Chart */}

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h3 className="text-xl font-bold mb-4">
                            Immunization Status
                        </h3>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={100}
                                    label
                                >

                                    <Cell fill="#16a34a" />

                                    <Cell fill="#dc2626" />

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default Reports;