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

function VaccineCoverage() {

    const [data, setData] = useState([]);

    useEffect(() => {

        fetchCoverage();

    }, []);

    const fetchCoverage = async () => {

        try {

            const response =
                await API.get(
                    '/dashboard/vaccine-coverage'
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

                    Vaccine Coverage Report

                </h2>

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <ResponsiveContainer
                        width="100%"
                        height={400}
                    >

                        <BarChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="vaccine_name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="administered"
                                fill="#16a34a"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-green-600 text-white">

                            <tr>

                                <th className="p-4">
                                    Vaccine
                                </th>

                                <th className="p-4">
                                    Dose
                                </th>

                                <th className="p-4">
                                    Administered
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {data.map((item, index) => (

                                <tr
                                    key={index}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {item.vaccine_name}

                                    </td>

                                    <td className="p-4">

                                        {item.dose_number}

                                    </td>

                                    <td className="p-4 font-bold">

                                        {item.administered}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>
    );
}

export default VaccineCoverage;