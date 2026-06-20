import { useEffect, useState } from 'react';

import API from '../services/api';

import MainLayout from '../layouts/MainLayout';

function RecentActivity() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        fetchLogs();

    }, []);

    const fetchLogs = async () => {

        try {

            const response =
                await API.get(
                    '/audit/recent'
                );

            setLogs(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <MainLayout>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Recent Activity

                </h2>

                <div className="bg-white rounded-lg shadow">

                    {logs.map((log) => (

                        <div
                            key={log.log_id}
                            className="border-b p-4"
                        >

                            <p className="font-bold">

                                {log.full_name}

                            </p>

                            <p>

                                {log.action}

                            </p>

                            <p className="text-sm text-gray-500">

                                {
                                    new Date(
                                        log.timestamp
                                    ).toLocaleString()
                                }

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}

export default RecentActivity;