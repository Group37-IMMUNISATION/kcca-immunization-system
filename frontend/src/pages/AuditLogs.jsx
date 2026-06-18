import { useEffect, useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function AuditLogs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        fetchLogs();

    }, []);

    const fetchLogs = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const response =
                await API.get(
                    '/audit',
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setLogs(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <MainLayout>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Audit Logs

                </h2>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-4">
                                    User
                                </th>

                                <th className="p-4">
                                    Action
                                </th>

                                <th className="p-4">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {logs.map((log) => (

                                <tr
                                    key={log.log_id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {log.full_name}
                                    </td>

                                    <td className="p-4">
                                        {log.action}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            log.timestamp
                                        ).toLocaleString()}
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

export default AuditLogs;