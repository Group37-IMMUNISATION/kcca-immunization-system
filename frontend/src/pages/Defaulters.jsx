import { useEffect, useState } from 'react';

import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function Defaulters() {

    const [defaulters, setDefaulters] = useState([]);

    const [expandedChild, setExpandedChild] = useState(null);

    const fetchDefaulters = async () => {

        try {

            const token = localStorage.getItem('token');

            const response = await API.get(
                '/immunizations/defaulters',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Group by child

            const grouped = {};

            response.data.forEach((item) => {

                if (!grouped[item.child_id]) {

                    grouped[item.child_id] = {

                        child_id: item.child_id,

                        first_name: item.first_name,

                        last_name: item.last_name,

                        caregiver_name: item.caregiver_name,

                        phone_number: item.phone_number,

                        vaccines: []
                    };
                }

                grouped[item.child_id].vaccines.push({

                    vaccine_name: item.vaccine_name,

                    dose_number: item.dose_number,

                    recommended_age_weeks:
                        item.recommended_age_weeks
                });
            });

            setDefaulters(
                Object.values(grouped)
            );

        } catch (error) {

            console.error(error);

            alert('Failed to load defaulters');
        }
    };

    useEffect(() => {

        fetchDefaulters();

    }, []);

    const toggleExpand = (childId) => {

        if (expandedChild === childId) {

            setExpandedChild(null);

        } else {

            setExpandedChild(childId);
        }
    };


const sendReminder = (child) => {

    const message = `
Reminder:

Dear ${child.caregiver_name},

Your child ${child.first_name} ${child.last_name}
has overdue vaccines.

Please visit the nearest KCCA clinic
for immunization services.

Thank you.
    `;

    alert(message);
};

    return (
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto">

                <h2 className="text-3xl font-bold mb-6">
                    Defaulters Tracking
                </h2>

                <div className="space-y-4">

                    {defaulters.map((child) => (

                        <div
                            key={child.child_id}
                            className="bg-white rounded-lg shadow"
                        >

                            {/* Main Row */}

                            <div
                                onClick={() =>
                                    toggleExpand(child.child_id)
                                }
                                className="p-6 cursor-pointer flex justify-between items-center hover:bg-gray-50"
                            >

                                <div>

                                    <h3 className="text-xl font-bold">

                                        {child.first_name}
                                        {' '}
                                        {child.last_name}

                                    </h3>

                                    <p className="text-gray-600">

                                        Caregiver:
                                        {' '}
                                        {child.caregiver_name}

                                    </p>

                                    <p className="text-gray-600">

                                        Phone:
                                        {' '}
                                        {child.phone_number}

                                    </p>

                                </div>

                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >

                                    {expandedChild === child.child_id
                                        ? 'Hide'
                                        : 'View Vaccines'}

                                </button>

                            </div>

                            {/* Expanded Section */}

                            {expandedChild === child.child_id && (

                                <div className="border-t p-6 bg-gray-50">

                                    <h4 className="font-bold mb-4">

                                        Overdue Vaccines

                                    </h4>

                                    <div className="space-y-3">

                                        {child.vaccines.map(
                                            (vaccine, index) => (

                                                <div
                                                    key={index}
                                                    className="bg-white p-4 rounded border"
                                                >

                                                    <p>

                                                        <strong>
                                                            Vaccine:
                                                        </strong>

                                                        {' '}
                                                        {vaccine.vaccine_name}

                                                    </p>

                                                    <p>

                                                        <strong>
                                                            Dose:
                                                        </strong>

                                                        {' '}
                                                        {vaccine.dose_number}

                                                    </p>

                                                    <p>

                                                        <strong>
                                                            Due At:
                                                        </strong>

                                                        {' '}
                                                        {vaccine.recommended_age_weeks}
                                                        {' '}
                                                        weeks

                                                    </p>

                                                </div>
                                            )
                                        )}

                                    </div>

<button
    onClick={() => sendReminder(child)}
    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
>
    Send Reminder
</button>

                                </div>
                            )}

                        </div>
                    ))}

                </div>

            </div>

        </div>
        </MainLayout>
    );
}

export default Defaulters;