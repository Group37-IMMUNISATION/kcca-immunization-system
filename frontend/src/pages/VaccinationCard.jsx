import { useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function VaccinationCard() {

    const [childId, setChildId] = useState('');

    const [data, setData] = useState(null);

    const fetchCard = async () => {

        try {

           const token = localStorage.getItem('token');

const response = await API.get(
    `/immunizations/card/${childId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            setData(response.data);

        } catch (error) {

            console.error(error);

            alert('Child not found');
        }
    };

    return (

        <MainLayout>

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl font-bold mb-6">

                        Child Vaccination Card

                    </h2>

                    <div className="flex gap-4 mb-6">

                        <input
                            type="number"
                            placeholder="Enter Child ID"
                            value={childId}
                            onChange={(e) =>
                                setChildId(e.target.value)
                            }
                            className="border p-3 flex-1 rounded"
                        />

                        <button
                            onClick={fetchCard}
                            className="bg-blue-600 text-white px-6 rounded"
                        >
                            Load Card
                        </button>

                    </div>

                    {data && (

                        <div className="bg-white p-8 rounded-lg shadow">

                            <h3 className="text-2xl font-bold mb-4">

                                KCCA Immunization Card

                            </h3>

                            <hr className="mb-4" />

                            <p>
                                <strong>Name:</strong>
                                {' '}
                                {data.child.first_name}
                                {' '}
                                {data.child.last_name}
                            </p>

                            <p>
                                <strong>Unique Code:</strong>
                                {' '}
                                {data.child.unique_code}
                            </p>

                            <p>
                                <strong>Gender:</strong>
                                {' '}
                                {data.child.gender}
                            </p>

                            <p>
                                <strong>Date of Birth:</strong>
                                {' '}
                                {data.child.date_of_birth}
                            </p>

                            <hr className="my-6" />

                            <div className="space-y-3">

                                <hr className="my-6" />

<h4 className="text-xl font-bold mb-4 text-green-700">

    Completed Vaccines

</h4>

<div className="space-y-2 mb-6">

    {data.completed.map((vaccine, index) => (

        <div
            key={index}
            className="bg-green-50 p-3 rounded border"
        >

            ✓ {vaccine.vaccine_name}
            {' '}
            Dose
            {' '}
            {vaccine.dose_number}

        </div>

    ))}

</div>

<h4 className="text-xl font-bold mb-4 text-red-700">

    Pending Vaccines

</h4>

<div className="space-y-2">

    {data.pending.map((vaccine, index) => (

        <div
            key={index}
            className="bg-red-50 p-3 rounded border"
        >

            ✗ {vaccine.vaccine_name}
            {' '}
            Dose
            {' '}
            {vaccine.dose_number}

        </div>

    ))}

</div>

<hr className="my-6" />

<div className="text-center">

    <h3 className="text-2xl font-bold">

        Status:
    </h3>

    <p
        className={`text-xl font-bold mt-2 ${
            data.status === 'Fully Immunized'
                ? 'text-green-600'
                : 'text-orange-600'
        }`}
    >

        {data.status}

    </p>

</div>

<div className="text-center mt-6">

    <button

        onClick={() => window.print()}

        className="bg-blue-600 text-white px-6 py-3 rounded"

    >

        Print Card

    </button>

</div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </MainLayout>
    );
}

export default VaccinationCard;