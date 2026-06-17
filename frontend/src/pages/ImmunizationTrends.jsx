import { useEffect, useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

function ImmunizationTrends() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const response =
                await API.get(
                    '/dashboard/monthly-immunizations'
                );

            setData(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <MainLayout>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Monthly Immunization Trends

                </h2>

                <div className="bg-white p-6 rounded-lg shadow">

                    <ResponsiveContainer
                        width="100%"
                        height={400}
                    >

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </MainLayout>
    );
}

export default ImmunizationTrends;