import { useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function SearchChild() {

    const [editingChild, setEditingChild] = useState(null);

    const [editForm, setEditForm] = useState({

        caregiver_name: '',
        phone_number: '',
        address: '',
        birth_facility: ''
    });

    const [query, setQuery] = useState('');

    const [results, setResults] = useState([]);

    const handleSearch = async () => {

        try {

            const response = await API.get(
                `/children/search?query=${query}`
            );

            setResults(response.data);

        } catch (error) {

            console.error(error);

            alert('Search failed');
        }
    };

        const handleEdit = (child) => {

    setEditingChild(child);

    setEditForm({

        caregiver_name: child.caregiver_name,

        phone_number: child.phone_number,

        address: child.address || '',

        birth_facility: child.birth_facility
    });
};


const saveChanges = async () => {

    try {

        await API.put(

            `/children/${editingChild.child_id}`,

            editForm
        );

        alert('Child updated successfully');

        setEditingChild(null);

        handleSearch();

    } catch (error) {

        console.error(error);

        alert('Update failed');
    }
};


    return (
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto">

                <h2 className="text-3xl font-bold mb-6">
                    🔍 Search Child
                </h2>

                {/* Search Bar */}

                <div className="flex gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search by name, code or phone"
                        className="flex-1 border p-3 rounded"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 rounded"
                    >
                        Search
                    </button>

               

                </div>

                {/* Results */}

                <div className="grid gap-4">

                    {results.map((child) => (

                        <div
                            key={child.child_id}
                            className="bg-white p-6 rounded-lg shadow"
                        >

                            <h3 className="text-xl font-bold mb-2">

                                {child.first_name} {child.last_name}

                            </h3>

<button
    onClick={() => handleEdit(child)}
    className="bg-yellow-500 text-white px-4 py-2 rounded mt-3"
>
    Edit
</button>


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

            <p>

    <strong>Status:</strong>
    {' '}

    <span
        className={
            child.immunization_status ===
            'Fully Immunized'

                ? 'text-green-600 font-bold'

                : child.immunization_status ===
                  'Partially Immunized'

                ? 'text-yellow-600 font-bold'

                : 'text-red-600 font-bold'
        }
    >

        {child.immunization_status}

    </span>

</p>

                        </div>
                    ))}

                </div>

            </div>
            
{editingChild && (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

        <div className="bg-white p-6 rounded-lg w-96">

            <h3 className="text-xl font-bold mb-4">

                Edit Child Record

            </h3>

            <input

                type="text"

                placeholder="Caregiver Name"

                value={editForm.caregiver_name}

                onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        caregiver_name: e.target.value
                    })
                }

                className="border p-2 w-full mb-3"
            />

            <input

                type="text"

                placeholder="Phone Number"

                value={editForm.phone_number}

                onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        phone_number: e.target.value
                    })
                }

                className="border p-2 w-full mb-3"
            />

            <input

                type="text"

                placeholder="Address"

                value={editForm.address}

                onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        address: e.target.value
                    })
                }

                className="border p-2 w-full mb-3"
            />

            <input

                type="text"

                placeholder="Birth Facility"

                value={editForm.birth_facility}

                onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        birth_facility: e.target.value
                    })
                }

                className="border p-2 w-full mb-4"
            />

            <div className="flex gap-3">

                <button

                    onClick={saveChanges}

                    className="bg-green-600 text-white px-4 py-2 rounded"
                >

                    Save

                </button>

                <button

                    onClick={() => setEditingChild(null)}

                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >

                    Cancel

                </button>

            </div>

        </div>

    </div>
)}

        </div>
        </MainLayout>
    );
}

export default SearchChild;