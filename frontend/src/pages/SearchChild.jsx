import { useState } from 'react';
import API from '../services/api';

function SearchChild() {

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

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto">

                <h2 className="text-3xl font-bold mb-6">
                    Search Child
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

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default SearchChild;