import { useEffect, useState } from 'react';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

function LowStockAlerts() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        fetchAlerts();

    }, []);

    const fetchAlerts = async () => {

        try {

            const response =
                await API.get(
                    '/dashboard/low-stock'
                );

            setAlerts(
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

                    ⚠ Low Stock Alerts

                </h2>

                <p className="text-gray-600 mb-6">

                    Vaccines that need urgent replenishment.

                </p>

                {alerts.length === 0 ? (

                    <div className="bg-green-100 text-green-700 p-4 rounded">

                        ✅ All vaccine stocks are sufficient.

                    </div>

                ) : (

                    <div className="bg-white rounded-lg shadow overflow-hidden">

                        <table className="w-full">

                            <thead className="bg-red-600 text-white">

                                <tr>

                                    <th className="p-4">
                                        Vaccine
                                    </th>

                                    <th className="p-4">
                                        Facility
                                    </th>

                                    <th className="p-4">
                                        Quantity Remaining
                                    </th>

                                    <th className="p-4">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {alerts.map((item) => (

                                    <tr
                                        key={item.stock_id}
                                        className="border-b"
                                    >

                                        <td className="p-4">

                                            {item.vaccine_name}

                                        </td>

                                        <td className="p-4">

                                            {item.facility_name}

                                        </td>

                                        <td className="p-4 font-bold">

                                            {item.quantity_available}

                                        </td>

                                        <td className="p-4">
                        <td className="p-4">

    <span
        className={
            Number(item.quantity_available) <= 5

                ? 'bg-red-600 text-white px-3 py-1 rounded'

                : 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded'
        }
    >

        {Number(item.quantity_available) <= 5
            ? 'Critical'
            : 'Low Stock'}

    </span>

</td>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </MainLayout>
    );
}

export default LowStockAlerts;