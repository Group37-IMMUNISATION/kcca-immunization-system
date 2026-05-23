import { useEffect, useState } from 'react';

import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function Immunization() {

    const [children, setChildren] = useState([]);

    const [vaccines, setVaccines] = useState([]);

    const [formData, setFormData] = useState({

        child_id: '',
        vaccine_id: '',
        vaccination_date: '',
        remarks: ''
    });

    // Fetch children

    const fetchChildren = async () => {

        try {

            const response = await API.get(
                '/children/search?query='
            );

            setChildren(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    // Fetch vaccines

    const fetchVaccines = async () => {

        try {

            const response = await API.get(
                'http://localhost:5000/api/vaccines'
            );

            setVaccines(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchChildren();

        fetchVaccines();

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem('token');

            await API.post(
                '/immunizations/record',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert('Immunization recorded successfully');

        } catch (error) {

            console.error(error);

            alert('Failed to record immunization');
        }
    };

    return (
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">

                <h2 className="text-3xl font-bold mb-6">
                    Record Immunization
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4"
                >

                    {/* Child */}

                    <select
                        name="child_id"
                        className="border p-3 rounded"
                        value={formData.child_id}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Child
                        </option>

                        {children.map((child) => (

                            <option
                                key={child.child_id}
                                value={child.child_id}
                            >

                                {child.first_name}
                                {' '}
                                {child.last_name}

                            </option>
                        ))}

                    </select>

                    {/* Vaccine */}

                    <select
                        name="vaccine_id"
                        className="border p-3 rounded"
                        value={formData.vaccine_id}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Vaccine
                        </option>

                        {vaccines.map((vaccine) => (

                            <option
                                key={vaccine.vaccine_id}
                                value={vaccine.vaccine_id}
                            >

                                {vaccine.vaccine_name}
                                {' '}
                                Dose
                                {' '}
                                {vaccine.dose_number}

                            </option>
                        ))}

                    </select>

                    <input
                        type="date"
                        name="vaccination_date"
                        className="border p-3 rounded"
                        value={formData.vaccination_date}
                        onChange={handleChange}
                    />

                    <textarea
                        name="remarks"
                        placeholder="Remarks"
                        className="border p-3 rounded"
                        value={formData.remarks}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-3 rounded"
                    >
                        Record Immunization
                    </button>

                </form>

            </div>

        </div>
        </MainLayout>
    );
}

export default Immunization;