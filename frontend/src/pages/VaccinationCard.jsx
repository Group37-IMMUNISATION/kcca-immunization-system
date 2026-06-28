import { useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';
import ImmunizationCard from "../components/cards/ImmunizationCard";

function VaccinationCard() {

    const [search, setSearch] = useState('');

    const [matches, setMatches] = useState([]);

    const [data, setData] = useState(null);

    const searchChildren = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const response =
                await API.get(

                    `/children/card-search?query=${search}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setMatches(
                response.data
            );

        } catch (error) {

            console.error(error);

            alert('Search failed');
        }
    };

    const fetchCard = async (childId) => {

        try {

            const token =
                localStorage.getItem('token');

            const response = await API.get(
                `/immunizations/card/${childId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setData(
                response.data
            );

            setMatches([]);

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

                        🪪 Vaccination Card

                    </h2>

                    {/* Search Box */}

                    <div className="flex gap-4 mb-6">

                        <input

                            type="text"

                            placeholder="Search by Child ID, Name or Unique Code"

                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                            className="border p-3 flex-1 rounded"
                        />

                        <button

                            onClick={searchChildren}

                            className="bg-blue-600 text-white px-6 rounded"

                        >

                            Search

                        </button>

                    </div>

                    {/* Search Results */}

                    <div className="space-y-2 mb-6">

                        {matches.map((child) => (

                            <div

                                key={child.child_id}

                                className="bg-white border p-4 rounded cursor-pointer hover:bg-gray-50"

                                onClick={() =>
                                    fetchCard(
                                        child.child_id
                                    )
                                }

                            >

                                <strong>

                                    {child.first_name}
                                    {' '}
                                    {child.last_name}

                                </strong>

                                <br />

                                Child ID:
                                {' '}
                                {child.child_id}

                                <br />

                                Unique Code:
                                {' '}
                                {child.unique_code}

                            </div>

                        ))}

                    </div>

                    {/* Vaccination Card */}

                    {data && (

<ImmunizationCard

    child={data.child}

    vaccines={[
        ...data.completed,
        ...data.pending
    ]}

    nextVaccine={
        data.nextVaccine
            ? `${data.nextVaccine.vaccine_name} Dose ${data.nextVaccine.dose_number}`
            : null
    }

    nextDate={data.nextDate}

    status={data.status}

    progress={data.progress}

/>

)}


 {/* Print and Download Buttons */}
<div className="flex justify-center gap-5 py-8 border-t">

    <div className="flex justify-center gap-6 mt-8">

    <button
    onClick={() =>

    window.open(

        `/vaccination-card-print/${data.child.child_id}`,

        "_blank"

    )

}
    className="bg-blue-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl"
>
    🖨 Print Card
    </button>

    <button
        onClick={() => {

            const token = localStorage.getItem("token");

            window.open(

                `http://localhost:5000/api/pdf/vaccination-card/${child.child_id}?token=${token}`,

                "_blank"

            );

        }}
        
        className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl shadow-lg"
    >
        📄 Download PDF
    </button>

</div>

</div>



                </div>

            </div>

        </MainLayout>
    );
}

export default VaccinationCard;