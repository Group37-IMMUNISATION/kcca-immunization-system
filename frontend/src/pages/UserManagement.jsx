import { useEffect, useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';


function UserManagement() {

    const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [roleId, setRoleId] = useState(2);
const [facilityId, setFacilityId] = useState(1);

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response =
                await API.get('/auth/users');

            setUsers(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const createUser = async () => {

    try {

        await API.post(
            '/auth/register',
            {
                full_name: fullName,
                email,
                password,
                role_id: roleId,
                facility_id: facilityId
            }
        );

        alert('User created');

        fetchUsers();

    } catch (error) {

        console.error(error);

        alert('Failed to create user');
    }
};

const deactivateUser = async (userId) => {

    try {

        await API.put(
            `/auth/deactivate/${userId}`
        );

        alert('User deactivated');

        fetchUsers();

    } catch (error) {

        console.error(error);

        alert('Failed');
    }
};

    return (

        <MainLayout>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    User Management

                </h2>

<div className="mb-6">

    <button
        className="bg-green-600 text-white px-4 py-2 rounded"
    >
        Add User
    </button>

</div>

<div className="bg-white p-6 rounded-lg shadow mb-6">

    <h3 className="text-xl font-bold mb-4">

        Create User

    </h3>

    <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
            setFullName(e.target.value)
        }
        className="border p-2 w-full mb-3"
    />

    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
            setEmail(e.target.value)
        }
        className="border p-2 w-full mb-3"
    />

    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
        className="border p-2 w-full mb-3"
    />

    <select
        value={roleId}
        onChange={(e) =>
            setRoleId(Number(e.target.value))
        }
        className="border p-2 w-full mb-3"
    >

        <option value={1}>
            Admin
        </option>

        <option value={2}>
            Nurse
        </option>

    </select>

    <button
        onClick={createUser}
        className="bg-green-600 text-white px-4 py-2 rounded"
    >

        Create User

    </button>

</div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-4">
                                    Name
                                </th>

                                <th className="p-4">
                                    Email
                                </th>

                                <th className="p-4">
                                    Role
                                </th>

                                <th className="p-4">
                                    Facility
                                </th>

                                <th className="p-4">
                                     Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.user_id}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {user.full_name}

                                    </td>

                                    <td className="p-4">

                                        {user.email}

                                    </td>

                                    <td className="p-4">

                                        {user.role_id}

                                    </td>

                                    <td className="p-4">

                                        {user.facility_name}

                                    </td>

                                    <td className="p-4">

                                         <button

                                             onClick={() =>
                                                deactivateUser(user.user_id)
                                                     }

                                        className="bg-red-600 text-white px-3 py-1 rounded"

                                                     >

                                                         Deactivate

                                         </button>

                            </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>
    );
}

export default UserManagement;