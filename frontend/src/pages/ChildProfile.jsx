import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';


import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function ChildProfile() {

    const { id } = useParams();

    const [child, setChild] = useState(null);
    const [immunizations, setImmunizations] = useState([]);
    const [dueVaccines, setDueVaccines] = useState([]);
    const printRef = useRef();
    const [showSMS, setShowSMS] = useState(false);
    const [smsData, setSmsData] = useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const response =
                await API.get(
                    `/children/profile/${id}`
                );

            setChild(
                response.data.child
            );

            setImmunizations(
                response.data.immunizations
            );

            setDueVaccines(
                response.data.dueVaccines
            );

        } catch (error) {

            console.error(error);
        }
    };

    if (!child) {

        return (
            <MainLayout>
                <div className="p-8">
                    Loading...
                </div>
            </MainLayout>
        );
    }

    const printRecord = () => {

    const printContents =
        printRef.current.innerHTML;

    const originalContents =
        document.body.innerHTML;

    document.body.innerHTML =
        printContents;

    window.print();

    document.body.innerHTML =
        originalContents;

    window.location.reload();
};

const sendReminder = async () => {

    try {

        const response =
            await API.get(
                `/children/reminder/${id}`
            );

        setSmsData(
            response.data
        );

        setShowSMS(true);

    } catch (error) {

        console.error(error);

        alert('Failed');
    }
};
    return (

        <MainLayout>

            <div 
            ref={printRef}
            className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Child Profile

                </h2>

    <div className="border-b pb-4 mb-6">

    <h1 className="text-3xl font-bold text-green-700">

        KCCA IMMUNIZATION SYSTEM

    </h1>

    <p className="text-gray-600">

        Child Immunization Record

    </p>

    </div>

<button
    onClick={printRecord}
    className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-3"
>
    🖨 Print Record
</button>

<button
    onClick={sendReminder}
    className="bg-purple-600 text-white px-4 py-2 rounded ml-3"
>

    📩 Send Reminder

</button>

<button
    onClick={() => window.history.back()}
    className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
>
    ← Back
</button>

<div className="mt-10 border-t pt-4 text-center text-sm text-gray-600">

    This is a system generated immunization record.

    <br />

    Kampala Capital City Authority (KCCA)

</div>

                <div className="mb-4">

    {immunizations.length >= 18 ? (

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded font-bold">

            Fully Immunized

        </span>

    ) : immunizations.length > 0 ? (

        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded font-bold">

            Partially Immunized

        </span>

    ) : (

        <span className="bg-red-100 text-red-700 px-4 py-2 rounded font-bold">

            Not Started

        </span>

    )}

</div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">

    <h3 className="text-xl font-bold mb-3">
        Immunization Progress
    </h3>

    <div className="w-full bg-gray-200 rounded-full h-6">

        <div
            className="bg-green-600 h-6 rounded-full text-white text-center text-sm"
            style={{
                width: `${
                    immunizations.length > 0
                        ? (immunizations.length / 18) * 100
                        : 0
                }%`
            }}
        >

            {Math.round(
                (immunizations.length / 18) * 100
            )}%

        </div>

    </div>

</div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">

                    <h3 className="text-xl font-bold mb-4">

                        Child Information

                    </h3>

                    <p>
                        <strong>Name:</strong>
                        {' '}
                        {child.first_name}
                        {' '}
                        {child.last_name}
                    </p>

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

                    <p>
                        <strong>Caregiver:</strong>
                        {' '}
                        {child.caregiver_name}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        {' '}
                        {child.phone_number}
                    </p>

                    <p>
                        <strong>Birth Facility:</strong>
                        {' '}
                        {child.birth_facility}
                    </p>

                </div>


                <div className="bg-white rounded-lg shadow p-6 mb-6">

    <h3 className="text-xl font-bold mb-4">

        Upcoming Vaccines

    </h3>

    {dueVaccines.length === 0 ? (

        <p className="text-green-600 font-semibold">

            ✅ All vaccines completed

        </p>

    ) : (

        dueVaccines.map((vaccine, index) => (

            <div
                key={index}
                className="border-l-4 border-yellow-500 pl-4 mb-3"
            >

                <p className="font-semibold">

                    ⏳ {vaccine.vaccine_name}
                    {' '}
                    Dose
                    {' '}
                    {vaccine.dose_number}

                </p>

                <p>

                    Recommended Age:
                    {' '}
                    {vaccine.recommended_age_weeks} weeks

                </p>

            </div>

        ))

    )}

</div>

                <div className="bg-white rounded-lg shadow p-6">

                    <h3 className="text-xl font-bold mb-4">

                        Immunization Timeline

                    </h3>

                    {immunizations.length === 0 ? (

                        <p>
                            No immunizations recorded.
                        </p>

                    ) : (

                        immunizations.map((item, index) => (

                            <div
                                key={index}
                                className="border-l-4 border-green-600 pl-4 mb-4"
                            >

                                <p className="font-semibold">

                                    ✅ {item.vaccine_name}
                                    {' '}
                                    Dose
                                    {' '}
                                    {item.dose_number}

                                </p>

                                <p>

                                    Vaccinated:
                                    {' '}
                                    {item.vaccination_date}

                                </p>

                                <p>

                                    {item.remarks}

                                </p>

                            </div>

                        ))

                    )}

                </div>

            </div>

{showSMS && (

<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

    <div className="bg-white p-6 rounded-lg w-[500px]">

        <h3 className="text-xl font-bold mb-4">

            SMS Reminder Sent

        </h3>

        <p className="mb-3">

            <strong>Recipient:</strong>

            {' '}

            {smsData.phone}

        </p>

        <div className="bg-gray-100 p-4 rounded mb-4 whitespace-pre-line">

            {smsData.message}

        </div>

        <button

            onClick={() =>
                setShowSMS(false)
            }

            className="bg-blue-600 text-white px-4 py-2 rounded"
        >

            Close

        </button>

    </div>

</div>

)}

        </MainLayout>
    );
}

export default ChildProfile;