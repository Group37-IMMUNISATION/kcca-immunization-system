import { useState } from 'react';
import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

function RegisterChild() {

    const [formData, setFormData] = useState({

    caregiver_name: '',
    phone_number: '',
    address: '',

    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    birth_facility: '',
    facility_id: ''
});

    const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                '/children/register',
                formData
            );

            alert('Child registered successfully');

            setFormData({

                caregiver_name: '',
                phone_number: '',
                address: '',

                first_name: '',
                last_name: '',
                gender: '',
                date_of_birth: '',
                birth_facility: '',
                facility_id: ''
            });

        } catch (error) {

            console.error(error);

            alert('Registration failed');
        }
    };

    return (

        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">

                <h2 className="text-3xl font-bold mb-6">
                    👶 Register Child
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <select
    name="facility_id"
    className="border p-3 rounded"
    value={formData.facility_id}
    onChange={handleChange}
>

    <option value="">
        Select Facility
    </option>

    <option value="1">
        Kisenyi HC IV
    </option>

    <option value="2">
        Kawempe HC IV
    </option>

    <option value="3">
        Komamboga HC III
    </option>

    <option value="4">
        Kawaala HC III
    </option>

    <option value="5">
        Kisugu HC III
    </option>

    <option value="6">
        Bukoto HC III
    </option>

    <option value="7">
        Kitebi HC III
    </option>

    <option value="8">
        Kiswa HC II
    </option>

</select>


                    <input
                        type="text"
                        name="caregiver_name"
                        placeholder="Caregiver Name"
                        className="border p-3 rounded"
                        value={formData.caregiver_name}
                        onChange={handleChange}
                    />


                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        className="border p-3 rounded"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="border p-3 rounded"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="first_name"
                        placeholder="Child First Name"
                        className="border p-3 rounded"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Child Last Name"
                        className="border p-3 rounded"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

                    <select
                        name="gender"
                        className="border p-3 rounded"
                        value={formData.gender}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>

                    <input
                        type="date"
                        name="date_of_birth"
                        className="border p-3 rounded"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="birth_facility"
                        placeholder="Birth Facility"
                        className="border p-3 rounded"
                        value={formData.birth_facility}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white p-3 rounded col-span-1 md:col-span-2"
                    >
                        Register Child
                    </button>

                </form>

            </div>

        </div>
        </MainLayout>
    );
}

export default RegisterChild;