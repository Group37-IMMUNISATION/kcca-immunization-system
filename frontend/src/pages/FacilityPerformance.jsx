import { useEffect, useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

function FacilityPerformance() {

    const [facilities, setFacilities] = useState([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const response =
                await API.get(
                    '/dashboard/facility-performance'
                );

            setFacilities(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <MainLayout>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Facility Performance Analytics

                </h2>

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <ResponsiveContainer
                        width="100%"
                        height={400}
                    >

                        <BarChart
                            data={facilities}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="facility_name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="total_children"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-4">
                                    Facility
                                </th>

                                <th className="p-4">
                                    Children
                                </th>

                                <th className="p-4">
                                    Immunizations
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {facilities.map(
                                (facility) => (

                                    <tr
                                        key={facility.facility_id}
                                        className="border-b"
                                    >

                                        <td className="p-4">

                                            {facility.facility_name}

                                        </td>

                                        <td className="p-4">

                                            {facility.total_children}

                                        </td>

                                        <td className="p-4">

                                            {facility.total_immunizations}

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>
    );
}

export default FacilityPerformance;