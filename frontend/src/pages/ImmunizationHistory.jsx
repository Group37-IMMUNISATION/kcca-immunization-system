import { useState } from 'react';

import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function ImmunizationHistory() {

    const [childId, setChildId] = useState('');

    const [history, setHistory] = useState([]);
    const [child, setChild] = useState(null);

    const fetchHistory = async () => {

        try {

            const token = localStorage.getItem('token');

            const response = await API.get(
                `/immunizations/history/${childId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setChild(response.data.child);
            setHistory(response.data.history);

        } catch (error) {

            console.error(error);

            alert('Failed to fetch history');
        }
    };

    return (
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto">

                <h2 className="text-3xl font-bold mb-6">
                    Immunization History
                </h2>

                {/* Search */}

                <div className="flex gap-4 mb-6">

                    <input
                        type="number"
                        placeholder="Enter Child ID"
                        className="flex-1 border p-3 rounded"
                        value={childId}
                        onChange={(e) => setChildId(e.target.value)}
                    />

                    <button
                        onClick={fetchHistory}
                        className="bg-blue-600 text-white px-6 rounded"
                    >
                        Load History
                    </button>

                </div>


{child && (

    <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h3 className="text-2xl font-bold mb-4">

            {child.first_name}
            {' '}
            {child.last_name}

        </h3>

        <p>
            <strong>Unique Code:</strong>
            {' '}
            {child.unique_code}
        </p>

        <p>
            <strong>Gender:</strong>
            {' '}
            {child.gender}
        </p>

        <p>
            <strong>Date of Birth:</strong>
            {' '}
            {child.date_of_birth}
        </p>

    </div>
)}


                {/* Table */}

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-3 text-left">
                                    Vaccine
                                </th>

                                <th className="p-3 text-left">
                                    Dose
                                </th>

                                <th className="p-3 text-left">
                                    Date
                                </th>

                                <th className="p-3 text-left">
                                    Facility
                                </th>

                                <th className="p-3 text-left">
                                    Administered By
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((record) => (

                                <tr
                                    key={record.immunization_id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        {record.vaccine_name}
                                    </td>

                                    <td className="p-3">
                                        {record.dose_number}
                                    </td>

                                    <td className="p-3">
                                        {record.vaccination_date}
                                    </td>

                                    <td className="p-3">
                                        {record.facility_name}
                                    </td>

                                    <td className="p-3">
                                        {record.administered_by}
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

export default ImmunizationHistory;