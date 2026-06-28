import { useEffect, useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function StockHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const response = await API.get(
                '/stock/history'
            );

            setHistory(response.data);

        } catch (error) {

            console.error(error);

            alert('Failed to load stock history');
        }
    };

    return (

        <MainLayout>

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <h2 className="text-3xl font-bold mb-6">

                        Stock Movement History

                    </h2>

                    <div className="bg-white rounded-lg shadow overflow-hidden">

                        <table className="w-full">

                            <thead className="bg-blue-600 text-white">

                                <tr>

                                    <th className="p-4 text-left">
                                        Date
                                    </th>

                                    <th className="p-4 text-left">
                                        Vaccine
                                    </th>

                                    <th className="p-4 text-left">
                                        Action
                                    </th>

                                    <th className="p-4 text-left">
                                        Quantity
                                    </th>

                                    <th className="p-4 text-left">
                                        Performed By
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {history.map((item) => (

                                    <tr
                                        key={item.movement_id}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {new Date(
                                                item.movement_date
                                            ).toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            {item.vaccine_name}
                                        </td>

                                        <td
                                            className={`p-4 font-bold ${
                                                item.action_type === 'ADD'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {item.action_type}
                                        </td>

                                        <td className="p-4">
                                            {item.quantity}
                                        </td>

                                        <td className="p-4">
                                            {item.performed_by}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default StockHistory;