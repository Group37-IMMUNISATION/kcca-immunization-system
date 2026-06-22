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

function FacilityCoverage() {

    const [coverageData, setCoverageData] = useState([]);

    useEffect(() => {

        fetchCoverage();

    }, []);

    const fetchCoverage = async () => {

        try {

            const response =
                await API.get(
                    '/dashboard/facility-coverage'
                );

            const formattedData =
                response.data.map(
                    (facility) => ({

                        ...facility,

                        coverage:
                            Number(
                                facility.total_children
                            ) > 0

                                ? Math.round(

                                    (
                                        Number(
                                            facility.vaccinated_children
                                        ) /

                                        Number(
                                            facility.total_children
                                        )

                                    ) * 100

                                )

                                : 0
                    })
                );

            setCoverageData(
                formattedData
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <MainLayout>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Facility Coverage Analytics

                </h2>

                <p className="text-gray-600 mb-6">

                    Compare vaccination coverage across KCCA facilities.

                </p>

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <ResponsiveContainer
                        width="100%"
                        height={400}
                    >

                        <BarChart
                            data={coverageData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="facility_name"
                            />

                            <YAxis
                                domain={[0, 100]}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="coverage"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-green-600 text-white">

                            <tr>

                                <th className="p-4">

                                    Facility

                                </th>

                                <th className="p-4">

                                    Children

                                </th>

                                <th className="p-4">

                                    Vaccinated

                                </th>

                                <th className="p-4">

                                    Coverage %

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {coverageData.map(
                                (facility) => (

                                    <tr
                                        key={
                                            facility.facility_name
                                        }
                                        className="border-b"
                                    >

                                        <td className="p-4">

                                            {
                                                facility.facility_name
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                facility.total_children
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                facility.vaccinated_children
                                            }

                                        </td>

                                        <td className="p-4 font-bold">

                                            {
                                                facility.coverage
                                            }%

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

export default FacilityCoverage;