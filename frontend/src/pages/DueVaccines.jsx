import { useState } from 'react';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

function DueVaccines() {

    const [childId, setChildId] = useState('');

    const [result, setResult] = useState(null);

    const fetchDueVaccines = async () => {

        try {

            const token = localStorage.getItem('token');

            const response = await API.get(
                `/immunizations/due/${childId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            alert('Failed to load due vaccines');
        }
    };

    return (
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto">

                <h2 className="text-3xl font-bold mb-6">
                    Due Vaccines
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
                        onClick={fetchDueVaccines}
                        className="bg-blue-600 text-white px-6 rounded"
                    >
                        Check
                    </button>

                </div>

{result && result.child && (

    <div className="bg-white rounded-lg shadow p-6 mb-6">

        <h3 className="text-2xl font-bold mb-4">

            {result.child.first_name}
            {' '}
            {result.child.last_name}

        </h3>

        <p>

            <strong>Unique Code:</strong>
            {' '}
            {result.child.unique_code}

        </p>

        <p>

            <strong>Gender:</strong>
            {' '}
            {result.child.gender}

        </p>

        <p>

            <strong>Date of Birth:</strong>
            {' '}
            {result.child.date_of_birth}

        </p>

        <p>

            <strong>Age:</strong>
            {' '}
            {result.child.age_weeks}
            {' '}
            weeks

        </p>

    </div>
)}

                {/* Result */}

                {result && (

                    <div className="bg-white rounded-lg shadow p-6">

                        {result.due_vaccines.length === 0 ? (

                            <p className="text-green-600 font-bold">

                                No pending vaccines.

                            </p>

                        ) : (

                            <div className="space-y-4">

                                {result.due_vaccines.map((vaccine) => (

                                    <div
                                        key={vaccine.vaccine_id}
                                        className="border p-4 rounded"
                                    >

                                        <h4 className="text-xl font-bold">

                                            {vaccine.vaccine_name}

                                        </h4>

                                        <p>

                                            Dose:
                                            {' '}
                                            {vaccine.dose_number}

                                        </p>

                                        <p>

                                            Recommended At:
                                            {' '}
                                            {vaccine.recommended_age_weeks}
                                            {' '}
                                            weeks

                                        </p>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>
                )}

            </div>

        </div>
        </MainLayout>
    );
}

export default DueVaccines;