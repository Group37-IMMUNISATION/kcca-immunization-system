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

                <p className="text-gray-600 mb-6">

                    Compare immunization performance across KCCA facilities.

                </p>

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
                                dataKey="total_immunizations"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

<div className="grid grid-cols-3 gap-4 mb-6">

    <div className="bg-blue-600 text-white p-4 rounded">
        <h3>Total Facilities</h3>
        <p className="text-2xl font-bold">
            {facilities.length}
        </p>
    </div>

    <div className="bg-green-600 text-white p-4 rounded">
        <h3 className="font-semibold">
            Total Facilities
        </h3>

        <p className="text-xl font-bold">
            {facilities.length > 0
            ? facilities[0].facility_name
            : 'N/A'}
        </p>
    </div>

    <div className="bg-purple-600 text-white p-4 rounded">
        <h3 className="font-semibold">
            Total Immunizations
        </h3>
        <p className="text-2xl font-bold">
            {
                facilities.reduce(
                    (sum, f) =>
                        sum +
                        Number(
                            f.total_immunizations
                        ),
                    0
                )
            }
        </p>
    </div>

</div>

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-3">
                                    Rank
                                </th>

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

{facilities.map((facility, index) => (

                                    <tr
                                        key={facility.facility_id}
                                        className={
                                        index === 0
                                        ? 'bg-green-50'
                                        : ''
                                        }
                                    >

                                        <td className="p-3 text-center">

                                        {
                                            index === 0
                                            ? '🥇'
                                            : index === 1
                                            ? '🥈'
                                            : index === 2
                                            ? '🥉'
                                            : index + 1
                                        }

                                        </td>

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